import { StyleSheet, Text, View } from 'react-native';
import { BotonGrande } from '../../componentes/BotonGrande';
import { IconoVictoria } from '../../componentes/IconoVictoria';
import { textosSopa as t } from '../../textos';
import { tema } from '../../tema';

type Props = {
  palabras: number;
  intentos: number;
  alJugarOtraVez: () => void;
};

// Mensaje final. "Volver al inicio" no se pinta aquí: lo pone siempre el marco.
export function Felicitacion({ palabras, intentos, alJugarOtraVez }: Props) {
  return (
    <View style={estilos.pantalla}>
      <IconoVictoria testID="icono-felicitacion" />
      <Text style={estilos.mensaje}>{t.felicitacion(palabras)}</Text>
      <Text style={estilos.mensaje}>{t.intentosNecesitados(intentos)}</Text>
      <BotonGrande texto={t.jugarOtraVez} icono={{ nombre: 'refresh' }} idIcono="icono-jugar-otra-vez" alTocar={alJugarOtraVez} />
    </View>
  );
}

const estilos = StyleSheet.create({
  pantalla: { gap: tema.espacio, alignItems: 'center' },
  mensaje: { fontSize: tema.letra.titulo, fontWeight: '700', color: tema.colores.texto, textAlign: 'center' },
});
