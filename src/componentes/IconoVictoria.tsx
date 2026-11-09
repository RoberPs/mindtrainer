import { useEffect, useRef } from 'react';
import { AccessibilityInfo, Animated } from 'react-native';
import { Icono } from './Icono';
import { animacion } from '../animacion';

type Props = {
  testID?: string;
  tamano?: number;
};

// Icono de celebración de las pantallas finales. Aparece con un fundido suave, una sola vez.
// Solo envuelve el icono: el texto y los botones no se animan ni esperan a nadie.
export function IconoVictoria({ testID, tamano = 96 }: Props) {
  const opacidad = useRef(new Animated.Value(animacion.activa ? 0 : 1)).current;

  useEffect(() => {
    if (!animacion.activa) return;
    let montado = true;
    let fundido: Animated.CompositeAnimation | undefined;
    AccessibilityInfo.isReduceMotionEnabled()
      .then((reducirMovimiento) => {
        if (!montado) return;
        if (reducirMovimiento) {
          opacidad.setValue(1);
          return;
        }
        fundido = Animated.timing(opacidad, {
          toValue: 1,
          duration: animacion.duracion,
          // Un solo icono durante 400 ms: no hace falta el motor nativo, y así se puede probar.
          useNativeDriver: false,
        });
        fundido.start();
      })
      .catch(() => {
        if (montado) opacidad.setValue(1);
      });
    return () => {
      montado = false;
      fundido?.stop();
    };
  }, [opacidad]);

  return (
    <Animated.View
      testID={testID}
      style={{ opacity: opacidad }}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
    >
      <Icono icono={{ nombre: 'party-popper' }} tamano={tamano} />
    </Animated.View>
  );
}
