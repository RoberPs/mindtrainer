# Tareas: Más variedad en los juegos

**Entrada**: Documentos de diseño en `specs/008-mas-variedad-juegos/`

**Requisitos previos**: [plan.md](plan.md), [spec.md](spec.md), [research.md](research.md), [data-model.md](data-model.md), [contracts/contenido.md](contracts/contenido.md), [quickstart.md](quickstart.md)

**Pruebas**: Se incluyen porque la constitución (principio VIII) las exige: una funcionalidad no está terminada hasta que sus pruebas pasan. Solo pruebas básicas y funcionales: reglas, contenido válido, partida completa y texto con el número correcto. Nada de aspecto visual. Las pruebas de cada historia se escriben o actualizan antes que el código y deben fallar al principio.

**Formato**: `- [ ] T### [P?] [Historia?] Descripción con ruta de archivo`. `[P]` = se puede hacer en paralelo (archivos distintos, sin dependencias pendientes).

**Historias** (numeradas en el orden de la spec): US1 adivinanzas (P1), US2 direcciones de la sopa (P1), US3 escenas de Diferencias (P2), US4 elegir 3/5/7 diferencias (P3), US5 elegir tamaño de la sopa (P3), US6 animación (P4).

**Notas sobre el orden**:

- Cada historia se puede entregar por separado. US1, US2 y US6 no dependen de nada. US4 y US5 comparten el componente `ElegirOpcion` (fase 2). US4 depende de US3 (las escenas con 7 cambios) y US5 depende de US2 (las sopas pequeñas ya reescritas).
- Hasta que se haga US4, "Diferencias" juega siempre con 3 diferencias (US3 deja el total en 3 por defecto). Hasta que se haga US5, la sopa juega siempre con las pequeñas.
- Esta funcionalidad cambia algunas cantidades que fijaban pruebas antiguas ("10 adivinanzas", "3 diferencias", "400 ms"); esas pruebas se actualizan a propósito en la historia que las cambia.

**Convenciones de pantalla** (para que las pruebas y las pantallas coincidan):

- Los botones de `ElegirOpcion` se buscan por su texto con `getByRole('button', { name: <texto> })` y su icono con `getByTestId(<idIcono>, { includeHiddenElements: true })`.
- Los ids de los iconos de elegir son: sopa `icono-pequena` y `icono-mediana`; diferencias `icono-tres`, `icono-cinco` y `icono-siete`.
- Los textos nuevos viven en `src/textos.ts`: `textosSopa.elegirTamano`, `.pequena` ("Pequeña: 3 palabras"), `.mediana` ("Mediana: 5 palabras"); `textosDiferencias.elegirNumero`, `.tres` ("3 diferencias"), `.cinco` ("5 diferencias"), `.siete` ("7 diferencias").
- Las pruebas de contenido recorren todo el banco, todas las sopas y todas las escenas con `it.each`.

## Fase 1: Preparación

- [X] T001 Comprobar que `npm test` y `npm run typecheck` pasan en la rama `008-mas-variedad-juegos` antes de tocar nada, para saber que cualquier fallo posterior es de esta funcionalidad

---

## Fase 2: Base común (bloquea US4 y US5)

**Objetivo**: Tener el componente de elegir que usarán "Sopa de letras" y "Diferencias".

- [X] T002 Escribir `tests/elegir-opcion.test.tsx`: dado un `ElegirOpcion` con una invitación y 3 opciones (`valor`, `texto`, `icono`, `idIcono`), se ve la invitación, se ve un botón por cada opción con su texto y su icono, y al tocar un botón se llama a `alElegir` con el `valor` de esa opción. Debe fallar al principio (depende de T001)
- [X] T003 Crear `src/componentes/ElegirOpcion.tsx` según [data-model.md](data-model.md): una pantalla con la invitación en `tema.letra.titulo` y negrita, y un `BotonGrande` por opción (con `texto`, `icono: { nombre }` e `idIcono`) que llama a `alElegir(valor)`. Mismo estilo y espacios que `src/actividades/parejas/ElegirTamano.tsx`, que no se toca (depende de T002)

