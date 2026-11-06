import { StyleSheet, Text, View } from 'react-native';
import { BotonGrande } from '../../componentes/BotonGrande';
import { textosParejas } from '../../textos';
import { tema } from '../../tema';
import type { Tamano } from './juego';

type Props = {
  alElegir: (tamano: Tamano) => void;
};

// Pantalla para elegir entre partida pequeña (6), mediana (8) y grande (12).
export function ElegirTamano({ alElegir }: Props) {
  return (
    <View style={estilos.pantalla}>
      <Text style={estilos.invitacion}>{textosParejas.elegirTamano}</Text>
      <BotonGrande
        texto={textosParejas.pequena}
        icono={{ nombre: 'size-s' }}
        idIcono="icono-pequena"
        alTocar={() => alElegir('pequena')}
      />
      <BotonGrande
        texto={textosParejas.mediana}
        icono={{ nombre: 'size-m' }}
        idIcono="icono-mediana"
        alTocar={() => alElegir('mediana')}
      />
      <BotonGrande
        texto={textosParejas.grande}
        icono={{ nombre: 'size-l' }}
        idIcono="icono-grande"
        alTocar={() => alElegir('grande')}
      />
    </View>
  );
}

const estilos = StyleSheet.create({
  pantalla: { gap: tema.espacio, padding: tema.espacio },
  invitacion: { fontSize: tema.letra.titulo, fontWeight: '700', color: tema.colores.texto },
});
