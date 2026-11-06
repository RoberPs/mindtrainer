import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Icono } from '../componentes/Icono';
import { tema } from '../tema';
import type { Actividad } from '../actividades/tipos';

type Props = {
  actividades: Actividad[];
  alAbrir: (actividad: Actividad) => void;
};

// Pantalla de inicio: lista desplazable de actividades con icono, nombre y descripción.
export function Inicio({ actividades, alAbrir }: Props) {
  return (
    <ScrollView testID="lista-actividades" contentContainerStyle={estilos.lista}>
      {actividades.map((actividad) => (
        <Pressable
          key={actividad.id}
          accessibilityRole="button"
          accessibilityLabel={`${actividad.nombre}. ${actividad.descripcion}`}
          onPress={() => alAbrir(actividad)}
          style={({ pressed }) => [estilos.tarjeta, pressed && estilos.pulsada]}
        >
          <Icono icono={actividad.icono} testID={`icono-${actividad.id}`} />
          <View style={estilos.textos}>
            <Text style={estilos.nombre}>{actividad.nombre}</Text>
            <Text style={estilos.descripcion}>{actividad.descripcion}</Text>
          </View>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  lista: { padding: tema.espacio, gap: tema.espacio },
  tarjeta: {
    minHeight: tema.boton.altoMinimo,
    flexDirection: 'row',
    alignItems: 'center',
    gap: tema.espacio,
    padding: tema.espacio,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: tema.colores.borde,
    backgroundColor: tema.colores.tarjeta,
  },
  pulsada: { opacity: 0.8 },
  textos: { flex: 1 },
  nombre: { fontSize: tema.letra.titulo, fontWeight: '700', color: tema.colores.texto },
  descripcion: { fontSize: tema.letra.normal, color: tema.colores.texto },
});
