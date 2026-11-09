import { StyleSheet, Text, View } from 'react-native';
import { BotonGrande } from '../../componentes/BotonGrande';
import { IconoVictoria } from '../../componentes/IconoVictoria';
import { textosDiferencias as t } from '../../textos';
import { tema } from '../../tema';

type Props = {
  total: number;
  toques: number;
  alJugarOtraVez: () => void;
};

// Pantalla final. "Volver al inicio" no se pinta aquí: lo pone siempre el marco.
export function Felicitacion({ total, toques, alJugarOtraVez }: Props) {
  return (
    <View style={estilos.pantalla}>
      <IconoVictoria testID="icono-felicitacion" />
      <Text style={estilos.mensaje}>{t.felicitacion(total)}</Text>
      <Text style={estilos.mensaje}>{t.toques(toques)}</Text>
      <BotonGrande texto={t.jugarOtraVez} icono={{ nombre: 'refresh' }} idIcono="icono-jugar-otra-vez" alTocar={alJugarOtraVez} />
    </View>
  );
}

const estilos = StyleSheet.create({
  pantalla: { gap: tema.espacio, padding: tema.espacio, alignItems: 'center' },
  mensaje: { fontSize: tema.letra.titulo, fontWeight: '700', color: tema.colores.texto, textAlign: 'center' },
});
