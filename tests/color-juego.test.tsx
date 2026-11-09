import { fireEvent, render, screen } from '@testing-library/react-native';
import { Text } from 'react-native';
import { BotonGrande } from '../src/componentes/BotonGrande';
import { ProveedorColorJuego, useColorJuego } from '../src/componentes/ColorJuego';
import { actividades } from '../src/actividades/registro';
import { MarcoActividad } from '../src/pantallas/MarcoActividad';
import { tema } from '../src/tema';
import { crearActividades } from './ayudas';

function MuestraColor() {
  const { fondo, texto } = useColorJuego();
  return <Text>{`${fondo}|${texto}`}</Text>;
}

describe('Color del juego (contrato actividad-color)', () => {
  it('sin proveedor se usa el azul principal con texto blanco', async () => {
    await render(<MuestraColor />);
    expect(screen.getByText(`${tema.colores.primario}|${tema.colores.textoSobrePrimario}`)).toBeTruthy();
  });

  it('dentro de un proveedor se usa el color del juego', async () => {
    await render(
      <ProveedorColorJuego fondo="#F2800D" texto="#111111">
        <MuestraColor />
      </ProveedorColorJuego>,
    );
    expect(screen.getByText('#F2800D|#111111')).toBeTruthy();
  });

  it('BotonGrande se pinta con el color del juego', async () => {
    await render(
      <ProveedorColorJuego fondo="#A32752" texto="#FFFFFF">
        <BotonGrande texto="Pulsa" icono={{ nombre: 'home' }} idIcono="i" alTocar={() => {}} />
      </ProveedorColorJuego>,
    );
    expect(screen.getByRole('button', { name: 'Pulsa' })).toHaveStyle({ backgroundColor: '#A32752' });
  });

  it('BotonGrande sin proveedor es azul', async () => {
    await render(<BotonGrande texto="Pulsa" icono={{ nombre: 'home' }} idIcono="i" alTocar={() => {}} />);
    expect(screen.getByRole('button', { name: 'Pulsa' })).toHaveStyle({ backgroundColor: tema.colores.primario });
  });
});

describe('Color de cada juego en toda su pantalla (RF-012 a RF-014)', () => {
  it('las 5 actividades reales tienen color y texto, y son 5 colores distintos', () => {
    expect(actividades).toHaveLength(5);
    actividades.forEach((a) => {
      expect(a.color).toBeTruthy();
      expect(a.colorTexto).toBeTruthy();
    });
    expect(new Set(actividades.map((a) => a.color)).size).toBe(5);
  });

  it('el marco da el color del juego al botón "Volver al inicio" y a los del aviso de salir', async () => {
    const [base] = crearActividades(1);
    const actividad = { ...base, color: '#A32752', colorTexto: '#FFFFFF' };
    await render(<MarcoActividad actividad={actividad} alVolver={() => {}} />);
    expect(screen.getByRole('button', { name: 'Volver al inicio' })).toHaveStyle({ backgroundColor: '#A32752' });
    await fireEvent.press(screen.getByText('Empezar partida'));
    await fireEvent.press(screen.getByRole('button', { name: 'Volver al inicio' }));
    expect(screen.getByRole('button', { name: 'Sí, salir' })).toHaveStyle({ backgroundColor: '#A32752' });
    expect(screen.getByRole('button', { name: 'No, seguir jugando' })).toHaveStyle({ backgroundColor: '#A32752' });
  });

  it.each(actividades.map((a) => [a.nombre, a] as const))(
    '%s: su pantalla de partida usa el color del juego en "Volver al inicio" y en sus botones',
    async (_nombre, actividad) => {
      await render(<MarcoActividad actividad={actividad} alVolver={() => {}} />);
      expect(screen.getByRole('button', { name: 'Volver al inicio' })).toHaveStyle({ backgroundColor: actividad.color });
      // Todos los demás botones de la primera pantalla del juego (elegir, letras, respuestas...) usan el color del juego.
      const otros = screen.getAllByRole('button').filter((b) => b.props.accessibilityLabel !== 'Volver al inicio');
      expect(otros.length).toBeGreaterThan(0);
      otros.forEach((b) => expect(b).toHaveStyle({ backgroundColor: actividad.color }));
    },
  );
});
