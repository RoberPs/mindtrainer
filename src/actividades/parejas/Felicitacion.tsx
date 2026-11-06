import { StyleSheet, Text, View } from 'react-native';
import { BotonGrande } from '../../componentes/BotonGrande';
import { Icono } from '../../componentes/Icono';
import { textosParejas } from '../../textos';
import { tema } from '../../tema';

type Props = {
  intentos: number;
  alJugarOtraVez: () => void;
};

// Pantalla final. "Volver al inicio" no se pinta aquí: lo pone siempre el marco.
export function Felicitacion({ intentos, alJugarOtraVez }: Props) {
  return (
    <View style={estilos.pantalla}>
      <Icono icono={{ nombre: 'party-popper' }} tamano={96} testID="icono-felicitacion" />
      <Text style={estilos.mensaje}>{textosParejas.felicitacion}</Text>
      <Text style={estilos.mensaje}>{textosParejas.intentosNecesitados(intentos)}</Text>
      <BotonGrande
        texto={textosParejas.jugarOtraVez}
        icono={{ nombre: 'refresh' }}
        idIcono="icono-jugar-otra-vez"
        alTocar={alJugarOtraVez}
      />
    </View>
  );
}

const estilos = StyleSheet.create({
  pantalla: { gap: tema.espacio, padding: tema.espacio, alignItems: 'center' },
  mensaje: { fontSize: tema.letra.titulo, fontWeight: '700', color: tema.colores.texto, textAlign: 'center' },
});
