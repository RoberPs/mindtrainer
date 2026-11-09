// Las escenas de "Diferencias": dibujos hechos con iconos incluidos en la app. Son datos fijos,
// revisados a mano (no se generan al azar). Cada escena tiene unos iconos comunes y 7 cambios
// posibles, cada uno con su zona; una partida con 3, 5 o 7 diferencias activa los primeros 3,
// 5 o 7 cambios y dibuja el resto igual en los dos dibujos. Todas las coordenadas son relativas
// (de 0 a 1 sobre el ancho y el alto del dibujo), así valen para cualquier tamaño de pantalla.

export type Elemento = {
  id: string;
  icono: string;
  x: number; // centro, de 0 a 1 sobre el ancho
  y: number; // centro, de 0 a 1 sobre el alto
  tamano: number; // alto del icono, de 0 a 1 sobre el alto del dibujo
  color: string;
};

// Rectángulo de acierto (y de círculo de marca), en coordenadas relativas.
export type Zona = { x: number; y: number; ancho: number; alto: number };

export type Diferencia = { id: string; zona: Zona };

// Un cambio posible entre los dos dibujos: falta (solo arriba), sobra (solo abajo) o cambia
// (el mismo sitio con otro icono). Su `id` es el de sus elementos.
export type Cambio = { id: string; arriba?: Elemento; abajo?: Elemento; zona: Zona };

export type Escena = { id: string; nombre: string; comunes: Elemento[]; cambios: Cambio[] };

export type Total = 3 | 5 | 7;

// Proporción del dibujo: ancho dividido entre alto.
export const proporcionDibujo = 1.5;

// Rejilla de huecos: 4 columnas por 3 filas. Cada icono va en el centro de un hueco y su zona
// es algo mayor que el icono y menor que el hueco, para que nunca se toquen dos zonas.
const columnas = [0.125, 0.375, 0.625, 0.875];
const filas = [0.17, 0.5, 0.83];
const tamanoIcono = 0.26;

const elemento = (id: string, icono: string, columna: number, fila: number, color: string): Elemento => ({
  id,
  icono,
  x: columnas[columna],
  y: filas[fila],
  tamano: tamanoIcono,
  color,
});
const zonaEn = (columna: number, fila: number): Zona => ({
  x: columnas[columna] - 0.11,
  y: filas[fila] - 0.15,
  ancho: 0.22,
  alto: 0.3,
});

const falta = (id: string, icono: string, columna: number, fila: number, color: string): Cambio => ({
  id,
  arriba: elemento(id, icono, columna, fila, color),
  zona: zonaEn(columna, fila),
});
const sobra = (id: string, icono: string, columna: number, fila: number, color: string): Cambio => ({
  id,
  abajo: elemento(id, icono, columna, fila, color),
  zona: zonaEn(columna, fila),
});
const cambia = (id: string, iconoArriba: string, iconoAbajo: string, columna: number, fila: number, color: string): Cambio => ({
  id,
  arriba: elemento(id, iconoArriba, columna, fila, color),
  abajo: elemento(id, iconoAbajo, columna, fila, color),
  zona: zonaEn(columna, fila),
});

// Colores oscuros: todos superan 7 a 1 de contraste con el fondo de los dibujos.
const azul = '#0B3D91';
const marron = '#5D2E0C';
const ocre = '#6B4400';
const naranja = '#7A3E00';
const verde = '#1B5E20';
const morado = '#5B2A86';
const gris = '#4A4A4A';
const negro = '#111111';

// Orden de los cambios en cada escena: cambia, falta, sobra, cambia, falta, sobra, cambia. Así
// los 3 primeros ya mezclan los tres tipos y los 5 primeros también.
const salon: Escena = {
  id: 'salon',
  nombre: 'Salón',
  comunes: [
    elemento('ventana', 'window-closed-variant', 1, 0, azul),
    elemento('sillon', 'sofa', 1, 1, marron),
  ],
  cambios: [
    cambia('bebida', 'coffee', 'bottle-wine', 0, 0, marron),
    falta('reloj', 'clock-outline', 3, 1, negro),
    sobra('gato', 'cat', 1, 2, negro),
    cambia('aparato', 'television', 'radio', 2, 0, gris),
    falta('flor', 'flower', 0, 1, verde),
    sobra('lampara', 'lamp', 2, 2, ocre),
    cambia('musica', 'guitar-acoustic', 'piano', 3, 2, naranja),
  ],
};

