// Ambiente «Playa»: cielo, mar y arena, con objetos para el cielo (fila de arriba) y para la
// arena (fila de abajo).
import { Circle, Ellipse, G, Line, Path, Polygon, Rect } from 'react-native-svg';
import type { Ambiente } from '../composicion';
import { colores, contorno, trazo } from '../objetos';
import { globo, nube, pajaro, sol } from './jardin';

const fondo = (cielo: string) => (
  <G>
    <Rect x={0} y={0} width={300} height={200} fill={cielo} />
    <Rect x={0} y={90} width={300} height={50} fill="#3EA4DC" />
    <Path d="M0 96 C20 90 40 102 60 96 C80 90 100 102 120 96 C140 90 160 102 180 96 C200 90 220 102 240 96 C260 90 280 102 300 96" fill="none" stroke={colores.blanco} strokeWidth={4} strokeLinecap="round" />
    <Path d="M0 138 C60 128 120 136 180 130 C230 126 270 132 300 130 L300 200 L0 200 Z" fill="#F4DDA4" />
  </G>
);

// Sombrilla clavada en la arena. El color es el de la tela.
const sombrilla = (color: string) => (
  <G>
    <Line x1={50} y1={34} x2={50} y2={96} stroke={contorno} strokeWidth={8} strokeLinecap="round" />
    <Line x1={50} y1={34} x2={50} y2={96} stroke={colores.gris} strokeWidth={3} strokeLinecap="round" />
    <Path d="M6 48 C6 14 94 14 94 48 Z" fill={color} {...trazo} />
    <Path d="M36 48 C34 30 40 20 50 18 C60 20 66 30 64 48" fill={colores.blanco} fillOpacity={0.6} />
    <Path d="M6 48 C14 56 24 56 28 48 C34 56 44 56 50 48 C56 56 66 56 72 48 C76 56 86 56 94 48" fill={color} {...trazo} />
  </G>
);

// Cubo de playa con una pala. El color es el del cubo.
const cubo = (color: string) => (
  <G>
    <Line x1={76} y1={14} x2={62} y2={72} {...trazo} stroke={colores.rojo} strokeWidth={6} />
    <Rect x={68} y={6} width={18} height={16} rx={3} fill={colores.rojo} {...trazo} />
    <Path d="M16 40 L84 40 L74 92 L26 92 Z" fill={color} {...trazo} />
    <Ellipse cx={50} cy={40} rx={34} ry={7} fill={colores.crema} {...trazo} />
    <Path d="M20 40 C24 18 76 18 80 40" fill="none" {...trazo} strokeWidth={3} />
    <Path d="M32 54 L36 82" stroke={colores.blanco} strokeOpacity={0.5} strokeWidth={4} strokeLinecap="round" />
  </G>
);

// Cangrejo. El color es el del caparazón.
const cangrejo = (color: string) => (
  <G>
    <Line x1={26} y1={66} x2={10} y2={84} {...trazo} />
    <Line x1={36} y1={72} x2={26} y2={92} {...trazo} />
    <Line x1={74} y1={66} x2={90} y2={84} {...trazo} />
    <Line x1={64} y1={72} x2={74} y2={92} {...trazo} />
    <Line x1={22} y1={50} x2={14} y2={30} {...trazo} />
    <Circle cx={12} cy={24} r={11} fill={color} {...trazo} />
    <Line x1={78} y1={50} x2={86} y2={30} {...trazo} />
    <Circle cx={88} cy={24} r={11} fill={color} {...trazo} />
    <Ellipse cx={50} cy={62} rx={32} ry={22} fill={color} {...trazo} />
    <Line x1={40} y1={42} x2={40} y2={34} {...trazo} />
    <Line x1={60} y1={42} x2={60} y2={34} {...trazo} />
    <Circle cx={40} cy={32} r={5} fill={colores.blanco} {...trazo} strokeWidth={2.5} />
    <Circle cx={60} cy={32} r={5} fill={colores.blanco} {...trazo} strokeWidth={2.5} />
    <Path d="M40 66 C46 72 54 72 60 66" fill="none" {...trazo} strokeWidth={2.5} />
  </G>
);

// Velero. El color es el de la vela.
const velero = (color: string) => (
  <G>
    <Line x1={50} y1={10} x2={50} y2={72} {...trazo} />
    <Polygon points="54,12 90,66 54,66" fill={color} {...trazo} />
    <Polygon points="46,24 46,66 14,66" fill={colores.blanco} {...trazo} />
    <Path d="M10 70 L90 70 C86 88 76 92 66 92 L34 92 C24 92 14 88 10 70 Z" fill={colores.marron} {...trazo} />
    <Circle cx={30} cy={80} r={4} fill={colores.crema} {...trazo} strokeWidth={2.5} />
    <Circle cx={50} cy={80} r={4} fill={colores.crema} {...trazo} strokeWidth={2.5} />
  </G>
);

// Helado de dos bolas. El color es el de la bola de arriba.
const helado = (color: string) => (
  <G>
    <Polygon points="28,56 72,56 50,96" fill="#E8B86A" {...trazo} />
    <Line x1={36} y1={64} x2={58} y2={64} stroke={contorno} strokeOpacity={0.4} strokeWidth={2.5} />
    <Circle cx={50} cy={46} r={22} fill={colores.crema} {...trazo} />
    <Circle cx={50} cy={26} r={20} fill={color} {...trazo} />
    <Circle cx={56} cy={6} r={7} fill={colores.rojo} {...trazo} strokeWidth={2.5} />
  </G>
);

export const playa: Ambiente = {
  id: 'playa',
  nombre: 'Playa',
  paredes: ['#BFE8FB', '#FFE3B8', '#D7EEF5'],
  fondo,
  arriba: [
    { id: 'sol', objeto: sol, paleta: [colores.amarillo, colores.naranja], cambiaColor: false },
    { id: 'nube', objeto: nube, paleta: [colores.blanco], cambiaColor: false },
    { id: 'pajaro', objeto: pajaro, paleta: [colores.azul, colores.rojo, colores.naranja] },
    { id: 'globo', objeto: globo },
  ],
  abajo: [
    { id: 'sombrilla', objeto: sombrilla },
    { id: 'cubo', objeto: cubo },
    { id: 'cangrejo', objeto: cangrejo, paleta: [colores.rojo, colores.naranja], cambiaColor: false },
    { id: 'velero', objeto: velero },
    { id: 'helado', objeto: helado, paleta: [colores.rosa, colores.marron, colores.verde] },
  ],
};
