import { StyleSheet, Text, View } from 'react-native';
import { BotonGrande } from '../../componentes/BotonGrande';
import { Icono } from '../../componentes/Icono';
import { textosFormaPalabra as t } from '../../textos';
import { tema } from '../../tema';

type Props = {
  aciertos: number;
  alJugarOtraVez: () => void;
};

// Pantalla final. "Volver al inicio" no se pinta aquí: lo pone siempre el marco.
export function Resultado({ aciertos, alJugarOtraVez }: Props) {
  return (
    <View style={estilos.pantalla}>
      <Icono icono={{ nombre: 'party-popper' }} tamano={96} testID="icono-resultado" />
      <Text style={estilos.mensaje}>{t.aciertos(aciertos)}</Text>
      <BotonGrande texto={t.jugarOtraVez} icono={{ nombre: 'refresh' }} idIcono="icono-jugar-otra-vez" alTocar={alJugarOtraVez} />
    </View>
  );
}

const estilos = StyleSheet.create({
  pantalla: { gap: tema.espacio, padding: tema.espacio, alignItems: 'center' },
  mensaje: { fontSize: tema.letra.titulo, fontWeight: '700', color: tema.colores.texto, textAlign: 'center' },
});