**Punto de control**: `tests/elegir-opcion.test.tsx` pasa.

---

## Fase 3: Historia 1 - Adivinanzas distintas en cada partida (Prioridad: P1) 🎯 MVP

**Objetivo**: El banco tiene al menos 50 adivinanzas y una partida nueva nunca repite las de la anterior.

**Prueba independiente**: Pasos de "Historia 1" del [quickstart.md](quickstart.md).

### Pruebas de la historia 1

- [X] T004 [US1] Actualizar `tests/adivinanzas-banco.test.tsx`: el mínimo pasa de 10 a 50 (`toBeGreaterThanOrEqual(50)`) y se renombra la prueba ("hay 50 adivinanzas o más…"). El resto de pruebas (tres respuestas distintas, una palabra, el texto sin la respuesta) se quedan igual porque ya recorren todo el banco. Debe fallar al principio (depende de T001)
- [X] T005 [P] [US1] Añadir a `tests/adivinanzas-juego.test.tsx` pruebas de `crearPartida(idsAnteriores, azar)`: sin `idsAnteriores` sigue dando 5 adivinanzas distintas; con los ids de las 5 de una partida, la partida nueva no contiene ninguna de ellas, para varios valores de `azar` (por ejemplo, 0, 0,5 y 0,99); 20 partidas encadenadas (cada una excluyendo la anterior) nunca comparten una adivinanza con la inmediatamente anterior. Deben fallar al principio (depende de T001)
- [X] T006 [P] [US1] Añadir a `tests/adivinanzas-pantalla.test.tsx` una prueba de la pantalla: se juega una partida completa, se anotan los textos de las 5 adivinanzas, se pulsa "Jugar otra vez" y ninguno de los 5 textos de la partida nueva coincide con los anotados. Debe fallar al principio (depende de T001)

### Implementación de la historia 1

- [X] T007 [US1] Cambiar `src/actividades/adivinanzas/juego.ts`: `crearPartida(idsAnteriores: string[] = [], azar = Math.random)` mezcla y elige 5 solo entre las adivinanzas cuyo `id` no esté en `idsAnteriores`. El resto de reglas no cambia (depende de T005)
- [X] T008 [US1] Cambiar `src/actividades/adivinanzas/Adivinanzas.tsx`: al pulsar "Jugar otra vez" se llama a `crearPartida(partida.turnos.map((t) => t.adivinanza.id))` (depende de T006, T007)
- [X] T009 [US1] Añadir a `src/actividades/adivinanzas/banco.ts` 10 adivinanzas tradicionales nuevas, de animales, siguiendo [contracts/contenido.md](contracts/contenido.md): `id` único, `texto`, `correcta` de una sola palabra, dos `incorrectas` de una sola palabra que no valgan también como respuesta y sin la respuesta en el texto, en español de España con tildes (depende de T004)
- [X] T010 [US1] Añadir a `src/actividades/adivinanzas/banco.ts` 10 adivinanzas tradicionales nuevas, de frutas, verduras y comida, con las mismas reglas que T009 (depende de T009)
- [X] T011 [US1] Añadir a `src/actividades/adivinanzas/banco.ts` 10 adivinanzas tradicionales nuevas, de objetos de la casa y de la ropa, con las mismas reglas que T009 (depende de T010)
- [X] T012 [US1] Añadir a `src/actividades/adivinanzas/banco.ts` 10 adivinanzas tradicionales nuevas, de la naturaleza, el cuerpo y el tiempo, con las mismas reglas que T009; así el banco llega a 50 (depende de T011)
- [X] T013 [US1] Ejecutar `npm test` y `npm run typecheck`: T004, T005 y T006 deben pasar sin romper el resto (depende de T008, T012)

**Punto de control**: "Adivinanzas" tiene 50 o más adivinanzas y no repite las de la partida anterior. Falta solo la revisión humana del contenido (T045).

---

## Fase 4: Historia 2 - Sopas con palabras en horizontal y en vertical bien repartidas (Prioridad: P1)

