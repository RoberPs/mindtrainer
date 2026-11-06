import { useState } from 'react';
import type { PropsContenido } from '../tipos';
import { ElegirTamano } from './ElegirTamano';
import { Felicitacion } from './Felicitacion';
import { Tablero } from './Tablero';
import { crearPartida, seguir, tocarCarta, type Partida, type Tamano } from './juego';

// Contenido de la actividad: elegir tamaño, tablero y felicitación. Nada se guarda.
export function Parejas({ avisarPartida }: PropsContenido) {
  const [partida, setPartida] = useState<Partida | null>(null);

  const elegir = (tamano: Tamano) => {
    setPartida(crearPartida(tamano));
    avisarPartida(true);
  };

  const tocar = (posicion: number) => {
    if (!partida) return;
    const nueva = tocarCarta(partida, posicion);
    setPartida(nueva);
    if (nueva.terminada && !partida.terminada) avisarPartida(false);
  };

  if (!partida) return <ElegirTamano alElegir={elegir} />;
  if (partida.terminada) {
    return <Felicitacion intentos={partida.intentos} alJugarOtraVez={() => setPartida(null)} />;
  }
  return <Tablero partida={partida} alTocarCarta={tocar} alSeguir={() => setPartida(seguir(partida))} />;
}
