import type { Actividad } from './tipos';
import { Parejas } from './parejas/Parejas';
import { FormaPalabra } from './forma-palabra/FormaPalabra';
import { SopaDeLetras } from './sopa-de-letras/SopaDeLetras';
import { textosFormaPalabra, textosParejas, textosSopa } from '../textos';

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
  {
    id: 'sopa-de-letras',
    icono: { nombre: 'grid' },
    nombre: textosSopa.nombre,
    descripcion: textosSopa.descripcion,
    Contenido: SopaDeLetras,
  },
];
