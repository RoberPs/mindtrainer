import { dibujos } from '../src/actividades/parejas/dibujos';
import { crearPartida, seguir, tocarCarta, type Partida, type Tamano } from '../src/actividades/parejas/juego';
import { textosParejas } from '../src/textos';
import { tema } from '../src/tema';

describe('Parejas: dibujos', () => {
  it('hay 12 dibujos, sin repetir, cada uno con su nombre y su color', () => {
    expect(dibujos).toHaveLength(12);
    expect(new Set(dibujos.map((d) => d.id)).size).toBe(12);
    expect(new Set(dibujos.map((d) => d.icono)).size).toBe(12);
    const nombres = textosParejas.dibujos as Record<string, string>;
    for (const d of dibujos) {
      expect(nombres[d.id]).toBe(d.nombre);
      expect(tema.colores.dibujos[d.id]).toBeTruthy();
    }
  });
});

// Mazo conocido de 6 cartas: posiciones 0 y 1 son pareja (llave), 2 y 3 (taza), 4 y 5 (reloj).
function mazoConocido(): Partida {
  const ids = ['llave', 'llave', 'taza', 'taza', 'reloj', 'reloj'];
  return {
    tamano: 'pequena',
    cartas: ids.map((dibujo) => ({ dibujo, estado: 'tapada' as const })),
    intentos: 0,
    terminada: false,
  };
}
const estados = (p: Partida) => p.cartas.map((c) => c.estado);

describe('Parejas: reglas', () => {
  it('dos cartas iguales quedan descubiertas', () => {
    const p = tocarCarta(tocarCarta(mazoConocido(), 0), 1);
    expect(estados(p).slice(0, 2)).toEqual(['descubierta', 'descubierta']);
  });

  it('dos cartas distintas quedan giradas y "seguir" las tapa', () => {
    let p = tocarCarta(tocarCarta(mazoConocido(), 0), 2);
    expect(estados(p).slice(0, 3)).toEqual(['girada', 'tapada', 'girada']);
    p = seguir(p);
    expect(estados(p).every((e) => e === 'tapada')).toBe(true);
  });

  it('tocar una carta descubierta o ya girada no cambia nada', () => {
    const girada = tocarCarta(mazoConocido(), 0);
    expect(tocarCarta(girada, 0)).toBe(girada);
    const descubierta = tocarCarta(girada, 1);
    expect(tocarCarta(descubierta, 0)).toBe(descubierta);
  });

  it('con dos distintas a la vista, tocar otra carta no cambia nada', () => {
    const p = tocarCarta(tocarCarta(mazoConocido(), 0), 2);
    expect(tocarCarta(p, 4)).toBe(p);
  });

  it('"seguir" sin dos distintas a la vista no cambia nada', () => {
    const p = tocarCarta(mazoConocido(), 0);
    expect(seguir(p)).toBe(p);
  });

  it('el intento sube al girar la segunda carta, acierte o falle, y no al girar la primera', () => {
    const una = tocarCarta(mazoConocido(), 0);
    expect(una.intentos).toBe(0);
    const fallo = tocarCarta(una, 2);
    expect(fallo.intentos).toBe(1);
    const acierto = tocarCarta(tocarCarta(seguir(fallo), 0), 1);
    expect(acierto.intentos).toBe(2);
  });

  it('no modifica la partida recibida', () => {
    const original = mazoConocido();
    tocarCarta(original, 0);
    expect(estados(original).every((e) => e === 'tapada')).toBe(true);
    expect(original.intentos).toBe(0);
  });

  it('la partida termina al descubrir la última pareja y no antes', () => {
    let p = mazoConocido();
    for (const [a, b] of [[0, 1], [2, 3]]) {
      p = tocarCarta(tocarCarta(p, a), b);
      expect(p.terminada).toBe(false);
    }
    p = tocarCarta(tocarCarta(p, 4), 5);
    expect(p.terminada).toBe(true);
    expect(p.intentos).toBe(3);
  });
});

describe('Parejas: crear partida', () => {
  const casos: [Tamano, number][] = [['pequena', 6], ['mediana', 8], ['grande', 12]];

  it.each(casos)('tamaño %s: %i cartas tapadas y cada dibujo exactamente 2 veces', (tamano, n) => {
    const p = crearPartida(tamano);
    expect(p.cartas).toHaveLength(n);
    expect(p.intentos).toBe(0);
    expect(p.terminada).toBe(false);
    expect(p.cartas.every((c) => c.estado === 'tapada')).toBe(true);
    const veces: Record<string, number> = {};
    p.cartas.forEach((c) => (veces[c.dibujo] = (veces[c.dibujo] ?? 0) + 1));
    expect(Object.keys(veces)).toHaveLength(n / 2);
    expect(Object.values(veces).every((v) => v === 2)).toBe(true);
  });

  it('con dos azares distintos el orden de las cartas cambia', () => {
    const a = crearPartida('grande', () => 0);
    const b = crearPartida('grande', () => 0.99);
    expect(a.cartas.map((c) => c.dibujo)).not.toEqual(b.cartas.map((c) => c.dibujo));
  });

  it('tres partidas del mismo tamaño con azares distintos no usan siempre los mismos dibujos', () => {
    for (const [tamano] of casos) {
      const conjuntos = [0, 0.5, 0.99].map((azar) =>
        [...new Set(crearPartida(tamano, () => azar).cartas.map((c) => c.dibujo))].sort().join(','),
      );
      expect(new Set(conjuntos).size).toBeGreaterThan(1);
    }
  });

  it('se puede jugar y terminar una partida de cada tamaño', () => {
    for (const [tamano, n] of casos) {
      let p = crearPartida(tamano);
      for (let i = 0; i < n; i++) {
        if (p.cartas[i].estado !== 'tapada') continue;
        const otra = p.cartas.findIndex((c, j) => j !== i && c.dibujo === p.cartas[i].dibujo);
        p = tocarCarta(tocarCarta(p, i), otra);
      }
      expect(p.terminada).toBe(true);
      expect(p.intentos).toBe(n / 2);
    }
  });
});
