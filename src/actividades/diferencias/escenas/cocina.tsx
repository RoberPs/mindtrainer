// Escena «Cocina»: olla (cambia de color), frutero (falta) y tetera (sobra).
import { Circle, Ellipse, G, Line, Path, Rect } from 'react-native-svg';
import { cambioColor, cambioFalta, cambioSobra, comun, type Escena } from '../escena';
import { colores, contorno, trazo, ventana } from '../objetos';

// Pared de azulejos, encimera con mueble, hornillo y suelo.
const fondo = () => (
  <G>
    <Rect x={0} y={0} width={300} height={200} fill="#E3F3F1" />
    {[30, 60, 90, 120].map((y) => (
      <Line key={`h${y}`} x1={0} y1={y} x2={300} y2={y} stroke="#C5E0DC" strokeWidth={2} />
    ))}
    {[30, 60, 90, 120, 150, 180, 210, 240, 270].map((x) => (
      <Line key={`v${x}`} x1={x} y1={0} x2={x} y2={128} stroke="#C5E0DC" strokeWidth={2} />
    ))}
    <Rect x={0} y={170} width={300} height={30} fill="#D9C7A3" />
    <Rect x={60} y={138} width={240} height={34} fill="#F7F1E6" {...trazo} />
    <Line x1={130} y1={138} x2={130} y2={172} {...trazo} strokeWidth={2.5} />
    <Line x1={200} y1={138} x2={200} y2={172} {...trazo} strokeWidth={2.5} />
    <Rect x={120} y={152} width={6} height={10} rx={2} fill={contorno} />
    <Rect x={134} y={152} width={6} height={10} rx={2} fill={contorno} />
    <Rect x={60} y={126} width={240} height={13} rx={3} fill="#B07A4A" {...trazo} />
    <Rect x={88} y={121} width={54} height={6} rx={3} fill="#5A5A5A" {...trazo} strokeWidth={2.5} />
  </G>
);

// Olla con tapa. `color` es el del cuerpo.
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

// Tetera. `color` es el del cuerpo.
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

// Frutero con manzana, naranja y uvas. `color` es el del cuenco.
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

// Nevera. `color` es el de la puerta.
const nevera = (color: string) => (
  <G>
    <Rect x={26} y={2} width={48} height={96} rx={6} fill={color} {...trazo} />
    <Line x1={26} y1={36} x2={74} y2={36} {...trazo} />
    <Rect x={63} y={12} width={5} height={16} rx={2} fill={colores.gris} {...trazo} strokeWidth={2.5} />
    <Rect x={63} y={44} width={5} height={26} rx={2} fill={colores.gris} {...trazo} strokeWidth={2.5} />
    <Rect x={32} y={10} width={5} height={20} rx={2.5} fill={colores.blanco} fillOpacity={0.45} />
    <Rect x={32} y={44} width={5} height={46} rx={2.5} fill={colores.blanco} fillOpacity={0.45} />
  </G>
);

// Estante con tarros. `color` es el de la tabla.
const estante = (color: string) => (
  <G>
    <Rect x={14} y={28} width={16} height={32} rx={4} fill={colores.crema} {...trazo} />
    <Rect x={14} y={24} width={16} height={7} rx={2} fill={colores.rojo} {...trazo} strokeWidth={2.5} />
    <Rect x={38} y={20} width={20} height={40} rx={4} fill={colores.crema} {...trazo} />
    <Rect x={38} y={16} width={20} height={7} rx={2} fill={colores.verde} {...trazo} strokeWidth={2.5} />
    <Rect x={66} y={32} width={16} height={28} rx={4} fill={colores.crema} {...trazo} />
    <Rect x={66} y={28} width={16} height={7} rx={2} fill={colores.amarillo} {...trazo} strokeWidth={2.5} />
    <Rect x={6} y={58} width={88} height={9} rx={3} fill={color} {...trazo} />
  </G>
);

export const cocina: Escena = {
  id: 'cocina',
  nombre: 'Cocina',
  fondo,
  comunes: [
    comun('nevera', nevera, 0.14, 0.5, 0.76, colores.azul),
    comun('estante', estante, 0.4, 0.3, 0.34, colores.marron),
    comun('ventana', ventana, 0.7, 0.24, 0.36, colores.marron),
  ],
  cambios: [
    cambioColor('olla', olla, 0.35, 0.5, 0.34, colores.naranja, colores.azul),
    cambioFalta('frutero', frutero, 0.87, 0.5, 0.3, colores.marron),
    cambioSobra('tetera', tetera, 0.62, 0.5, 0.3, colores.rosa),
  ],
};
