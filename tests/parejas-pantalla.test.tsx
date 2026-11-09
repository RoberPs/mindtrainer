import { act, fireEvent, render, screen } from '@testing-library/react-native';
import { buscarDibujo } from '../src/actividades/parejas/dibujos';
import { crearPartida, type Tamano } from '../src/actividades/parejas/juego';
import { abrirApp } from './ayudas';

const botones: Record<Tamano, string> = {
  pequena: 'Pequeña: 6 cartas',
  mediana: 'Mediana: 8 cartas',
  grande: 'Grande: 12 cartas',
};
const cuantas: Record<Tamano, number> = { pequena: 6, mediana: 8, grande: 12 };

// Con Math.random fijado a 0 sabemos dónde está cada dibujo (misma mezcla que usa la app).
function mazo(tamano: Tamano, azar = 0) {
  return crearPartida(tamano, () => azar).cartas.map((c) => c.dibujo);
}
const nombre = (id: string) => buscarDibujo(id).nombre;

// Posiciones de las parejas: [[a, b], ...]
function parejas(ids: string[]): [number, number][] {
  const resultado: [number, number][] = [];
  ids.forEach((id, i) => {
    const otra = ids.indexOf(id, i + 1);
    if (otra !== -1) resultado.push([i, otra]);
  });
  return resultado;
}

// Primera posición cuyo dibujo es distinto del de la posición dada.
const distintaDe = (ids: string[], pos: number) => ids.findIndex((id) => id !== ids[pos]);

async function abrirPartida(tamano: Tamano) {
  await abrirApp();
  await fireEvent.press(screen.getByText('Parejas'));
  await fireEvent.press(screen.getByText(botones[tamano]));
}
const tocar = (pos: number) => fireEvent.press(screen.getByTestId(`carta-${pos}`));

async function terminarPartida(ids: string[]) {
  for (const [a, b] of parejas(ids)) {
    await tocar(a);
    await tocar(b);
  }
}

beforeEach(() => {
  jest.spyOn(Math, 'random').mockReturnValue(0);
});
afterEach(() => {
  jest.restoreAllMocks();
  jest.useRealTimers();
});

describe('Parejas: inicio y elección de tamaño', () => {
  it('aparece en la lista de inicio con icono, nombre y descripción', async () => {
    await abrirApp();
    expect(screen.getByTestId('lista-actividades')).toBeTruthy();
    expect(screen.getByText('Parejas')).toBeTruthy();
    expect(screen.getByText('Encuentra las cartas iguales')).toBeTruthy();
    expect(screen.getByTestId('icono-parejas', { includeHiddenElements: true })).toBeTruthy();
  });

  it('al abrirla se ven los tres tamaños con su número de cartas y sus iconos', async () => {
    await abrirApp();
    await fireEvent.press(screen.getByText('Parejas'));
    expect(screen.getByText('Elige el tamaño de la partida')).toBeTruthy();
    for (const texto of Object.values(botones)) expect(screen.getByText(texto)).toBeTruthy();
    for (const id of ['icono-pequena', 'icono-mediana', 'icono-grande']) {
      expect(screen.getByTestId(id, { includeHiddenElements: true })).toBeTruthy();
    }
  });

  it.each(Object.keys(botones) as Tamano[])('elegir %s muestra exactamente sus cartas tapadas', async (tamano) => {
    await abrirPartida(tamano);
    expect(screen.getAllByText('Carta')).toHaveLength(cuantas[tamano]);
    expect(screen.getByText('Intentos: 0')).toBeTruthy();
    expect(screen.queryByText('Seguir')).toBeNull();
  });

  it('elegir el tamaño empieza la partida: salir pide confirmación; antes de elegir, no', async () => {
    await abrirApp();
    await fireEvent.press(screen.getByText('Parejas'));
    await fireEvent.press(screen.getByText('Volver al inicio'));
    expect(screen.queryByText(/Seguro que quieres salir/)).toBeNull();
    expect(screen.getByTestId('lista-actividades')).toBeTruthy();

    await fireEvent.press(screen.getByText('Parejas'));
    await fireEvent.press(screen.getByText(botones.pequena));
    await fireEvent.press(screen.getByText('Volver al inicio'));
    expect(screen.getByText('¿Seguro que quieres salir? Perderás la partida')).toBeTruthy();
  });
});

