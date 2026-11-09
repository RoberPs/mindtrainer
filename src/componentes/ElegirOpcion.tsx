import { StyleSheet, Text, View } from 'react-native';
import { BotonGrande } from './BotonGrande';
import { tema } from '../tema';
import type { IconoActividad } from '../actividades/tipos';

export type Opcion<T> = {
  valor: T;
  texto: string;
  icono: IconoActividad;
  idIcono: string;
};

type Props<T> = {
  invitacion: string;
  opciones: Opcion<T>[];
  alElegir: (valor: T) => void;
};

// Pantalla para elegir entre varias opciones con botones grandes, cada uno con icono y texto.
export function ElegirOpcion<T>({ invitacion, opciones, alElegir }: Props<T>) {
  return (
    <View style={estilos.pantalla}>
      <Text style={estilos.invitacion}>{invitacion}</Text>
      {opciones.map((o) => (
        <BotonGrande key={o.idIcono} texto={o.texto} icono={o.icono} idIcono={o.idIcono} alTocar={() => alElegir(o.valor)} />
      ))}
    </View>
  );
}

const estilos = StyleSheet.create({
  pantalla: { gap: tema.espacio, padding: tema.espacio },
  invitacion: { fontSize: tema.letra.titulo, fontWeight: '700', color: tema.colores.texto },
});