**Objetivo**: Al menos 2 sopas pequeñas tienen 2 palabras verticales y 1 horizontal (`nube`, `mar` y `cocina`).

**Prueba independiente**: Pasos de "Historia 2" del [quickstart.md](quickstart.md).

### Pruebas de la historia 2

- [X] T014 [US2] Añadir a `tests/sopa-sopas.test.tsx` una prueba que calcula, para cada sopa, cuántas de sus palabras están en horizontal (dentro de una fila) y cuántas en vertical (dentro de una columna) y comprueba que al menos 2 sopas tienen más verticales que horizontales; y otra que comprueba que las palabras de 6 letras están en horizontal. Las pruebas actuales (una sola aparición, nunca al revés, 5 filas de 6) ya recorren todas las sopas. Debe fallar al principio (depende de T001)

### Implementación de la historia 2

- [X] T015 [US2] Reescribir en `src/actividades/sopa-de-letras/sopas.ts` la cuadrícula de `nube` (5 filas × 6, letras mayúsculas sin tildes): LLUVIA en horizontal y CIELO y RAYO en vertical, con las mismas palabras y la misma referencia. Cada palabra debe aparecer una sola vez, solo de izquierda a derecha o de arriba abajo, y las letras de relleno no deben formar otras palabras (depende de T014)
- [X] T016 [US2] Reescribir en `src/actividades/sopa-de-letras/sopas.ts` la cuadrícula de `mar`: BARCO en horizontal y OLAS y ARENA en vertical, con las mismas reglas que T015 (depende de T015)
- [X] T017 [US2] Reescribir en `src/actividades/sopa-de-letras/sopas.ts` la cuadrícula de `cocina`: SARTEN en horizontal y PLATO y HORNO en vertical, con las mismas reglas que T015. `huerto` y `costura` no cambian (depende de T016)
- [X] T018 [US2] Ejecutar `npm test` y `npm run typecheck`: T014 debe pasar y las pruebas de la sopa (`tests/sopa-*.test.tsx`) no deben romperse; si alguna dependía de las celdas de las sopas antiguas, actualizar solo esas coordenadas (depende de T017)

**Punto de control**: tres sopas pequeñas tienen 2 verticales y 1 horizontal. Falta la revisión humana (T045).

---

## Fase 5: Historia 3 - Escenas distintas y más iconos en "Diferencias" (Prioridad: P2)

**Objetivo**: "Diferencias" tiene 4 escenas fijas con 7 cambios cada una y cada partida usa una distinta de la anterior. Hasta la historia 4 el total sigue siendo 3.

**Prueba independiente**: Pasos 1 a 4 de "Historias 3 y 4" del [quickstart.md](quickstart.md), con el total fijo en 3.

### Pruebas de la historia 3

- [X] T019 [US3] Reescribir `tests/diferencias-escena.test.tsx` para recorrer todas las escenas de `escenas` con `describe.each`/`it.each`, según [contracts/contenido.md](contracts/contenido.md): hay 4 escenas o más con `id` distintos; cada una tiene 7 cambios con `id` distintos y 3 `comunes`; cada cambio tiene `arriba`, `abajo` o los dos, y si tiene los dos con el mismo `id` e iconos distintos; las zonas están dentro del dibujo, no se solapan, miden al menos 0,20 de ancho y 0,30 de alto y contienen el centro del elemento; ningún icono se solapa con otro (distancia entre centros mayor que el tamaño); los `id` no se repiten dentro de un dibujo; todos los iconos existen en `MaterialCommunityIcons.glyphMap`; los colores tienen contraste de al menos 7 a 1 con `tema.colores.tarjeta`; ningún icono se repite entre escenas y el total de iconos distintos está entre 45 y 60; el tamaño mínimo de las zonas equivale a al menos 44 puntos con el ancho mínimo del dibujo (0,20 × 240 ≥ 44 y 0,30 × (240 / `proporcionDibujo`) ≥ 44); y para `n` = 3, 5 y 7, `dibujosDe(escena, n)` da `n` diferencias y los dos dibujos difieren exactamente en esos `n` elementos. Debe fallar al principio (depende de T001)
- [X] T020 [P] [US3] Reescribir `tests/diferencias-juego.test.tsx` para usar partidas de `crearPartida(total, idEscenaAnterior, azar)`: la partida guarda su `escena` y su `total`; tocar dentro de una zona activa marca la diferencia; tocar fuera, o en la zona de un cambio no activo, cuenta el toque y da fallo sin marcar nada; tocar una ya marcada no cambia nada; `faltan` es `total − encontradas.length`; la partida termina al marcar las `total`; la escena nueva es siempre distinta de la anterior para varios valores de `azar`. Por ahora el total es 3 por defecto. Deben fallar al principio (depende de T001)
- [X] T021 [P] [US3] Actualizar `tests/diferencias-pantalla.test.tsx`: la pantalla pinta las diferencias de la escena de la partida (los toques se calculan con las zonas de esa escena), se completa una partida con 3 diferencias, y al pulsar "Jugar otra vez" la escena nueva es distinta de la anterior. Debe fallar al principio (depende de T001)

