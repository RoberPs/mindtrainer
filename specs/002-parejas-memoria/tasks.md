# Tareas: Actividad "Parejas"

**Entrada**: Documentos de diseño en `specs/002-parejas-memoria/`

**Requisitos previos**: [plan.md](plan.md), [spec.md](spec.md), [research.md](research.md), [data-model.md](data-model.md), [contracts/parejas.md](contracts/parejas.md), [quickstart.md](quickstart.md)

**Pruebas**: Se incluyen porque la constitución (principio VIII) las exige: una funcionalidad no está terminada hasta que sus pruebas pasan. Solo pruebas básicas y funcionales: reglas, pareja correcta e incorrecta, intentos y final de partida. Las pruebas de cada historia se escriben antes que el código y deben fallar al principio.

**Formato**: `- [ ] T### [P?] [Historia?] Descripción con ruta de archivo`. `[P]` = se puede hacer en paralelo (archivos distintos, sin dependencias pendientes).

**Nota sobre el orden**: Las historias 1 y 2 funcionan con una partida pequeña que empieza directamente al abrir la actividad. La historia 3 añade la elección de tamaño y sustituye ese arranque provisional (T010, T016 → T020).

## Fase 1: Preparación

- [ ] T001 Comprobar que `npm test` y `npm run typecheck` pasan en la rama `002-parejas-memoria` antes de tocar nada, para saber que cualquier fallo posterior es de esta funcionalidad

---

## Fase 2: Base común (bloquea todas las historias)

**⚠️ CRÍTICO**: Ninguna historia puede empezar hasta terminar esta fase.

- [ ] T002 [P] Añadir a `src/textos.ts` todos los textos de la actividad en español de España, con tildes y signos de apertura: nombre "Parejas", descripción "Encuentra las cartas iguales", invitación a elegir tamaño, "Pequeña", "Mediana", "Grande" con "6 cartas", "8 cartas" y "12 cartas", "Intentos", "Seguir", "Carta", mensaje de felicitación, "Has necesitado N intentos" (con singular para 1) y "Jugar otra vez"; y los nombres de los 8 dibujos (llave, taza, reloj, gafas, cama, silla, lámpara, tijeras)
- [ ] T003 [P] Crear los 8 dibujos (identificador, nombre tomado de `src/textos.ts` e icono de `MaterialCommunityIcons`: `key`, `coffee`, `clock-outline`, `glasses`, `bed`, `seat`, `lamp`, `content-cut`) en `src/actividades/parejas/dibujos.ts` según [data-model.md](data-model.md)
- [ ] T004 Crear en `src/actividades/parejas/juego.ts` los tipos `Carta` y `Partida` y la función `crearPartida(tamano, azar = Math.random)`: elige N/2 dibujos distintos de los 8, los duplica y mezcla las cartas con Fisher-Yates; todas empiezan `tapada` y los intentos en 0, según [contracts/parejas.md](contracts/parejas.md) (depende de T003)

**Punto de control**: Base lista; las historias pueden empezar.

---

## Fase 3: Historia 1 - Jugar una partida de parejas (Prioridad: P1) 🎯 MVP

**Objetivo**: La persona ve cartas boca abajo, gira dos, y si son iguales se quedan descubiertas; si son distintas se ven hasta pulsar "Seguir".

**Prueba independiente**: Abrir "Parejas" desde el inicio y jugar con las cartas (pasos 1, 4 a 10 del [quickstart.md](quickstart.md)). Hasta la historia 3, la partida es de 6 cartas.

### Pruebas de la historia 1

- [ ] T005 [P] [US1] Escribir en `tests/parejas-juego.test.tsx` las pruebas de las reglas con un mazo conocido: dos cartas iguales quedan `descubierta`; dos distintas quedan `girada`; `seguir` las vuelve a tapar; tocar una carta descubierta o ya girada no cambia nada; con dos distintas a la vista, tocar otra carta no cambia nada; el intento sube en 1 al girar la segunda carta (acierte o falle) y no al girar la primera
- [ ] T006 [P] [US1] Escribir en `tests/parejas-pantalla.test.tsx` las pruebas de la pantalla con `Math.random` fijado: "Parejas" aparece en la lista de inicio con su icono, nombre y descripción; al abrirla hay 6 cartas tapadas con "Intentos: 0"; dos distintas muestran dibujo y nombre y aparece "Seguir"; tras avanzar el reloj 1 minuto con temporizadores simulados siguen a la vista; tocar una tercera no hace nada; "Seguir" las tapa y desaparece; dos iguales se quedan descubiertas sin "Seguir". Los iconos se buscan con `getByTestId(..., { includeHiddenElements: true })`

### Implementación de la historia 1

