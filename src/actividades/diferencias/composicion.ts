// Cómo se compone una escena de "Diferencias" al empezar cada partida. Cada ambiente (Salón,
// Cocina, Jardín) tiene 6 huecos fijos (3 en la fila de arriba y 3 en la de abajo), revisados a
// mano para que nunca se pisen, y un catálogo de objetos para cada fila. Al azar se eligen el
// color de la pared, los objetos de cada hueco, cuáles son las 3 diferencias y los colores. Así
// salen muchísimas composiciones distintas sin dibujar una escena para cada una.
import type { ReactElement } from 'react';
import { cambioColor, cambioFalta, cambioSobra, comun, type Cambio, type Colocado, type Escena, type Objeto } from './escena';
import { colores } from './objetos';

// Un objeto que puede salir en un hueco. `paleta` son los colores que le sientan bien (si no se
// dice, cualquiera de los vivos) y `cambiaColor: false` impide que sea el cambio de color (por
// ejemplo, un árbol azul no tiene sentido).
export type Elegible = { id: string; objeto: Objeto; paleta?: string[]; cambiaColor?: boolean };

export type Ambiente = {
  id: string;
  nombre: string;
  paredes: string[]; // colores posibles del fondo (pared, cielo...)
  fondo: (pared: string) => ReactElement;
  arriba: Elegible[]; // objetos para la fila de arriba (al menos 3)
  abajo: Elegible[]; // objetos para la fila de abajo (al menos 3)
};

// Los 6 huecos: tres columnas y dos filas, todos del mismo tamaño.
export const columnas = [0.17, 0.5, 0.83];
export const filas = { arriba: 0.19, abajo: 0.56 };
export const altoHueco = 0.32;

// Colores vivos para los objetos que no cambian.
export const vivos = [colores.rojo, colores.azul, colores.naranja, colores.amarillo, colores.verde, colores.morado, colores.rosa];

// Parejas del cambio de color: tonos muy distintos y también de distinta claridad, para que se
// distingan aunque se vea mal el color.
export const parejasDeColor: [string, string][] = [
  [colores.rojo, colores.azulOscuro],
  [colores.naranja, colores.azul],
  [colores.amarillo, colores.morado],
  [colores.amarillo, colores.azulOscuro],
  [colores.rosa, colores.azulOscuro],
  [colores.naranja, colores.morado],
  [colores.verde, colores.morado],
];

type Azar = () => number;
const indice = (n: number, azar: Azar) => Math.min(n - 1, Math.floor(azar() * n));
const elegir = <T>(lista: readonly T[], azar: Azar): T => lista[indice(lista.length, azar)];
// Saca de la lista un elemento al azar (y lo quita de ella).
const sacar = <T>(lista: T[], azar: Azar): T => lista.splice(indice(lista.length, azar), 1)[0];

type Hueco = { x: number; y: number; elegible: Elegible };

export function componerEscena(ambiente: Ambiente, azar: Azar = Math.random): Escena {
  const paredIndice = indice(ambiente.paredes.length, azar);
  const pared = ambiente.paredes[paredIndice];
  const filaArriba = [...ambiente.arriba];
  const filaAbajo = [...ambiente.abajo];
  const huecos: Hueco[] = [];
  for (const fila of ['arriba', 'abajo'] as const) {
    for (const x of columnas) {
      huecos.push({ x, y: filas[fila], elegible: sacar(fila === 'arriba' ? filaArriba : filaAbajo, azar) });
    }
  }

  // Los huecos en orden aleatorio: el primero que admite cambio de color es el del color, los dos
  // siguientes son el que falta y el que sobra (en orden aleatorio) y los otros 3 son comunes.
  const pendientes = [...huecos];
  const barajados: Hueco[] = [];
  while (pendientes.length) barajados.push(sacar(pendientes, azar));
  const posColor = barajados.findIndex((h) => h.elegible.cambiaColor !== false);
  const hColor = barajados.splice(posColor, 1)[0];
  const hFalta = barajados.splice(0, 1)[0];
  const hSobra = barajados.splice(0, 1)[0];
  const [a, b] = azar() < 0.5 ? [hFalta, hSobra] : [hSobra, hFalta];
  const quienFalta = a;
  const quienSobra = b;

  const colorDe = (e: Elegible) => elegir(e.paleta ?? vivos, azar);
  const pareja = elegir(parejasDeColor, azar);
  const [colorArriba, colorAbajo] = azar() < 0.5 ? pareja : [pareja[1], pareja[0]];

  const comunes: Colocado[] = barajados
    .sort((p, q) => huecos.indexOf(p) - huecos.indexOf(q))
    .map((h) => comun(h.elegible.id, h.elegible.objeto, h.x, h.y, altoHueco, colorDe(h.elegible)));
  const cambios: Cambio[] = [
    cambioColor(hColor.elegible.id, hColor.elegible.objeto, hColor.x, hColor.y, altoHueco, colorArriba, colorAbajo),
    cambioFalta(quienFalta.elegible.id, quienFalta.elegible.objeto, quienFalta.x, quienFalta.y, altoHueco, colorDe(quienFalta.elegible)),
    cambioSobra(quienSobra.elegible.id, quienSobra.elegible.objeto, quienSobra.x, quienSobra.y, altoHueco, colorDe(quienSobra.elegible)),
  ];

  // La composición se identifica por su ambiente, su pared, el objeto de cada hueco y cuáles son los cambios.
  const marca = (h: Hueco) => (h === hColor ? 'c' : h === quienFalta ? 'f' : h === quienSobra ? 's' : '-');
  const id = [ambiente.id, paredIndice, ...huecos.map((h) => `${h.elegible.id}${marca(h)}`)].join(':');

  return { id, ambiente: ambiente.id, nombre: ambiente.nombre, fondo: () => ambiente.fondo(pared), comunes, cambios };
}
