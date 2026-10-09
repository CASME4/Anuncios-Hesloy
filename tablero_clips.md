# Tablero de clips — auditor-clips (ola 0)

Fuente: `clips/R1_orig.mp4 … R4_orig.mp4` (720×1280, 24 fps). Frames cada 0.5 s escalados a 1440×2560 (lanczos), revisados en hojas de contacto de 6 cuadros y con recortes 1:1 donde hubo duda. Frames y recortes viven en `/tmp/claude-0/ntmp_auditor-clips/` (no en el repo). Cortes internos medidos con `select=gt(scene,…)`.

- **Captura de la ficha (`_ref/`) no existe**: la carpeta está vacía. Nada se comparó contra fotos de la ficha. La referencia del reloj real se toma de R1 y R2, que coinciden entre sí: corona a la derecha, 12 bastones, 12 brillos de hora, «NINE WEST» centrado bajo el piñón y horizontal.
- `Rn.mp4` (30 fps) dura 9.967 s (299 f) frente a 10.042 s del original. Los segundos de este tablero son del `_orig`; al pasarlos a 30 fps hay que dejar ≥ 2 f de margen en cada corte interno, porque la interpolación puede mezclar cuadros de los dos planos. Al auditar, R3.mp4 estaba incompleto y R4.mp4 seguía escribiéndose.
- En R1–R4 nunca hay dos personas en cuadro. Las manos que aparecen son siempre de una sola persona.

Leyenda: ✅ usable · ⚠️ usable con condición · ❌ no usable tal cual.

---

## R1 — taller (10.04 s)
Cortes internos: 3.25 · 4.54 · 5.71 · 8.04

| Intervalo (s) | Plano | Estado | Defecto | Evidencia | Qué hacer |
|---|---|---|---|---|---|
| 0.00–2.50 | Esfera bajo la lupa, pinzas con una piedra en el piñón | ✅ | — Logo legible y bien orientado; solo lo inclina la perspectiva. Hay 12 bastones y 12 brillos. | 0.0 / 1.5 / 2.5 a 1:1 | Usar. |
| 2.54–3.25 | ídem | ❌ | La piedra y las pinzas **desaparecen de golpe** y las pinzas reaparecen abajo a la derecha. | f60 (2.50) con piedra → f63 (2.625) sin piedra | Recortar en 2.50. |
| 3.25–4.54 | Prensa lateral sobre la caja | ✅ | Logo en perspectiva rasante, correcto. | 3.5 / 4.0 / 4.5 | Usable (no está en el plan). |
| 4.54–5.71 | Prensa de frente, guantes negros | ✅ | La esfera casi no se ve. | 5.0 / 5.5 | Usable. |
| 5.71–8.04 | Manos con dedales negros sostienen el reloj de canto | ⚠️ | Dedales de aspecto gomoso: 3 dedos con dedal por lado, raro pero creíble. La esfera no se ve. | 6.0 / 7.0 / 7.5 a 1:1 | Solo como relleno. No va en la historia. |
| 8.04–10.04 | Reloj de pie en el tapete, aro de luz | ✅ | Logo derecho y legible. Segundero casi quieto (≈28–29 s durante 2 s). | 8.5 / 9.0 / 9.5 / 10.0 a 1:1 | Usar. Que nadie mire el segundero. |

**Hipótesis del brief «logo girado ≈6–10 s»: NO se confirma.** Entre 5.71 y 8.04 la esfera no se ve, y entre 8.04 y 10.04 el logo está correcto.

## R2 — CGI (10.04 s)
Cortes internos: 1.17–1.33 (fundido) · 1.92 · 3.08 · 5.00 · 5.67–5.75 (fundido) · 7.08 · 8.67

