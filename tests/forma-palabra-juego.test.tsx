import {
  borrarUltima,
  colocarLetra,
  comprobar,
  crearPartida,
  empezarDeNuevo,
  siguiente,
  verRespuesta,
  type Partida,
} from '../src/actividades/forma-palabra/juego';
import { palabras } from '../src/actividades/forma-palabra/palabras';

// Partida de palabras conocidas, con las letras en un orden fijo.
function partidaDe(lista: string[], indice = 0): Partida {
  const base = crearPartida(() => 0);
  const letras = [...lista[indice]].map((letra, id) => ({ id, letra })).reverse();
  return { ...base, palabras: lista, indice, disponibles: letras, colocadas: [] };
}
const lista = ['casa', 'perro', 'mesa', 'libro', 'tren'];

// Coloca las letras en el orden de la palabra dada, tocando siempre la primera disponible que sirva.
function formar(partida: Partida, texto: string): Partida {
  let p = partida;
  for (const letra of texto) {
    const l = p.disponibles.find((d) => d.letra === letra)!;
    p = colocarLetra(p, l.id);
  }
  return p;
}
const ordenadas = (p: Partida) => [...p.disponibles.map((l) => l.letra)].sort().join('');

describe('Forma la palabra: crearPartida', () => {
  it('da 5 palabras distintas de la lista', () => {
    const p = crearPartida();
    expect(p.palabras).toHaveLength(5);
    expect(new Set(p.palabras).size).toBe(5);
    for (const w of p.palabras) expect(palabras).toContain(w);
  });

  it('con azares distintos las palabras cambian', () => {
    const a = crearPartida(() => 0);
    const b = crearPartida(() => 0.99);
    expect(a.palabras).not.toEqual(b.palabras);
  });

  it('las letras nunca salen en orden correcto y son exactamente las de la palabra', () => {
    for (const azar of [() => 0, () => 0.5, () => 0.99, Math.random]) {
      const p = crearPartida(azar);
      expect(p.disponibles.map((l) => l.letra).join('')).not.toBe(p.palabras[0]);
      expect(ordenadas(p)).toBe([...p.palabras[0]].sort().join(''));
    }
  });

  it('empieza con la primera palabra jugando, sin aciertos y nada colocado', () => {
    const p = crearPartida(() => 0);
    expect(p).toMatchObject({ indice: 0, aciertos: 0, estado: 'jugando', aviso: 'ninguno', terminada: false });
    expect(p.colocadas).toEqual([]);
  });
});

describe('Forma la palabra: reglas', () => {
  it('colocarLetra pasa la letra a la primera casilla y la quita de las disponibles', () => {
    const p = partidaDe(lista);
    const id = p.disponibles[0].id;
    const q = colocarLetra(p, id);
    expect(q.colocadas.map((l) => l.id)).toEqual([id]);
    expect(q.disponibles.find((l) => l.id === id)).toBeUndefined();
    expect(colocarLetra(q, id)).toBe(q); // ya no está disponible
  });

  it('comprobar con la palabra correcta acierta y suma 1, también con letras repetidas', () => {
    const q = comprobar(formar(partidaDe(lista), 'casa'));
    expect(q.estado).toBe('acertada');
    expect(q.aciertos).toBe(1);
    const r = comprobar(formar(partidaDe(lista), 'casa'));
    expect(r.aciertos).toBe(1);
    // tocando la otra "a" primero
    let p = partidaDe(lista);
    const as = p.disponibles.filter((l) => l.letra === 'a');
    p = colocarLetra(p, p.disponibles.find((l) => l.letra === 'c')!.id);
    p = colocarLetra(p, as[1].id);
    p = colocarLetra(p, p.disponibles.find((l) => l.letra === 's')!.id);
    p = colocarLetra(p, as[0].id);
    expect(comprobar(p).estado).toBe('acertada');
  });

  it('comprobar con la palabra completa e incorrecta no suma y deja las letras', () => {
    const p = formar(partidaDe(lista), 'saca');
    const q = comprobar(p);
    expect(q.estado).toBe('jugando');
    expect(q.aviso).toBe('incorrecta');
    expect(q.colocadas).toHaveLength(4);
    expect(q.aciertos).toBe(0);
  });

  it('comprobar con la palabra incompleta avisa y no suma', () => {
    const q = comprobar(formar(partidaDe(lista), 'ca'));
    expect(q.aviso).toBe('incompleta');
    expect(q.estado).toBe('jugando');
    expect(q.aciertos).toBe(0);
    expect(q.colocadas).toHaveLength(2);
  });

  it('fallar y luego acertar suma una sola vez', () => {
    let p = comprobar(formar(partidaDe(lista), 'saca'));
    p = comprobar(formar(empezarDeNuevo(p), 'casa'));
    expect(p.aciertos).toBe(1);
    expect(comprobar(p).aciertos).toBe(1);
  });

  it('con la palabra acertada, colocar y comprobar no hacen nada', () => {
    const p = comprobar(formar(partidaDe(lista), 'casa'));
    expect(colocarLetra(p, 0)).toBe(p);
    expect(comprobar(p)).toBe(p);
  });

  it('siguiente pasa a la palabra siguiente con casillas vacías y letras desordenadas', () => {
    const p = comprobar(formar(partidaDe(lista), 'casa'));
    const q = siguiente(p, () => 0);
    expect(q.indice).toBe(1);
    expect(q.estado).toBe('jugando');
    expect(q.colocadas).toEqual([]);
    expect(q.disponibles.map((l) => l.letra).join('')).not.toBe('perro');
    expect(ordenadas(q)).toBe([...'perro'].sort().join(''));
  });

  it('siguiente con la palabra aún en juego no cambia nada', () => {
    const p = partidaDe(lista);
    expect(siguiente(p)).toBe(p);
  });
});

