import { fireEvent, render, screen } from '@testing-library/react-native';
import { Pressable, Text, View } from 'react-native';
import App from '../App';
import type { Actividad, PropsContenido } from '../src/actividades/tipos';

// Contenido de ejemplo para las pruebas: permite empezar y terminar una partida.
export function ContenidoDePrueba({ avisarPartida }: PropsContenido) {
  return (
    <View>
      <Text>Contenido de prueba</Text>
      <Pressable accessibilityRole="button" onPress={() => avisarPartida(true)}>
        <Text>Empezar partida</Text>
      </Pressable>
      <Pressable accessibilityRole="button" onPress={() => avisarPartida(false)}>
        <Text>Terminar partida</Text>
      </Pressable>
    </View>
  );
}

export function crearActividades(cuantas: number): Actividad[] {
  return Array.from({ length: cuantas }, (_, i) => ({
    id: `actividad-${i + 1}`,
    icono: { nombre: i % 2 === 0 ? 'cards' : 'puzzle' },
    nombre: `Actividad ${i + 1}`,
    descripcion: `Descripción de la actividad ${i + 1}`,
    Contenido: ContenidoDePrueba,
  }));
}

// Abre la app y pasa de la bienvenida a la lista de juegos pulsando "Empezar".
export async function abrirApp(actividades?: Actividad[]) {
  await render(<App actividades={actividades} />);
  await fireEvent.press(screen.getByRole('button', { name: 'Empezar' }));
}
