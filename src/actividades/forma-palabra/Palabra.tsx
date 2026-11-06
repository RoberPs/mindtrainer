import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { BotonGrande } from '../../componentes/BotonGrande';
import { Icono } from '../../componentes/Icono';
import { textosFormaPalabra as t } from '../../textos';
import { tema } from '../../tema';
import { esUltima, palabraActual, type Partida } from './juego';

type Props = {
  partida: Partida;
  alColocar: (id: number) => void;
  alComprobar: () => void;
  alBorrarUltima: () => void;
  alEmpezarDeNuevo: () => void;
  alVerRespuesta: () => void;
  alSiguiente: () => void;
};

// Pantalla de una palabra: casillas, mensaje, letras y botones.
export function Palabra({
  partida,
  alColocar,
  alComprobar,
  alBorrarUltima,
  alEmpezarDeNuevo,
  alVerRespuesta,
  alSiguiente,
}: Props) {
  const palabra = palabraActual(partida);
  const jugando = partida.estado === 'jugando';
  const casillas = [...palabra].map((_, i) => partida.colocadas[i]?.letra ?? '');
  const mensaje = mensajeActual(partida);

  return (
    <ScrollView contentContainerStyle={estilos.pantalla}>
      <View style={estilos.fila} testID="casillas">
        {casillas.map((letra, i) => (
          <View key={i} style={estilos.casilla} testID={`casilla-${i}`}>
            <Text style={estilos.letraCasilla}>{letra}</Text>
          </View>
        ))}
      </View>

      {mensaje && (
        <View style={estilos.mensaje}>
          <Icono icono={{ nombre: mensaje.icono }} tamano={64} testID={mensaje.idIcono} />
          <Text style={estilos.textoMensaje}>{mensaje.texto}</Text>
        </View>
      )}

      {jugando ? (
        <>
          <View style={estilos.fila}>
            {partida.disponibles.map((l) => (
              <Pressable
                key={l.id}
                accessibilityRole="button"
                accessibilityLabel={l.letra}
                testID={`letra-${l.id}`}
                onPress={() => alColocar(l.id)}
                style={({ pressed }) => [estilos.letra, pressed && estilos.pulsado]}
              >
                <Text style={estilos.textoLetra}>{l.letra}</Text>
              </Pressable>
            ))}
          </View>
          <BotonGrande texto={t.comprobar} icono={{ nombre: 'check-circle' }} idIcono="icono-comprobar" alTocar={alComprobar} />
          <BotonGrande texto={t.borrarUltima} icono={{ nombre: 'backspace' }} idIcono="icono-borrar-ultima" alTocar={alBorrarUltima} />
          <BotonGrande texto={t.empezarDeNuevo} icono={{ nombre: 'refresh' }} idIcono="icono-empezar-de-nuevo" alTocar={alEmpezarDeNuevo} />
          <BotonGrande texto={t.verRespuesta} icono={{ nombre: 'eye' }} idIcono="icono-ver-respuesta" alTocar={alVerRespuesta} />
        </>
      ) : (
        <BotonGrande
          texto={esUltima(partida) ? t.verResultado : t.siguiente}
          icono={{ nombre: esUltima(partida) ? 'flag-checkered' : 'arrow-right-circle' }}
          idIcono="icono-siguiente"
          alTocar={alSiguiente}
        />
      )}
    </ScrollView>
  );
}

function mensajeActual(partida: Partida) {
  if (partida.estado === 'acertada') return { icono: 'emoticon-happy', idIcono: 'icono-acierto', texto: t.acierto };
  if (partida.estado === 'rendida') {
    return { icono: 'lightbulb-on', idIcono: 'icono-respuesta', texto: t.laPalabraEs(palabraActual(partida)) };
  }
  if (partida.aviso === 'incorrecta') return { icono: 'emoticon-neutral', idIcono: 'icono-fallo', texto: t.fallo };
  if (partida.aviso === 'incompleta') return { icono: 'information', idIcono: 'icono-incompleta', texto: t.incompleta };
  return null;
}

const estilos = StyleSheet.create({
  pantalla: { gap: tema.espacio, padding: tema.espacio },
  fila: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 8 },
  casilla: {
    minWidth: 48,
    minHeight: tema.boton.altoMinimo,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: tema.colores.borde,
    borderRadius: 8,
    backgroundColor: tema.colores.tarjeta,
  },
  letraCasilla: { fontSize: tema.letra.titulo, fontWeight: '700', color: tema.colores.texto },
  mensaje: { alignItems: 'center', gap: 8 },
  textoMensaje: { fontSize: tema.letra.titulo, fontWeight: '700', color: tema.colores.texto, textAlign: 'center' },
  letra: {
    minWidth: 56,
    minHeight: tema.boton.altoMinimo,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: tema.colores.primario,
  },
  pulsado: { opacity: 0.8 },
  textoLetra: { fontSize: tema.letra.titulo, fontWeight: '700', color: tema.colores.textoSobrePrimario },
});
