# Guía de comprobación: Actividad "Parejas"

Sirve para demostrar que la funcionalidad cumple la spec. Tiene dos partes: una para una
persona no técnica y mayor, usando solo la app, y otra automática.

## Parte 1. Comprobación con la app (persona no técnica)

**Antes de empezar**: la app instalada en el móvil. "Parejas" ya aparece en la lista de
inicio (no hace falta activar actividades de ejemplo).

| # | Qué hacer | Qué debe verse | Criterio |
|---|-----------|----------------|----------|
| 1 | Abrir la app | En la lista aparece "Parejas" con un icono de cartas y una línea de descripción. | RF-001, CE-001 |
| 2 | Tocar "Parejas" | Aparecen tres botones grandes: Pequeña (6 cartas), Mediana (8 cartas) y Grande (12 cartas). | RF-002 |
| 3 | Tocar "Pequeña" | Salen exactamente 6 cartas, todas tapadas, y un marcador "Intentos: 0". Se llega con 3 toques o menos desde que se abre la app. | RF-003, CE-001, CE-002 |
| 4 | Tocar una carta | Se gira y se ve un dibujo con su nombre. | RF-005, RF-006 |
| 5 | Tocar otra carta que NO sea igual | Se ven las dos cartas y aparece un botón grande "Seguir". El marcador sube a 1. | RF-008, RF-010 |
| 6 | Esperar un minuto sin tocar nada | Las dos cartas siguen a la vista; no se tapan solas. | RF-008, CE-003 |
| 7 | Tocar una tercera carta tapada | No pasa nada. | RF-009 |
| 8 | Tocar "Seguir" | Las dos cartas vuelven a taparse y el botón desaparece. | RF-008 |
| 9 | Girar dos cartas que SÍ sean iguales | Se quedan descubiertas y no aparece "Seguir". El marcador sube en 1. | RF-007, RF-010 |
| 10 | Tocar una carta ya descubierta | No pasa nada y el marcador no cambia. | RF-009 |
| 11 | Seguir jugando hasta descubrir todas las parejas | Aparece un mensaje de felicitación con el número de intentos (el mismo que marcaba) y los botones "Jugar otra vez" y "Volver al inicio". | RF-011, CE-004 |
| 12 | Tocar "Jugar otra vez" | Vuelve a la elección de tamaño. | RF-012 |
| 13 | Elegir "Mediana" y comprobar | Salen exactamente 8 cartas, tapadas y con "Intentos: 0". El orden de los dibujos es distinto al de antes. | RF-003, RF-004, CE-006 |
| 14 | Terminar una partida "Grande" | Salen exactamente 12 cartas (3 columnas) y se puede llegar a la felicitación. Cada dibujo aparece dos veces. | RF-003, CE-002, CE-004 |
| 15 | En una partida a medias, tocar "Volver al inicio" | Sale el aviso de salida del marco; al aceptar vuelve a la lista. Al entrar otra vez en "Parejas" empieza en la elección de tamaño. | RF-015 |
| 16 | Mirar todas las pantallas | Todo en español de España, con letra grande, buen contraste y cada botón con icono y texto. No hay cuentas atrás ni prisas en ningún momento. | RF-013, RF-014 |
| 17 | Poner el móvil en modo avión y jugar una partida | Los dibujos se ven igual. | RF-014 |
| 18 | Enseñar las cartas a 10 personas mayores y preguntarles qué son (sin que lean el nombre) | Al menos 9 de las 10 reconocen todos los dibujos. | CE-005 |

La funcionalidad está lista cuando los 18 pasos salen como se describe.

## Parte 2. Comprobación automática

```bash
npm test           # todas las pruebas, incluidas las de Parejas
npm run typecheck  # comprobar tipos
```

Las pruebas de esta funcionalidad (`tests/parejas-*.test.tsx`) comprueban:

- El número de cartas de cada tamaño y que cada dibujo sale dos veces.
- Pareja correcta: las dos cartas quedan descubiertas.
- Pareja incorrecta: las dos se ven hasta pulsar "Seguir" y entonces se tapan.
- Los casos límite: tocar una descubierta o tocar con dos distintas a la vista no hace nada.
- Los intentos: suben de uno en uno al girar la segunda carta.
- El final: al descubrir la última pareja aparecen la felicitación, los intentos y los dos botones.
- "Jugar otra vez" lleva a la elección de tamaño con una partida nueva.

Los pasos 6, 17 y 18 (esperar sin que pase nada, modo avión y reconocimiento de los dibujos)
necesitan una persona y un móvil; los hace una persona, no el agente.