| Intervalo (s) | Plano | Estado | Defecto | Evidencia | Qué hacer |
|---|---|---|---|---|---|
| 0.00–1.15 | Macro de eslabones en penumbra | ✅ | — | 0.0 / 0.5 / 1.0 | Usar. |
| 1.17–1.33 | Fundido de eslabones a bisel | ⚠️ | Morfeo entre los dos planos. | escena 1.17 / 1.25 | Evitar. |
| 1.33–1.91 | Canto de la caja; la corona asoma por el borde | ✅ | El emblema todavía no se ve. | 1.66 / 1.83 a 1:1 | Usable hasta 1.85. |
| 1.92–3.08 | Macro de la corona | ❌ | **Emblema inventado en la corona** (trazo «N/Z» grabado), muy legible. | 2.0 / 2.5 / 3.0 | Recortar fuera. |
| 3.08–5.00 | Reloj girando sobre la piedra | ✅ | Logo correcto. La corona estriada no muestra emblema a esta escala. | 3.5 / 4.0 / 4.5 a 1:1 | Usar. |
| 5.00–5.65 | Brazalete en arco | ✅ | — | 5.0 / 5.4 | Usar. |
| 5.67–5.75 | Fundido de brazalete a esfera | ⚠️ | Morfeo. | escena 5.71 | Evitar. |
| 5.75–7.08 | Macro de la esfera en perspectiva | ✅ | Logo correcto y nítido. Brillos visibles, con destello en el de las 12 hacia 6.6. | 6.0 / 6.5 / 7.0 a 1:1 | Usar. |
| 7.08–7.92 | Reloj de ¾ sobre pedestal oscuro | ❌ | **Grabado del broche girado 90° y mal escrito («NINE WESST»).** Además, la corona tiene un emblema de hoja inventado. | f170–f188 (7.08–7.83) | Recortar fuera. |
| 7.92–8.67 | ídem | ❌ | El grabado del broche **desaparece**, la corona sigue con emblema y el logo de la esfera sale deforme («MINE WEST» hacia 8.5). | f191 (7.96) sin texto; 8.0 / 8.5 a 1:1 | Recortar fuera. |
| 8.67–10.04 | Reloj de frente sobre la piedra | ✅ | Logo correcto y corona lisa. | 9.0 / 9.5 / 10.0 a 1:1 | Usar. |

**Hipótesis del brief:** el emblema de la corona **no está en ≈1–1.5 s**: está en **1.92–3.08** y otra vez en 7.08–8.67. El «logo girado ≈8–9 s» es en realidad el **grabado del broche en 7.08–7.92**, al que se suman la corona con emblema hasta 8.67.

## R3 — unboxing en mármol (10.04 s)
Cortes internos: 1.875 · 2.375 · 4.08 · 5.71 · 7.04

| Intervalo (s) | Plano | Estado | Defecto | Evidencia | Qué hacer |
|---|---|---|---|---|---|
| 0.00–0.80 | Manos con la caja cerrada; la tapa empieza a subir | ✅ | Logo de la caja correcto. | 0.0 / 0.5 | Usar. |
| 0.83–0.92 | La tapa se levanta | ❌ | «NINE WEST» de la tapa **se deforma** («NNE WEST»). Son 3 cuadros, rápidos. | f20–f22 a 1:1 | Recortar fuera. |
| 0.96–1.85 | Caja abierta; el canto de la tapa sale arriba a la derecha | ✅ | El canto de la tapa no muestra texto. | f24–f42 | Usar. |
| 1.875 | corte | ⚠️ | La tapa reaparece abierta detrás de la caja. Funciona como corte de montaje. | f45 | Aceptable como corte. |
| 1.88–4.05 | Las manos sacan el reloj y lo muestran | ✅ | Dos manos de una persona. Logo correcto. 12 brillos. | 2.0 / 3.0 / 3.5 a 1:1 | Usar. |
| 4.08–5.70 | Reloj en la muñeca sobre el mármol | ✅ | Logo correcto. Se cuentan 12 brillos. | 4.5 / 5.0 / 5.5 a 1:1 | Usar. |
| 5.71–7.04 | Manos acomodan el reloj sobre el mármol | ❌ | **Logo girado** de −15° a −40° respecto de los bastones de 3 y 9, y corrido fuera del centro. | 6.0 / 6.5 a 1:1 | Recortar, o cubrir ≥ 0.6 s. |
| 7.04–10.04 | Reloj solo sobre el mármol, junto a la caja | ❌ | **Logo girado ≈ −25 a −40° y desplazado** a la derecha y abajo del piñón. Los bastones siguen alineados. | 7.5 / 8.5 / 9.0 / 10.0 a 1:1 | Ver PREGUNTA 2. |

**Brillos de hora de R3: presentes.** Se cuentan 12 a 1:1 en 3.5, 4.5, 6.0 y 8.5; solo se pierden en la miniatura. El defecto real de R3 es el **logo girado desde 5.71** (hallazgo nuevo, no estaba en el brief).

## R4 — mujer con suéter beige (8.04 s)
Sin cortes internos (plano único, selfie).

