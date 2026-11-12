import { useEffect, useState } from 'react';
import type { PropsContenido } from '../tipos';
import { Palabra } from './Palabra';
import { Resultado } from './Resultado';
import {
  borrarUltima,
  colocarLetra,
  comprobar,
  crearPartida,
  empezarDeNuevo,
  esUltima,
  siguiente,
  verRespuesta,
  type Partida,
} from './juego';

// Contenido de la actividad: una palabra tras otra y el resultado final. Nada se guarda.
export function FormaPalabra({ avisarPartida }: PropsContenido) {
  const [partida, setPartida] = useState<Partida>(() => crearPartida());

  // La partida empieza al abrir la actividad.
  useEffect(() => {
    avisarPartida(true);
  }, [avisarPartida]);

  // Aplica una regla y avisa de que la partida acaba cuando se cierra la quinta palabra.
  const aplicar = (regla: (p: Partida) => Partida) => {
    const nueva = regla(partida);
    setPartida(nueva);
    if (esUltima(nueva) && partida.estado === 'jugando' && nueva.estado !== 'jugando') avisarPartida(false);
  };

  if (partida.terminada) {
    return (
      <Resultado
        aciertos={partida.aciertos}
        alJugarOtraVez={() => {
          setPartida(crearPartida());
          avisarPartida(true);
        }}
      />
    );
  }
  return (
    <Palabra
      partida={partida}
      alColocar={(id) => aplicar((p) => colocarLetra(p, id))}
      alComprobar={() => aplicar(comprobar)}
      alBorrarUltima={() => aplicar(borrarUltima)}
      alEmpezarDeNuevo={() => aplicar(empezarDeNuevo)}
      alVerRespuesta={() => aplicar(verRespuesta)}
      alSiguiente={() => aplicar((p) => siguiente(p))}
    />
  );
}
