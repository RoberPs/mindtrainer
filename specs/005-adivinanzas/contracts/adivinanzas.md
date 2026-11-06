# Contrato de la actividad "Adivinanzas"

La actividad no expone nada a otros sistemas. Tiene dos interfaces: la que mantiene con la
app (el contrato de actividad de la funcionalidad 001) y lo que ve la persona.

## Con la app: contrato de actividad

Cumple [actividad.md](../../001-pantalla-inicio/contracts/actividad.md):

| Campo | Valor |
|-------|-------|
| Identificador | `adivinanzas` |
| Icono | `help-circle` (de `MaterialCommunityIcons`) |
| Nombre | "Adivinanzas" |
| Descripción | "Descubre la respuesta de cada adivinanza" (una línea, en `src/textos.ts`) |
| Contenido | `Adivinanzas` |

- Llama a `avisarPartida(true)` al empezar una partida (al abrir la actividad y con "Jugar otra
  vez").
- Llama a `avisarPartida(false)` al responder la quinta adivinanza.
- No pinta el "Volver al inicio" de la partida: lo pone el marco, siempre visible, también en el
  resultado.

## Reglas del juego (funciones puras)

Es la única interfaz interna que se prueba directamente.

| Función | Recibe | Devuelve |
|---------|--------|----------|
| `crearPartida(azar?)` | Opcionalmente, una función de azar | Partida nueva con 5 adivinanzas distintas del banco, cada una con sus 3 respuestas sorteadas, sin respuesta elegida y con 0 aciertos |
| `responder(partida, opcion)` | Partida y respuesta tocada | Partida con la respuesta elegida y un acierto más si era la correcta. Igual si ya había respondido o ha terminado |
| `siguiente(partida)` | Partida | Partida en la adivinanza siguiente o, tras la quinta, terminada. Igual si aún no ha respondido |
| `esUltima(partida)` | Partida | Verdadero si la adivinanza actual es la quinta |

Garantías:
1. `crearPartida` usa 5 adivinanzas del banco, sin repetir ninguna, y cada una con su correcta y
   sus dos incorrectas, en cualquier orden.
2. Solo hay un intento por adivinanza: una segunda pulsación nunca cambia la respuesta elegida ni
   los aciertos.
3. Responder bien suma exactamente un acierto; responder mal no suma ni resta nada.
4. No se puede pasar a la siguiente sin haber respondido.
5. Tras la quinta respuesta y `siguiente`, la partida termina, y los aciertos finales son
   exactamente las adivinanzas acertadas (de 0 a 5).
6. Ninguna función depende del tiempo ni modifica la partida recibida.

## Lo que ve la persona

**Pantalla de una adivinanza** (de arriba abajo)
- "Adivinanza N de 5" con un icono.
- El texto de la adivinanza, en letra grande.
- Tres botones grandes con una respuesta cada uno y un icono junto al texto.
- Tras responder: mensaje con icono grande (positivo si acierta; amable con "La respuesta
  correcta es: X" si falla), las tres respuestas aún visibles con la correcta señalada con icono
  y forma además del color, y el botón "Siguiente" con icono ("Ver resultado" en la quinta).

**Resultado** (tras la quinta)
- Icono de celebración, "X de 5" y un mensaje según los aciertos (5: perfecto; 3 o 4: muy bien;
  0 a 2: ánimo).
- Botón "Jugar otra vez" con icono y texto. "Volver al inicio" lo pone el marco.