| Intervalo (s) | Plano | Estado | Defecto | Evidencia | Qué hacer |
|---|---|---|---|---|---|
| 0.00–2.30 | Muñeca ante el pecho, esfera chica | ⚠️ | El logo se ve **espejado y además deforme**, girado 90–180°, aunque chico (≈20 px a 720; ≈30 px a 1080). La corona sale a la **izquierda** (imagen espejo de selfie). | 0.0 / 1.0 / 2.0 a 1:1 | Parche cuadro a cuadro con el color de la esfera (texto chico, sin dibujar logo) o cubrir. Ver PREGUNTA 1. |
| 2.30–6.85 | Brazo extendido, esfera grande hacia la cámara | ❌ | **Logo espejado y deforme**, grande y legible («TSƎW ƎИIИ», «NNE WEST»). Voltear el cuadro en horizontal (hflip) **no lo arregla**: queda «NNE WEST» mal escrito. | f57 (2.375) → f162 (6.75); 3.0 / 4.5 / 6.0 / 6.5 a 1:1 | Recortar fuera. |
| 6.88–8.04 | Baja el brazo, reloj de canto bajo el mentón; sonríe hacia 8.0 | ✅ | Esfera chica y luego de canto: el logo no se lee. | f165–f174; 7.0 / 7.5 / 8.0 | Usar. |

**Hipótesis del brief «logo espejado ≈2.5–6 s»: se confirma y es más amplia.** Va de **2.30 a 6.85**. También en **0–2.3** el logo está espejado y deforme, solo que chico: «usable ≈0–2.4» no queda limpio sin parche. Lo usable sin tocar empieza en **6.88**, no en 6.2.

---

## PREGUNTAS PARA EDDY (no se descarta nada sin su OK)
1. **R4 0–2.3 s**: el logo está espejado y deforme pero es chico. ¿Lo dejamos con un parche de color de esfera sobre la zona del logo, cuadro a cuadro, o reemplazamos el plano 6 del anuncio por R4 6.88–8.04? La corona a la izquierda (espejo) no tiene arreglo sin voltear el cuadro, y voltearlo no corrige el texto.
2. **R3 7.04–10.04 s** (plano 7 del anuncio, «reloj sobre mármol junto a la caja») tiene el logo girado unos 30° y fuera del centro. Si no hay un tramo limpio que lo reemplace, ¿se acepta cubrirlo ≥ 0.6 s con un elemento del universo, o se cambia por R2 8.67–10.04 (reloj sobre piedra, logo correcto)?
3. **R4 2.30–6.85 s** queda inutilizable por el logo espejado y grande, y cubrir ≥ 0.6 s no alcanza para 4.5 s. ¿Se da ese tramo por perdido?

## Intervalos finales recomendados

### Anuncio (brief §4A)
| # | Plano del brief | Brief decía | **Recomendado (s, `_orig`)** | Nota |
|---|---|---|---|---|
| 1 | Macro brazalete, gota | R2 ≈0–1.0 | **R2 0.00–1.10** | Limpio. |
| 2 | Esfera bajo la lupa, pinzas | R1 ≈0–2.5 | **R1 0.00–2.45** | Cortar antes de 2.50, donde desaparecen la piedra y las pinzas. |
| 3 | Reloj girando sobre la piedra | R2 ≈2–5 | **R2 3.15–4.95** | 1.92–3.08 es la corona con emblema: fuera. |
| 4 | Manos abren la caja | R3 ≈0–3 | **R3 0.96–3.00** (corte original en 1.875); alternativa R3 0.00–0.80 | Evitar 0.83–0.92, donde se deforma el logo de la tapa. |
| 5 | Macro esfera rosada en perspectiva | R2 ≈5–7 | **R2 5.80–7.04** | 5.0–5.65 es brazalete y 5.67–5.75 un fundido. |
| 6 | Mujer muestra el reloj | R4 ≈0–2.4 | **R4 0.00–2.25 con parche del logo** (PREGUNTA 1); alternativa sin parche: **R4 6.90–8.04** | El logo está espejado desde 0 s. |
| 7 | Reloj sobre mármol junto a la caja | R3 ≈7–10 | ⚠️ **R3 7.04–10.04 tiene logo girado** → propuesta: **R2 8.70–10.04** (reloj sobre piedra) o R1 8.10–10.04 (tapete) | PREGUNTA 2. |

### Historia (brief §4C)
| # | Plano del brief | Brief decía | **Recomendado (s, `_orig`)** | Nota |
|---|---|---|---|---|
| 1 | Reloj en el tapete con aro de luz | R1 ≈7–10 | **R1 8.10–10.04** | 7.0–8.04 son manos con dedales, no el reloj solo. |
| 2 | Mujer sonríe | R4 ≈6.2–8 | **R4 6.90–8.04** | 6.2–6.85 todavía muestra el logo espejado grande. |
| 3 | Reloj en muñeca sobre mármol | R3 ≈3–5 | **R3 4.10–5.65** | 3–4.08 son las manos levantando el reloj. |
| 4 | Macro de eslabones | R2 ≈7.5–9 | **R2 0.00–1.10** o **R2 5.02–5.62** | 7.08–8.67 es el pedestal con el broche mal grabado y la corona con emblema: no son eslabones. |
