import { dibujos } from './dibujos';

// Reglas del juego como funciones puras: no dependen del tiempo ni modifican lo que reciben.
export type Tamano = 'pequena' | 'mediana' | 'grande';
export type EstadoCarta = 'tapada' | 'girada' | 'descubierta';

export type Carta = {
  dibujo: string; // id del dibujo
  estado: EstadoCarta;
};

export type Partida = {
  tamano: Tamano;
  cartas: Carta[];
  intentos: number;
  terminada: boolean;
};

export const numeroDeCartas: Record<Tamano, number> = { pequena: 6, mediana: 8, grande: 12 };

// Mezcla de Fisher-Yates; el azar se puede cambiar para que las pruebas sean repetibles.
function mezclar<T>(lista: T[], azar: () => number): T[] {
  const copia = [...lista];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(azar() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

export function crearPartida(tamano: Tamano, azar: () => number = Math.random): Partida {
  const parejas = numeroDeCartas[tamano] / 2;
  const elegidos = mezclar(dibujos, azar).slice(0, parejas);
  const cartas = mezclar(
    elegidos.flatMap((d) => [d.id, d.id]),
    azar,
  ).map((dibujo): Carta => ({ dibujo, estado: 'tapada' }));
  return { tamano, cartas, intentos: 0, terminada: false };
}

function posicionesGiradas(partida: Partida): number[] {
  return partida.cartas.flatMap((c, i) => (c.estado === 'girada' ? [i] : []));
}

// Hay dos cartas distintas a la vista esperando "Seguir".
export function hayDosDistintas(partida: Partida): boolean {
  const giradas = posicionesGiradas(partida);
  return giradas.length === 2;
}

export function tocarCarta(partida: Partida, posicion: number): Partida {
  const carta = partida.cartas[posicion];
  if (!carta || carta.estado !== 'tapada' || hayDosDistintas(partida)) return partida;

  const cartas = partida.cartas.map((c, i) => (i === posicion ? { ...c, estado: 'girada' as const } : c));
  const otra = posicionesGiradas(partida)[0];
  if (otra === undefined) return { ...partida, cartas };

  // Es la segunda carta: cuenta un intento, acierte o falle.
  const intentos = partida.intentos + 1;
  if (cartas[otra].dibujo !== carta.dibujo) return { ...partida, cartas, intentos };

  const descubiertas = cartas.map((c, i) =>
    i === otra || i === posicion ? { ...c, estado: 'descubierta' as const } : c,
  );
  return {
    ...partida,
    cartas: descubiertas,
    intentos,
    terminada: descubiertas.every((c) => c.estado === 'descubierta'),
  };
}

export function seguir(partida: Partida): Partida {
  if (!hayDosDistintas(partida)) return partida;
  return {
    ...partida,
    cartas: partida.cartas.map((c) => (c.estado === 'girada' ? { ...c, estado: 'tapada' as const } : c)),
  };
}
