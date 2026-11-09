import { tema } from '../src/tema';
import { textosDiferencias } from '../src/textos';
import { dibujoAbajo, dibujoArriba, diferencias, type Elemento } from '../src/actividades/diferencias/escena';

// Ids de los elementos que difieren entre los dos dibujos (solo en uno, o con otro icono).
function idsQueDifieren(): string[] {
  const arriba = new Map(dibujoArriba.map((e) => [e.id, e]));
  const abajo = new Map(dibujoAbajo.map((e) => [e.id, e]));
  const todos = new Set([...arriba.keys(), ...abajo.keys()]);
  return [...todos].filter((id) => JSON.stringify(arriba.get(id)) !== JSON.stringify(abajo.get(id)));
}

// El elemento que cambia, tal como se ve en el dibujo donde está (el de abajo si está en los dos).
const elementoDe = (id: string): Elemento =>
  (dibujoAbajo.find((e) => e.id === id) ?? dibujoArriba.find((e) => e.id === id)) as Elemento;

describe('Diferencias: la escena (RF-001, RF-012)', () => {
  it('los id de los elementos no se repiten dentro de cada dibujo', () => {
    expect(new Set(dibujoArriba.map((e) => e.id)).size).toBe(dibujoArriba.length);
    expect(new Set(dibujoAbajo.map((e) => e.id)).size).toBe(dibujoAbajo.length);
  });

  it('los dos dibujos difieren en exactamente 3 elementos: uno falta, uno cambia y uno sobra', () => {
    const ids = idsQueDifieren();
    expect(ids).toHaveLength(3);
    const soloArriba = ids.filter((id) => !dibujoAbajo.some((e) => e.id === id));
    const soloAbajo = ids.filter((id) => !dibujoArriba.some((e) => e.id === id));
    const cambian = ids.filter((id) => !soloArriba.includes(id) && !soloAbajo.includes(id));
    expect(soloArriba).toHaveLength(1);
    expect(soloAbajo).toHaveLength(1);
    expect(cambian).toHaveLength(1);
  });

  it('hay exactamente 3 diferencias, con id distintos, una por cada elemento que difiere', () => {
    expect(diferencias).toHaveLength(3);
    expect(new Set(diferencias.map((d) => d.id)).size).toBe(3);
    expect(diferencias.map((d) => d.id).sort()).toEqual(idsQueDifieren().sort());
  });

  it('cada zona está dentro del dibujo y contiene el centro del elemento que difiere', () => {
    diferencias.forEach(({ id, zona }) => {
      expect(zona.x).toBeGreaterThanOrEqual(0);
      expect(zona.y).toBeGreaterThanOrEqual(0);
      expect(zona.x + zona.ancho).toBeLessThanOrEqual(1);
      expect(zona.y + zona.alto).toBeLessThanOrEqual(1);
      const e = elementoDe(id);
      expect(e.x).toBeGreaterThanOrEqual(zona.x);
      expect(e.x).toBeLessThanOrEqual(zona.x + zona.ancho);
      expect(e.y).toBeGreaterThanOrEqual(zona.y);
      expect(e.y).toBeLessThanOrEqual(zona.y + zona.alto);
    });
  });

  it('las zonas no se solapan entre sí', () => {
    for (let i = 0; i < diferencias.length; i++) {
      for (let j = i + 1; j < diferencias.length; j++) {
        const a = diferencias[i].zona;
        const b = diferencias[j].zona;
        const separadas =
          a.x + a.ancho <= b.x || b.x + b.ancho <= a.x || a.y + a.alto <= b.y || b.y + b.alto <= a.y;
        expect(separadas).toBe(true);
      }
    }
  });

  it('cada zona mide lo bastante para un dedo', () => {
    diferencias.forEach(({ zona }) => {
      expect(zona.ancho).toBeGreaterThanOrEqual(0.18);
      expect(zona.alto).toBeGreaterThanOrEqual(0.27);
    });
  });

  it('los elementos usan iconos con nombre y quedan dentro del dibujo', () => {
    [...dibujoArriba, ...dibujoAbajo].forEach((e) => {
      expect(e.icono.length).toBeGreaterThan(0);
      expect(e.x).toBeGreaterThan(0);
      expect(e.x).toBeLessThan(1);
      expect(e.y).toBeGreaterThan(0);
      expect(e.y).toBeLessThan(1);
    });
  });

  it('los iconos tienen contraste suficiente sobre el fondo de los dibujos', () => {
    const lum = (hex: string) => {
      const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)));
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };
    const contraste = (a: string, b: string) => (Math.max(lum(a), lum(b)) + 0.05) / (Math.min(lum(a), lum(b)) + 0.05);
    [...dibujoArriba, ...dibujoAbajo].forEach((e) => {
      expect(contraste(e.color, tema.colores.tarjeta)).toBeGreaterThanOrEqual(tema.contrasteMinimo);
    });
  });

  it('los textos de la actividad existen', () => {
    expect(textosDiferencias.nombre).toBeTruthy();
    expect(textosDiferencias.descripcion).toBeTruthy();
  });
});
