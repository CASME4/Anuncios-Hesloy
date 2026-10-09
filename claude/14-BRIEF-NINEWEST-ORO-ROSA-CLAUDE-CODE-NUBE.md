# BRIEF · «EL TOQUE DE COBRE» — Reloj Nine West NW/2098PKRG Oro Rosa Dama 36 mm

> Copia operativa del brief de Eddy (2026-10-09) para la sesión de Claude Code en la nube. Es la fuente de verdad: si algo no está acá, no está confirmado.

| campo | valor |
|---|---|
| Producto (ficha) | «Reloj Nine West NW/2098PKRG Oro Rosa Dama 36 mm» |
| Precio actual | «Q595.00» · sin tachado, sin «antes/ahora», sin «desde» |
| Piezas | ANUNCIO 1080×1920 @30 · ~32 s · CTA `DA CLIC` — HISTORIA 1080×1920 @30 · ~18 s · CTA `ESCRÍBENOS` + versión muda |
| Material recibido | 4 clips Seedance, 720×1280 · 24 fps: `R1` …05_03_07 (10.04 s) · `R2` …05_06_38 (10.04 s) · `R3` …05_10_36 (10.04 s) · `R4` seedance-2-5 …05_03_16 (8.04 s) + captura de la ficha (4 fotos: frente, en la muñeca con flores blancas, reverso, caja) — **la captura NO llegó en el zip** |
| Fecha | 2026-10-09 |
| Se construye con | Claude Code en la nube, solo modelos de Claude |

Los nombres `R1…R4` siguen el orden alfabético de los archivos del zip.

## Skills
remotion-best-practices · remotion-create · remotion-markup · remotion-studio · remotion-render · remotion-captions · remotion-interactivity · remotion-multimedia · remotion-docs · beat-sync-editing · motion-art-direction · animation-principles · kinetic-typography · shot-composition · color-motion · particle-system · shader-glsl · motion-background. En la nube las skills globales de la Mac NO existen: solo las del repo o las instaladas en sesión; las que falten se anotan «no instalada» y no se sustituyen. Antes de escribir código: `find-skills` por tema (animación 3D, efectos CSS, SVG animado, partículas, shaders, tipografía cinética, paralaje sin WebGL) e instalar solo lo que aporte; reportar en una línea qué se buscó, qué se encontró, qué se activó (o «nada nuevo»).

## A0 · Entorno de la nube
VM Ubuntu 24.04, 4 vCPU, 16 GB, 30 GB disco. Render con `--concurrency=2`, un render a la vez con candado, en segundo plano, por tramos y unidos con ffmpeg sin re-codificar. **La VM se recicla**: commit + push al final de cada ola, con `ESTADO.md` y `RETOMA.md` al día. Red «Custom» con `api.elevenlabs.io`, `*.youtube.com`, `youtu.be`, `*.googlevideo.com`, `*.ytimg.com`; clave de ElevenLabs como API credential (header `xi-api-key`), nunca en variables de entorno.

## A · Escuadrón (tope 4 a la vez)
| Rol | Modelo · esfuerzo |
|---|---|
| Coordinador | claude-opus-5-5 · high |
| `medidor` (medir clips, BPM, voz, SFX; nunca construye ni decide) | claude-haiku-5-5 · medium |
| `voz` | claude-sonnet-5-5 · high |
| `auditor-clips`, constructores (transiciones, montaje, remate síntesis, sonido, integrador) | claude-opus-5-5 · high |
| `constructor-tipografia`, `constructor-metal` | claude-opus-5-5 · max |
| `remate-p1…p4` (física · luz · cámara · tipografía) | claude-fable-5-1 · high (sonda «Responde solo OK» antes) |
| 6 críticos con veto, solo lectura | claude-sonnet-5-5 · high |
| `jurado` | claude-fable-5-1 · high (el que juzga no es el que construyó) |

Un dueño por carpeta: coordinador (`ESTADO.md`, `RETOMA.md`, `LEYES.md`, `CONTRATO.md`, `src/cobre.ts`, `src/montaje/rejilla.ts`) · medidor (`_medidas/`, `musica/`, `sfx_crudos/`) · auditor-clips (`tablero_clips.md`) · voz (`voz/`) · constructor-tipografia (`src/type/`) · constructor-metal (`src/escena/`) · constructor-transiciones (`src/transiciones/`) · remate-pN (`src/remate/prop_PN/`) · síntesis (`src/remate/anuncio/`, `src/remate/historia/`) · integrador (`src/montaje/` salvo `rejilla.ts`, `Pieza.tsx`) · sonido (`audio/`, `sfx_spotting.json`).