describe('Parejas: jugar', () => {
  it('dos cartas distintas se quedan a la vista hasta pulsar "Seguir", sin límite de tiempo', async () => {
    jest.useFakeTimers();
    const ids = mazo('pequena');
    const b = distintaDe(ids, 0);
    await abrirPartida('pequena');
    await tocar(0);
    await tocar(b);

    expect(screen.getByText(nombre(ids[0]))).toBeTruthy();
    expect(screen.getByText(nombre(ids[b]))).toBeTruthy();
    expect(screen.getByTestId('icono-carta-0', { includeHiddenElements: true })).toBeTruthy();
    expect(screen.getByText('Seguir')).toBeTruthy();
    expect(screen.getByText('Intentos: 1')).toBeTruthy();

    await act(async () => {
      jest.advanceTimersByTime(60_000);
    });
    expect(screen.getByText(nombre(ids[0]))).toBeTruthy();
    expect(screen.getByText(nombre(ids[b]))).toBeTruthy();

    // Una tercera carta no hace nada
    const c = ids.findIndex((_, i) => i !== 0 && i !== b);
    await tocar(c);
    expect(screen.getAllByText('Carta')).toHaveLength(4);
    expect(screen.getByText('Intentos: 1')).toBeTruthy();

    await fireEvent.press(screen.getByText('Seguir'));
    expect(screen.getAllByText('Carta')).toHaveLength(6);
    expect(screen.queryByText('Seguir')).toBeNull();
  });

  it('dos cartas iguales se quedan descubiertas, con visto, y no aparece "Seguir"', async () => {
    const ids = mazo('pequena');
    const [a, b] = parejas(ids)[0];
    await abrirPartida('pequena');
    await tocar(a);
    expect(screen.queryByTestId(`icono-visto-${a}`, { includeHiddenElements: true })).toBeNull();
    await tocar(b);
    expect(screen.getAllByText(nombre(ids[a]))).toHaveLength(2);
    expect(screen.getByTestId(`icono-visto-${a}`, { includeHiddenElements: true })).toBeTruthy();
    expect(screen.getByTestId(`icono-visto-${b}`, { includeHiddenElements: true })).toBeTruthy();
    expect(screen.queryByText('Seguir')).toBeNull();
    expect(screen.getByText('Intentos: 1')).toBeTruthy();
    expect(screen.getAllByText('Carta')).toHaveLength(4);
  });

  it('tocar una carta ya descubierta no cuenta intento', async () => {
    const ids = mazo('pequena');
    const [a, b] = parejas(ids)[0];
    await abrirPartida('pequena');
    await tocar(a);
    await tocar(b);
    await tocar(a);
    expect(screen.getByText('Intentos: 1')).toBeTruthy();
  });
});

