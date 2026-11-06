import { fireEvent, render, screen } from '@testing-library/react-native';
import App from '../App';
import { crearActividades } from './ayudas';

describe('Pantalla de inicio', () => {
  it('muestra todas las actividades con icono, nombre y descripción (FR-001, FR-002, FR-013)', async () => {
    await render(<App actividades={crearActividades(3)} />);
    for (let i = 1; i <= 3; i++) {
      expect(screen.getByText(`Actividad ${i}`)).toBeTruthy();
      expect(screen.getByText(`Descripción de la actividad ${i}`)).toBeTruthy();
      expect(screen.getByTestId(`icono-actividad-${i}`, { includeHiddenElements: true })).toBeTruthy();
    }
  });

  it('con una sola actividad se muestra igual, dentro de la lista (FR-005)', async () => {
    await render(<App actividades={crearActividades(1)} />);
    expect(screen.getByTestId('lista-actividades')).toBeTruthy();
    expect(screen.getByText('Actividad 1')).toBeTruthy();
    expect(screen.getByText('Descripción de la actividad 1')).toBeTruthy();
    expect(screen.getByTestId('icono-actividad-1', { includeHiddenElements: true })).toBeTruthy();
  });

  it('con muchas actividades la lista es desplazable y están todas (FR-006)', async () => {
    await render(<App actividades={crearActividades(30)} />);
    const lista = screen.getByTestId('lista-actividades');
    // La lista es un contenedor con desplazamiento vertical
    expect(lista.type).toBe('RCTScrollView');
    expect(lista.props.horizontal).not.toBe(true);
    for (let i = 1; i <= 30; i++) {
      expect(screen.getByText(`Actividad ${i}`)).toBeTruthy();
    }
  });

  it('al abrir la app se ve la lista sin registro, permisos ni tutorial; al tocar se abre la actividad (FR-003, FR-004)', async () => {
    await render(<App actividades={crearActividades(2)} />);
    expect(screen.getByTestId('lista-actividades')).toBeTruthy();
    expect(screen.queryByText(/registr|permiso|tutorial|bienvenid/i)).toBeNull();

    await fireEvent.press(screen.getByText('Actividad 2'));
    expect(screen.getByText('Contenido de prueba')).toBeTruthy();
    expect(screen.queryByTestId('lista-actividades')).toBeNull();
  });
});
