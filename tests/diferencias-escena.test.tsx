import { MaterialCommunityIcons } from '@expo/vector-icons';
import { tema } from '../src/tema';
import { textosDiferencias } from '../src/textos';
import { dibujosDe, escenas, proporcionDibujo, type Elemento, type Escena } from '../src/actividades/diferencias/escena';

const todas = escenas.map((e) => [e.id, e] as const);
const elementosDe = (e: Escena): Elemento[] => [...e.comunes, ...e.cambios.flatMap((c) => [c.arriba, c.abajo].filter((x): x is Elemento => !!x))];

// Ids de los elementos que difieren entre los dos dibujos (solo en uno, o con otro icono).
function idsQueDifieren(dibujos: { arriba: Elemento[]; abajo: Elemento[] }): string[] {
  const arriba = new Map(dibujos.arriba.map((e) => [e.id, e]));
  const abajo = new Map(dibujos.abajo.map((e) => [e.id, e]));
  const todos = new Set([...arriba.keys(), ...abajo.keys()]);
  return [...todos].filter((id) => JSON.stringify(arriba.get(id)) !== JSON.stringify(abajo.get(id)));
}

const luminancia = (hex: string) => {
  const [r, g, b] = [1, 3, 5]
    .map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const contraste = (a: string, b: string) =>
  (Math.max(luminancia(a), luminancia(b)) + 0.05) / (Math.min(luminancia(a), luminancia(b)) + 0.05);

describe('Diferencias: la lista de escenas (RF-012, RF-013)', () => {
  it('hay 4 escenas o más, con identificadores distintos', () => {
    expect(escenas.length).toBeGreaterThanOrEqual(4);
    expect(new Set(escenas.map((e) => e.id)).size).toBe(escenas.length);
  });

  it('los iconos de todas las escenas son unos 50 y no se repiten entre escenas', () => {
    const porEscena = escenas.map((e) => new Set(elementosDe(e).map((x) => x.icono)));
    const total = porEscena.reduce((suma, iconos) => suma + iconos.size, 0);
    expect(new Set(porEscena.flatMap((iconos) => [...iconos])).size).toBe(total);
    expect(total).toBeGreaterThanOrEqual(45);
    expect(total).toBeLessThanOrEqual(60);
  });

  it('las escenas tienen distinta cantidad de iconos', () => {
    const cantidades = escenas.map((e) => dibujosDe(e, 7).arriba.length);
    expect(new Set(cantidades).size).toBeGreaterThanOrEqual(3);
  });

  it('los textos de la actividad existen', () => {
    expect(textosDiferencias.nombre).toBeTruthy();
    expect(textosDiferencias.descripcion).toBeTruthy();
  });
});

describe.each(todas)('Diferencias: la escena «%s» (RF-012 a RF-015)', (_id, escena) => {
  it('tiene 7 cambios con id distintos y entre 2 y 5 iconos comunes', () => {
    expect(escena.cambios).toHaveLength(7);
    expect(new Set(escena.cambios.map((c) => c.id)).size).toBe(7);
    expect(escena.comunes.length).toBeGreaterThanOrEqual(2);
    expect(escena.comunes.length).toBeLessThanOrEqual(5);
  });

  it('cada cambio falta, sobra o cambia de icono, con el mismo id en sus elementos', () => {
    escena.cambios.forEach((c) => {
      expect(c.arriba || c.abajo).toBeTruthy();
      if (c.arriba) expect(c.arriba.id).toBe(c.id);
      if (c.abajo) expect(c.abajo.id).toBe(c.id);
      if (c.arriba && c.abajo) expect(c.arriba.icono).not.toBe(c.abajo.icono);
    });
    // Los tres primeros mezclan los tres tipos (cambia, falta y sobra).
    const tipos = escena.cambios.slice(0, 3).map((c) => (c.arriba && c.abajo ? 'cambia' : c.arriba ? 'falta' : 'sobra'));
    expect(new Set(tipos).size).toBe(3);
  });

  it('los id de los elementos no se repiten dentro de cada dibujo', () => {
    const { arriba, abajo } = dibujosDe(escena, 7);
    expect(new Set(arriba.map((e) => e.id)).size).toBe(arriba.length);
    expect(new Set(abajo.map((e) => e.id)).size).toBe(abajo.length);
  });

  it('cada zona está dentro del dibujo y contiene el centro del elemento que cambia', () => {
    escena.cambios.forEach(({ id, arriba, abajo, zona }) => {
      expect(zona.x).toBeGreaterThanOrEqual(0);
      expect(zona.y).toBeGreaterThanOrEqual(0);
      expect(zona.x + zona.ancho).toBeLessThanOrEqual(1);
      expect(zona.y + zona.alto).toBeLessThanOrEqual(1);
      const e = (abajo ?? arriba) as Elemento;
      expect(e.id).toBe(id);
      expect(e.x).toBeGreaterThanOrEqual(zona.x);
      expect(e.x).toBeLessThanOrEqual(zona.x + zona.ancho);
      expect(e.y).toBeGreaterThanOrEqual(zona.y);
      expect(e.y).toBeLessThanOrEqual(zona.y + zona.alto);
    });
  });

  it('las zonas no se solapan entre sí', () => {
    const zonas = escena.cambios.map((c) => c.zona);
    for (let i = 0; i < zonas.length; i++) {
      for (let j = i + 1; j < zonas.length; j++) {
        const a = zonas[i];
        const b = zonas[j];
        const separadas = a.x + a.ancho <= b.x || b.x + b.ancho <= a.x || a.y + a.alto <= b.y || b.y + b.alto <= a.y;
        expect(separadas).toBe(true);
      }
    }
  });

  it('cada zona mide lo bastante para un dedo, incluso con el dibujo más pequeño (44 puntos)', () => {
    const anchoMinimo = 240; // el mismo que usa la pantalla
    const altoMinimo = anchoMinimo / proporcionDibujo;
    escena.cambios.forEach(({ zona }) => {
      expect(zona.ancho).toBeGreaterThanOrEqual(0.2);
      expect(zona.alto).toBeGreaterThanOrEqual(0.3);
      expect(zona.ancho * anchoMinimo).toBeGreaterThanOrEqual(44);
      expect(zona.alto * altoMinimo).toBeGreaterThanOrEqual(44);
    });
  });

  it('ningún icono se solapa con otro y todos quedan dentro del dibujo', () => {
    const elementos = dibujosDe(escena, 7).arriba;
    elementos.forEach((e) => {
      expect(e.icono.length).toBeGreaterThan(0);
      expect(e.x).toBeGreaterThan(0);
      expect(e.x).toBeLessThan(1);
      expect(e.y).toBeGreaterThan(0);
      expect(e.y).toBeLessThan(1);
    });
    for (let i = 0; i < elementos.length; i++) {
      for (let j = i + 1; j < elementos.length; j++) {
        const dx = (elementos[i].x - elementos[j].x) * proporcionDibujo; // en unidades de alto
        const dy = elementos[i].y - elementos[j].y;
        expect(Math.hypot(dx, dy)).toBeGreaterThan(Math.max(elementos[i].tamano, elementos[j].tamano));
      }
    }
  });

  it('todos los iconos existen en la librería de iconos', () => {
    elementosDe(escena).forEach((e) => {
      expect(Object.keys(MaterialCommunityIcons.glyphMap)).toContain(e.icono);
    });
  });

  it('los iconos tienen contraste suficiente sobre el fondo de los dibujos', () => {
    elementosDe(escena).forEach((e) => {
      expect(contraste(e.color, tema.colores.tarjeta)).toBeGreaterThanOrEqual(tema.contrasteMinimo);
    });
  });

  it.each([3, 5, 7])('con %i diferencias los dos dibujos difieren exactamente en esos %i elementos', (n) => {
    const dibujos = dibujosDe(escena, n);
    expect(dibujos.diferencias).toHaveLength(n);
    expect(new Set(dibujos.diferencias.map((d) => d.id)).size).toBe(n);
    expect(dibujos.diferencias.map((d) => d.id)).toEqual(escena.cambios.slice(0, n).map((c) => c.id));
    expect(idsQueDifieren(dibujos).sort()).toEqual(dibujos.diferencias.map((d) => d.id).sort());
  });
});
