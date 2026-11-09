import { Pressable, StyleSheet, Text } from 'react-native';
import { useColorJuego } from './ColorJuego';
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
  const color = useColorJuego();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={texto}
      onPress={alTocar}
      style={({ pressed }) => [estilos.boton, { backgroundColor: color.fondo }, pressed && estilos.pulsado]}
    >
      <Icono icono={icono} color={color.texto} testID={idIcono} />
      <Text style={[estilos.texto, { color: color.texto }]}>{texto}</Text>
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
  },
  pulsado: { opacity: 0.8 },
  texto: {
    fontSize: tema.letra.normal,
    fontWeight: '700',
    flexShrink: 1,
  },
});
