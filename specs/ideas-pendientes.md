# Ideas pendientes para la última spec

Observaciones que salen al probar cada juego con la app. **No se construyen**: según la
constitución (principio III), una idea nueva se propone y solo se construye cuando está en una
especificación. Se recogen aquí para tratarlas todas juntas en la última spec del proyecto.

**Cómo usar este archivo**: al llegar a la última spec, lanzar `/speckit-specify` con estas ideas
(las que sigan valiendo) y revisar con la persona responsable cuáles entran. Mientras tanto, añadir
aquí cualquier detalle nuevo con la fecha, el juego y quién lo observó.

## Sopa de letras (spec 004)

Observadas el 2026-11-06 al hacer la comprobación manual de la spec 004. Esa comprobación salió
bien; estas son mejoras, no fallos.

1. **Repartir mejor las direcciones.** Ahora cada una de las 5 sopas tiene 2 palabras en
   horizontal y 1 en vertical, y da la impresión de que casi todo es horizontal. Equilibrar más
   las cuadrículas de `src/actividades/sopa-de-letras/sopas.ts` (por ejemplo, 2 verticales y 1
   horizontal en algunas). Límite: las palabras de 6 letras (LLUVIA, SARTEN, TOMATE, PATATA) solo
   caben en horizontal, porque la cuadrícula tiene 5 filas. Es solo un cambio de contenido, sin
   tocar reglas. Debe seguir cumpliendo la prueba de una sola aparición por palabra.
2. **Palabras al revés o en diagonal.** Se valoró y la recomendación es **no añadirlas**: para
   personas mayores el ejercicio es más claro solo en horizontal (izquierda a derecha) y vertical
   (arriba abajo). Si se quisieran, serían un nivel de dificultad aparte y haría falta decidirlo
   en la spec.
3. **Elegir el tamaño de la sopa**, con más casillas y 5 o 6 palabras. Hay precedente en
   "Parejas", que deja elegir entre pequeña, mediana y grande. A tener en cuenta:
   - Con 6 columnas, cada casilla mide unos 50 puntos de ancho en un móvil de 360. Probar 7
     columnas como máximo antes de decidir tamaños mayores.
   - Cada tamaño necesita sopas hechas a mano y revisadas una a una (RF-013 de la spec 004).
   - Cambiaría: "3 palabras" en la etiqueta y en la felicitación, el aviso de cuántas faltan y
     las pruebas que dan por hecho 3 palabras y 5×6.

## Parejas (spec 002)

_Sin observaciones todavía._

## Forma la palabra (spec 003)

_Sin observaciones todavía._

## Adivinanzas (spec 005)

Observada el 2026-11-06 al hacer la comprobación manual de la spec 005. Esa comprobación salió
bien; esta es una mejora, no un fallo.

1. **Catálogo de adivinanzas mucho más extenso.** Cada partida enseña 5, pero el banco actual
   (`src/actividades/adivinanzas/banco.ts`) tiene solo 10, así que las partidas se parecen
   mucho entre sí. Se pide que haya **al menos 50** adivinanzas. A tener en cuenta:
   - Hoy la spec 005 exige "al menos 10" (RF-010) y la prueba `tests/adivinanzas-banco.test.tsx`
     comprueba ese mínimo. Habría que subirlo a 50 en la spec y en la prueba.
   - Es solo un cambio de contenido, sin tocar reglas ni pantallas: `crearPartida` ya elige 5
     distintas de todo el banco.
   - Cada adivinanza debe ser tradicional y conocida, de respuesta una sola palabra, con dos
     incorrectas que no valgan también como respuesta (RF-011), y revisada una a una por una
     persona, igual que las 10 actuales.
   - Las pruebas actuales ya comprueban tres respuestas distintas, una palabra y que el texto no
     contenga la respuesta; valen para las 50.
