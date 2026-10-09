# LEYES (coordinador) — resumen operativo. Fuente: claude/14-BRIEF-NINEWEST-ORO-ROSA-CLAUDE-CODE-NUBE.md
- Un parámetro: `cobre` (src/cobre.ts). Nadie lo redefine.
- Todo valor = función pura de useCurrentFrame(). Prohibido: requestAnimationFrame, GSAP, Math.random(), CSS transition/animation, background-clip:text.
- Cero datos inventados; «oro rosa» es color, nunca «de oro»; solo Q595; nunca ORIGINAL; nunca dos personas; nunca redibujar el logo NINE WEST.
- Zona segura anuncio: arriba 269, abajo 672, lados 120; historia: arriba 269, abajo 384, lados 120.
- Sin imágenes generadas: todo con código (SVG, OKLCH, feTurbulence seed fija).
- Dueño único por carpeta; fuera de la tuya solo lees. Rejilla (`src/montaje/rejilla.ts`) solo la toca el coordinador.
- Todo se mide sobre el MP4 con un control que debe fallar. Devuelve resumen, no volcado. Commit+push por ola.
