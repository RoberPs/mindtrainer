# Tareas: Mejora visual de "Parejas"

**Entrada**: Documentos de diseño en `specs/010-mejora-visual-parejas/`

**Requisitos previos**: [plan.md](plan.md), [spec.md](spec.md), [research.md](research.md), [data-model.md](data-model.md), [quickstart.md](quickstart.md)

**Pruebas**: Se incluyen porque la constitución (principio VIII) las exige. Solo pruebas básicas y funcionales: dibujos, dorso, botones y variedad. Nada de aspecto visual fino. Las pruebas de cada historia se escriben antes que el código.

**Formato**: `- [ ] T### [P?] [Historia?] Descripción con ruta de archivo`. `[P]` = se puede hacer en paralelo (archivos distintos, sin dependencias pendientes).

**Historias** (en el orden de la spec): US1 dibujos claros y del mismo estilo (P1), US2 dorso inconfundible (P1), US3 botones con icono (P2), US4 variedad entre partidas (P2).

**Notas**:

- Los dibujos salen de `MaterialCommunityIcons` (decisión de [research.md](research.md), punto 1). No se añade ninguna dependencia ni archivo gráfico.
- Los 12 dibujos y sus glifos: `llave` (`key`), `taza` (`coffee`), `reloj` (`clock-outline`), `gafas` (`glasses`), `cama` (`bed`), `silla` (`seat`), `lampara` (`lamp`), `tijeras` (`content-cut`), y nuevos `paraguas` (`umbrella`), `telefono` (`phone-classic`), `libro` (`book-open-variant`), `sombrero` (`hat-fedora`).
- Nombres nuevos en `src/textos.ts`: Paraguas, Teléfono, Libro, Sombrero.
- Las pruebas usan `getByTestId(..., { includeHiddenElements: true })` para los iconos. Hay que conservar los ids `icono-carta-N`, `icono-visto-N` y el texto "Carta" del dorso, porque las pruebas actuales los usan.
- US1 y US2 modifican `src/actividades/parejas/Carta.tsx`: se hacen una detrás de otra. US3 y US4 no cambian código si sus pruebas pasan a la primera.
- No se tocan `BotonGrande`, `MarcoActividad` ni otras actividades (FR-010).

## Fase 1: Preparación

- [ ] T001 Comprobar que `npm test` y `npm run typecheck` pasan en la rama `010-mejora-visual-parejas` antes de tocar nada

---

## Fase 2: Base común (bloquea las historias)

**Propósito**: textos y colores que usan los dibujos nuevos.

- [ ] T002 [P] Añadir en `src/textos.ts`, dentro de `textosParejas.dibujos`, los nombres `paraguas: 'Paraguas'`, `telefono: 'Teléfono'`, `libro: 'Libro'` y `sombrero: 'Sombrero'`
- [ ] T003 [P] Añadir en `src/tema.ts` el objeto `tema.colores.dibujos` con un color oscuro distinto para cada uno de los 12 ids de dibujo, cada uno con contraste de al menos 7 a 1 sobre `tema.colores.tarjeta` (`#F7EEE0`); comprobar los valores con la fórmula de `tests/tema-contraste.test.tsx` antes de fijarlos
- [ ] T004 Añadir en `tests/tema-contraste.test.tsx` una prueba que recorra `tema.colores.dibujos` y compruebe que hay 12 colores distintos y que cada uno tiene al menos 7 a 1 sobre `tema.colores.tarjeta` (depende de T003)

**Punto de control**: textos y colores listos y con su prueba pasando.

---

## Fase 3: Historia 1 - Dibujos claros y del mismo estilo (P1) 🎯 MVP

**Objetivo**: cada carta descubierta muestra un dibujo reconocible, de su color, junto a su nombre, en los tres tamaños.

**Prueba independiente**: jugar partidas de 6, 8 y 12 cartas y descubrir todas: cada dibujo se reconoce sin dudar y ninguno se confunde con otro.

### Pruebas de la historia 1

- [ ] T005 [P] [US1] En `tests/parejas-juego.test.tsx` añadir una prueba de que `dibujos` tiene 12 elementos, con `id` e `icono` sin repetir, y que cada uno tiene nombre en `textosParejas.dibujos` y color en `tema.colores.dibujos`
- [ ] T006 [P] [US1] En `tests/parejas-pantalla.test.tsx` añadir una prueba de que, en las partidas de 6, 8 y 12 cartas, al descubrir una pareja se ven su nombre escrito y su icono (`icono-carta-N`) en las dos cartas

### Implementación de la historia 1

- [ ] T007 [US1] En `src/actividades/parejas/dibujos.ts` ampliar la lista a los 12 dibujos indicados en las notas (depende de T002)
- [ ] T008 [US1] En `src/actividades/parejas/Carta.tsx` pintar la cara con el dibujo en su color (`tema.colores.dibujos[dibujo.id]`), el nombre debajo con `tema.colores.texto`, borde grueso del color del juego (`useColorJuego()`) para la carta girada y borde verde con el visto para la acertada; añadir una propiedad `tamanoIcono` y usarla para el dibujo (depende de T003 y T007)
- [ ] T009 [US1] En `src/actividades/parejas/Tablero.tsx` pasar a cada `Carta` `tamanoIcono` 88 en partidas de 6 y 8 cartas y 64 en la de 12 (depende de T008)