- [ ] T007 [US1] Añadir `tocarCarta(partida, posicion)` y `seguir(partida)` a `src/actividades/parejas/juego.ts` como funciones puras que devuelven una partida nueva (o la misma si el toque no tiene efecto), según las garantías de [contracts/parejas.md](contracts/parejas.md) (depende de T004)
- [ ] T008 [P] [US1] Crear la carta en `src/actividades/parejas/Carta.tsx`: tapada muestra icono de interrogante y el texto "Carta"; girada o descubierta muestra el dibujo grande con su nombre; las descubiertas se distinguen además por un icono de visto, no solo por el color. Usa `Icono` y `tema` (letra de al menos 22 puntos)
- [ ] T009 [US1] Crear el tablero en `src/actividades/parejas/Tablero.tsx`: zona fija arriba con "Intentos: N" y, solo si hay dos cartas distintas a la vista, el botón "Seguir" (`BotonGrande`, icono `arrow-right-circle`); debajo un `ScrollView` con la cuadrícula de cartas, de 2 columnas (6 y 8 cartas) o 3 (12 cartas) (depende de T007, T008)
- [ ] T010 [US1] Crear el contenido de la actividad en `src/actividades/parejas/Parejas.tsx`: guarda la partida en `useState`, empieza una partida de 6 cartas al abrirse, llama a `avisarPartida(true)` al empezar y conecta el tablero con `tocarCarta` y `seguir`. Es un arranque provisional que T020 sustituye (depende de T009)
- [ ] T011 [US1] Añadir la actividad a `src/actividades/registro.ts` con identificador `parejas`, icono `{ nombre: 'cards' }`, nombre y descripción de `src/textos.ts` y `Contenido: Parejas` (depende de T010)
- [ ] T012 [US1] Ejecutar `npm test` y `npm run typecheck`: T005 y T006 deben pasar

**Punto de control**: Se puede jugar una partida pequeña de principio a fin, aún sin felicitación.

---

## Fase 4: Historia 2 - Ver la felicitación al terminar (Prioridad: P1)

**Objetivo**: Al descubrir la última pareja aparece una felicitación con los intentos y los botones "Jugar otra vez" y "Volver al inicio".

**Prueba independiente**: Jugar una partida pequeña hasta el final (pasos 11 y 12 del [quickstart.md](quickstart.md)).

### Pruebas de la historia 2

- [ ] T013 [US2] Ampliar `tests/parejas-juego.test.tsx` y `tests/parejas-pantalla.test.tsx`: la partida no está terminada hasta descubrir la última pareja y sí lo está al descubrirla; al terminar aparece la felicitación con el número de intentos que marcaba (con singular si es 1) y los botones "Jugar otra vez" y "Volver al inicio"; `avisarPartida` se llama con `true` al empezar y con `false` al terminar; dentro de `MarcoActividad`, "Volver al inicio" en la felicitación vuelve a la lista sin pedir confirmación; "Jugar otra vez" empieza una partida nueva con intentos a 0, cartas tapadas y orden distinto (depende de T012)

### Implementación de la historia 2

- [ ] T014 [US2] Añadir el campo `terminada` a la partida en `src/actividades/parejas/juego.ts`: pasa a ser verdadero solo cuando todas las cartas están `descubierta` (depende de T013)
- [ ] T015 [P] [US2] Crear la pantalla final en `src/actividades/parejas/Felicitacion.tsx`: icono `party-popper`, mensaje de felicitación, "Has necesitado N intentos" y un `BotonGrande` "Jugar otra vez" (icono `refresh`). El botón "Volver al inicio" no se pinta aquí: lo pone el marco
- [ ] T016 [US2] Cambiar `src/actividades/parejas/Parejas.tsx` para mostrar la felicitación cuando la partida está terminada, llamar a `avisarPartida(false)` en ese momento y hacer que "Jugar otra vez" empiece una partida nueva de 6 cartas (provisional hasta T020) (depende de T014, T015)
- [ ] T017 [US2] Ejecutar `npm test` y `npm run typecheck`: las pruebas de T013 deben pasar

**Punto de control**: Las historias 1 y 2 funcionan juntas; el juego tiene principio y final.

---

## Fase 5: Historia 3 - Elegir el tamaño de la partida (Prioridad: P2)

**Objetivo**: Antes de empezar, la persona elige entre pequeña (6), mediana (8) y grande (12), y la partida tiene exactamente esas cartas.

**Prueba independiente**: Abrir "Parejas", elegir cada tamaño y contar las cartas (pasos 2, 3, 13 y 14 del [quickstart.md](quickstart.md)).

### Pruebas de la historia 3

- [ ] T018 [US3] Ampliar `tests/parejas-juego.test.tsx` y `tests/parejas-pantalla.test.tsx`: `crearPartida` da exactamente 6, 8 y 12 cartas y cada dibujo sale exactamente 2 veces en los tres tamaños; con otro valor de azar el orden cambia; al abrir la actividad se ven los tres botones con "6 cartas", "8 cartas" y "12 cartas"; elegir cada uno muestra exactamente ese número de cartas tapadas; se puede jugar y terminar una partida de cada tamaño; "Jugar otra vez" lleva a la elección de tamaño; `avisarPartida(true)` se llama al elegir el tamaño y no antes (depende de T017)

