import { useEffect, useState } from 'react';
import { Platform, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { Icono } from '../../componentes/Icono';
import { textosDiferencias as t } from '../../textos';
import { tema } from '../../tema';
import type { PropsContenido } from '../tipos';
import { Dibujo } from './Dibujo';
import { Felicitacion } from './Felicitacion';
import { dibujosDe, proporcionDibujo } from './escena';
import { crearPartida, faltan, tocar, type Partida } from './juego';

// Alto que ocupan el marco, la instrucción, el aviso de las que faltan, los rótulos, el hueco
// del mensaje de fallo y los espacios. El resto se reparte entre los dos dibujos.
const altoReservado = 410;
// Con este ancho las zonas de las diferencias miden al menos 44 puntos.
const anchoMinimo = 220;

// Contenido de la actividad: los dos dibujos y la felicitación. La partida empieza al abrirla. Nada se guarda.
export function Diferencias({ avisarPartida }: PropsContenido) {
  const [partida, setPartida] = useState<Partida>(() => crearPartida());
  const ventana = useWindowDimensions();
  // En la demo web la app ocupa una columna con ancho de móvil, no toda la ventana.
  const width = Platform.OS === 'web' ? Math.min(ventana.width, tema.anchoMaximoWeb) : ventana.width;
  const { height } = ventana;

  useEffect(() => {
    avisarPartida(true);
    // Solo al abrir la actividad.
  }, [avisarPartida]);

  // La siguiente partida es siempre de otro ambiente y con otra composición.
  const jugarOtraVez = () => {
    setPartida(crearPartida(partida.escena));
    avisarPartida(true);
  };

  const alTocar = (x: number, y: number) => {
    const nueva = tocar(partida, x, y);
    setPartida(nueva);
    if (nueva.terminada && !partida.terminada) avisarPartida(false);
  };

  if (partida.terminada) {
    return <Felicitacion toques={partida.toques} alJugarOtraVez={jugarOtraVez} />;
  }

  // Los dos dibujos caben a la vez: se toma el tamaño más pequeño entre el ancho y el alto disponibles.
  const ancho = Math.max(anchoMinimo, Math.min(width - 2 * tema.espacio, ((height - altoReservado) / 2) * proporcionDibujo));
  const alto = ancho / proporcionDibujo;
  const falta = faltan(partida);
  const { arriba, abajo, diferencias } = dibujosDe(partida.escena);

  return (
    <ScrollView contentContainerStyle={estilos.pantalla}>
      <Text style={estilos.instruccion}>{t.instruccion}</Text>
      <View style={estilos.faltan}>
        <Icono icono={{ nombre: 'magnify' }} tamano={40} testID="icono-faltan" />
        <Text style={estilos.textoFaltan}>{t.faltan(falta)}</Text>
      </View>
      <Dibujo lado="arriba" rotulo={t.rotuloArriba} fondo={partida.escena.fondo} elementos={arriba} diferencias={diferencias} encontradas={partida.encontradas} ancho={ancho} alto={alto} />
      <Dibujo
        lado="abajo"
        rotulo={t.rotuloAbajo}
        fondo={partida.escena.fondo}
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
