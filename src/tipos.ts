// Tipos compartidos (dueño: coordinador). Todos los módulos los importan; nadie los edita.
export type Banda = 'alta' | 'baja';
/** Todo componente visual recibe frame LOCAL (0 = su primer cuadro) y `cobre` ya calculado. */
export interface Tiempo { frame: number; cobre: number }
export const W = 1080;
export const H = 1920;
export const FPS = 30;
export const ZONA = {
  anuncio: { arriba: 269, abajo: 672, lados: 120, bandaAlta: [269, 840], bandaBaja: [840, 1248], derechaBajaMax: 780 },
  historia: { arriba: 269, abajo: 384, lados: 120, limiteY: 1536 },
} as const;
export const PALETA = {
  esfera: '#E2CAC0', rosaClaro: '#EDD9CE', oroRosa: '#CBA696', esferaSombra: '#B99FA0',
  cobre: '#9B7365', cafe: '#281714', marmol: '#B7AA92', blanco: '#FFFFFF',
} as const;