Olas: S setup → 0 (medidor, auditor-clips, voz) → W (whisper, un proceso a la vez) → 1 (metal, transiciones, tipografía, remate-p1…p4; tope 4) → 1c (4 jurados Sonnet → 2 síntesis Opus) → 2 (integrador; tipografía re-mide sobre fondo real; render p0) → 3 (6 críticos sobre p0; `FIX_*.md` con metas numéricas) → 4 (arreglos) → 5 (críticos ronda 2 + arreglos) → 6 (sonido) → C (jurado, candidata, PARADA).
Reglas: el coordinador decide sin preguntar y anota en `ESTADO.md` (salvo descartar material); respaldo antes de cada ronda de arreglos; rejilla volcada antes/después con md5; commit + push por ola; nadie corrige a un subagente vivo; cada subagente devuelve un resumen, no el volcado. Si hay que recortar: las 4 propuestas de remate a 2, **nunca las rondas de crítica**.

## C · Reglas que no se rompen
1. **Cero datos inventados.** De la ficha solo: «Reloj Nine West NW/2098PKRG», «Oro Rosa», «Dama», «36 mm», Q595, «esfera rosada y reflejos cálidos para vestir la muñeca con delicadeza», «acompaña una camisa marfil o una cena sin recargar el conjunto», «Envío 24–48h a toda Guatemala», marca Nine West. Material del metal, movimiento y resistencia al agua: falta verificar. «Oro rosa» es el **color**: nunca decir ni escribir que el reloj es de oro.
2. Solo el precio actual. Q790 tachado, «¡Oferta!» y «3 DISPONIBLES» no entran.
3. Nunca «ORIGINAL» ni «100 % ORIGINAL», ni «factura y código verificable».
4. Nunca dos personas juntas en cuadro.
5. Nunca redibujar el logo «NINE WEST»: en el reloj dibujado la esfera va sin logo; el logo solo aparece tal como está en clip o foto.
6. Todo material cubre 1080×1920 (×1.5), sin bandas; nada desaturado: se mide y se sube.
7. Nada quieto en el cuerpo; el remate sostenido es legítimo y se declara.
8. Cero emoji ni iconos de stock: las 8 figuras son SVG propios.
9. Copy en «tú»; «el equipo Hesloy»; `@hesloystore`; `HESLOY.COM`.
10. Defecto detectado = arreglado o avisado antes de entregar.

**Zona segura (1080×1920, solo texto y UI).** ANUNCIO: arriba 269 · abajo 672 · lados 120 · derecha 300 debajo de `y=840`; banda alta = arriba de `y=840` (hasta 840 px de ancho); banda baja = `y=840`–`y=1248` (hasta 660 px, nunca pasa `x=780`); nada importante debajo de `y=1248`. HISTORIA: arriba 269 · abajo 384 · lados 120; nada debajo de `y=1536`. Siempre entre `x=120` y `x=960`.

**Remotion 4.0.534** (4.0.531 prohibida; plan B 4.0.530). Todo valor es función pura de `useCurrentFrame()`: prohibido `requestAnimationFrame`, GSAP, `Math.random()` (usar `random(seed)` o sucesión áurea), CSS `transition`/`animation`. `feTurbulence` con seed fija; `transform-origin` explícito; **prohibido `background-clip: text`** (texto con degradado = SVG `<text fill="url(#g)">`). Clips 24→30 fps interpolando (`minterpolate=mi_mode=mci:mc_mode=aobmc:vsbmc=1`), nunca pulldown; todos `muted`; grano 2–3 %. Audio WAV 48 kHz; máster −14 LUFS, TP −1.0; música bajo la voz −8 a −11 dB; SFX ≤ −5 LU bajo la voz; kick y golpe nunca en el mismo frame. Se aprueba sobre el MP4 completo, nunca sobre un still o el Studio.

