import type { Escena } from '../escena';
import { cocina } from './cocina';
import { jardin } from './jardin';
import { salon } from './salon';

// La lista de escenas de "Diferencias": 3 escenas fijas, cada una con 3 diferencias.
export const escenas: Escena[] = [salon, cocina, jardin];
