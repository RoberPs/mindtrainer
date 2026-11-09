import { fireEvent, render, screen } from '@testing-library/react-native';
import { crearPartida, palabraActual, siguiente, type Partida } from '../src/actividades/forma-palabra/juego';
import { FormaPalabra } from '../src/actividades/forma-palabra/FormaPalabra';
import { MarcoActividad } from '../src/pantallas/MarcoActividad';
import { abrirApp } from './ayudas';

// Con Math.random fijado a 0 conocemos la partida que crea la app (misma mezcla).
let modelo: Partida;
beforeEach(() => {
  jest.spyOn(Math, 'random').mockReturnValue(0);
  modelo = crearPartida(() => 0);
});
afterEach(() => {
  jest.restoreAllMocks();
});

async function abrir() {
  await abrirApp();
  await fireEvent.press(screen.getByText('Forma la palabra'));
}

// Toca las letras de la palabra actual en orden correcto.
async function formarPalabra() {
  const usadas = new Set<number>();
  for (const letra of palabraActual(modelo)) {
    const l = modelo.disponibles.find((d) => d.letra === letra && !usadas.has(d.id))!;
    usadas.add(l.id);
    await fireEvent.press(screen.getByTestId(`letra-${l.id}`));
  }
}
const pulsar = (texto: string) => fireEvent.press(screen.getByText(texto));

// Pasa a la palabra siguiente del modelo (mismo azar que la app).
function avanzarModelo() {
  const cerrada: Partida = { ...modelo, estado: 'acertada' };
  modelo = siguiente(cerrada, () => 0);
}

describe('Forma la palabra: pantalla de una palabra', () => {
  it('aparece en la lista de inicio con icono, nombre y descripción', async () => {
    await abrirApp();
    expect(screen.getByText('Forma la palabra')).toBeTruthy();
    expect(screen.getByText('Ordena las letras para formar la palabra')).toBeTruthy();
    expect(screen.getByTestId('icono-forma-palabra', { includeHiddenElements: true })).toBeTruthy();
  });

  it('al abrirla hay casillas, letras desordenadas y el botón Comprobar', async () => {
    await abrir();
    const palabra = palabraActual(modelo);
    expect(screen.getByTestId('casillas').children).toHaveLength(palabra.length);
    for (const l of modelo.disponibles) expect(screen.getByTestId(`letra-${l.id}`)).toBeTruthy();
    expect(screen.getByText('Comprobar')).toBeTruthy();
  });

  it('tocar una letra la lleva a la casilla', async () => {
    await abrir();
    const l = modelo.disponibles[0];
    await fireEvent.press(screen.getByTestId(`letra-${l.id}`));
    expect(screen.queryByTestId(`letra-${l.id}`)).toBeNull();
    expect(screen.getByTestId('casilla-0')).toHaveTextContent(l.letra);
  });

  it('Comprobar con la palabra a medias pide completarla', async () => {
    await abrir();
    await fireEvent.press(screen.getByTestId(`letra-${modelo.disponibles[0].id}`));
    await pulsar('Comprobar');
    expect(screen.getByText('Completa la palabra antes de comprobar')).toBeTruthy();
    expect(screen.getByTestId('icono-incompleta', { includeHiddenElements: true })).toBeTruthy();
  });

  it('una palabra incorrecta da un mensaje amable y las letras siguen puestas', async () => {
    await abrir();
    for (const l of modelo.disponibles) await fireEvent.press(screen.getByTestId(`letra-${l.id}`));
    await pulsar('Comprobar');
    expect(screen.getByText('Todavía no es esa. Inténtalo otra vez')).toBeTruthy();
    expect(screen.getByTestId('icono-fallo', { includeHiddenElements: true })).toBeTruthy();
    expect(screen.getByTestId('casilla-0')).not.toHaveTextContent('');
  });

  it('la correcta da el mensaje positivo y Siguiente, y la siguiente empieza vacía', async () => {
    await abrir();
    await formarPalabra();
    await pulsar('Comprobar');
    expect(screen.getByText('¡Muy bien! Has formado la palabra')).toBeTruthy();
    expect(screen.getByTestId('icono-acierto', { includeHiddenElements: true })).toBeTruthy();
    expect(screen.queryByTestId(/^letra-/)).toBeNull();
    expect(screen.queryByText('Comprobar')).toBeNull();
    await pulsar('Siguiente');
    avanzarModelo();
    expect(screen.getByTestId('casillas').children).toHaveLength(palabraActual(modelo).length);
    expect(screen.getByTestId('casilla-0')).toHaveTextContent('');
    for (const l of modelo.disponibles) expect(screen.getByTestId(`letra-${l.id}`)).toBeTruthy();
  });
});

