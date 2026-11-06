import type { Actividad } from './tipos';
import { Parejas } from './parejas/Parejas';
import { textosParejas } from '../textos';

// Actividades disponibles en la app.
export const actividades: Actividad[] = [
  {
    id: 'parejas',
    icono: { nombre: 'cards' },
    nombre: textosParejas.nombre,
    descripcion: textosParejas.descripcion,
    Contenido: Parejas,
  },
];
