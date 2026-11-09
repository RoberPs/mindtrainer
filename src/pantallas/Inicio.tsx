import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Icono } from '../componentes/Icono';
import { textosBienvenida } from '../textos';
import { tema } from '../tema';
import type { Actividad } from '../actividades/tipos';

type Props = {
  actividades: Actividad[];
  alAbrir: (actividad: Actividad) => void;
};

// Pantalla de juegos: encabezado y lista desplazable de tarjetas grandes con icono, nombre y descripción.
export function Inicio({ actividades, alAbrir }: Props) {
  return (
    <ScrollView testID="lista-actividades" contentContainerStyle={estilos.lista}>
      <Text accessibilityRole="header" style={estilos.encabezado}>
        {textosBienvenida.eligeJuego}
      </Text>
      {actividades.map((actividad) => {
        const color = actividad.color ?? tema.colores.primario;
        const colorTexto = actividad.colorTexto ?? tema.colores.textoSobrePrimario;
        return (
          <Pressable
            key={actividad.id}
            accessibilityRole="button"
            accessibilityLabel={`${actividad.nombre}. ${actividad.descripcion}`}
            onPress={() => alAbrir(actividad)}
            style={({ pressed }) => [
              estilos.tarjeta,
              { backgroundColor: color, borderColor: color },
              pressed && estilos.pulsada,
            ]}
          >
            <View style={estilos.circulo}>
              <Icono icono={actividad.icono} tamano={56} color={tema.colores.texto} testID={`icono-${actividad.id}`} />
            </View>
            <View style={estilos.textos}>
              <Text style={[estilos.nombre, { color: colorTexto }]}>{actividad.nombre}</Text>
              <Text style={[estilos.descripcion, { color: colorTexto }]}>{actividad.descripcion}</Text>
            </View>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  lista: { padding: tema.espacio, gap: tema.espacio },
  encabezado: { fontSize: tema.letra.titulo, fontWeight: '700', color: tema.colores.texto },
  tarjeta: {
    minHeight: 120,
    flexDirection: 'row',
    alignItems: 'center',
    gap: tema.espacio,
    padding: tema.espacio,
    borderRadius: 16,
    borderWidth: 2,
  },
  circulo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: tema.colores.tarjeta,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pulsada: { opacity: 0.8 },
  textos: { flex: 1 },
  nombre: { fontSize: tema.letra.titulo, fontWeight: '700' },
  descripcion: { fontSize: tema.letra.normal },
});