### Implementación de la historia 3

- [X] T022 [US3] Reescribir `src/actividades/diferencias/escena.ts` según [data-model.md](data-model.md): conservar los tipos `Elemento` y `Zona` y `proporcionDibujo`; añadir `Cambio`, `Escena` y `Diferencia`; la función `dibujosDe(escena, total)` y la lista `escenas`. Dejar de exportar `dibujoArriba`, `dibujoAbajo` y `diferencias`, y actualizar el comentario de cabecera (que habla de "las 3 zonas"). Crear en esta tarea la escena `salon` (3 comunes y 7 cambios con mezcla de *falta*, *sobra* y *cambia*, en una rejilla de 4 × 2 huecos con zonas de 0,22 × 0,40, colores de alto contraste, unos 13 iconos de MaterialCommunityIcons) (depende de T019)
- [X] T023 [US3] Añadir a `src/actividades/diferencias/escena.ts` la escena `cocina`, con las mismas reglas que `salon` y 13 iconos distintos de los de las otras escenas (depende de T022)
- [X] T024 [US3] Añadir a `src/actividades/diferencias/escena.ts` la escena `jardin`, con las mismas reglas (depende de T023)
- [X] T025 [US3] Añadir a `src/actividades/diferencias/escena.ts` la escena `mercado`, con las mismas reglas; así hay unos 52 iconos en total (depende de T024)
- [X] T026 [US3] Cambiar `src/actividades/diferencias/juego.ts`: `Partida` guarda `escena` y `total`; `crearPartida(total = 3, idEscenaAnterior?, azar = Math.random)` sortea una escena con otro `id`; `tocar` busca la zona entre las diferencias activas (`dibujosDe(partida.escena, partida.total).diferencias`) y termina al llegar a `total`; `faltan` usa `total` (depende de T020, T022)
- [X] T027 [US3] Cambiar `src/actividades/diferencias/Dibujo.tsx` y `src/actividades/diferencias/Diferencias.tsx`: `Dibujo` recibe las `diferencias` activas por props en vez de importarlas; `Diferencias` calcula `dibujosDe(partida.escena, partida.total)`, pasa `arriba`/`abajo` y las diferencias a cada `Dibujo`, guarda en un estado el `id` de la escena de la partida anterior y lo pasa a `crearPartida` al pulsar "Jugar otra vez". Subir `anchoMinimo` de 160 a 240 (ver [research.md](research.md), apartado 4) (depende de T021, T026)
- [X] T028 [US3] Ejecutar `npm test` y `npm run typecheck`: T019, T020 y T021 deben pasar sin romper el resto (depende de T025, T027)

**Punto de control**: "Diferencias" tiene 4 escenas y cambia de escena en cada partida, con 3 diferencias. Falta la revisión humana (T045).

---

## Fase 6: Historia 4 - Elegir cuántas diferencias buscar (Prioridad: P3)

**Objetivo**: Antes de jugar se elige 3, 5 o 7 diferencias y los textos y la regla de terminar siguen el número elegido.

