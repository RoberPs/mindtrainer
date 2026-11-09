import { escenas, type Total } from '../src/actividades/diferencias/escena';
import { crearPartida, faltan, tocar, type Partida } from '../src/actividades/diferencias/juego';
import { centroDe, diferenciasDe, escenaDePrueba, puntoVacio } from './ayudas-diferencias';

// Partida de la escena de prueba con el número de diferencias dado.
const nueva = (total: Total = 3): Partida => ({ ...crearPartida(total, undefined, () => 0), escena: escenaDePrueba });
const ids = diferenciasDe(escenaDePrueba, 7).map((d) => d.id);

// Toca el centro de una diferencia de la escena.
const acertar = (partida: Partida, id: string) => {
  const { x, y } = centroDe(id, partida.escena);
  return tocar(partida, x, y);
};
const fallar = (partida: Partida) => {
  const { x, y } = puntoVacio(partida.escena, partida.total);
  return tocar(partida, x, y);
};

describe('Diferencias: crear la partida', () => {
  it('empieza sin diferencias encontradas, con 0 toques, sin mensaje de fallo y sin terminar', () => {
    const p = crearPartida(5, undefined, () => 0);
    expect(p).toEqual({ escena: escenas[0], total: 5, encontradas: [], toques: 0, fallo: false, terminada: false });
  });

  it('por defecto hay 3 diferencias', () => {
    expect(crearPartida().total).toBe(3);
  });

  it('dos partidas no comparten la lista de encontradas', () => {
    const a = nueva();
    const b = nueva();
    acertar(a, ids[0]);
    expect(a.encontradas).toEqual([]);
    expect(b.encontradas).toEqual([]);
    expect(a.encontradas).not.toBe(b.encontradas);
  });

  it.each([0, 0.3, 0.6, 0.99])('la escena nueva es siempre distinta de la anterior (azar %s)', (valor) => {
    for (const anterior of escenas) {
      expect(crearPartida(3, anterior.id, () => valor).escena.id).not.toBe(anterior.id);
    }
  });

  it('con azares distintos salen escenas distintas', () => {
    const vistas = new Set([0, 0.3, 0.6, 0.99].map((a) => crearPartida(3, undefined, () => a).escena.id));
    expect(vistas.size).toBeGreaterThanOrEqual(3);
  });
});

describe('Diferencias: tocar (RF-003, RF-004, RF-005)', () => {
  it('tocar una diferencia la marca, suma un toque y no pone mensaje de fallo', () => {
    const p = acertar(nueva(), ids[0]);
    expect(p.encontradas).toEqual([ids[0]]);
    expect(p.toques).toBe(1);
    expect(p.fallo).toBe(false);
    expect(p.terminada).toBe(false);
  });

  it('tocar fuera de las zonas suma un toque y pone el mensaje de fallo, sin cambiar nada más', () => {
    const p = fallar(nueva());
    expect(p.encontradas).toEqual([]);
    expect(p.toques).toBe(1);
    expect(p.fallo).toBe(true);
    expect(p.terminada).toBe(false);
  });

  it('la zona de un cambio que no está activo cuenta como fallo y no marca nada', () => {
    const p = acertar(nueva(3), ids[3]);
    expect(p.encontradas).toEqual([]);
    expect(p.fallo).toBe(true);
    expect(p.toques).toBe(1);
  });

  it('un fallo no penaliza: después se puede acertar con normalidad y se quita el mensaje', () => {
    const p = acertar(fallar(nueva()), ids[1]);
    expect(p.encontradas).toEqual([ids[1]]);
    expect(p.toques).toBe(2);
    expect(p.fallo).toBe(false);
  });

  it('tocar una diferencia ya encontrada no hace nada (misma partida, sin toque ni mensaje)', () => {
    const marcada = acertar(nueva(), ids[0]);
    expect(acertar(marcada, ids[0])).toBe(marcada);
    const conFallo = fallar(marcada);
    expect(acertar(conFallo, ids[0])).toBe(conFallo);
  });

  it('los cuatro bordes de una zona cuentan como acierto', () => {
    diferenciasDe(escenaDePrueba, 7).forEach(({ id, zona }) => {
      const { x, y, ancho, alto } = zona;
      [
        [x, y],
        [x + ancho, y],
        [x, y + alto],
        [x + ancho, y + alto],
      ].forEach(([px, py]) => {
        expect(tocar(nueva(7), px, py).encontradas).toEqual([id]);
      });
    });
  });

  it('un punto justo fuera de la zona es un fallo', () => {
    const { x, y } = diferenciasDe()[0].zona;
    expect(tocar(nueva(), x - 0.001, y).fallo).toBe(true);
  });

  it('no modifica la partida que recibe', () => {
    const p = nueva();
    const copia = JSON.parse(JSON.stringify(p));
    acertar(p, ids[0]);
    fallar(p);
    expect(p).toEqual(copia);
  });
});

describe.each([3, 5, 7] as Total[])('Diferencias: final de partida con %i diferencias (RF-007, RF-008)', (total) => {
  const activas = ids.slice(0, total);

  it('al encontrar todas la partida termina, y no antes', () => {
    const casiTodas = activas.slice(0, -1).reduce(acertar, nueva(total));
    expect(casiTodas.terminada).toBe(false);
    const p = acertar(casiTodas, activas[total - 1]);
    expect(p.encontradas).toHaveLength(total);
    expect(p.terminada).toBe(true);
  });

  it('con todos los aciertos seguidos los toques son los mismos que diferencias', () => {
    expect(activas.reduce(acertar, nueva(total)).toques).toBe(total);
  });

  it('con 2 fallos y todos los aciertos los toques suman 2 más', () => {
    const p = activas.reduce(acertar, fallar(fallar(nueva(total))));
    expect(p.toques).toBe(total + 2);
  });

  it('con la partida terminada ningún toque más cambia nada', () => {
    const terminada = activas.reduce(acertar, nueva(total));
    expect(fallar(terminada)).toBe(terminada);
    expect(acertar(terminada, ids[0])).toBe(terminada);
  });

  it('las que faltan bajan hasta 0 al encontrar las diferencias', () => {
    let p = nueva(total);
    expect(faltan(p)).toBe(total);
    activas.forEach((id, i) => {
      p = acertar(p, id);
      expect(faltan(p)).toBe(total - i - 1);
    });
  });
});

describe('Diferencias: toques repetidos y cuántas faltan (RF-010)', () => {
  it('los toques repetidos sobre diferencias encontradas no suman', () => {
    let p = acertar(nueva(), ids[0]);
    p = acertar(acertar(acertar(p, ids[0]), ids[0]), ids[0]);
    expect(p.toques).toBe(1);
  });

  it('un fallo y un toque repetido no cambian las que faltan', () => {
    const p = acertar(nueva(), ids[0]);
    expect(faltan(fallar(p))).toBe(2);
    expect(faltan(acertar(p, ids[0]))).toBe(2);
  });
});
