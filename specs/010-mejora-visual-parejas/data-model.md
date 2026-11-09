# Modelo de datos: Mejora visual de "Parejas"

No hay datos que se guarden. Cambian solo las listas fijas y los colores.

## Dibujo (`src/actividades/parejas/dibujos.ts`)

| Campo | Significado |
|-------|-------------|
| `id` | Identificador único, sin tildes (`llave`, `taza`, …, `paraguas`, `telefono`, `libro`, `sombrero`) |
| `nombre` | Nombre en español de España, de `textosParejas.dibujos` |
| `icono` | Nombre del glifo de `MaterialCommunityIcons` |

Reglas: hay 12; los `id` y los iconos no se repiten; cada `id` tiene su nombre en `textos.ts` y su color en `tema.colores.dibujos`.

## Colores de dibujo (`tema.colores.dibujos`)

Un color por `id` de dibujo. Regla: contraste de al menos 7 a 1 sobre `tema.colores.tarjeta`.

## Carta y Partida (`juego.ts`)

Sin cambios: `Carta { dibujo, estado: tapada | girada | descubierta }` y `Partida { tamano, cartas, intentos, terminada }`. Tamaños 6, 8 y 12 cartas.

## Aspecto por estado (solo presentación)

| Estado | Aspecto |
|--------|---------|
| `tapada` | Dorso: fondo del color del juego, borde claro, `brain` y "Carta" |
| `girada` | Ficha crema, dibujo en su color, nombre, borde del color del juego |
| `descubierta` | Como `girada`, con borde verde y el visto |
