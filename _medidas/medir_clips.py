import json, math, sys, os
import numpy as np
import cv2

CLIPS = "/home/user/Anuncios-Hesloy/clips"
OUT = "/home/user/Anuncios-Hesloy/_medidas"
SRC = {"R1": "R1.mp4", "R2": "R2.mp4", "R3": "R3_orig.mp4", "R4": "R4_orig.mp4"}
ORIG = {"R1": "R1_orig.mp4", "R2": "R2_orig.mp4", "R3": "R3_orig.mp4", "R4": "R4_orig.mp4"}


def srgb_to_lin(c):
    c = c / 255.0
    return np.where(c <= 0.04045, c / 12.92, ((c + 0.055) / 1.055) ** 2.4)


def rgb_to_oklch(rgb):
    """rgb: (...,3) uint/float in 0..255 (RGB order). returns L, C, H(deg)."""
    lin = srgb_to_lin(np.asarray(rgb, dtype=np.float64))
    r, g, b = lin[..., 0], lin[..., 1], lin[..., 2]
    l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b
    m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b
    s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b
    l_, m_, s_ = np.cbrt(l), np.cbrt(m), np.cbrt(s)
    L = 0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_
    a = 1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_
    bb = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_
    C = np.sqrt(a * a + bb * bb)
    H = (np.degrees(np.arctan2(bb, a)) + 360.0) % 360.0
    return L, C, H


def hexof(rgb):
    return "#%02X%02X%02X" % tuple(int(round(min(255, max(0, v)))) for v in rgb)


def read_frames(path, step_fn=None):
    cap = cv2.VideoCapture(path)
    fps = cap.get(cv2.CAP_PROP_FPS)
    n = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    w = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    h = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    return cap, fps, n, w, h


def luma_per_second(path):
    cap, fps, n, w, h = read_frames(path)
    buckets = {}
    idx = 0
    while True:
        ok, fr = cap.read()
        if not ok:
            break
        g = cv2.cvtColor(fr, cv2.COLOR_BGR2GRAY)
        sub = g[::4, ::4].ravel()
        sec = int(idx / fps)
        buckets.setdefault(sec, {"means": [], "px": []})
        buckets[sec]["means"].append(float(g.mean()))
        buckets[sec]["px"].append(sub)
        idx += 1
    cap.release()
    rows = []
    for sec in sorted(buckets):
        px = np.concatenate(buckets[sec]["px"])
        rows.append({
            "seg": f"{sec}-{sec+1}s",
            "frames": len(buckets[sec]["means"]),
            "luma_media": round(float(np.mean(buckets[sec]["means"])), 2),
            "luma_p10": round(float(np.percentile(px, 10)), 2),
            "luma_p90": round(float(np.percentile(px, 90)), 2),
        })
    return fps, n, w, h, idx, rows


def palette_1fps(path, k=5):
    cap, fps, n, w, h = read_frames(path)
    total = int(n)
    secs = int(total / fps)
    samples = []
    for t in range(secs + 1):
        fi = int(round(t * fps))
        if fi >= total:
            break
        cap.set(cv2.CAP_PROP_POS_FRAMES, fi)
        ok, fr = cap.read()
        if not ok:
            continue
        rgb = cv2.cvtColor(fr, cv2.COLOR_BGR2RGB)[::4, ::4].reshape(-1, 3).astype(np.float32)
        samples.append(rgb)
    cap.release()
    data = np.concatenate(samples)
    crit = (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 50, 0.5)
    _, labels, centers = cv2.kmeans(data, k, None, crit, 3, cv2.KMEANS_PP_CENTERS)
    labels = labels.ravel()
    counts = np.bincount(labels, minlength=k)
    order = np.argsort(-counts)
    pal = []
    for i in order:
        c = centers[i]
        L, C, H = rgb_to_oklch(c)
        pal.append({
            "hex": hexof(c),
            "rgb": [round(float(x), 1) for x in c],
            "share_pct": round(100.0 * counts[i] / counts.sum(), 2),
            "oklch": {"L": round(float(L), 4), "C": round(float(C), 4), "H": round(float(H), 2)},
        })
    return len(samples), pal


def metal_mask(rgb, L, C, H):
    # Tono cobre/rosa: H 30..70 deg en OKLCH, croma >= 0.02, L 0.25..0.98
    return (H >= 30) & (H <= 70) & (C >= 0.02) & (L >= 0.25) & (L <= 0.98)


def circ_mean_deg(h, w):
    rad = np.radians(h)
    x = np.sum(w * np.cos(rad)) / np.sum(w)
    y = np.sum(w * np.sin(rad)) / np.sum(w)
    return (math.degrees(math.atan2(y, x)) + 360.0) % 360.0


