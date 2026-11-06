# Modelo de datos: Actividad "Forma la palabra"

Nada se guarda: todo vive en memoria mientras la actividad está abierta y se pierde al salir.
Los tipos van en `src/actividades/forma-palabra/juego.ts`.

## Palabra

Una cadena de la lista de `palabras.ts`.

| Regla | Origen |
|-------|--------|
| De 4 a 7 letras | RF-010 |
| Solo minúsculas de la "a" a la "z" y "ñ"; sin tildes | RF-010 |
| No hay dos palabras con las mismas letras (anagramas) | RF-010 |
| No hay palabras repetidas; la lista tiene 100 palabras o más | RF-009 |

## Letra

Una letra desordenada, tocable. Tiene un número propio para distinguir las repetidas.

| Campo | Qué es |
|-------|--------|
| `id` | Número único dentro de la palabra actual |
| `letra` | La letra que se ve en el botón |

## Partida

La serie de 5 palabras y el estado de la palabra que se está jugando.

| Campo | Qué es |
|-------|--------|
| `palabras` | Las 5 palabras sorteadas, distintas entre sí |
| `indice` | Posición de la palabra actual (de 0 a 4) |
| `aciertos` | Palabras acertadas hasta ahora |
| `disponibles` | Letras todavía sin colocar, en el orden desordenado |
| `colocadas` | Letras ya en las casillas, en el orden en que se tocaron |
| `estado` | `jugando`, `acertada` o `rendida` |
| `aviso` | `ninguno`, `incompleta` o `incorrecta` |
| `terminada` | Verdadero cuando se pulsa "Ver resultado" tras la quinta palabra |

## Transiciones

```text
jugando ──comprobar (correcta)──────────▶ acertada   (aciertos + 1)
jugando ──comprobar (completa, incorrecta)▶ jugando   (aviso = incorrecta)
jugando ──comprobar (incompleta)────────▶ jugando   (aviso = incompleta)
jugando ──ver la respuesta──────────────▶ rendida   (aciertos sin cambio)
acertada / rendida ──siguiente──────────▶ jugando con la palabra siguiente
acertada / rendida (quinta) ──ver resultado──▶ terminada
```

- Colocar, borrar y empezar de nuevo solo actúan en `jugando`, y ponen `aviso` a `ninguno`.
- `comprobar` solo suma cuando la palabra pasa de `jugando` a `acertada`.
- Una palabra `rendida` nunca suma: ver la respuesta la cierra.
- No hay contador de intentos ni límite de fallos (RF-004, RF-014).
