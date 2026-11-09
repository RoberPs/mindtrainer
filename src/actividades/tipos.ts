import type { ComponentType } from 'react';
import type { ImageSourcePropType } from 'react-native';

// Icono incluido en la app: uno de los iconos que trae Expo, o una imagen propia en assets/.
export type IconoActividad =
  | { nombre: string }
  | { imagen: ImageSourcePropType };

// Lo que recibe el contenido de cada actividad (contracts/actividad.md).
export type PropsContenido = {
  // La actividad llama con true al empezar una partida y con false al terminarla.
  avisarPartida: (enCurso: boolean) => void;
};

export type Actividad = {
  id: string;
  icono: IconoActividad;
  nombre: string;
  descripcion: string;
  // Color de fondo de su tarjeta en el inicio. Si falta, la tarjeta es azul.
  color?: string;
  Contenido: ComponentType<PropsContenido>;
};
