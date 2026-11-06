import { fireEvent, render, screen } from '@testing-library/react-native';
import App from '../App';
import { crearPartida } from '../src/actividades/parejas/juego';
import { crearPartida as crearPartidaSopa } from '../src/actividades/sopa-de-letras/juego';
import { textos, textosAdivinanzas, textosDiferencias, textosFormaPalabra, textosParejas, textosSopa } from '../src/textos';
import { crearPartida as crearPartidaAdivinanzas } from '../src/actividades/adivinanzas/juego';
import { tema } from '../src/tema';
import { crearActividades } from './ayudas';
import { casillasDe } from './ayudas-sopa';
import { diferencias } from '../src/actividades/diferencias/escena';
import { centroDe, puntoVacio, tocarAbajo } from './ayudas-diferencias';

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

describe('Textos de "Sopa de letras" (RF-017, RF-018)', () => {
  it('los textos fijos son los acordados, con tildes y signos de apertura', () => {
    expect(textosSopa.nombre).toBe('Sopa de letras');
    expect(textosSopa.descripcion).toBe('Encuentra las palabras escondidas');
    expect(textosSopa.etiqueta).toBe('Busca 3 palabras relacionadas con:');
    expect(textosSopa.invitar).toBe('Ahora toca la última letra de la palabra');
    expect(textosSopa.acierto).toBe('¡Muy bien! Has encontrado una palabra');
    expect(textosSopa.fallo).toBe('Esa no es una de las palabras. Inténtalo otra vez');
    expect(textosSopa.noRecta).toBe('Marca una línea recta, en horizontal o en vertical');
    expect(textosSopa.felicitacion).toBe('¡Enhorabuena! Has encontrado las 3 palabras');
    expect(textosSopa.faltan(3)).toBe('Te faltan 3 palabras');
    expect(textosSopa.faltan(1)).toBe('Te falta 1 palabra');
    expect(textosSopa.faltan(0)).toBe('No te falta ninguna palabra');
    expect(textosSopa.intentosNecesitados(3)).toBe('Has necesitado 3 intentos');
  });

  it('las palabras encontradas tienen contraste suficiente', () => {
    expect(contraste(tema.colores.textoSobrePrimario, tema.colores.acierto)).toBeGreaterThanOrEqual(
      tema.contrasteMinimo,
    );
  });

  it('el botón de la felicitación lleva icono y texto', async () => {
    jest.spyOn(Math, 'random').mockReturnValue(0);
    const sopa = crearPartidaSopa(undefined, () => 0).sopa;
    await render(<App />);
    await fireEvent.press(screen.getByText('Sopa de letras'));
    for (const palabra of sopa.palabras) {
      const { inicio, fin } = casillasDe(sopa, palabra);
      await fireEvent.press(screen.getByTestId(`celda-${inicio.fila}-${inicio.columna}`));
      await fireEvent.press(screen.getByTestId(`celda-${fin.fila}-${fin.columna}`));
    }
    expect(screen.getByTestId('icono-jugar-otra-vez', { includeHiddenElements: true })).toBeTruthy();
    expect(screen.getByText(textosSopa.jugarOtraVez)).toBeTruthy();
    jest.restoreAllMocks();
  });
});

