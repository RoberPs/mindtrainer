import { dibujosDe, type Escena, type Zona } from './escena';
import { escenas } from './escenas';

// Reglas del juego como funciones puras: no dependen del tiempo ni modifican lo que reciben.
// Cada partida tiene siempre 3 diferencias.
export const totalDiferencias = 3;

export type Partida = {
  escena: Escena;
  encontradas: string[]; // id de las diferencias ya marcadas, en el orden en que se encontraron
  toques: number; // toques en el dibujo de abajo que han acertado una diferencia nueva o han fallado
  fallo: boolean; // si ahora se ve el mensaje amable de fallo
  terminada: boolean;
};

// Sortea una escena distinta de la anterior; el azar se puede cambiar para que las pruebas sean repetibles.
export function crearPartida(idEscenaAnterior?: string, azar: () => number = Math.random): Partida {
  const candidatas = escenas.filter((e) => e.id !== idEscenaAnterior);
  const escena = candidatas[Math.floor(azar() * candidatas.length)];
  return { escena, encontradas: [], toques: 0, fallo: false, terminada: false };
}

const dentro = (zona: Zona, x: number, y: number) =>
  x >= zona.x && x <= zona.x + zona.ancho && y >= zona.y && y <= zona.y + zona.alto;

// Un toque en el dibujo de abajo, con coordenadas relativas (de 0 a 1).
export function tocar(partida: Partida, x: number, y: number): Partida {
  if (partida.terminada) return partida;
  const { diferencias } = dibujosDe(partida.escena);
  const diferencia = diferencias.find((d) => dentro(d.zona, x, y));
  // Fuera de las zonas: cuenta como toque y sale el mensaje amable, sin otro cambio.
  if (!diferencia) return { ...partida, toques: partida.toques + 1, fallo: true };
  // Una diferencia ya marcada no hace nada.
  if (partida.encontradas.includes(diferencia.id)) return partida;
  const encontradas = [...partida.encontradas, diferencia.id];
  return {
    ...partida,
    encontradas,
    toques: partida.toques + 1,
    fallo: false,
    terminada: encontradas.length === totalDiferencias,
  };
}

// Cuántas diferencias faltan por encontrar.
export const faltan = (partida: Partida) => totalDiferencias - partida.encontradas.length;