describe('Forma la palabra: corregir', () => {
  it('Borrar última letra y Empezar de nuevo existen con icono y funcionan', async () => {
    await abrir();
    const [a, b] = modelo.disponibles;
    await fireEvent.press(screen.getByTestId(`letra-${a.id}`));
    await fireEvent.press(screen.getByTestId(`letra-${b.id}`));
    expect(screen.getByTestId('icono-borrar-ultima', { includeHiddenElements: true })).toBeTruthy();
    expect(screen.getByTestId('icono-empezar-de-nuevo', { includeHiddenElements: true })).toBeTruthy();
    await pulsar('Borrar última letra');
    expect(screen.getByTestId(`letra-${b.id}`)).toBeTruthy();
    expect(screen.queryByTestId(`letra-${a.id}`)).toBeNull();
    await pulsar('Empezar de nuevo');
    expect(screen.getByTestId(`letra-${a.id}`)).toBeTruthy();
    expect(screen.getByTestId('casilla-0')).toHaveTextContent('');
  });
});

describe('Forma la palabra: ver la respuesta y final de partida', () => {
  it('Ver la respuesta muestra la palabra y el botón Siguiente', async () => {
    await abrir();
    await pulsar('Ver la respuesta');
    expect(screen.getByText(`La palabra es: ${palabraActual(modelo)}`)).toBeTruthy();
    expect(screen.getByTestId('icono-respuesta', { includeHiddenElements: true })).toBeTruthy();
    expect(screen.getByText('Siguiente')).toBeTruthy();
  });

  it('una partida completa muestra "X de 5" sin contar la respuesta vista', async () => {
    await abrir();
    for (let i = 0; i < 5; i++) {
      if (i === 2) {
        await pulsar('Ver la respuesta');
      } else {
        await formarPalabra();
        await pulsar('Comprobar');
      }
      await pulsar(i < 4 ? 'Siguiente' : 'Ver resultado');
      if (i < 4) avanzarModelo();
    }
    expect(screen.getByText('Has acertado 4 de 5')).toBeTruthy();
    expect(screen.getByText('Jugar otra vez')).toBeTruthy();
    expect(screen.getByText('Volver al inicio')).toBeTruthy();
  });

  it('avisa de partida en curso al abrir y de que acaba al cerrar la quinta palabra', async () => {
    const avisar = jest.fn();
    await render(<FormaPalabra avisarPartida={avisar} />);
    expect(avisar).toHaveBeenCalledWith(true);
    for (let i = 0; i < 5; i++) {
      await pulsar('Ver la respuesta');
      if (i < 4) {
        expect(avisar).not.toHaveBeenCalledWith(false);
        await pulsar('Siguiente');
      }
    }
    expect(avisar).toHaveBeenCalledWith(false); // antes de pulsar "Ver resultado"
    await pulsar('Ver resultado');
    expect(screen.getByText('Has acertado 0 de 5')).toBeTruthy();
    await pulsar('Jugar otra vez');
    expect(avisar).toHaveBeenLastCalledWith(true);
    expect(screen.getByTestId('casilla-0')).toHaveTextContent('');
  });

  it('dentro del marco, Volver al inicio en el resultado sale sin preguntar', async () => {
    const actividad = {
      id: 'forma-palabra',
      icono: { nombre: 'alphabetical-variant' },
      nombre: 'Forma la palabra',
      descripcion: 'x',
      Contenido: FormaPalabra,
    };
    const alVolver = jest.fn();
    await render(<MarcoActividad actividad={actividad} alVolver={alVolver} />);
    for (let i = 0; i < 5; i++) {
      await pulsar('Ver la respuesta');
      await pulsar(i < 4 ? 'Siguiente' : 'Ver resultado');
    }
    await pulsar('Volver al inicio');
    expect(alVolver).toHaveBeenCalled();
    expect(screen.queryByText('¿Seguro que quieres salir? Perderás la partida')).toBeNull();
  });
});
