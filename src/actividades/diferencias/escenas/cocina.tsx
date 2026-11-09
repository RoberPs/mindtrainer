// Ambiente «Cocina»: pared de azulejos y encimera, con objetos para la pared (fila de arriba) y
// para la encimera (fila de abajo).
import { Circle, Ellipse, G, Line, Path, Rect } from 'react-native-svg';
import type { Ambiente } from '../composicion';
import { colores, contorno, cuadro, estante, reloj, trazo, ventana } from '../objetos';

const fondo = (pared: string) => (
  <G>
    <Rect x={0} y={0} width={300} height={200} fill={pared} />
    {[30, 60, 90, 120].map((y) => (
      <Line key={`h${y}`} x1={0} y1={y} x2={300} y2={y} stroke="#000000" strokeOpacity={0.08} strokeWidth={2} />
    ))}
    {[30, 60, 90, 120, 150, 180, 210, 240, 270].map((x) => (
      <Line key={`v${x}`} x1={x} y1={0} x2={x} y2={140} stroke="#000000" strokeOpacity={0.08} strokeWidth={2} />
    ))}
    <Rect x={0} y={176} width={300} height={24} fill="#D9C7A3" />
    <Rect x={0} y={150} width={300} height={28} fill="#F7F1E6" {...trazo} />
    <Line x1={100} y1={150} x2={100} y2={178} {...trazo} strokeWidth={2.5} />
    <Line x1={200} y1={150} x2={200} y2={178} {...trazo} strokeWidth={2.5} />
    <Rect x={90} y={160} width={6} height={10} rx={2} fill={contorno} />
    <Rect x={104} y={160} width={6} height={10} rx={2} fill={contorno} />
    <Rect x={190} y={160} width={6} height={10} rx={2} fill={contorno} />
    <Rect x={204} y={160} width={6} height={10} rx={2} fill={contorno} />
    <Rect x={0} y={138} width={300} height={13} rx={3} fill="#B07A4A" {...trazo} />
  </G>
);

// Olla con tapa. El color es el del cuerpo.
const olla = (color: string) => (
  <G>
    <Rect x={2} y={44} width={18} height={10} rx={5} fill={colores.gris} {...trazo} />
    <Rect x={80} y={44} width={18} height={10} rx={5} fill={colores.gris} {...trazo} />
    <Rect x={16} y={36} width={68} height={52} rx={10} fill={color} {...trazo} />
    <Rect x={24} y={44} width={8} height={36} rx={4} fill={colores.blanco} fillOpacity={0.4} />
    <Rect x={11} y={26} width={78} height={13} rx={6} fill={color} {...trazo} />
    <Circle cx={50} cy={18} r={7} fill={colores.gris} {...trazo} />
  </G>
);

// Tetera. El color es el del cuerpo.
const tetera = (color: string) => (
  <G>
    <Path d="M24 56 C0 44 2 80 26 76" fill="none" stroke={contorno} strokeWidth={9} strokeLinecap="round" />
    <Path d="M24 56 C0 44 2 80 26 76" fill="none" stroke={colores.gris} strokeWidth={4} strokeLinecap="round" />
    <Path d="M74 56 L96 34 L100 42 L80 74 Z" fill={color} {...trazo} />
    <Circle cx={50} cy={60} r={30} fill={color} {...trazo} />
    <Ellipse cx={50} cy={32} rx={16} ry={7} fill={color} {...trazo} />
    <Circle cx={50} cy={22} r={6} fill={colores.gris} {...trazo} />
    <Path d="M32 54 C32 46 38 42 44 42" fill="none" stroke={colores.blanco} strokeOpacity={0.6} strokeWidth={4} strokeLinecap="round" />
  </G>
);

// Frutero con manzana, naranja y uvas. El color es el del cuenco.
const frutero = (color: string) => (
  <G>
    <Circle cx={34} cy={42} r={17} fill={colores.rojo} {...trazo} />
    <Circle cx={62} cy={38} r={17} fill={colores.naranja} {...trazo} />
    <Circle cx={80} cy={48} r={12} fill={colores.verde} {...trazo} />
    <Path d="M34 26 C34 20 38 18 40 16" fill="none" {...trazo} />
    <Path d="M6 52 L94 52 C92 82 72 94 50 94 C28 94 8 82 6 52 Z" fill={color} {...trazo} />
    <Path d="M20 62 C24 72 30 78 36 80" fill="none" stroke={colores.blanco} strokeOpacity={0.5} strokeWidth={4} strokeLinecap="round" />
  </G>
);

