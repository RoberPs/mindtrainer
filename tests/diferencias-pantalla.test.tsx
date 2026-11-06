import { fireEvent, render, screen } from '@testing-library/react-native';
import App from '../App';
import { Diferencias } from '../src/actividades/diferencias/Diferencias';
import { diferencias } from '../src/actividades/diferencias/escena';
import { MarcoActividad } from '../src/pantallas/MarcoActividad';
import { textosDiferencias as t } from '../src/textos';
import { centroDe, puntoVacio, tocarAbajo, tocarArriba } from './ayudas-diferencias';

const ids = diferencias.map((d) => d.id);

async function abrir() {
  await render(<App />);
  await fireEvent.press(screen.getByText('Diferencias'));
}
const acertar = (id: string) => tocarAbajo(centroDe(id).x, centroDe(id).y);
const fallar = () => tocarAbajo(puntoVacio().x, puntoVacio().y);
const icono = (id: string) => screen.getByTestId(id, { includeHiddenElements: true });
const hayCirculo = (lado: 'arriba' | 'abajo', id: string) =>
  screen.queryByTestId(`circulo-${lado}-${id}`, { includeHiddenElements: true }) !== null;

describe('Diferencias: pantalla de los dibujos', () => {
  it('aparece en la lista de inicio con icono, nombre y descripción', async () => {
    await render(<App />);
    expect(screen.getByText('Diferencias')).toBeTruthy();
    expect(screen.getByText(t.descripcion)).toBeTruthy();
    expect(icono('icono-diferencias')).toBeTruthy();
  });

  it('al abrirla se ven la instrucción, los dos dibujos con su rótulo y ningún círculo', async () => {
    await abrir();
    expect(screen.getByText(t.instruccion)).toBeTruthy();
    expect(screen.getByText(t.rotuloArriba)).toBeTruthy();
    expect(screen.getByText(t.rotuloAbajo)).toBeTruthy();
    expect(screen.getByTestId('dibujo-arriba')).toBeTruthy();
    expect(screen.getByTestId('dibujo-abajo')).toBeTruthy();
    ids.forEach((id) => {
      expect(hayCirculo('arriba', id)).toBe(false);
      expect(hayCirculo('abajo', id)).toBe(false);
    });
  });

  it('tocar una diferencia en el dibujo de abajo la marca con un círculo en los dos dibujos', async () => {
    await abrir();
    await acertar(ids[0]);
    expect(hayCirculo('abajo', ids[0])).toBe(true);
    expect(hayCirculo('arriba', ids[0])).toBe(true);
    expect(hayCirculo('abajo', ids[1])).toBe(false);
    expect(screen.queryByText(t.fallo)).toBeNull();
  });

  it('tocar un sitio sin diferencia muestra el mensaje amable y no marca nada', async () => {
    await abrir();
    await fallar();
    expect(screen.getByText(t.fallo)).toBeTruthy();
    expect(icono('icono-fallo')).toBeTruthy();
    ids.forEach((id) => expect(hayCirculo('abajo', id)).toBe(false));
  });

  it('el dibujo de arriba no reacciona a los toques', async () => {
    await abrir();
    await tocarArriba(centroDe(ids[0]).x, centroDe(ids[0]).y);
    expect(hayCirculo('arriba', ids[0])).toBe(false);
    expect(hayCirculo('abajo', ids[0])).toBe(false);
    await tocarArriba(puntoVacio().x, puntoVacio().y);
    expect(screen.queryByText(t.fallo)).toBeNull();
  });

  it('tocar de nuevo una diferencia marcada no cambia nada, ni quita un mensaje de fallo anterior', async () => {
    await abrir();
    await acertar(ids[0]);
    await fallar();
    await acertar(ids[0]);
    expect(screen.getByText(t.fallo)).toBeTruthy();
    expect(hayCirculo('abajo', ids[0])).toBe(true);
    expect(screen.getByText(t.faltan(2))).toBeTruthy();
  });

  it('tras un fallo, acertar una diferencia quita el mensaje de fallo', async () => {
    await abrir();
    await fallar();
    await acertar(ids[1]);
    expect(screen.queryByText(t.fallo)).toBeNull();
    expect(hayCirculo('abajo', ids[1])).toBe(true);
  });
});

