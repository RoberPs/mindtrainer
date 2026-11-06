# Tareas: Actividad "Forma la palabra"

**Entrada**: Documentos de diseño en `specs/003-forma-la-palabra/`

**Requisitos previos**: [plan.md](plan.md), [spec.md](spec.md), [research.md](research.md), [data-model.md](data-model.md), [contracts/forma-palabra.md](contracts/forma-palabra.md), [quickstart.md](quickstart.md)

**Pruebas**: Se incluyen porque la constitución (principio VIII) las exige: una funcionalidad no está terminada hasta que sus pruebas pasan. Solo pruebas básicas y funcionales: reglas, palabra correcta, incorrecta e incompleta, ver la respuesta, puntuación y final de partida, más la comprobación de la lista de palabras. Las pruebas de cada historia se escriben antes que el código y deben fallar al principio.

**Formato**: `- [ ] T### [P?] [Historia?] Descripción con ruta de archivo`. `[P]` = se puede hacer en paralelo (archivos distintos, sin dependencias pendientes).

**Nota sobre el orden**: La historia 1 ya funciona con una partida completa de 5 palabras creada al abrir la actividad: avanza con "Siguiente" hasta la cuarta palabra. La historia 3 añade el final de partida ("Ver resultado", "X de 5", "Jugar otra vez") y el aviso de fin al marco. Las historias 1 a 3 comparten `juego.ts`, `Palabra.tsx` y `FormaPalabra.tsx`, así que se hacen en orden.

## Fase 1: Preparación

- [ ] T001 Comprobar que `npm test` y `npm run typecheck` pasan en la rama `003-forma-la-palabra` antes de tocar nada, para saber que cualquier fallo posterior es de esta funcionalidad

---

## Fase 2: Base común (bloquea todas las historias)

**⚠️ CRÍTICO**: Ninguna historia puede empezar hasta terminar esta fase.

- [ ] T002 Añadir a `src/textos.ts` un bloque `textosFormaPalabra` con todos los textos de la actividad en español de España, con tildes y signos de apertura: nombre "Forma la palabra", descripción "Ordena las letras para formar la palabra", botones "Comprobar", "Borrar última letra", "Empezar de nuevo", "Ver la respuesta", "Siguiente", "Ver resultado" y "Jugar otra vez", mensaje positivo de acierto, mensaje amable de fallo, mensaje que pide completar la palabra, mensaje "La palabra es: X" al ver la respuesta, y el resultado "Has acertado X de 5" (con singular "1 de 5" correcto)
- [ ] T003 Escribir las pruebas de la lista en `tests/forma-palabra-palabras.test.tsx` y las de `crearPartida` en `tests/forma-palabra-juego.test.tsx` (archivos separados para poder probar la lista antes de que exista `juego.ts`). Lista: tiene 100 palabras o más; cada palabra tiene entre 4 y 7 letras, solo minúsculas de la "a" a la "z" y "ñ" (sin tildes); no hay palabras repetidas; no hay dos palabras con las mismas letras (se ordenan las letras de cada una y no se repite ninguna combinación). `crearPartida`: da exactamente 5 palabras distintas de la lista; con dos azares distintos las palabras cambian; las letras desordenadas de cada palabra nunca coinciden con la palabra en orden y contienen exactamente sus letras (también con letras repetidas); con un azar constante (por ejemplo, `() => 0`) las letras tampoco salen en el orden correcto y la función termina; la partida empieza con la primera palabra en estado `jugando`, aciertos a 0 y nada colocado
- [ ] T004 Crear `src/actividades/forma-palabra/palabras.ts` con una lista exportada de 100 palabras cotidianas en minúsculas (objetos y cosas conocidas por personas mayores, sin nombres propios ni extranjerismos), de 4 a 7 letras, sin tildes (la "ñ" vale), sin repetidas y sin dos con las mismas letras. Revisar a mano cada palabra: descartar las que con sus letras formen otra palabra común del español (por ejemplo, cosa/caos/saco, ropa/paro, mano/mona) y sustituirlas, porque la prueba automática solo detecta los anagramas que están dentro de la lista. Ejecutar `tests/forma-palabra-palabras.test.tsx` hasta que pase
- [ ] T005 Crear en `src/actividades/forma-palabra/juego.ts` los tipos `Letra` (`id`, `letra`) y `Partida` (`palabras`, `indice`, `aciertos`, `disponibles`, `colocadas`, `estado`, `aviso`, `terminada`) y la función `crearPartida(azar = Math.random)`: mezcla la lista con Fisher-Yates, toma 5 palabras distintas, desordena las letras de la primera volviendo a mezclar (hasta 10 veces y, si no basta, intercambiando las dos primeras letras distintas) si queda en orden correcto, según [data-model.md](data-model.md) y [contracts/forma-palabra.md](contracts/forma-palabra.md) (depende de T004)

