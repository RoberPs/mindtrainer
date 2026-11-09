// Ambiente «Jardín»: cielo, colinas, césped y camino, con objetos para el cielo (fila de arriba)
// y para el césped (fila de abajo).
import { Circle, Ellipse, G, Line, Path, Polygon, Rect } from 'react-native-svg';
import type { Ambiente } from '../composicion';
import { colores, contorno, trazo } from '../objetos';

const fondo = (cielo: string) => (
  <G>
    <Rect x={0} y={0} width={300} height={200} fill={cielo} />
    <Path d="M0 120 C50 86 110 90 160 112 C210 90 260 92 300 116 L300 200 L0 200 Z" fill="#9ED98C" />
    <Rect x={0} y={134} width={300} height={66} fill="#6CC070" />
    <Path d="M120 200 C130 172 150 156 168 140 L196 140 C186 160 190 180 204 200 Z" fill="#E8C98E" {...trazo} strokeWidth={2.5} />
  </G>
);

// Casa con tejado. El color es el del tejado.
const casa = (color: string) => (
  <G>
    <Rect x={66} y={14} width={11} height={22} fill={colores.gris} {...trazo} />
    <Rect x={14} y={44} width={72} height={52} fill={colores.crema} {...trazo} />
    <Polygon points="6,48 50,10 94,48" fill={color} {...trazo} />
    <Rect x={42} y={62} width={16} height={34} rx={2} fill={colores.marron} {...trazo} />
    <Rect x={20} y={58} width={17} height={17} fill={colores.cielo} {...trazo} />
    <Rect x={63} y={58} width={17} height={17} fill={colores.cielo} {...trazo} />
  </G>
);

// Árbol con manzanas. El color es el de la copa.
const arbol = (color: string) => (
  <G>
    <Rect x={42} y={56} width={16} height={42} fill={colores.marron} {...trazo} />
    <Circle cx={28} cy={50} r={20} fill={color} {...trazo} />
    <Circle cx={72} cy={50} r={20} fill={color} {...trazo} />
    <Circle cx={50} cy={32} r={27} fill={color} {...trazo} />
    <Circle cx={40} cy={30} r={5} fill={colores.rojo} {...trazo} strokeWidth={2.5} />
    <Circle cx={60} cy={42} r={5} fill={colores.rojo} {...trazo} strokeWidth={2.5} />
    <Circle cx={28} cy={52} r={5} fill={colores.rojo} {...trazo} strokeWidth={2.5} />
  </G>
);

const rayos = (color: string, grosorRayo: number, desde: number, hasta: number) =>
  Array.from({ length: 8 }, (_, k) => {
    const a = (k * Math.PI) / 4;
    return (
      <Line
        key={`${grosorRayo}-${k}`}
        x1={50 + Math.cos(a) * desde}
        y1={50 + Math.sin(a) * desde}
        x2={50 + Math.cos(a) * hasta}
        y2={50 + Math.sin(a) * hasta}
        stroke={color}
        strokeWidth={grosorRayo}
        strokeLinecap="round"
      />
    );
  });

// Sol con rayos y cara sonriente. El color es el del disco.
export const sol = (color: string) => (
  <G>
    {rayos(contorno, 7, 31, 45)}
    {rayos(color, 3, 31, 45)}
    <Circle cx={50} cy={50} r={26} fill={color} {...trazo} />
    <Circle cx={41} cy={45} r={3.5} fill={contorno} />
    <Circle cx={59} cy={45} r={3.5} fill={contorno} />
    <Path d="M38 56 C44 66 56 66 62 56" fill="none" {...trazo} strokeWidth={3} />
  </G>
);

// Flor grande con tallo y hojas. El color es el de los pétalos.
export const flor = (color: string) => (
  <G>
    <Path d="M50 52 C48 70 52 84 50 98" fill="none" stroke={contorno} strokeWidth={9} strokeLinecap="round" />
    <Path d="M50 52 C48 70 52 84 50 98" fill="none" stroke={colores.verde} strokeWidth={4} strokeLinecap="round" />
    <Path d="M50 80 C34 80 24 70 22 60 C36 60 46 66 50 80 Z" fill={colores.verde} {...trazo} />
    <Path d="M50 74 C66 74 76 64 78 54 C64 54 54 60 50 74 Z" fill={colores.verde} {...trazo} />
    {Array.from({ length: 6 }, (_, k) => {
      const a = (k * Math.PI) / 3 - Math.PI / 2;
      return <Circle key={k} cx={50 + Math.cos(a) * 21} cy={32 + Math.sin(a) * 21} r={14} fill={color} {...trazo} />;
    })}
    <Circle cx={50} cy={32} r={13} fill={colores.naranja} {...trazo} />
  </G>
);