describe('Diferencias: cuántas faltan', () => {
  it('empieza en 3, baja al acertar, no cambia al fallar y usa el singular cuando falta una', async () => {
    await abrir();
    expect(screen.getByText(t.faltan(3))).toBeTruthy();
    expect(icono('icono-faltan')).toBeTruthy();
    await acertar(ids[0]);
    expect(screen.getByText(t.faltan(2))).toBeTruthy();
    await fallar();
    expect(screen.getByText(t.faltan(2))).toBeTruthy();
    await acertar(ids[1]);
    expect(screen.getByText('Te falta 1 diferencia')).toBeTruthy();
  });
});

describe('Diferencias: felicitación y jugar otra vez', () => {
  it('al encontrar las 3 sin fallos se felicita con 3 toques y se ofrece Jugar otra vez', async () => {
    await abrir();
    for (const id of ids) await acertar(id);
    expect(icono('icono-felicitacion')).toBeTruthy();
    expect(screen.getByText(t.felicitacion)).toBeTruthy();
    expect(screen.getByText('Has necesitado 3 toques')).toBeTruthy();
    expect(screen.getByText(t.jugarOtraVez)).toBeTruthy();
    expect(icono('icono-jugar-otra-vez')).toBeTruthy();
    expect(screen.queryByTestId('dibujo-abajo')).toBeNull();
  });

  it('los fallos y solo ellos suman toques; los toques repetidos no', async () => {
    await abrir();
    await fallar();
    await acertar(ids[0]);
    await acertar(ids[0]);
    await fallar();
    await acertar(ids[1]);
    await acertar(ids[1]);
    await acertar(ids[2]);
    expect(screen.getByText('Has necesitado 5 toques')).toBeTruthy();
  });

  it('Jugar otra vez empieza de cero: sin círculos, 3 por encontrar y recuento a cero', async () => {
    await abrir();
    await fallar();
    for (const id of ids) await acertar(id);
    await fireEvent.press(screen.getByText(t.jugarOtraVez));
    expect(screen.getByText(t.faltan(3))).toBeTruthy();
    expect(screen.queryByText(t.fallo)).toBeNull();
    ids.forEach((id) => expect(hayCirculo('abajo', id)).toBe(false));
    for (const id of ids) await acertar(id);
    expect(screen.getByText('Has necesitado 3 toques')).toBeTruthy();
  });
});

describe('Diferencias: avisos de partida y salida', () => {
  it('avisa con true al abrir, con false al marcar la tercera y con true al jugar otra vez', async () => {
    const avisar = jest.fn();
    await render(<Diferencias avisarPartida={avisar} />);
    expect(avisar).toHaveBeenLastCalledWith(true);
    await acertar(ids[0]);
    await acertar(ids[1]);
    expect(avisar).not.toHaveBeenCalledWith(false);
    await acertar(ids[2]);
    expect(avisar).toHaveBeenLastCalledWith(false);
    await fireEvent.press(screen.getByText(t.jugarOtraVez));
    expect(avisar).toHaveBeenLastCalledWith(true);
  });

  it('en la felicitación, Volver al inicio vuelve a la lista sin pedir confirmación', async () => {
    const alVolver = jest.fn();
    const actividad = {
      id: 'diferencias',
      icono: { nombre: 'compare' },
      nombre: t.nombre,
      descripcion: t.descripcion,
      Contenido: Diferencias,
    };
    await render(<MarcoActividad actividad={actividad} alVolver={alVolver} />);
    for (const id of ids) await acertar(id);
    await fireEvent.press(screen.getByText('Volver al inicio'));
    expect(alVolver).toHaveBeenCalledTimes(1);
  });

  it('a mitad de partida, Volver al inicio pide confirmación', async () => {
    const alVolver = jest.fn();
    const actividad = {
      id: 'diferencias',
      icono: { nombre: 'compare' },
      nombre: t.nombre,
      descripcion: t.descripcion,
      Contenido: Diferencias,
    };
    await render(<MarcoActividad actividad={actividad} alVolver={alVolver} />);
    await acertar(ids[0]);
    await fireEvent.press(screen.getByText('Volver al inicio'));
    expect(alVolver).not.toHaveBeenCalled();
    expect(screen.getByText('¿Seguro que quieres salir? Perderás la partida')).toBeTruthy();
  });
});