**Punto de control**: Base lista; las historias pueden empezar.

---

## Fase 3: Historia 1 - Formar una palabra con las letras desordenadas (Prioridad: P1) 🎯 MVP

**Objetivo**: La persona ve las letras desordenadas, las toca en orden, pulsa "Comprobar" y ve un mensaje de acierto (con "Siguiente"), de fallo amable o de palabra incompleta.

**Prueba independiente**: Abrir "Forma la palabra" desde el inicio y formar una palabra (pasos 1 a 5, 8, 9, 10, 11 y 17 del [quickstart.md](quickstart.md)).

### Pruebas de la historia 1

- [ ] T006 [P] [US1] Ampliar `tests/forma-palabra-juego.test.tsx` con las reglas sobre una partida de palabras conocidas: `colocarLetra` pasa la letra a la primera casilla libre y la quita de las disponibles; tocar un número que no está disponible no cambia nada; `comprobar` con la palabra correcta pasa a `acertada` y suma 1; con letras repetidas (por ejemplo "casa") es correcta tocando cualquiera de las dos "a" primero; completa e incorrecta deja `jugando`, aviso `incorrecta`, las letras colocadas y no suma; incompleta deja aviso `incompleta` y no suma; fallar y luego acertar suma 1 una sola vez; con la palabra `acertada`, `colocarLetra` y `comprobar` no hacen nada; `siguiente` en la palabra 1 a 4 cerrada pasa a la siguiente con casillas vacías, letras desordenadas y estado `jugando`; `siguiente` con la palabra aún en juego no cambia nada
- [ ] T007 [P] [US1] Escribir en `tests/forma-palabra-pantalla.test.tsx` las pruebas de la pantalla con `Math.random` fijado: "Forma la palabra" aparece en la lista de inicio con su icono, nombre y descripción; al abrirla hay tantas casillas como letras, las letras desordenadas en botones y el botón "Comprobar"; tocar una letra la lleva a la casilla; "Comprobar" con la palabra a medias muestra el mensaje de completar; con una palabra incorrecta muestra el mensaje amable y las letras siguen puestas; con la correcta muestra el mensaje positivo y "Siguiente", y desaparecen las letras; "Siguiente" muestra una palabra nueva con las casillas vacías. Los iconos se buscan con `getByTestId(..., { includeHiddenElements: true })`

### Implementación de la historia 1

