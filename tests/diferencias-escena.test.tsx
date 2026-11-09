import { textosDiferencias } from '../src/textos';
import { altoHueco, columnas, componerEscena, filas, parejasDeColor, type Ambiente } from '../src/actividades/diferencias/composicion';
import { dibujosDe, proporcionDibujo, zonaDe, type Cambio, type Colocado, type Zona } from '../src/actividades/diferencias/escena';
import { ambientes } from '../src/actividades/diferencias/escenas';
import { azarFijo } from './ayudas-diferencias';

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

const SEMILLAS = Array.from({ length: 40 }, (_, i) => i + 1);
const porAmbiente = ambientes.map((a) => [a.id, a] as const);

describe('Diferencias: los ambientes', () => {
  it('hay al menos 6 ambientes, con identificadores y nombres distintos', () => {
    expect(ambientes.length).toBeGreaterThanOrEqual(6);
    expect(new Set(ambientes.map((a) => a.id)).size).toBe(ambientes.length);
    expect(new Set(ambientes.map((a) => a.nombre)).size).toBe(ambientes.length);
  });

  it('los textos de la actividad existen', () => {
    expect(textosDiferencias.nombre).toBeTruthy();
    expect(textosDiferencias.descripcion).toBeTruthy();
  });

  it('el dibujo tiene la proporción 3 : 2 del lienzo', () => {
    expect(proporcionDibujo).toBe(1.5);
  });

  it('los 6 huecos son grandes, caben en el dibujo y no se pisan', () => {
    const zonas = (['arriba', 'abajo'] as const).flatMap((fila) => columnas.map((x) => zonaDe(x, filas[fila], altoHueco)));
    expect(zonas).toHaveLength(6);
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

  it('las parejas de colores del cambio de color se distinguen también por claridad', () => {
    expect(parejasDeColor.length).toBeGreaterThanOrEqual(4);
    parejasDeColor.forEach(([a, b]) => {
      expect(a).not.toBe(b);
      expect(razon(a, b)).toBeGreaterThanOrEqual(1.5);
    });
  });
});

describe.each(porAmbiente)('Diferencias: el ambiente «%s»', (_id, ambiente: Ambiente) => {
  it('tiene al menos 2 colores de fondo y al menos 4 objetos en cada fila, sin repetir', () => {
    expect(ambiente.paredes.length).toBeGreaterThanOrEqual(2);
    for (const fila of [ambiente.arriba, ambiente.abajo]) {
      expect(fila.length).toBeGreaterThanOrEqual(4);
      expect(new Set(fila.map((e) => e.id)).size).toBe(fila.length);
      // Al menos hay algún objeto que admite el cambio de color en cada fila.
      expect(fila.some((e) => e.cambiaColor !== false)).toBe(true);
    }
    expect(ambiente.fondo(ambiente.paredes[0])).toBeTruthy();
  });

  it.each(SEMILLAS)('la composición %i cumple todas las reglas', (semilla) => {
    const escena = componerEscena(ambiente, azarFijo(semilla));
    const tipos = (c: Cambio[]) => c.map((x) => x.tipo).sort();

    // Exactamente 3 cambios: uno de color, uno que falta y uno que sobra.
    expect(escena.ambiente).toBe(ambiente.id);
    expect(escena.cambios).toHaveLength(3);
    expect(tipos(escena.cambios)).toEqual(['color', 'falta', 'sobra']);

    // El cambio de color: el mismo objeto en el mismo sitio con dos colores muy distintos.
    const c = escena.cambios.find((x) => x.tipo === 'color') as Cambio;
    const arribaC = c.arriba as Colocado;
    const abajoC = c.abajo as Colocado;
    expect(arribaC.objeto).toBe(abajoC.objeto);
    expect([arribaC.x, arribaC.y, arribaC.alto]).toEqual([abajoC.x, abajoC.y, abajoC.alto]);
    expect(razon(arribaC.color, abajoC.color)).toBeGreaterThanOrEqual(1.5);
    expect(ambiente.arriba.concat(ambiente.abajo).find((e) => e.id === c.id)?.cambiaColor).not.toBe(false);

    // Lo que falta está solo arriba y lo que sobra, solo abajo.
    const falta = escena.cambios.find((x) => x.tipo === 'falta') as Cambio;
    const sobra = escena.cambios.find((x) => x.tipo === 'sobra') as Cambio;
    expect(falta.arriba && !falta.abajo).toBeTruthy();
    expect(sobra.abajo && !sobra.arriba).toBeTruthy();

    // Las zonas están dentro, son grandes y no se solapan.
    const zonas = escena.cambios.map((x) => x.zona);
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

    // Los dos dibujos solo se diferencian en los 3 cambios; los 3 objetos comunes son idénticos.
    const { arriba, abajo, diferencias } = dibujosDe(escena);
    expect(diferencias.map((d) => d.id).sort()).toEqual(escena.cambios.map((x) => x.id).sort());
    const idsCambio = new Set(escena.cambios.map((x) => x.id));
    const comunesArriba = arriba.filter((e) => !idsCambio.has(e.id)).map(datos);
    const comunesAbajo = abajo.filter((e) => !idsCambio.has(e.id)).map(datos);
    expect(comunesArriba).toEqual(comunesAbajo);
    expect(comunesArriba).toHaveLength(3);
    expect(new Set(arriba.map((e) => e.id)).size).toBe(arriba.length);
    expect(arriba).toHaveLength(5); // 3 comunes + color + falta
    expect(abajo).toHaveLength(5); // 3 comunes + color + sobra

    // Todo se puede dibujar.
    expect(escena.fondo()).toBeTruthy();
    [...arriba, ...abajo].forEach((e) => expect(e.objeto(e.color)).toBeTruthy());
  });

  it('con 40 azares distintos salen al menos 30 composiciones distintas', () => {
    const ids = new Set(SEMILLAS.map((s) => componerEscena(ambiente, azarFijo(s)).id));
    expect(ids.size).toBeGreaterThanOrEqual(30);
  });
});

describe('Diferencias: la variedad entre ambientes', () => {
  it('con 6 ambientes y 40 azares cada uno hay más de 200 composiciones distintas', () => {
    const ids = new Set(ambientes.flatMap((a) => SEMILLAS.map((s) => componerEscena(a, azarFijo(s)).id)));
    expect(ids.size).toBeGreaterThan(200);
  });
});