**Prueba independiente**: Pasos de "Historias 3 y 4" del [quickstart.md](quickstart.md).

### Pruebas de la historia 4

- [X] T029 [US4] Actualizar `tests/diferencias-pantalla.test.tsx` y `tests/textos.test.tsx`. En `tests/textos.test.tsx` (líneas 215-223 aprox.): `textosDiferencias.descripcion` pasa a esperar 'Encuentra las diferencias entre dos dibujos', `textosDiferencias.felicitacion` deja de compararse con una cadena y se comprueba como función (`felicitacion(3)`, `felicitacion(5)` y `felicitacion(7)` dicen "Has encontrado las n diferencias"), y se comprueban los textos nuevos `elegirNumero`, `tres`, `cinco` y `siete`. En `tests/diferencias-pantalla.test.tsx`, todas las pruebas que juegan primero eligen "3 diferencias" (o el número que toque). Debe cubrirse además: al abrir "Diferencias" se ve la pantalla de elegir con los botones "3 diferencias", "5 diferencias" y "7 diferencias" y sus iconos; para cada número se juega una partida completa (se tocan las `n` zonas), el aviso baja de `n` a 0, la felicitación dice "Has encontrado las n diferencias" y no hay círculos de más; al pulsar "Jugar otra vez" vuelve la pantalla de elegir; la descripción de la actividad ya no contiene "3". Deben fallar al principio (depende de T028)

### Implementación de la historia 4

- [X] T030 [US4] Cambiar `src/textos.ts`, en `textosDiferencias`: `descripcion` pasa a "Encuentra las diferencias entre dos dibujos"; `felicitacion` pasa a ser `(n: number) => \`¡Enhorabuena! Has encontrado las ${n} diferencias\``; añadir `elegirNumero` ("Elige cuántas diferencias quieres buscar") y los textos `tres`, `cinco` y `siete` (depende de T029)
- [X] T031 [US4] Cambiar `src/actividades/diferencias/Diferencias.tsx` y `src/actividades/diferencias/Felicitacion.tsx`: sin partida se muestra `ElegirOpcion` con las opciones 3, 5 y 7 (iconos `numeric-3-circle`, `numeric-5-circle`, `numeric-7-circle`, ids `icono-tres`, `icono-cinco` e `icono-siete`); al elegir se llama a `crearPartida(n, idEscenaAnterior)` y a `avisarPartida(true)`; "Jugar otra vez" vuelve a la pantalla de elegir (guardando el `id` de la escena anterior); `Felicitacion` recibe `total` y usa `t.felicitacion(total)` (depende de T003, T030)
- [X] T032 [US4] Ejecutar `npm test` y `npm run typecheck`: T029 debe pasar sin romper el resto (depende de T031)

**Punto de control**: se puede jugar con 3, 5 y 7 diferencias.

---

## Fase 7: Historia 5 - Elegir el tamaño de la sopa de letras (Prioridad: P3)

**Objetivo**: Antes de jugar se elige sopa pequeña (3 palabras) o mediana (6 × 6 y 5 palabras) y los textos siguen el número de palabras.

**Prueba independiente**: Pasos de "Historia 5" del [quickstart.md](quickstart.md).

### Pruebas de la historia 5

