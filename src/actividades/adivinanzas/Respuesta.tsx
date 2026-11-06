import { Pressable, StyleSheet, Text } from 'react-native';
import { Icono } from '../../componentes/Icono';
import { tema } from '../../tema';

export type EstadoRespuesta = 'pendiente' | 'correcta' | 'elegidaIncorrecta' | 'otra';

type Props = {
  texto: string;
  estado: EstadoRespuesta;
  idPantalla: string;
  idIcono: string;
  alTocar: () => void;
};

// Botón de una respuesta. Tras responder, la correcta y la elegida se distinguen por icono y forma,
// no solo por color.
export function Respuesta({ texto, estado, idPantalla, idIcono, alTocar }: Props) {
  const visual = visuales[estado];
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={texto}
      testID={idPantalla}
      onPress={() => estado === 'pendiente' && alTocar()}
      style={({ pressed }) => [estilos.boton, visual.estilo, pressed && estado === 'pendiente' && estilos.pulsado]}
    >
      <Icono icono={{ nombre: visual.icono }} color={visual.colorTexto} testID={idIcono} />
      <Text style={[estilos.texto, { color: visual.colorTexto }]}>{texto}</Text>
    </Pressable>
  );
}

const estilos = StyleSheet.create({
  boton: {
    minHeight: tema.boton.altoMinimo,
    flexDirection: 'row',
    alignItems: 'center',
    gap: tema.espacio,
    paddingHorizontal: tema.espacio,
    paddingVertical: 8,
    borderRadius: 12,
  },
  pulsado: { opacity: 0.8 },
  texto: { fontSize: tema.letra.titulo, fontWeight: '700', flexShrink: 1 },
  pendiente: { backgroundColor: tema.colores.primario },
  correcta: { backgroundColor: tema.colores.acierto },
  elegidaIncorrecta: { backgroundColor: tema.colores.tarjeta, borderWidth: 6, borderColor: tema.colores.borde },
  otra: { backgroundColor: tema.colores.tarjeta, borderWidth: 2, borderColor: tema.colores.borde },
});

const visuales: Record<EstadoRespuesta, { estilo: object; icono: string; colorTexto: string }> = {
  pendiente: { estilo: estilos.pendiente, icono: 'hand-pointing-right', colorTexto: tema.colores.textoSobrePrimario },
  correcta: { estilo: estilos.correcta, icono: 'check-circle', colorTexto: tema.colores.textoSobrePrimario },
  elegidaIncorrecta: { estilo: estilos.elegidaIncorrecta, icono: 'close-circle', colorTexto: tema.colores.texto },
  otra: { estilo: estilos.otra, icono: 'minus-circle-outline', colorTexto: tema.colores.texto },
};
