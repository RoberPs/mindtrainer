# Guía de comprobación: Actividad "Sopa de letras"

Sirve para demostrar que la funcionalidad cumple la spec. Tiene dos partes: una para una
persona no técnica y mayor, usando solo la app, y otra automática.

## Parte 1. Comprobación con la app (persona no técnica)

**Antes de empezar**: la app instalada en el móvil. "Sopa de letras" ya aparece en la lista de
inicio junto a "Parejas" y "Forma la palabra".

| # | Qué hacer | Qué debe verse | Criterio |
|---|-----------|----------------|----------|
| 1 | Abrir la app | En la lista aparece "Sopa de letras" con su icono y una línea de descripción. | RF-019 |
| 2 | Tocar "Sopa de letras" | Arriba, una palabra (por ejemplo, "NUBE") con un texto que explica qué buscar; una cuadrícula de 5 filas y 6 columnas con letras grandes; y una lista con "???" tres veces y "Te faltan 3 palabras", todo con iconos. | RF-001, RF-009, RF-016, CE-001 |
| 3 | Tocar una letra cualquiera | La letra queda marcada de forma clara (borde grueso) y un mensaje con icono invita a tocar la última letra. | RF-003 |
| 4 | Tocar otra vez esa misma letra | La marca se quita, sin ningún mensaje de error. | RF-007 |
| 5 | Tocar una letra y después otra que no esté ni en su fila ni en su columna | Un mensaje amable pide marcar una línea recta y la marca desaparece. | RF-006, CE-004 |
| 6 | Tocar dos letras de una misma fila o columna que no formen ninguna palabra buscada | Un mensaje amable de que esa no es una de las palabras y la marca desaparece. | RF-005, CE-004 |
| 7 | Esperar un minuto sin tocar nada | No cambia nada ni sale ningún aviso de tiempo. | RF-015, CE-006 |
| 8 | Marcar bien una palabra (primera y última letra) | Toda la palabra queda resaltada, aparece escrita y tachada en la lista con un icono de "hecho", y sale un mensaje positivo. | RF-004 |
| 9 | Mirar la lista tras la primera palabra | "Te faltan 2 palabras"; las otras dos siguen como "???" y nunca se ve cuáles son. | RF-009, CE-005 |
| 10 | Marcar de nuevo la palabra ya encontrada | No pasa nada: ni mensaje de error ni cambio. | RF-007 |
| 11 | Marcar otra palabra buscada empezando por la última letra y acabando por la primera | Cuenta como fallo normal, con el mensaje amable. | RF-005, RF-008 |
| 12 | Encontrar la segunda palabra | "Te falta 1 palabra", en singular. | RF-009 |
| 13 | Encontrar la tercera palabra | La cuadrícula sigue visible con las 3 palabras resaltadas; un mensaje de felicitación con icono, "Has necesitado N intentos" y los botones "Jugar otra vez" y "Volver al inicio". | RF-010, CE-002 |
| 14 | Comprobar el número de intentos | N es 3 más las veces que fallaste con dos letras en una misma fila o columna (sin contar los pasos 4, 5 y 10). | RF-008, CE-002 |
| 15 | Tocar una letra de la cuadrícula tras terminar | No pasa nada: ya no acepta marcas. | RF-010 |
| 16 | Tocar "Jugar otra vez" | Empieza una partida con otra palabra de referencia y otra cuadrícula, sin palabras encontradas y con los intentos a cero. | RF-011, CE-003 |
| 17 | Jugar 10 partidas seguidas | Nunca sale la misma sopa dos veces seguidas y en todas se encuentran las 3 palabras. | RF-011, RF-013, CE-003 |
| 18 | En una partida a medias, tocar "Volver al inicio" | Sale el aviso de salida del marco; al aceptar vuelve a la lista. Al entrar otra vez empieza una partida nueva. | RF-019, RF-020 |
| 19 | Tras encontrar la tercera palabra, tocar "Volver al inicio" | Sale a la lista sin preguntar nada. | RF-019 |
| 20 | Mirar todas las pantallas | Todo en español de España, con letra grande, buen contraste y cada botón y mensaje con icono y texto. No hay cuentas atrás ni prisas. Las casillas marcadas y encontradas se distinguen sin depender solo del color. | RF-015, RF-016, RF-017, RF-018 |
| 21 | Poner el móvil en modo avión y jugar una partida | Funciona igual. | RF-020 |

La funcionalidad está lista cuando los 21 pasos salen como se describe.

## Parte 2. Comprobación automática

```bash
npm test           # todas las pruebas, incluidas las de Sopa de letras
npm run typecheck  # comprobar tipos
```

Las pruebas de esta funcionalidad (`tests/sopa-*.test.tsx`) comprueban:

- La lista de sopas: 5 o más, con cuadrículas de 5 filas por 6 columnas, solo letras permitidas,
  3 palabras distintas y cada una exactamente una vez en horizontal o vertical.
- La partida: la sopa se sortea de la lista y nunca es la anterior.
- Marcar: primera letra, quitar la marca, línea no recta (sin intento).
- Palabra encontrada en horizontal y en vertical; palabra no encontrada; palabra marcada al revés
  (cuenta como fallo); palabra ya encontrada (no hace nada).
- Los intentos: 3 sin fallos y 3 más los fallos.
- Cuántas palabras faltan, con el singular y el plural.
- El final: al encontrar la tercera aparece la felicitación con los intentos y "Jugar otra vez"
  empieza de cero con otra sopa.
- La actividad avisa de que empieza una partida y de que termina al encontrar la tercera.

Los pasos 7, 17, 19 y 21 (esperar sin que pase nada, varias partidas seguidas, salida sin aviso y
modo avión) necesitan una persona y un móvil; los hace una persona, no el agente. También la
revisión de que ninguna cuadrícula esconde otra palabra relacionada que se pudiera marcar sin
reconocerse (RF-013), porque no hay un diccionario con el que automatizarla.
