// La escena de "Diferencias": dos dibujos hechos con iconos incluidos en la app y las 3 zonas
// donde difieren. Todas las coordenadas son relativas (de 0 a 1 sobre el ancho y el alto del
// dibujo), así valen para cualquier tamaño de pantalla.

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

// Proporción del dibujo: ancho dividido entre alto.
export const proporcionDibujo = 1.5;

const ventana: Elemento = { id: 'ventana', icono: 'window-closed-variant', x: 0.18, y: 0.28, tamano: 0.38, color: '#0B3D91' };
const lampara: Elemento = { id: 'lampara', icono: 'lamp', x: 0.84, y: 0.32, tamano: 0.38, color: '#6B4400' };
const sillon: Elemento = { id: 'sillon', icono: 'sofa', x: 0.56, y: 0.72, tamano: 0.42, color: '#5D2E0C' };
const planta: Elemento = { id: 'planta', icono: 'flower', x: 0.11, y: 0.74, tamano: 0.34, color: '#1B5E20' };

// Diferencia 1: el reloj está arriba y falta abajo.
const reloj: Elemento = { id: 'reloj', icono: 'clock-outline', x: 0.5, y: 0.25, tamano: 0.3, color: '#111111' };
// Diferencia 2: la taza de arriba cambia por una botella abajo.
const taza: Elemento = { id: 'bebida', icono: 'coffee', x: 0.86, y: 0.74, tamano: 0.3, color: '#5D2E0C' };
const botella: Elemento = { ...taza, icono: 'bottle-wine' };
// Diferencia 3: el gato solo está abajo.
const gato: Elemento = { id: 'gato', icono: 'cat', x: 0.32, y: 0.76, tamano: 0.28, color: '#111111' };

export const dibujoArriba: Elemento[] = [ventana, lampara, sillon, planta, reloj, taza];
export const dibujoAbajo: Elemento[] = [ventana, lampara, sillon, planta, botella, gato];

// Cada zona es algo mayor que el elemento que cambia y mide lo bastante para un dedo.
export const diferencias: Diferencia[] = [
  { id: 'reloj', zona: { x: 0.38, y: 0.1, ancho: 0.24, alto: 0.34 } },
  { id: 'bebida', zona: { x: 0.74, y: 0.58, ancho: 0.24, alto: 0.34 } },
  { id: 'gato', zona: { x: 0.2, y: 0.6, ancho: 0.24, alto: 0.34 } },
];
