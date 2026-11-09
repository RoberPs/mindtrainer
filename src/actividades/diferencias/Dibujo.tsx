import { useRef } from 'react';
import { Pressable, StyleSheet, Text, View, type GestureResponderEvent, type LayoutChangeEvent } from 'react-native';
import { useColorJuego } from '../../componentes/ColorJuego';
import { Icono } from '../../componentes/Icono';
import { tema } from '../../tema';
import type { Diferencia, Elemento } from './escena';

type Props = {
  lado: 'arriba' | 'abajo';
  rotulo: string;
  elementos: Elemento[];
  // Las diferencias de la partida: de ellas se dibuja un círculo por cada una encontrada.
  diferencias: Diferencia[];
  encontradas: string[];
  ancho: number;
  alto: number;
  // Solo el dibujo de abajo recibe toques, con coordenadas relativas (de 0 a 1).
  alTocar?: (x: number, y: number) => void;
};

// Un dibujo hecho con iconos y, encima, un círculo grueso por cada diferencia encontrada.
export function Dibujo({ lado, rotulo, elementos, diferencias, encontradas, ancho, alto, alTocar }: Props) {
  const color = useColorJuego();
  // Tamaño real medido; mientras no se mida se usa el calculado.
  const medido = useRef<{ ancho: number; alto: number } | null>(null);

  const alMedir = (e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    medido.current = { ancho: width, alto: height };
  };

  const pulsar = (e: GestureResponderEvent) => {
    const anchoReal = medido.current?.ancho || ancho;
    const altoReal = medido.current?.alto || alto;
    alTocar?.(e.nativeEvent.locationX / anchoReal, e.nativeEvent.locationY / altoReal);
  };

  // Los hijos no reciben toques: así el toque lo recibe siempre el recuadro y sus coordenadas
  // son relativas al dibujo y no a un icono.
  const contenido = (
    <>
      {elementos.map((e) => {
        const tamano = e.tamano * alto;
        return (
          <View
            key={e.id}
            pointerEvents="none"
            style={{ position: 'absolute', left: e.x * ancho - tamano / 2, top: e.y * alto - tamano / 2 }}
          >
            <Icono icono={{ nombre: e.icono }} tamano={tamano} color={e.color} />
          </View>
        );
      })}
      {diferencias
        .filter((d) => encontradas.includes(d.id))
        .map((d) => (
          <View
            key={d.id}
            testID={`circulo-${lado}-${d.id}`}
            pointerEvents="none"
            style={[
              estilos.circulo,
              { left: d.zona.x * ancho, top: d.zona.y * alto, width: d.zona.ancho * ancho, height: d.zona.alto * alto },
            ]}
          />
        ))}
    </>
  );

  return (
    <View style={estilos.contenedor}>
      <Text style={estilos.rotulo}>{rotulo}</Text>
      {alTocar ? (
        <Pressable
          testID={`dibujo-${lado}`}
          accessibilityLabel={rotulo}
          onLayout={alMedir}
          onPress={pulsar}
          style={[estilos.recuadro, { width: ancho, height: alto, borderColor: color.fondo }]}
        >
          {contenido}
        </Pressable>
      ) : (
        <View
          testID={`dibujo-${lado}`}
          accessibilityLabel={rotulo}
          onLayout={alMedir}
          style={[estilos.recuadro, { width: ancho, height: alto, borderColor: color.fondo }]}
        >
          {contenido}
        </View>
      )}
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: { alignItems: 'center', gap: 4 },
  rotulo: { fontSize: tema.letra.normal, fontWeight: '700', color: tema.colores.texto },
  recuadro: {
    backgroundColor: tema.colores.tarjeta,
    borderWidth: 2,
    borderRadius: 12,
    overflow: 'hidden',
  },
  circulo: {
    position: 'absolute',
    borderRadius: 999,
    borderWidth: tema.grosor.circulo,
    borderColor: tema.colores.marca,
  },
});
