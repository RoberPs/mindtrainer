import { diferencias } from '../src/actividades/diferencias/escena';
import { crearPartida, faltan, tocar, type Partida } from '../src/actividades/diferencias/juego';
import { centroDe, puntoVacio } from './ayudas-diferencias';

const ids = diferencias.map((d) => d.id);

// Toca el centro de una diferencia de la escena.
const acertar = (partida: Partida, id: string) => {
  const { x, y } = centroDe(id);
  return tocar(partida, x, y);
};
const fallar = (partida: Partida) => {
  const { x, y } = puntoVacio();
  return tocar(partida, x, y);
};

describe('Diferencias: crear la partida', () => {
  it('empieza sin diferencias encontradas, con 0 toques, sin mensaje de fallo y sin terminar', () => {
    expect(crearPartida()).toEqual({ encontradas: [], toques: 0, fallo: false, terminada: false });
  });

  it('dos partidas no comparten la lista de encontradas', () => {
    const a = crearPartida();
    const b = crearPartida();
    acertar(a, ids[0]);
    expect(a.encontradas).toEqual([]);
    expect(b.encontradas).toEqual([]);
    expect(a.encontradas).not.toBe(b.encontradas);
  });
});

describe('Diferencias: tocar (RF-003, RF-004, RF-005)', () => {
  it('tocar una diferencia la marca, suma un toque y no pone mensaje de fallo', () => {
    const p = acertar(crearPartida(), ids[0]);
    expect(p.encontradas).toEqual([ids[0]]);
    expect(p.toques).toBe(1);
    expect(p.fallo).toBe(false);
    expect(p.terminada).toBe(false);
  });

  it('tocar fuera de las zonas suma un toque y pone el mensaje de fallo, sin cambiar nada más', () => {
    const p = fallar(crearPartida());
    expect(p.encontradas).toEqual([]);
    expect(p.toques).toBe(1);
    expect(p.fallo).toBe(true);
    expect(p.terminada).toBe(false);
  });

  it('un fallo no penaliza: después se puede acertar con normalidad y se quita el mensaje', () => {
    const p = acertar(fallar(crearPartida()), ids[1]);
    expect(p.encontradas).toEqual([ids[1]]);
    expect(p.toques).toBe(2);
    expect(p.fallo).toBe(false);
  });

  it('tocar una diferencia ya encontrada no hace nada (misma partida, sin toque ni mensaje)', () => {
    const marcada = acertar(crearPartida(), ids[0]);
    expect(acertar(marcada, ids[0])).toBe(marcada);
    const conFallo = fallar(marcada);
    expect(acertar(conFallo, ids[0])).toBe(conFallo);
  });

  it('los cuatro bordes de una zona cuentan como acierto', () => {
    diferencias.forEach(({ id, zona }) => {
      const { x, y, ancho, alto } = zona;
      [
        [x, y],
        [x + ancho, y],
        [x, y + alto],
        [x + ancho, y + alto],
      ].forEach(([px, py]) => {
        expect(tocar(crearPartida(), px, py).encontradas).toEqual([id]);
      });
    });
  });

  it('un punto justo fuera de la zona es un fallo', () => {
    const { x, y } = diferencias[0].zona;
    expect(tocar(crearPartida(), x - 0.001, y).fallo).toBe(true);
  });

  it('no modifica la partida que recibe', () => {
    const p = crearPartida();
    const copia = JSON.parse(JSON.stringify(p));
    acertar(p, ids[0]);
    fallar(p);
    expect(p).toEqual(copia);
  });
});

describe('Diferencias: final de partida y toques (RF-007, RF-008)', () => {
  it('al encontrar las 3 la partida termina', () => {
    const p = ids.reduce(acertar, crearPartida());
    expect(p.encontradas).toHaveLength(3);
    expect(p.terminada).toBe(true);
  });

  it('con 3 aciertos seguidos los toques son 3', () => {
    expect(ids.reduce(acertar, crearPartida()).toques).toBe(3);
  });

  it('con 2 fallos y 3 aciertos los toques son 5', () => {
    const p = ids.reduce(acertar, fallar(fallar(crearPartida())));
    expect(p.toques).toBe(5);
  });

  it('los toques repetidos sobre diferencias encontradas no suman', () => {
    let p = acertar(crearPartida(), ids[0]);
    p = acertar(acertar(acertar(p, ids[0]), ids[0]), ids[0]);
    expect(p.toques).toBe(1);
  });

  it('con la partida terminada ningún toque más cambia nada', () => {
    const terminada = ids.reduce(acertar, crearPartida());
    expect(fallar(terminada)).toBe(terminada);
    expect(acertar(terminada, ids[0])).toBe(terminada);
  });
});

describe('Diferencias: cuántas faltan (RF-010)', () => {
  it('baja de 3 a 0 al encontrar las diferencias', () => {
    let p = crearPartida();
    expect(faltan(p)).toBe(3);
    p = acertar(p, ids[0]);
    expect(faltan(p)).toBe(2);
    p = acertar(p, ids[1]);
    expect(faltan(p)).toBe(1);
    p = acertar(p, ids[2]);
    expect(faltan(p)).toBe(0);
  });

  it('un fallo y un toque repetido no cambian las que faltan', () => {
    const p = acertar(crearPartida(), ids[0]);
    expect(faltan(fallar(p))).toBe(2);
    expect(faltan(acertar(p, ids[0]))).toBe(2);
  });
});
