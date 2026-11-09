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
  it('hay 5 sopas pequeñas y 3 medianas o más, con identificadores distintos', () => {
    expect(sopas.filter((s) => s.tamano === 'pequena').length).toBeGreaterThanOrEqual(5);
    expect(sopas.filter((s) => s.tamano === 'mediana').length).toBeGreaterThanOrEqual(3);
    expect(new Set(sopas.map((s) => s.id)).size).toBe(sopas.length);
  });

  it.each(sopas.map((s) => [s.id, s] as const))('«%s» tiene la cuadrícula de su tamaño: 5 filas de 6 letras (pequeña) o 6 de 6 (mediana)', (_id, sopa) => {
    expect(sopa.cuadricula).toHaveLength(sopa.tamano === 'pequena' ? 5 : 6);
    for (const fila of sopa.cuadricula) expect(fila).toMatch(/^[A-ZÑ]{6}$/);
  });

  it.each(sopas.map((s) => [s.id, s] as const))('«%s» usa mayúsculas sin tildes y 3 (pequeña) o 5 (mediana) palabras distintas', (_id, sopa) => {
    const cuantas = sopa.tamano === 'pequena' ? 3 : 5;
    expect(sopa.referencia).toMatch(/^[A-ZÑ]+$/);
    expect(sopa.palabras).toHaveLength(cuantas);
    expect(new Set(sopa.palabras).size).toBe(cuantas);
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

  // Dirección de cada palabra: horizontal si está dentro de una fila; vertical si está dentro de una columna.
  const direcciones = (sopa: (typeof sopas)[number]) => {
    const enFilas = (palabra: string) => filas(sopa.cuadricula).some((fila) => fila.includes(palabra));
    const horizontales = sopa.palabras.filter(enFilas).length;
    return { horizontales, verticales: sopa.palabras.length - horizontales };
  };

  it('al menos 2 sopas pequeñas tienen más palabras en vertical que en horizontal', () => {
    const conMasVerticales = sopas.filter((s) => s.tamano === 'pequena').filter((s) => {
      const d = direcciones(s);
      return d.verticales > d.horizontales;
    });
    expect(conMasVerticales.length).toBeGreaterThanOrEqual(2);
  });

  it.each(sopas.filter((s) => s.tamano === 'pequena').map((s) => [s.id, s] as const))('«%s» (pequeña): las palabras de 6 letras van en horizontal', (_id, sopa) => {
    for (const palabra of sopa.palabras.filter((p) => p.length === 6)) {
      expect(filas(sopa.cuadricula).some((fila) => fila.includes(palabra))).toBe(true);
    }
  });
});
