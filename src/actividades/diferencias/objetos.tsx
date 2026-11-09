// Estilo común de los dibujos de "Diferencias": dibujos propios hechos con formas vectoriales,
// de trazo plano, contorno oscuro de grosor uniforme y colores vivos. Cada objeto es una función
// que recibe su color principal y se dibuja en una caja de 100 × 100 unidades; la escena lo
// coloca y lo escala. No hay imágenes ni iconos de terceros.
import { Circle, G, Line, Path, Polygon, Rect } from 'react-native-svg';

export const contorno = '#1F1F1F';
export const grosor = 3.5;

// Propiedades que llevan todas las formas para tener el mismo contorno.
export const trazo = {
  stroke: contorno,
  strokeWidth: grosor,
  strokeLinejoin: 'round' as const,
  strokeLinecap: 'round' as const,
};

// Colores vivos. Los pares de un cambio de color son siempre de tonos y claridades muy distintos.
export const colores = {
  rojo: '#E0283C',
  azul: '#1F78D1',
  azulOscuro: '#173F8A',
  naranja: '#F58A1F',
  amarillo: '#F7C61B',
  verde: '#3AA655',
  morado: '#8450C8',
  rosa: '#F06292',
  marron: '#A9622B',
  crema: '#FFF3D6',
  cielo: '#9ED8F5',
  gris: '#B8C0C8',
  blanco: '#FFFFFF',
};

// Ventana con cristal y cruceta. `color` es el del marco.
export const ventana = (color: string) => (
  <G>
    <Rect x={12} y={8} width={76} height={84} rx={5} fill={color} {...trazo} />
    <Rect x={21} y={17} width={58} height={66} fill={colores.cielo} {...trazo} />
    <Line x1={50} y1={17} x2={50} y2={83} {...trazo} />
    <Line x1={21} y1={50} x2={79} y2={50} {...trazo} />
    <Polygon points="27,24 37,24 27,36" fill={colores.blanco} fillOpacity={0.7} />
    <Rect x={6} y={90} width={88} height={7} rx={3} fill={color} {...trazo} />
  </G>
);

// Reloj de pared. `color` es el del marco.
export const reloj = (color: string) => (
  <G>
    <Circle cx={50} cy={50} r={40} fill={color} {...trazo} />
    <Circle cx={50} cy={50} r={31} fill={colores.blanco} {...trazo} />
    <Line x1={50} y1={22} x2={50} y2={28} {...trazo} />
    <Line x1={50} y1={72} x2={50} y2={78} {...trazo} />
    <Line x1={22} y1={50} x2={28} y2={50} {...trazo} />
    <Line x1={72} y1={50} x2={78} y2={50} {...trazo} />
    <Line x1={50} y1={50} x2={50} y2={32} {...trazo} />
    <Line x1={50} y1={50} x2={64} y2={58} {...trazo} />
    <Circle cx={50} cy={50} r={4} fill={contorno} />
  </G>
);

// Maceta con hojas. `color` es el de la maceta.
export const planta = (color: string) => (
  <G>
    <Path d="M50 66 C30 56 22 36 30 14 C48 24 54 44 50 66 Z" fill={colores.verde} {...trazo} />
    <Path d="M50 66 C70 56 78 36 70 14 C52 24 46 44 50 66 Z" fill={colores.verde} {...trazo} />
    <Path d="M50 66 C42 46 44 24 50 6 C56 24 58 46 50 66 Z" fill="#2E8B47" {...trazo} />
    <Polygon points="26,64 74,64 67,96 33,96" fill={color} {...trazo} />
    <Rect x={22} y={60} width={56} height={9} rx={3} fill={color} {...trazo} />
  </G>
);
