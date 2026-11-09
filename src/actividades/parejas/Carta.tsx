import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useColorJuego } from '../../componentes/ColorJuego';
import { Icono } from '../../componentes/Icono';
import { textosParejas } from '../../textos';
import { tema } from '../../tema';
import { buscarDibujo } from './dibujos';
import type { Carta as DatosCarta } from './juego';

type Props = {
  carta: DatosCarta;
  posicion: number;
  alTocar: () => void;
  // Tamaño del icono: más grande cuando hay pocas cartas y caben mejor.
  tamanoIcono?: number;
};

// Una carta: tapada (dorso común con cerebro y "Carta") o con su dibujo en color y su nombre escrito.
export function Carta({ carta, posicion, alTocar, tamanoIcono = 64 }: Props) {
  const color = useColorJuego();
  if (carta.estado === 'tapada') {
    return (
      <Pressable
        testID={`carta-${posicion}`}
        accessibilityRole="button"
        accessibilityLabel={textosParejas.carta}
        onPress={alTocar}
        style={[estilos.carta, { backgroundColor: color.fondo, borderColor: color.fondo }]}
      >
        <View style={[estilos.marcoDorso, { borderColor: color.texto }]}>
          <Icono
            icono={{ nombre: 'brain' }}
            tamano={tamanoIcono}
            color={color.texto}
            testID={`icono-carta-${posicion}`}
          />
          <Text style={[estilos.nombre, { color: color.texto }]}>{textosParejas.carta}</Text>
        </View>
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
      style={[
        estilos.carta,
        estilos.visible,
        { borderColor: descubierta ? tema.colores.acierto : color.fondo },
      ]}
    >
      <Icono
        icono={{ nombre: dibujo.icono }}
        tamano={tamanoIcono}
        color={tema.colores.dibujos[dibujo.id]}
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
  visible: { backgroundColor: tema.colores.tarjeta },
  marcoDorso: {
    alignSelf: 'stretch',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    borderWidth: 3,
    borderRadius: 8,
  },
  fila: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  nombre: { fontSize: tema.letra.normal, fontWeight: '700', color: tema.colores.texto },
});
