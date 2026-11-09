import { StyleSheet, Text, View } from 'react-native';
import { Icono } from '../../componentes/Icono';
import { textosSopa as t } from '../../textos';
import { tema } from '../../tema';
import { faltan, type Partida } from './juego';

type Props = {
  partida: Partida;
};

// Las palabras de la sopa (3 o 5): las encontradas, escritas y tachadas; las demás, ocultas.
export function ListaPalabras({ partida }: Props) {
  const encontradas = partida.encontradas.map((e) => e.palabra);
  return (
    <View style={estilos.lista}>
      <View style={estilos.fila}>
        <Icono icono={{ nombre: 'magnify' }} tamano={48} testID="icono-faltan" />
        <Text style={estilos.texto}>{t.faltan(faltan(partida))}</Text>
      </View>
      {partida.sopa.palabras.map((palabra, i) => {
        const hallada = encontradas.includes(palabra);
        return (
          <View key={i} style={estilos.fila} testID={`palabra-${i}`}>
            <Icono
              icono={{ nombre: hallada ? 'checkbox-marked-circle' : 'help-circle-outline' }}
              tamano={40}
              color={hallada ? tema.colores.acierto : tema.colores.primario}
            />
            {hallada ? (
              <Text style={[estilos.texto, estilos.tachada]}>{palabra}</Text>
            ) : (
              <Text style={estilos.texto} accessibilityLabel={t.palabraSinEncontrar}>
                {t.oculta}
              </Text>
            )}
          </View>
        );
      })}
    </View>
  );
}

const estilos = StyleSheet.create({
  lista: { gap: 8 },
  fila: { flexDirection: 'row', alignItems: 'center', gap: tema.espacio },
  texto: { fontSize: tema.letra.titulo, fontWeight: '700', color: tema.colores.texto },
  tachada: { textDecorationLine: 'line-through' },
});
