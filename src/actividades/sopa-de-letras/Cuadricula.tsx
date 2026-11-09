import { Pressable, StyleSheet, Text, View } from 'react-native';
import { textosSopa as t } from '../../textos';
import { tema } from '../../tema';
import type { Casilla, Partida } from './juego';

type Props = {
  partida: Partida;
  alTocar: (casilla: Casilla) => void;
};

const clave = (c: Casilla) => `${c.fila}-${c.columna}`;

// Cuadrícula de cada sopa (5 × 6 la pequeña, 6 × 6 la mediana). Marca y palabras encontradas se distinguen por el
// borde y por el fondo, no solo por el color.
export function Cuadricula({ partida, alTocar }: Props) {
  const encontradas = new Set(partida.encontradas.flatMap((e) => e.casillas.map(clave)));
  return (
    <View style={estilos.cuadricula}>
      {partida.sopa.cuadricula.map((letras, fila) => (
        <View key={fila} style={estilos.fila}>
          {[...letras].map((letra, columna) => {
            const casilla = { fila, columna };
            const hallada = encontradas.has(clave(casilla));
            const marcada = partida.marca !== null && clave(partida.marca) === clave(casilla);
            return (
              <Pressable
                key={columna}
                testID={`celda-${fila}-${columna}`}
                accessibilityRole="button"
                accessibilityLabel={t.celda(letra, fila + 1, columna + 1)}
                accessibilityState={{ selected: hallada || marcada }}
                onPress={() => alTocar(casilla)}
                style={[estilos.celda, marcada && estilos.marcada, hallada && estilos.hallada]}
              >
                <Text style={[estilos.letra, hallada && estilos.letraHallada]}>{letra}</Text>
              </Pressable>
            );
          })}
        </View>
      ))}
    </View>
  );
}

const estilos = StyleSheet.create({
  cuadricula: { gap: 6 },
  fila: { flexDirection: 'row', gap: 6 },
  celda: {
    flex: 1,
    minHeight: tema.boton.altoMinimo,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: tema.colores.borde,
    borderRadius: 8,
    backgroundColor: tema.colores.tarjeta,
  },
  marcada: { borderWidth: 6 },
  hallada: { backgroundColor: tema.colores.acierto, borderColor: tema.colores.acierto },
  letra: { fontSize: tema.letra.titulo, fontWeight: '700', color: tema.colores.texto },
  letraHallada: { color: tema.colores.textoSobrePrimario },
});
