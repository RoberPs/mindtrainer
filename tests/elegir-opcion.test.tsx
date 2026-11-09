import { fireEvent, render, screen } from '@testing-library/react-native';
import { ElegirOpcion } from '../src/componentes/ElegirOpcion';

const opciones = [
  { valor: 'a', texto: 'Opción A', icono: { nombre: 'size-s' }, idIcono: 'icono-a' },
  { valor: 'b', texto: 'Opción B', icono: { nombre: 'size-m' }, idIcono: 'icono-b' },
  { valor: 'c', texto: 'Opción C', icono: { nombre: 'size-l' }, idIcono: 'icono-c' },
];

describe('ElegirOpcion', () => {
  it('muestra la invitación y un botón con su icono por cada opción', async () => {
    await render(<ElegirOpcion invitacion="Elige una" opciones={opciones} alElegir={() => {}} />);
    expect(screen.getByText('Elige una')).toBeTruthy();
    for (const o of opciones) {
      expect(screen.getByRole('button', { name: o.texto })).toBeTruthy();
      expect(screen.getByTestId(o.idIcono, { includeHiddenElements: true })).toBeTruthy();
    }
  });

  it('al tocar un botón avisa con el valor de esa opción', async () => {
    const alElegir = jest.fn();
    await render(<ElegirOpcion invitacion="Elige una" opciones={opciones} alElegir={alElegir} />);
    await fireEvent.press(screen.getByRole('button', { name: 'Opción B' }));
    expect(alElegir).toHaveBeenCalledTimes(1);
    expect(alElegir).toHaveBeenCalledWith('b');
  });
});