**Punto de control**: las pruebas de US1 pasan y los dibujos se ven bien en los tres tamaños.

---

## Fase 4: Historia 2 - Dorso inconfundible (P1)

**Objetivo**: todas las cartas tapadas tienen el mismo dorso, distinto de cualquier cara.

**Prueba independiente**: empezar una partida: todas las cartas tapadas se ven iguales; al girar una, se distingue de inmediato.

### Pruebas de la historia 2

- [ ] T010 [P] [US2] En `tests/parejas-pantalla.test.tsx` añadir una prueba de que, al empezar una partida de cada tamaño, todas las cartas muestran el texto "Carta" y el icono `icono-carta-N`, y de que al girar una carta deja de mostrar "Carta" y muestra su nombre

### Implementación de la historia 2

- [ ] T011 [US2] En `src/actividades/parejas/Carta.tsx` cambiar el dorso: fondo del color del juego, borde claro grueso (color del texto del juego), icono `brain` grande en lugar de `help-circle-outline`, y el texto "Carta" (mantener `testID` `icono-carta-N` y `accessibilityLabel`) (depende de T008)

**Punto de control**: las pruebas de US1 y US2 pasan.

---

## Fase 5: Historia 3 - Botones con icono grande junto al texto (P2)

**Objetivo**: "Seguir", "Jugar otra vez" y "Volver al inicio" muestran icono y texto a la vez. Ya lo hacen mediante `BotonGrande`; esta historia deja la prueba que lo garantiza.

**Prueba independiente**: llegar a cada pantalla donde aparecen y comprobar icono y texto.

- [ ] T012 [P] [US3] En `tests/parejas-pantalla.test.tsx` añadir una prueba de que "Volver al inicio" (`icono-volver`) y "Seguir" (`icono-seguir`, tras girar dos cartas distintas) muestran su icono y su texto a la vez; y comprobar que la prueba existente de "Jugar otra vez" (`icono-jugar-otra-vez`) sigue cubriendo ese botón. Si algo falla, corregirlo en `src/actividades/parejas/` sin tocar `BotonGrande` ni `MarcoActividad`

**Punto de control**: la prueba de US3 pasa sin cambiar código (si hace falta cambiarlo, anotarlo en la spec).

---

## Fase 6: Historia 4 - Partidas distintas, dibujos distintos (P2)

**Objetivo**: partidas seguidas del mismo tamaño no usan siempre los mismos dibujos.

**Prueba independiente**: 3 partidas seguidas del mismo tamaño muestran más de un conjunto de dibujos.

- [ ] T013 [P] [US4] En `tests/parejas-juego.test.tsx` añadir una prueba que cree 3 partidas del mismo tamaño con tres funciones de azar distintas y compruebe que el conjunto de dibujos no es el mismo en las tres, y que ninguna partida repite un dibujo en más de dos cartas (las reglas no cambian)

**Punto de control**: la prueba pasa sin tocar `juego.ts`.

---

## Fase 7: Cierre

- [ ] T014 Ejecutar `npm test` y `npm run typecheck`: todo en verde, incluidas las pruebas que ya existían de "Parejas" y de las demás actividades
- [ ] T015 [P] Actualizar `CLAUDE.md` (línea de `parejas/` en la estructura: 12 dibujos con color propio y dorso común) y añadir en `specs/ideas-pendientes.md` el estado tras la spec 010, indicando que no se usó Openclipart ni Kenney y por qué
- [ ] T016 Comprobación manual con un móvil siguiendo [quickstart.md](quickstart.md). **La hace una persona**: dejar pendiente y avisarlo
- [ ] T017 Antes de cerrar la spec, preguntar al usuario si hay observaciones nuevas para `specs/ideas-pendientes.md` y si se fusiona la rama en `main`. No fusionar sin su respuesta

---

## Dependencias y orden de ejecución

- Fase 1 → Fase 2 → historias → Fase 7.
- Dentro de la fase 2, T002 y T003 en paralelo; T004 después de T003.
- US1 (P1) primero; US2 después, porque ambas modifican `Carta.tsx`. US3 y US4 solo añaden pruebas y pueden hacerse en cualquier momento tras la fase 2.
- Pruebas de cada historia antes de su código.

### Oportunidades de paralelismo

- T002 y T003.
- T005 y T006 (archivos distintos).
- T012 y T013 (archivos distintos) y T015.

## Estrategia de implementación

1. Fases 1 y 2.
2. **MVP = US1**: dibujos nuevos y de color en cartas. Parar y comprobar.
3. US2 (dorso), luego US3 y US4 (pruebas).
4. Cierre: pruebas, documentación, comprobación manual y pregunta de fusión.

## Notas

- `[P]` = archivos distintos y sin dependencias pendientes.
- Marcar cada tarea como hecha al terminarla.
- Total: 17 tareas (base 3, US1 5, US2 2, US3 1, US4 1, preparación 1 y cierre 4).
