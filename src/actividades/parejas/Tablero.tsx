import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { BotonGrande } from '../../componentes/BotonGrande';
import { textosParejas } from '../../textos';
import { tema } from '../../tema';
import { Carta } from './Carta';
import { hayDosDistintas, type Partida } from './juego';

type Props = {
  partida: Partida;
  alTocarCarta: (posicion: number) => void;
  alSeguir: () => void;
};

// Zona fija arriba (intentos y "Seguir") y debajo la cuadrícula desplazable de cartas.
export function Tablero({ partida, alTocarCarta, alSeguir }: Props) {
  const ancho = partida.cartas.length === 12 ? '31%' : '48%';
  return (
    <View style={estilos.tablero}>
      <View style={estilos.superior}>
        <Text style={estilos.intentos}>{`${textosParejas.intentos}: ${partida.intentos}`}</Text>
        {hayDosDistintas(partida) && (
          <BotonGrande
            texto={textosParejas.seguir}
            icono={{ nombre: 'arrow-right-circle' }}
            idIcono="icono-seguir"
            alTocar={alSeguir}
          />
        )}
      </View>
      <ScrollView testID="cuadricula" contentContainerStyle={estilos.cuadricula}>
        {partida.cartas.map((carta, i) => (
          <View key={i} style={{ width: ancho, flexDirection: 'row' }}>
            <Carta carta={carta} posicion={i} alTocar={() => alTocarCarta(i)} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const estilos = StyleSheet.create({
  tablero: { flex: 1 },
  superior: { gap: tema.espacio, paddingHorizontal: tema.espacio, paddingBottom: tema.espacio },
  intentos: { fontSize: tema.letra.titulo, fontWeight: '700', color: tema.colores.texto },
  cuadricula: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 8,
    padding: tema.espacio,
  },
});
