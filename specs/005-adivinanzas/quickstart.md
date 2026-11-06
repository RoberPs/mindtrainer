# Guía de comprobación: Actividad "Adivinanzas"

Sirve para demostrar que la funcionalidad cumple la spec. Tiene dos partes: una para una
persona no técnica y mayor, usando solo la app, y otra automática.

## Parte 1. Comprobación con la app (persona no técnica)

**Antes de empezar**: la app instalada en el móvil. "Adivinanzas" ya aparece en la lista de
inicio junto a "Parejas", "Forma la palabra" y "Sopa de letras".

| # | Qué hacer | Qué debe verse | Criterio |
|---|-----------|----------------|----------|
| 1 | Abrir la app | En la lista aparece "Adivinanzas" con su icono y una línea de descripción. | RF-017 |
| 2 | Tocar "Adivinanzas" | "Adivinanza 1 de 5", el texto de una adivinanza en letra grande y tres botones con una respuesta cada uno, todo con iconos. | RF-001, RF-012, RF-015, CE-001 |
| 3 | Esperar un minuto sin tocar nada | No cambia nada ni sale ningún aviso de tiempo. | RF-013, CE-006 |
| 4 | Tocar la respuesta correcta | Mensaje positivo con icono. La respuesta correcta queda señalada con un icono, las tres siguen visibles y aparece el botón "Siguiente". | RF-003, RF-005 |
| 5 | Tocar otra respuesta de la misma adivinanza | No pasa nada: no cambia la respuesta ni la puntuación. | RF-002, CE-005 |
| 6 | Tocar "Siguiente" | Aparece "Adivinanza 2 de 5", con otras tres respuestas y sin ningún mensaje anterior. | RF-006 |
| 7 | Tocar una respuesta que sea incorrecta | Mensaje amable que dice "La respuesta correcta es:" y la palabra. La correcta queda señalada, la elegida se distingue con otro icono y aparece "Siguiente". | RF-004, RF-005, CE-003 |
| 8 | Seguir hasta la adivinanza 5 y responderla | El botón dice "Ver resultado" en lugar de "Siguiente". | RF-006 |
| 9 | Tocar "Ver resultado" | Un icono de celebración, "X de 5" con el número de adivinanzas que has acertado, un mensaje según la puntuación y los botones "Jugar otra vez" y "Volver al inicio". | RF-007, CE-002 |
| 10 | Comprobar la puntuación | X coincide con las veces que tocaste la respuesta correcta (pasos 4 y siguientes). | CE-002 |
| 11 | Tocar "Jugar otra vez" | Empieza otra partida en "Adivinanza 1 de 5", sin mensajes anteriores y con los aciertos a cero. | RF-008 |
| 12 | Jugar 10 partidas seguidas | En cada partida, las 5 adivinanzas son distintas entre sí. La respuesta correcta aparece unas veces arriba, otras en medio y otras abajo. | RF-009, CE-004 |
| 13 | Fallar las 5 adivinanzas de una partida | El resultado dice "0 de 5" con un mensaje amable y de ánimo. | RF-007 |
| 14 | Acertar las 5 de una partida | El resultado dice "5 de 5" con un mensaje de enhorabuena. | RF-007 |
| 15 | En una partida a medias, tocar "Volver al inicio" | Sale el aviso de salida del marco; al aceptar vuelve a la lista. Al entrar otra vez empieza una partida nueva. | RF-017, RF-018 |
| 16 | En el resultado, tocar "Volver al inicio" | Sale a la lista sin preguntar nada. | RF-017 |
| 17 | Mirar todas las pantallas | Todo en español de España, con letra grande, buen contraste y cada botón y mensaje con icono y texto. No hay cuentas atrás ni prisas. Acierto y fallo se distinguen sin depender solo del color. | RF-013, RF-014, RF-015, RF-016 |
| 18 | Leer las adivinanzas de varias partidas | Son tradicionales, las conoces y solo una de las tres respuestas es la correcta. | RF-011 |
| 19 | Poner el móvil en modo avión y jugar una partida | Funciona igual. | RF-018 |

La funcionalidad está lista cuando los 19 pasos salen como se describe.

## Parte 2. Comprobación automática

```bash
npm test           # todas las pruebas, incluidas las de Adivinanzas
npm run typecheck  # comprobar tipos
```

Las pruebas de esta funcionalidad (`tests/adivinanzas-*.test.tsx`) comprueban:

- El banco: 10 o más adivinanzas, cada una con 3 respuestas distintas de una sola palabra, `id`
  distintos y sin la respuesta dentro del texto.
- La partida: 5 adivinanzas distintas del banco, cada una con sus 3 respuestas, y el orden de las
  respuestas sorteado (con un azar fijo cambia y la correcta no queda siempre en el mismo sitio).
- Responder: respuesta correcta suma un acierto; incorrecta no suma y muestra la correcta; una
  segunda pulsación no cambia nada (un solo intento).
- Siguiente: no avanza sin responder; avanza tras responder; la quinta lleva al resultado.
- El resultado: "X de 5" con 0, 3 y 5 aciertos, su mensaje y que "Jugar otra vez" empieza de
  cero.
- La actividad avisa de que empieza una partida y de que termina al responder la quinta.

Los pasos 3, 12, 16, 18 y 19 (esperar sin que pase nada, varias partidas seguidas, salida sin
aviso, que las adivinanzas sean conocidas y tengan una sola respuesta clara, y modo avión)
necesitan una persona y un móvil; los hace una persona, no el agente.
