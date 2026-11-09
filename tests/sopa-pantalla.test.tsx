import { fireEvent, render, screen } from '@testing-library/react-native';
import App from '../App';
import { crearPartida, type Casilla } from '../src/actividades/sopa-de-letras/juego';
import { SopaDeLetras } from '../src/actividades/sopa-de-letras/SopaDeLetras';
import { sopas } from '../src/actividades/sopa-de-letras/sopas';
import { MarcoActividad } from '../src/pantallas/MarcoActividad';
import { casillasDe } from './ayudas-sopa';

// Con Math.random fijado a 0 conocemos la sopa que muestra la app en cada tamaño.
const sopa = crearPartida('pequena', undefined, () => 0).sopa;
const sopaMediana = crearPartida('mediana', undefined, () => 0).sopa;
beforeEach(() => {
  jest.spyOn(Math, 'random').mockReturnValue(0);
});
afterEach(() => {
  jest.restoreAllMocks();
});

const botonDe = { pequena: 'Pequeña: 3 palabras', mediana: 'Mediana: 5 palabras' } as const;
const elegir = (tamano: 'pequena' | 'mediana') => fireEvent.press(screen.getByText(botonDe[tamano]));

// Abre la actividad y elige el tamaño (pequeña si no se dice otra cosa).
async function abrir(tamano: 'pequena' | 'mediana' = 'pequena') {
  await render(<App />);
  await fireEvent.press(screen.getByText('Sopa de letras'));
  await elegir(tamano);
}
const tocar = (c: Casilla) => fireEvent.press(screen.getByTestId(`celda-${c.fila}-${c.columna}`));
async function marcar(palabra: string, deSopa = sopa) {
  const { inicio, fin } = casillasDe(deSopa, palabra);
  await tocar(inicio);
  await tocar(fin);
}

describe('Sopa de letras: elegir el tamaño (RF-007, RF-010, RF-011)', () => {
  it('al abrirla se ve la invitación y los botones de pequeña y mediana con su icono, y aún no hay cuadrícula', async () => {
    await render(<App />);
    await fireEvent.press(screen.getByText('Sopa de letras'));
    expect(screen.getByText('Elige el tamaño de la sopa')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Pequeña: 3 palabras' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Mediana: 5 palabras' })).toBeTruthy();
    expect(screen.getByTestId('icono-pequena', { includeHiddenElements: true })).toBeTruthy();
    expect(screen.getByTestId('icono-mediana', { includeHiddenElements: true })).toBeTruthy();
    expect(screen.queryByTestId('celda-0-0')).toBeNull();
  });

  it('la sopa pequeña tiene 5 filas de 6 casillas, 3 palabras y su etiqueta', async () => {
    await abrir('pequena');
    expect(screen.getByText('Busca 3 palabras relacionadas con:')).toBeTruthy();
    expect(screen.getAllByText('???')).toHaveLength(3);
    expect(screen.getByText('Te faltan 3 palabras')).toBeTruthy();
    expect(screen.queryByTestId('celda-5-0')).toBeNull();
  });

  it('la sopa mediana tiene 6 filas de 6 casillas, 5 palabras y su etiqueta', async () => {
    await abrir('mediana');
    expect(screen.getByText(sopaMediana.referencia)).toBeTruthy();
    expect(screen.getByText('Busca 5 palabras relacionadas con:')).toBeTruthy();
    for (let fila = 0; fila < 6; fila++) {
      for (let columna = 0; columna < 6; columna++) {
        expect(screen.getByTestId(`celda-${fila}-${columna}`)).toHaveTextContent(sopaMediana.cuadricula[fila][columna]);
      }
    }
    expect(screen.getAllByText('???')).toHaveLength(5);
    expect(screen.getByText('Te faltan 5 palabras')).toBeTruthy();
  });

  it('una partida mediana completa: el aviso baja de 5 a 0 y la felicitación dice 5 palabras', async () => {
    await abrir('mediana');
    let faltan = 5;
    for (const palabra of sopaMediana.palabras) {
      await marcar(palabra, sopaMediana);
      faltan--;
      if (faltan > 0) {
        expect(screen.getByText(faltan === 1 ? 'Te falta 1 palabra' : `Te faltan ${faltan} palabras`)).toBeTruthy();
      }
    }
    expect(screen.getByText('¡Enhorabuena! Has encontrado las 5 palabras')).toBeTruthy();
    expect(screen.getByText('Has necesitado 5 intentos')).toBeTruthy();
    expect(screen.getByText('Jugar otra vez')).toBeTruthy();
  });

  it('Jugar otra vez vuelve a pedir el tamaño y se puede cambiar de tamaño', async () => {
    await abrir('mediana');
    for (const palabra of sopaMediana.palabras) await marcar(palabra, sopaMediana);
    await fireEvent.press(screen.getByText('Jugar otra vez'));
    expect(screen.getByText('Elige el tamaño de la sopa')).toBeTruthy();
    await elegir('pequena');
    expect(screen.getByText('Busca 3 palabras relacionadas con:')).toBeTruthy();
    expect(screen.getAllByText('???')).toHaveLength(3);
  });
});

