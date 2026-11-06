# Contrato de la actividad "Diferencias"

Esta actividad cumple el [contrato de actividades](../../001-pantalla-inicio/contracts/actividad.md)
de la funcionalidad 001. Aquí se concreta lo que añade.

## Qué entrega al registro

| Campo | Valor |
|-------|-------|
| Identificador | `diferencias` |
| Icono | uno de los iconos incluidos en la app, distinto del de las otras actividades (por ejemplo `compare`) |
| Nombre | "Diferencias" |
| Descripción | Una línea, por ejemplo "Encuentra las 3 diferencias entre dos dibujos" |
| Contenido | `Diferencias` |

## Avisos de partida

| Momento | Llamada |
|---------|---------|
| Al abrir la actividad | `avisarPartida(true)` |
| Al marcar la tercera diferencia | `avisarPartida(false)` |
| Al pulsar "Jugar otra vez" | `avisarPartida(true)` |

El botón "Volver al inicio" lo pone el marco común, no la actividad.

## Reglas del juego (`juego.ts`, funciones puras)

| Función | Qué hace |
|---------|----------|
| `crearPartida()` | Partida nueva: sin diferencias encontradas, 0 toques, sin mensaje de fallo |
| `tocar(partida, x, y)` | Aplica un toque en el dibujo de abajo con coordenadas relativas (0 a 1): acierto, fallo o repetido, según la tabla de [data-model.md](../data-model.md). Con la partida terminada no hace nada |
| `faltan(partida)` | Número de diferencias que faltan por encontrar (3 al empezar) |

Ninguna modifica lo que recibe ni depende del tiempo o del azar.

## Qué ve la persona (contrato de pantalla)

**Pantalla de los dibujos**
- Arriba, una instrucción corta ("Toca en el dibujo de abajo lo que sea distinto") y el aviso de
  las que faltan ("Te faltan 3 diferencias"; "Te falta 1 diferencia" cuando solo queda una), con un
  icono grande junto al aviso.
- Dos dibujos grandes, uno encima del otro, con su rótulo ("Dibujo de arriba", "Dibujo de
  abajo"). Los dos caben a la vez en un móvil pequeño sin desplazarse.
- Solo el dibujo de abajo responde a los toques.
- Cada diferencia encontrada se marca con un círculo grueso de color oscuro en los dos dibujos,
  y se queda hasta el final.
- Debajo, un hueco fijo para el mensaje amable de fallo ("Ahí no hay ninguna diferencia. ¡Sigue
  buscando!"), con un icono grande junto al texto. Si no hay fallo, el hueco está vacío y los
  dibujos no se mueven.
- Tocar una diferencia ya marcada, o el dibujo de arriba, no cambia nada.

**Pantalla de felicitación** (al marcar la tercera)
- Un icono grande y el mensaje de felicitación ("¡Enhorabuena! Has encontrado las 3 diferencias").
- Los toques necesitados ("Has necesitado 5 toques").
- Botón "Jugar otra vez" con icono grande y texto, que empieza una partida nueva con los dibujos
  sin círculos.
- El botón "Volver al inicio" del marco sigue siempre a la vista.

## Identificadores de prueba

Para que las pruebas encuentren cada elemento sin depender del aspecto:

| Elemento | `testID` |
|----------|----------|
| Dibujo de arriba / de abajo | `dibujo-arriba`, `dibujo-abajo` |
| Círculo de una diferencia, en cada dibujo | `circulo-arriba-<id>`, `circulo-abajo-<id>` |
| Iconos junto a textos (aviso, fallo, felicitación, "Jugar otra vez") | `icono-faltan`, `icono-fallo`, `icono-felicitacion`, `icono-jugar-otra-vez` |

## Lo que no hace

Zoom, pistas, niveles, varias escenas, ranking, guardado, voz ni límites de tiempo.
