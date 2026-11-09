// Ambiente «Salón»: pared y suelo de madera, con objetos para la pared (fila de arriba) y para el
// suelo (fila de abajo). Algunos objetos se exportan porque los usan también otros ambientes.
import { Circle, Ellipse, G, Line, Path, Polygon, Rect } from 'react-native-svg';
import type { Ambiente } from '../composicion';
import { colores, contorno, cuadro, estante, planta, reloj, trazo, ventana } from '../objetos';

export const marcos = [colores.marron, colores.azulOscuro, colores.rojo, colores.verde];

const fondo = (pared: string) => (
  <G>
    <Rect x={0} y={0} width={300} height={200} fill={pared} />
    <Rect x={0} y={150} width={300} height={50} fill="#D9A066" />
    <Line x1={0} y1={168} x2={300} y2={168} stroke="#B87D45" strokeWidth={2} />
    <Line x1={0} y1={186} x2={300} y2={186} stroke="#B87D45" strokeWidth={2} />
    <Rect x={0} y={144} width={300} height={8} fill="#FFFFFF" {...trazo} />
  </G>
);

// Sofá de tres plazas. El color es el de la tela.
const sofa = (color: string) => (
  <G>
    <Rect x={14} y={14} width={72} height={48} rx={14} fill={color} {...trazo} />
    <Rect x={2} y={40} width={22} height={40} rx={10} fill={color} {...trazo} />
    <Rect x={76} y={40} width={22} height={40} rx={10} fill={color} {...trazo} />
    <Rect x={20} y={46} width={60} height={30} rx={8} fill={color} {...trazo} />
    <Rect x={20} y={46} width={60} height={30} rx={8} fill={colores.blanco} fillOpacity={0.28} />
    <Line x1={50} y1={48} x2={50} y2={74} {...trazo} />
    <Rect x={10} y={82} width={9} height={11} rx={3} fill={contorno} />
    <Rect x={81} y={82} width={9} height={11} rx={3} fill={contorno} />
  </G>
);

// Gato sentado. El color es el del pelo.
export const gato = (color: string) => (
  <G>
    <Path d="M70 84 C96 86 98 56 84 52" fill="none" stroke={contorno} strokeWidth={9} strokeLinecap="round" />
    <Path d="M70 84 C96 86 98 56 84 52" fill="none" stroke={color} strokeWidth={4} strokeLinecap="round" />
    <Ellipse cx={50} cy={68} rx={26} ry={26} fill={color} {...trazo} />
    <Ellipse cx={50} cy={78} rx={14} ry={14} fill={colores.crema} />
    <Polygon points="30,26 28,4 46,16" fill={color} {...trazo} />
    <Polygon points="70,26 72,4 54,16" fill={color} {...trazo} />
    <Circle cx={50} cy={34} r={21} fill={color} {...trazo} />
    <Circle cx={42} cy={32} r={3.5} fill={contorno} />
    <Circle cx={58} cy={32} r={3.5} fill={contorno} />
    <Polygon points="46,40 54,40 50,45" fill="#F06292" {...trazo} strokeWidth={2} />
    <Line x1={32} y1={40} x2={20} y2={38} {...trazo} strokeWidth={2} />
    <Line x1={32} y1={44} x2={20} y2={47} {...trazo} strokeWidth={2} />
    <Line x1={68} y1={40} x2={80} y2={38} {...trazo} strokeWidth={2} />
    <Line x1={68} y1={44} x2={80} y2={47} {...trazo} strokeWidth={2} />
  </G>
);

// Perro sentado con las orejas caídas. El color es el del pelo.
export const perro = (color: string) => (
  <G>
    <Path d="M72 84 C94 84 98 62 90 52" fill="none" stroke={contorno} strokeWidth={9} strokeLinecap="round" />
    <Path d="M72 84 C94 84 98 62 90 52" fill="none" stroke={color} strokeWidth={4} strokeLinecap="round" />
    <Ellipse cx={50} cy={70} rx={26} ry={26} fill={color} {...trazo} />
    <Ellipse cx={50} cy={80} rx={14} ry={13} fill={colores.crema} />
    <Circle cx={50} cy={36} r={22} fill={color} {...trazo} />
    <Ellipse cx={26} cy={42} rx={9} ry={16} fill={color} {...trazo} />
    <Ellipse cx={26} cy={42} rx={9} ry={16} fill={contorno} fillOpacity={0.3} />
    <Ellipse cx={74} cy={42} rx={9} ry={16} fill={color} {...trazo} />
    <Ellipse cx={74} cy={42} rx={9} ry={16} fill={contorno} fillOpacity={0.3} />
    <Ellipse cx={50} cy={46} rx={11} ry={8} fill={colores.crema} {...trazo} strokeWidth={2.5} />
    <Circle cx={50} cy={43} r={4} fill={contorno} />
    <Circle cx={41} cy={32} r={3.5} fill={contorno} />
    <Circle cx={59} cy={32} r={3.5} fill={contorno} />
  </G>
);