describe('Sopa de letras: marcar palabras en la pantalla', () => {
  it('aparece en la lista de inicio con icono, nombre y descripción', async () => {
    await render(<App />);
    expect(screen.getByText('Sopa de letras')).toBeTruthy();
    expect(screen.getByText('Encuentra las palabras escondidas')).toBeTruthy();
    expect(screen.getByTestId('icono-sopa-de-letras', { includeHiddenElements: true })).toBeTruthy();
  });

  it('al abrirla se ven la referencia, la etiqueta, 30 casillas y tres palabras ocultas', async () => {
    await abrir();
    expect(screen.getByText(sopa.referencia)).toBeTruthy();
    expect(screen.getByText('Busca 3 palabras relacionadas con:')).toBeTruthy();
    for (let fila = 0; fila < 5; fila++) {
      for (let columna = 0; columna < 6; columna++) {
        expect(screen.getByTestId(`celda-${fila}-${columna}`)).toHaveTextContent(sopa.cuadricula[fila][columna]);
      }
    }
    expect(screen.getAllByText('???')).toHaveLength(3);
    for (const palabra of sopa.palabras) expect(screen.queryByText(palabra)).toBeNull();
  });

  it('tocar una letra muestra la invitación y volver a tocarla quita la marca sin error', async () => {
    await abrir();
    await tocar({ fila: 2, columna: 2 });
    expect(screen.getByText('Ahora toca la última letra de la palabra')).toBeTruthy();
    expect(screen.getByTestId('icono-invitar', { includeHiddenElements: true })).toBeTruthy();
    await tocar({ fila: 2, columna: 2 });
    expect(screen.queryByText('Ahora toca la última letra de la palabra')).toBeNull();
    expect(screen.queryByText('Esa no es una de las palabras. Inténtalo otra vez')).toBeNull();
    expect(screen.queryByText('Marca una línea recta, en horizontal o en vertical')).toBeNull();
  });

  it('dos letras que no están en línea recta dan un mensaje amable y quitan la marca', async () => {
    await abrir();
    await tocar({ fila: 0, columna: 0 });
    await tocar({ fila: 1, columna: 1 });
    expect(screen.getByText('Marca una línea recta, en horizontal o en vertical')).toBeTruthy();
    expect(screen.getByTestId('icono-no-recta', { includeHiddenElements: true })).toBeTruthy();
    expect(screen.queryByText('Ahora toca la última letra de la palabra')).toBeNull();
  });

  it('una línea recta que no es palabra da un mensaje amable de fallo', async () => {
    await abrir();
    await tocar({ fila: 1, columna: 0 });
    await tocar({ fila: 1, columna: 3 });
    expect(screen.getByText('Esa no es una de las palabras. Inténtalo otra vez')).toBeTruthy();
    expect(screen.getByTestId('icono-fallo', { includeHiddenElements: true })).toBeTruthy();
    expect(screen.getAllByText('???')).toHaveLength(3);
  });

  it('marcar bien una palabra la resalta, la escribe en la lista y da el mensaje positivo', async () => {
    await abrir();
    const palabra = sopa.palabras[0];
    const { inicio } = casillasDe(sopa, palabra);
    await marcar(palabra);
    expect(screen.getByText('¡Muy bien! Has encontrado una palabra')).toBeTruthy();
    expect(screen.getByTestId('icono-acierto', { includeHiddenElements: true })).toBeTruthy();
    expect(screen.getByText(palabra)).toBeTruthy();
    expect(screen.getAllByText('???')).toHaveLength(2);
    expect(screen.getByTestId(`celda-${inicio.fila}-${inicio.columna}`)).toBeSelected();
  });

  it('marcar de nuevo una palabra ya encontrada no hace nada', async () => {
    await abrir();
    const palabra = sopa.palabras[0];
    await marcar(palabra);
    await marcar(palabra);
    expect(screen.queryByText('Esa no es una de las palabras. Inténtalo otra vez')).toBeNull();
    expect(screen.queryByText('¡Muy bien! Has encontrado una palabra')).toBeNull();
    expect(screen.getByText(palabra)).toBeTruthy();
    expect(screen.getAllByText('???')).toHaveLength(2);
  });
});

// Encuentra las 3 palabras de la sopa mostrada.
async function terminar() {
  for (const palabra of sopa.palabras) await marcar(palabra);
}

