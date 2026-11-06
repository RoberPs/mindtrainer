# Modelo de datos: Actividad "Parejas"

Esta funcionalidad no guarda ningún dato de la persona (principio VI, RF-015). Solo describe
cosas que existen mientras la app está abierta y la partida está en marcha.

## Dibujo

Cada objeto cotidiano que puede aparecer en una carta. Son fijos y van dentro de la app.

| Campo | Qué es | Reglas |
|-------|--------|--------|
| Identificador | Nombre interno único | Obligatorio y sin repetir |
| Nombre | Texto que ve la persona bajo el dibujo | Obligatorio, en español de España, de 8 letras como máximo |
| Icono | El dibujo que ve la persona | Obligatorio, incluido en la app |

**Lista**: llave, taza, reloj, gafas, cama, silla, lámpara, tijeras (8 dibujos).

## Carta

Una pieza del tablero.

| Campo | Qué es | Reglas |
|-------|--------|--------|
| Posición | Lugar en el tablero (0, 1, 2…) | Única en la partida |
| Dibujo | Qué objeto muestra | Cada dibujo aparece exactamente en 2 cartas de la partida |
| Estado | `tapada`, `girada` o `descubierta` | Ver transiciones |

## Partida

Una sesión de juego, desde que se elige el tamaño hasta la felicitación.

| Campo | Qué es | Reglas |
|-------|--------|--------|
| Tamaño | `pequena` (6), `mediana` (8) o `grande` (12) cartas | Fijo durante la partida |
| Cartas | Lista de cartas | Tantas como diga el tamaño, en orden aleatorio |
| Intentos | Veces que se han girado dos cartas | Empieza en 0; +1 al girar la segunda carta |
| Terminada | Sí / No | Sí cuando todas las cartas están `descubierta` |

**Relaciones**: Una partida tiene N cartas y N/2 parejas, con N = 6, 8 o 12. Cada pareja usa
un dibujo distinto de las demás.

## Estado de la actividad (solo mientras la app está abierta)

| Pantalla | Cuándo se ve |
|----------|--------------|
| Elegir tamaño | Al abrir la actividad y tras "Jugar otra vez" |
| Tablero | Tras elegir un tamaño, hasta descubrir la última pareja |
| Felicitación | Cuando la partida está terminada |

## Transiciones de una carta

```text
tapada --(se toca, hay 0 o 1 cartas giradas)--> girada
girada --(la otra girada es igual)-----------> descubierta   (las dos)
girada --(la otra girada es distinta)--------> se queda girada hasta pulsar "Seguir"
girada --(se pulsa "Seguir")-----------------> tapada        (las dos)
descubierta --(se toca)-----------------------> sin cambios
```

**Reglas del tablero**:
- Tocar una carta que no está `tapada` no hace nada (ni cuenta intento).
- Con dos cartas `girada` distintas, tocar cualquier carta no hace nada hasta "Seguir".
- Nunca hay tiempo que cambie el estado de una carta por sí solo.
