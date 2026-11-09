import { createContext, useContext, type ReactNode } from 'react';
import { tema } from '../tema';

export type ColorJuego = { fondo: string; texto: string };

const porDefecto: ColorJuego = { fondo: tema.colores.primario, texto: tema.colores.textoSobrePrimario };

const Contexto = createContext<ColorJuego>(porDefecto);

// Color propio de un juego: lo pone MarcoActividad y lo leen sus botones y elementos.
export function ProveedorColorJuego({ fondo, texto, children }: ColorJuego & { children: ReactNode }) {
  return <Contexto.Provider value={{ fondo, texto }}>{children}</Contexto.Provider>;
}

export function useColorJuego(): ColorJuego {
  return useContext(Contexto);
}
