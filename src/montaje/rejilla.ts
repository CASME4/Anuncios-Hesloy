// REJILLA — intocable. Dueño: coordinador. Revienta al importar si algo no cuadra.
// *** PROVISIONAL: la voz no se pudo generar (ElevenLabs bloqueado). Las ventanas de habla son
// *** ESTIMADAS a 3.0 palabras/s, no medidas. Al llegar la voz real se reemplaza VOZ_* por la medición.
export const FPS = 30;
const rnd = Math.round;

export type PiezaId = 'anuncio' | 'historia';

function construir(o: {
  bpm: number; total: number; kGolpe: number; tension: number;
  largosBeats: number[]; // largo de cada plano del cuerpo, de ATRÁS hacia adelante (último plano primero)
}) {
  const fpb = (FPS * 60) / o.bpm;
  const GOLPE = rnd(o.kGolpe * fpb);
  const REMATE_START = GOLPE - o.tension;
  // cortes contados hacia atrás desde REMATE_START con redondeo acumulativo
  const cortes: number[] = [REMATE_START];
  let acum = 0;
  for (const b of o.largosBeats) { acum += b * fpb; cortes.unshift(REMATE_START - rnd(acum)); }
  // cortes = [inicio plano1(0 tras ajuste), inicio plano2, ..., inicio último, REMATE_START]
  const inicios = cortes.slice(0, -1);
  inicios[0] = 0; // el primer plano absorbe el resto
  return { fpb, GOLPE, REMATE_START, TOTAL: o.total, inicios, planos: inicios.map((s, i) => ({ s, e: i + 1 < inicios.length ? inicios[i + 1] : REMATE_START })) };
}

export const ANUNCIO = construir({ bpm: 101, total: 960, kGolpe: 40, tension: 57, largosBeats: [5, 5, 5, 5, 5, 5, 5] });
// Historia: 7 planos serían demasiado: 4 planos de cuerpo (brief §4C), golpe en beat 27 de 134 bpm.
export const HISTORIA = construir({ bpm: 134, total: 540, kGolpe: 27, tension: 57, largosBeats: [5, 6, 6, 6] });

// ---- Voz PROVISIONAL (frames, estimados; inicio/fin de cada línea) ----
export const VOZ_ANUNCIO = {
  V1: [20, 20 + 90], V2: [190, 190 + 105], V3: [330, 330 + 195],
  V4: [ANUNCIO.GOLPE - 45, ANUNCIO.GOLPE + 60], V5: [ANUNCIO.GOLPE + 100, ANUNCIO.GOLPE + 190],
} as const;
export const VOZ_HISTORIA = {
  H1: [15, 15 + 70], H2: [120, 120 + 70], H3: [HISTORIA.GOLPE - 40, HISTORIA.GOLPE + 60], H4: [HISTORIA.GOLPE + 90, HISTORIA.GOLPE + 170],
} as const;

/** Rótulos: entran 4 f antes de su palabra y duran ≥ 45 f. [inicio, fin] en frames absolutos. */
const rot = (palabra: number, dur = 60): [number, number] => [palabra - 4, palabra - 4 + Math.max(45, dur)];
export const ROTULOS_ANUNCIO = {
  R1: rot(VOZ_ANUNCIO.V1[0] + 10, 70), R2: rot(VOZ_ANUNCIO.V1[0] + 50, 70),
  R3: rot(VOZ_ANUNCIO.V2[0] + 40, 70), R4: rot(VOZ_ANUNCIO.V3[0] + 10, 60),
  R5: rot(VOZ_ANUNCIO.V3[0] + 100, 75),
  R6: [ANUNCIO.GOLPE, ANUNCIO.GOLPE + 180] as [number, number],
  R7: [ANUNCIO.GOLPE + 100, ANUNCIO.TOTAL] as [number, number], R8: [ANUNCIO.GOLPE + 110, ANUNCIO.TOTAL] as [number, number],
};
export const ROTULOS_HISTORIA = {
  S1: rot(VOZ_HISTORIA.H1[0] + 5, 90), S2: rot(VOZ_HISTORIA.H2[0] + 5, 60),
  S3: [HISTORIA.GOLPE, HISTORIA.GOLPE + 120] as [number, number], S4: [HISTORIA.GOLPE + 90, HISTORIA.TOTAL] as [number, number],
};

/** Beats pares desde el golpe (anillos de brillos): frames absolutos. */
export const beatsPares = (p: typeof ANUNCIO, n = 5): number[] =>
  Array.from({ length: n }, (_, i) => p.GOLPE + rnd((i + 1) * 2 * p.fpb));

// ---- Guardas (revientan) ----
const chk = (c: boolean, m: string) => { if (!c) throw new Error('REJILLA: ' + m); };
for (const [n, P] of [['anuncio', ANUNCIO], ['historia', HISTORIA]] as const) {
  chk(P.REMATE_START > 0 && P.GOLPE < P.TOTAL - 90, `${n}: golpe debe dejar ≥ 3 s de cierre`);
  chk(P.inicios.every((s, i, a) => i === 0 || s - a[i - 1] >= 60), `${n}: plano < 2 s`);
  chk(Math.abs(P.GOLPE - P.REMATE_START - 57) === 0, `${n}: TENSION`);
}
for (const [k, [a, b]] of Object.entries({ ...ROTULOS_ANUNCIO, ...ROTULOS_HISTORIA })) chk(b - a >= 45, `rótulo ${k} < 45 f`);
