# Tareas: Actividad "Adivinanzas"

**Entrada**: Documentos de diseño en `specs/005-adivinanzas/`

**Requisitos previos**: [plan.md](plan.md), [spec.md](spec.md), [research.md](research.md), [data-model.md](data-model.md), [contracts/adivinanzas.md](contracts/adivinanzas.md), [quickstart.md](quickstart.md)

**Pruebas**: Se incluyen porque la constitución (principio VIII) las exige: una funcionalidad no está terminada hasta que sus pruebas pasan. Solo pruebas básicas y funcionales: respuesta correcta e incorrecta, un solo intento, puntuación "X de 5", adivinanzas sin repetir, orden de respuestas sorteado y final de partida, más la comprobación del banco de adivinanzas. Las pruebas de cada historia se escriben antes que el código y deben fallar al principio.

**Formato**: `- [ ] T### [P?] [Historia?] Descripción con ruta de archivo`. `[P]` = se puede hacer en paralelo (archivos distintos, sin dependencias pendientes).

**Nota sobre el orden**: La historia 1 ya deja jugar adivinanzas una tras otra: leer, responder una vez, ver acierto o fallo con la correcta señalada y pasar a la siguiente con "Siguiente". La historia 2 añade el final: la quinta lleva a "Ver resultado", la pantalla de "X de 5", "Jugar otra vez" y el aviso de fin al marco. Las dos comparten `juego.ts`, `Adivinanzas.tsx` y los archivos de pruebas, así que se hacen en orden.

**Convenciones de pantalla** (para que las pruebas y las pantallas coincidan): las tres respuestas tienen `testID` `respuesta-0`, `respuesta-1` y `respuesta-2` (en el orden en que se ven) y sus iconos `icono-respuesta-0`, `icono-respuesta-1` e `icono-respuesta-2`; el aviso de turno lleva `icono-numero`; los iconos de mensaje son `icono-acierto`, `icono-fallo`, `icono-siguiente`, `icono-resultado` e `icono-jugar-otra-vez`. Los iconos se buscan en las pruebas con `getByTestId(..., { includeHiddenElements: true })`.

## Fase 1: Preparación

- [ ] T001 Comprobar que `npm test` y `npm run typecheck` pasan en la rama `005-adivinanzas` antes de tocar nada, para saber que cualquier fallo posterior es de esta funcionalidad

---

## Fase 2: Base común (bloquea todas las historias)

**⚠️ CRÍTICO**: Ninguna historia puede empezar hasta terminar esta fase.