const cocina: Escena = {
  id: 'cocina',
  nombre: 'Cocina',
  comunes: [
    elemento('cocina', 'stove', 0, 0, gris),
    elemento('nevera', 'fridge', 2, 0, azul),
    elemento('olla', 'pot-steam', 1, 2, negro),
  ],
  cambios: [
    cambia('taza', 'cup', 'bowl', 3, 0, marron),
    falta('cubiertos', 'silverware-fork-knife', 0, 1, gris),
    sobra('manzana', 'food-apple', 2, 2, verde),
    cambia('cubierto', 'knife', 'silverware-spoon', 1, 0, negro),
    falta('queso', 'cheese', 3, 2, ocre),
    sobra('huevo', 'egg', 0, 2, naranja),
    cambia('maquina', 'blender', 'toaster-oven', 2, 1, morado),
  ],
};

const jardin: Escena = {
  id: 'jardin',
  nombre: 'Jardín',
  comunes: [
    elemento('arbol', 'tree', 0, 0, verde),
    elemento('casa', 'home-variant', 1, 0, marron),
    elemento('valla', 'fence', 3, 1, ocre),
    elemento('pino', 'pine-tree', 1, 2, verde),
  ],
  cambios: [
    cambia('insecto', 'butterfly', 'bee', 1, 1, morado),
    falta('sol', 'weather-sunny', 3, 0, naranja),
    sobra('nube', 'cloud', 0, 2, gris),
    cambia('animal', 'bird', 'rabbit', 2, 0, marron),
    falta('regadera', 'watering-can', 3, 2, azul),
    sobra('seta', 'mushroom', 0, 1, naranja),
    cambia('verdura', 'carrot', 'corn', 2, 2, ocre),
  ],
};

const mercado: Escena = {
  id: 'mercado',
  nombre: 'Mercado',
  comunes: [
    elemento('cesta', 'basket', 1, 0, ocre),
    elemento('caja', 'cash-register', 3, 0, gris),
    elemento('tienda', 'store', 1, 1, azul),
    elemento('etiqueta', 'tag', 0, 2, morado),
    elemento('carro', 'cart', 2, 2, negro),
  ],
  cambios: [
    cambia('fruta', 'fruit-grapes', 'fruit-cherries', 0, 0, morado),
    falta('pina', 'fruit-pineapple', 2, 1, naranja),
    sobra('pescado', 'fish', 3, 2, azul),
    cambia('granja', 'cow', 'pig', 1, 2, marron),
    falta('pan', 'bread-slice', 2, 0, ocre),
    sobra('galleta', 'cookie', 0, 1, marron),
    cambia('dulce', 'cake', 'candy', 3, 1, verde),
  ],
};

export const escenas: Escena[] = [salon, cocina, jardin, mercado];

// Los dos dibujos de una partida con `total` diferencias, y las zonas donde se marcan.
export function dibujosDe(escena: Escena, total: number) {
  const activos = escena.cambios.slice(0, total);
  // Los cambios que no se usan se dibujan igual en los dos dibujos.
  const neutros = escena.cambios.slice(total).map((c) => (c.arriba ?? c.abajo) as Elemento);
  const arriba = [...escena.comunes, ...neutros, ...activos.flatMap((c) => (c.arriba ? [c.arriba] : []))];
  const abajo = [...escena.comunes, ...neutros, ...activos.flatMap((c) => (c.abajo ? [c.abajo] : []))];
  const diferencias: Diferencia[] = activos.map((c) => ({ id: c.id, zona: c.zona }));
  return { arriba, abajo, diferencias };
}
