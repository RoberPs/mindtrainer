import { fireEvent, screen } from '@testing-library/react-native';
import { crearActividades, abrirApp } from './ayudas';

async function abrirPrimeraActividad() {
  await abrirApp(crearActividades(2));
  await fireEvent.press(screen.getByText('Actividad 1'));
}

describe('Marco de actividad: Volver al inicio', () => {
  it('muestra el botón "Volver al inicio" con icono y texto (FR-007, FR-015)', async () => {
    await abrirPrimeraActividad();
    expect(screen.getByText('Volver al inicio')).toBeTruthy();
    expect(screen.getByTestId('icono-volver', { includeHiddenElements: true })).toBeTruthy();
  });

  it('sin partida en curso, vuelve al inicio sin preguntar (FR-008)', async () => {
    await abrirPrimeraActividad();
    await fireEvent.press(screen.getByText('Volver al inicio'));
    expect(screen.getByTestId('lista-actividades')).toBeTruthy();
    expect(screen.queryByText(/Seguro que quieres salir/)).toBeNull();
  });

  it('con partida en curso, pide confirmación con los dos botones (FR-011)', async () => {
    await abrirPrimeraActividad();
    await fireEvent.press(screen.getByText('Empezar partida'));
    await fireEvent.press(screen.getByText('Volver al inicio'));
    expect(screen.getByText('¿Seguro que quieres salir? Perderás la partida')).toBeTruthy();
    expect(screen.getByText('Sí, salir')).toBeTruthy();
    expect(screen.getByText('No, seguir jugando')).toBeTruthy();
    expect(screen.queryByTestId('lista-actividades')).toBeNull();
  });

  it('"No, seguir jugando" mantiene la partida; "Sí, salir" vuelve al inicio (FR-008, FR-012)', async () => {
    await abrirPrimeraActividad();
    await fireEvent.press(screen.getByText('Empezar partida'));

    await fireEvent.press(screen.getByText('Volver al inicio'));
    await fireEvent.press(screen.getByText('No, seguir jugando'));
    expect(screen.queryByText(/Seguro que quieres salir/)).toBeNull();
    expect(screen.getByText('Contenido de prueba')).toBeTruthy();
    expect(screen.queryByTestId('lista-actividades')).toBeNull();

    // La partida sigue en curso: salir vuelve a pedir confirmación
    await fireEvent.press(screen.getByText('Volver al inicio'));
    expect(screen.getByText('Sí, salir')).toBeTruthy();
    await fireEvent.press(screen.getByText('Sí, salir'));
    expect(screen.getByTestId('lista-actividades')).toBeTruthy();
  });

  it('cuando la partida termina, salir ya no pide confirmación (contrato, regla 3)', async () => {
    await abrirPrimeraActividad();
    await fireEvent.press(screen.getByText('Empezar partida'));
    await fireEvent.press(screen.getByText('Terminar partida'));
    await fireEvent.press(screen.getByText('Volver al inicio'));
    expect(screen.queryByText(/Seguro que quieres salir/)).toBeNull();
    expect(screen.getByTestId('lista-actividades')).toBeTruthy();
  });
});