## D · Oficio del recetario (el recetario NO llegó; estos son los principios del brief)
1. Un parámetro, una función probada (`src/cobre.ts` + script con pasaron / fallaron / no se pudo medir; extremos, monotonía, 8 umbrales, cola con `suave` que recorre todo el rango ≥ 24 f).
2. Rejilla intocable (`rejilla.ts`, revienta al importar): voz medida por energía, sin estirarla; golpe = primer beat `k` con `rnd(k·fpb) ≥ finV3 + SILENCIO_MIN_F + TENSION`; `REMATE_START = GOLPE − TENSION`; cortes contados hacia atrás desde el golpe con redondeo acumulativo; rótulos 4 f antes de su palabra y ≥ 45 f; SFX 2 f antes de su objeto.
3. Transición = capa sobre corte seco: APERTURA (`pre 0`, 100 % en el último cuadro) o CUBIERTA (`pre = round(0.75·cola)`, 100 % en el cuadro del corte). Sin 100 % en el pico, no se entrega.
4. El plano viejo deriva, no se congela. 5. Cada firma, una vez por pieza.
6. Objetos con peso: trazo → relleno, luz que barre, sombra sobre el video, grosores en px de pantalla, el héroe en un subpath.
7. Un solo acento de color a croma plena: el rosa del metal.
8. Una sola capa rítmica por cierre; lo demás en periodos coprimos (138, 50/62, 75, 90, 240 f); la cámara no bombea.
9. El héroe del remate se dibuja con código, nunca clip ni foto enmascarada.
10. Lo dibujado que imita el producto se compara en número con el metraje (luma, p90, tono OKLCH contra `R2`).
11. Todo se mide sobre el MP4 con un control construido para fallar; lo de los críticos se verifica a 1:1 antes de tocar.
12. El sonido nace de lo que se ve.

---

## 0 · Supuestos y huecos
Material del metal sin confirmar (el oro rosa es color, no afirmación). Logo espejado en R4 ≈2.5–6 s («TSEW ƎNIN»): recortar o cubrir, nunca redibujar. Emblema inventado en la corona de R2 ≈1–1.5 s y logo girado en R1/R2: auditar a 1:1. Brillos de hora de la esfera pueden faltar en R3/R4. Universos quemados: NUEVE OESTE, UN MILLÓN, LA HORA EN PUNTO, EL DERRAME, A PLOMO, ESPIRAL A ESPIRAL (nada de burbujas, líquido que se derrama, plomada ni malla). Tipografía: Archivo Black + Fredoka con degradado de metal rosa. Historia solo como Story. BPM de canciones nuevas por medir. Preview: Studio en la VM no accesible desde el teléfono → candidatas livianas + `claude --teleport`.

## 1 · El universo
- Hecho ancla: el oro rosa es oro aleado con cobre; el de 18 quilates lleva 75 % oro, 22.25 % cobre y 2.75 % plata, y a más cobre, más rojo (Wikipedia, «Rose gold»). La ficha confirma «Oro Rosa» y «reflejos cálidos».
- Objeto: una gota de metal que se entibia: plata fría → rosa al fundirse el cobre.
- **Parámetro único `cobre` ∈ [0,1]**: 0 = plata fría, 1 = oro rosa pleno. Cuelga de: transiciones (el recorte avanza con `cobre`, monótono); revelado de texto (tono de plata a rosa, OKLCH, escalonado por línea); ritmo (cada elemento entra cuando `cobre` cruza su ochavo).
- Anuncio: `cobre` 0 → 1, llega a 1 en el golpe. Historia: 1 → 0.4 (nunca vuelve a gris).
- No se anima: la esfera real, sus índices, brillos y el logo.

| # | Figura (SVG propio) | Entra cuando `cobre` cruza |
|---|---|---|
| 1 | Gota de metal (reflejo especular, sombra; plata→rosa) | 0.00 |
| 2 | Hilo de cobre (remolino) | 0.12 |
| 3 | Frente de fusión (borde ondulado, filo caliente) | 0.25 |
| 4 | Eslabón (perspectiva, bisel de 3 caras) | 0.40 |
| 5 | Brillo de hora (destello de 4 puntas) | 0.55 |
| 6 | Índice de bastón biselado | 0.65 |
| 7 | Losa-etiqueta del precio (4 capas, ventana oscura) | 0.90 |
| 8 | Vapor de calor y chispas (sucesión áurea) | 0.10 y en el golpe |

