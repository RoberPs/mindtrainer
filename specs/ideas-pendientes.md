# Ideas pendientes para la última spec

Observaciones que salen al probar cada juego con la app. **No se construyen**: según la
constitución (principio III), una idea nueva se propone y solo se construye cuando está en una
especificación. Se recogen aquí para tratarlas todas juntas en la última spec del proyecto.

**Cómo usar este archivo**: al llegar a la última spec, lanzar `/speckit-specify` con estas ideas
(las que sigan valiendo) y revisar con la persona responsable cuáles entran. Mientras tanto, añadir
aquí cualquier detalle nuevo con la fecha, el juego y quién lo observó.

## Decisiones para la spec 008 (2026-11-09)

Alcance acordado con la persona responsable para la última spec, "Más variedad en los juegos":

- **Entran** (por prioridad): P1 adivinanzas (50 o más) y equilibrio de direcciones en la sopa;
  P2 Diferencias con varias escenas fijas revisadas a mano y catálogo de unos 50 iconos;
  P3 Diferencias con 3, 5 o 7 diferencias y sopa en tamaño pequeño o mediano (6 o 7 columnas
  como máximo, 5 palabras); P4 fundido de victoria más largo (unos 800 a 1000 ms, una sola vez,
  sin crecimiento).
- **No entran**: palabras al revés o en diagonal, tres tamaños de sopa y colocación aleatoria
  de iconos.

**Estado tras implementar la spec 008 (2026-11-09)**: hechas la idea 1 y la idea 3 de la sopa
(con sopa mediana de 6 × 6, porque con 7 columnas las casillas medirían unos 42 puntos), la idea 1
de las adivinanzas (50), las ideas 1, 2 y 3 de Diferencias (4 escenas fijas, 54 iconos y 3, 5 o 7
diferencias) y la animación (900 ms). **No se construyeron** las palabras al revés o en diagonal ni
la colocación aleatoria. Pendiente de una persona: revisar el contenido nuevo y probarlo en un móvil.

**Estado tras implementar la spec 009 (2026-11-09)**: hechas la bienvenida, el encabezado "Elige uno de los juegos", las tarjetas grandes y la paleta del logo con un color por juego en todos sus botones. Comprobado a mano en un móvil por la persona responsable.

**Estado tras implementar la spec 010 (2026-11-09)**: "Parejas" pasa a 12 dibujos con color propio, dorso común (cerebro y "Carta") y caras más claras; "Seguir", "Jugar otra vez" y "Volver al inicio" ya llevaban icono (solo se añadió su prueba). **No se usó Openclipart ni Kenney**: Board Game Icons no trae objetos cotidianos confirmados y Openclipart mezcla estilos y exige revisar la licencia de cada dibujo; se mantuvieron los iconos de la app. **Salvedad de licencia**: la licencia de esos iconos (tipo Apache 2.0) pide conservar su aviso al redistribuir el código; la persona responsable debe aceptarla de forma expresa al cerrar la spec (FR-008, SC-006). Pendiente de una persona: comprobar a mano en un móvil que los dibujos se reconocen sin dudar.

**Estado tras implementar la spec 011 (2026-11-09)**: "Diferencias" pasa a 6 ambientes (Salón, Cocina, Jardín, Dormitorio, Playa y Granja) dibujados con formas vectoriales propias; cada partida compone al azar los objetos, los colores y las 3 diferencias (color, falta y añadido), con miles de composiciones posibles y el ambiente nunca repetido dos veces seguidas y la partida empieza al abrir el juego, sin elegir cuántas. Esto sustituye a las ideas 2 y 3 de la spec 008 sobre Diferencias (4 escenas con 3, 5 o 7). **No se usó ninguna galería de imágenes**: todo es propio, sin descargas ni licencias de terceros. **Salvedad de licencia**: la única dependencia nueva, `react-native-svg` (MIT), pide conservar su aviso al redistribuir el código; la persona responsable debe aceptarlo de forma expresa al cerrar la spec. Pendiente de una persona: comprobar en un móvil que los dibujos se ven nítidos y que las diferencias son evidentes.

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

## Diferencias (spec 006)