describe('Forma la palabra: corregir', () => {
  it('borrarUltima devuelve la última letra a las disponibles', () => {
    const p = formar(partidaDe(lista), 'cas');
    const q = borrarUltima(p);
    expect(q.colocadas.map((l) => l.letra).join('')).toBe('ca');
    expect(q.disponibles.map((l) => l.letra)).toContain('s');
  });

  it('empezarDeNuevo devuelve todas las letras', () => {
    const q = empezarDeNuevo(formar(partidaDe(lista), 'cas'));
    expect(q.colocadas).toEqual([]);
    expect(q.disponibles).toHaveLength(4);
  });

  it('sin letras colocadas no cambian nada ni dan error', () => {
    const p = partidaDe(lista);
    expect(borrarUltima(p)).toBe(p);
    expect(empezarDeNuevo(p)).toBe(p);
  });

  it('con la palabra cerrada no hacen nada', () => {
    const p = comprobar(formar(partidaDe(lista), 'casa'));
    expect(borrarUltima(p)).toBe(p);
    expect(empezarDeNuevo(p)).toBe(p);
  });

  it('tras un fallo, borrar la última letra permite corregir y acertar', () => {
    let p = comprobar(formar(partidaDe(lista), 'caas'));
    expect(p.aviso).toBe('incorrecta');
    p = borrarUltima(borrarUltima(p));
    expect(p.aviso).toBe('ninguno');
    p = comprobar(formar(p, 'sa'));
    expect(p.estado).toBe('acertada');
  });
});

describe('Forma la palabra: ver la respuesta', () => {
  it('deja la palabra rendida sin sumar y bloquea las demás acciones', () => {
    const p = verRespuesta(formar(partidaDe(lista), 'ca'));
    expect(p.estado).toBe('rendida');
    expect(p.aciertos).toBe(0);
    expect(verRespuesta(p)).toBe(p);
    expect(colocarLetra(p, p.disponibles[0].id)).toBe(p);
    expect(comprobar(p)).toBe(p);
    expect(borrarUltima(p)).toBe(p);
  });

  it('no hace nada con la palabra ya acertada', () => {
    const p = comprobar(formar(partidaDe(lista), 'casa'));
    expect(verRespuesta(p)).toBe(p);
  });
});

describe('Forma la palabra: final de partida', () => {
  it('jugar las 5 palabras termina con el número de aciertos', () => {
    let p = partidaDe(lista);
    for (let i = 0; i < 5; i++) {
      p = i % 2 === 0 ? comprobar(formar(p, lista[i])) : verRespuesta(p);
      expect(p.terminada).toBe(false);
      p = siguiente(p, () => 0);
      if (i < 4) p = { ...p, disponibles: [...lista[i + 1]].map((letra, id) => ({ id, letra })).reverse() };
    }
    expect(p.terminada).toBe(true);
    expect(p.aciertos).toBe(3);
    expect(siguiente(p)).toBe(p);
  });

  it('varias partidas seguidas no repiten palabras dentro de la misma', () => {
    for (let i = 0; i < 20; i++) expect(new Set(crearPartida().palabras).size).toBe(5);
  });
});