describe('Sopa de letras: final de la partida en la pantalla', () => {
  it('al encontrar la tercera palabra aparece la felicitación con los intentos y los botones', async () => {
    await abrir();
    await terminar();
    expect(screen.getByText('¡Enhorabuena! Has encontrado las 3 palabras')).toBeTruthy();
    expect(screen.getByTestId('icono-felicitacion', { includeHiddenElements: true })).toBeTruthy();
    expect(screen.getByText('Has necesitado 3 intentos')).toBeTruthy();
    expect(screen.getByText('Jugar otra vez')).toBeTruthy();
    expect(screen.getByTestId('icono-jugar-otra-vez', { includeHiddenElements: true })).toBeTruthy();
    expect(screen.getByText('Volver al inicio')).toBeTruthy();
  });

  it('la cuadrícula sigue visible con las 3 palabras resaltadas', async () => {
    await abrir();
    await terminar();
    for (const palabra of sopa.palabras) {
      const { inicio, fin } = casillasDe(sopa, palabra);
      expect(screen.getByTestId(`celda-${inicio.fila}-${inicio.columna}`)).toBeSelected();
      expect(screen.getByTestId(`celda-${fin.fila}-${fin.columna}`)).toBeSelected();
    }
  });

  it('tras fallar dos veces los intentos son 5', async () => {
    await abrir();
    await tocar({ fila: 1, columna: 0 });
    await tocar({ fila: 1, columna: 3 });
    await tocar({ fila: 2, columna: 0 });
    await tocar({ fila: 2, columna: 3 });
    await terminar();
    expect(screen.getByText('Has necesitado 5 intentos')).toBeTruthy();
  });

  it('tocar una casilla tras terminar no cambia nada', async () => {
    await abrir();
    await terminar();
    await tocar({ fila: 2, columna: 2 });
    expect(screen.queryByText('Ahora toca la última letra de la palabra')).toBeNull();
    expect(screen.getByText('¡Enhorabuena! Has encontrado las 3 palabras')).toBeTruthy();
  });

  it('avisa de partida en curso al elegir el tamaño y de que acaba al encontrar la tercera palabra', async () => {
    const avisar = jest.fn();
    await render(<SopaDeLetras avisarPartida={avisar} />);
    expect(avisar).not.toHaveBeenCalled(); // todavía se está eligiendo el tamaño
    await elegir('pequena');
    expect(avisar).toHaveBeenCalledWith(true);
    await marcar(sopa.palabras[0]);
    await marcar(sopa.palabras[1]);
    expect(avisar).not.toHaveBeenCalledWith(false);
    await marcar(sopa.palabras[2]);
    expect(avisar).toHaveBeenCalledWith(false);
  });

  it('Jugar otra vez empieza con otra sopa, sin palabras y con los intentos a cero', async () => {
    const avisar = jest.fn();
    await render(<SopaDeLetras avisarPartida={avisar} />);
    await elegir('pequena');
    await terminar();
    await fireEvent.press(screen.getByText('Jugar otra vez'));
    await elegir('pequena');
    expect(avisar).toHaveBeenLastCalledWith(true);
    expect(screen.getByText(sopas[1].referencia)).toBeTruthy(); // con azar 0 y sin la anterior
    expect(screen.queryByText(sopa.referencia)).toBeNull();
    expect(screen.getAllByText('???')).toHaveLength(3);
    expect(screen.queryByText('¡Enhorabuena! Has encontrado las 3 palabras')).toBeNull();
    // Los intentos empiezan de cero: al terminar la nueva sopa sin fallos son 3.
    for (const palabra of sopas[1].palabras) {
      const { inicio, fin } = casillasDe(sopas[1], palabra);
      await tocar(inicio);
      await tocar(fin);
    }
    expect(screen.getByText('Has necesitado 3 intentos')).toBeTruthy();
  });

  it('dentro del marco, Volver al inicio en la felicitación sale sin preguntar', async () => {
    const actividad = {
      id: 'sopa-de-letras',
      icono: { nombre: 'grid' },
      nombre: 'Sopa de letras',
      descripcion: 'x',
      Contenido: SopaDeLetras,
    };
    const alVolver = jest.fn();
    await render(<MarcoActividad actividad={actividad} alVolver={alVolver} />);
    await elegir('pequena');
    await terminar();
    await fireEvent.press(screen.getByText('Volver al inicio'));
    expect(alVolver).toHaveBeenCalled();
    expect(screen.queryByText('¿Seguro que quieres salir? Perderás la partida')).toBeNull();
  });
});

describe('Sopa de letras: cuántas palabras faltan en la pantalla', () => {
  it('el aviso baja de 3 a 0 con singular y plural, y nunca se escribe una palabra sin encontrar', async () => {
    await abrir();
    expect(screen.getByText('Te faltan 3 palabras')).toBeTruthy();
    expect(screen.getByTestId('icono-faltan', { includeHiddenElements: true })).toBeTruthy();

    await marcar(sopa.palabras[0]);
    expect(screen.getByText('Te faltan 2 palabras')).toBeTruthy();
    expect(screen.queryByText(sopa.palabras[1])).toBeNull();
    expect(screen.queryByText(sopa.palabras[2])).toBeNull();

    await marcar(sopa.palabras[1]);
    expect(screen.getByText('Te falta 1 palabra')).toBeTruthy();
    expect(screen.queryByText(sopa.palabras[2])).toBeNull();
    expect(screen.getAllByText('???')).toHaveLength(1);

    await marcar(sopa.palabras[2]);
    expect(screen.getByText('No te falta ninguna palabra')).toBeTruthy();
    expect(screen.queryByText('???')).toBeNull();
  });

  it('un fallo no cambia cuántas palabras faltan', async () => {
    await abrir();
    await tocar({ fila: 1, columna: 0 });
    await tocar({ fila: 1, columna: 3 });
    expect(screen.getByText('Te faltan 3 palabras')).toBeTruthy();
  });
});
