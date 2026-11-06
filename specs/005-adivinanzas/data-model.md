# Modelo de datos: Actividad "Adivinanzas"

Nada se guarda: todo vive en memoria mientras la actividad está abierta y se pierde al salir.
Los tipos van en `src/actividades/adivinanzas/juego.ts` y los datos en `adivinanzas.ts`.

## Adivinanza

Una adivinanza preparada de antemano en `adivinanzas.ts`.

| Campo | Qué es |
|-------|--------|
| `id` | Identificador único (por ejemplo, `llave`) |
| `texto` | El texto de la adivinanza, en español de España y con tildes |
| `correcta` | La respuesta correcta, de una sola palabra |
| `incorrectas` | Las dos respuestas incorrectas, de una sola palabra |

| Regla | Origen |
|-------|--------|
| Hay una respuesta correcta y dos incorrectas, las tres distintas y de una sola palabra | RF-001, RF-010 |
| El texto de la adivinanza no contiene la respuesta correcta | RF-011 |
| El banco tiene al menos 10 adivinanzas, con `id` distintos | RF-010 |
| Las incorrectas no son respuestas válidas de la adivinanza (revisión humana) | RF-011 |

## Turno

Una adivinanza ya preparada para jugarse en una partida.

| Campo | Qué es |
|-------|--------|
| `adivinanza` | La adivinanza |
| `opciones` | Las 3 respuestas ya en el orden sorteado (la correcta y las dos incorrectas) |

## Partida

El juego de 5 adivinanzas.

| Campo | Qué es |
|-------|--------|
| `turnos` | Los 5 turnos, distintos entre sí, en el orden en que se verán |
| `indice` | Posición del turno actual, de 0 a 4 |
| `elegida` | La respuesta tocada en el turno actual, o `null` si aún no ha respondido |
| `aciertos` | Adivinanzas acertadas hasta ahora, de 0 a 5 |
| `terminada` | Verdadero cuando se ha pasado a la pantalla de resultado |

Se calculan, no se guardan: `haRespondido` = `elegida` distinta de `null`; `haAcertado` =
`elegida` igual a la correcta del turno actual; `esUltima` = `indice` igual a 4.

## Transiciones

```text
responder(opción) con elegida = null ───────────▶ elegida = opción
                                                  aciertos + 1 si opción = correcta
responder(opción) con elegida ≠ null o terminada ▶ sin cambios (un solo intento)
siguiente() sin responder aún o terminada ──────▶ sin cambios
siguiente() respondida, no es la última ────────▶ indice + 1, elegida = null
siguiente() respondida, es la última ───────────▶ terminada = true
crearPartida(azar) ─────────────────────────────▶ 5 turnos distintos, indice 0, elegida null,
                                                  aciertos 0, terminada false
```

- Cada turno se muestra una sola vez; su orden de respuestas se sortea al crear la partida
  (RF-009).
- No hay límite de tiempo ni penalización (RF-004, RF-013).