## 2 · Voz
Carolina `22VndfJPBU7AZORAZZTT`; `eleven_v4` si `GET /v1/models` lo lista, si no `eleven_v3`. Dama: `[admiringly] [smiling] [bright]`. 3 tomas por línea; en la línea del precio probar `Creative` contra `Natural`; «Nine West» en dos grafías.
ANUNCIO — V1 «¡Mira esta esfera rosada… [pause] con reflejos cálidos!» · V2 «¡Para vestir tu muñeca con delicadeza, sin recargar el conjunto!» · V3 «¡El Nine West oro rosa de treinta y seis milímetros, y te llega a toda Guatemala en veinticuatro a cuarenta y ocho horas!» · V4 «[pause] ¡Tuyo por quinientos noventa y cinco quetzales! [pause]» (acá cae el precio) · V5 «¡Dale clic y pídelo en Hesloy punto com!»
HISTORIA — H1 «¡Esfera rosada… [pause] y reflejos cálidos!» · H2 «¡Con una camisa marfil o para una cena!» · H3 «[pause] ¡Tuyo por quinientos noventa y cinco quetzales! [pause]» · H4 «¡Escríbenos y te llega en veinticuatro a cuarenta y ocho horas!»
Voz real ≈ 3.0 palabras/s (se mide con la toma). Hueco de voz > 2.9 s → línea extra con datos de la ficha, nunca un dato nuevo.

## 3 · Rótulos
Archivo Black (ganchos) + Fredoka 700 (amable, CTA); numerales del precio como contornos (opentype.js). Capas SVG: sombra dura 8–10 px abajo-derecha `#281714`; contorno blanco 10–12 px; contorno interior café 3 px; cara con degradado de metal por frame atado a `cobre` (bajo: plata→blanco; alto: `#EDD9CE` → `#CBA696` → `#9B7365`). Barrido de luz al entrar (16 f, `plus-lighter`), respira 50 f, destello contrario 62 f. Escala 0.86→1.06→1.00, inclinación alterna −4°/+3°, escalonado por línea (5 f), nunca por letra; salida por frente de fusión. Mayúscula ≥ 42 px, ganchos 96–140 px. Paleta: esfera `#E2CAC0` · rosa claro `#EDD9CE` · oro rosa `#CBA696` (acento único, croma subida) · esfera en sombra `#B99FA0` · cobre `#9B7365` · café `#281714` · mármol `#B7AA92` · blanco `#FFFFFF`. Ventana ≥ 45 f. Legibilidad 3:1 medida con controles.

| # | Pieza | Texto EXACTO | Voz | Banda |
|---|---|---|---|---|
| R1 | anuncio | «ESFERA» / «ROSADA» | V1 | alta |
| R2 | anuncio | «REFLEJOS CÁLIDOS» | V1 | baja |
| R3 | anuncio | «CON DELICADEZA» | V2 | alta |
| R4 | anuncio | «ORO ROSA» / «36 MM» | V3 | alta |
| R5 | anuncio | «ENVÍO 24–48 H» / «A TODA GUATEMALA» | V3 | baja |
| R6 | anuncio | «Q595» + cintillo «ORO ROSA · 36 MM · ENVÍO 24–48 H» | V4 | baja |
| R7 | anuncio | «DA CLIC» | V5 | baja |
| R8 | anuncio | «HESLOY.COM» | V5 | alta |
| S1 | historia | «ESFERA ROSADA» | H1 | — |
| S2 | historia | «MARFIL · CENA» | H2 | — |
| S3 | historia | «Q595» + el mismo cintillo | H3 | — |
| S4 | historia | «ESCRÍBENOS» + «@HESLOYSTORE» | H4 | — |

## 4A · Anuncio (~32 s; tiempos los deriva `rejilla.ts`)
1. Macro del brazalete en penumbra, gota plata cae sobre un eslabón (`R2` ≈0–1.0 s + figs 1 y 8) · seco `gotaQueCae` · R1 · V1
2. Esfera bajo la lupa, pinzas en la aguja (`R1` ≈0–2.5 s) · `hiloDeCobre` APERTURA · R1,R2 · V1
3. Reloj girando sobre la piedra (`R2` ≈2–5 s) · `frenteDeFusion` CUBIERTA · R3 · V2
4. Manos abren la caja blanca (`R3` ≈0–3 s) · `eslabonForjado` APERTURA · V2
5. Macro esfera rosada en perspectiva (`R2` ≈5–7 s) · `brilloDeHora` APERTURA · R4 · V3
6. Mujer muestra el reloj (`R4` ≈0–2.4 s, antes del logo espejado) · `vaporDeCalor` CUBIERTA total · R5 · V3
7. Reloj sobre mármol junto a la caja (`R3` ≈7–10 s) · `bastonDeLuz` APERTURA
8. Remate y precio (bloque 6) · corte seco con el golpe · R6–R8 · V4, V5

