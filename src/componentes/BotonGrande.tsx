import { Pressable, StyleSheet, Text } from 'react-native';
import { Icono } from './Icono';
import { tema } from '../tema';
import type { IconoActividad } from '../actividades/tipos';

type Props = {
  texto: string;
  icono: IconoActividad;
  idIcono: string;
  alTocar: () => void;
};

// Botón grande con icono y texto, de alto contraste y sin límites de tiempo.
export function BotonGrande({ texto, icono, idIcono, alTocar }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={texto}
      onPress={alTocar}
      style={({ pressed }) => [estilos.boton, pressed && estilos.pulsado]}
    >
      <Icono icono={icono} color={tema.colores.textoSobrePrimario} testID={idIcono} />
      <Text style={estilos.texto}>{texto}</Text>
    </Pressable>
  );
}

const estilos = StyleSheet.create({
  boton: {
    minHeight: tema.boton.altoMinimo,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: tema.espacio,
    paddingHorizontal: tema.espacio,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: tema.colores.primario,
  },
  pulsado: { opacity: 0.8 },
  texto: {
    fontSize: tema.letra.normal,
    fontWeight: '700',
    color: tema.colores.textoSobrePrimario,
    flexShrink: 1,
  },
});