- [X] T033 [US5] Actualizar `tests/sopa-sopas.test.tsx` (incluida la prueba de la línea 29, "3 palabras distintas", que pasa a comprobar 3 o 5 según el tamaño): cada sopa tiene `tamano`; las pequeñas tienen 5 filas de 6 letras y 3 palabras; las medianas 6 filas de 6 y 5 palabras; hay al menos 5 pequeñas y 3 medianas; en las medianas cada palabra aparece una sola vez y nunca al revés. Actualizar `tests/sopa-juego.test.tsx`: `crearPartida(tamano, idAnterior, azar)` da una sopa de ese tamaño, distinta de la anterior; `haTerminado` y `faltan` usan `sopa.palabras.length` (3 y 5). Actualizar `tests/sopa-pantalla.test.tsx` (todas las pruebas que juegan primero eligen "Pequeña: 3 palabras" o "Mediana: 5 palabras"; la etiqueta, el aviso y la felicitación se comprueban con el número correcto) y `tests/textos.test.tsx` (líneas 138-144 aprox.: `etiqueta` y `felicitacion` pasan a comprobarse como funciones con 3 y 5, y se comprueban `elegirTamano`, `pequena` y `mediana`): la pantalla de elegir muestra "Pequeña: 3 palabras" y "Mediana: 5 palabras" con sus iconos; se completa una partida pequeña y una mediana (tocando las casillas de cada palabra), el aviso baja a 0 y la felicitación dice el número correcto; "Jugar otra vez" vuelve a la pantalla de elegir. Deben fallar al principio (depende de T018, T028)

### Implementación de la historia 5

- [X] T034 [US5] Cambiar `src/actividades/sopa-de-letras/sopas.ts`: añadir al tipo `Sopa` el campo `tamano: 'pequena' | 'mediana'` (y exportar el tipo `Tamano`), indicar `'pequena'` en las 5 sopas actuales y añadir 3 sopas medianas hechas a mano (`id` únicos, cuadrícula de 6 filas × 6 letras en mayúsculas sin tildes, 5 palabras de hasta 6 letras con mezcla de horizontales y verticales, cada palabra una sola vez y nunca al revés, relleno que no forme otras palabras). Actualizar el comentario de cabecera (depende de T033)
- [X] T035 [US5] Cambiar `src/textos.ts`, en `textosSopa`: `etiqueta` pasa a ser `(n: number) => \`Busca ${n} palabras relacionadas con:\``; `felicitacion` pasa a ser `(n: number) => \`¡Enhorabuena! Has encontrado las ${n} palabras\``; añadir `elegirTamano` ("Elige el tamaño de la sopa"), `pequena` ("Pequeña: 3 palabras") y `mediana` ("Mediana: 5 palabras") (depende de T033)
- [X] T036 [US5] Cambiar `src/actividades/sopa-de-letras/juego.ts`, `SopaDeLetras.tsx`, `Felicitacion.tsx` y `ListaPalabras.tsx`: `crearPartida(tamano, idAnterior?, azar)` sortea entre las sopas de ese tamaño con otro `id`; se elimina `palabrasPorSopa` y `haTerminado`/`faltan` usan `partida.sopa.palabras.length` (actualizando los comentarios que dicen "3 palabras", también en `ListaPalabras.tsx`); la actividad muestra `ElegirOpcion` (iconos `size-s` y `size-m`, ids `icono-pequena` e `icono-mediana`) antes de la partida, guarda el tamaño y la sopa anterior y vuelve a elegir al pulsar "Jugar otra vez"; `Felicitacion` recibe el número de palabras y la etiqueta usa `t.etiqueta(n)`; la cuadrícula ya se pinta con las filas y columnas de cada sopa (depende de T003, T034, T035)
- [X] T037 [US5] Ejecutar `npm test` y `npm run typecheck`: T033 debe pasar sin romper el resto (depende de T036)

**Punto de control**: se puede jugar la sopa pequeña y la mediana. Falta la revisión humana (T045) y la prueba táctil en un móvil de 360 puntos (T044).

---

## Fase 8: Historia 6 - Animación de victoria más visible (Prioridad: P4)

**Objetivo**: El fundido del icono de celebración dura 900 ms.

**Prueba independiente**: Pasos de "Historia 6" del [quickstart.md](quickstart.md).

- [X] T038 [US6] Actualizar `tests/icono-victoria.test.tsx`: con la animación activa, el icono sigue en opacidad 0 al principio y llega a 1 al avanzar `animacion.duracion` ms; añadir una prueba de que `animacion.duracion` está entre 800 y 1000; el resto de pruebas (reducir movimiento, animación apagada, botones sin bloqueo) se queda igual. Debe fallar al principio por la duración (depende de T001)
- [X] T039 [US6] Cambiar `src/animacion.ts` (`duracion: 900` y el comentario "entre 800 y 1000") y el comentario de `src/componentes/IconoVictoria.tsx` que dice "400 ms" (depende de T038)
- [X] T040 [US6] Ejecutar `npm test` y `npm run typecheck`: T038 debe pasar sin romper el resto (depende de T039)

