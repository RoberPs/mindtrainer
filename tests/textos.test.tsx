import { fireEvent, render, screen } from '@testing-library/react-native';
import App from '../App';
import { textos } from '../src/textos';
import { tema } from '../src/tema';
import { crearActividades } from './ayudas';

// Contraste entre dos colores hexadecimales (#RRGGBB), según la fórmula habitual de accesibilidad.
function luminancia(hex: string): number {
  const canal = (i: number) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * canal(1) + 0.7152 * canal(3) + 0.0722 * canal(5);
}
function contraste(a: string, b: string): number {
  const [claro, oscuro] = [luminancia(a), luminancia(b)].sort((x, y) => y - x);
  return (claro + 0.05) / (oscuro + 0.05);
}

describe('Textos en español de España (FR-009)', () => {
  it('los textos fijos son los acordados, con tildes y signos de apertura', () => {
    expect(textos.volverAlInicio).toBe('Volver al inicio');
    expect(textos.avisoSalir).toBe('¿Seguro que quieres salir? Perderás la partida');
    expect(textos.siSalir).toBe('Sí, salir');
    expect(textos.noSeguir).toBe('No, seguir jugando');
  });
});

describe('Los botones llevan icono y texto (FR-014)', () => {
  it('"Volver al inicio" y los botones del aviso tienen icono y texto', async () => {
    await render(<App actividades={crearActividades(1)} />);
    await fireEvent.press(screen.getByText('Actividad 1'));
    await fireEvent.press(screen.getByText('Empezar partida'));
    await fireEvent.press(screen.getByText('Volver al inicio'));
    for (const id of ['icono-volver', 'icono-si-salir', 'icono-no-seguir']) {
      expect(screen.getByTestId(id, { includeHiddenElements: true })).toBeTruthy();
    }
    for (const t of [textos.volverAlInicio, textos.siSalir, textos.noSeguir]) {
      expect(screen.getByText(t)).toBeTruthy();
    }
  });
});

describe('Tema accesible (FR-010)', () => {
  it('cumple los mínimos de letra, botón y contraste', () => {
    expect(tema.letra.normal).toBeGreaterThanOrEqual(22);
    expect(tema.boton.altoMinimo).toBeGreaterThanOrEqual(64);
    expect(contraste(tema.colores.texto, tema.colores.fondo)).toBeGreaterThanOrEqual(tema.contrasteMinimo);
    expect(contraste(tema.colores.texto, tema.colores.tarjeta)).toBeGreaterThanOrEqual(tema.contrasteMinimo);
    expect(contraste(tema.colores.textoSobrePrimario, tema.colores.primario)).toBeGreaterThanOrEqual(
      tema.contrasteMinimo,
    );
  });
});
