import { fireEvent, screen } from '@testing-library/react-native';
import { diferencias } from '../src/actividades/diferencias/escena';
import { crearPartida, tocar } from '../src/actividades/diferencias/juego';

// Ayudas para las pruebas de "Diferencias": las coordenadas salen de la escena, no se escriben a mano.

// Centro de la zona de una diferencia (coordenadas relativas).
export function centroDe(id: string): { x: number; y: number } {
  const diferencia = diferencias.find((d) => d.id === id);
  if (!diferencia) throw new Error(`Diferencia desconocida: ${id}`);
  const { x, y, ancho, alto } = diferencia.zona;
  return { x: x + ancho / 2, y: y + alto / 2 };
}

// Un punto que no cae en ninguna zona (se comprueba con las propias reglas).
export function puntoVacio(): { x: number; y: number } {
  const candidatos = [
    { x: 0.03, y: 0.03 },
    { x: 0.97, y: 0.03 },
    { x: 0.5, y: 0.97 },
    { x: 0.03, y: 0.5 },
  ];
  const vacio = candidatos.find((p) => tocar(crearPartida(), p.x, p.y).encontradas.length === 0);
  if (!vacio) throw new Error('No hay ningún punto vacío');
  return vacio;
}

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
