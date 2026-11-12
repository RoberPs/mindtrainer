import { fireEvent, screen } from '@testing-library/react-native';
import { actividades } from '../src/actividades/registro';
import { tema } from '../src/tema';
import { crearActividades, abrirApp } from './ayudas';

describe('Pantalla de inicio', () => {
  it('muestra todas las actividades con icono, nombre y descripción (FR-001, FR-002, FR-013)', async () => {
    await abrirApp(crearActividades(3));
    for (let i = 1; i <= 3; i++) {
      expect(screen.getByText(`Actividad ${i}`)).toBeTruthy();
      expect(screen.getByText(`Descripción de la actividad ${i}`)).toBeTruthy();
      expect(screen.getByTestId(`icono-actividad-${i}`, { includeHiddenElements: true })).toBeTruthy();
    }
  });

  it('con una sola actividad se muestra igual, dentro de la lista (FR-005)', async () => {
    await abrirApp(crearActividades(1));
    expect(screen.getByTestId('lista-actividades')).toBeTruthy();
    expect(screen.getByText('Actividad 1')).toBeTruthy();
    expect(screen.getByText('Descripción de la actividad 1')).toBeTruthy();
    expect(screen.getByTestId('icono-actividad-1', { includeHiddenElements: true })).toBeTruthy();
  });

  it('con muchas actividades la lista es desplazable y están todas (FR-006)', async () => {
    await abrirApp(crearActividades(30));
    const lista = screen.getByTestId('lista-actividades');
    // La lista es un contenedor con desplazamiento vertical
    expect(lista.type).toBe('RCTScrollView');
    expect(lista.props.horizontal).not.toBe(true);
    for (let i = 1; i <= 30; i++) {
      expect(screen.getByText(`Actividad ${i}`)).toBeTruthy();
    }
  });

  it('al abrir la app se ve la lista sin registro, permisos ni tutorial; al tocar se abre la actividad (FR-003, FR-004)', async () => {
    await abrirApp(crearActividades(2));
    expect(screen.getByTestId('lista-actividades')).toBeTruthy();
    expect(screen.queryByText(/registr|permiso|tutorial/i)).toBeNull();

    await fireEvent.press(screen.getByText('Actividad 2'));
    expect(screen.getByText('Contenido de prueba')).toBeTruthy();
    expect(screen.queryByTestId('lista-actividades')).toBeNull();
  });
});

describe('Pantalla de juegos: encabezado y tarjetas (RF-005 a RF-008)', () => {
  it('muestra el encabezado "Elige uno de los juegos"', async () => {
    await abrirApp(crearActividades(2));
    expect(screen.getByText('Elige uno de los juegos')).toBeTruthy();
  });

  it('con las 5 actividades reales hay 5 tarjetas con icono, nombre y descripción, y cada una abre su juego', async () => {
    await abrirApp();
    for (const a of actividades) {
      expect(screen.getByRole('button', { name: `${a.nombre}. ${a.descripcion}` })).toBeTruthy();
      expect(screen.getByText(a.nombre)).toBeTruthy();
      expect(screen.getByText(a.descripcion)).toBeTruthy();
      expect(screen.getByTestId(`icono-${a.id}`, { includeHiddenElements: true })).toBeTruthy();
    }
    await fireEvent.press(screen.getByRole('button', { name: `${actividades[1].nombre}. ${actividades[1].descripcion}` }));
    expect(screen.queryByTestId('lista-actividades')).toBeNull();
  });

  it('una actividad sin color se pinta con el azul principal', async () => {
    await abrirApp(crearActividades(1));
    const tarjeta = screen.getByRole('button', { name: 'Actividad 1. Descripción de la actividad 1' });
    expect(tarjeta).toHaveStyle({ backgroundColor: tema.colores.primario });
  });

  it('cada tarjeta se pinta con el color de su actividad', async () => {
    await abrirApp();
    for (const a of actividades) {
      const tarjeta = screen.getByRole('button', { name: `${a.nombre}. ${a.descripcion}` });
      expect(tarjeta).toHaveStyle({ backgroundColor: a.color });
    }
  });
});
