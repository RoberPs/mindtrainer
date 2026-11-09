import { dibujosDe } from '../src/actividades/diferencias/escena';
import { ambientes } from '../src/actividades/diferencias/escenas';
import { crearPartida, faltan, tocar, totalDiferencias, type Partida } from '../src/actividades/diferencias/juego';
import { azarFijo, centroDe, diferenciasDe, escenaDePrueba, puntoVacio } from './ayudas-diferencias';

const nueva = (): Partida => ({ ...crearPartida(undefined, () => 0), escena: escenaDePrueba });
const ids = diferenciasDe(escenaDePrueba).map((d) => d.id);
const tocarEn = (p: Partida, id: string) => tocar(p, centroDe(id).x, centroDe(id).y);
const fallar = (p: Partida) => tocar(p, puntoVacio().x, puntoVacio().y);

describe('Diferencias: reglas del juego (siempre 3 diferencias)', () => {
  it('una partida nueva está vacía, sin fallo y con 3 por encontrar', () => {
    const p = nueva();
    expect(totalDiferencias).toBe(3);
    expect(p.encontradas).toEqual([]);
    expect(p.toques).toBe(0);
    expect(p.fallo).toBe(false);
    expect(p.terminada).toBe(false);
    expect(faltan(p)).toBe(3);
  });

  it('acertar una diferencia la marca, suma un toque, quita el fallo y no termina', () => {
    const p = tocarEn(fallar(nueva()), ids[0]);
    expect(p.encontradas).toEqual([ids[0]]);
    expect(p.toques).toBe(2);
    expect(p.fallo).toBe(false);
    expect(p.terminada).toBe(false);
    expect(faltan(p)).toBe(2);
  });

  it('fallar suma un toque, muestra el fallo y no marca nada', () => {
    const p = fallar(nueva());
    expect(p.encontradas).toEqual([]);
    expect(p.toques).toBe(1);
    expect(p.fallo).toBe(true);
    expect(faltan(p)).toBe(3);
  });

  it('tocar una diferencia ya marcada no cambia nada', () => {
    const a = fallar(tocarEn(nueva(), ids[0]));
    const b = tocarEn(a, ids[0]);
    expect(b).toEqual(a);
  });

  it('al marcar las 3 termina la partida y los toques posteriores no hacen nada', () => {
    let p = nueva();
    for (const id of ids) p = tocarEn(p, id);
    expect(p.terminada).toBe(true);
    expect(faltan(p)).toBe(0);
    expect(p.toques).toBe(3);
    expect(fallar(p)).toEqual(p);
    expect(tocarEn(p, ids[0])).toEqual(p);
  });

  it('la puntuación son los aciertos nuevos más los fallos', () => {
    let p = nueva();
    p = fallar(p);
    p = tocarEn(p, ids[0]);
    p = tocarEn(p, ids[0]); // repetida: no cuenta
    p = fallar(p);
    p = tocarEn(p, ids[1]);
    p = tocarEn(p, ids[2]);
    expect(p.toques).toBe(5);
    expect(p.terminada).toBe(true);
  });

  it('cada una de las 3 zonas es una diferencia distinta: su centro la marca y nada más', () => {
    const { diferencias } = dibujosDe(escenaDePrueba);
    expect(diferencias).toHaveLength(3);
    for (const d of diferencias) {
      const p = tocarEn(nueva(), d.id);
      expect(p.encontradas).toEqual([d.id]);
    }
  });
});

describe('Diferencias: la escena de cada partida', () => {
  it('hay al menos 6 ambientes', () => {
    expect(ambientes.length).toBeGreaterThanOrEqual(6);
  });

  it('crearPartida compone una escena de uno de los ambientes', () => {
    const p = crearPartida(undefined, azarFijo(1));
    expect(ambientes.map((a) => a.id)).toContain(p.escena.ambiente);
  });

  it('nunca repite el ambiente de la partida anterior, con cualquier valor del azar', () => {
    for (const azar of [0, 0.25, 0.5, 0.75, 0.99]) {
      for (const a of ambientes) {
        const anterior = crearPartida(undefined, azarFijo(ambientes.indexOf(a))).escena;
        const previa = { ...anterior, ambiente: a.id };
        expect(crearPartida(previa, () => azar).escena.ambiente).not.toBe(a.id);
      }
    }
  });

  it('con 12 partidas seguidas salen varios ambientes y casi todas las composiciones son distintas', () => {
    let anterior: Partida | undefined;
    const ids = new Set<string>();
    const lugares = new Set<string>();
    for (let i = 0; i < 12; i++) {
      const p = crearPartida(anterior?.escena, azarFijo(100 + i));
      ids.add(p.escena.id);
      lugares.add(p.escena.ambiente);
      anterior = p;
    }
    expect(ids.size).toBe(12);
    expect(lugares.size).toBeGreaterThanOrEqual(4);
  });
});
