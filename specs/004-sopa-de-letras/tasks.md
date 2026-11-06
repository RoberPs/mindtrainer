# Tareas: Actividad "Sopa de letras"

**Entrada**: Documentos de diseño en `specs/004-sopa-de-letras/`

**Requisitos previos**: [plan.md](plan.md), [spec.md](spec.md), [research.md](research.md), [data-model.md](data-model.md), [contracts/sopa-de-letras.md](contracts/sopa-de-letras.md), [quickstart.md](quickstart.md)

**Pruebas**: Se incluyen porque la constitución (principio VIII) las exige: una funcionalidad no está terminada hasta que sus pruebas pasan. Solo pruebas básicas y funcionales: reglas de marcado, palabra encontrada y no encontrada, línea no recta, palabra ya encontrada, palabras que faltan, intentos y final de partida, más la comprobación de la lista de sopas. Las pruebas de cada historia se escriben antes que el código y deben fallar al principio.

**Formato**: `- [ ] T### [P?] [Historia?] Descripción con ruta de archivo`. `[P]` = se puede hacer en paralelo (archivos distintos, sin dependencias pendientes).

**Nota sobre el orden**: La historia 1 ya deja jugar una sopa: marcar palabras, resaltarlas y verlas tachadas en la lista (con las no encontradas ocultas como "???"). La historia 2 añade el final de partida (felicitación, intentos, "Jugar otra vez" y el aviso de fin al marco). La historia 3 añade el aviso "Te faltan N palabras". Las tres comparten `juego.ts`, `ListaPalabras.tsx`, `SopaDeLetras.tsx` y los archivos de pruebas, así que se hacen en orden.

**Convenciones de pantalla** (para que las pruebas y las pantallas coincidan): cada casilla tiene `testID` `celda-{fila}-{columna}` (por ejemplo `celda-0-3`); la lista tiene filas `palabra-0`, `palabra-1` y `palabra-2`; los iconos de mensaje son `icono-invitar`, `icono-acierto`, `icono-fallo`, `icono-no-recta`, `icono-faltan`, `icono-felicitacion` e `icono-jugar-otra-vez`. Los iconos se buscan en las pruebas con `getByTestId(..., { includeHiddenElements: true })`.

## Fase 1: Preparación

- [X] T001 Comprobar que `npm test` y `npm run typecheck` pasan en la rama `004-sopa-de-letras` antes de tocar nada, para saber que cualquier fallo posterior es de esta funcionalidad

---

## Fase 2: Base común (bloquea todas las historias)

**⚠️ CRÍTICO**: Ninguna historia puede empezar hasta terminar esta fase.

