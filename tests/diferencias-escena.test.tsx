import { textosDiferencias } from '../src/textos';
import { dibujosDe, proporcionDibujo, type Cambio, type Colocado, type Zona } from '../src/actividades/diferencias/escena';
import { escenas } from '../src/actividades/diferencias/escenas';

const todas = escenas.map((e) => [e.id, e] as const);

const luminancia = (hex: string) => {
  const [r, g, b] = [1, 3, 5]
    .map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const razon = (a: string, b: string) =>
  (Math.max(luminancia(a), luminancia(b)) + 0.05) / (Math.min(luminancia(a), luminancia(b)) + 0.05);

const seSolapan = (a: Zona, b: Zona) =>
  a.x < b.x + b.ancho && b.x < a.x + a.ancho && a.y < b.y + b.alto && b.y < a.y + a.alto;

// Los datos de un objeto colocado, sin la función que lo dibuja: sirven para comparar los dos dibujos.
const datos = (c: Colocado) => ({ id: c.id, x: c.x, y: c.y, alto: c.alto, color: c.color });

describe('Diferencias: la lista de escenas', () => {
  it('hay al menos 2 escenas, con identificadores y nombres distintos', () => {
    expect(escenas.length).toBeGreaterThanOrEqual(2);
    expect(new Set(escenas.map((e) => e.id)).size).toBe(escenas.length);
    expect(new Set(escenas.map((e) => e.nombre)).size).toBe(escenas.length);
  });

  it('los textos de la actividad existen', () => {
    expect(textosDiferencias.nombre).toBeTruthy();
    expect(textosDiferencias.descripcion).toBeTruthy();
  });

  it('el dibujo tiene la proporción 3 : 2 del lienzo', () => {
    expect(proporcionDibujo).toBe(1.5);
  });
});

describe.each(todas)('Diferencias: la escena «%s»', (_id, escena) => {
  const tipos = (c: Cambio[]) => c.map((x) => x.tipo).sort();

  it('tiene exactamente 3 cambios, uno de color, uno que falta y uno que sobra', () => {
    expect(escena.cambios).toHaveLength(3);
    expect(new Set(escena.cambios.map((c) => c.id)).size).toBe(3);
    expect(tipos(escena.cambios)).toEqual(['color', 'falta', 'sobra']);
  });

  it('el cambio de color es el mismo objeto en el mismo sitio con dos colores muy distintos', () => {
    const c = escena.cambios.find((x) => x.tipo === 'color') as Cambio;
    expect(c.arriba && c.abajo).toBeTruthy();
    const arriba = c.arriba as Colocado;
    const abajo = c.abajo as Colocado;
    expect(arriba.objeto).toBe(abajo.objeto);
    expect([arriba.x, arriba.y, arriba.alto]).toEqual([abajo.x, abajo.y, abajo.alto]);
    expect(arriba.color).not.toBe(abajo.color);
    expect(razon(arriba.color, abajo.color)).toBeGreaterThanOrEqual(1.5);
  });

  it('lo que falta está solo arriba y lo que sobra, solo abajo', () => {
    const falta = escena.cambios.find((x) => x.tipo === 'falta') as Cambio;
    const sobra = escena.cambios.find((x) => x.tipo === 'sobra') as Cambio;
    expect(falta.arriba).toBeTruthy();
    expect(falta.abajo).toBeUndefined();
    expect(sobra.abajo).toBeTruthy();
    expect(sobra.arriba).toBeUndefined();
  });

  it('las zonas están dentro del dibujo, son grandes y no se solapan', () => {
    const zonas = escena.cambios.map((c) => c.zona);
    zonas.forEach((z) => {
      expect(z.x).toBeGreaterThanOrEqual(0);
      expect(z.y).toBeGreaterThanOrEqual(0);
      expect(z.x + z.ancho).toBeLessThanOrEqual(1.0000001);
      expect(z.y + z.alto).toBeLessThanOrEqual(1.0000001);
      expect(z.ancho).toBeGreaterThanOrEqual(0.2);
      expect(z.alto).toBeGreaterThanOrEqual(0.3);
    });
    for (let i = 0; i < zonas.length; i++) {
      for (let j = i + 1; j < zonas.length; j++) expect(seSolapan(zonas[i], zonas[j])).toBe(false);
    }
  });

  it('los dos dibujos solo se diferencian en los 3 cambios', () => {
    const { arriba, abajo, diferencias } = dibujosDe(escena);
    expect(diferencias.map((d) => d.id).sort()).toEqual(escena.cambios.map((c) => c.id).sort());
    const idsCambio = new Set(escena.cambios.map((c) => c.id));
    const comunesArriba = arriba.filter((e) => !idsCambio.has(e.id)).map(datos);
    const comunesAbajo = abajo.filter((e) => !idsCambio.has(e.id)).map(datos);
    expect(comunesArriba).toEqual(comunesAbajo);
    expect(comunesArriba.length).toBeGreaterThanOrEqual(2);
    // Cada objeto tiene un id distinto dentro de cada dibujo.
    expect(new Set(arriba.map((e) => e.id)).size).toBe(arriba.length);
    expect(new Set(abajo.map((e) => e.id)).size).toBe(abajo.length);
    // Arriba hay 2 de los 3 cambios (color y falta) y abajo otros 2 (color y sobra).
    expect(arriba.length - comunesArriba.length).toBe(2);
    expect(abajo.length - comunesAbajo.length).toBe(2);
  });

  it('tiene fondo, nombre y objetos que se pueden dibujar', () => {
    expect(escena.nombre).toBeTruthy();
    expect(escena.fondo()).toBeTruthy();
    const { arriba, abajo } = dibujosDe(escena);
    [...arriba, ...abajo].forEach((e) => expect(e.objeto(e.color)).toBeTruthy());
  });
});
