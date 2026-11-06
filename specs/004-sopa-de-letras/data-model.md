# Modelo de datos: Actividad "Sopa de letras"

Nada se guarda: todo vive en memoria mientras la actividad está abierta y se pierde al salir.
Los tipos van en `src/actividades/sopa-de-letras/juego.ts` y los datos en `sopas.ts`.

## Sopa

Una sopa preparada de antemano en `sopas.ts`.

| Campo | Qué es |
|-------|--------|
| `id` | Identificador único de la sopa (por ejemplo, `nube`) |
| `referencia` | La palabra dada, en mayúsculas y sin tildes (por ejemplo, `NUBE`) |
| `palabras` | Las 3 palabras buscadas, en mayúsculas y sin tildes |
| `cuadricula` | 5 textos de 6 letras: las filas, de arriba abajo |

| Regla | Origen |
|-------|--------|
| 5 filas de 6 letras; solo mayúsculas de la "A" a la "Z" y "Ñ" | RF-001, RF-014 |
| Hay exactamente 3 palabras buscadas, distintas entre sí | RF-001, RF-002 |
| Cada palabra buscada aparece exactamente una vez, en horizontal (izquierda a derecha) o en vertical (arriba abajo) | RF-002 |
| Ninguna otra palabra relacionada con la de referencia se puede marcar sin reconocerse (revisión humana) | RF-013 |
| La lista tiene al menos 5 sopas, con `id` distintos | RF-013 |

## Casilla

Una posición de la cuadrícula.

| Campo | Qué es |
|-------|--------|
| `fila` | De 0 a 4 |
| `columna` | De 0 a 5 |

## Encontrada

Una palabra buscada que la persona ya ha marcado bien.

| Campo | Qué es |
|-------|--------|
| `palabra` | La palabra encontrada |
| `casillas` | Las casillas de su línea, para resaltarlas |

## Partida

El juego de una sopa.

| Campo | Qué es |
|-------|--------|
| `sopa` | La sopa que se está jugando |
| `encontradas` | Palabras encontradas hasta ahora, en el orden en que se encontraron |
| `marca` | La primera casilla tocada, o `null` si no hay ninguna marca |
| `intentos` | Marcas completas en línea recta, aciertos y fallos (RF-008) |
| `aviso` | `ninguno`, `encontrada`, `incorrecta` o `norecta` |

Se calculan, no se guardan: `faltan` = 3 menos las encontradas; `haTerminado` = las 3 encontradas.

## Transiciones al tocar una casilla `c`

```text
partida terminada ────────────────────────────▶ sin cambios
sin marca ─────────────────────────────────────▶ marca = c, aviso = ninguno
marca = c (misma casilla) ─────────────────────▶ marca = null, aviso = ninguno
marca ≠ c, ni misma fila ni misma columna ─────▶ marca = null, aviso = norecta        (intentos igual)
marca ≠ c, línea recta, texto = ya encontrada ─▶ marca = null, aviso = ninguno        (intentos igual)
marca ≠ c, línea recta, texto = buscada ───────▶ marca = null, aviso = encontrada     (intentos + 1)
marca ≠ c, línea recta, otro texto ────────────▶ marca = null, aviso = incorrecta     (intentos + 1)
```

- El texto de una línea se lee de la primera a la última casilla tocadas, en el orden del toque.
  Una palabra marcada al revés da un texto distinto y cuenta como `incorrecta`.
- Al encontrar la tercera palabra la partida termina y deja de aceptar toques.
- No hay límite de intentos ni de tiempo (RF-005, RF-015).