### Implementación de la historia 3

- [ ] T019 [P] [US3] Crear la pantalla de elegir tamaño en `src/actividades/parejas/ElegirTamano.tsx`: una invitación a elegir y tres `BotonGrande` con icono (`size-s`, `size-m`, `size-l`) y texto "Pequeña", "Mediana" y "Grande" con su número de cartas visible
- [ ] T020 [US3] Cambiar `src/actividades/parejas/Parejas.tsx` para que empiece en la elección de tamaño, cree la partida con el tamaño elegido llamando a `avisarPartida(true)`, y haga que "Jugar otra vez" vuelva a la elección de tamaño. Quitar el arranque provisional de T010 y T016 (depende de T018, T019)
- [ ] T021 [US3] Ejecutar `npm test` y `npm run typecheck`: las pruebas de T018 deben pasar

**Punto de control**: Las tres historias funcionan; la actividad está completa.

---

## Fase 6: Remate

- [ ] T022 [P] Ampliar `tests/textos.test.tsx`, siguiendo su estilo, para comprobar los textos fijos de "Parejas" (con tildes y signos de apertura) y que cada botón de la actividad lleva icono y texto
- [ ] T023 [P] Actualizar `CLAUDE.md`: quitar la nota que dice que la lista de actividades está vacía y añadir `src/actividades/parejas/` a la estructura
- [ ] T024 Ejecutar `npm test` y `npm run typecheck` completos: todo debe pasar, también las pruebas de la funcionalidad 001 (depende de T022)
- [ ] T025 Hacer la comprobación manual de los 18 pasos de [quickstart.md](quickstart.md) en un móvil con una persona mayor, incluidos esperar un minuto con dos cartas distintas a la vista (paso 6), el modo avión (paso 17) y el reconocimiento de los dibujos con 10 personas (paso 18, CE-005). Comprobar sobre todo que en la partida grande los nombres caben en letra de 22 puntos (paso 14). **Requiere a una persona y un móvil: no la puede hacer el agente; déjala pendiente y avísalo.**

---

## Dependencias y orden de ejecución

### Entre fases

- **Fase 1** (T001): sin dependencias.
- **Fase 2** (T002 a T004): depende de la fase 1. Bloquea todas las historias.
- **Historia 1** (T005 a T012): depende de la fase 2. Es el MVP.
- **Historia 2** (T013 a T017): depende de la historia 1 (usa su tablero y `Parejas.tsx`).
- **Historia 3** (T018 a T021): depende de la historia 2 (sustituye el arranque provisional que dejan T010 y T016).
- **Remate** (T022 a T025): depende de las tres historias.

### Dentro de cada historia

- Las pruebas se escriben primero y deben fallar antes de implementar.
- Reglas (`juego.ts`) antes que pantallas; carta antes que tablero; tablero antes que `Parejas.tsx`.

### Oportunidades de paralelismo

- Fase 2: T002 y T003 a la vez.
- Historia 1: T005 y T006 a la vez; T008 a la vez que T007.
- Historia 2: T015 a la vez que T014.
- Historia 3: T019 a la vez que T018.
- Remate: T022 y T023 a la vez.

Las historias no se pueden hacer en paralelo entre sí porque comparten `juego.ts`, `Parejas.tsx` y los dos archivos de pruebas.

### Ejemplo de paralelismo: Historia 1

```text
# Pruebas de la historia 1 a la vez:
T005 tests/parejas-juego.test.tsx
T006 tests/parejas-pantalla.test.tsx

# Reglas y carta a la vez:
T007 src/actividades/parejas/juego.ts
T008 src/actividades/parejas/Carta.tsx
```

---

## Estrategia de implementación

### Primero el MVP (solo historia 1)

1. Fase 1 y fase 2.
2. Historia 1: se puede jugar una partida pequeña, aunque sin felicitación.
3. **Parar y comprobar** con los pasos 1 y 4 a 10 del quickstart.

### Entrega incremental

1. Historia 2: el juego tiene final y felicitación.
2. Historia 3: la persona elige el tamaño; se retira el arranque provisional.
3. Remate y comprobación manual con personas mayores.

## Notas

- `[P]` = archivos distintos, sin dependencias pendientes.
- Marca cada tarea como hecha al terminarla.
- Todos los textos van en `src/textos.ts`; todos los tamaños y colores salen de `src/tema.ts`.
- Nada fuera de la spec: sin mejores marcas, ranking, sonidos, dos jugadores ni guardado.
- Cada dibujo va siempre junto a su nombre escrito; cada botón, con icono y texto.