- [X] T002 Añadir a `src/textos.ts` un bloque `textosSopa` con todos los textos de la actividad en español de España, con tildes y signos de apertura: nombre "Sopa de letras", descripción "Encuentra las palabras escondidas", etiqueta fija junto a la palabra de referencia "Busca 3 palabras relacionadas con:", invitación "Ahora toca la última letra de la palabra", acierto "¡Muy bien! Has encontrado una palabra", fallo "Esa no es una de las palabras. Inténtalo otra vez", línea no recta "Marca una línea recta, en horizontal o en vertical", palabra oculta "???", `faltan(n)` ("Te faltan 3 palabras", "Te faltan 2 palabras", "Te falta 1 palabra" y "No te falta ninguna palabra"), felicitación "¡Enhorabuena! Has encontrado las 3 palabras", `intentosNecesitados(n)` ("Has necesitado N intentos") y "Jugar otra vez"; y una función `celda(letra, fila, columna)` para el nombre accesible de cada casilla (por ejemplo "Letra N, fila 1, columna 1")
- [X] T003 [P] Escribir las pruebas de la lista de sopas en `tests/sopa-sopas.test.tsx`: hay 5 sopas o más; los `id` son distintos; cada cuadrícula tiene 5 filas de 6 letras, solo mayúsculas de la "A" a la "Z" y "Ñ"; la referencia y las palabras están en mayúsculas y sin tildes; hay exactamente 3 palabras buscadas distintas, de 4 a 6 letras, y ninguna es igual a la referencia; cada palabra aparece exactamente una vez leyendo las filas de izquierda a derecha o las columnas de arriba abajo (se cuentan todas las apariciones, también las que se solapan), y ninguna aparece leída al revés
- [X] T004 [P] Escribir en `tests/sopa-juego.test.tsx` las pruebas de `crearPartida`: usa una sopa de la lista; nunca devuelve la sopa del `id` anterior (probado con todos los `id` y con varios azares, incluido un azar constante); sin `id` anterior sirve cualquier sopa; con dos azares distintos puede salir otra sopa; la partida empieza sin palabras encontradas, sin marca, con 0 intentos y aviso `ninguno`. Crear también el archivo nuevo `tests/ayudas-sopa.ts` (aparte de `tests/ayudas.tsx`, para no romper las pruebas existentes mientras `juego.ts` no exista; solo importa tipos de `juego.ts`) con las ayudas que usan las pruebas de las historias, para que no dependan del contenido de `sopas.ts`: `sopaDePrueba`, una sopa propia de 5 filas por 6 columnas con referencia "PRUEBA" y tres palabras, dos de ellas cruzadas (`LLUVIA` en horizontal en la fila 0 y `ARENA` en vertical en la columna 5, que comparten la casilla `0,5`) y `OLAS` en horizontal en la fila 3, con el resto de casillas rellenas con letras que no forman otras palabras (fila 1 `BBBBBR`, fila 2 `CCCCCE`, fila 3 `OLASZN`, fila 4 `DDDDDA`); `partidaDePrueba()`, que devuelve una `Partida` nueva con esa sopa; y `casillasDe(sopa, palabra)`, que busca la palabra en la cuadrícula de cualquier sopa (izquierda a derecha o arriba abajo) y devuelve su casilla inicial y final, para marcarla sin conocer el contenido
- [X] T005 Crear `src/actividades/sopa-de-letras/sopas.ts` con la lista exportada de al menos 5 sopas (la propuesta de [research.md](research.md): NUBE, MAR, COCINA, HUERTO y COSTURA, con tres palabras cada una), cada una con `id`, `referencia`, `palabras` y `cuadricula` (5 textos de 6 letras). Cada palabra va una sola vez, en horizontal (de izquierda a derecha) o en vertical (de arriba abajo), y las demás casillas se rellenan con letras que no formen otras palabras. **Revisión a mano obligatoria (RF-013)**: leer cada cuadrícula en horizontal y vertical, y descartar o cambiar las letras de relleno si aparece otra palabra relacionada con la referencia que se pueda marcar y no se reconozca. Ejecutar `tests/sopa-sopas.test.tsx` hasta que pase (depende de T003)
- [X] T006 Crear en `src/actividades/sopa-de-letras/juego.ts` los tipos `Casilla` (`fila`, `columna`), `Encontrada` (`palabra`, `casillas`), `Aviso` (`ninguno`, `encontrada`, `incorrecta`, `norecta`) y `Partida` (`sopa`, `encontradas`, `marca`, `intentos`, `aviso`) y la función `crearPartida(idAnterior?, azar = Math.random)`: elige al azar una sopa de la lista cuyo `id` sea distinto del anterior, según [data-model.md](data-model.md) y [contracts/sopa-de-letras.md](contracts/sopa-de-letras.md). Ejecutar las pruebas de `crearPartida` de T004 (depende de T004, T005)

**Punto de control**: Base lista; las historias pueden empezar.

---

## Fase 3: Historia 1 - Encontrar una palabra marcando su primera y su última letra (Prioridad: P1) 🎯 MVP

**Objetivo**: La persona ve la palabra de referencia, la cuadrícula y la lista, marca una palabra tocando su primera y su última letra y ve si es una de las buscadas (resaltada y tachada en la lista) o un mensaje amable.

**Prueba independiente**: Abrir "Sopa de letras" desde el inicio y marcar palabras buenas y malas (pasos 1 a 6, 8, 10 y 11 del [quickstart.md](quickstart.md)).

### Pruebas de la historia 1

