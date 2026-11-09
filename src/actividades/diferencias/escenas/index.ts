import type { Ambiente } from '../composicion';
import { cocina } from './cocina';
import { dormitorio } from './dormitorio';
import { granja } from './granja';
import { jardin } from './jardin';
import { playa } from './playa';
import { salon } from './salon';

// Los 6 ambientes de "Diferencias". Cada partida compone una escena distinta con uno de ellos.
export const ambientes: Ambiente[] = [salon, cocina, jardin, dormitorio, playa, granja];
