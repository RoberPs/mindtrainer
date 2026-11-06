// SOLO PARA COMPROBAR A MANO (quickstart.md). No forman parte del producto.
// No se importan desde registro.ts. Para usarlas, cambiar la importación en App.tsx
// (hay una nota allí) y volver a dejarla como estaba al terminar la comprobación.
import { createElement } from 'react';
import { Pressable, Text, View } from 'react-native';
import type { Actividad, PropsContenido } from './tipos';

function ContenidoEjemplo({ avisarPartida }: PropsContenido) {
  return createElement(
    View,
    { style: { padding: 16, gap: 16 } },
    createElement(Text, { style: { fontSize: 22 } }, 'Actividad de ejemplo'),
    createElement(
      Pressable,
      { accessibilityRole: 'button', onPress: () => avisarPartida(true) },
      createElement(Text, { style: { fontSize: 22 } }, 'Empezar partida'),
    ),
    createElement(
      Pressable,
      { accessibilityRole: 'button', onPress: () => avisarPartida(false) },
      createElement(Text, { style: { fontSize: 22 } }, 'Terminar partida'),
    ),
  );
}

export const ejemplos: Actividad[] = [
  {
    id: 'ejemplo-cartas',
    icono: { nombre: 'cards' },
    nombre: 'Ejemplo de cartas',
    descripcion: 'Actividad de ejemplo solo para probar',
    Contenido: ContenidoEjemplo,
  },
  {
    id: 'ejemplo-puzle',
    icono: { nombre: 'puzzle' },
    nombre: 'Ejemplo de puzle',
    descripcion: 'Otra actividad de ejemplo para probar',
    Contenido: ContenidoEjemplo,
  },
];
