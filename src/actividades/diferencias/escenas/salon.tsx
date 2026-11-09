// Escena «Salón»: sofá (cambia de color), reloj de pared (falta) y gato (sobra).
import { Circle, Ellipse, G, Line, Path, Polygon, Rect } from 'react-native-svg';
import { cambioColor, cambioFalta, cambioSobra, comun, type Escena } from '../escena';
import { colores, contorno, planta, reloj, trazo, ventana } from '../objetos';

const fondo = () => (
  <G>
    <Rect x={0} y={0} width={300} height={200} fill="#F9E9C8" />
    <Rect x={0} y={132} width={300} height={68} fill="#D9A066" />
    <Line x1={0} y1={146} x2={300} y2={146} stroke="#B87D45" strokeWidth={2} />
    <Line x1={0} y1={168} x2={300} y2={168} stroke="#B87D45" strokeWidth={2} />
    <Rect x={0} y={126} width={300} height={8} fill="#FFFFFF" {...trazo} />
  </G>
);

// Sofá de tres plazas. `color` es el de la tela.
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

// Gato sentado. `color` es el del pelo.
const gato = (color: string) => (
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

// Mesita con lámpara. `color` es el de la pantalla.
const lampara = (color: string) => (
  <G>
    <Polygon points="30,8 70,8 80,38 20,38" fill={color} {...trazo} />
    <Rect x={46} y={38} width={8} height={26} fill={colores.gris} {...trazo} />
    <Rect x={12} y={62} width={76} height={9} rx={3} fill={colores.marron} {...trazo} />
    <Rect x={20} y={71} width={8} height={24} fill={colores.marron} {...trazo} />
    <Rect x={72} y={71} width={8} height={24} fill={colores.marron} {...trazo} />
  </G>
);

// Cuadro con un paisaje. `color` es el del marco.
const cuadro = (color: string) => (
  <G>
    <Rect x={10} y={16} width={80} height={68} rx={4} fill={color} {...trazo} />
    <Rect x={19} y={25} width={62} height={50} fill={colores.cielo} {...trazo} />
    <Polygon points="19,75 40,45 56,64 66,52 81,75" fill={colores.verde} {...trazo} />
    <Circle cx={66} cy={36} r={7} fill={colores.amarillo} {...trazo} strokeWidth={2.5} />
  </G>
);

// Alfombra redonda. `color` es el de la tela.
const alfombra = (color: string) => (
  <G>
    <Ellipse cx={50} cy={55} rx={48} ry={22} fill={color} {...trazo} />
    <Ellipse cx={50} cy={55} rx={34} ry={14} fill="none" stroke={colores.blanco} strokeWidth={3} />
  </G>
);

export const salon: Escena = {
  id: 'salon',
  nombre: 'Salón',
  fondo,
  comunes: [
    comun('alfombra', alfombra, 0.42, 0.84, 0.44, colores.verde),
    comun('ventana', ventana, 0.14, 0.4, 0.46, colores.marron),
    comun('cuadro', cuadro, 0.8, 0.22, 0.3, colores.marron),
    comun('planta', planta, 0.08, 0.8, 0.34, colores.naranja),
    comun('lampara', lampara, 0.9, 0.62, 0.4, colores.amarillo),
  ],
  cambios: [
    cambioColor('sofa', sofa, 0.42, 0.7, 0.5, colores.rojo, colores.azulOscuro),
    cambioFalta('reloj', reloj, 0.5, 0.2, 0.32, colores.marron),
    cambioSobra('gato', gato, 0.76, 0.77, 0.34, colores.naranja),
  ],
};
