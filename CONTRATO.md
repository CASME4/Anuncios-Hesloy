# CONTRATO entre módulos
- `src/cobre.ts`: `cobre(pieza, frame, curva)`, `tramo(cb,a,b)`, `metal(cb)` (OKLCH), `oklchHex`, `suave`, `UMBRALES`.
- `src/type/`: `Rotulo({texto, frame, cobre, banda, ...})` → SVG; exporta `index.ts`.
- `src/escena/`: figuras 1–8 como componentes SVG puros `({frame, cobre, ...})`; reloj dibujado sin logo; brazalete.
- `src/transiciones/`: cada firma exporta `{nombre, familia, cola, pre, Capa}`; `Capa({frame, inicio, cobreA, cobreB})`; pico 100 % en el cuadro del corte (CUBIERTA) o último cuadro (APERTURA).
- `src/montaje/rejilla.ts`: constantes de tiempos (GOLPE, REMATE_START, cortes, rótulos, SFX). Revienta al importar si algo no cuadra.
- Clips: `clips/Rn.mp4` (30 fps, 720×1280, sin audio); originales `clips/Rn_orig.mp4`.
