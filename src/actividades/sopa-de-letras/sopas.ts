// Sopas preparadas de antemano: no se generan. Las pequeñas tienen 5 filas de 6 letras y 3 palabras;
// las medianas, 6 filas de 6 letras y 5 palabras. Todo en mayúsculas y sin tildes. Las palabras
// van solo en horizontal (izquierda a derecha) o en vertical (arriba abajo), una sola vez cada una.
export type Tamano = 'pequena' | 'mediana';

export type Sopa = {
  id: string;
  tamano: Tamano;
  referencia: string;
  palabras: string[];
  cuadricula: string[];
};

export const sopas: Sopa[] = [
  {
    id: 'nube',
    tamano: 'pequena',
    referencia: 'NUBE',
    palabras: ['LLUVIA', 'CIELO', 'RAYO'],
    cuadricula: ['BDFGCR', 'LLUVIA', 'HJKMEY', 'NPQSLO', 'TWXZOB'],
  },
  {
    id: 'mar',
    tamano: 'pequena',
    referencia: 'MAR',
    palabras: ['OLAS', 'ARENA', 'BARCO'],
    cuadricula: ['BARCOD', 'FRGHLJ', 'KEMPAQ', 'TNVWSX', 'ZAFGBC'],
  },
  {
    id: 'cocina',
    tamano: 'pequena',
    referencia: 'COCINA',
    palabras: ['SARTEN', 'PLATO', 'HORNO'],
    cuadricula: ['BPHDFG', 'VLOWXZ', 'SARTEN', 'GTNJKM', 'QOOLBD'],
  },
  {
    id: 'huerto',
    tamano: 'pequena',
    referencia: 'HUERTO',
    palabras: ['TOMATE', 'PATATA', 'AZADA'],
    cuadricula: ['TOMATE', 'FGHZJK', 'PATATA', 'LNQDRS', 'VWXAYB'],
  },
  {
    id: 'costura',
    tamano: 'pequena',
    referencia: 'COSTURA',
    palabras: ['AGUJA', 'HILO', 'DEDAL'],
    cuadricula: ['DEDALA', 'BCFKMG', 'NPQRSU', 'HILOXJ', 'VWZBCA'],
  },
  {
    id: 'granja',
    tamano: 'mediana',
    referencia: 'ANIMALES',
    palabras: ['PERRO', 'GATO', 'OVEJA', 'CERDO', 'PATO'],
    cuadricula: ['PERROC', 'ABFHKE', 'TGATOR', 'OLMNQD', 'OVEJAO', 'SUWXYZ'],
  },
  {
    id: 'comida',
    tamano: 'mediana',
    referencia: 'COMIDA',
    palabras: ['ARROZ', 'POLLO', 'LECHE', 'QUESO', 'SOPA'],
    cuadricula: ['PBDFGQ', 'OHKMNU', 'LLECHE', 'LBDFGS', 'OSOPAO', 'ARROZW'],
  },
  {
    id: 'ropa',
    tamano: 'mediana',
    referencia: 'ROPA',
    palabras: ['CAMISA', 'ZAPATO', 'FALDA', 'GORRO', 'CAPA'],
    cuadricula: ['CAMISA', 'AFHKLG', 'PAQXUO', 'ALNBWR', 'BDYHKR', 'ZAPATO'],
  },
];
