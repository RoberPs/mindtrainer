import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BotonGrande } from '../componentes/BotonGrande';
import { textos } from '../textos';
import { tema } from '../tema';
import type { Actividad } from '../actividades/tipos';

type Props = {
  actividad: Actividad;
  alVolver: () => void;
};

// Marco común de toda actividad: botón "Volver al inicio" siempre visible arriba y el
// aviso de salida cuando hay una partida en curso (FR-007, FR-008, FR-011, FR-012).
export function MarcoActividad({ actividad, alVolver }: Props) {
  const [partidaEnCurso, setPartidaEnCurso] = useState(false);
  const [avisoVisible, setAvisoVisible] = useState(false);
  const { Contenido } = actividad;

  const pulsarVolver = () => {
    if (partidaEnCurso) {
      setAvisoVisible(true);
    } else {
      alVolver();
    }
  };

  return (
    <View style={estilos.marco}>
      <View style={estilos.barra}>
        <BotonGrande
          texto={textos.volverAlInicio}
          icono={{ nombre: 'home' }}
          idIcono="icono-volver"
          alTocar={pulsarVolver}
        />
      </View>
      <View style={estilos.contenido}>
        <Contenido avisarPartida={setPartidaEnCurso} />
      </View>
      {avisoVisible && (
        <View style={estilos.velo}>
          <View style={estilos.aviso}>
            <Text style={estilos.textoAviso}>{textos.avisoSalir}</Text>
            <BotonGrande
              texto={textos.siSalir}
              icono={{ nombre: 'check-circle' }}
              idIcono="icono-si-salir"
              alTocar={alVolver}
            />
            <BotonGrande
              texto={textos.noSeguir}
              icono={{ nombre: 'play-circle' }}
              idIcono="icono-no-seguir"
              alTocar={() => setAvisoVisible(false)}
            />
          </View>
        </View>
      )}
    </View>
  );
}

const estilos = StyleSheet.create({
  marco: { flex: 1, backgroundColor: tema.colores.fondo },
  barra: { padding: tema.espacio },
  contenido: { flex: 1 },
  velo: {
    ...StyleSheet.absoluteFill,
    backgroundColor: tema.colores.velo,
    justifyContent: 'center',
    padding: tema.espacio,
  },
  aviso: {
    gap: tema.espacio,
    padding: tema.espacio,
    borderRadius: 12,
    backgroundColor: tema.colores.fondo,
  },
  textoAviso: { fontSize: tema.letra.titulo, fontWeight: '700', color: tema.colores.texto },
});
