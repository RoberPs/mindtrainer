// Ambiente «Granja»: cielo, campo y valla, con objetos para el cielo (fila de arriba) y para el
// campo (fila de abajo).
import { Circle, Ellipse, G, Line, Path, Polygon, Rect } from 'react-native-svg';
import type { Ambiente } from '../composicion';
import { colores, contorno, trazo } from '../objetos';
import { mariposa, nube, pajaro, sol } from './jardin';

const fondo = (cielo: string) => (
  <G>
    <Rect x={0} y={0} width={300} height={200} fill={cielo} />
    <Path d="M0 124 C60 96 120 100 180 118 C230 100 270 104 300 118 L300 200 L0 200 Z" fill="#A9DC8A" />
    <Rect x={0} y={140} width={300} height={60} fill="#7CC76A" />
    <Rect x={0} y={146} width={300} height={6} fill={colores.crema} {...trazo} strokeWidth={2.5} />
    <Rect x={0} y={158} width={300} height={6} fill={colores.crema} {...trazo} strokeWidth={2.5} />
    {[20, 80, 140, 200, 260].map((x) => (
      <Rect key={x} x={x} y={140} width={8} height={30} rx={2} fill={colores.crema} {...trazo} strokeWidth={2.5} />
    ))}
  </G>
);

// Vaca con manchas. El color es el de las manchas.
const vaca = (color: string) => (
  <G>
    <Rect x={20} y={74} width={8} height={20} fill={colores.crema} {...trazo} />
    <Rect x={64} y={74} width={8} height={20} fill={colores.crema} {...trazo} />
    <Path d="M80 52 C94 54 98 66 92 74" fill="none" stroke={contorno} strokeWidth={5} strokeLinecap="round" />
    <Ellipse cx={46} cy={58} rx={36} ry={22} fill={colores.crema} {...trazo} />
    <Ellipse cx={36} cy={52} rx={9} ry={7} fill={color} />
    <Ellipse cx={58} cy={64} rx={10} ry={7} fill={color} />
    <Rect x={8} y={26} width={30} height={26} rx={10} fill={colores.crema} {...trazo} />
    <Ellipse cx={22} cy={46} rx={10} ry={7} fill={colores.rosa} {...trazo} strokeWidth={2.5} />
    <Circle cx={16} cy={36} r={3} fill={contorno} />
    <Circle cx={28} cy={36} r={3} fill={contorno} />
    <Polygon points="10,28 6,18 16,26" fill={colores.amarillo} {...trazo} strokeWidth={2.5} />
    <Polygon points="36,28 40,18 30,26" fill={colores.amarillo} {...trazo} strokeWidth={2.5} />
  </G>
);

// Cerdito. El color es el del cuerpo.
const cerdo = (color: string) => (
  <G>
    <Rect x={26} y={68} width={9} height={22} fill={color} {...trazo} />
    <Rect x={62} y={68} width={9} height={22} fill={color} {...trazo} />
    <Path d="M86 46 C98 44 98 56 90 54 C84 52 94 62 86 60" fill="none" stroke={contorno} strokeWidth={4} strokeLinecap="round" />
    <Ellipse cx={52} cy={54} rx={36} ry={26} fill={color} {...trazo} />
    <Polygon points="18,34 22,16 34,30" fill={color} {...trazo} />
    <Circle cx={26} cy={50} r={18} fill={color} {...trazo} />
    <Ellipse cx={14} cy={56} rx={10} ry={8} fill={colores.rosa} {...trazo} strokeWidth={2.5} />
    <Circle cx={11} cy={56} r={2} fill={contorno} />
    <Circle cx={18} cy={56} r={2} fill={contorno} />
    <Circle cx={22} cy={44} r={3} fill={contorno} />
  </G>
);

