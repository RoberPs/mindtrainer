# Contrato de la actividad "Forma la palabra"

La actividad no expone nada a otros sistemas. Tiene dos interfaces: la que mantiene con la
app (el contrato de actividad de la funcionalidad 001) y lo que ve la persona.

## Con la app: contrato de actividad

Cumple [actividad.md](../../001-pantalla-inicio/contracts/actividad.md):

| Campo | Valor |
|-------|-------|
| Identificador | `forma-palabra` |
| Icono | `alphabetical-variant` (de `MaterialCommunityIcons`) |
| Nombre | "Forma la palabra" |
| Descripción | "Ordena las letras para formar la palabra" (una línea, en `src/textos.ts`) |
| Contenido | `FormaPalabra` |

- Llama a `avisarPartida(true)` al empezar una partida (al abrir la actividad y con "Jugar otra
  vez").
- Llama a `avisarPartida(false)` cuando se cierra la quinta palabra.
- No pinta el "Volver al inicio" de la partida: lo pone el marco. La pantalla de resultado
  muestra el del marco, siempre visible.

## Reglas del juego (funciones puras)

Es la única interfaz interna que se prueba directamente.

| Función | Recibe | Devuelve |
|---------|--------|----------|
| `crearPartida(azar?)` | Opcionalmente, una función de azar | Partida nueva: 5 palabras distintas, la primera lista para jugar, aciertos a 0 |
| `colocarLetra(partida, id)` | Partida y número de la letra tocada | Partida con la letra en la primera casilla libre. Igual si no hay efecto |
| `borrarUltima(partida)` | Partida | Partida con la última letra colocada devuelta a las disponibles. Igual si no hay ninguna |
| `empezarDeNuevo(partida)` | Partida | Partida con todas las letras de nuevo disponibles. Igual si no hay ninguna colocada |
| `comprobar(partida)` | Partida | Acertada si la palabra es correcta; con aviso `incompleta` o `incorrecta` si no |
| `verRespuesta(partida)` | Partida | Palabra `rendida`, sin sumar acierto |
| `siguiente(partida)` | Partida | Siguiente palabra lista; o `terminada` si era la quinta. Igual si la palabra sigue en juego |

Garantías:
1. `crearPartida` produce exactamente 5 palabras de la lista, sin repetir ninguna.
2. Las letras desordenadas de una palabra nunca están ya en el orden correcto.
3. `colocarLetra`, `borrarUltima`, `empezarDeNuevo` y `comprobar` no hacen nada si la palabra no
   está en `jugando`.
4. Un acierto se suma una sola vez por palabra y nunca tras `verRespuesta`.
5. `comprobar` con la palabra incompleta no cambia ninguna letra ni suma nada.
6. Ninguna función depende del tiempo ni modifica la partida recibida.

## Lo que ve la persona

**Pantalla de una palabra** (de arriba abajo)
- Fila de casillas, tantas como letras tiene la palabra, con letra grande.
- Mensaje con icono grande cuando toca: "palabra incompleta", mensaje amable de fallo, mensaje
  positivo de acierto o la palabra correcta al ver la respuesta.
- Las letras desordenadas, cada una en un botón de al menos 64 de alto.
- Cuatro botones con icono y texto: "Comprobar", "Borrar última letra", "Empezar de nuevo" y
  "Ver la respuesta".
- Con la palabra cerrada (acierto o respuesta vista): se esconden las letras y los cuatro
  botones, y aparece un botón "Siguiente"; en la quinta palabra, "Ver resultado".

**Resultado**
- Icono de celebración y el texto "Has acertado X de 5".
- Botón "Jugar otra vez" con icono y texto. "Volver al inicio" lo pone el marco.
