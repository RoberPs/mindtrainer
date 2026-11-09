import { crearPartida, faltan, haTerminado, tocarCasilla, type Casilla, type Partida } from '../src/actividades/sopa-de-letras/juego';
import { sopas } from '../src/actividades/sopa-de-letras/sopas';
import { casillasDe, partidaDePrueba, sopaDePrueba } from './ayudas-sopa';

// Toca varias casillas seguidas.
const tocar = (partida: Partida, ...casillas: Casilla[]) => casillas.reduce((p, c) => tocarCasilla(p, c), partida);
// Marca una palabra de la sopa de prueba de la primera a la última letra.
const marcar = (partida: Partida, palabra: string) => {
  const { inicio, fin } = casillasDe(sopaDePrueba, palabra);
  return tocar(partida, inicio, fin);
};

const pequenas = sopas.filter((s) => s.tamano === 'pequena');
const medianas = sopas.filter((s) => s.tamano === 'mediana');

describe('Sopa de letras: crearPartida', () => {
  it('usa una sopa de la lista y empieza sin nada encontrado', () => {
    const partida = crearPartida();
    expect(sopas.some((s) => s.id === partida.sopa.id)).toBe(true);
    expect(partida.encontradas).toEqual([]);
    expect(partida.marca).toBeNull();
    expect(partida.intentos).toBe(0);
    expect(partida.aviso).toBe('ninguno');
  });

  it('sin sopa anterior sirve cualquiera de las del tamaño elegido', () => {
    expect(crearPartida('pequena', undefined, () => 0).sopa.id).toBe(pequenas[0].id);
    expect(crearPartida('pequena', undefined, () => 0.999).sopa.id).toBe(pequenas[pequenas.length - 1].id);
    expect(crearPartida('mediana', undefined, () => 0).sopa.id).toBe(medianas[0].id);
    expect(crearPartida('mediana', undefined, () => 0.999).sopa.id).toBe(medianas[medianas.length - 1].id);
  });

  it('por defecto la sopa es pequeña', () => {
    expect(crearPartida().sopa.tamano).toBe('pequena');
  });

  it.each(['pequena', 'mediana'] as const)('la sopa %s tiene 3 o 5 palabras y la partida termina al encontrarlas todas', (tamano) => {
    const partida = crearPartida(tamano, undefined, () => 0);
    const cuantas = tamano === 'pequena' ? 3 : 5;
    expect(partida.sopa.tamano).toBe(tamano);
    expect(partida.sopa.palabras).toHaveLength(cuantas);
    expect(faltan(partida)).toBe(cuantas);
    let p = partida;
    partida.sopa.palabras.forEach((palabra, i) => {
      expect(haTerminado(p)).toBe(false);
      const { inicio, fin } = casillasDe(partida.sopa, palabra);
      p = tocar(p, inicio, fin);
      expect(faltan(p)).toBe(cuantas - i - 1);
    });
    expect(haTerminado(p)).toBe(true);
    expect(p.intentos).toBe(cuantas);
  });

  it('nunca devuelve la sopa anterior, sea cual sea el azar', () => {
    const azares = [() => 0, () => 0.25, () => 0.5, () => 0.75, () => 0.999];
    for (const anterior of sopas) {
      for (const azar of azares) {
        const nueva = crearPartida(anterior.tamano, anterior.id, azar).sopa;
        expect(nueva.id).not.toBe(anterior.id);
        expect(nueva.tamano).toBe(anterior.tamano);
      }
    }
  });

  it('con azares distintos puede salir otra sopa', () => {
    const a = crearPartida('pequena', undefined, () => 0).sopa.id;
    const b = crearPartida('pequena', undefined, () => 0.999).sopa.id;
    expect(a).not.toBe(b);
  });
});

