import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { ElegirOpcion } from '../../componentes/ElegirOpcion';
import { Icono } from '../../componentes/Icono';
import { textosSopa as t } from '../../textos';
import { tema } from '../../tema';
import type { PropsContenido } from '../tipos';
import { Cuadricula } from './Cuadricula';
import { Felicitacion } from './Felicitacion';
import { crearPartida, haTerminado, tocarCasilla, type Casilla, type Partida } from './juego';
import { ListaPalabras } from './ListaPalabras';
import type { Tamano } from './sopas';

const opciones = [
  { valor: 'pequena' as Tamano, texto: t.pequena, icono: { nombre: 'size-s' }, idIcono: 'icono-pequena' },
  { valor: 'mediana' as Tamano, texto: t.mediana, icono: { nombre: 'size-m' }, idIcono: 'icono-mediana' },
];

// Contenido de la actividad: elegir el tamaño y una sopa por partida. Nada se guarda.
export function SopaDeLetras({ avisarPartida }: PropsContenido) {
  const [partida, setPartida] = useState<Partida | null>(null);
  // Sopa de la partida anterior: la siguiente es siempre otra distinta.
  const [sopaAnterior, setSopaAnterior] = useState<string | undefined>(undefined);

  const elegir = (tamano: Tamano) => {
    const nueva = crearPartida(tamano, sopaAnterior);
    setPartida(nueva);
    setSopaAnterior(nueva.sopa.id);
    avisarPartida(true);
  };

  if (!partida) return <ElegirOpcion invitacion={t.elegirTamano} opciones={opciones} alElegir={elegir} />;

  // Aplica el toque y avisa de que la partida acaba al encontrar la última palabra.
  const alTocar = (casilla: Casilla) => {
    const nueva = tocarCasilla(partida, casilla);
    setPartida(nueva);
    if (haTerminado(nueva) && !haTerminado(partida)) avisarPartida(false);
  };
  const terminada = haTerminado(partida);
  const mensaje = terminada ? null : mensajeActual(partida);

  return (
    <ScrollView contentContainerStyle={estilos.pantalla}>
      <View style={estilos.cabecera}>
        <Text style={estilos.etiqueta}>{t.etiqueta(partida.sopa.palabras.length)}</Text>
        <Text style={estilos.referencia}>{partida.sopa.referencia}</Text>
      </View>

      <Cuadricula partida={partida} alTocar={alTocar} />

      {terminada && <Felicitacion
          palabras={partida.sopa.palabras.length}
          intentos={partida.intentos}
          alJugarOtraVez={() => setPartida(null)}
        />}

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