## 4B · Auditoría de clips
R1 taller (lupa, pinzas, prensa, guantes, tapete con aro de luz): logo girado posible ≈6–10 s. R2 CGI (eslabones, corona, giro en piedra, macros): emblema inventado en la corona ≈1–1.5 s; logo girado ≈8–9 s. R3 unboxing en mármol: auditar brillos. R4 mujer con suéter beige: logo espejado ≈2.5–6 s; usable ≈0–2.4 s y ≈6.2–8 s. Tapar, en orden: recorte con keyframes → cubrir con un elemento del universo ≥ 0.6 s → parche medido cuadro a cuadro solo para texto chico. Nunca blur, inpainting ni dibujar el logo. **Ningún clip se descarta sin OK de Eddy.**

## 4C · Historia (~18 s)
1. Reloj en el tapete con aro de luz, rosa pleno (`R1` ≈7–10 s) · seco `gotaQueCae` · S1 · H1
2. Mujer sonríe (`R4` ≈6.2–8 s) · `frenteDeFusion` al revés (se enfría) · S1 · H1
3. Reloj en muñeca sobre mármol (`R3` ≈3–5 s) · `brilloDeHora` · S2 · H2
4. Macro de eslabones (`R2` ≈7.5–9 s) · `hiloDeCobre` al revés
5. Remate y precio · corte seco · S3, S4 · H3, H4

## 5 · Transiciones firma (lentas y encadenadas; cola 28–36 f; capa sobre corte seco; 100 % medido en el MP4 con control)
| Nombre | Familia · cola | Qué la produce | `cobre` | Anuncio | Historia |
|---|---|---|---|---|---|
| `hiloDeCobre` | APERTURA · 30 | hebra de cobre en remolino; el ojo crece (52 → ≥ 1.1×1101.4 px) y abre el plano | 0.05→0.20 | 1→2 | 4→5 (al revés) |
| `frenteDeFusion` | CUBIERTA · 34 (pre 26) | frente de metal líquido en diagonal con filo caliente; se retira simétrico +2 f | 0.20→0.40 | 2→3 | 1→2 (al revés) |
| `eslabonForjado` | APERTURA · 30 | eslabón en perspectiva, su hueco es la ventana; se forja otro detrás | 0.40→0.55 | 3→4 | — |
| `brilloDeHora` | APERTURA · 28 | doce destellos de 4 puntas en círculo; cada uno abre un círculo que crece | 0.55→0.65 | 4→5 | 2→3 |
| `vaporDeCalor` | CUBIERTA total · 36 (pre 27) | ondas de calor y chispas, opaco 100 % ≥ 1 f; corte debajo | 0.65→0.80 | 5→6 | — |
| `bastonDeLuz` | APERTURA · 30 | índice de bastón cruza como barra de luz biselada | 0.80→0.90 | 6→7 | — |
| `gotaQueCae` | SECO · 8–14 | gota y tic metálico acompañan el corte | — | frame 0 | frame 0 |
Cada firma una vez por pieza (6 anuncio, 3 historia). Cero de librería, ningún `fade()`. El corte al precio va seco. **Sin imágenes generadas**: todo fondo y textura con código (degradados OKLCH, `feTurbulence` seed fija, `feDisplacementMap`, `radialGradient`, partículas áureas).