describe('Sopa de letras: marcar palabras', () => {
  it('la primera casilla tocada queda como marca', () => {
    const p = tocar(partidaDePrueba(), { fila: 2, columna: 3 });
    expect(p.marca).toEqual({ fila: 2, columna: 3 });
    expect(p.intentos).toBe(0);
  });

  it('tocar la misma casilla otra vez quita la marca, sin aviso y sin intento', () => {
    const casilla = { fila: 2, columna: 3 };
    const p = tocar(partidaDePrueba(), casilla, casilla);
    expect(p.marca).toBeNull();
    expect(p.aviso).toBe('ninguno');
    expect(p.intentos).toBe(0);
  });

  it('dos casillas que no están en línea recta dan aviso, quitan la marca y no suman intento', () => {
    const p = tocar(partidaDePrueba(), { fila: 0, columna: 0 }, { fila: 1, columna: 1 });
    expect(p.aviso).toBe('norecta');
    expect(p.marca).toBeNull();
    expect(p.intentos).toBe(0);
    expect(p.encontradas).toEqual([]);
  });

  it('una palabra en horizontal marcada de la primera a la última letra se encuentra', () => {
    const p = marcar(partidaDePrueba(), 'LLUVIA');
    expect(p.encontradas).toHaveLength(1);
    expect(p.encontradas[0].palabra).toBe('LLUVIA');
    expect(p.encontradas[0].casillas).toHaveLength(6);
    expect(p.encontradas[0].casillas[0]).toEqual({ fila: 0, columna: 0 });
    expect(p.encontradas[0].casillas[5]).toEqual({ fila: 0, columna: 5 });
    expect(p.aviso).toBe('encontrada');
    expect(p.marca).toBeNull();
    expect(p.intentos).toBe(1);
  });

  it('una palabra en vertical marcada de arriba abajo se encuentra', () => {
    const p = marcar(partidaDePrueba(), 'ARENA');
    expect(p.encontradas.map((e) => e.palabra)).toEqual(['ARENA']);
    expect(p.encontradas[0].casillas[4]).toEqual({ fila: 4, columna: 5 });
    expect(p.aviso).toBe('encontrada');
    expect(p.intentos).toBe(1);
  });

  it('dos casillas en línea recta que no forman palabra buscada son un fallo con intento', () => {
    const p = tocar(partidaDePrueba(), { fila: 1, columna: 0 }, { fila: 1, columna: 3 });
    expect(p.aviso).toBe('incorrecta');
    expect(p.marca).toBeNull();
    expect(p.intentos).toBe(1);
    expect(p.encontradas).toEqual([]);
  });

  it('marcar solo una parte de la palabra es un fallo', () => {
    const p = tocar(partidaDePrueba(), { fila: 0, columna: 0 }, { fila: 0, columna: 4 });
    expect(p.aviso).toBe('incorrecta');
    expect(p.encontradas).toEqual([]);
  });

  it('una palabra marcada al revés cuenta como fallo normal', () => {
    const p = tocar(partidaDePrueba(), { fila: 0, columna: 5 }, { fila: 0, columna: 0 });
    expect(p.aviso).toBe('incorrecta');
    expect(p.encontradas).toEqual([]);
    expect(p.intentos).toBe(1);
    const q = tocar(partidaDePrueba(), { fila: 4, columna: 5 }, { fila: 0, columna: 5 });
    expect(q.aviso).toBe('incorrecta');
    expect(q.intentos).toBe(1);
  });

  it('marcar de nuevo una palabra ya encontrada no cambia nada', () => {
    const antes = marcar(partidaDePrueba(), 'OLAS');
    const despues = marcar(antes, 'OLAS');
    expect(despues.encontradas).toEqual(antes.encontradas);
    expect(despues.intentos).toBe(antes.intentos);
    expect(despues.aviso).toBe('ninguno');
    expect(despues.marca).toBeNull();
  });

  it('se pueden encontrar las 3 palabras en cualquier orden', () => {
    const p = marcar(marcar(marcar(partidaDePrueba(), 'OLAS'), 'ARENA'), 'LLUVIA');
    expect(p.encontradas.map((e) => e.palabra)).toEqual(['OLAS', 'ARENA', 'LLUVIA']);
    expect(p.intentos).toBe(3);
  });

  it('la casilla compartida 0,5 se puede marcar en cualquiera de las dos palabras', () => {
    const lluviaPrimero = marcar(marcar(partidaDePrueba(), 'LLUVIA'), 'ARENA');
    expect(lluviaPrimero.encontradas.map((e) => e.palabra)).toEqual(['LLUVIA', 'ARENA']);
    const arenaPrimero = marcar(marcar(partidaDePrueba(), 'ARENA'), 'LLUVIA');
    expect(arenaPrimero.encontradas.map((e) => e.palabra)).toEqual(['ARENA', 'LLUVIA']);
    for (const p of [lluviaPrimero, arenaPrimero]) {
      for (const e of p.encontradas) expect(e.casillas).toContainEqual({ fila: 0, columna: 5 });
    }
  });

  it('no modifica la partida recibida', () => {
    const original = partidaDePrueba();
    const antes = JSON.stringify(original);
    tocar(original, { fila: 0, columna: 0 }, { fila: 0, columna: 5 });
    expect(JSON.stringify(original)).toBe(antes);
  });
});

