import { useEffect, useState } from 'react';
import type { PropsContenido } from '../tipos';
import { Adivinanza } from './Adivinanza';
import { Resultado } from './Resultado';
import { crearPartida, esUltima, responder, siguiente, type Partida } from './juego';

// Contenido de la actividad: una adivinanza tras otra y el resultado final. Nada se guarda.
export function Adivinanzas({ avisarPartida }: PropsContenido) {
  const [partida, setPartida] = useState<Partida>(() => crearPartida());

  // La partida empieza al abrir la actividad.
  useEffect(() => {
    avisarPartida(true);
  }, []);

  // Al responder la quinta adivinanza la partida deja de estar en curso.
  const alResponder = (opcion: string) => {
    const nueva = responder(partida, opcion);
    setPartida(nueva);
    if (esUltima(nueva) && partida.elegida === null && nueva.elegida !== null) avisarPartida(false);
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
  return <Adivinanza partida={partida} alResponder={alResponder} alSiguiente={() => setPartida(siguiente(partida))} />;
}