// Gallina. El color es el del plumaje.
const gallina = (color: string) => (
  <G>
    <Line x1={44} y1={78} x2={44} y2={94} {...trazo} stroke={colores.naranja} />
    <Line x1={60} y1={78} x2={60} y2={94} {...trazo} stroke={colores.naranja} />
    <Polygon points="76,50 98,32 96,64" fill={color} {...trazo} />
    <Ellipse cx={54} cy={60} rx={30} ry={26} fill={color} {...trazo} />
    <Ellipse cx={58} cy={62} rx={15} ry={12} fill={contorno} fillOpacity={0.2} transform="rotate(20 58 62)" />
    <Circle cx={30} cy={36} r={17} fill={color} {...trazo} />
    <Path d="M24 22 C22 12 30 10 32 16 C34 8 42 10 38 22" fill={colores.rojo} {...trazo} strokeWidth={2.5} />
    <Polygon points="14,34 2,40 14,44" fill={colores.naranja} {...trazo} strokeWidth={2.5} />
    <Circle cx={28} cy={33} r={3} fill={contorno} />
  </G>
);

// Granero. El color es el de las paredes.
const granero = (color: string) => (
  <G>
    <Polygon points="6,50 50,10 94,50 94,94 6,94" fill={color} {...trazo} />
    <Polygon points="6,50 50,10 94,50 86,50 50,20 14,50" fill={colores.crema} {...trazo} strokeWidth={2.5} />
    <Rect x={30} y={56} width={40} height={38} fill={colores.crema} {...trazo} />
    <Line x1={30} y1={56} x2={70} y2={94} {...trazo} strokeWidth={2.5} />
    <Line x1={70} y1={56} x2={30} y2={94} {...trazo} strokeWidth={2.5} />
    <Circle cx={50} cy={36} r={6} fill={colores.crema} {...trazo} strokeWidth={2.5} />
  </G>
);

// Girasol grande. El color es el de los pétalos.
const girasol = (color: string) => (
  <G>
    <Path d="M50 50 C48 70 52 84 50 98" fill="none" stroke={contorno} strokeWidth={9} strokeLinecap="round" />
    <Path d="M50 50 C48 70 52 84 50 98" fill="none" stroke={colores.verde} strokeWidth={4} strokeLinecap="round" />
    <Path d="M50 80 C34 80 24 70 22 60 C36 60 46 66 50 80 Z" fill={colores.verde} {...trazo} />
    {Array.from({ length: 10 }, (_, k) => {
      const a = (k * Math.PI) / 5;
      return <Ellipse key={k} cx={50 + Math.cos(a) * 26} cy={30 + Math.sin(a) * 26} rx={9} ry={12} fill={color} {...trazo} strokeWidth={2.5} transform={`rotate(${(a * 180) / Math.PI + 90} ${50 + Math.cos(a) * 26} ${30 + Math.sin(a) * 26})`} />;
    })}
    <Circle cx={50} cy={30} r={17} fill={colores.marron} {...trazo} />
  </G>
);

export const granja: Ambiente = {
  id: 'granja',
  nombre: 'Granja',
  paredes: ['#BFE8FB', '#FFE9B8', '#D9D7F7'],
  fondo,
  arriba: [
    { id: 'sol', objeto: sol, paleta: [colores.amarillo, colores.naranja], cambiaColor: false },
    { id: 'nube', objeto: nube, paleta: [colores.blanco], cambiaColor: false },
    { id: 'pajaro', objeto: pajaro, paleta: [colores.azul, colores.rojo, colores.naranja] },
    { id: 'mariposa', objeto: mariposa },
  ],
  abajo: [
    { id: 'vaca', objeto: vaca, paleta: [colores.marron, contorno], cambiaColor: false },
    { id: 'cerdo', objeto: cerdo, paleta: [colores.rosa], cambiaColor: false },
    { id: 'gallina', objeto: gallina, paleta: [colores.naranja, colores.marron, colores.blanco], cambiaColor: false },
    { id: 'granero', objeto: granero },
    { id: 'girasol', objeto: girasol, paleta: [colores.amarillo, colores.naranja] },
  ],
};
