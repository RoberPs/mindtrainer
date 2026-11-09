import { render, screen } from '@testing-library/react-native';
import { Inicio } from '../src/pantallas/Inicio';
import { actividades } from '../src/actividades/registro';
import { tema } from '../src/tema';
import { crearActividades } from './ayudas';

// Luminancia relativa y contraste entre dos colores "#RRGGBB" (fórmula de WCAG).
function luminancia(hex: string): number {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const v = parseInt(hex.slice(i, i + 2), 16) / 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contraste(a: string, b: string): number {
  const [la, lb] = [luminancia(a), luminancia(b)].sort((x, y) => y - x);
  return (la + 0.05) / (lb + 0.05);
}

describe('Colores de las actividades en el inicio (RF-001 a RF-007, RF-014)', () => {
  it('las 5 actividades reales tienen color y son 5 colores distintos', () => {
    expect(actividades).toHaveLength(5);
    const colores = actividades.map((a) => a.color);
    colores.forEach((color) => expect(color).toBeTruthy());
    expect(new Set(colores).size).toBe(5);
  });

  it('cada color tiene un contraste de al menos 7 a 1 con el texto blanco', () => {
    for (const actividad of actividades) {
      expect(contraste(actividad.color as string, tema.colores.textoSobrePrimario)).toBeGreaterThanOrEqual(
        tema.contrasteMinimo,
      );
    }
  });

  it('ningún color repite el rojo de los círculos de Diferencias', () => {
    for (const actividad of actividades) {
      expect(actividad.color).not.toBe(tema.colores.marca);
    }
  });

  it('cada tarjeta se pinta con el color de su actividad y conserva nombre y descripción', async () => {
    const alAbrir = jest.fn();
    await render(<Inicio actividades={actividades} alAbrir={alAbrir} />);
    for (const actividad of actividades) {
      const tarjeta = screen.getByRole('button', { name: `${actividad.nombre}. ${actividad.descripcion}` });
      expect(tarjeta).toHaveStyle({ backgroundColor: actividad.color });
      expect(screen.getByText(actividad.nombre)).toBeTruthy();
      expect(screen.getByText(actividad.descripcion)).toBeTruthy();
      expect(screen.getByTestId(`icono-${actividad.id}`, { includeHiddenElements: true })).toBeTruthy();
    }
  });

  it('una actividad sin color se pinta con el azul de la app y no falla', async () => {
    const [sinColor] = crearActividades(1);
    await render(<Inicio actividades={[sinColor]} alAbrir={jest.fn()} />);
    const tarjeta = screen.getByRole('button', { name: `${sinColor.nombre}. ${sinColor.descripcion}` });
    expect(tarjeta).toHaveStyle({ backgroundColor: tema.colores.primario });
  });
});
