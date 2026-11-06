import { fireEvent, render, screen } from '@testing-library/react-native';
import App from '../App';
import { crearPartida } from '../src/actividades/parejas/juego';
import { textos, textosFormaPalabra, textosParejas } from '../src/textos';
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

describe('Textos de "Parejas" (FR-009, FR-014)', () => {
  it('los textos fijos son los acordados, con tildes y signos de apertura', () => {
    expect(textosParejas.nombre).toBe('Parejas');
    expect(textosParejas.descripcion).toBe('Encuentra las cartas iguales');
    expect(textosParejas.elegirTamano).toBe('Elige el tamaño de la partida');
    expect(textosParejas.pequena).toBe('Pequeña: 6 cartas');
    expect(textosParejas.mediana).toBe('Mediana: 8 cartas');
    expect(textosParejas.grande).toBe('Grande: 12 cartas');
    expect(textosParejas.felicitacion).toBe('¡Enhorabuena! Has encontrado todas las parejas');
    expect(textosParejas.intentosNecesitados(1)).toBe('Has necesitado 1 intento');
    expect(textosParejas.intentosNecesitados(5)).toBe('Has necesitado 5 intentos');
    expect(Object.values(textosParejas.dibujos)).toEqual([
      'Llave', 'Taza', 'Reloj', 'Gafas', 'Cama', 'Silla', 'Lámpara', 'Tijeras',
    ]);
  });

  it('cada botón de la actividad lleva icono y texto', async () => {
    jest.spyOn(Math, 'random').mockReturnValue(0);
    await render(<App />);
    await fireEvent.press(screen.getByText('Parejas'));
    for (const [id, t] of [
      ['icono-pequena', textosParejas.pequena],
      ['icono-mediana', textosParejas.mediana],
      ['icono-grande', textosParejas.grande],
    ]) {
      expect(screen.getByTestId(id, { includeHiddenElements: true })).toBeTruthy();
      expect(screen.getByText(t)).toBeTruthy();
    }
    await fireEvent.press(screen.getByText(textosParejas.pequena));
    // Una carta tapada: icono y texto 'Carta'
    expect(screen.getByTestId('icono-carta-0', { includeHiddenElements: true })).toBeTruthy();
    expect(screen.getAllByText(textosParejas.carta)).toHaveLength(6);
    // Dos cartas distintas a la vista: aparece 'Seguir' con icono y texto
    const ids = crearPartida('pequena', () => 0).cartas.map((c) => c.dibujo);
    await fireEvent.press(screen.getByTestId('carta-0'));
    await fireEvent.press(screen.getByTestId(`carta-${ids.findIndex((id) => id !== ids[0])}`));
    expect(screen.getByTestId('icono-seguir', { includeHiddenElements: true })).toBeTruthy();
    expect(screen.getByText(textosParejas.seguir)).toBeTruthy();
  });
});

describe('Textos de "Forma la palabra" (RF-014)', () => {
  it('los textos fijos son los acordados, con tildes y signos de apertura', () => {
    expect(textosFormaPalabra.nombre).toBe('Forma la palabra');
    expect(textosFormaPalabra.descripcion).toBe('Ordena las letras para formar la palabra');
    expect(textosFormaPalabra.borrarUltima).toBe('Borrar última letra');
    expect(textosFormaPalabra.acierto).toBe('¡Muy bien! Has formado la palabra');
    expect(textosFormaPalabra.laPalabraEs('casa')).toBe('La palabra es: casa');
    expect(textosFormaPalabra.aciertos(1)).toBe('Has acertado 1 de 5');
    expect(textosFormaPalabra.aciertos(5)).toBe('Has acertado 5 de 5');
  });

  it('cada botón de acción lleva icono y texto', async () => {
    jest.spyOn(Math, 'random').mockReturnValue(0);
    await render(<App />);
    await fireEvent.press(screen.getByText('Forma la palabra'));
    for (const [id, t] of [
      ['icono-comprobar', textosFormaPalabra.comprobar],
      ['icono-borrar-ultima', textosFormaPalabra.borrarUltima],
      ['icono-empezar-de-nuevo', textosFormaPalabra.empezarDeNuevo],
      ['icono-ver-respuesta', textosFormaPalabra.verRespuesta],
    ]) {
      expect(screen.getByTestId(id, { includeHiddenElements: true })).toBeTruthy();
      expect(screen.getByText(t)).toBeTruthy();
    }
    await fireEvent.press(screen.getByText(textosFormaPalabra.verRespuesta));
    expect(screen.getByTestId('icono-siguiente', { includeHiddenElements: true })).toBeTruthy();
    expect(screen.getByText(textosFormaPalabra.siguiente)).toBeTruthy();
    jest.restoreAllMocks();
  });
});
