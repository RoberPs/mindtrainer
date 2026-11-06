import { textosParejas } from '../../textos';

// Los ocho objetos cotidianos que pueden salir en una carta (iconos incluidos en la app).
export type Dibujo = {
  id: string;
  nombre: string;
  icono: string;
};

export const dibujos: Dibujo[] = [
  { id: 'llave', nombre: textosParejas.dibujos.llave, icono: 'key' },
  { id: 'taza', nombre: textosParejas.dibujos.taza, icono: 'coffee' },
  { id: 'reloj', nombre: textosParejas.dibujos.reloj, icono: 'clock-outline' },
  { id: 'gafas', nombre: textosParejas.dibujos.gafas, icono: 'glasses' },
  { id: 'cama', nombre: textosParejas.dibujos.cama, icono: 'bed' },
  { id: 'silla', nombre: textosParejas.dibujos.silla, icono: 'seat' },
  { id: 'lampara', nombre: textosParejas.dibujos.lampara, icono: 'lamp' },
  { id: 'tijeras', nombre: textosParejas.dibujos.tijeras, icono: 'content-cut' },
];

export function buscarDibujo(id: string): Dibujo {
  const dibujo = dibujos.find((d) => d.id === id);
  if (!dibujo) throw new Error(`Dibujo desconocido: ${id}`);
  return dibujo;
}