// Tostadora con dos tostadas. El color es el de la carcasa.
const tostadora = (color: string) => (
  <G>
    <Rect x={24} y={22} width={20} height={26} rx={4} fill="#E9B866" {...trazo} />
    <Rect x={54} y={22} width={20} height={26} rx={4} fill="#E9B866" {...trazo} />
    <Rect x={10} y={42} width={80} height={46} rx={12} fill={color} {...trazo} />
    <Rect x={20} y={42} width={60} height={8} rx={4} fill={contorno} />
    <Rect x={82} y={56} width={14} height={9} rx={3} fill={colores.gris} {...trazo} strokeWidth={2.5} />
    <Path d="M20 62 C20 70 22 76 26 80" fill="none" stroke={colores.blanco} strokeOpacity={0.5} strokeWidth={4} strokeLinecap="round" />
  </G>
);

// Tarta con una vela. El color es el del bizcocho.
const tarta = (color: string) => (
  <G>
    <Ellipse cx={50} cy={88} rx={46} ry={8} fill={colores.blanco} {...trazo} />
    <Rect x={47} y={30} width={7} height={22} fill={colores.amarillo} {...trazo} strokeWidth={2.5} />
    <Path d="M50 14 C43 24 45 30 50 30 C55 30 57 24 50 14 Z" fill={colores.naranja} {...trazo} strokeWidth={2.5} />
    <Rect x={16} y={50} width={68} height={38} rx={8} fill={color} {...trazo} />
    <Path d="M16 58 C24 72 32 56 42 68 C50 76 58 56 66 68 C72 74 78 64 84 58 L84 52 L16 52 Z" fill={colores.blanco} {...trazo} strokeWidth={2.5} />
  </G>
);

// Jarra con asa. El color es el del cuerpo.
const jarra = (color: string) => (
  <G>
    <Path d="M70 36 C96 34 96 76 70 74" fill="none" stroke={contorno} strokeWidth={9} strokeLinecap="round" />
    <Path d="M70 36 C96 34 96 76 70 74" fill="none" stroke={color} strokeWidth={4} strokeLinecap="round" />
    <Rect x={20} y={20} width={52} height={72} rx={8} fill={color} {...trazo} />
    <Rect x={16} y={14} width={60} height={11} rx={4} fill={color} {...trazo} />
    <Rect x={28} y={34} width={8} height={48} rx={4} fill={colores.blanco} fillOpacity={0.4} />
  </G>
);

// Sartén colgada. El color es el del mango.
const sarten = (color: string) => (
  <G>
    <Rect x={62} y={44} width={34} height={13} rx={6} fill={color} {...trazo} />
    <Circle cx={90} cy={50} r={3} fill={colores.blanco} />
    <Circle cx={38} cy={50} r={32} fill="#555555" {...trazo} />
    <Circle cx={38} cy={50} r={24} fill="#7A7A7A" />
    <Path d="M20 40 C24 32 30 28 36 26" fill="none" stroke={colores.blanco} strokeOpacity={0.5} strokeWidth={4} strokeLinecap="round" />
  </G>
);

const marcos = [colores.marron, colores.azulOscuro, colores.rojo, colores.verde];

export const cocina: Ambiente = {
  id: 'cocina',
  nombre: 'Cocina',
  paredes: ['#E3F3F1', '#FCEFC9', '#E7E3F6', '#FBE2DA'],
  fondo,
  arriba: [
    { id: 'ventana', objeto: ventana, paleta: marcos },
    { id: 'estante', objeto: estante, paleta: [colores.marron, colores.azulOscuro] },
    { id: 'reloj', objeto: reloj, paleta: marcos },
    { id: 'cuadro', objeto: cuadro, paleta: marcos },
    { id: 'sarten', objeto: sarten },
  ],
  abajo: [
    { id: 'olla', objeto: olla },
    { id: 'tetera', objeto: tetera },
    { id: 'frutero', objeto: frutero, paleta: [colores.marron, colores.azul, colores.rojo] },
    { id: 'tostadora', objeto: tostadora },
    { id: 'tarta', objeto: tarta, paleta: [colores.marron, colores.rosa, colores.amarillo] },
    { id: 'jarra', objeto: jarra },
  ],
};
