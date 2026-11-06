# Contrato de la actividad "Sopa de letras"

La actividad no expone nada a otros sistemas. Tiene dos interfaces: la que mantiene con la
app (el contrato de actividad de la funcionalidad 001) y lo que ve la persona.

## Con la app: contrato de actividad

Cumple [actividad.md](../../001-pantalla-inicio/contracts/actividad.md):

| Campo | Valor |
|-------|-------|
| Identificador | `sopa-de-letras` |
| Icono | `grid` (de `MaterialCommunityIcons`) |
| Nombre | "Sopa de letras" |
| Descripción | "Encuentra las palabras escondidas" (una línea, en `src/textos.ts`) |
| Contenido | `SopaDeLetras` |

- Llama a `avisarPartida(true)` al empezar una partida (al abrir la actividad y con "Jugar otra
  vez").
- Llama a `avisarPartida(false)` al encontrar la tercera palabra.
- No pinta el "Volver al inicio" de la partida: lo pone el marco. La pantalla final muestra el
  del marco, siempre visible.

## Reglas del juego (funciones puras)

Es la única interfaz interna que se prueba directamente.

| Función | Recibe | Devuelve |
|---------|--------|----------|
| `crearPartida(idAnterior?, azar?)` | Opcionalmente, el `id` de la sopa anterior y una función de azar | Partida nueva con una sopa distinta de la anterior, sin encontradas, sin marca y con 0 intentos |
| `tocarCasilla(partida, casilla)` | Partida y casilla tocada | Partida actualizada según las transiciones del [modelo de datos](../data-model.md). Igual si la partida ha terminado |
| `faltan(partida)` | Partida | Número de palabras sin encontrar (de 3 a 0) |
| `haTerminado(partida)` | Partida | Verdadero si las 3 están encontradas |

Garantías:
1. `crearPartida` usa una sopa de la lista, y nunca la del `id` anterior si hay más de una.
2. Una marca solo se completa con una segunda casilla; tocar la misma casilla la quita sin
   contar intento.
3. Dos casillas que no comparten fila ni columna nunca suman intento ni cambian las encontradas.
4. Una palabra buscada marcada de la primera a la última letra en horizontal (izquierda a
   derecha) o vertical (arriba abajo) siempre se reconoce; marcada al revés nunca.
5. Marcar una palabra ya encontrada no cambia nada (ni encontradas, ni intentos, ni aviso).
6. Cada palabra se encuentra una sola vez; al encontrar las 3 la partida termina y deja de
   aceptar toques. Los intentos finales son 3 más los fallos.
7. Ninguna función depende del tiempo ni modifica la partida recibida.

## Lo que ve la persona

**Pantalla de la sopa** (de arriba abajo)
- La palabra de referencia, grande, con una etiqueta corta que explica qué buscar.
- La cuadrícula de 5 filas por 6 columnas, cada casilla con letra grande y alto de al menos 64.
- Mensaje con icono grande cuando toca: invitación a tocar la última letra, palabra encontrada,
  palabra no encontrada o línea no recta.
- La lista de las 3 palabras: las encontradas escritas y tachadas con icono de "hecho"; las demás
  como "???" con icono de interrogación; y "Te faltan N palabras" (en singular cuando falta una).

**Felicitación** (al encontrar la tercera palabra)
- La cuadrícula sigue visible con las 3 palabras resaltadas, sin aceptar más marcas.
- Icono de celebración, el texto "¡Enhorabuena! Has encontrado las 3 palabras" y "Has necesitado N
  intentos".
- Botón "Jugar otra vez" con icono y texto. "Volver al inicio" lo pone el marco.
