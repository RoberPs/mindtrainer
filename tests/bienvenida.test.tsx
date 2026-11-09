import { fireEvent, render, screen } from '@testing-library/react-native';
import App from '../App';
import { textosBienvenida } from '../src/textos';
import { crearActividades } from './ayudas';

describe('Pantalla de bienvenida (RF-001 a RF-004)', () => {
  it('al abrir la app se ve la bienvenida con logo, nombre, mensaje y botón, y no la lista', async () => {
    await render(<App actividades={crearActividades(2)} />);
    expect(screen.getByText(textosBienvenida.nombreApp)).toBeTruthy();
    expect(screen.getByText(textosBienvenida.titulo)).toBeTruthy();
    expect(screen.getByText(textosBienvenida.pregunta)).toBeTruthy();
    expect(screen.getByRole('button', { name: textosBienvenida.empezar })).toBeTruthy();
    expect(screen.getByTestId('logo-grande', { includeHiddenElements: true })).toBeTruthy();
    expect(screen.getByTestId('logo-pequeno', { includeHiddenElements: true })).toBeTruthy();
    expect(screen.queryByTestId('lista-actividades')).toBeNull();
  });

  it('"Empezar" lleva a la lista de juegos', async () => {
    await render(<App actividades={crearActividades(2)} />);
    await fireEvent.press(screen.getByRole('button', { name: 'Empezar' }));
    expect(screen.getByTestId('lista-actividades')).toBeTruthy();
    expect(screen.queryByText(textosBienvenida.titulo)).toBeNull();
  });

  it('"Volver al inicio" desde un juego lleva a la lista, no a la bienvenida', async () => {
    await render(<App actividades={crearActividades(2)} />);
    await fireEvent.press(screen.getByRole('button', { name: 'Empezar' }));
    await fireEvent.press(screen.getByText('Actividad 1'));
    await fireEvent.press(screen.getByRole('button', { name: 'Volver al inicio' }));
    expect(screen.getByTestId('lista-actividades')).toBeTruthy();
    expect(screen.queryByText(textosBienvenida.titulo)).toBeNull();
  });

  it('no pide registro, permisos ni datos', async () => {
    await render(<App actividades={crearActividades(1)} />);
    expect(screen.queryByText(/registr|permiso|cuenta|contraseña/i)).toBeNull();
  });
});