- [ ] T002 Añadir a `src/textos.ts` un bloque `textosAdivinanzas` con todos los textos de la actividad en español de España, con tildes y signos de apertura: nombre "Adivinanzas", descripción "Descubre la respuesta de cada adivinanza", `numero(n)` ("Adivinanza N de 5"), acierto "¡Muy bien! Esa es la respuesta correcta", `fallo(correcta)` ("No pasa nada. La respuesta correcta es: X"), "Siguiente", "Ver resultado", "Jugar otra vez", `aciertos(n)` ("Has acertado N de 5"), y tres mensajes finales según los aciertos: 5 "¡Perfecto! Las has acertado todas", 3 o 4 "¡Muy bien! Tienes buena memoria" y 0 a 2 "¡Ánimo! Con la práctica saldrán más", más una función `mensajeFinal(n)` que elige el correcto
- [ ] T003 [P] Escribir las pruebas del banco en `tests/adivinanzas-banco.test.tsx`: hay 10 adivinanzas o más; los `id` son distintos; cada una tiene un texto no vacío, una `correcta` y exactamente 2 `incorrectas`; las 3 respuestas son distintas entre sí, de una sola palabra (sin espacios) y no vacías; y el texto de la adivinanza no contiene la respuesta correcta (sin distinguir mayúsculas)
- [ ] T004 [P] Escribir en `tests/adivinanzas-juego.test.tsx` las pruebas de `crearPartida`: con un azar fijo devuelve 5 turnos, sin ninguna adivinanza repetida, todas del banco; cada turno tiene 3 opciones que son exactamente la correcta y las dos incorrectas de su adivinanza; empieza en el índice 0, sin respuesta elegida, con 0 aciertos y sin terminar; con azares distintos puede cambiar el orden de las opciones de una misma adivinanza, y a lo largo de varias partidas con azares distintos la correcta aparece en las tres posiciones (arriba, en medio y abajo); la partida creada no comparte datos con el banco (no se modifica). Crear también el archivo nuevo `tests/ayudas-adivinanzas.ts` (aparte de `tests/ayudas.tsx`) con ayudas que usan las pruebas sin depender del contenido del banco: `correctaActual(partida)`, `incorrectaActual(partida)` y `partidaConAzar(valor)`, que usa un azar constante
- [ ] T005 Crear `src/actividades/adivinanzas/adivinanzas.ts` con la lista exportada de al menos 10 adivinanzas (la propuesta de [research.md](research.md): pera, plátano, reloj, viento, ajo, huevo, anillo, llave, oscuridad y aguacate), cada una con `id`, `texto`, `correcta` y `incorrectas` (2). **Revisión obligatoria por una persona (RF-011)**: confirmar que cada adivinanza es tradicional y conocida, que está bien copiada, y que las dos incorrectas no son también una respuesta posible; cambiar las que no convenzan por otras tradicionales. Ejecutar `tests/adivinanzas-banco.test.tsx` hasta que pase (depende de T003)
- [ ] T006 Crear en `src/actividades/adivinanzas/juego.ts` los tipos `Turno` (`adivinanza`, `opciones`) y `Partida` (`turnos`, `indice`, `elegida`, `aciertos`, `terminada`), la constante de 5 adivinanzas por partida, la mezcla de Fisher-Yates con azar cambiable y la función `crearPartida(azar = Math.random)`: baraja el banco, se queda con 5 y baraja las 3 respuestas de cada una, según [data-model.md](data-model.md) y [contracts/adivinanzas.md](contracts/adivinanzas.md). Ejecutar las pruebas de `crearPartida` de T004 (depende de T004, T005)

**Punto de control**: Base lista; las historias pueden empezar.

---

## Fase 3: Historia 1 - Leer una adivinanza y tocar una de las tres respuestas (Prioridad: P1) 🎯 MVP

**Objetivo**: La persona lee una adivinanza, toca una de las tres respuestas (un solo intento), ve si ha acertado o el mensaje amable con la respuesta correcta, y pasa a la siguiente con "Siguiente".

**Prueba independiente**: Abrir "Adivinanzas" desde el inicio, acertar una adivinanza, fallar otra y pasar a la siguiente (pasos 1 a 7 del [quickstart.md](quickstart.md)).

### Pruebas de la historia 1

- [ ] T007 [P] [US1] Ampliar `tests/adivinanzas-juego.test.tsx` con las reglas de `responder` y `siguiente` usando las ayudas de `tests/ayudas-adivinanzas.ts`: responder la correcta guarda `elegida` y suma exactamente un acierto; responder una incorrecta guarda `elegida` y no suma; una segunda respuesta (la misma, otra incorrecta o la correcta después de fallar) no cambia `elegida` ni los aciertos; `siguiente` sin haber respondido no cambia nada; `siguiente` tras responder pasa al índice siguiente con `elegida` a `null` y conserva los aciertos; la partida recibida no se modifica
- [ ] T008 [P] [US1] Escribir en `tests/adivinanzas-pantalla.test.tsx` las pruebas de la pantalla con `Math.random` fijado a 0 (la partida que se muestra es `crearPartida(() => 0)`; la respuesta correcta y las incorrectas se localizan con las ayudas, sin escribir textos a mano): "Adivinanzas" aparece en la lista de inicio con su icono, nombre y descripción; al abrirla se ven "Adivinanza 1 de 5" con `icono-numero`, el texto de la adivinanza y 3 respuestas (`respuesta-0` a `respuesta-2`) con su icono; tocar la correcta muestra el mensaje positivo con `icono-acierto`, el botón "Siguiente" con `icono-siguiente`, y las 3 respuestas siguen visibles; tocar una incorrecta muestra el mensaje amable con la respuesta correcta escrita y `icono-fallo`, y la correcta sigue señalada; tras responder, tocar otra respuesta no cambia el mensaje; tocar "Siguiente" muestra "Adivinanza 2 de 5" sin ningún mensaje anterior y con las respuestas tocables otra vez (depende de T006)

