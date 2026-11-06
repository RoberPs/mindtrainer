import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { Icono } from '../../componentes/Icono';
import { textosDiferencias as t } from '../../textos';
import { tema } from '../../tema';
import type { PropsContenido } from '../tipos';
import { Dibujo } from './Dibujo';
import { Felicitacion } from './Felicitacion';
import { dibujoAbajo, dibujoArriba, proporcionDibujo } from './escena';
import { crearPartida, faltan, tocar, type Partida } from './juego';

// Alto que ocupan el marco, la instrucción, el aviso de las que faltan, los rótulos, el hueco
// del mensaje de fallo y los espacios. El resto se reparte entre los dos dibujos.
const altoReservado = 410;
const anchoMinimo = 160;

// Contenido de la actividad: los dos dibujos y la felicitación. Nada se guarda.
export function Diferencias({ avisarPartida }: PropsContenido) {
  const [partida, setPartida] = useState<Partida>(() => crearPartida());
  const { width, height } = useWindowDimensions();

  // La partida empieza al abrir la actividad.
  useEffect(() => {
    avisarPartida(true);
  }, []);

  const alTocar = (x: number, y: number) => {
    const nueva = tocar(partida, x, y);
    setPartida(nueva);
    if (nueva.terminada && !partida.terminada) avisarPartida(false);
  };

  if (partida.terminada) {
    return (
      <Felicitacion
        toques={partida.toques}
        alJugarOtraVez={() => {
          setPartida(crearPartida());
          avisarPartida(true);
        }}
      />
    );
  }

  // Los dos dibujos caben a la vez: se toma el tamaño más pequeño entre el ancho y el alto disponibles.
  const ancho = Math.max(anchoMinimo, Math.min(width - 2 * tema.espacio, ((height - altoReservado) / 2) * proporcionDibujo));
  const alto = ancho / proporcionDibujo;
  const falta = faltan(partida);

  return (
    <ScrollView contentContainerStyle={estilos.pantalla}>
      <Text style={estilos.instruccion}>{t.instruccion}</Text>
      <View style={estilos.faltan}>
        <Icono icono={{ nombre: 'magnify' }} tamano={40} testID="icono-faltan" />
        <Text style={estilos.textoFaltan}>{t.faltan(falta)}</Text>
      </View>
      <Dibujo lado="arriba" rotulo={t.rotuloArriba} elementos={dibujoArriba} encontradas={partida.encontradas} ancho={ancho} alto={alto} />
      <Dibujo
        lado="abajo"
        rotulo={t.rotuloAbajo}
        elementos={dibujoAbajo}
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
