# Contrato de la actividad "Parejas"

La actividad no expone nada a otros sistemas. Tiene dos interfaces: la que mantiene con la
app (el contrato de actividad de la funcionalidad 001) y lo que ve la persona.

## Con la app: contrato de actividad

Cumple [actividad.md](../../001-pantalla-inicio/contracts/actividad.md):

| Campo | Valor |
|-------|-------|
| Identificador | `parejas` |
| Icono | `cards` (de `MaterialCommunityIcons`) |
| Nombre | "Parejas" |
| Descripción | "Encuentra las cartas iguales" (una línea, en `src/textos.ts`) |
| Contenido | `Parejas` |

- Llama a `avisarPartida(true)` al elegir un tamaño.
- Llama a `avisarPartida(false)` al descubrir la última pareja.
- No pinta "Volver al inicio": lo pone el marco.

## Reglas del juego (funciones puras)

Es la única interfaz interna que se prueba directamente.

| Función | Recibe | Devuelve |
|---------|--------|----------|
| `crearPartida(tamano, azar?)` | Tamaño (`pequena`, `mediana`, `grande`) y, opcionalmente, una función de azar | Partida nueva: cartas tapadas y mezcladas, intentos a 0 |
| `tocarCarta(partida, posicion)` | Partida y posición de la carta tocada | Partida nueva. Igual que la anterior si el toque no tiene efecto |
| `seguir(partida)` | Partida | Partida con las dos cartas distintas tapadas de nuevo. Igual si no hay dos distintas a la vista |

Garantías:
1. `crearPartida` produce exactamente 6, 8 o 12 cartas, y cada dibujo sale exactamente 2 veces.
2. `tocarCarta` solo cambia algo si la carta está `tapada` y no hay dos distintas a la vista.
3. El intento se suma al girar la segunda carta, sea pareja o no.
4. `terminada` pasa a ser verdadero al descubrir la última pareja, nunca antes.
5. Ninguna función depende del tiempo ni modifica la partida recibida.

## Lo que ve la persona

**Elegir tamaño**
- Texto de invitación a elegir.
- Tres botones grandes, cada uno con icono y texto: "Pequeña", "Mediana" y "Grande", con su
  número de cartas visible (6, 8 y 12).

**Tablero**
- Zona fija arriba: "Intentos: N" y, solo cuando hay dos cartas distintas a la vista, un
  botón grande "Seguir" con icono y texto.
- Debajo, cuadrícula desplazable de cartas: 2 columnas (6 y 8 cartas) o 3 (12 cartas).
- Carta tapada: icono de interrogante y el texto "Carta".
- Carta girada o descubierta: dibujo grande y su nombre escrito. Las descubiertas se distinguen
  de las giradas por el color del borde y un icono de visto junto al nombre, no solo por el
  color.

**Felicitación**
- Mensaje de felicitación con icono de celebración y el número de intentos, con el texto
  "Has necesitado N intentos" (singular cuando es 1).
- Dos botones grandes con icono y texto: "Jugar otra vez" y "Volver al inicio". Este último es
  el que pone el marco, siempre visible.
