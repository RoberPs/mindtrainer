import { fireEvent, render, screen, within } from '@testing-library/react-native';
import App from '../App';
import { Adivinanzas } from '../src/actividades/adivinanzas/Adivinanzas';
import { MarcoActividad } from '../src/pantallas/MarcoActividad';
import { crearPartida, responder, siguiente, type Partida } from '../src/actividades/adivinanzas/juego';
import { correctaActual, incorrectaActual, turnoActual } from './ayudas-adivinanzas';

// Con Math.random fijado a 0 conocemos la partida que crea la app (mismo sorteo).
let modelo: Partida;
beforeEach(() => {
  jest.spyOn(Math, 'random').mockReturnValue(0);
  modelo = crearPartida(() => 0);
});
afterEach(() => {
  jest.restoreAllMocks();
});

async function abrir() {
  await render(<App />);
  await fireEvent.press(screen.getByText('Adivinanzas'));
}
const pulsar = (texto: string) => fireEvent.press(screen.getByText(texto));

// Pasa a la adivinanza siguiente del modelo (mismo sorteo que la app).
function avanzarModelo() {
  modelo = siguiente(responder(modelo, correctaActual(modelo)));
}

describe('Adivinanzas: pantalla de una adivinanza', () => {
  it('aparece en la lista de inicio con icono, nombre y descripción', async () => {
    await render(<App />);
    expect(screen.getByText('Adivinanzas')).toBeTruthy();
    expect(screen.getByText('Descubre la respuesta de cada adivinanza')).toBeTruthy();
    expect(screen.getByTestId('icono-adivinanzas', { includeHiddenElements: true })).toBeTruthy();
  });

  it('al abrirla se ve el número, el texto y las tres respuestas con su icono', async () => {
    await abrir();
    expect(screen.getByText('Adivinanza 1 de 5')).toBeTruthy();
    expect(screen.getByTestId('icono-numero', { includeHiddenElements: true })).toBeTruthy();
    expect(screen.getByText(turnoActual(modelo).adivinanza.texto)).toBeTruthy();
    turnoActual(modelo).opciones.forEach((opcion, i) => {
      expect(within(screen.getByTestId(`respuesta-${i}`)).getByText(opcion)).toBeTruthy();
      expect(screen.getByTestId(`icono-respuesta-${i}`, { includeHiddenElements: true })).toBeTruthy();
    });
    expect(screen.queryByText('Siguiente')).toBeNull();
  });

  it('la correcta da el mensaje positivo y Siguiente, y las tres respuestas siguen visibles', async () => {
    await abrir();
    await pulsar(correctaActual(modelo));
    expect(screen.getByText('¡Muy bien! Esa es la respuesta correcta')).toBeTruthy();
    expect(screen.getByTestId('icono-acierto', { includeHiddenElements: true })).toBeTruthy();
    expect(screen.getByTestId('icono-siguiente', { includeHiddenElements: true })).toBeTruthy();
    expect(screen.getByText('Siguiente')).toBeTruthy();
    for (const opcion of turnoActual(modelo).opciones) expect(screen.getByText(opcion)).toBeTruthy();
  });

  it('una incorrecta da el mensaje amable con la correcta escrita y la deja señalada', async () => {
    await abrir();
    await pulsar(incorrectaActual(modelo));
    expect(screen.getByText(`No pasa nada. La respuesta correcta es: ${correctaActual(modelo)}`)).toBeTruthy();
    expect(screen.getByTestId('icono-fallo', { includeHiddenElements: true })).toBeTruthy();
    expect(screen.getByText('Siguiente')).toBeTruthy();
    const i = turnoActual(modelo).opciones.indexOf(correctaActual(modelo));
    expect(screen.getByTestId(`icono-respuesta-${i}`, { includeHiddenElements: true })).toBeTruthy();
  });

  it('tras responder, tocar otra respuesta no cambia nada: un solo intento', async () => {
    await abrir();
    await pulsar(incorrectaActual(modelo));
    await fireEvent.press(screen.getByTestId(`respuesta-${turnoActual(modelo).opciones.indexOf(correctaActual(modelo))}`));
    expect(screen.getByText(`No pasa nada. La respuesta correcta es: ${correctaActual(modelo)}`)).toBeTruthy();
    expect(screen.queryByText('¡Muy bien! Esa es la respuesta correcta')).toBeNull();
  });

  it('Siguiente muestra la adivinanza 2 sin mensajes anteriores y con respuestas tocables', async () => {
    await abrir();
    await pulsar(correctaActual(modelo));
    await pulsar('Siguiente');
    avanzarModelo();
    expect(screen.getByText('Adivinanza 2 de 5')).toBeTruthy();
    expect(screen.getByText(turnoActual(modelo).adivinanza.texto)).toBeTruthy();
    expect(screen.queryByText('¡Muy bien! Esa es la respuesta correcta')).toBeNull();
    expect(screen.queryByText('Siguiente')).toBeNull();
    await pulsar(correctaActual(modelo));
    expect(screen.getByText('¡Muy bien! Esa es la respuesta correcta')).toBeTruthy();
  });
});