- [X] T007 [P] [US1] Ampliar `tests/sopa-juego.test.tsx` con las reglas de `tocarCasilla` sobre `partidaDePrueba()` de `tests/ayudas-sopa.ts` (sin depender de `sopas.ts`): la primera casilla tocada queda como `marca`; tocar la misma otra vez quita la marca, sin aviso y sin intento; dos casillas que no comparten fila ni columna dan aviso `norecta`, quitan la marca y no suman intento; una palabra buscada en horizontal marcada de la primera a la última letra pasa a `encontradas` con sus casillas, aviso `encontrada`, marca fuera y un intento más; lo mismo con una palabra en vertical; dos casillas de una misma fila o columna que no forman ninguna palabra dan aviso `incorrecta`, marca fuera y un intento más; una palabra buscada marcada al revés (de la última a la primera letra) cuenta como `incorrecta`; marcar de nuevo una palabra ya encontrada no cambia nada (ni encontradas, ni intentos, ni aviso); se pueden encontrar las 3 palabras en cualquier orden; la casilla compartida `0,5` (final de `LLUVIA` y principio de `ARENA`) puede marcarse en cualquiera de las dos palabras, y tras encontrar ambas las dos conservan sus casillas; la partida recibida no se modifica
- [X] T008 [P] [US1] Escribir en `tests/sopa-pantalla.test.tsx` las pruebas de la pantalla con `Math.random` fijado a 0 (la sopa que se muestra es `crearPartida(undefined, () => 0).sopa`; las casillas de cada palabra se localizan con `casillasDe` de `tests/ayudas-sopa.ts`, sin escribir coordenadas a mano): "Sopa de letras" aparece en la lista de inicio con su icono, nombre y descripción; al abrirla se ven la palabra de referencia, la etiqueta "Busca 3 palabras relacionadas con:", 30 casillas (`celda-0-0` a `celda-4-5`) y la lista con tres "???"; tocar una letra muestra la invitación con su icono (`icono-invitar`); tocar la misma otra vez la quita sin error; marcar dos letras que no están en línea recta muestra el mensaje amable con `icono-no-recta` y quita la marca; marcar una línea recta que no es palabra muestra el fallo con `icono-fallo`; marcar bien una palabra muestra el acierto con `icono-acierto`, la palabra aparece escrita en la lista y las casillas quedan resaltadas; marcar de nuevo esa palabra no muestra ningún mensaje de error y no cambia la lista

### Implementación de la historia 1

- [X] T009 [US1] Añadir `tocarCasilla(partida, casilla)` a `src/actividades/sopa-de-letras/juego.ts` como función pura que devuelve una partida nueva (o la misma si no tiene efecto), con las transiciones de [data-model.md](data-model.md): lee el texto de la línea en el orden del toque, sea cual sea el sentido, y lo compara con las palabras buscadas aún no encontradas y con las ya encontradas (depende de T006, T007)
- [X] T010 [P] [US1] Crear `src/actividades/sopa-de-letras/Cuadricula.tsx`: las 30 casillas en 5 filas de 6, cada una con `testID` `celda-{fila}-{columna}`, `accessibilityRole="button"`, `accessibilityLabel` de `textosSopa.celda`, letra de 28 puntos (`tema.letra.titulo`), alto de al menos 64 (`tema.boton.altoMinimo`) y ancho repartido entre las 6 columnas. Estados distinguibles sin depender solo del color: normal (borde fino y fondo claro), primera letra marcada (borde muy grueso) y palabra encontrada (fondo sólido `tema.colores.acierto` con letra `tema.colores.textoSobrePrimario`). Recibe la partida y un `alTocar(casilla)`
- [X] T011 [P] [US1] Crear `src/actividades/sopa-de-letras/ListaPalabras.tsx`: las 3 palabras de la sopa en filas `palabra-0` a `palabra-2`; las encontradas escritas y tachadas con icono `checkbox-marked-circle`; las no encontradas como "???" con icono `help-circle-outline`. Nunca escribe una palabra sin encontrar, ni siquiera en el nombre accesible
- [X] T012 [US1] Crear el contenido en `src/actividades/sopa-de-letras/SopaDeLetras.tsx`: guarda la partida en `useState`, la crea al abrirse y llama a `avisarPartida(true)` al abrirse. De arriba abajo, dentro de un `ScrollView`: la etiqueta y la palabra de referencia grande, `Cuadricula`, el mensaje con icono grande cuando toca y `ListaPalabras`. Mensaje: con marca, la invitación (`gesture-tap`, `icono-invitar`); si no, según el aviso: `emoticon-happy` y `icono-acierto`, `emoticon-neutral` y `icono-fallo`, o `vector-line` y `icono-no-recta`. Conecta la cuadrícula con `tocarCasilla` (depende de T009, T010, T011)
- [X] T013 [US1] Añadir la actividad a `src/actividades/registro.ts` tras "Forma la palabra", con identificador `sopa-de-letras`, icono `{ nombre: 'grid' }`, nombre y descripción de `src/textos.ts` y `Contenido: SopaDeLetras` (depende de T012)
- [X] T014 [US1] Ejecutar `npm test` y `npm run typecheck`: T007 y T008 deben pasar, sin romper las pruebas de las funcionalidades 001, 002 y 003

**Punto de control**: Se puede jugar una sopa marcando palabras buenas y malas; falta el final de partida y el aviso de cuántas faltan.

---

## Fase 4: Historia 2 - Terminar la sopa y ver cuántos intentos he necesitado (Prioridad: P1)

**Objetivo**: Al encontrar las 3 palabras, la persona ve la felicitación con los intentos, "Jugar otra vez" y "Volver al inicio", con la cuadrícula aún visible.

