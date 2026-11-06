import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { BotonGrande } from '../../componentes/BotonGrande';
import { Icono } from '../../componentes/Icono';
import { textosAdivinanzas as t } from '../../textos';
import { tema } from '../../tema';
import { Respuesta, type EstadoRespuesta } from './Respuesta';
import { esUltima, type Partida } from './juego';

type Props = {
  partida: Partida;
  alResponder: (opcion: string) => void;
  alSiguiente: () => void;
};

// Pantalla de una adivinanza: número, texto, tres respuestas, mensaje y botón para seguir.
export function Adivinanza({ partida, alResponder, alSiguiente }: Props) {
  const turno = partida.turnos[partida.indice];
  const { correcta } = turno.adivinanza;
  const respondida = partida.elegida !== null;
  const acierto = partida.elegida === correcta;

  const estadoDe = (opcion: string): EstadoRespuesta => {
    if (!respondida) return 'pendiente';
    if (opcion === correcta) return 'correcta';
    return opcion === partida.elegida ? 'elegidaIncorrecta' : 'otra';
  };

  return (
    <ScrollView contentContainerStyle={estilos.pantalla}>
      <View style={estilos.numero}>
        <Icono icono={{ nombre: 'help-circle' }} testID="icono-numero" />
        <Text style={estilos.textoNumero}>{t.numero(partida.indice + 1)}</Text>
      </View>

      <Text style={estilos.adivinanza}>{turno.adivinanza.texto}</Text>

      {turno.opciones.map((opcion, i) => (
        <Respuesta
          key={opcion}
          texto={opcion}
          estado={estadoDe(opcion)}
          idPantalla={`respuesta-${i}`}
          idIcono={`icono-respuesta-${i}`}
          alTocar={() => alResponder(opcion)}
        />
      ))}

      {respondida && (
        <>
          <View style={estilos.mensaje}>
            <Icono
              icono={{ nombre: acierto ? 'emoticon-happy' : 'emoticon-neutral' }}
              tamano={64}
              testID={acierto ? 'icono-acierto' : 'icono-fallo'}
            />
            <Text style={estilos.textoMensaje}>{acierto ? t.acierto : t.fallo(correcta)}</Text>
          </View>
          <BotonGrande
            texto={esUltima(partida) ? t.verResultado : t.siguiente}
            icono={{ nombre: esUltima(partida) ? 'flag-checkered' : 'arrow-right-circle' }}
            idIcono="icono-siguiente"
            alTocar={alSiguiente}
          />
        </>
      )}
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  pantalla: { gap: tema.espacio, padding: tema.espacio },
  numero: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  textoNumero: { fontSize: tema.letra.normal, fontWeight: '700', color: tema.colores.texto },
  adivinanza: { fontSize: tema.letra.titulo, fontWeight: '700', color: tema.colores.texto },
  mensaje: { alignItems: 'center', gap: 8 },
  textoMensaje: { fontSize: tema.letra.titulo, fontWeight: '700', color: tema.colores.texto, textAlign: 'center' },
});
