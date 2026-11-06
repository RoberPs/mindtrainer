import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Icono } from '../../componentes/Icono';
import { textosSopa as t } from '../../textos';
import { tema } from '../../tema';
import type { PropsContenido } from '../tipos';
import { Cuadricula } from './Cuadricula';
import { Felicitacion } from './Felicitacion';
import { crearPartida, haTerminado, tocarCasilla, type Casilla, type Partida } from './juego';
import { ListaPalabras } from './ListaPalabras';

// Contenido de la actividad: una sopa por partida. Nada se guarda.
export function SopaDeLetras({ avisarPartida }: PropsContenido) {
  const [partida, setPartida] = useState<Partida>(() => crearPartida());

  // La partida empieza al abrir la actividad.
  useEffect(() => {
    avisarPartida(true);
  }, []);

  // Aplica el toque y avisa de que la partida acaba al encontrar la tercera palabra.
  const alTocar = (casilla: Casilla) => {
    const nueva = tocarCasilla(partida, casilla);
    setPartida(nueva);
    if (haTerminado(nueva) && !haTerminado(partida)) avisarPartida(false);
  };
  const alJugarOtraVez = () => {
    setPartida(crearPartida(partida.sopa.id));
    avisarPartida(true);
  };
  const terminada = haTerminado(partida);
  const mensaje = terminada ? null : mensajeActual(partida);

  return (
    <ScrollView contentContainerStyle={estilos.pantalla}>
      <View style={estilos.cabecera}>
        <Text style={estilos.etiqueta}>{t.etiqueta}</Text>
        <Text style={estilos.referencia}>{partida.sopa.referencia}</Text>
      </View>

      <Cuadricula partida={partida} alTocar={alTocar} />

      {terminada && <Felicitacion intentos={partida.intentos} alJugarOtraVez={alJugarOtraVez} />}

      {mensaje && (
        <View style={estilos.mensaje}>
          <Icono icono={{ nombre: mensaje.icono }} tamano={64} testID={mensaje.idIcono} />
          <Text style={estilos.textoMensaje}>{mensaje.texto}</Text>
        </View>
      )}

      <ListaPalabras partida={partida} />
    </ScrollView>
  );
}

function mensajeActual(partida: Partida) {
  if (partida.marca) return { icono: 'gesture-tap', idIcono: 'icono-invitar', texto: t.invitar };
  if (partida.aviso === 'encontrada') return { icono: 'emoticon-happy', idIcono: 'icono-acierto', texto: t.acierto };
  if (partida.aviso === 'incorrecta') return { icono: 'emoticon-neutral', idIcono: 'icono-fallo', texto: t.fallo };
  if (partida.aviso === 'norecta') return { icono: 'vector-line', idIcono: 'icono-no-recta', texto: t.noRecta };
  return null;
}

const estilos = StyleSheet.create({
  pantalla: { gap: tema.espacio, padding: tema.espacio },
  cabecera: { alignItems: 'center', gap: 4 },
  etiqueta: { fontSize: tema.letra.normal, color: tema.colores.texto, textAlign: 'center' },
  referencia: { fontSize: tema.letra.titulo, fontWeight: '700', color: tema.colores.primario },
  mensaje: { alignItems: 'center', gap: 8 },
  textoMensaje: { fontSize: tema.letra.titulo, fontWeight: '700', color: tema.colores.texto, textAlign: 'center' },
});
