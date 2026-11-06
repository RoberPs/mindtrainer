import { adivinanzas } from '../src/actividades/adivinanzas/banco';
import { crearPartida, esUltima, responder, siguiente } from '../src/actividades/adivinanzas/juego';
import { azarCon, correctaActual, incorrectaActual, partidaConAzar, turnoActual } from './ayudas-adivinanzas';

describe('Adivinanzas: crearPartida', () => {
  it('crea 5 turnos distintos del banco, cada uno con sus 3 respuestas', () => {
    const partida = partidaConAzar(0);
    expect(partida.turnos).toHaveLength(5);
    expect(new Set(partida.turnos.map((t) => t.adivinanza.id)).size).toBe(5);
    for (const t of partida.turnos) {
      expect(adivinanzas).toContain(t.adivinanza);
      expect([...t.opciones].sort()).toEqual([t.adivinanza.correcta, ...t.adivinanza.incorrectas].sort());
    }
  });

  it('empieza en la primera adivinanza, sin respuesta, con 0 aciertos y sin terminar', () => {
    const p = partidaConAzar(0);
    expect(p.indice).toBe(0);
    expect(p.elegida).toBeNull();
    expect(p.aciertos).toBe(0);
    expect(p.terminada).toBe(false);
  });

  it('el orden de las respuestas se sortea: la correcta aparece en las tres posiciones', () => {
    const posiciones = new Set<number>();
    for (let semilla = 1; semilla <= 30; semilla++) {
      const p = crearPartida(azarCon(semilla));
      for (const t of p.turnos) posiciones.add(t.opciones.indexOf(t.adivinanza.correcta));
    }
    expect(posiciones).toEqual(new Set([0, 1, 2]));
  });

  it('con azares distintos cambia la partida', () => {
    const a = crearPartida(azarCon(1)).turnos.map((t) => t.opciones.join());
    const b = crearPartida(azarCon(2)).turnos.map((t) => t.opciones.join());
    expect(a).not.toEqual(b);
  });

  it('no modifica el banco', () => {
    const antes = JSON.stringify(adivinanzas);
    crearPartida(azarCon(3));
    expect(JSON.stringify(adivinanzas)).toBe(antes);
  });

  it('las ayudas dan los datos de la primera adivinanza', () => {
    const p = partidaConAzar(0);
    expect(turnoActual(p)).toBe(p.turnos[0]);
    expect(correctaActual(p)).toBe(p.turnos[0].adivinanza.correcta);
  });
});

describe('Adivinanzas: responder y siguiente', () => {
  it('la respuesta correcta se guarda y suma exactamente un acierto', () => {
    const p = partidaConAzar(0);
    const r = responder(p, correctaActual(p));
    expect(r.elegida).toBe(correctaActual(p));
    expect(r.aciertos).toBe(1);
  });

  it('una respuesta incorrecta se guarda y no suma', () => {
    const p = partidaConAzar(0);
    const r = responder(p, incorrectaActual(p));
    expect(r.elegida).toBe(incorrectaActual(p));
    expect(r.aciertos).toBe(0);
  });

  it('solo hay un intento: una segunda respuesta no cambia nada', () => {
    const p = partidaConAzar(0);
    const fallada = responder(p, incorrectaActual(p));
    expect(responder(fallada, correctaActual(p))).toEqual(fallada);
    const acertada = responder(p, correctaActual(p));
    expect(responder(acertada, correctaActual(p))).toEqual(acertada);
    expect(responder(acertada, incorrectaActual(p))).toEqual(acertada);
  });

  it('siguiente sin haber respondido no cambia nada', () => {
    const p = partidaConAzar(0);
    expect(siguiente(p)).toEqual(p);
  });

  it('siguiente tras responder pasa a la adivinanza siguiente y conserva los aciertos', () => {
    const p = partidaConAzar(0);
    const s = siguiente(responder(p, correctaActual(p)));
    expect(s.indice).toBe(1);
    expect(s.elegida).toBeNull();
    expect(s.aciertos).toBe(1);
  });

  it('siguiente no pasa de la quinta adivinanza', () => {
    let p = partidaConAzar(0);
    for (let i = 0; i < 4; i++) p = siguiente(responder(p, correctaActual(p)));
    expect(p.indice).toBe(4);
    const ultima = siguiente(responder(p, correctaActual(p)));
    expect(ultima.indice).toBe(4);
  });

  it('no modifica la partida recibida', () => {
    const p = partidaConAzar(0);
    const copia = JSON.stringify(p);
    siguiente(responder(p, correctaActual(p)));
    expect(JSON.stringify(p)).toBe(copia);
  });
});

describe('Adivinanzas: final de partida', () => {
  // Juega las cinco adivinanzas acertando las que indique la función.
  function jugar(acierta: (i: number) => boolean) {
    let p = partidaConAzar(0);
    for (let i = 0; i < 5; i++) {
      p = responder(p, acierta(i) ? correctaActual(p) : incorrectaActual(p));
      p = siguiente(p);
    }
    return p;
  }

  it('esUltima es falsa en las adivinanzas 1 a 4 y verdadera en la quinta', () => {
    let p = partidaConAzar(0);
    for (let i = 0; i < 4; i++) {
      expect(esUltima(p)).toBe(false);
      p = siguiente(responder(p, correctaActual(p)));
    }
    expect(esUltima(p)).toBe(true);
  });

  it('siguiente tras responder la quinta termina la partida', () => {
    const p = jugar(() => true);
    expect(p.terminada).toBe(true);
    expect(p.indice).toBe(4);
  });

  it('con la partida terminada, responder y siguiente no cambian nada', () => {
    const p = jugar(() => true);
    expect(responder(p, correctaActual(p))).toEqual(p);
    expect(siguiente(p)).toEqual(p);
  });

  it('los aciertos finales son exactamente las adivinanzas acertadas', () => {
    expect(jugar(() => true).aciertos).toBe(5);
    expect(jugar(() => false).aciertos).toBe(0);
    expect(jugar((i) => i % 2 === 0).aciertos).toBe(3);
  });
});
