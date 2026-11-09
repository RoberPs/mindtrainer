import { tema } from '../src/tema';

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

const c = tema.colores;
const juegos = Object.entries(c.actividades);
// Excepción expresa de la persona responsable (spec 009, aclaraciones): naranja vivo con texto blanco.
const conExcepcion = ['naranja'];

describe('Contraste de la paleta (RF-009 a RF-012)', () => {
  it.each(juegos.filter(([nombre]) => !conExcepcion.includes(nombre)))('el color de %s tiene al menos 7 a 1 entre su texto y su fondo', (_nombre, juego) => {
    expect(contraste(juego.fondo, juego.texto)).toBeGreaterThanOrEqual(tema.contrasteMinimo);
  });

  it('la excepción del naranja es la única y está documentada: texto blanco sobre el naranja del logo', () => {
    expect(conExcepcion).toEqual(['naranja']);
    expect(c.actividades.naranja).toEqual({ fondo: '#F2800D', texto: '#FFFFFF' });
  });

  it('hay 5 colores de juego y sus fondos son distintos', () => {
    expect(juegos).toHaveLength(5);
    expect(new Set(juegos.map(([, j]) => j.fondo)).size).toBe(5);
  });

  it.each([
    ['texto', c.texto, c.fondo],
    ['texto', c.texto, c.tarjeta],
    ['textoSobrePrimario', c.textoSobrePrimario, c.primario],
    ['acierto', c.acierto, c.fondo],
    ['acierto', c.acierto, c.tarjeta],
    ['marca', c.marca, c.fondo],
    ['marca', c.marca, c.tarjeta],
    ['borde', c.borde, c.fondo],
  ])('%s sobre su fondo tiene al menos 7 a 1', (_nombre, primero, segundo) => {
    expect(contraste(primero, segundo)).toBeGreaterThanOrEqual(tema.contrasteMinimo);
  });

  it('el fondo es el crema del logo y no hay blanco puro como fondo ni ficha', () => {
    expect(c.fondo).toBe('#FFF9F0');
    expect(c.tarjeta.toUpperCase()).not.toBe('#FFFFFF');
  });
});
