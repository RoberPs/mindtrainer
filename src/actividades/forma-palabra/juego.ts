import { palabras } from './palabras';

// Reglas del juego como funciones puras: no dependen del tiempo ni modifican lo que reciben.
export type Letra = { id: number; letra: string };
export type EstadoPalabra = 'jugando' | 'acertada' | 'rendida';
export type Aviso = 'ninguno' | 'incompleta' | 'incorrecta';

export type Partida = {
  palabras: string[];
  indice: number;
  aciertos: number;
  disponibles: Letra[];
  colocadas: Letra[];
  estado: EstadoPalabra;
  aviso: Aviso;
  terminada: boolean;
};

export const palabrasPorPartida = 5;

// Mezcla de Fisher-Yates; el azar se puede cambiar para que las pruebas sean repetibles.
function mezclar<T>(lista: T[], azar: () => number): T[] {
  const copia = [...lista];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(azar() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

const unir = (letras: Letra[]) => letras.map((l) => l.letra).join('');

// Letras desordenadas que nunca quedan ya en el orden correcto.
function desordenar(palabra: string, azar: () => number): Letra[] {
  const letras = [...palabra].map((letra, id) => ({ id, letra }));
  for (let intento = 0; intento < 10; intento++) {
    const mezcladas = mezclar(letras, azar);
    if (unir(mezcladas) !== palabra) return mezcladas;
  }
  const mezcladas = mezclar(letras, azar);
  const j = mezcladas.findIndex((l, i) => i > 0 && l.letra !== mezcladas[0].letra);
  [mezcladas[0], mezcladas[j]] = [mezcladas[j], mezcladas[0]];
  return mezcladas;
}

function empezarPalabra(partida: Partida, indice: number, azar: () => number): Partida {
  return {
    ...partida,
    indice,
    disponibles: desordenar(partida.palabras[indice], azar),
    colocadas: [],
    estado: 'jugando',
    aviso: 'ninguno',
  };
}

export function crearPartida(azar: () => number = Math.random): Partida {
  const elegidas = mezclar(palabras, azar).slice(0, palabrasPorPartida);
  return empezarPalabra(
    {
      palabras: elegidas,
      indice: 0,
      aciertos: 0,
      disponibles: [],
      colocadas: [],
      estado: 'jugando',
      aviso: 'ninguno',
      terminada: false,
    },
    0,
    azar,
  );
}

export const palabraActual = (partida: Partida) => partida.palabras[partida.indice];

export function colocarLetra(partida: Partida, id: number): Partida {
  if (partida.estado !== 'jugando') return partida;
  const letra = partida.disponibles.find((l) => l.id === id);
  if (!letra) return partida;
  return {
    ...partida,
    disponibles: partida.disponibles.filter((l) => l.id !== id),
    colocadas: [...partida.colocadas, letra],
    aviso: 'ninguno',
  };
}

export function borrarUltima(partida: Partida): Partida {
  if (partida.estado !== 'jugando' || partida.colocadas.length === 0) return partida;
  const ultima = partida.colocadas[partida.colocadas.length - 1];
  return {
    ...partida,
    disponibles: [...partida.disponibles, ultima],
    colocadas: partida.colocadas.slice(0, -1),
    aviso: 'ninguno',
  };
}

export function empezarDeNuevo(partida: Partida): Partida {
  if (partida.estado !== 'jugando' || partida.colocadas.length === 0) return partida;
  return {
    ...partida,
    disponibles: [...partida.disponibles, ...partida.colocadas],
    colocadas: [],
    aviso: 'ninguno',
  };
}

export function comprobar(partida: Partida): Partida {
  if (partida.estado !== 'jugando') return partida;
  const palabra = palabraActual(partida);
  if (partida.colocadas.length < palabra.length) return { ...partida, aviso: 'incompleta' };
  if (unir(partida.colocadas) !== palabra) return { ...partida, aviso: 'incorrecta' };
  return { ...partida, estado: 'acertada', aviso: 'ninguno', aciertos: partida.aciertos + 1 };
}

export function verRespuesta(partida: Partida): Partida {
  if (partida.estado !== 'jugando') return partida;
  return { ...partida, estado: 'rendida', aviso: 'ninguno' };
}

export const esUltima = (partida: Partida) => partida.indice === palabrasPorPartida - 1;

export function siguiente(partida: Partida, azar: () => number = Math.random): Partida {
  if (partida.estado === 'jugando' || partida.terminada) return partida;
  if (esUltima(partida)) return { ...partida, terminada: true };
  return empezarPalabra(partida, partida.indice + 1, azar);
}
