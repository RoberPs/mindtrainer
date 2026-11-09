import { sopas, type Sopa, type Tamano } from './sopas';

// Reglas del juego como funciones puras: no dependen del tiempo ni modifican lo que reciben.
export type Casilla = { fila: number; columna: number };
export type Encontrada = { palabra: string; casillas: Casilla[] };
export type Aviso = 'ninguno' | 'encontrada' | 'incorrecta' | 'norecta';

export type Partida = {
  sopa: Sopa;
  encontradas: Encontrada[];
  marca: Casilla | null;
  intentos: number;
  aviso: Aviso;
};

// Sortea una sopa del tamaño elegido, distinta de la anterior; el azar se puede cambiar para que las
// pruebas sean repetibles.
export function crearPartida(tamano: Tamano = 'pequena', idAnterior?: string, azar: () => number = Math.random): Partida {
  const candidatas = sopas.filter((s) => s.tamano === tamano && s.id !== idAnterior);
  const sopa = candidatas[Math.floor(azar() * candidatas.length)];
  return { sopa, encontradas: [], marca: null, intentos: 0, aviso: 'ninguno' };
}

const mismaCasilla = (a: Casilla, b: Casilla) => a.fila === b.fila && a.columna === b.columna;

// Casillas de la línea recta entre dos casillas (misma fila o misma columna), en el orden del toque.
function linea(desde: Casilla, hasta: Casilla): Casilla[] {
  const pasoFila = Math.sign(hasta.fila - desde.fila);
  const pasoColumna = Math.sign(hasta.columna - desde.columna);
  const largo = Math.max(Math.abs(hasta.fila - desde.fila), Math.abs(hasta.columna - desde.columna)) + 1;
  return Array.from({ length: largo }, (_, i) => ({
    fila: desde.fila + i * pasoFila,
    columna: desde.columna + i * pasoColumna,
  }));
}

// La partida termina al encontrar todas las palabras de la sopa (3 en la pequeña, 5 en la mediana).
export const haTerminado = (partida: Partida) => partida.encontradas.length === partida.sopa.palabras.length;

// Palabras que aún no se han encontrado.
export const faltan = (partida: Partida) => partida.sopa.palabras.length - partida.encontradas.length;

// Un toque en la cuadrícula: el primero marca una letra y el segundo cierra la línea.
export function tocarCasilla(partida: Partida, casilla: Casilla): Partida {
  if (haTerminado(partida)) return partida;
  const { marca, sopa } = partida;
  if (!marca) return { ...partida, marca: casilla, aviso: 'ninguno' };
  if (mismaCasilla(marca, casilla)) return { ...partida, marca: null, aviso: 'ninguno' };
  if (marca.fila !== casilla.fila && marca.columna !== casilla.columna) {
    return { ...partida, marca: null, aviso: 'norecta' };
  }
  // El texto se lee en el orden del toque: una palabra marcada al revés no coincide con ninguna.
  const casillas = linea(marca, casilla);
  const texto = casillas.map((c) => sopa.cuadricula[c.fila][c.columna]).join('');
  if (partida.encontradas.some((e) => e.palabra === texto)) return { ...partida, marca: null, aviso: 'ninguno' };
  if (sopa.palabras.includes(texto)) {
    return {
      ...partida,
      encontradas: [...partida.encontradas, { palabra: texto, casillas }],
      marca: null,
      aviso: 'encontrada',
      intentos: partida.intentos + 1,
    };
  }
  return { ...partida, marca: null, aviso: 'incorrecta', intentos: partida.intentos + 1 };
}
