import { adivinanzas } from '../src/actividades/adivinanzas/banco';

describe('Banco de adivinanzas', () => {
  it('hay 10 adivinanzas o más, con identificadores distintos', () => {
    expect(adivinanzas.length).toBeGreaterThanOrEqual(10);
    expect(new Set(adivinanzas.map((a) => a.id)).size).toBe(adivinanzas.length);
  });

  it.each(adivinanzas.map((a) => [a.id, a] as const))('%s: una correcta y dos incorrectas válidas', (_id, a) => {
    expect(a.texto.trim()).not.toBe('');
    expect(a.incorrectas).toHaveLength(2);
    const respuestas = [a.correcta, ...a.incorrectas];
    expect(new Set(respuestas).size).toBe(3);
    for (const r of respuestas) {
      expect(r.trim()).not.toBe('');
      expect(r).not.toMatch(/\s/); // una sola palabra
    }
  });

  // Se comparan palabras enteras: "espera" no delata "pera", es parte de la gracia de la adivinanza.
  it.each(adivinanzas.map((a) => [a.id, a] as const))('%s: el texto no contiene la respuesta', (_id, a) => {
    const palabras = a.texto.toLowerCase().match(/\p{L}+/gu) ?? [];
    expect(palabras).not.toContain(a.correcta.toLowerCase());
  });
});
