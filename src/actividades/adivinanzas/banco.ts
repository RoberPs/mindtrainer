// Adivinanzas tradicionales del juego "Adivinanzas": cada una con su respuesta correcta y dos
// incorrectas, todas de una sola palabra. Las incorrectas no deben poder valer como respuesta.
export type Adivinanza = {
  id: string;
  texto: string;
  correcta: string;
  incorrectas: [string, string];
};

export const adivinanzas: Adivinanza[] = [
  {
    id: 'pera',
    texto: 'Blanca por dentro, verde por fuera. Si quieres que te lo diga, espera.',
    correcta: 'pera',
    incorrectas: ['manzana', 'uva'],
  },
  {
    id: 'platano',
    texto: 'Oro parece, plata no es.',
    correcta: 'plátano',
    incorrectas: ['limón', 'naranja'],
  },
  {
    id: 'reloj',
    texto: 'Tiene agujas y no sabe coser, tiene números y no sabe leer.',
    correcta: 'reloj',
    incorrectas: ['calendario', 'espejo'],
  },
  {
    id: 'viento',
    texto: 'Vuelo sin alas, silbo sin boca, azoto sin manos y nadie me toca.',
    correcta: 'viento',
    incorrectas: ['trueno', 'río'],
  },
  {
    id: 'ajo',
    texto: 'Tiene dientes y no come, tiene cabeza y no es hombre.',
    correcta: 'ajo',
    incorrectas: ['peine', 'tenedor'],
  },
  {
    id: 'huevo',
    texto: 'Una cajita blanca como la cal, que todos saben abrir y nadie sabe cerrar.',
    correcta: 'huevo',
    incorrectas: ['pan', 'queso'],
  },
  {
    id: 'anillo',
    texto: 'Redondo, redondo, barril sin fondo.',
    correcta: 'anillo',
    incorrectas: ['cubo', 'plato'],
  },
  {
    id: 'llave',
    texto: 'Chiquita como un ratón y guarda la casa como un león.',
    correcta: 'llave',
    incorrectas: ['perro', 'candado'],
  },
  {
    id: 'oscuridad',
    texto: 'Cuanto más grande es, menos se ve.',
    correcta: 'oscuridad',
    incorrectas: ['montaña', 'nube'],
  },
  {
    id: 'aguacate',
    texto: 'Agua pasa por mi casa, cate de mi corazón.',
    correcta: 'aguacate',
    incorrectas: ['tomate', 'melón'],
  },
];