- [ ] T008 [US1] Añadir `colocarLetra(partida, id)`, `comprobar(partida)` y `siguiente(partida)` a `src/actividades/forma-palabra/juego.ts` como funciones puras que devuelven una partida nueva (o la misma si no tienen efecto), según las garantías de [contracts/forma-palabra.md](contracts/forma-palabra.md). `siguiente` desordena las letras de la palabra siguiente (misma regla de T005, con el tope de 10 remezclas y el intercambio final) y por ahora solo cubre las palabras 1 a 4 (depende de T005)
- [ ] T009 [P] [US1] Crear la pantalla de una palabra en `src/actividades/forma-palabra/Palabra.tsx`: fila de casillas (una por letra, letra de al menos 22 puntos, que pasa a otra fila si no cabe); mensaje con icono grande (`emoticon-happy` en acierto, `emoticon-neutral` en fallo, `information` si está incompleta); letras desordenadas en botones de al menos 64 de alto (`tema.boton.altoMinimo`); botón "Comprobar" con `BotonGrande` (icono `check-circle`); con la palabra cerrada se esconden las letras y "Comprobar" y aparece "Siguiente" (icono `arrow-right-circle`). Todo dentro de un `ScrollView`, con colores y tamaños de `src/tema.ts`
- [ ] T010 [US1] Crear el contenido en `src/actividades/forma-palabra/FormaPalabra.tsx`: guarda la partida en `useState`, la crea al abrirse, llama a `avisarPartida(true)` al abrirse y conecta `Palabra` con `colocarLetra`, `comprobar` y `siguiente` (depende de T008, T009)
- [ ] T011 [US1] Añadir la actividad a `src/actividades/registro.ts` tras "Parejas", con identificador `forma-palabra`, icono `{ nombre: 'alphabetical-variant' }`, nombre y descripción de `src/textos.ts` y `Contenido: FormaPalabra` (depende de T010)
- [ ] T012 [US1] Ejecutar `npm test` y `npm run typecheck`: T006 y T007 deben pasar, sin romper las pruebas de las funcionalidades 001 y 002

**Punto de control**: Se puede jugar de la palabra 1 a la 4 comprobando y avanzando; falta corregir, el final y ver la respuesta.

---

## Fase 4: Historia 2 - Corregir lo colocado (Prioridad: P1)

**Objetivo**: La persona puede quitar la última letra colocada o devolver todas con "Borrar última letra" y "Empezar de nuevo".

**Prueba independiente**: Colocar varias letras y usar cada botón (pasos 6 y 7 del [quickstart.md](quickstart.md)).

### Pruebas de la historia 2

- [ ] T013 [US2] Ampliar `tests/forma-palabra-juego.test.tsx` y `tests/forma-palabra-pantalla.test.tsx`: `borrarUltima` devuelve la última letra colocada a las disponibles y deja las demás; `empezarDeNuevo` devuelve todas y deja las casillas vacías; ambas sin ninguna letra colocada no cambian nada ni dan error; ambas con la palabra cerrada no hacen nada; tras un intento fallido, borrar la última letra permite corregir y acertar; ambas quitan el aviso anterior; en la pantalla, los botones "Borrar última letra" y "Empezar de nuevo" existen con icono y funcionan (depende de T012)

### Implementación de la historia 2

- [ ] T014 [US2] Añadir `borrarUltima(partida)` y `empezarDeNuevo(partida)` a `src/actividades/forma-palabra/juego.ts` como funciones puras, según [contracts/forma-palabra.md](contracts/forma-palabra.md) (depende de T013)
- [ ] T015 [US2] Añadir a `src/actividades/forma-palabra/Palabra.tsx` los botones "Borrar última letra" (icono `backspace`) y "Empezar de nuevo" (icono `refresh`), que se esconden con la palabra cerrada, y conectarlos en `FormaPalabra.tsx` con `borrarUltima` y `empezarDeNuevo` (depende de T014)
- [ ] T016 [US2] Ejecutar `npm test` y `npm run typecheck`: las pruebas de T013 deben pasar

**Punto de control**: Las historias 1 y 2 funcionan juntas; la persona puede equivocarse y corregir.

---

## Fase 5: Historia 3 - Terminar una partida de 5 palabras y ver el resultado (Prioridad: P1)

**Objetivo**: Tras la quinta palabra, la persona ve "X de 5" y puede pulsar "Jugar otra vez" o "Volver al inicio".

**Prueba independiente**: Jugar las 5 palabras, acertando algunas, y comprobar el resultado y los botones (pasos 13 a 16, 18 y 19 del [quickstart.md](quickstart.md)).

### Pruebas de la historia 3