**Prueba independiente**: Encontrar las 3 palabras, con y sin fallos, y comprobar el mensaje, los intentos y los botones (pasos 13 a 16, 18 y 19 del [quickstart.md](quickstart.md)).

### Pruebas de la historia 2

- [X] T015 [US2] Ampliar `tests/sopa-juego.test.tsx` y `tests/sopa-pantalla.test.tsx`: `haTerminado` es falso con 0, 1 y 2 palabras y verdadero con 3; con la partida terminada `tocarCasilla` no cambia nada; sin fallos los intentos son 3; con dos fallos (línea recta que no es palabra) son 5; los toques ignorados (línea no recta, quitar marca, palabra ya encontrada) no suman. En la pantalla: al encontrar la tercera aparece "¡Enhorabuena! Has encontrado las 3 palabras" con `icono-felicitacion`, "Has necesitado 3 intentos" (o el número que corresponda tras fallar), los botones "Jugar otra vez" (con `icono-jugar-otra-vez`) y "Volver al inicio", y la cuadrícula sigue visible con las 3 palabras resaltadas; tocar una casilla tras terminar no cambia nada; `avisarPartida` se llama con `true` al abrir y con `false` al encontrar la tercera palabra; "Jugar otra vez" empieza una partida con otra sopa, sin palabras encontradas, con 0 intentos y llama otra vez a `avisarPartida(true)`; dentro de `MarcoActividad`, "Volver al inicio" en la felicitación vuelve a la lista sin pedir confirmación (depende de T014)

### Implementación de la historia 2

- [X] T016 [US2] Añadir `haTerminado(partida)` a `src/actividades/sopa-de-letras/juego.ts` y hacer que `tocarCasilla` no haga nada cuando la partida ha terminado, según las garantías de [contracts/sopa-de-letras.md](contracts/sopa-de-letras.md) (depende de T015)
- [X] T017 [P] [US2] Crear `src/actividades/sopa-de-letras/Felicitacion.tsx`: icono `party-popper` grande (`icono-felicitacion`), el texto "¡Enhorabuena! Has encontrado las 3 palabras", "Has necesitado N intentos" y un `BotonGrande` "Jugar otra vez" (icono `refresh`, `idIcono` `icono-jugar-otra-vez`). El botón "Volver al inicio" no se pinta aquí: lo pone el marco
- [X] T018 [US2] Cambiar `SopaDeLetras.tsx` para que, al terminar la partida, la cuadrícula y la lista sigan visibles y debajo se muestre `Felicitacion` en lugar del mensaje de aviso; llamar a `avisarPartida(false)` en el momento en que se encuentra la tercera palabra; y hacer que "Jugar otra vez" cree una partida nueva con `crearPartida(partida.sopa.id)` y llame a `avisarPartida(true)` (depende de T016, T017)
- [X] T019 [US2] Ejecutar `npm test` y `npm run typecheck`: las pruebas de T015 deben pasar

**Punto de control**: Las historias 1 y 2 funcionan; la partida tiene principio y final.

---

## Fase 5: Historia 3 - Saber cuántas palabras me faltan (Prioridad: P2)

**Objetivo**: La persona ve en todo momento cuántas palabras le faltan, sin que se le diga cuáles son.

**Prueba independiente**: Encontrar las palabras una a una y comprobar que el aviso baja y que nunca se ve una palabra sin encontrar (pasos 9 y 12 del [quickstart.md](quickstart.md)).

### Pruebas de la historia 3

- [X] T020 [US3] Ampliar `tests/sopa-juego.test.tsx` y `tests/sopa-pantalla.test.tsx`: `faltan` da 3, 2, 1 y 0 según las palabras encontradas; en la pantalla se ve "Te faltan 3 palabras" al empezar, "Te faltan 2 palabras" tras la primera, "Te falta 1 palabra" (singular) tras la segunda y "No te falta ninguna palabra" al terminar, con `icono-faltan`; en ningún momento aparece escrita en pantalla una palabra sin encontrar (se buscan las 3 palabras de la sopa mostrada, la de `crearPartida(undefined, () => 0).sopa`, con `queryByText` y solo aparecen las ya encontradas) (depende de T019)

### Implementación de la historia 3

- [X] T021 [US3] Añadir `faltan(partida)` a `src/actividades/sopa-de-letras/juego.ts` como función pura: 3 menos las palabras encontradas (depende de T020)
- [X] T022 [US3] Añadir a `ListaPalabras.tsx` el aviso `textosSopa.faltan(n)` con icono `magnify` grande (`icono-faltan`), bien escrito en singular y plural, y pasarle `faltan(partida)` desde `SopaDeLetras.tsx` (depende de T021)
- [X] T023 [US3] Ejecutar `npm test` y `npm run typecheck`: las pruebas de T020 deben pasar

