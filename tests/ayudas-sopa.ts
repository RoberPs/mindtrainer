import type { Casilla, Partida } from '../src/actividades/sopa-de-letras/juego';
import type { Sopa } from '../src/actividades/sopa-de-letras/sopas';

// Sopa propia de las pruebas: no depende del contenido de sopas.ts.
// LLUVIA (fila 0) y ARENA (columna 5) se cruzan en la casilla 0,5; OLAS está en la fila 3.
export const sopaDePrueba: Sopa = {
  id: 'prueba',
  referencia: 'PRUEBA',
  palabras: ['LLUVIA', 'ARENA', 'OLAS'],
  cuadricula: ['LLUVIA', 'BBBBBR', 'CCCCCE', 'OLASZN', 'DDDDDA'],
};

// Partida nueva con la sopa de prueba.
export function partidaDePrueba(): Partida {
  return { sopa: sopaDePrueba, encontradas: [], marca: null, intentos: 0, aviso: 'ninguno' };
}

// Busca una palabra en la cuadrícula de cualquier sopa (izquierda a derecha o arriba abajo)
// y devuelve su primera y su última casilla.
export function casillasDe(sopa: Sopa, palabra: string): { inicio: Casilla; fin: Casilla } {
  const n = palabra.length;
  for (let fila = 0; fila < sopa.cuadricula.length; fila++) {
    const columna = sopa.cuadricula[fila].indexOf(palabra);
    if (columna >= 0) {
      return { inicio: { fila, columna }, fin: { fila, columna: columna + n - 1 } };
    }
  }
  const columnas = sopa.cuadricula[0].length;
  for (let columna = 0; columna < columnas; columna++) {
    const texto = sopa.cuadricula.map((f) => f[columna]).join('');
    const fila = texto.indexOf(palabra);
    if (fila >= 0) {
      return { inicio: { fila, columna }, fin: { fila: fila + n - 1, columna } };
    }
  }
  throw new Error(`La palabra ${palabra} no está en la sopa ${sopa.id}`);
}