### Implementación de la historia 1

- [ ] T009 [US1] Añadir `responder(partida, opcion)` y `siguiente(partida)` a `src/actividades/adivinanzas/juego.ts` como funciones puras que devuelven una partida nueva (o la misma si no tienen efecto), con las transiciones de [data-model.md](data-model.md); en esta historia `siguiente` solo avanza de turno (el paso de la quinta al resultado se añade en la historia 2) (depende de T006, T007)
- [ ] T010 [P] [US1] Crear `src/actividades/adivinanzas/Respuesta.tsx`: botón de una respuesta con `accessibilityRole="button"`, alto de al menos `tema.boton.altoMinimo`, letra de `tema.letra.normal` o mayor y un icono grande junto al texto. Recibe el texto, el estado (`pendiente`, `correcta`, `elegidaIncorrecta` o `otra`) y `alTocar`. Estados distinguibles sin depender solo del color: pendiente (estilo de `BotonGrande`, icono `hand-pointing-right`), correcta (fondo `tema.colores.acierto`, letra blanca, icono `check-circle`), elegida incorrecta (fondo `tema.colores.tarjeta`, borde muy grueso, icono `close-circle`) y otra (fondo `tema.colores.tarjeta`, borde fino, icono `minus-circle-outline`). Fuera del estado `pendiente` no llama a `alTocar`. El `testID` del icono lo recibe como parámetro
- [ ] T011 [US1] Crear `src/actividades/adivinanzas/Adivinanza.tsx`: pantalla de un turno dentro de un `ScrollView`. De arriba abajo: "Adivinanza N de 5" con icono `help-circle` (`icono-numero`), el texto de la adivinanza en letra de `tema.letra.titulo`, las 3 `Respuesta` (`respuesta-0` a `respuesta-2`, iconos `icono-respuesta-0` a `icono-respuesta-2`), y tras responder el mensaje con icono grande (acierto: `emoticon-happy`, `icono-acierto`; fallo: `emoticon-neutral`, `icono-fallo`, con la respuesta correcta escrita) y el botón "Siguiente" (`BotonGrande`, icono `arrow-right-circle`, `icono-siguiente`). Recibe la partida, `alResponder(opcion)` y `alSiguiente` (depende de T002, T010)
- [ ] T012 [US1] Crear el contenido en `src/actividades/adivinanzas/Adivinanzas.tsx`: guarda la partida en `useState`, la crea al abrirse y llama a `avisarPartida(true)` al abrirse; conecta `Adivinanza` con `responder` y `siguiente` (depende de T009, T011)
- [ ] T013 [US1] Añadir la actividad a `src/actividades/registro.ts` tras "Sopa de letras", con identificador `adivinanzas`, icono `{ nombre: 'help-circle' }`, nombre y descripción de `src/textos.ts` y `Contenido: Adivinanzas` (depende de T012)
- [ ] T014 [US1] Ejecutar `npm test` y `npm run typecheck`: T007 y T008 deben pasar, sin romper las pruebas de las funcionalidades 001 a 004

**Punto de control**: Se pueden jugar adivinanzas una tras otra; falta el final de partida y el resultado.

---