describe('Textos de "Adivinanzas" (RF-015, RF-016)', () => {
  it('los textos fijos son los acordados, con tildes y signos de apertura', () => {
    expect(textosAdivinanzas.nombre).toBe('Adivinanzas');
    expect(textosAdivinanzas.descripcion).toBe('Descubre la respuesta de cada adivinanza');
    expect(textosAdivinanzas.numero(2)).toBe('Adivinanza 2 de 5');
    expect(textosAdivinanzas.acierto).toBe('¡Muy bien! Esa es la respuesta correcta');
    expect(textosAdivinanzas.fallo('llave')).toBe('No pasa nada. La respuesta correcta es: llave');
    expect(textosAdivinanzas.aciertos(1)).toBe('Has acertado 1 de 5');
    expect(textosAdivinanzas.aciertos(5)).toBe('Has acertado 5 de 5');
  });

  it('el mensaje final depende de los aciertos', () => {
    expect(textosAdivinanzas.mensajeFinal(5)).toBe('¡Perfecto! Las has acertado todas');
    expect(textosAdivinanzas.mensajeFinal(4)).toBe('¡Muy bien! Tienes buena memoria');
    expect(textosAdivinanzas.mensajeFinal(3)).toBe('¡Muy bien! Tienes buena memoria');
    expect(textosAdivinanzas.mensajeFinal(2)).toBe('¡Ánimo! Con la práctica saldrán más');
    expect(textosAdivinanzas.mensajeFinal(0)).toBe('¡Ánimo! Con la práctica saldrán más');
  });

  it('cada botón de acción lleva icono y texto', async () => {
    jest.spyOn(Math, 'random').mockReturnValue(0);
    const partida = crearPartidaAdivinanzas(() => 0);
    await render(<App />);
    await fireEvent.press(screen.getByText('Adivinanzas'));
    const turno = partida.turnos[0];
    await fireEvent.press(screen.getByText(turno.adivinanza.correcta));
    expect(screen.getByTestId('icono-siguiente', { includeHiddenElements: true })).toBeTruthy();
    expect(screen.getByText(textosAdivinanzas.siguiente)).toBeTruthy();
    // La quinta adivinanza ofrece "Ver resultado" y el resultado ofrece "Jugar otra vez".
    const p = partida;
    for (let i = 0; i < 5; i++) {
      if (i > 0) await fireEvent.press(screen.getByText(p.turnos[i].adivinanza.correcta));
      await fireEvent.press(screen.getByText(i < 4 ? textosAdivinanzas.siguiente : textosAdivinanzas.verResultado));
    }
    expect(screen.getByTestId('icono-jugar-otra-vez', { includeHiddenElements: true })).toBeTruthy();
    expect(screen.getByText(textosAdivinanzas.jugarOtraVez)).toBeTruthy();
    jest.restoreAllMocks();
  });
});

describe('Textos de "Diferencias" (RF-014, RF-015)', () => {
  it('los textos fijos son los acordados, con tildes y signos de apertura', () => {
    expect(textosDiferencias.nombre).toBe('Diferencias');
    expect(textosDiferencias.descripcion).toBe('Encuentra las 3 diferencias entre dos dibujos');
    expect(textosDiferencias.instruccion).toBe('Toca en el dibujo de abajo lo que sea distinto');
    expect(textosDiferencias.fallo).toBe('Ahí no hay ninguna diferencia. ¡Sigue buscando!');
    expect(textosDiferencias.felicitacion).toBe('¡Enhorabuena! Has encontrado las 3 diferencias');
    expect(textosDiferencias.jugarOtraVez).toBe('Jugar otra vez');
  });

  it('el aviso de las que faltan usa singular para 1 y plural para 2 y 3', () => {
    expect(textosDiferencias.faltan(3)).toBe('Te faltan 3 diferencias');
    expect(textosDiferencias.faltan(2)).toBe('Te faltan 2 diferencias');
    expect(textosDiferencias.faltan(1)).toBe('Te falta 1 diferencia');
  });

  it('los toques incluyen el número', () => {
    expect(textosDiferencias.toques(3)).toBe('Has necesitado 3 toques');
    expect(textosDiferencias.toques(7)).toBe('Has necesitado 7 toques');
  });

  it('el color de los círculos tiene contraste suficiente sobre el fondo y las tarjetas', () => {
    expect(contraste(tema.colores.marca, tema.colores.fondo)).toBeGreaterThanOrEqual(tema.contrasteMinimo);
    expect(contraste(tema.colores.marca, tema.colores.tarjeta)).toBeGreaterThanOrEqual(tema.contrasteMinimo);
  });

  it('el botón y los mensajes importantes llevan icono y texto', async () => {
    await render(<App />);
    await fireEvent.press(screen.getByText('Diferencias'));
    expect(screen.getByTestId('icono-faltan', { includeHiddenElements: true })).toBeTruthy();
    await tocarAbajo(puntoVacio().x, puntoVacio().y);
    expect(screen.getByTestId('icono-fallo', { includeHiddenElements: true })).toBeTruthy();
    expect(screen.getByText(textosDiferencias.fallo)).toBeTruthy();
    for (const d of diferencias) await tocarAbajo(centroDe(d.id).x, centroDe(d.id).y);
    expect(screen.getByTestId('icono-felicitacion', { includeHiddenElements: true })).toBeTruthy();
    expect(screen.getByText(textosDiferencias.felicitacion)).toBeTruthy();
    expect(screen.getByTestId('icono-jugar-otra-vez', { includeHiddenElements: true })).toBeTruthy();
    expect(screen.getByText(textosDiferencias.jugarOtraVez)).toBeTruthy();
  });
});
