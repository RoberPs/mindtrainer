# Modelo de datos: Actividad "Diferencias"

Todo vive en memoria mientras se juega. No se guarda nada (RF-017). Las coordenadas son
**relativas**: de 0 a 1 sobre el ancho (`x`) y el alto (`y`) del dibujo.

## Elemento (dato fijo de la escena)

Una pieza del dibujo: un icono colocado en un punto.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | texto | Único dentro de la escena (por ejemplo `reloj`) |
| `icono` | texto | Nombre de un icono incluido en la app |
| `x`, `y` | número 0 a 1 | Centro del icono dentro del dibujo |
| `tamano` | número | Tamaño del icono, en proporción al dibujo |
| `color` | texto | Color del icono, de alto contraste |

**Reglas**: la escena tiene dos listas, `dibujoArriba` y `dibujoAbajo`. Comparadas por `id`, difieren
en **exactamente 3** elementos: uno solo está en la lista de arriba (falta), uno tiene otro
`icono` en la de abajo (cambia) y uno solo está en la de abajo (sobra). El resto son idénticos.

## Diferencia (dato fijo de la escena)

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | texto | Único (por ejemplo `reloj`) |
| `zona` | `{ x, y, ancho, alto }` | Rectángulo de acierto, en coordenadas relativas |

**Reglas**: hay exactamente 3. Cada zona está dentro del dibujo (de 0 a 1) y contiene el centro del
elemento que difiere. Ninguna zona se solapa con otra. Cada zona mide lo bastante para un dedo
(al menos 0,18 del ancho y 0,27 del alto del dibujo, unos 44 puntos en el dibujo más pequeño) y es algo mayor que el icono que cambia. La
zona sirve también como tamaño y posición del círculo de marca.

## Partida (estado mientras se juega)

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `encontradas` | lista de `id` | Diferencias ya marcadas, en el orden en que se han encontrado |
| `toques` | número | Toques en el dibujo de abajo que han acertado una diferencia nueva o han caído fuera |
| `fallo` | verdadero/falso | Si ahora se ve el mensaje amable de fallo |
| `terminada` | verdadero/falso | Si ya se han encontrado las 3 |

**Valores iniciales** (`crearPartida`): `encontradas = []`, `toques = 0`, `fallo = false`,
`terminada = false`.

**Valor derivado**: `faltan(partida) = 3 − encontradas.length`.

## Cambios de estado (`tocar(partida, x, y)`)

| Situación del toque | `encontradas` | `toques` | `fallo` | `terminada` |
|---------------------|---------------|----------|---------|-------------|
| Dentro de una zona aún no encontrada | + esa diferencia | + 1 | `false` | `true` si ya son 3 |
| Fuera de todas las zonas | igual | + 1 | `true` | igual |
| Dentro de una zona ya encontrada | igual | igual | igual | igual |
| Con la partida terminada | igual | igual | igual | igual |

El toque en el dibujo de arriba no llega a la regla: ese dibujo no responde a toques (RF-002).

## Transiciones de la actividad

```text
Dibujos (faltan 3) ──toque acierta──▶ Dibujos (faltan 2) ──▶ Dibujos (faltan 1)
        │                                                          │
        └──toque falla: mensaje, sin otro cambio                   └─ tercera ─▶ Felicitación
                                                                                   │
                                                          "Jugar otra vez" ◀───────┘
```

Al empezar se avisa `avisarPartida(true)`; al encontrar la tercera, `avisarPartida(false)`; al
pulsar "Jugar otra vez", de nuevo `avisarPartida(true)`.