// Responde la adivinanza actual (bien o mal) y pulsa el botón de seguir.
async function jugarTurno(i: number, acierta: boolean) {
  await pulsar(acierta ? correctaActual(modelo) : incorrectaActual(modelo));
  await pulsar(i < 4 ? 'Siguiente' : 'Ver resultado');
  if (i < 4) avanzarModelo();
}

describe('Adivinanzas: final de partida', () => {
  it('en la quinta el botón dice "Ver resultado" en lugar de "Siguiente"', async () => {
    await abrir();
    for (let i = 0; i < 4; i++) await jugarTurno(i, true);
    expect(screen.getByText('Adivinanza 5 de 5')).toBeTruthy();
    await pulsar(correctaActual(modelo));
    expect(screen.getByText('Ver resultado')).toBeTruthy();
    expect(screen.queryByText('Siguiente')).toBeNull();
  });

  it.each([
    [5, '¡Perfecto! Las has acertado todas'],
    [3, '¡Muy bien! Tienes buena memoria'],
    [0, '¡Ánimo! Con la práctica saldrán más'],
  ])('con %i aciertos el resultado dice "X de 5", su mensaje y los dos botones', async (aciertos, mensaje) => {
    await abrir();
    for (let i = 0; i < 5; i++) await jugarTurno(i, i < aciertos);
    expect(screen.getByText(`Has acertado ${aciertos} de 5`)).toBeTruthy();
    expect(screen.getByText(mensaje)).toBeTruthy();
    expect(screen.getByTestId('icono-resultado', { includeHiddenElements: true })).toBeTruthy();
    expect(screen.getByTestId('icono-jugar-otra-vez', { includeHiddenElements: true })).toBeTruthy();
    expect(screen.getByText('Jugar otra vez')).toBeTruthy();
    expect(screen.getByText('Volver al inicio')).toBeTruthy();
    expect(screen.queryByTestId('respuesta-0')).toBeNull();
  });

  it('avisa de partida en curso al abrir y de que acaba al responder la quinta', async () => {
    const avisar = jest.fn();
    await render(<Adivinanzas avisarPartida={avisar} />);
    expect(avisar).toHaveBeenCalledWith(true);
    for (let i = 0; i < 5; i++) {
      await pulsar(correctaActual(modelo));
      if (i < 4) {
        expect(avisar).not.toHaveBeenCalledWith(false);
        await pulsar('Siguiente');
        avanzarModelo();
      }
    }
    expect(avisar).toHaveBeenCalledWith(false); // antes de pulsar "Ver resultado"
    await pulsar('Ver resultado');
    expect(screen.getByText('Has acertado 5 de 5')).toBeTruthy();
  });

  it('Jugar otra vez empieza una partida nueva, con 0 aciertos y sin mensajes anteriores', async () => {
    const avisar = jest.fn();
    await render(<Adivinanzas avisarPartida={avisar} />);
    for (let i = 0; i < 5; i++) await jugarTurno(i, true);
    await pulsar('Jugar otra vez');
    expect(avisar).toHaveBeenLastCalledWith(true);
    expect(screen.getByText('Adivinanza 1 de 5')).toBeTruthy();
    expect(screen.queryByText('¡Muy bien! Esa es la respuesta correcta')).toBeNull();
    expect(screen.queryByText('Siguiente')).toBeNull();
    // La nueva partida cuenta desde cero: se falla una y se acierta el resto.
    modelo = crearPartida(() => 0);
    for (let i = 0; i < 5; i++) await jugarTurno(i, i !== 0);
    expect(screen.getByText('Has acertado 4 de 5')).toBeTruthy();
  });

  it('dentro del marco, Volver al inicio en el resultado sale sin preguntar', async () => {
    const actividad = {
      id: 'adivinanzas',
      icono: { nombre: 'help-circle' },
      nombre: 'Adivinanzas',
      descripcion: 'x',
      Contenido: Adivinanzas,
    };
    const alVolver = jest.fn();
    await render(<MarcoActividad actividad={actividad} alVolver={alVolver} />);
    for (let i = 0; i < 5; i++) await jugarTurno(i, true);
    await pulsar('Volver al inicio');
    expect(alVolver).toHaveBeenCalled();
    expect(screen.queryByText('¿Seguro que quieres salir? Perderás la partida')).toBeNull();
  });
});