describe('Sopa de letras: final de la partida e intentos', () => {
  it('haTerminado es falso con 0, 1 y 2 palabras y verdadero con las 3', () => {
    let p = partidaDePrueba();
    expect(haTerminado(p)).toBe(false);
    p = marcar(p, 'OLAS');
    expect(haTerminado(p)).toBe(false);
    p = marcar(p, 'ARENA');
    expect(haTerminado(p)).toBe(false);
    p = marcar(p, 'LLUVIA');
    expect(haTerminado(p)).toBe(true);
  });

  it('con la partida terminada tocar una casilla no cambia nada', () => {
    const terminada = marcar(marcar(marcar(partidaDePrueba(), 'OLAS'), 'ARENA'), 'LLUVIA');
    const despues = tocar(terminada, { fila: 1, columna: 1 }, { fila: 1, columna: 3 });
    expect(despues).toEqual(terminada);
  });

  it('sin ningún fallo los intentos son 3', () => {
    const p = marcar(marcar(marcar(partidaDePrueba(), 'OLAS'), 'ARENA'), 'LLUVIA');
    expect(p.intentos).toBe(3);
  });

  it('con dos fallos los intentos son 5', () => {
    let p = partidaDePrueba();
    p = tocar(p, { fila: 1, columna: 0 }, { fila: 1, columna: 3 });
    p = marcar(p, 'OLAS');
    p = tocar(p, { fila: 2, columna: 0 }, { fila: 4, columna: 0 });
    p = marcar(marcar(p, 'ARENA'), 'LLUVIA');
    expect(p.intentos).toBe(5);
  });

  it('los toques ignorados no suman intento', () => {
    let p = marcar(partidaDePrueba(), 'OLAS');
    p = tocar(p, { fila: 0, columna: 0 }, { fila: 1, columna: 1 }); // línea no recta
    p = tocar(p, { fila: 2, columna: 2 }, { fila: 2, columna: 2 }); // quitar la marca
    p = marcar(p, 'OLAS'); // palabra ya encontrada
    expect(p.intentos).toBe(1);
  });
});

describe('Sopa de letras: palabras que faltan', () => {
  it('faltan da 3, 2, 1 y 0 según las palabras encontradas', () => {
    let p = partidaDePrueba();
    expect(faltan(p)).toBe(3);
    p = marcar(p, 'OLAS');
    expect(faltan(p)).toBe(2);
    p = marcar(p, 'ARENA');
    expect(faltan(p)).toBe(1);
    p = marcar(p, 'LLUVIA');
    expect(faltan(p)).toBe(0);
  });

  it('un fallo o un toque ignorado no cambian cuántas faltan', () => {
    let p = tocar(partidaDePrueba(), { fila: 1, columna: 0 }, { fila: 1, columna: 3 });
    p = tocar(p, { fila: 0, columna: 0 }, { fila: 1, columna: 1 });
    expect(faltan(p)).toBe(3);
  });
});
