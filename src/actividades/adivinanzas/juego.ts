import { adivinanzas, type Adivinanza } from './banco';

// Reglas del juego como funciones puras: no dependen del tiempo ni modifican lo que reciben.
export type Turno = { adivinanza: Adivinanza; opciones: string[] };

export type Partida = {
  turnos: Turno[];
  indice: number;
  elegida: string | null;
  aciertos: number;
  terminada: boolean;
};

export const adivinanzasPorPartida = 5;

// Mezcla de Fisher-Yates; el azar se puede cambiar para que las pruebas sean repetibles.
function mezclar<T>(lista: T[], azar: () => number): T[] {
  const copia = [...lista];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(azar() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

export function crearPartida(azar: () => number = Math.random): Partida {
  const turnos = mezclar(adivinanzas, azar)
    .slice(0, adivinanzasPorPartida)
    .map((adivinanza) => ({
      adivinanza,
      opciones: mezclar([adivinanza.correcta, ...adivinanza.incorrectas], azar),
    }));
  return { turnos, indice: 0, elegida: null, aciertos: 0, terminada: false };
}

// Solo hay un intento por adivinanza: una vez elegida una respuesta, las demás pulsaciones no cuentan.
export function responder(partida: Partida, opcion: string): Partida {
  if (partida.terminada || partida.elegida !== null) return partida;
  const acierto = opcion === partida.turnos[partida.indice].adivinanza.correcta;
  return { ...partida, elegida: opcion, aciertos: partida.aciertos + (acierto ? 1 : 0) };
}

export const esUltima = (partida: Partida) => partida.indice === adivinanzasPorPartida - 1;

// Pasa a la adivinanza siguiente (o al resultado tras la quinta), pero solo cuando ya se ha respondido.
export function siguiente(partida: Partida): Partida {
  if (partida.terminada || partida.elegida === null) return partida;
  if (esUltima(partida)) return { ...partida, terminada: true };
  return { ...partida, indice: partida.indice + 1, elegida: null };
}
