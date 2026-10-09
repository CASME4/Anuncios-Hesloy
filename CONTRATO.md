# CONTRATO entre módulos
- `src/cobre.ts`: `cobre(pieza, frame, curva)`, `tramo(cb,a,b)`, `metal(cb)` (OKLCH), `oklchHex`, `suave`, `UMBRALES`.
- `src/type/`: `Rotulo({texto, frame, cobre, banda, ...})` → SVG; exporta `index.ts`.
- `src/escena/`: figuras 1–8 como componentes SVG puros `({frame, cobre, ...})`; reloj dibujado sin logo; brazalete.
- `src/transiciones/`: cada firma exporta `{nombre, familia, cola, pre, Capa}`; `Capa({frame, inicio, cobreA, cobreB})`; pico 100 % en el cuadro del corte (CUBIERTA) o último cuadro (APERTURA).
- `src/montaje/rejilla.ts`: constantes de tiempos (GOLPE, REMATE_START, cortes, rótulos, SFX). Revienta al importar si algo no cuadra.
- Clips: `clips/Rn.mp4` (30 fps, 720×1280, sin audio); originales `clips/Rn_orig.mp4`.

## Contrato exacto (v2) — todo componente vive en un lienzo SVG/HTML de 1080×1920 con `position:absolute; inset:0`
- Tipos y zona segura: `src/tipos.ts` (`Tiempo`, `ZONA`, `PALETA`). Reloj/render: ver abajo.
- **Cada módulo trae su propio entry** para probarse sin tocar archivos ajenos: `src/<mod>/entry.tsx` (`registerRoot` + Compositions de prueba, 1080×1920, 30 fps). NO crear `src/Root.tsx` ni `src/index.ts` (los hace el integrador).
- **Render de prueba en esta VM** (Chromium del sistema): 
  `flock /tmp/render.lock npx remotion still src/<mod>/entry.tsx <CompId> <out.png> --frame=N --concurrency=1 --gl=swangle --browser-executable=/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell`
  y para video `npx remotion render ... --concurrency=2` (siempre con `flock`; 4 vCPU compartidas por 4 agentes; salidas en `/tmp/claude-0/out_<rol>/`, nunca en el repo).
- **Fuentes**: paquetes npm `@fontsource/archivo-black` y `@fontsource/fredoka` (importar CSS `@fontsource/.../index.css` o cargar el woff2 con `staticFile`/`import`); no Google Fonts por red. Si hace falta el contorno de numerales: `opentype.js` ya instalado.
- **`src/type/index.ts`** exporta: `Rotulo: FC<{lineas:string[]; frame:number /*local desde la entrada*/; duracion:number; cobre:number; y:number; /*centro vertical px*/ x?:number /*centro, 540*/; tamano:number; fuente?:'archivo'|'fredoka'; inclinacion?:number; salida?:'frente'|'corte'}>`, `Pastilla: FC<{texto:string; frame; cobre; y; ancho}>` (CTA/arroba), `Cintillo: FC<{lineas:string[]; frame; y}>`, `contornoNumeral(texto:string, tamano:number): {d:string; ancho:number; alto:number}` (path SVG de «Q595», se usa en el remate).
- **`src/escena/index.ts`** exporta figuras 1–8 y `Reloj: FC<{frame; cobre; x; y; ancho; piezas?: number /*0..8 cuántas piezas ya nacieron*/; brazalete?: number /*0..1*/; segundero?: 'vuelta'|'pasos'|number}>`, `Gota`, `Losa: FC<{frame /*0=golpe*/; texto; x;y}>`, `fondoVivo: FC<{frame; cobre}>`, y `metalPaint(cobre)` (usa `metal()` de src/cobre.ts).
- **`src/transiciones/index.ts`** exporta por firma `{nombre, familia:'APERTURA'|'CUBIERTA'|'SECO', cola, pre, Capa: FC<{frame /*local 0..cola*/; cobre0:number; cobre1:number; inversa?:boolean}>}` y `FIRMAS` (mapa). La Capa se dibuja ENCIMA de los dos planos; `integrador` solo la monta con `<Sequence from={corte - pre}>`. El pico (100 %) cae en `pre` (CUBIERTA) o en `cola-1` (APERTURA).
- **`src/remate/anuncio/index.ts` / `historia/index.ts`** exportan `RemateAnuncio` / `RemateHistoria: FC<{frame /*0=REMATE_START*/}>` autocontenidos (dibujan su propio fondo, reloj, losa, precio, CTA), usando solo `src/cobre.ts`, `src/tipos.ts`, `src/montaje/rejilla.ts` (lectura) y, si existen, `src/type` y `src/escena`.
