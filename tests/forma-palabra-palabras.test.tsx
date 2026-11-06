import { palabras } from '../src/actividades/forma-palabra/palabras';

describe('Forma la palabra: lista de palabras', () => {
  it('tiene 100 palabras o más', () => {
    expect(palabras.length).toBeGreaterThanOrEqual(100);
  });

  it('cada palabra tiene de 4 a 7 letras, minúsculas y sin tildes', () => {
    for (const p of palabras) expect(p).toMatch(/^[a-zñ]{4,7}$/);
  });

  it('no hay palabras repetidas', () => {
    expect(new Set(palabras).size).toBe(palabras.length);
  });

  it('no hay dos palabras con las mismas letras', () => {
    const claves = palabras.map((p) => [...p].sort().join(''));
    expect(new Set(claves).size).toBe(claves.length);
  });
});