## Fase 4: Historia 2 - Terminar la partida y ver cuántas he acertado (Prioridad: P1)

**Objetivo**: Tras la quinta adivinanza, la persona ve "X de 5", un mensaje según su puntuación y los botones "Jugar otra vez" y "Volver al inicio".

**Prueba independiente**: Jugar 5 adivinanzas, con aciertos y fallos, y comprobar el resultado y los botones (pasos 8 a 11, 13, 14 y 16 del [quickstart.md](quickstart.md)).

### Pruebas de la historia 2

- [ ] T015 [US2] Ampliar `tests/adivinanzas-juego.test.tsx` y `tests/adivinanzas-pantalla.test.tsx` (depende de T014): `esUltima` es falsa en los índices 0 a 3 y verdadera en el 4; `siguiente` tras responder la quinta pone `terminada` a verdadero y sin más avance; con la partida terminada `responder` y `siguiente` no cambian nada; jugando una partida entera con todas acertadas los aciertos son 5, con todas falladas son 0, y con tres acertadas son 3. En la pantalla: en la quinta adivinanza el botón dice "Ver resultado" en lugar de "Siguiente"; al pulsarlo aparecen `icono-resultado`, "Has acertado 5 de 5" (o el número que corresponda) y el mensaje según la puntuación (5, 3 y 0 aciertos), y los botones "Jugar otra vez" (con `icono-jugar-otra-vez`) y "Volver al inicio"; ya no se ven las respuestas; `avisarPartida` se llama con `true` al abrir y con `false` al responder la quinta; "Jugar otra vez" empieza una partida nueva en "Adivinanza 1 de 5", con 0 aciertos y sin mensajes anteriores, y llama otra vez a `avisarPartida(true)`; dentro de `MarcoActividad`, "Volver al inicio" en el resultado vuelve a la lista sin pedir confirmación

### Implementación de la historia 2

- [ ] T016 [US2] Añadir `esUltima(partida)` a `src/actividades/adivinanzas/juego.ts` y hacer que `siguiente` ponga `terminada` a verdadero tras responder la quinta y que `responder` y `siguiente` no hagan nada con la partida terminada, según las garantías de [contracts/adivinanzas.md](contracts/adivinanzas.md) (depende de T015)
- [ ] T017 [P] [US2] Crear `src/actividades/adivinanzas/Resultado.tsx`: icono `party-popper` grande (`icono-resultado`), el texto "Has acertado N de 5", el mensaje final según los aciertos (`mensajeFinal`) y un `BotonGrande` "Jugar otra vez" (icono `refresh`, `idIcono` `icono-jugar-otra-vez`). El botón "Volver al inicio" no se pinta aquí: lo pone el marco
- [ ] T018 [US2] Cambiar `Adivinanza.tsx` para que en la quinta el botón diga "Ver resultado" con icono `flag-checkered`, y `Adivinanzas.tsx` para que muestre `Resultado` cuando la partida está terminada, llame a `avisarPartida(false)` en el momento en que se responde la quinta adivinanza y que "Jugar otra vez" cree una partida nueva con `crearPartida()` y llame a `avisarPartida(true)` (depende de T016, T017)
- [ ] T019 [US2] Ejecutar `npm test` y `npm run typecheck`: las pruebas de T015 deben pasar

**Punto de control**: Las dos historias funcionan; la actividad está completa.

---

## Fase 5: Remate

