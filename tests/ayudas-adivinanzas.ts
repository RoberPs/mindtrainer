import { crearPartida, type Partida } from '../src/actividades/adivinanzas/juego';

// Ayudas para las pruebas de "Adivinanzas": no dependen del contenido del banco.
export const turnoActual = (partida: Partida) => partida.turnos[partida.indice];
export const correctaActual = (partida: Partida) => turnoActual(partida).adivinanza.correcta;
export const incorrectaActual = (partida: Partida) => turnoActual(partida).adivinanza.incorrectas[0];

// Partida creada con un azar constante (siempre la misma).
export const partidaConAzar = (valor: number): Partida => crearPartida([], () => valor);

// Azar repetible con resultados variados (generador congruencial sencillo).
export function azarCon(semilla: number) {
  let s = semilla;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}
