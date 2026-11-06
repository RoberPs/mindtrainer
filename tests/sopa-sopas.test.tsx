import { sopas } from '../src/actividades/sopa-de-letras/sopas';

// Lee las filas (izquierda a derecha) y las columnas (arriba abajo) de una cuadrícula.
const filas = (cuadricula: string[]) => cuadricula;
const columnas = (cuadricula: string[]) =>
  [...cuadricula[0]].map((_, c) => cuadricula.map((fila) => fila[c]).join(''));

// Cuenta las apariciones de una palabra, también las que se solapan.
function contar(texto: string, palabra: string) {
  let veces = 0;
  for (let i = 0; i + palabra.length <= texto.length; i++) {
    if (texto.startsWith(palabra, i)) veces++;
  }
  return veces;
}
const alReves = (texto: string) => [...texto].reverse().join('');

describe('Sopa de letras: lista de sopas', () => {
  it('hay 5 sopas o más, con identificadores distintos', () => {
    expect(sopas.length).toBeGreaterThanOrEqual(5);
    expect(new Set(sopas.map((s) => s.id)).size).toBe(sopas.length);
  });

  it.each(sopas.map((s) => [s.id, s] as const))('«%s» tiene una cuadrícula de 5 filas de 6 letras', (_id, sopa) => {
    expect(sopa.cuadricula).toHaveLength(5);
    for (const fila of sopa.cuadricula) expect(fila).toMatch(/^[A-ZÑ]{6}$/);
  });

  it.each(sopas.map((s) => [s.id, s] as const))('«%s» usa mayúsculas sin tildes y 3 palabras distintas', (_id, sopa) => {
    expect(sopa.referencia).toMatch(/^[A-ZÑ]+$/);
    expect(sopa.palabras).toHaveLength(3);
    expect(new Set(sopa.palabras).size).toBe(3);
    for (const palabra of sopa.palabras) {
      expect(palabra).toMatch(/^[A-ZÑ]{4,6}$/);
      expect(palabra).not.toBe(sopa.referencia);
    }
  });

  it.each(sopas.map((s) => [s.id, s] as const))(
    '«%s» esconde cada palabra exactamente una vez, solo en horizontal o vertical y nunca al revés',
    (_id, sopa) => {
      const lineas = [...filas(sopa.cuadricula), ...columnas(sopa.cuadricula)];
      for (const palabra of sopa.palabras) {
        const veces = lineas.reduce((total, linea) => total + contar(linea, palabra), 0);
        expect(veces).toBe(1);
        const alRevesVeces = lineas.reduce((total, linea) => total + contar(linea, alReves(palabra)), 0);
        expect(alRevesVeces).toBe(0);
      }
    },
  );
});
