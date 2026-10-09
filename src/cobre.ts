// `cobre` — cuánto cobre se ha fundido en el metal. 0 = plata fría, 1 = oro rosa pleno.
// Único parámetro del universo «EL TOQUE DE COBRE». Dueño: coordinador. Funciones puras.

export const clamp01 = (x: number): number => (x < 0 ? 0 : x > 1 ? 1 : x);
export const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;

/** smootherstep monótona: recorre todo [0,1] sin escalón. */
export const suave = (t: number): number => {
  const x = clamp01(t);
  return x * x * x * (x * (x * 6 - 15) + 10);
};

/** Los 8 umbrales de entrada de las figuras (ochavos). */
export const UMBRALES = [0.0, 0.12, 0.25, 0.4, 0.55, 0.65, 0.9, 0.1] as const;

export type Pieza = 'anuncio' | 'historia';

export interface CurvaCobre {
  /** frame en que arranca el cuerpo */
  inicio: number;
  /** frame del golpe (anuncio: cobre = 1 aquí) */
  golpe: number;
  /** frame final de la pieza */
  fin: number;
}

/** Anuncio: 0 → 1 llegando a 1 EXACTO en el golpe, 1 después. Historia: 1 → 0.4 (nunca gris). */
export const cobre = (pieza: Pieza, frame: number, c: CurvaCobre): number => {
  if (pieza === 'anuncio') {
    const t = (frame - c.inicio) / Math.max(1, c.golpe - c.inicio);
    return clamp01(t) ; // lineal: las transiciones aplican su propio `suave` sobre su tramo
  }
  const t = (frame - c.inicio) / Math.max(1, c.fin - c.inicio);
  return lerp(1, 0.4, clamp01(t));
};

/** Progreso de una firma: `cobre` recorre [a,b] → [0,1] monótono con `suave`. */
export const tramo = (cb: number, a: number, b: number): number => suave((cb - a) / (b - a));

/** Frame en que `cobre` cruza un umbral (anuncio, lineal). */
export const frameDeUmbral = (u: number, c: CurvaCobre): number =>
  Math.round(c.inicio + u * (c.golpe - c.inicio));

// ---- Color del metal en OKLCH (plata → rosa claro → oro rosa → cobre) ----
export type OKLCH = { L: number; C: number; H: number };

// Anclas medidas de la ficha: #EDD9CE, #CBA696, #9B7365; plata fría L .86 C .008 H 250.
export const ANCLAS_METAL: ReadonlyArray<{ u: number; c: OKLCH }> = [
  { u: 0.0, c: { L: 0.88, C: 0.008, H: 250 } },
  { u: 0.4, c: { L: 0.91, C: 0.03, H: 50 } },
  { u: 0.7, c: { L: 0.75, C: 0.055, H: 42 } },
  { u: 1.0, c: { L: 0.68, C: 0.09, H: 38 } },
];

/** Interpolación OKLCH del metal con el hue por el camino corto. */
export const metal = (cb: number): OKLCH => {
  const u = clamp01(cb);
  for (let i = 1; i < ANCLAS_METAL.length; i++) {
    const a = ANCLAS_METAL[i - 1];
    const b = ANCLAS_METAL[i];
    if (u <= b.u) {
      const t = (u - a.u) / (b.u - a.u);
      let dh = b.c.H - a.c.H;
      if (dh > 180) dh -= 360;
      if (dh < -180) dh += 360;
      return { L: lerp(a.c.L, b.c.L, t), C: lerp(a.c.C, b.c.C, t), H: (a.c.H + dh * t + 360) % 360 };
    }
  }
  return ANCLAS_METAL[ANCLAS_METAL.length - 1].c;
};

export const oklchCss = (c: OKLCH): string => `oklch(${c.L.toFixed(4)} ${c.C.toFixed(4)} ${c.H.toFixed(2)})`;

/** OKLCH → sRGB hex (para SVG/canvas que no entienden oklch()). */
export const oklchHex = ({ L, C, H }: OKLCH): string => {
  const h = (H * Math.PI) / 180;
  const a = C * Math.cos(h);
  const b = C * Math.sin(h);
  const l_ = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m_ = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s_ = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
  const lin = [
    4.0767416621 * l_ - 3.3077115913 * m_ + 0.2309699292 * s_,
    -1.2684380046 * l_ + 2.6097574011 * m_ - 0.3413193965 * s_,
    -0.0041960863 * l_ - 0.7034186147 * m_ + 1.707614701 * s_,
  ];
  const g = (v: number) => {
    const x = clamp01(v);
    return x <= 0.0031308 ? 12.92 * x : 1.055 * x ** (1 / 2.4) - 0.055;
  };
  return '#' + lin.map((v) => Math.round(g(v) * 255).toString(16).padStart(2, '0')).join('');
};