**Punto de control**: Las tres historias funcionan; la actividad está completa.

---

## Fase 6: Remate

- [X] T024 [P] Ampliar `tests/textos.test.tsx`, siguiendo su estilo, para comprobar los textos fijos de "Sopa de letras" (con tildes y signos de apertura) y que cada botón de acción ("Jugar otra vez") lleva icono y texto; las casillas de la cuadrícula son solo texto
- [X] T025 [P] Actualizar `CLAUDE.md`: añadir `src/actividades/sopa-de-letras/` (con `sopas.ts` y `juego.ts`) a la sección "Estructura" y cambiar la nota "Las actividades reales por ahora son…" para incluir "Sopa de letras" junto a "Parejas" y "Forma la palabra"
- [X] T026 Ejecutar `npm test` y `npm run typecheck` completos: todo debe pasar, también las pruebas de las funcionalidades 001, 002 y 003 (depende de T024)
- [ ] T027 Hacer la comprobación manual de los 21 pasos de [quickstart.md](quickstart.md) en un móvil con una persona mayor, incluidos esperar un minuto sin tocar nada (paso 7), jugar 10 partidas seguidas (paso 17), salir sin aviso tras encontrar la tercera palabra (paso 19) y el modo avión (paso 21). Comprobar sobre todo que las 6 columnas caben con letra de 22 puntos o más en un móvil pequeño, y que una persona repasa las 5 cuadrículas buscando otras palabras relacionadas que se pudieran marcar sin reconocerse (RF-013). **Requiere a una persona y un móvil: no la puede hacer el agente; déjala pendiente y avísalo.**

---

## Dependencias y orden de ejecución

### Entre fases

- **Fase 1** (T001): sin dependencias.
- **Fase 2** (T002 a T006): depende de la fase 1. Bloquea todas las historias.
- **Historia 1** (T007 a T014): depende de la fase 2. Es el MVP.
- **Historia 2** (T015 a T019): depende de la historia 1 (amplía `juego.ts` y `SopaDeLetras.tsx`).
- **Historia 3** (T020 a T023): depende de la historia 2.
- **Remate** (T024 a T027): depende de las tres historias.

### Dentro de cada historia

- Las pruebas se escriben primero y deben fallar antes de implementar.
- Reglas (`juego.ts`) antes que pantallas; los componentes pequeños (`Cuadricula`, `ListaPalabras`, `Felicitacion`) antes que `SopaDeLetras.tsx`.

### Oportunidades de paralelismo

- Fase 2: T003 y T004 a la vez (archivos de pruebas distintos); T005 puede empezar en cuanto exista T003.
- Historia 1: T007 y T008 a la vez; T010 y T011 a la vez que T009.
- Historia 2: T017 a la vez que T016.
- Remate: T024 y T025 a la vez.

Las historias no se pueden hacer en paralelo entre sí porque comparten `juego.ts`, `ListaPalabras.tsx`, `SopaDeLetras.tsx` y los archivos de pruebas.

### Ejemplo de paralelismo: Historia 1

```text
# Pruebas de la historia 1 a la vez:
T007 tests/sopa-juego.test.tsx
T008 tests/sopa-pantalla.test.tsx

# Reglas y componentes a la vez:
T009 src/actividades/sopa-de-letras/juego.ts
T010 src/actividades/sopa-de-letras/Cuadricula.tsx
T011 src/actividades/sopa-de-letras/ListaPalabras.tsx
```

---

## Estrategia de implementación

### Primero el MVP (solo historia 1)

1. Fase 1 y fase 2.
2. Historia 1: se pueden marcar palabras y verlas resaltadas y tachadas, aunque sin final de partida ni aviso de cuántas faltan.
3. **Parar y comprobar** con los pasos 1 a 6, 8, 10 y 11 del quickstart.

### Entrega incremental

1. Historia 2: la partida tiene final, felicitación con intentos y "Jugar otra vez".
2. Historia 3: aviso de cuántas palabras faltan.
3. Remate y comprobación manual con personas mayores.

## Notas

- `[P]` = archivos distintos, sin dependencias pendientes.
- Marca cada tarea como hecha al terminarla.
- Todos los textos van en `src/textos.ts`; todos los tamaños y colores salen de `src/tema.ts`.
- Nada fuera de la spec: sin pistas, niveles, ranking, guardado, diagonales ni generador de sopas.
- Cada botón de acción y cada mensaje importante va con icono y texto; las casillas de la cuadrícula son solo texto.