Observadas el 2026-11-09 al hacer la comprobación manual de la spec 006. Esa comprobación salió
bien; estas son mejoras, no fallos.

1. **Elegir el número de diferencias: 3, 5 o 7.** Hoy son siempre 3. Hay precedente en
   "Parejas" y en la idea de elegir tamaño de "Sopa de letras". A tener en cuenta:
   - Cada nivel necesita más elementos en la escena y zonas que no se solapen ni sean menores
     de unos 44 puntos (hoy exigido por `tests/diferencias-escena.test.tsx`).
   - Cambiaría: "las 3 diferencias" en la descripción y la felicitación, `faltan`, la regla de
     terminar (`3 - encontradas.length`) y las pruebas que dan por hecho 3.
2. **Variar la colocación y la cantidad de iconos.** Ahora la escena es una sola y fija, así que
   se memoriza a la segunda partida. Que cada partida cambie dónde van los iconos y cuántos hay.
   A tener en cuenta:
   - Hoy las zonas son datos fijos revisados a mano (RF-012). Si la colocación fuera aleatoria,
     habría que generar las zonas y comprobar por código que no se solapan ni se salen del
     dibujo, o bien tener varias escenas fijas revisadas a mano (más simple).
   - Con más iconos hay que vigilar que todo siga cabiendo y se reconozca en un móvil pequeño.
3. **Catálogo de iconos más amplio, unos 50,** para que sea algo más desafiante. Hoy hay 4
   iguales más los 3 que difieren. A tener en cuenta:
   - Cada icono de MaterialCommunityIcons debe existir, reconocerse a simple vista y tener
     colores de alto contraste; revisado uno a uno por una persona.
   - Las ideas 1, 2 y 3 se apoyan entre sí: con más iconos y más diferencias, la colocación
     variable tiene sentido. Conviene decidirlas juntas.

## Color por actividad y animación de victoria (spec 007)

Observada el 2026-11-09 al hacer la comprobación manual de la spec 007. Esa comprobación salió
bien; esta es una mejora, no un fallo.

1. **Animación de victoria más visible.** El fundido de 400 ms del icono de celebración
   (`src/componentes/IconoVictoria.tsx`) es demasiado sencillo y casi no se nota. A tener en cuenta:
   - La aclaración de la spec 007 descartó el rebote y el crecimiento por ser más mareantes. Si
     se quiere algo más llamativo, hay que decidirlo en la spec: por ejemplo un fundido más
     largo o un crecimiento leve, siempre una sola vez.
   - Debe seguir respetando "reducir movimiento", sin bloquear botones y sin librerías nuevas.
   - Cambiaría: RF-008 y RF-009 de la spec 007, `IconoVictoria.tsx`, `src/animacion.ts` y
     `tests/icono-victoria.test.tsx`.

## Pantalla de bienvenida y selección de juegos más intuitiva (spec 008)

Observada el 2026-11-09 al cerrar la spec 008.

1. **Pantalla de bienvenida básica.** Una pantalla inicial con el logo de la app (el usuario lo
   facilitará más adelante), el mensaje "Empieza a entrenar tu mente" y un botón grande que lleve
   a la pantalla de juegos. A tener en cuenta:
   - Hasta que llegue el logo, hace falta un hueco o un icono provisional. El logo debe ir
     incluido en la app (sin internet) y junto al texto, nunca en lugar de él.
   - Cambiaría: `App.tsx` (nueva pantalla previa a `Inicio`), `src/textos.ts`, `src/tema.ts` si
     hace falta y pruebas nuevas de navegación.
2. **Pantalla de juegos con el mensaje "Elige uno de los juegos".** Encabezado claro que indique
   qué hacer en la pantalla actual (`src/pantallas/Inicio.tsx`).
3. **Selección de juego más intuitiva que una lista de botones.** Que cada juego se reconozca de
   un vistazo, no solo por un botón con su nombre. A tener en cuenta:
   - Opciones a decidir en la spec: tarjetas grandes con icono grande y color propio, cuadrícula
     de dos columnas, o una ilustración por juego. Siempre con texto junto al icono.
   - Debe seguir cumpliendo letra de 22 puntos o más, botones de 64 puntos o más de alto y
     contraste de 7 a 1, con 5 juegos y los que se añadan después.