- [ ] T020 [P] Ampliar `tests/textos.test.tsx`, siguiendo su estilo, para comprobar los textos fijos de "Adivinanzas" (con tildes y signos de apertura), que `mensajeFinal` da el mensaje correcto para 0, 2, 3, 4 y 5 aciertos, y que cada botón de acción ("Siguiente", "Ver resultado" y "Jugar otra vez") lleva icono y texto
- [ ] T021 [P] Actualizar `CLAUDE.md`: añadir `src/actividades/adivinanzas/` (con `adivinanzas.ts` y `juego.ts`) a la sección "Estructura" y cambiar la nota "Las actividades reales por ahora son…" para incluir "Adivinanzas" junto a "Parejas", "Forma la palabra" y "Sopa de letras"
- [ ] T022 Ejecutar `npm test` y `npm run typecheck` completos: todo debe pasar, también las pruebas de las funcionalidades 001 a 004 (depende de T020)
- [ ] T023 Hacer la comprobación manual de los 19 pasos de [quickstart.md](quickstart.md) en un móvil con una persona mayor, incluidos esperar un minuto sin tocar nada (paso 3), jugar 10 partidas seguidas (paso 12), salir sin aviso desde el resultado (paso 16), revisar que las adivinanzas son conocidas y tienen una sola respuesta clara (paso 18) y el modo avión (paso 19). Comprobar sobre todo que el texto de las adivinanzas más largas, las tres respuestas y el botón caben con desplazamiento cómodo en un móvil pequeño. **Requiere a una persona y un móvil: no la puede hacer el agente; déjala pendiente y avísalo.**

---

## Dependencias y orden de ejecución

### Entre fases

- **Fase 1** (T001): sin dependencias.
- **Fase 2** (T002 a T006): depende de la fase 1. Bloquea todas las historias.
- **Historia 1** (T007 a T014): depende de la fase 2. Es el MVP.
- **Historia 2** (T015 a T019): depende de la historia 1 (amplía `juego.ts`, `Adivinanza.tsx` y `Adivinanzas.tsx`).
- **Remate** (T020 a T023): depende de las dos historias.

### Dentro de cada historia

- Las pruebas se escriben primero y deben fallar antes de implementar.
- Reglas (`juego.ts`) antes que pantallas; los componentes pequeños (`Respuesta`, `Resultado`) antes que `Adivinanza.tsx` y `Adivinanzas.tsx`.

### Oportunidades de paralelismo

- Fase 2: T003 y T004 a la vez (archivos de pruebas distintos); T005 puede empezar en cuanto exista T003.
- Historia 1: T007 y T008 a la vez; T010 a la vez que T009.
- Historia 2: T017 a la vez que T016.
- Remate: T020 y T021 a la vez.

Las historias no se pueden hacer en paralelo entre sí porque comparten `juego.ts`, `Adivinanzas.tsx` y los archivos de pruebas.

### Ejemplo de paralelismo: Historia 1

```text
# Pruebas de la historia 1 a la vez:
T007 tests/adivinanzas-juego.test.tsx
T008 tests/adivinanzas-pantalla.test.tsx

# Reglas y componente a la vez:
T009 src/actividades/adivinanzas/juego.ts
T010 src/actividades/adivinanzas/Respuesta.tsx
```

---

## Estrategia de implementación

### Primero el MVP (solo historia 1)

1. Fase 1 y fase 2.
2. Historia 1: se puede jugar adivinanza tras adivinanza, aunque sin final ni resultado.
3. **Parar y comprobar** con los pasos 1 a 7 del quickstart.

### Entrega incremental

1. Historia 2: la partida tiene final, resultado "X de 5" y "Jugar otra vez".
2. Remate y comprobación manual con personas mayores.

## Notas

- `[P]` = archivos distintos, sin dependencias pendientes.
- Marca cada tarea como hecha al terminarla.
- Los textos de la interfaz van en `src/textos.ts`. Los textos de las adivinanzas son datos de la actividad y viven en `adivinanzas.ts`, como las palabras de "Forma la palabra" (`palabras.ts`) y las sopas (`sopas.ts`); todos en español de España y con tildes. Todos los tamaños y colores salen de `src/tema.ts`.
- Nada fuera de la spec: sin escribir la respuesta, lectura en voz alta, pistas, ranking ni guardado.
- Cada botón de acción y cada mensaje importante va con icono y texto.
