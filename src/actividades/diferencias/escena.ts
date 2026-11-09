// Las escenas de "Diferencias": dibujos propios (ver objetos.tsx). Son datos fijos, revisados a
// mano (no se generan al azar). Cada escena tiene un fondo, unos objetos comunes y exactamente 3
// cambios entre los dos dibujos: un objeto de otro color, uno que falta y uno añadido. Todas las
// coordenadas son relativas (de 0 a 1 sobre el ancho y el alto del dibujo), así valen para
// cualquier tamaño de pantalla.
import type { ReactElement } from 'react';

// Un dibujo reutilizable: recibe su color principal y se dibuja en una caja de 100 × 100.
export type Objeto = (color: string) => ReactElement;

export type Colocado = {
  id: string;
  objeto: Objeto;
  x: number; // centro, de 0 a 1 sobre el ancho
  y: number; // centro, de 0 a 1 sobre el alto
  alto: number; // alto de la caja del objeto, de 0 a 1 sobre el alto del dibujo
  color: string;
};

// Rectángulo de acierto (y de círculo de marca), en coordenadas relativas.
export type Zona = { x: number; y: number; ancho: number; alto: number };

export type Diferencia = { id: string; zona: Zona };

export type TipoCambio = 'color' | 'falta' | 'sobra';

// Un cambio entre los dos dibujos: cambia de color (el mismo objeto con otro color), falta (solo
// arriba) o sobra (solo abajo). Su `id` es el de sus objetos.
export type Cambio = { id: string; tipo: TipoCambio; arriba?: Colocado; abajo?: Colocado; zona: Zona };

export type Escena = {
  id: string;
  nombre: string;
  fondo: () => ReactElement;
  comunes: Colocado[];
  cambios: Cambio[];
};

// Proporción del dibujo: ancho dividido entre alto (el lienzo mide 300 × 200).
export const proporcionDibujo = 1.5;

// Zona de acierto de un objeto colocado: algo mayor que su caja y siempre dentro del dibujo.
export function zonaDe(x: number, y: number, alto: number): Zona {
  const ancho = (alto * 2) / 3 + 0.04;
  const altoZona = alto + 0.04;
  const izquierda = Math.max(0, Math.min(1 - ancho, x - ancho / 2));
  const arriba = Math.max(0, Math.min(1 - altoZona, y - altoZona / 2));
  return { x: izquierda, y: arriba, ancho, alto: altoZona };
}

const colocado = (id: string, objeto: Objeto, x: number, y: number, alto: number, color: string): Colocado => ({
  id,
  objeto,
  x,
  y,
  alto,
  color,
});

// Un objeto que sale igual en los dos dibujos.
export const comun = colocado;

// El mismo objeto, en el mismo sitio, con un color en el dibujo de arriba y otro en el de abajo.
export const cambioColor = (
  id: string,
  objeto: Objeto,
  x: number,
  y: number,
  alto: number,
  colorArriba: string,
  colorAbajo: string,
): Cambio => ({
  id,
  tipo: 'color',
  arriba: colocado(id, objeto, x, y, alto, colorArriba),
  abajo: colocado(id, objeto, x, y, alto, colorAbajo),
  zona: zonaDe(x, y, alto),
});

// Un objeto que está solo en el dibujo de arriba.
export const cambioFalta = (id: string, objeto: Objeto, x: number, y: number, alto: number, color: string): Cambio => ({
  id,
  tipo: 'falta',
  arriba: colocado(id, objeto, x, y, alto, color),
  zona: zonaDe(x, y, alto),
});

// Un objeto que está solo en el dibujo de abajo.
export const cambioSobra = (id: string, objeto: Objeto, x: number, y: number, alto: number, color: string): Cambio => ({
  id,
  tipo: 'sobra',
  abajo: colocado(id, objeto, x, y, alto, color),
  zona: zonaDe(x, y, alto),
});

// Los objetos de los dos dibujos de una escena, y las zonas donde se marcan las diferencias.
export function dibujosDe(escena: Escena) {
  const arriba = [...escena.comunes, ...escena.cambios.flatMap((c) => (c.arriba ? [c.arriba] : []))];
  const abajo = [...escena.comunes, ...escena.cambios.flatMap((c) => (c.abajo ? [c.abajo] : []))];
  const diferencias: Diferencia[] = escena.cambios.map((c) => ({ id: c.id, zona: c.zona }));
  return { arriba, abajo, diferencias };
}
