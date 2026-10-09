# ESTADO — Nine West oro rosa
Rama: claude/awesome-brown-vmtiop (asignada por la sesión; el brief pedía anuncio/nw-oro-rosa).
## Ola S (setup) — en curso
- Remotion 4.0.534 instalado (npm, exact). Node 22.22. ffmpeg presente en esta VM.
- Clips R1–R4 copiados a clips/ y convertidos a 30 fps con minterpolate mci/aobmc/vsbmc.
- src/cobre.ts + scripts/prueba_cobre.ts: pasan; el control sintético falla como debe.
## BLOQUEOS reales de esta sesión
1. Red: api.elevenlabs.io y youtube.com no responden (entorno no está en «Custom»). Sin voz, SFX ElevenLabs ni música. Hay que configurar la red y la credencial.
2. El zip NO trajo: captura de la ficha (_ref/), RECETARIO-USPOLO-CAMPO-MAS-GRANDE-CLAUDE.md, ni el .md del brief (reconstruido desde el mensaje en claude/14-...).
3. Skills de Remotion/diseño no están en ~/.claude/skills: anotadas «no instalada».
## Ola S — cerrada. Ola 0 — medidor + auditor-clips hechos (voz bloqueada por red)
- Clips R1–R4 a 30 fps completos (R1/R2 miden 9.97 s a 30 fps; dejar ≥2 cuadros de margen en cortes internos).
- _medidas/ (Haiku): clips.json, metal_R2.json (luma media 126/p90 210/H 38° en 0–1 s), LEEME.md. Nota: la referencia de metal es tonal aproximada, no segmenta el brazalete.
- tablero_clips.md (Opus): R4 logo espejado 2.30–6.85 s (limpio desde 6.88); R2 emblema en corona 1.92–3.08 y 7.08–8.67 (no 1–1.5); R1 sin logo girado pero salto en 2.50 s; R3 logo girado desde 5.71 s.
- Preguntas para Eddy: (1) R4 0–2.3 con parche o cambiar plano; (2) cubrir R3 7–10 o usar R2 8.70–10.04; (3) dar por perdido R4 2.3–6.85.
## Siguiente
Ola W/1 no arrancan hasta: red «Custom» + credencial ElevenLabs (voz, SFX, música) y la captura de la ficha. Ola 1 (metal, transiciones, tipografía, remates) no depende de la red y se puede lanzar ya.
