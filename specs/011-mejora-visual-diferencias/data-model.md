# Modelo de datos: Mejora visual de "Diferencias"

Todo son datos fijos en el código. No se guarda nada.

## Objeto (dibujo reutilizable)

Una función que dibuja una figura vectorial en un lienzo de 300 × 200 unidades.

- `dibujar(color)`: devuelve los elementos del dibujo; `color` es el color principal (el contorno es siempre el mismo oscuro).
- Ejemplos: sofá, ventana, lámpara, cuadro, planta, reloj, gato, mesa, taza, nevera, árbol, casa, flor.

## Colocado (un objeto puesto en una escena)

- `id`: identificador, único en la escena.
- `objeto`: el dibujo que se usa.
- `x`, `y`: centro, de 0 a 1 sobre el ancho y el alto.
- `alto`: tamaño, de 0 a 1 sobre el alto del dibujo.
- `color`: color principal.

## Cambio (una diferencia posible)

- `id`: identificador.
- `tipo`: `color`, `falta` o `sobra`.
- `arriba`, `abajo`: el objeto en cada dibujo.
  - `color`: ambos, el mismo objeto y la misma posición, con colores muy distintos.
  - `falta`: solo `arriba`.
  - `sobra`: solo `abajo`.
- `zona`: rectángulo relativo (`x`, `y`, `ancho`, `alto`) donde se marca.

## Escena

- `id`, `nombre` en español.
- `fondo`: dibujo de fondo, igual en los dos dibujos.
- `comunes`: objetos que salen igual en los dos dibujos.
- `cambios`: **exactamente 3**, uno de cada tipo.

### Reglas que comprueban las pruebas

1. Cada escena tiene exactamente 3 cambios y son uno de `color`, uno de `falta` y uno de `sobra`.
2. Las zonas están dentro del dibujo (0 a 1), no se solapan y miden al menos 0,2 de ancho y 0,3 de alto.
3. Los dos dibujos solo difieren en los 3 cambios: lo demás (fondo y comunes) es el mismo para ambos.
4. Hay al menos 2 escenas.

## Partida

Igual que hoy, sin `total` variable.

- `escena`: la escena sorteada (distinta de la anterior).
- `encontradas`: ids de las diferencias marcadas.
- `toques`: toques que han acertado una diferencia nueva o han fallado.
- `fallo`: si se ve el mensaje amable de fallo.
- `terminada`: verdadera al encontrar las 3.

### Transiciones (sin cambios respecto a hoy)

- Toque dentro de una zona nueva: se añade a `encontradas`, `toques + 1`, sin fallo; si ya son 3, `terminada`.
- Toque dentro de una zona ya marcada: no cambia nada.
- Toque fuera de las zonas: `toques + 1` y `fallo`.
- Con la partida terminada, los toques no hacen nada.
