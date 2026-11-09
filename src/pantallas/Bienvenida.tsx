import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { BotonGrande } from '../componentes/BotonGrande';
import { Icono } from '../componentes/Icono';
import { textosBienvenida } from '../textos';
import { tema } from '../tema';

type Props = {
  alEmpezar: () => void;
};

const logo = { imagen: require('../../assets/logo.png') };

// Primera pantalla de la app: logo, mensaje y un botón grande para empezar (spec 009).
export function Bienvenida({ alEmpezar }: Props) {
  return (
    <ScrollView contentContainerStyle={estilos.pantalla} testID="bienvenida">
      <View style={estilos.cabecera}>
        <Icono icono={logo} tamano={56} testID="logo-pequeno" />
        <Text style={estilos.nombre}>{textosBienvenida.nombreApp}</Text>
      </View>
      <View style={estilos.centro}>
        <Icono icono={logo} tamano={220} testID="logo-grande" />
        <Text style={estilos.titulo}>{textosBienvenida.titulo}</Text>
        <Text style={estilos.pregunta}>{textosBienvenida.pregunta}</Text>
      </View>
      <BotonGrande
        texto={textosBienvenida.empezar}
        icono={{ nombre: 'play-circle' }}
        idIcono="icono-empezar"
        alTocar={alEmpezar}
      />
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  pantalla: { flexGrow: 1, justifyContent: 'space-between', padding: tema.espacio, gap: tema.espacio },
  cabecera: { flexDirection: 'row', alignItems: 'center', gap: tema.espacio },
  nombre: { fontSize: tema.letra.titulo, fontWeight: '700', color: tema.colores.texto },
  centro: { alignItems: 'center', gap: tema.espacio },
  titulo: { fontSize: 32, fontWeight: '700', color: tema.colores.texto, textAlign: 'center' },
  pregunta: { fontSize: tema.letra.titulo, color: tema.colores.texto, textAlign: 'center' },
});
