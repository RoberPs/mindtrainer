# Modelo de datos (Fase 1): Más variedad en los juegos

Nada se guarda en el teléfono. Estas son las estructuras en memoria que cambian o se añaden.

## Adivinanzas

**Adivinanza** (sin cambios de forma; el banco pasa de 10 a ≥ 50)

| Campo | Tipo | Regla |
|---|---|---|
| `id` | texto | Único en el banco. |
| `texto` | texto | No contiene la respuesta como palabra entera. |
| `correcta` | texto | Una sola palabra. |
| `incorrectas` | par de textos | Dos palabras, distintas entre sí y de la correcta; ninguna puede valer como respuesta. |

**Partida** (sin cambios de forma)

- `crearPartida(idsAnteriores: string[] = [], azar = Math.random)`: elige 5 adivinanzas distintas entre las del banco cuyo `id` no esté en `idsAnteriores`. Con 50 adivinanzas siempre quedan 45 candidatas.
- La actividad pasa `partida.turnos.map(t => t.adivinanza.id)` al pulsar "Jugar otra vez".

## Sopa de letras

**Sopa** (se añade `tamano`)

| Campo | Tipo | Regla |
|---|---|---|
| `id` | texto | Único entre todas las sopas. |
| `tamano` | `'pequena'` \| `'mediana'` | Pequeña: 5 filas × 6 columnas y 3 palabras. Mediana: 6 filas × 6 columnas y 5 palabras. |
| `referencia` | texto | Tema de la sopa. |
| `palabras` | lista de textos | 3 (pequeña) o 5 (mediana), en mayúsculas y sin tildes. |
| `cuadricula` | lista de textos | Una cadena por fila, mismas longitudes. |

Reglas de contenido (las comprueban las pruebas):

- Cada palabra aparece **una sola vez**, de izquierda a derecha (en una fila) o de arriba abajo (en una columna); nunca al revés ni en diagonal.
- En las pequeñas, las palabras de 6 letras solo van en horizontal (5 filas).
- Al menos 2 sopas pequeñas tienen más palabras en vertical que en horizontal (`nube`, `mar` y `cocina` en este plan).
- Hay al menos 2 sopas de cada tamaño (3 medianas en este plan).

**Partida** (sin cambios de forma)

- `crearPartida(tamano: Tamano, idAnterior?: string, azar = Math.random)`: sortea entre las sopas de ese tamaño con otro `id`.
- `palabrasPorSopa` desaparece: el total es `partida.sopa.palabras.length`. `haTerminado` y `faltan` lo usan.

## Diferencias

**Elemento** (sin cambios): `id`, `icono`, `x`, `y`, `tamano`, `color` (relativos de 0 a 1).

**Zona** (sin cambios): `x`, `y`, `ancho`, `alto`.

**Cambio** (nuevo; sustituye a las listas fijas `dibujoArriba`, `dibujoAbajo` y `diferencias`)

| Campo | Tipo | Regla |
|---|---|---|
| `id` | texto | Único dentro de la escena; coincide con el `id` del elemento que cambia. |
| `arriba` | `Elemento` (opcional) | Presente en *falta* y *cambia*. |
| `abajo` | `Elemento` (opcional) | Presente en *sobra* y *cambia*. |
| `zona` | `Zona` | Contiene el centro del elemento; ancho ≥ 0,20 y alto ≥ 0,30; dentro del dibujo; sin solaparse con otras zonas de la escena. |

Al menos uno de `arriba` o `abajo` existe. En *cambia*, ambos tienen el mismo `id` y distinto `icono`.

**Escena** (nueva)

| Campo | Tipo | Regla |
|---|---|---|
| `id` | texto | Único. |
| `nombre` | texto | Interno (para revisar). |
| `comunes` | lista de `Elemento` | Iguales en los dos dibujos, de 2 a 5 según la escena. |
| `cambios` | lista de 7 `Cambio` | Siempre 7. |

Reglas de contenido: los `id` de los elementos no se repiten dentro de un dibujo; ningún elemento (común o de cambio) queda a menos de su tamaño de otro; todo icono existe en MaterialCommunityIcons y tiene contraste ≥ 7:1 con el fondo; no se repiten iconos entre escenas.

**Dibujos de una partida**

`dibujosDe(escena, total)` devuelve `{ arriba: Elemento[], abajo: Elemento[], diferencias: Diferencia[] }`, donde:

- `comunes` van en los dos dibujos.
- Para los primeros `total` cambios: `arriba` solo si tiene `arriba`, `abajo` solo si tiene `abajo`, y `diferencias` incluye `{ id, zona }`.
- Para los restantes `7 − total` cambios: el mismo elemento (`arriba ?? abajo`) en los dos dibujos, sin diferencia.

**Partida**

| Campo | Tipo |
|---|---|
| `escena` | `Escena` |
| `total` | `3` \| `5` \| `7` |
| `encontradas`, `toques`, `fallo`, `terminada` | como hoy |

- `crearPartida(total, idEscenaAnterior?, azar = Math.random)`: sortea entre las escenas con otro `id`.
- `tocar` busca entre las diferencias activas de la escena; `terminada` es `encontradas.length === total`.
- `faltan` es `total − encontradas.length`.

## Elección de partida

No es un dato guardado: es el parámetro `tamano` o `total` con el que la actividad crea la partida. La actividad lo pide en `ElegirOpcion` antes de crearla y al pulsar "Jugar otra vez".

**ElegirOpcion** (componente nuevo, props):

| Prop | Significado |
|---|---|
| `invitacion` | Texto de arriba ("Elige el tamaño de la sopa"). |
| `opciones` | Lista de `{ valor, texto, icono, idIcono }`. |
| `alElegir` | Recibe el `valor` elegido. |

## Animación

`animacion.duracion` pasa de 400 a 900 milisegundos. `animacion.activa` no cambia.
