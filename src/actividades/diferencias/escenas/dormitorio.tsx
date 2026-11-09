// Ambiente «Dormitorio»: pared y suelo, con objetos para la pared (fila de arriba) y para el
// suelo (fila de abajo).
import { Circle, Ellipse, G, Line, Path, Rect } from 'react-native-svg';
import type { Ambiente } from '../composicion';
import { colores, contorno, cuadro, planta, reloj, trazo, ventana } from '../objetos';
import { espejo, gato, lampara, marcos } from './salon';

const fondo = (pared: string) => (
  <G>
    <Rect x={0} y={0} width={300} height={200} fill={pared} />
    <Rect x={0} y={150} width={300} height={50} fill="#C9A27A" />
    <Line x1={60} y1={150} x2={30} y2={200} stroke="#A9825A" strokeWidth={2} />
    <Line x1={150} y1={150} x2={150} y2={200} stroke="#A9825A" strokeWidth={2} />
    <Line x1={240} y1={150} x2={270} y2={200} stroke="#A9825A" strokeWidth={2} />
    <Rect x={0} y={144} width={300} height={8} fill="#FFFFFF" {...trazo} />
  </G>
);

// Cama con almohada y manta. El color es el de la manta.
const cama = (color: string) => (
  <G>
    <Rect x={4} y={22} width={14} height={72} rx={5} fill={colores.marron} {...trazo} />
    <Rect x={14} y={52} width={84} height={34} rx={6} fill={colores.crema} {...trazo} />
    <Rect x={20} y={40} width={26} height={18} rx={8} fill={colores.blanco} {...trazo} />
    <Rect x={18} y={56} width={80} height={30} rx={6} fill={color} {...trazo} />
    <Line x1={44} y1={58} x2={44} y2={84} stroke={colores.blanco} strokeOpacity={0.6} strokeWidth={3} />
    <Line x1={64} y1={58} x2={64} y2={84} stroke={colores.blanco} strokeOpacity={0.6} strokeWidth={3} />
    <Rect x={88} y={80} width={9} height={14} rx={3} fill={colores.marron} {...trazo} />
  </G>
);

// Osito de peluche sentado. El color es el del peluche.
const osito = (color: string) => (
  <G>
    <Circle cx={30} cy={26} r={11} fill={color} {...trazo} />
    <Circle cx={70} cy={26} r={11} fill={color} {...trazo} />
    <Ellipse cx={50} cy={72} rx={28} ry={24} fill={color} {...trazo} />
    <Ellipse cx={50} cy={74} rx={15} ry={14} fill={colores.crema} />
    <Circle cx={22} cy={78} r={10} fill={color} {...trazo} />
    <Circle cx={78} cy={78} r={10} fill={color} {...trazo} />
    <Circle cx={50} cy={38} r={22} fill={color} {...trazo} />
    <Ellipse cx={50} cy={46} rx={10} ry={8} fill={colores.crema} {...trazo} strokeWidth={2.5} />
    <Circle cx={50} cy={43} r={3.5} fill={contorno} />
    <Circle cx={41} cy={34} r={3} fill={contorno} />
    <Circle cx={59} cy={34} r={3} fill={contorno} />
    <Path d="M40 62 L60 62 M50 62 L50 66 M44 66 L56 66" fill="none" {...trazo} strokeWidth={2} />
  </G>
);

// Pila de libros. El color es el del libro de abajo.
const libros = (color: string) => (
  <G>
    <Rect x={10} y={66} width={80} height={24} rx={4} fill={color} {...trazo} />
    <Rect x={16} y={72} width={60} height={5} fill={colores.crema} />
    <Rect x={18} y={42} width={68} height={24} rx={4} fill={colores.amarillo} {...trazo} />
    <Rect x={24} y={48} width={50} height={5} fill={colores.crema} />
    <Rect x={14} y={20} width={64} height={22} rx={4} fill={colores.verde} {...trazo} />
    <Rect x={20} y={26} width={46} height={5} fill={colores.crema} />
  </G>
);

// Luna con estrellas. El color es el de la luna.
const luna = (color: string) => (
  <G>
    <Path d="M62 12 C30 14 14 40 24 66 C34 90 66 94 84 76 C58 78 42 54 52 30 C55 22 58 16 62 12 Z" fill={color} {...trazo} />
    <Path d="M80 26 L83 34 L91 34 L85 39 L87 47 L80 42 L73 47 L75 39 L69 34 L77 34 Z" fill={colores.amarillo} {...trazo} strokeWidth={2.5} />
  </G>
);

export const dormitorio: Ambiente = {
  id: 'dormitorio',
  nombre: 'Dormitorio',
  paredes: ['#E6E1F7', '#F9E1E6', '#DDEFE8', '#FFF1CC'],
  fondo,
  arriba: [
    { id: 'ventana', objeto: ventana, paleta: marcos },
    { id: 'cuadro', objeto: cuadro, paleta: marcos },
    { id: 'reloj', objeto: reloj, paleta: marcos },
    { id: 'espejo', objeto: espejo, paleta: marcos },
    { id: 'luna', objeto: luna, paleta: [colores.amarillo, colores.crema], cambiaColor: false },
  ],
  abajo: [
    { id: 'cama', objeto: cama },
    { id: 'osito', objeto: osito, paleta: [colores.marron, colores.naranja, colores.rosa] },
    { id: 'lampara', objeto: lampara },
    { id: 'planta', objeto: planta, paleta: [colores.naranja, colores.rojo, colores.azul] },
    { id: 'libros', objeto: libros, paleta: [colores.rojo, colores.azul, colores.morado] },
    { id: 'gato', objeto: gato, paleta: [colores.naranja, colores.marron, colores.gris], cambiaColor: false },
  ],
};
