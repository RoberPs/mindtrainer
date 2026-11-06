import type { Actividad } from './tipos';
import { Parejas } from './parejas/Parejas';
import { FormaPalabra } from './forma-palabra/FormaPalabra';
import { textosFormaPalabra, textosParejas } from '../textos';

// Actividades disponibles en la app.
export const actividades: Actividad[] = [
  {
    id: 'parejas',
    icono: { nombre: 'cards' },
    nombre: textosParejas.nombre,
    descripcion: textosParejas.descripcion,
    Contenido: Parejas,
  },
  {
    id: 'forma-palabra',
    icono: { nombre: 'alphabetical-variant' },
    nombre: textosFormaPalabra.nombre,
    descripcion: textosFormaPalabra.descripcion,
    Contenido: FormaPalabra,
  },
];
