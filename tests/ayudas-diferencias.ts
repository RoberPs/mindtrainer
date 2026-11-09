import { fireEvent, screen } from '@testing-library/react-native';
import { dibujosDe, type Escena } from '../src/actividades/diferencias/escena';
import { crearPartida, tocar } from '../src/actividades/diferencias/juego';

// Ayudas para las pruebas de "Diferencias": las coordenadas salen de la escena, no se escriben a mano.

// Con Math.random fijado a 0, la primera partida compone esta escena y la segunda (que cambia de
// ambiente) esta otra. Las dos se componen con el mismo azar fijo.
export const escenaDePrueba: Escena = crearPartida(undefined, () => 0).escena;
export const segundaEscena: Escena = crearPartida(escenaDePrueba, () => 0).escena;

// Las 3 diferencias de una escena.
export const diferenciasDe = (escena: Escena = escenaDePrueba) => dibujosDe(escena).diferencias;

// Centro de la zona de una diferencia (coordenadas relativas).
export function centroDe(id: string, escena: Escena = escenaDePrueba): { x: number; y: number } {
  const cambio = escena.cambios.find((c) => c.id === id);
  if (!cambio) throw new Error(`Diferencia desconocida: ${id}`);
  const { x, y, ancho, alto } = cambio.zona;
  return { x: x + ancho / 2, y: y + alto / 2 };
}

// Un punto que no cae en ninguna zona activa (se comprueba con las propias reglas).
export function puntoVacio(escena: Escena = escenaDePrueba): { x: number; y: number } {
  const candidatos = [
    { x: 0.01, y: 0.01 },
    { x: 0.99, y: 0.01 },
    { x: 0.5, y: 0.99 },
    { x: 0.01, y: 0.5 },
    { x: 0.25, y: 0.34 },
  ];
  const vacio = candidatos.find((p) => {
    const partida = { ...crearPartida(undefined, () => 0), escena };
    return tocar(partida, p.x, p.y).encontradas.length === 0;
  });
  if (!vacio) throw new Error('No hay ningún punto vacío');
  return vacio;
}

// Un azar repetible (mulberry32) para componer escenas distintas en las pruebas.
export const azarFijo = (semilla: number) => {
  let a = semilla;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

const ANCHO = 300;
const ALTO = 200;

// Toca el dibujo de abajo: primero le da un tamaño conocido y luego pulsa en (x, y) relativas.
export async function tocarAbajo(x: number, y: number) {
  const dibujo = screen.getByTestId('dibujo-abajo');
  await fireEvent(dibujo, 'layout', { nativeEvent: { layout: { width: ANCHO, height: ALTO } } });
  await fireEvent.press(dibujo, { nativeEvent: { locationX: x * ANCHO, locationY: y * ALTO } });
}

// Igual que tocarAbajo, pero sobre el dibujo de arriba (no debe reaccionar).
export async function tocarArriba(x: number, y: number) {
  const dibujo = screen.getByTestId('dibujo-arriba');
  await fireEvent(dibujo, 'layout', { nativeEvent: { layout: { width: ANCHO, height: ALTO } } });
  await fireEvent.press(dibujo, { nativeEvent: { locationX: x * ANCHO, locationY: y * ALTO } });
}
