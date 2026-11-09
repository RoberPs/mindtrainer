// Sopas preparadas de antemano: no se generan. Cada cuadrícula tiene 5 filas de 6 letras,
// en mayúsculas y sin tildes. Las palabras van solo en horizontal (izquierda a derecha) o en
// vertical (arriba abajo), una sola vez cada una.
export type Sopa = {
  id: string;
  referencia: string;
  palabras: string[];
  cuadricula: string[];
};

export const sopas: Sopa[] = [
  {
    id: 'nube',
    referencia: 'NUBE',
    palabras: ['LLUVIA', 'CIELO', 'RAYO'],
    cuadricula: ['BDFGCR', 'LLUVIA', 'HJKMEY', 'NPQSLO', 'TWXZOB'],
  },
  {
    id: 'mar',
    referencia: 'MAR',
    palabras: ['OLAS', 'ARENA', 'BARCO'],
    cuadricula: ['BARCOD', 'FRGHLJ', 'KEMPAQ', 'TNVWSX', 'ZAFGBC'],
  },
  {
    id: 'cocina',
    referencia: 'COCINA',
    palabras: ['SARTEN', 'PLATO', 'HORNO'],
    cuadricula: ['BPHDFG', 'VLOWXZ', 'SARTEN', 'GTNJKM', 'QOOLBD'],
  },
  {
    id: 'huerto',
    referencia: 'HUERTO',
    palabras: ['TOMATE', 'PATATA', 'AZADA'],
    cuadricula: ['TOMATE', 'FGHZJK', 'PATATA', 'LNQDRS', 'VWXAYB'],
  },
  {
    id: 'costura',
    referencia: 'COSTURA',
    palabras: ['AGUJA', 'HILO', 'DEDAL'],
    cuadricula: ['DEDALA', 'BCFKMG', 'NPQRSU', 'HILOXJ', 'VWZBCA'],
  },
];