def metal_stats(rgb_px, luma_px):
    L, C, H = rgb_to_oklch(rgb_px)
    m = metal_mask(rgb_px, L, C, H)
    n = int(m.sum())
    out = {"px_total": int(len(rgb_px)), "px_metal": n,
           "fraccion_metal_pct": round(100.0 * n / len(rgb_px), 2)}
    if n:
        lm = luma_px[m]
        out.update({
            "luma_media_metal": round(float(lm.mean()), 2),
            "luma_p90_metal": round(float(np.percentile(lm, 90)), 2),
            "oklch_H_metal_circmedia_pond_C": round(circ_mean_deg(H[m], C[m]), 2),
            "oklch_C_metal_media": round(float(C[m].mean()), 4),
            "oklch_L_metal_media": round(float(L[m].mean()), 4),
        })
    return out


def control_metal():
    """Control que debe fallar: el detector NO debe marcar azul ni gris; SI debe marcar cobre #CBA696."""
    res = {}
    for name, col in [("azul_2040C0", (0x20, 0x40, 0xC0)), ("gris_808080", (128, 128, 128)), ("cobre_CBA696", (0xCB, 0xA6, 0x96))]:
        px = np.tile(np.array([col], dtype=np.float64), (1000, 1))
        L, C, H = rgb_to_oklch(px)
        m = metal_mask(px, L, C, H)
        res[name] = {"fraccion_metal_pct": round(100.0 * m.mean(), 2),
                     "oklch_H": round(float(H[0]), 2), "oklch_C": round(float(C[0]), 4)}
    ok = res["azul_2040C0"]["fraccion_metal_pct"] == 0 and res["gris_808080"]["fraccion_metal_pct"] == 0 and res["cobre_CBA696"]["fraccion_metal_pct"] == 100
    res["control_pasa"] = bool(ok)
    return res


def metal_r2():
    path = os.path.join(CLIPS, SRC["R2"])
    cap, fps, n, w, h = read_frames(path)
    frames = []
    while True:
        ok, fr = cap.read()
        if not ok:
            break
        frames.append(fr)
    cap.release()
    def window(t0, t1):
        i0, i1 = int(round(t0 * fps)), int(round(t1 * fps))
        rgb_all, luma_all = [], []
        for fr in frames[i0:i1]:
            rgb = cv2.cvtColor(fr, cv2.COLOR_BGR2RGB)[::4, ::4].reshape(-1, 3).astype(np.float64)
            g = cv2.cvtColor(fr, cv2.COLOR_BGR2GRAY)[::4, ::4].ravel().astype(np.float64)
            rgb_all.append(rgb)
            luma_all.append(g)
        rgb_all = np.concatenate(rgb_all)
        luma_all = np.concatenate(luma_all)
        st = metal_stats(rgb_all, luma_all)
        st["frames"] = int(i1 - i0)
        st["luma_media_ventana_total"] = round(float(luma_all.mean()), 2)
        st["luma_p90_ventana_total"] = round(float(np.percentile(luma_all, 90)), 2)
        return st
    w1 = window(0.0, 1.0)
    w2 = window(2.0, 7.5)
    return {
        "fuente": SRC["R2"],
        "fps": fps,
        "criterio_metal": "OKLCH H in [30,70] deg, C>=0.02, L in [0.25,0.98] (heuristica de tono cobre/rosa, no segmentacion del objeto)",
        "luma": "Y BT.601 0-255 (cv2 COLOR_BGR2GRAY), muestreo cada 4 px",
        "ventana_0_1s": w1,
        "ventana_2_7_5s": w2,
        "control": control_metal(),
    }


def main():
    clips = {}
    for k in ["R1", "R2", "R3", "R4"]:
        path = os.path.join(CLIPS, SRC[k])
        fps, n, w, h, nread, luma_rows = luma_per_second(path)
        nsamp, pal = palette_1fps(path, k=5)
        # metadatos del original (audio/fps)
        opath = os.path.join(CLIPS, ORIG[k])
        cap = cv2.VideoCapture(opath)
        ofps = cap.get(cv2.CAP_PROP_FPS)
        on = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
        cap.release()
        clips[k] = {
            "fuente_medida": SRC[k],
            "fuente_original": ORIG[k],
            "duracion_s": round(nread / fps, 3),
            "frames_leidos": nread,
            "fps": round(fps, 3),
            "resolucion": f"{w}x{h}",
            "original_fps": round(ofps, 3),
            "original_frames": on,
            "original_duracion_s": round(on / ofps, 3),
            "luma_por_segundo": luma_rows,
            "paleta_kmeans_k5_1fps": {"muestras_frames": nsamp, "colores": pal},
        }
        print(k, "ok", fps, nread, w, h, nsamp, file=sys.stderr)
    # audio: loudness from ebur128 raw (filled by shell)
    metal = metal_r2()
    with open(os.path.join(OUT, "metal_R2.json"), "w") as f:
        json.dump(metal, f, indent=2, ensure_ascii=False)
    with open("/tmp/claude-0/ntmp_medidor/clips_base.json", "w") as f:
        json.dump(clips, f, indent=2, ensure_ascii=False)
    print("metal control_pasa:", metal["control"]["control_pasa"], file=sys.stderr)


if __name__ == "__main__":
    main()
