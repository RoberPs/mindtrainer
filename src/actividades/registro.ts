import type { Actividad } from './tipos';
import { Parejas } from './parejas/Parejas';
import { FormaPalabra } from './forma-palabra/FormaPalabra';
import { SopaDeLetras } from './sopa-de-letras/SopaDeLetras';
import { Adivinanzas } from './adivinanzas/Adivinanzas';
import { Diferencias } from './diferencias/Diferencias';
import { tema } from '../tema';
import { textosAdivinanzas, textosDiferencias, textosFormaPalabra, textosParejas, textosSopa } from '../textos';

// Actividades disponibles en la app.
export const actividades: Actividad[] = [
  {
    id: 'parejas',
    icono: { nombre: 'cards' },
    nombre: textosParejas.nombre,
    descripcion: textosParejas.descripcion,
    color: tema.colores.actividades.azul,
    Contenido: Parejas,
  },
  {
    id: 'forma-palabra',
    icono: { nombre: 'alphabetical-variant' },
    nombre: textosFormaPalabra.nombre,
    descripcion: textosFormaPalabra.descripcion,
    color: tema.colores.actividades.verde,
    Contenido: FormaPalabra,
  },
  {
    id: 'sopa-de-letras',
    icono: { nombre: 'grid' },
    nombre: textosSopa.nombre,
    descripcion: textosSopa.descripcion,
    color: tema.colores.actividades.morado,
    Contenido: SopaDeLetras,
  },
  {
    id: 'adivinanzas',
    icono: { nombre: 'help-circle' },
    nombre: textosAdivinanzas.nombre,
    descripcion: textosAdivinanzas.descripcion,
    color: tema.colores.actividades.marron,
    Contenido: Adivinanzas,
  },
  {
    id: 'diferencias',
    icono: { nombre: 'compare' },
    nombre: textosDiferencias.nombre,
    descripcion: textosDiferencias.descripcion,
    color: tema.colores.actividades.verdeAzulado,
    Contenido: Diferencias,
  },
];