// Mesita con lámpara. El color es el de la pantalla.
export const lampara = (color: string) => (
  <G>
    <Polygon points="30,8 70,8 80,38 20,38" fill={color} {...trazo} />
    <Rect x={46} y={38} width={8} height={26} fill={colores.gris} {...trazo} />
    <Rect x={12} y={62} width={76} height={9} rx={3} fill={colores.marron} {...trazo} />
    <Rect x={20} y={71} width={8} height={24} fill={colores.marron} {...trazo} />
    <Rect x={72} y={71} width={8} height={24} fill={colores.marron} {...trazo} />
  </G>
);

// Televisión sobre un mueble. El color es el de la carcasa.
const tele = (color: string) => (
  <G>
    <Rect x={8} y={20} width={84} height={56} rx={6} fill={color} {...trazo} />
    <Rect x={15} y={27} width={70} height={42} fill="#2B3A55" {...trazo} />
    <Polygon points="20,32 36,32 20,48" fill={colores.blanco} fillOpacity={0.3} />
    <Circle cx={60} cy={50} r={9} fill={colores.amarillo} {...trazo} strokeWidth={2.5} />
    <Rect x={40} y={76} width={20} height={8} fill={colores.gris} {...trazo} />
    <Rect x={26} y={84} width={48} height={8} rx={3} fill={colores.gris} {...trazo} />
  </G>
);

// Jarrón con flores. El color es el del jarrón.
const florero = (color: string) => (
  <G>
    <Line x1={42} y1={42} x2={34} y2={14} {...trazo} stroke={colores.verde} />
    <Line x1={50} y1={42} x2={50} y2={8} {...trazo} stroke={colores.verde} />
    <Line x1={58} y1={42} x2={68} y2={16} {...trazo} stroke={colores.verde} />
    <Circle cx={33} cy={14} r={9} fill={colores.rojo} {...trazo} strokeWidth={2.5} />
    <Circle cx={50} cy={8} r={9} fill={colores.amarillo} {...trazo} strokeWidth={2.5} />
    <Circle cx={69} cy={16} r={9} fill={colores.rosa} {...trazo} strokeWidth={2.5} />
    <Path d="M38 38 C20 52 24 84 38 94 L62 94 C76 84 80 52 62 38 Z" fill={color} {...trazo} />
    <Path d="M32 56 C30 66 32 74 36 80" fill="none" stroke={colores.blanco} strokeOpacity={0.5} strokeWidth={4} strokeLinecap="round" />
  </G>
);

// Espejo ovalado. El color es el del marco.
export const espejo = (color: string) => (
  <G>
    <Ellipse cx={50} cy={50} rx={30} ry={42} fill={color} {...trazo} />
    <Ellipse cx={50} cy={50} rx={22} ry={34} fill="#DDF1F7" {...trazo} />
    <Path d="M36 36 C40 28 46 24 52 22" fill="none" stroke={colores.blanco} strokeWidth={5} strokeLinecap="round" />
  </G>
);

export const salon: Ambiente = {
  id: 'salon',
  nombre: 'Salón',
  paredes: ['#F9E9C8', '#DDEFD8', '#E1E8F8', '#F8DDE4'],
  fondo,
  arriba: [
    { id: 'reloj', objeto: reloj, paleta: marcos },
    { id: 'cuadro', objeto: cuadro, paleta: marcos },
    { id: 'ventana', objeto: ventana, paleta: marcos },
    { id: 'espejo', objeto: espejo, paleta: marcos },
    { id: 'estante', objeto: estante, paleta: [colores.marron, colores.azulOscuro] },
  ],
  abajo: [
    { id: 'sofa', objeto: sofa },
    { id: 'gato', objeto: gato, paleta: [colores.naranja, colores.marron, colores.gris], cambiaColor: false },
    { id: 'perro', objeto: perro, paleta: [colores.marron, colores.naranja, colores.gris], cambiaColor: false },
    { id: 'lampara', objeto: lampara },
    { id: 'planta', objeto: planta, paleta: [colores.naranja, colores.rojo, colores.azul] },
    { id: 'tele', objeto: tele, paleta: [colores.gris, colores.azulOscuro, colores.rojo] },
    { id: 'florero', objeto: florero },
  ],
};