describe('Parejas: final de la partida', () => {
  it.each(Object.keys(botones) as Tamano[])(
    'tamaño %s: al descubrir la última pareja aparece la felicitación con los intentos',
    async (tamano) => {
      const ids = mazo(tamano);
      await abrirPartida(tamano);
      const todas = parejas(ids);
      // Todas menos la última: aún no hay felicitación
      for (const [a, b] of todas.slice(0, -1)) {
        await tocar(a);
        await tocar(b);
      }
      expect(screen.queryByText(/Has necesitado/)).toBeNull();
      const [a, b] = todas[todas.length - 1];
      await tocar(a);
      await tocar(b);

      expect(screen.getByText('¡Enhorabuena! Has encontrado todas las parejas')).toBeTruthy();
      expect(screen.getByText(`Has necesitado ${cuantas[tamano] / 2} intentos`)).toBeTruthy();
      expect(screen.getByText('Jugar otra vez')).toBeTruthy();
      expect(screen.getByText('Volver al inicio')).toBeTruthy();
      expect(screen.getByTestId('icono-felicitacion', { includeHiddenElements: true })).toBeTruthy();
      expect(screen.getByTestId('icono-jugar-otra-vez', { includeHiddenElements: true })).toBeTruthy();
    },
  );

  it('la felicitación cuenta también los fallos', async () => {
    // Un fallo y tres aciertos: 4 intentos
    const ids = mazo('pequena');
    const b = distintaDe(ids, 0);
    await abrirPartida('pequena');
    await tocar(0);
    await tocar(b);
    await fireEvent.press(screen.getByText('Seguir'));
    await terminarPartida(ids);
    expect(screen.getByText('Has necesitado 4 intentos')).toBeTruthy();
  });

  it('al terminar, "Volver al inicio" vuelve a la lista sin pedir confirmación', async () => {
    await abrirPartida('pequena');
    await terminarPartida(mazo('pequena'));
    await fireEvent.press(screen.getByText('Volver al inicio'));
    expect(screen.queryByText(/Seguro que quieres salir/)).toBeNull();
    expect(screen.getByTestId('lista-actividades')).toBeTruthy();
  });

  it('"Jugar otra vez" lleva a elegir tamaño y la partida nueva empieza a 0, tapada y con otro orden', async () => {
    const primera = mazo('pequena', 0);
    const segunda = mazo('pequena', 0.99);
    const pos = primera.findIndex((id, i) => id !== segunda[i]);
    expect(pos).toBeGreaterThanOrEqual(0);

    await abrirPartida('pequena');
    await terminarPartida(primera);
    jest.spyOn(Math, 'random').mockReturnValue(0.99);
    await fireEvent.press(screen.getByText('Jugar otra vez'));

    expect(screen.getByText('Elige el tamaño de la partida')).toBeTruthy();
    await fireEvent.press(screen.getByText(botones.pequena));
    expect(screen.getByText('Intentos: 0')).toBeTruthy();
    expect(screen.getAllByText('Carta')).toHaveLength(6);

    await tocar(pos);
    expect(screen.getByText(nombre(segunda[pos]))).toBeTruthy();
    expect(nombre(segunda[pos])).not.toBe(nombre(primera[pos]));

    // La partida nueva está en curso: salir vuelve a pedir confirmación
    await fireEvent.press(screen.getByText('Volver al inicio'));
    expect(screen.getByText('¿Seguro que quieres salir? Perderás la partida')).toBeTruthy();
  });
});

describe('Parejas: aspecto de las cartas (spec 010)', () => {
  it.each(Object.keys(botones) as Tamano[])(
    '%s: todas las cartas tapadas tienen el mismo dorso y al girar una se ve su nombre',
    async (tamano) => {
      const ids = mazo(tamano);
      await abrirPartida(tamano);
      for (let i = 0; i < cuantas[tamano]; i++) {
        expect(screen.getByTestId(`icono-carta-${i}`, { includeHiddenElements: true })).toBeTruthy();
      }
      await tocar(0);
      expect(screen.getAllByText('Carta')).toHaveLength(cuantas[tamano] - 1);
      expect(screen.getByText(nombre(ids[0]))).toBeTruthy();
    },
  );

  it.each(Object.keys(botones) as Tamano[])(
    '%s: al descubrir una pareja se ve su nombre y su icono en las dos cartas',
    async (tamano) => {
      const ids = mazo(tamano);
      const [a, b] = parejas(ids)[0];
      await abrirPartida(tamano);
      await tocar(a);
      await tocar(b);
      expect(screen.getAllByText(nombre(ids[a]))).toHaveLength(2);
      expect(screen.getByTestId(`icono-carta-${a}`, { includeHiddenElements: true })).toBeTruthy();
      expect(screen.getByTestId(`icono-carta-${b}`, { includeHiddenElements: true })).toBeTruthy();
    },
  );

  it('"Volver al inicio" y "Seguir" muestran icono y texto a la vez', async () => {
    const ids = mazo('pequena');
    const b = distintaDe(ids, 0);
    await abrirPartida('pequena');
    expect(screen.getByText('Volver al inicio')).toBeTruthy();
    expect(screen.getByTestId('icono-volver', { includeHiddenElements: true })).toBeTruthy();
    await tocar(0);
    await tocar(b);
    expect(screen.getByText('Seguir')).toBeTruthy();
    expect(screen.getByTestId('icono-seguir', { includeHiddenElements: true })).toBeTruthy();
  });
});
