import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Icono } from '../../componentes/Icono';
import { textosParejas } from '../../textos';
import { tema } from '../../tema';
import { buscarDibujo } from './dibujos';
import type { Carta as DatosCarta } from './juego';

type Props = {
  carta: DatosCarta;
  posicion: number;
  alTocar: () => void;
};

// Una carta: tapada (interrogante + "Carta") o con su dibujo grande y su nombre escrito.
export function Carta({ carta, posicion, alTocar }: Props) {
  if (carta.estado === 'tapada') {
    return (
      <Pressable
        testID={`carta-${posicion}`}
        accessibilityRole="button"
        accessibilityLabel={textosParejas.carta}
        onPress={alTocar}
        style={[estilos.carta, estilos.tapada]}
      >
        <Icono
          icono={{ nombre: 'help-circle-outline' }}
          tamano={64}
          color={tema.colores.textoSobrePrimario}
          testID={`icono-carta-${posicion}`}
        />
        <Text style={[estilos.nombre, { color: tema.colores.textoSobrePrimario }]}>{textosParejas.carta}</Text>
      </Pressable>
    );
  }

  const dibujo = buscarDibujo(carta.dibujo);
  const descubierta = carta.estado === 'descubierta';
  return (
    <Pressable
      testID={`carta-${posicion}`}
      accessibilityRole="button"
      accessibilityLabel={dibujo.nombre}
      onPress={alTocar}
      style={[estilos.carta, estilos.visible, descubierta && estilos.acertada]}
    >
      <Icono
        icono={{ nombre: dibujo.icono }}
        tamano={64}
        color={tema.colores.texto}
        testID={`icono-carta-${posicion}`}
      />
      <View style={estilos.fila}>
        {descubierta && (
          <Icono
            icono={{ nombre: 'check-circle' }}
            tamano={28}
            color={tema.colores.acierto}
            testID={`icono-visto-${posicion}`}
          />
        )}
        <Text style={estilos.nombre}>{dibujo.nombre}</Text>
      </View>
    </Pressable>
  );
}

const estilos = StyleSheet.create({
  carta: {
    flexGrow: 1,
    minHeight: 140,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    padding: 8,
    borderRadius: 12,
    borderWidth: 4,
  },
  tapada: { backgroundColor: tema.colores.primario, borderColor: tema.colores.primario },
  visible: { backgroundColor: tema.colores.tarjeta, borderColor: tema.colores.borde },
  acertada: { borderColor: tema.colores.acierto },
  fila: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  nombre: { fontSize: tema.letra.normal, fontWeight: '700', color: tema.colores.texto },
});
