import { AccessibilityInfo } from 'react-native';
import { act, fireEvent, render, screen } from '@testing-library/react-native';
import { IconoVictoria } from '../src/componentes/IconoVictoria';
import { animacion } from '../src/animacion';
import { Felicitacion } from '../src/actividades/diferencias/Felicitacion';
import { textosDiferencias as t } from '../src/textos';

const ID = 'icono-prueba';

function dibujarIcono() {
  return render(<IconoVictoria testID={ID} />);
}

function opacidad(): number {
  const icono = screen.getByTestId(ID, { includeHiddenElements: true });
  const estilo = Array.isArray(icono.props.style) ? Object.assign({}, ...icono.props.style.flat()) : icono.props.style;
  return estilo.opacity;
}

describe('Animación de victoria (RF-019, RF-020 de la spec 008; RF-009 a RF-011 de la spec 007)', () => {
  const activaOriginal = animacion.activa;

  beforeEach(() => {
    jest.useFakeTimers();
    animacion.activa = true;
    jest.spyOn(AccessibilityInfo, 'isReduceMotionEnabled').mockResolvedValue(false);
  });

  afterEach(() => {
    animacion.activa = activaOriginal;
    jest.restoreAllMocks();
    jest.useRealTimers();
  });

  it('el icono aparece poco a poco: empieza transparente y llega a visible en un segundo o menos', async () => {
    await dibujarIcono();
    await act(async () => {});
    expect(opacidad()).toBe(0);
    await act(async () => {
      jest.advanceTimersByTime(animacion.duracion);
    });
    expect(opacidad()).toBe(1);
    expect(animacion.duracion).toBeGreaterThanOrEqual(800);
    expect(animacion.duracion).toBeLessThanOrEqual(1000);
  });

  it('una vez visible se queda quieto: no se repite ni cambia', async () => {
    await dibujarIcono();
    await act(async () => {});
    await act(async () => {
      jest.advanceTimersByTime(animacion.duracion * 5);
    });
    expect(opacidad()).toBe(1);
  });

  it('al volver a montarlo (jugar otra vez y ganar de nuevo) el fundido empieza otra vez', async () => {
    const primera = await dibujarIcono();
    await act(async () => {});
    await act(async () => {
      jest.advanceTimersByTime(animacion.duracion);
    });
    expect(opacidad()).toBe(1);
    await primera.unmount();
    await dibujarIcono();
    await act(async () => {});
    expect(opacidad()).toBe(0);
  });

  it('con "reducir movimiento" activado el icono se ve directamente, sin animar', async () => {
    jest.spyOn(AccessibilityInfo, 'isReduceMotionEnabled').mockResolvedValue(true);
    await dibujarIcono();
    await act(async () => {});
    expect(opacidad()).toBe(1);
  });

  it('con la animación desactivada (pruebas) el icono se ve desde el primer momento', async () => {
    animacion.activa = false;
    await dibujarIcono();
    expect(opacidad()).toBe(1);
  });

  it('con la animación activa, el mensaje y "Jugar otra vez" están a la vista y responden al primer toque', async () => {
    const alJugarOtraVez = jest.fn();
    await render(<Felicitacion total={3} toques={3} alJugarOtraVez={alJugarOtraVez} />);
    expect(screen.getByText(t.felicitacion(3))).toBeTruthy();
    expect(screen.getByText(t.toques(3))).toBeTruthy();
    // Sin avanzar el reloj: el fundido no ha terminado y el botón ya responde.
    await fireEvent.press(screen.getByRole('button', { name: t.jugarOtraVez }));
    expect(alJugarOtraVez).toHaveBeenCalledTimes(1);
  });
});