// Mariposa con las alas abiertas. El color es el de las alas.
export const mariposa = (color: string) => (
  <G>
    <Ellipse cx={28} cy={36} rx={24} ry={20} fill={color} {...trazo} transform="rotate(-25 28 36)" />
    <Ellipse cx={72} cy={36} rx={24} ry={20} fill={color} {...trazo} transform="rotate(25 72 36)" />
    <Ellipse cx={32} cy={66} rx={16} ry={14} fill={color} {...trazo} transform="rotate(20 32 66)" />
    <Ellipse cx={68} cy={66} rx={16} ry={14} fill={color} {...trazo} transform="rotate(-20 68 66)" />
    <Circle cx={26} cy={34} r={6} fill={colores.blanco} />
    <Circle cx={74} cy={34} r={6} fill={colores.blanco} />
    <Ellipse cx={50} cy={50} rx={6} ry={28} fill={contorno} />
    <Line x1={48} y1={22} x2={40} y2={8} {...trazo} strokeWidth={2.5} />
    <Line x1={52} y1={22} x2={60} y2={8} {...trazo} strokeWidth={2.5} />
  </G>
);

// Nube. El color es el de la nube.
export const nube = (color: string) => (
  <G>
    <Circle cx={30} cy={58} r={20} fill={color} {...trazo} />
    <Circle cx={54} cy={46} r={26} fill={color} {...trazo} />
    <Circle cx={74} cy={60} r={18} fill={color} {...trazo} />
    <Rect x={26} y={54} width={50} height={24} fill={color} />
    <Path d="M14 78 L88 78" stroke={contorno} strokeWidth={3.5} strokeLinecap="round" />
  </G>
);

// Pájaro posado. El color es el del plumaje.
export const pajaro = (color: string) => (
  <G>
    <Polygon points="24,52 2,40 6,66" fill={color} {...trazo} />
    <Line x1={44} y1={78} x2={44} y2={92} {...trazo} />
    <Line x1={58} y1={78} x2={58} y2={92} {...trazo} />
    <Ellipse cx={48} cy={58} rx={30} ry={24} fill={color} {...trazo} />
    <Ellipse cx={42} cy={60} rx={16} ry={10} fill={contorno} fillOpacity={0.25} transform="rotate(-15 42 60)" />
    <Circle cx={74} cy={38} r={16} fill={color} {...trazo} />
    <Polygon points="87,35 100,41 87,46" fill={colores.naranja} {...trazo} strokeWidth={2.5} />
    <Circle cx={77} cy={34} r={3.5} fill={contorno} />
  </G>
);

// Globo con cuerda. El color es el del globo.
export const globo = (color: string) => (
  <G>
    <Path d="M50 80 C40 88 60 92 50 98" fill="none" {...trazo} strokeWidth={2.5} />
    <Ellipse cx={50} cy={40} rx={28} ry={34} fill={color} {...trazo} />
    <Polygon points="45,74 55,74 50,81" fill={color} {...trazo} strokeWidth={2.5} />
    <Ellipse cx={38} cy={28} rx={6} ry={10} fill={colores.blanco} fillOpacity={0.55} transform="rotate(20 38 28)" />
  </G>
);

// Seta con lunares. El color es el del sombrero.
const seta = (color: string) => (
  <G>
    <Path d="M34 54 L66 54 L62 94 L38 94 Z" fill={colores.crema} {...trazo} />
    <Path d="M10 58 C10 14 90 14 90 58 Z" fill={color} {...trazo} />
    <Circle cx={32} cy={40} r={6} fill={colores.blanco} />
    <Circle cx={54} cy={28} r={7} fill={colores.blanco} />
    <Circle cx={70} cy={44} r={5} fill={colores.blanco} />
  </G>
);

// Buzón con bandera. El color es el del buzón.
const buzon = (color: string) => (
  <G>
    <Rect x={44} y={54} width={12} height={42} fill={colores.marron} {...trazo} />
    <Rect x={74} y={8} width={6} height={30} fill={colores.gris} {...trazo} strokeWidth={2.5} />
    <Rect x={66} y={8} width={14} height={10} fill={colores.amarillo} {...trazo} strokeWidth={2.5} />
    <Rect x={16} y={22} width={68} height={38} rx={16} fill={color} {...trazo} />
    <Line x1={30} y1={40} x2={60} y2={40} {...trazo} />
  </G>
);

export const jardin: Ambiente = {
  id: 'jardin',
  nombre: 'Jardín',
  paredes: ['#BFE8FB', '#FFE9B8', '#D9D7F7'],
  fondo,
  arriba: [
    { id: 'sol', objeto: sol, paleta: [colores.amarillo, colores.naranja], cambiaColor: false },
    { id: 'nube', objeto: nube, paleta: [colores.blanco], cambiaColor: false },
    { id: 'mariposa', objeto: mariposa },
    { id: 'pajaro', objeto: pajaro, paleta: [colores.azul, colores.rojo, colores.naranja] },
    { id: 'globo', objeto: globo },
  ],
  abajo: [
    { id: 'casa', objeto: casa },
    { id: 'arbol', objeto: arbol, paleta: [colores.verde], cambiaColor: false },
    { id: 'flor', objeto: flor },
    { id: 'seta', objeto: seta, paleta: [colores.rojo, colores.naranja] },
    { id: 'buzon', objeto: buzon },
  ],
};
