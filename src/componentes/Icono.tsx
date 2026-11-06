import { Image, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { tema } from '../tema';
import type { IconoActividad } from '../actividades/tipos';

type Props = {
  icono: IconoActividad;
  tamano?: number;
  color?: string;
  testID?: string;
};

// Icono grande incluido en la app. Es decorativo: siempre va junto a un texto (FR-014).
export function Icono({
  icono,
  tamano = tema.icono.tamano,
  color = tema.colores.primario,
  testID,
}: Props) {
  return (
    <View testID={testID} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
      {'imagen' in icono ? (
        <Image source={icono.imagen} style={{ width: tamano, height: tamano }} />
      ) : (
        <MaterialCommunityIcons
          name={icono.nombre as keyof typeof MaterialCommunityIcons.glyphMap}
          size={tamano}
          color={color}
        />
      )}
    </View>
  );
}