- [ ] T017 [US3] Ampliar `tests/forma-palabra-juego.test.tsx` y `tests/forma-palabra-pantalla.test.tsx`: `siguiente` con la quinta palabra cerrada deja `terminada` verdadero y el número de aciertos; en la pantalla, en la quinta palabra cerrada el botón se llama "Ver resultado" y no "Siguiente"; al pulsarlo aparece "Has acertado X de 5" con X igual a las palabras formadas (jugando una partida con algunas acertadas y otras no); se ven los botones "Jugar otra vez" y "Volver al inicio"; `avisarPartida` se llama con `true` al abrir y con `false` al cerrar la quinta palabra (antes de pulsar "Ver resultado"); dentro de `MarcoActividad`, "Volver al inicio" en el resultado vuelve a la lista sin pedir confirmación; "Jugar otra vez" empieza una partida nueva con aciertos a 0 y llama otra vez a `avisarPartida(true)`; en una partida con varias partidas seguidas, ninguna repite palabras dentro de la misma (con azares distintos en cada partida: `mockReturnValueOnce` con secuencias diferentes) (depende de T016)

### Implementación de la historia 3

- [ ] T018 [US3] Completar `siguiente` en `src/actividades/forma-palabra/juego.ts`: con la quinta palabra cerrada pone `terminada` en verdadero; con la palabra aún en juego no cambia nada (depende de T017)
- [ ] T019 [P] [US3] Crear la pantalla final en `src/actividades/forma-palabra/Resultado.tsx`: icono `party-popper` grande, el texto "Has acertado X de 5" y un `BotonGrande` "Jugar otra vez" (icono `refresh`). El botón "Volver al inicio" no se pinta aquí: lo pone el marco
- [ ] T020 [US3] Cambiar `Palabra.tsx` para que el botón de la quinta palabra cerrada se llame "Ver resultado" (icono `flag-checkered`), y `FormaPalabra.tsx` para mostrar `Resultado` cuando la partida está terminada, llamar a `avisarPartida(false)` en el momento en que se cierra la quinta palabra (acierto) y hacer que "Jugar otra vez" cree una partida nueva y llame a `avisarPartida(true)` (depende de T018, T019)
- [ ] T021 [US3] Ejecutar `npm test` y `npm run typecheck`: las pruebas de T017 deben pasar

**Punto de control**: Las historias 1 a 3 funcionan; la partida tiene principio y final.

---

## Fase 6: Historia 4 - Ver la respuesta cuando no me sale (Prioridad: P2)

**Objetivo**: La persona puede pulsar "Ver la respuesta", ver la palabra correcta y seguir. Esa palabra no cuenta como acierto.

**Prueba independiente**: Pulsar "Ver la respuesta" en una palabra, seguir y comprobar el resultado final (pasos 12 y 14 del [quickstart.md](quickstart.md)).

### Pruebas de la historia 4

- [ ] T022 [US4] Ampliar `tests/forma-palabra-juego.test.tsx` y `tests/forma-palabra-pantalla.test.tsx`: `verRespuesta` deja la palabra `rendida` y no suma aciertos; con la palabra ya cerrada no hace nada; tras `verRespuesta`, `colocarLetra`, `comprobar` y `borrarUltima` no hacen nada; fallar y acertar después sí suma; en la pantalla, "Ver la respuesta" está siempre visible mientras la palabra no esté cerrada, muestra "La palabra es: X" con icono y el botón "Siguiente"; en la quinta palabra muestra "Ver resultado"; en una partida completa donde se ve la respuesta en una palabra, el resultado "X de 5" no la cuenta; si la quinta palabra se cierra con "Ver la respuesta", se llama a `avisarPartida(false)` en ese momento (depende de T021)

### Implementación de la historia 4

- [ ] T023 [US4] Añadir `verRespuesta(partida)` a `src/actividades/forma-palabra/juego.ts` como función pura, según [contracts/forma-palabra.md](contracts/forma-palabra.md) (depende de T022)
- [ ] T024 [US4] Añadir a `Palabra.tsx` el botón "Ver la respuesta" (icono `eye`, visible solo con la palabra en juego) y el mensaje con icono `lightbulb-on` que muestra la palabra correcta, y conectarlo en `FormaPalabra.tsx` con `verRespuesta`. Si la palabra rendida es la quinta, llamar a `avisarPartida(false)` igual que al acertar (depende de T023)
- [ ] T025 [US4] Ejecutar `npm test` y `npm run typecheck`: las pruebas de T022 deben pasar

**Punto de control**: Las cuatro historias funcionan; la actividad está completa.

---

## Fase 7: Remate

