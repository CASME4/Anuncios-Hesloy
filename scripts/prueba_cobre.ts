import { cobre, suave, tramo, UMBRALES, metal, oklchHex, frameDeUmbral } from '../src/cobre.ts';
const pasaron: string[] = [], fallaron: string[] = [], noSePudo: string[] = [];
const ok = (n: string, c: boolean) => (c ? pasaron : fallaron).push(n);
const C = { inicio: 0, golpe: 660, fin: 960 };
const H = { inicio: 0, golpe: 0, fin: 540 };
// extremos
ok('anuncio f0 = 0', cobre('anuncio', 0, C) === 0);
ok('anuncio golpe = 1 exacto', cobre('anuncio', 660, C) === 1);
ok('anuncio post-golpe = 1', cobre('anuncio', 900, C) === 1);
ok('historia f0 = 1', cobre('historia', 0, H) === 1);
ok('historia fin = 0.4', Math.abs(cobre('historia', 540, H) - 0.4) < 1e-12);
ok('historia nunca < 0.4', Array.from({ length: 700 }, (_, f) => cobre('historia', f, H)).every((v) => v >= 0.4 - 1e-12));
// monotonía
let mono = true;
for (let f = 1; f <= 960; f++) if (cobre('anuncio', f, C) < cobre('anuncio', f - 1, C)) mono = false;
ok('anuncio monótono', mono);
let monoH = true;
for (let f = 1; f <= 540; f++) if (cobre('historia', f, H) > cobre('historia', f - 1, H)) monoH = false;
ok('historia monótona decreciente', monoH);
// suave
let ms = true; for (let i = 1; i <= 100; i++) if (suave(i / 100) < suave((i - 1) / 100)) ms = false;
ok('suave monótona', ms && suave(0) === 0 && suave(1) === 1);
// cola de 24 f recorre todo el rango con pasos no nulos
const cola = Array.from({ length: 30 }, (_, i) => tramo(0.2 + (0.2 * i) / 29, 0.2, 0.4));
ok('cola suave 30 f recorre 0→1', cola[0] === 0 && cola[29] === 1 && cola.every((v, i) => i === 0 || v > cola[i - 1]));
// 8 umbrales
ok('8 umbrales en [0,0.9]', UMBRALES.length === 8 && UMBRALES.every((u) => u >= 0 && u <= 0.9));
ok('umbrales caen en frames distintos (6 de entrada ordenada)', new Set([0, 0.12, 0.25, 0.4, 0.55, 0.65, 0.9].map((u) => frameDeUmbral(u, C))).size === 7);
// color: nunca gris al final, L baja y C sube
const m0 = metal(0), m1 = metal(1), m4 = metal(0.4);
ok('metal(0) es plata (C<0.02)', m0.C < 0.02);
ok('metal(1) es oro rosa (C>0.06, H 20–60)', m1.C > 0.06 && m1.H > 20 && m1.H < 60);
ok('metal(0.4) nunca gris (C>0.02)', m4.C > 0.02);
ok('croma monótona 0→1 desde 0.4', metal(0.4).C <= metal(0.7).C && metal(0.7).C <= metal(1).C);
ok('hex válido', /^#[0-9a-f]{6}$/.test(oklchHex(m1)));
noSePudo.push('contraste/legibilidad de texto (se mide sobre MP4, no aquí)');
// CONTROL que debe fallar: un cobre sin clamp rompe el extremo
const roto = (f: number) => f / 660; ok('CONTROL: sin clamp pasa de 1 (debe FALLAR)', roto(900) <= 1);
const esperado = fallaron.filter((n) => n.startsWith('CONTROL'));
console.log(`pasaron ${pasaron.length} · fallaron ${fallaron.length} (de ellos ${esperado.length} controles esperados) · no se pudo medir ${noSePudo.length}`);
fallaron.forEach((n) => console.log('  FALLÓ:', n)); noSePudo.forEach((n) => console.log('  NO SE PUDO:', n));
console.log('hex oro rosa pleno:', oklchHex(m1), ' plata:', oklchHex(m0));
process.exit(fallaron.length === esperado.length && esperado.length === 1 ? 0 : 1);
