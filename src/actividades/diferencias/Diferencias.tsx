import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { ElegirOpcion } from '../../componentes/ElegirOpcion';
import { Icono } from '../../componentes/Icono';
import { textosDiferencias as t } from '../../textos';
import { tema } from '../../tema';
import type { PropsContenido } from '../tipos';
import { Dibujo } from './Dibujo';
import { Felicitacion } from './Felicitacion';
import { dibujosDe, proporcionDibujo, type Total } from './escena';
import { crearPartida, faltan, tocar, type Partida } from './juego';

// Alto que ocupan el marco, la instrucción, el aviso de las que faltan, los rótulos, el hueco
// del mensaje de fallo y los espacios. El resto se reparte entre los dos dibujos.
const altoReservado = 410;
// Con 7 diferencias las zonas son más pequeñas: con este ancho miden al menos 44 puntos.
const anchoMinimo = 240;

const opciones = [
  { valor: 3 as Total, texto: t.tres, icono: { nombre: 'numeric-3-circle' }, idIcono: 'icono-tres' },
  { valor: 5 as Total, texto: t.cinco, icono: { nombre: 'numeric-5-circle' }, idIcono: 'icono-cinco' },
  { valor: 7 as Total, texto: t.siete, icono: { nombre: 'numeric-7-circle' }, idIcono: 'icono-siete' },
];

// Contenido de la actividad: elegir cuántas diferencias, los dos dibujos y la felicitación. Nada se guarda.
export function Diferencias({ avisarPartida }: PropsContenido) {
  const [partida, setPartida] = useState<Partida | null>(null);
  // Escena de la partida anterior: la siguiente es siempre otra distinta.
  const [escenaAnterior, setEscenaAnterior] = useState<string | undefined>(undefined);
  const { width, height } = useWindowDimensions();

  const elegir = (total: Total) => {
    const nueva = crearPartida(total, escenaAnterior);
    setPartida(nueva);
    setEscenaAnterior(nueva.escena.id);
    avisarPartida(true);
  };

  if (!partida) return <ElegirOpcion invitacion={t.elegirNumero} opciones={opciones} alElegir={elegir} />;

  const alTocar = (x: number, y: number) => {
    const nueva = tocar(partida, x, y);
    setPartida(nueva);
    if (nueva.terminada && !partida.terminada) avisarPartida(false);
  };

  if (partida.terminada) {
    return (
      <Felicitacion
        total={partida.total}
        toques={partida.toques}
        alJugarOtraVez={() => setPartida(null)}
      />
    );
  }

  // Los dos dibujos caben a la vez: se toma el tamaño más pequeño entre el ancho y el alto disponibles.
  const ancho = Math.max(anchoMinimo, Math.min(width - 2 * tema.espacio, ((height - altoReservado) / 2) * proporcionDibujo));
  const alto = ancho / proporcionDibujo;
  const falta = faltan(partida);
  const { arriba, abajo, diferencias } = dibujosDe(partida.escena, partida.total);

  return (
    <ScrollView contentContainerStyle={estilos.pantalla}>
      <Text style={estilos.instruccion}>{t.instruccion}</Text>
      <View style={estilos.faltan}>
        <Icono icono={{ nombre: 'magnify' }} tamano={40} testID="icono-faltan" />
        <Text style={estilos.textoFaltan}>{t.faltan(falta)}</Text>
      </View>
      <Dibujo lado="arriba" rotulo={t.rotuloArriba} elementos={arriba} diferencias={diferencias} encontradas={partida.encontradas} ancho={ancho} alto={alto} />
      <Dibujo
        lado="abajo"
        rotulo={t.rotuloAbajo}
        elementos={abajo}
        diferencias={diferencias}
        encontradas={partida.encontradas}
        ancho={ancho}
        alto={alto}
        alTocar={alTocar}
      />
      {/* Hueco fijo: el mensaje de fallo aparece y desaparece sin mover los dibujos. */}
      <View style={estilos.fallo}>
        {partida.fallo && (
          <>
            <Icono icono={{ nombre: 'emoticon-neutral' }} tamano={40} testID="icono-fallo" />
            <Text style={estilos.textoFallo}>{t.fallo}</Text>
          </>
        )}
      </View>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  pantalla: { gap: 8, padding: tema.espacio, alignItems: 'center' },
  instruccion: { fontSize: tema.letra.normal, fontWeight: '700', color: tema.colores.texto, textAlign: 'center' },
  faltan: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  textoFaltan: { fontSize: tema.letra.titulo, fontWeight: '700', color: tema.colores.texto },
  fallo: { minHeight: 72, flexDirection: 'row', alignItems: 'center', gap: 8 },
  textoFallo: { flex: 1, fontSize: tema.letra.normal, fontWeight: '700', color: tema.colores.texto },
});