- [ ] T026 [P] Ampliar `tests/textos.test.tsx`, siguiendo su estilo, para comprobar los textos fijos de "Forma la palabra" (con tildes y signos de apertura) y que cada botón de acción (todos menos los de letra) lleva icono y texto
- [ ] T027 [P] Actualizar `CLAUDE.md`: cambiar la nota "La única actividad real por ahora es Parejas" por las dos actividades reales y añadir `src/actividades/forma-palabra/` a la estructura
- [ ] T028 Ejecutar `npm test` y `npm run typecheck` completos: todo debe pasar, también las pruebas de las funcionalidades 001 y 002 (depende de T026)
- [ ] T029 Hacer la comprobación manual de los 21 pasos de [quickstart.md](quickstart.md) en un móvil con una persona mayor, incluidos esperar un minuto sin tocar nada (paso 8), jugar 10 partidas seguidas (paso 16), salir sin aviso tras la quinta palabra (paso 19) y el modo avión (paso 21). Comprobar sobre todo que una palabra de 7 letras cabe en las casillas y los botones con letra de 22 puntos en un móvil pequeño. **Requiere a una persona y un móvil: no la puede hacer el agente; déjala pendiente y avísalo.**

---

## Dependencias y orden de ejecución

### Entre fases

- **Fase 1** (T001): sin dependencias.
- **Fase 2** (T002 a T005): depende de la fase 1. Bloquea todas las historias.
- **Historia 1** (T006 a T012): depende de la fase 2. Es el MVP.
- **Historia 2** (T013 a T016): depende de la historia 1 (amplía `Palabra.tsx` y `FormaPalabra.tsx`).
- **Historia 3** (T017 a T021): depende de la historia 2.
- **Historia 4** (T022 a T025): depende de la historia 3 (el botón de la quinta palabra y el aviso de fin ya existen).
- **Remate** (T026 a T029): depende de las cuatro historias.

### Dentro de cada historia

- Las pruebas se escriben primero y deben fallar antes de implementar.
- Reglas (`juego.ts`) antes que pantallas; `Palabra.tsx` antes que `FormaPalabra.tsx`.

### Oportunidades de paralelismo

- Fase 2: las pruebas de la lista (T003) se escriben antes y se ejecutan al terminar T004; las de `crearPartida` se ejecutan al terminar T005.
- Historia 1: T006 y T007 a la vez; T009 a la vez que T008.
- Historia 3: T019 a la vez que T018.
- Remate: T026 y T027 a la vez.

Las historias no se pueden hacer en paralelo entre sí porque comparten `juego.ts`, `Palabra.tsx`, `FormaPalabra.tsx` y los dos archivos de pruebas.

### Ejemplo de paralelismo: Historia 1

```text
# Pruebas de la historia 1 a la vez:
T006 tests/forma-palabra-juego.test.tsx
T007 tests/forma-palabra-pantalla.test.tsx

# Reglas y pantalla a la vez:
T008 src/actividades/forma-palabra/juego.ts
T009 src/actividades/forma-palabra/Palabra.tsx
```

---

## Estrategia de implementación

### Primero el MVP (solo historia 1)

1. Fase 1 y fase 2.
2. Historia 1: se puede formar y comprobar palabras, aunque sin corregir ni final.
3. **Parar y comprobar** con los pasos 1 a 5, 8 a 11 y 17 del quickstart.

### Entrega incremental

1. Historia 2: se puede corregir antes y después de comprobar.
2. Historia 3: la partida tiene final, resultado "X de 5" y "Jugar otra vez".
3. Historia 4: "Ver la respuesta" cuando no sale.
4. Remate y comprobación manual con personas mayores.

## Notas

- `[P]` = archivos distintos, sin dependencias pendientes.
- Marca cada tarea como hecha al terminarla.
- Todos los textos van en `src/textos.ts`; todos los tamaños y colores salen de `src/tema.ts`.
- Nada fuera de la spec: sin pistas, niveles, ranking, guardado, contador de intentos ni "Palabra N de 5".
- Cada botón de acción y cada mensaje importante va con icono y texto; los botones de letra son solo texto.
