// Escena «Jardín»: flor (cambia de color), sol (falta) y mariposa (sobra).
import { Circle, Ellipse, G, Line, Path, Polygon, Rect } from 'react-native-svg';
import { cambioColor, cambioFalta, cambioSobra, comun, type Escena } from '../escena';
import { colores, contorno, trazo } from '../objetos';

// Cielo, colinas, césped y camino.
const fondo = () => (
  <G>
    <Rect x={0} y={0} width={300} height={200} fill="#BFE8FB" />
    <Path d="M0 120 C50 86 110 90 160 112 C210 90 260 92 300 116 L300 200 L0 200 Z" fill="#9ED98C" />
    <Rect x={0} y={134} width={300} height={66} fill="#6CC070" />
    <Path d="M120 200 C130 172 150 156 168 140 L196 140 C186 160 190 180 204 200 Z" fill="#E8C98E" {...trazo} strokeWidth={2.5} />
  </G>
);

// Casa con tejado. `color` es el del tejado.
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

// Árbol con manzanas. `color` es el de la copa.
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

// Sol con rayos y cara sonriente. `color` es el del disco.
const sol = (color: string) => (
  <G>
    {Array.from({ length: 8 }, (_, k) => {
      const a = (k * Math.PI) / 4;
      return (
        <Line
          key={k}
          x1={50 + Math.cos(a) * 31}
          y1={50 + Math.sin(a) * 31}
          x2={50 + Math.cos(a) * 45}
          y2={50 + Math.sin(a) * 45}
          stroke={contorno}
          strokeWidth={7}
          strokeLinecap="round"
        />
      );
    })}
    {Array.from({ length: 8 }, (_, k) => {
      const a = (k * Math.PI) / 4;
      return (
        <Line
          key={`c${k}`}
          x1={50 + Math.cos(a) * 31}
          y1={50 + Math.sin(a) * 31}
          x2={50 + Math.cos(a) * 45}
          y2={50 + Math.sin(a) * 45}
          stroke={color}
          strokeWidth={3}
          strokeLinecap="round"
        />
      );
    })}
    <Circle cx={50} cy={50} r={26} fill={color} {...trazo} />
    <Circle cx={41} cy={45} r={3.5} fill={contorno} />
    <Circle cx={59} cy={45} r={3.5} fill={contorno} />
    <Path d="M38 56 C44 66 56 66 62 56" fill="none" {...trazo} strokeWidth={3} />
  </G>
);

// Flor grande con tallo y hojas. `color` es el de los pétalos.
const flor = (color: string) => (
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

// Mariposa con las alas abiertas. `color` es el de las alas.
const mariposa = (color: string) => (
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

// Nube. `color` es el de la nube.
const nube = (color: string) => (
  <G>
    <Circle cx={30} cy={58} r={20} fill={color} {...trazo} />
    <Circle cx={54} cy={46} r={26} fill={color} {...trazo} />
    <Circle cx={74} cy={60} r={18} fill={color} {...trazo} />
    <Rect x={26} y={54} width={50} height={24} fill={color} />
    <Path d="M14 78 L88 78" stroke={contorno} strokeWidth={3.5} strokeLinecap="round" />
  </G>
);

export const jardin: Escena = {
  id: 'jardin',
  nombre: 'Jardín',
  fondo,
  comunes: [
    comun('nube-izquierda', nube, 0.14, 0.14, 0.26, colores.blanco),
    comun('nube-derecha', nube, 0.84, 0.12, 0.22, colores.blanco),
    comun('casa', casa, 0.2, 0.52, 0.56, colores.rojo),
    comun('arbol', arbol, 0.88, 0.52, 0.5, colores.verde),
  ],
  cambios: [
    cambioColor('flor', flor, 0.5, 0.76, 0.34, colores.amarillo, colores.morado),
    cambioFalta('sol', sol, 0.41, 0.16, 0.3, colores.amarillo),
    cambioSobra('mariposa', mariposa, 0.67, 0.34, 0.3, colores.rosa),
  ],
};