## 6 · El remate y el precio
ANUNCIO «SE FUNDE EN ROSA» (arranca en `REMATE_START = GOLPE − TENSION`, ≈s 22): se CONSTRUYE, la cámara ENTRA. Héroe dibujado: reloj caja 36 mm, esfera rosada **sin logo**, 12 bastones y 12 brillos de hora medidos, agujas, corona lisa, brazalete de eslabones. Única capa rítmica: anillo de doce brillos en cada beat par desde el golpe (5).
1. Acto 1 (≈18 f): sobre fondo vivo rosa en penumbra cae una gota plata (halo, pozo, cuerpo, núcleo cálido).
2. Acto 2 build (≈39 f, `entra` = t^1.7): zoom logarítmico; 8 ticks que aceleran: entra cobre a la gota y nace una pieza del reloj sobreexpuesta en blanco que se enfría a rosa (caja → esfera → bastones → brillos → agujas → segundero → corona → brillo del cristal). Cada tick sube un ochavo de `cobre`.
3. Acto 3, la losa: caída de 16 f desde 40 px sobre el cuadro con `g = 2D/T²`, toca la mesa exactamente en el golpe; estirada (`sx = 1 − 0.035·(v/vmax)²`, `sy = 1 + 0.07·(v/vmax)²`); aplasta 1.22 × 0.80 pivotando en el centro del borde inferior; sombra en `mesaY + 11` que no viaja; 3 ondas; desenfoque ≤ 5 px.
4. Golpe: velo café .5 en G−1; UN cuadro de luz plena en G; desde G+1 destello radial desde el canto, debajo de losa y texto, rampa blanco → rosa claro → oro rosa → cobre → café en gamma 2.2. `cobre` llega a 1 en G: todo el reloj pasa a oro rosa pleno y en ese instante nace el brazalete de eslabones (sólido en 8 f; metal claro con lomo, juntas cobre medio, nunca negras, brillo anisotrópico, banda de luz 220 px, sombra de la caja).
5. Precio: losa ≈560×244 de 4 capas (canto biselado 11 px, cara hundida, veta de pulido, líneas de luz y pozo); ventana café oscura y «Q595» en rosa claro (contraste 12.04:1); numeral dentro del `<g transform>` de la losa; trazo desde G (6 f), relleno G+3 a G+8; «Q» con contorno 4.5 px. Cintillo en dos líneas (G+6, G+10) saliendo de detrás de la losa sobre cama opaca. Nada cae sobre el cintillo; nada `plus-lighter` sobre el precio.
6. Acto 4 cierre: reloj grande (≈60 % ancho); 12 brillos de hora se encienden en sentido horario; segundero da una vuelta y luego pasos de 6° con rebote de cuarzo; barrido de 150 px a 28° cada 90 f; 5 anillos de brillos en beats pares; CTA «DA CLIC» en placa oro rosa en la banda baja.
HISTORIA «REFLEJOS CÁLIDOS» (arranca ≈s 10): se ENFRÍA Y SE DESARMA, la cámara SE ALEJA. Reloj en rosa pleno llena el cuadro; la losa cae nítida (tres filos de luz de 2 px); `cobre` 1 → 0.4; piezas se separan del impacto (rapidez `26 + 34·áureo(i+1)` px/f, ±26°, nunca hacia abajo, gravedad 2.1 px/f², giro ±12°/f), una órbita hacia atrás las devuelve; pasan por detrás de la losa. Cierra `ESCRÍBENOS · @HESLOYSTORE` en pastilla rosa claro. Cae sobre la palabra «quinientos», en el downbeat que Eddy elija entre tres candidatos. El brief no escribe frames.

## 7 · Música (yt-dlp; WAV 48 kHz; historia también muda)
ANUNCIO: 1★ Tusa (Karol G, Nicki Minaj) 101 · 2 BbY WOW BbY WOW · 3 SUPERESTRELLA (Aitana) · 4 Con Calma 94 · 5 Despechá 130 · 6 Gasolina 96 · 7 Blinding Lights 171 (half-time) · 8 Sunflower 90.
HISTORIA: 1★ Die For You (The Weeknd) 67/134 · 2 Me Rehúso · 3 I Feel It Coming 93 · 4 Circles 90 · 5 Call Out My Name 75 · 6 DÁKITI 110 · 7 Save Your Tears 118 · 8 Earned It.
Se pide: 3 downbeats candidatos para el precio (segundo y frame) y el tramo sostenido más fuerte de cada pista. Decide Eddy escuchando.

## 8 · SFX (ElevenLabs Sound Effects para lo real; síntesis para lo abstracto)
`whoosh` (2 f antes de cada firma) · `tick` (cada ochavo de `cobre`) · `riser` (build) · `slam` (golpe; nunca en el kick) · `sparkle` (cada brillo de hora) · `impact_tail` · `boom_sub` (opcional). Spotting cuadro a cuadro después de cerrar la imagen; whisper sobre el máster debe decir «Hesloy».

## 9 · Material que falta
Material del metal / movimiento / resistencia al agua (Eddy); foto de frente en alta resolución; fondos y texturas por código.

## 10 · Antes de renderizar el final (PARADA)
Candidatas livianas 540×960 de cada pista por defecto con los 3 downbeats pusheadas a la rama; `RETOMA.md` con `claude --teleport <id>` para abrir el Studio en la Mac de Eddy con selector de música vivo; render final solo con su OK.
