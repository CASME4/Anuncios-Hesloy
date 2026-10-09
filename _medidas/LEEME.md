# Mediciones de clips (rol medidor)

Fuente de verdad del brief: `claude/14-BRIEF-NINEWEST-ORO-ROSA-CLAUDE-CODE-NUBE.md`. Solo medición; no hay decisiones aquí.

## Fuentes usadas
- `clips/R1.mp4` y `clips/R2.mp4`: completos, 30 fps, 299 frames, 720x1280. Medidos desde estos.
- `clips/R3.mp4`: incompleto al medir (sin `moov`; la conversión `minterpolate` seguía corriendo). Se midió `clips/R3_orig.mp4` (24 fps, 241 frames).
- `clips/R4.mp4`: no existe al medir. Se midió `clips/R4_orig.mp4` (24 fps, 193 frames).
- Captura de la ficha (`_ref/`): **no existe**; la carpeta está vacía. No se inventó nada.

## Duración, fps, resolución, audio
| clip | fuente medida | duración | fps | resolución | audio en el original |
|---|---|---|---|---|---|
| R1 | R1.mp4 | 9.967 s (orig 10.042 s) | 30 | 720x1280 | sí (AAC), no en R1.mp4 |
| R2 | R2.mp4 | 9.967 s (orig 10.042 s) | 30 | 720x1280 | sí (AAC), no en R2.mp4 |
| R3 | R3_orig.mp4 | 10.042 s | 24 | 720x1280 | sí (AAC) |
| R4 | R4_orig.mp4 | 8.042 s | 24 | 720x1280 | sí (AAC) |

## Loudness (EBU R128, sobre el original con audio)
| clip | integrado | LRA | true peak |
|---|---|---|---|
| R1 | -38.3 LUFS | 10.3 LU | -9.9 dBFS |
| R2 | -15.0 LUFS | 1.7 LU | -2.1 dBFS |
| R3 | -46.4 LUFS | 7.8 LU | -19.5 dBFS |
| R4 | -15.7 LUFS | 14.7 LU | -1.8 dBFS |

Los `.mp4` de 30 fps (R1, R2) no traen pista de audio, por eso el loudness sale del original.

## Luma por segundo
Por segundo: media del frame, p10 y p90 de los píxeles. Detalle completo en `clips.json`, campo `luma_por_segundo`. Resumen de medias:
- R1: 89.8 → 120.7 (la luma sube de 3 s en adelante).
- R2: 86.7, 61.0, 76.8, 55.6, 56.5, 84.3, 137.8, 80.6, 80.6, 63.9 (pico 6–7 s).
- R3: 132.7 → 143.5 (estable, luma alta).
- R4: 132.2 → 131.1 (rango 124.8–139.3).

## Paleta dominante (k-means k=5, 1 fps, sRGB y OKLCH)
- R1: #18161C (31%), #BAA69E (21%), #464145 (19%), #817978 (19%), #CFCFD6 (10%).
- R2: #231513 (36%), #4F3531 (23%), #B79592 (19%), #85615B (16%), #DEC3BD (6%).
- R3: #BCA691 (26%), #807064 (22%), #D2CCC4 (20%), #634C40 (19%), #442219 (13%).
- R4: #9B745C (26%), #74513C (23%), #C3997C (20%), #DBCCB7 (19%), #432719 (11%).
Los valores OKLCH (L, C, H) de cada color están en `clips.json`.

## Metal rosa de R2 (referencia)
Archivo: `_medidas/metal_R2.json`. Ventanas de R2.mp4:
- 0–1 s (30 frames): luma media del metal 126.3, p90 210.0, tono OKLCH H = 38.2°, C medio 0.053.
- 2–7.5 s (165 frames): luma media del metal 109.0, p90 191.0, tono OKLCH H = 38.5°, C medio 0.054.

**Advertencia:** el criterio (H 30–70°, C ≥ 0.02, L 0.25–0.98) no aísla el brazalete. En 0–1 s cae el 48 % de los píxeles y en 2–7.5 s el 22 %, incluyendo fondo cálido. Son la referencia numérica pedida, no una segmentación del objeto.

Control que debe fallar (`control` en el JSON): azul #2040C0 → 0 % marcado, gris #808080 → 0 %, cobre #CBA696 → 100 %. Pasa.

## Comandos que produjeron los números
```
# streams y duración
ffprobe -v error -show_entries stream=codec_name,width,height,r_frame_rate,nb_frames -show_entries format=duration,size -of compact clips/R1.mp4   # igual con R2, R3_orig, R4_orig

# loudness (sobre el original con audio)
ffmpeg -hide_banner -nostats -i clips/R1_orig.mp4 -af ebur128=peak=true -f null -   # igual con R2_orig, R3_orig, R4_orig

# luma, paleta k-means, metal R2, control
pip install --break-system-packages opencv-python-headless numpy
python3 -I _medidas/medir_clips.py
# escribe: ntmp (clips_base.json) y _medidas/metal_R2.json
# clips.json se consolidó después con el loudness parseado de ebur128
```

Versiones usadas: opencv-python-headless 5.0.0, numpy 2.5.3, ffmpeg del sistema.

## Archivos
- `_medidas/clips.json`: todos los números por clip.
- `_medidas/metal_R2.json`: referencia del metal, con control.
- `_medidas/medir_clips.py`: script de luma, paleta y metal.
- `_medidas/LEEME.md`: este archivo.

Nota: `clips/R3.mp4` seguía en conversión (PID 675) al medir; no se tocó. Si se re-mide R3 y R4 cuando estén listos, los números cambian. Ninguna medición se descartó.