**Punto de control**: el fundido es más largo y todo lo demás de la animación sigue igual.

---

## Fase 9: Cierre

- [X] T041 [P] Actualizar `CLAUDE.md` en la sección "Estructura" y "Cosas a tener en cuenta": banco de 50 adivinanzas, sopas de dos tamaños (5 pequeñas y 3 medianas), 4 escenas de "Diferencias" con 7 cambios, componente `ElegirOpcion`, y fundido de 900 ms en lugar de 400 ms (depende de T013, T018, T032, T037, T040)
- [X] T042 [P] Actualizar `specs/ideas-pendientes.md`: marcar como "hechas en la spec 008" las ideas que han entrado y dejar como no construidas las descartadas (depende de T013, T018, T032, T037, T040)
- [X] T043 Ejecutar `npm test` y `npm run typecheck` completos y confirmar que pasan las pruebas de las funcionalidades 001 a 008 (depende de T041, T042)
- [X] T044 Hacer la comprobación manual de [quickstart.md](quickstart.md) en un móvil con una persona mayor (adivinanzas, sopas pequeña y mediana, escenas con 3, 5 y 7 diferencias, animación y "reducir movimiento"), incluida la prueba táctil de la sopa mediana en un móvil de 360 puntos de ancho. Antes de cerrar la spec, preguntar al usuario si hay observaciones nuevas y anotarlas en [specs/ideas-pendientes.md](../ideas-pendientes.md) (no se construyen), y preguntarle si se fusiona la rama en `main`. **Requiere a una persona y un móvil: no la puede hacer el agente; déjala pendiente y avísalo.**
- [X] T045 Hacer la revisión de contenido de [contracts/contenido.md](contracts/contenido.md): las 40 adivinanzas nuevas (T009 a T012), las 3 sopas pequeñas reescritas (T015 a T017), las 3 sopas medianas (T034) y las 4 escenas con sus iconos vistas con 7 diferencias (T022 a T025). **Requiere a una persona: no la puede hacer el agente; déjala pendiente y avísalo.**

---

## Dependencias y orden de ejecución

- **Fase 1** (T001) primero. **Fase 2** (T002 y T003) bloquea solo US4 y US5.
- **US1, US2 y US6** son independientes entre sí y de las demás; pueden hacerse en cualquier orden tras T001.
- **US3** no depende de la fase 2; **US4** depende de US3 y de T003; **US5** depende de US2 (T018), de T003 y de la sopa pequeña ya reescrita.
- **Cierre** (T041 a T045) al final.

### Oportunidades de paralelismo

- Las pruebas T005 y T006 (US1), T020 y T021 (US3) tocan ficheros distintos y se pueden escribir a la vez.
- T041 y T042 (documentación) se pueden hacer a la vez.
- Las tareas de contenido de un mismo fichero (T009 a T012, T015 a T017, T022 a T025) son secuenciales porque editan el mismo archivo.

## Estrategia de implementación

1. **MVP**: Fase 1, fase 3 (US1) y fase 4 (US2): solo contenido y una regla pequeña, con valor desde la primera partida.
2. Después, US3 y luego US4 (Diferencias), US5 (sopa mediana) y US6 (animación), con un punto de control en cada fase.
3. Si alguna historia de prioridad baja (US4, US5 o US6) resultara demasiado grande, se puede dejar fuera sin afectar a las anteriores.
4. Cierre: documentación, pruebas completas, y dejar pendientes T044 y T045, que necesitan a una persona.

## Notas

- `[P]` = archivos distintos, sin dependencias pendientes.
- Cada tarea se marca como hecha al terminarla.
- Es la última funcionalidad del proyecto: al cerrarla se pregunta si hay observaciones nuevas y si se fusiona la rama en `main`.
