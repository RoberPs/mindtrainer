# Tareas: Actividad "Diferencias"

**Entrada**: Documentos de diseño en `specs/006-diferencias/`

**Requisitos previos**: [plan.md](plan.md), [spec.md](spec.md), [research.md](research.md), [data-model.md](data-model.md), [contracts/diferencias.md](contracts/diferencias.md), [quickstart.md](quickstart.md)

**Pruebas**: Se incluyen porque la constitución (principio VIII) las exige: una funcionalidad no está terminada hasta que sus pruebas pasan. Solo pruebas básicas y funcionales: acierto de una diferencia (marcada en los dos dibujos), toque fuera sin penalización, toque sobre una diferencia ya marcada sin efecto, aviso de las que faltan, recuento de toques y final de partida con "Jugar otra vez", más la comprobación de la escena (exactamente 3 diferencias bien puestas). Las pruebas de cada historia se escriben antes que el código y deben fallar al principio.

**Formato**: `- [ ] T### [P?] [Historia?] Descripción con ruta de archivo`. `[P]` = se puede hacer en paralelo (archivos distintos, sin dependencias pendientes).

**Nota sobre el orden**: La historia 1 ya deja jugar: se tocan diferencias, se marcan con círculo en los dos dibujos y los fallos dan un mensaje amable; las reglas de `tocar` se escriben completas (también el paso a `terminada` con la tercera). La historia 2 añade la pantalla de felicitación con los toques y "Jugar otra vez". La historia 3 añade el aviso de cuántas faltan. Las tres comparten `juego.ts`, `Diferencias.tsx` y los archivos de pruebas, así que se hacen en orden.

**Convenciones de pantalla** (para que las pruebas y las pantallas coincidan): los dibujos tienen `testID` `dibujo-arriba` y `dibujo-abajo`; el de abajo es el que recibe los toques y mide su tamaño con `onLayout`. Los círculos son `circulo-arriba-<id>` y `circulo-abajo-<id>`. Los iconos junto a textos son `icono-faltan`, `icono-fallo`, `icono-felicitacion` e `icono-jugar-otra-vez`. En las pruebas, un toque se simula así: primero se envía el evento `layout` al `dibujo-abajo` con un tamaño conocido (por ejemplo 300 × 200) y después se pulsa con `locationX = x * 300` y `locationY = y * 200`. Los iconos se buscan con `getByTestId(..., { includeHiddenElements: true })`. Las zonas y los puntos que usan las pruebas salen de `escena.ts`, sin escribir coordenadas a mano en las pruebas.

## Fase 1: Preparación

- [X] T001 Comprobar que `npm test` y `npm run typecheck` pasan en la rama `006-diferencias` antes de tocar nada, para saber que cualquier fallo posterior es de esta funcionalidad

---

## Fase 2: Base común (bloquea todas las historias)

**⚠️ CRÍTICO**: Ninguna historia puede empezar hasta terminar esta fase.

- [X] T002 Añadir a `src/textos.ts` un bloque `textosDiferencias` con todos los textos de la actividad en español de España, con tildes y signos de apertura: nombre "Diferencias", descripción "Encuentra las 3 diferencias entre dos dibujos", instrucción "Toca en el dibujo de abajo lo que sea distinto", rótulos "Dibujo de arriba" y "Dibujo de abajo", `faltan(n)` ("Te faltan N diferencias", y "Te falta 1 diferencia" cuando n es 1), mensaje de fallo "Ahí no hay ninguna diferencia. ¡Sigue buscando!", felicitación "¡Enhorabuena! Has encontrado las 3 diferencias", `toques(n)` ("Has necesitado N toques") y "Jugar otra vez"
- [X] T003 [P] Añadir a `src/tema.ts` el color `marca` (rojo oscuro, por ejemplo `#B00020`, con contraste de al menos 7 a 1 sobre blanco; comprobar el cálculo) para los círculos, y el grosor `circulo` de unos 6 puntos
- [X] T004 [P] Escribir las pruebas de la escena en `tests/diferencias-escena.test.tsx`: la escena tiene `dibujoArriba`, `dibujoAbajo` y `diferencias`; los `id` de los elementos no se repiten dentro de cada dibujo; comparando los dos dibujos por `id`, difieren en exactamente 3 elementos (uno solo en el de arriba, uno con otro `icono` y uno solo en el de abajo); hay exactamente 3 diferencias con `id` distintos; cada zona está dentro del dibujo (`x` e `y` entre 0 y 1, y `x + ancho` e `y + alto` como mucho 1); cada zona contiene el centro del elemento que difiere; las zonas no se solapan entre sí; cada zona mide al menos 0,18 de ancho y 0,27 de alto (unos 44 puntos en un dibujo de 250 de ancho y 165 de alto); los textos de la actividad existen y los nombres de los iconos son cadenas no vacías. Crear también el archivo nuevo `tests/ayudas-diferencias.ts` con las ayudas que usan las pruebas de reglas y de pantalla sin escribir coordenadas a mano: `centroDe(id)` (centro de la zona de una diferencia), `puntoVacio()` (un punto que no cae en ninguna zona, elegido entre varios candidatos y comprobado) y `tocarAbajo(x, y)` para la pantalla (envía `layout` y pulsa con `locationX` y `locationY`)
- [X] T005 Crear `src/actividades/diferencias/escena.ts` con los tipos `Elemento`, `Zona` y `Diferencia`, las listas exportadas `dibujoArriba` y `dibujoAbajo` y las 3 `diferencias`, según [data-model.md](data-model.md) y la propuesta de [research.md](research.md): reloj que falta, bebida que cambia de taza a botella y gato que sobra, más al menos 4 elementos iguales (ventana, lámpara, sillón y planta) con iconos de MaterialCommunityIcons que existan y colores de alto contraste. **Revisión obligatoria por una persona (RF-012), que queda pendiente dentro de T025**: mirar los dos dibujos en la app y confirmar que los iconos se reconocen, que las 3 diferencias se ven con claridad (ni diminutas ni ambiguas), que no hay otras diferencias sin querer y que los dos dibujos caben a la vez en un móvil pequeño; cambiar lo que no convenza. Ejecutar `tests/diferencias-escena.test.tsx` hasta que pase (depende de T004)
- [X] T006 [P] Escribir en `tests/diferencias-juego.test.tsx` las pruebas de `crearPartida`: devuelve `encontradas` vacía, 0 toques, sin mensaje de fallo y sin terminar; dos partidas creadas no comparten la lista de encontradas (modificar una no cambia la otra) (depende de T004 por las ayudas)
- [X] T007 Crear en `src/actividades/diferencias/juego.ts` el tipo `Partida` (`encontradas`, `toques`, `fallo`, `terminada`) y la función `crearPartida()`, según [data-model.md](data-model.md) y [contracts/diferencias.md](contracts/diferencias.md). Ejecutar las pruebas de `crearPartida` de T006 (depende de T005, T006)

**Punto de control**: Base lista; las historias pueden empezar.

---

## Fase 3: Historia 1 - Tocar en el segundo dibujo donde veo una diferencia (Prioridad: P1) 🎯 MVP

**Objetivo**: La persona ve los dos dibujos, toca el de abajo, y si acierta la diferencia se marca con un círculo en los dos dibujos; si falla ve un mensaje amable y no pasa nada más.

**Prueba independiente**: Abrir "Diferencias" desde el inicio, tocar una diferencia y tocar un lugar sin diferencia (pasos 1 a 8 del [quickstart.md](quickstart.md)).

### Pruebas de la historia 1

- [X] T008 [P] [US1] Ampliar `tests/diferencias-juego.test.tsx` con las reglas de `tocar` usando las ayudas de `tests/ayudas-diferencias.ts`: tocar el centro de una zona no encontrada añade esa diferencia a `encontradas`, suma exactamente un toque, pone `fallo` a falso y no termina la partida mientras falten diferencias; tocar un punto de `puntoVacio()` suma un toque, pone `fallo` a verdadero y no cambia `encontradas`; tras un fallo, tocar una diferencia la marca con normalidad y quita `fallo`; tocar una diferencia ya encontrada devuelve la misma partida (mismo objeto, sin toque ni cambio de `fallo`); tocar los 4 bordes exactos de una zona cuenta como acierto; encontrar las 3 pone `terminada` a verdadero; con la partida terminada `tocar` no cambia nada; la partida recibida no se modifica
- [X] T009 [P] [US1] Escribir en `tests/diferencias-pantalla.test.tsx` las pruebas de la pantalla (la escena y las zonas salen de `escena.ts`): "Diferencias" aparece en la lista de inicio con su icono, nombre y descripción; al abrirla se ven la instrucción, los dos dibujos (`dibujo-arriba` y `dibujo-abajo`) con sus rótulos y ningún círculo; tocar el centro de una diferencia en el dibujo de abajo muestra `circulo-abajo-<id>` y `circulo-arriba-<id>`; tocar un punto sin diferencia muestra el mensaje amable con `icono-fallo` y no aparece ningún círculo; el dibujo de arriba no reacciona a toques (pulsar en él sobre una diferencia no marca nada); tocar de nuevo una diferencia marcada no cambia nada (el mensaje de fallo anterior, si lo había, sigue igual y no sale ninguno nuevo); tras un fallo, acertar una diferencia quita el mensaje de fallo y los dibujos no cambian de sitio (depende de T007)

### Implementación de la historia 1

- [X] T010 [US1] Añadir `tocar(partida, x, y)` a `src/actividades/diferencias/juego.ts` como función pura que devuelve una partida nueva (o la misma si no tiene efecto), con las cuatro filas de la tabla de [data-model.md](data-model.md): acierto, fallo, ya encontrada y partida terminada. Una zona contiene el punto si `x` está entre `zona.x` y `zona.x + zona.ancho` e `y` entre `zona.y` y `zona.y + zona.alto`, bordes incluidos (depende de T007, T008)
- [X] T011 [P] [US1] Crear `src/actividades/diferencias/Dibujo.tsx`: pinta un dibujo (lista de elementos) en un recuadro de `ancho` × `alto` recibidos, con cada elemento como `Icono` en posición absoluta según sus coordenadas relativas, y encima un círculo (`View` con `borderRadius` muy grande, borde de `tema.grosor.circulo` y color `tema.colores.marca`) por cada diferencia encontrada, colocado sobre su zona. Recibe el nombre del lado (`arriba` o `abajo`) para los `testID` (`dibujo-<lado>`, `circulo-<lado>-<id>`) y, solo en el de abajo, una función `alTocar(x, y)` con coordenadas relativas: el recuadro es un `Pressable` con `onLayout` (guarda su tamaño medido) que convierte `locationX` y `locationY` en relativas dividiendo entre el tamaño medido y ignora el toque si el tamaño medido es 0; el de arriba no es pulsable. Todos los hijos del recuadro (iconos y círculos) llevan `pointerEvents="none"` para que el toque lo reciba siempre el recuadro y `locationX`/`locationY` sean relativos al dibujo y no a un icono. Los iconos son decorativos (`Icono` ya los oculta a la accesibilidad); el recuadro lleva `accessibilityLabel` con el rótulo ("Dibujo de arriba" o "Dibujo de abajo") (depende de T003, T005)
- [X] T012 [US1] Crear el contenido en `src/actividades/diferencias/Diferencias.tsx`: guarda la partida en `useState`, la crea al abrirse y llama a `avisarPartida(true)` al abrirse; calcula con `useWindowDimensions` el tamaño de cada dibujo (ancho disponible menos márgenes, y alto como la mitad de lo que queda tras reservar el hueco del marco, la instrucción, el aviso de las que faltan (que se pinta en la historia 3, pero su alto se reserva ya) y el mensaje de fallo, con proporción fija algo más ancha que alta y tomando el tamaño más pequeño); muestra de arriba abajo la instrucción, el rótulo y el dibujo de arriba, el rótulo y el dibujo de abajo, y un hueco de alto fijo para el mensaje de fallo (vacío si no hay fallo; con icono `emoticon-neutral` grande `icono-fallo` y el texto de fallo si lo hay), de modo que los dibujos no se muevan; conecta `Dibujo` con `tocar` pasando las `encontradas` a los dos dibujos (depende de T002, T010, T011)
- [X] T013 [US1] Añadir la actividad a `src/actividades/registro.ts` tras "Adivinanzas", con identificador `diferencias`, icono `{ nombre: 'compare' }` (comprobar que existe y es distinto de los demás), nombre y descripción de `src/textos.ts` y `Contenido: Diferencias` (depende de T012)
- [X] T014 [US1] Ejecutar `npm test` y `npm run typecheck`: T008 y T009 deben pasar, sin romper las pruebas de las funcionalidades 001 a 005

**Punto de control**: Se pueden encontrar diferencias y fallar sin penalización; falta la felicitación y el aviso de las que faltan.

---

## Fase 4: Historia 2 - Encontrar las 3 diferencias y ver la felicitación (Prioridad: P1)

**Objetivo**: Al marcar la tercera diferencia, la persona ve la felicitación con los toques que ha necesitado y los botones "Jugar otra vez" y "Volver al inicio".

**Prueba independiente**: Encontrar las 3 diferencias, con y sin fallos por el camino, y comprobar el mensaje, el número de toques y los botones (pasos 10 a 12 y 15 del [quickstart.md](quickstart.md)).

### Pruebas de la historia 2

- [X] T015 [US2] Ampliar `tests/diferencias-juego.test.tsx` y `tests/diferencias-pantalla.test.tsx` (depende de T014). En las reglas: con 3 aciertos seguidos `toques` es 3; con 2 fallos y 3 aciertos es 5; los toques repetidos sobre diferencias ya encontradas no suman; con la partida terminada ningún toque más cambia `toques`. En la pantalla: al tocar la tercera diferencia aparecen `icono-felicitacion`, el mensaje de felicitación, "Has necesitado 3 toques" (y "5 toques" tras 2 fallos, y el mismo número tras tocar varias veces una diferencia ya marcada) y el botón "Jugar otra vez" con `icono-jugar-otra-vez`; ya no se ven los dibujos; `avisarPartida` se llama con `true` al abrir y con `false` al marcar la tercera; "Jugar otra vez" vuelve a los dibujos sin círculos, con el recuento a cero (se comprueba encontrando otra vez las 3 sin fallos y viendo "3 toques"), sin mensaje de fallo y llama otra vez a `avisarPartida(true)`; dentro de `MarcoActividad`, "Volver al inicio" en la felicitación vuelve a la lista sin pedir confirmación

### Implementación de la historia 2

- [X] T016 [P] [US2] Crear `src/actividades/diferencias/Felicitacion.tsx`: icono `party-popper` grande (`icono-felicitacion`), el mensaje de felicitación, el texto de toques (`toques(n)`) y un `BotonGrande` "Jugar otra vez" (icono `refresh`, `idIcono` `icono-jugar-otra-vez`). El botón "Volver al inicio" no se pinta aquí: lo pone el marco
- [X] T017 [US2] Cambiar `Diferencias.tsx` para que muestre `Felicitacion` (con `partida.toques`) cuando la partida está terminada, llame a `avisarPartida(false)` en el momento en que se marca la tercera diferencia y que "Jugar otra vez" cree una partida nueva con `crearPartida()` y llame a `avisarPartida(true)` (depende de T015, T016)
- [X] T018 [US2] Ejecutar `npm test` y `npm run typecheck`: las pruebas de T015 deben pasar

**Punto de control**: Las dos historias P1 funcionan; la actividad tiene principio y fin.

---

## Fase 5: Historia 3 - Ver cuántas diferencias me faltan (Prioridad: P2)

**Objetivo**: Durante la partida, la persona ve siempre cuántas diferencias le faltan.

**Prueba independiente**: Entrar en la actividad y comprobar que el aviso empieza en 3, baja al encontrar cada diferencia, no cambia con los fallos y dice "Te falta 1 diferencia" en singular (pasos 1, 5, 9 y 13 del [quickstart.md](quickstart.md)).

### Pruebas de la historia 3

- [X] T019 [US3] Ampliar `tests/diferencias-juego.test.tsx` y `tests/diferencias-pantalla.test.tsx` (depende de T018). En las reglas: `faltan` da 3 en una partida nueva, 2 con una encontrada, 1 con dos y 0 con tres; un fallo y un toque repetido no cambian `faltan`. En la pantalla: al abrir se ve "Te faltan 3 diferencias" con `icono-faltan`; tras un acierto, "Te faltan 2 diferencias"; tras un fallo, sigue igual; tras el segundo acierto, "Te falta 1 diferencia" (en singular); tras volver a jugar, otra vez "Te faltan 3 diferencias"

### Implementación de la historia 3

- [X] T020 [US3] Añadir `faltan(partida)` a `src/actividades/diferencias/juego.ts` (`3 - encontradas.length`, usando el número de diferencias de la escena) y pintar en `Diferencias.tsx` el aviso con `textosDiferencias.faltan(n)` y un icono grande `magnify` (`icono-faltan`) junto al texto, entre la instrucción y los dibujos, reservando su alto al calcular el tamaño de los dibujos (depende de T019)
- [X] T021 [US3] Ejecutar `npm test` y `npm run typecheck`: las pruebas de T019 deben pasar

**Punto de control**: Las tres historias funcionan; la actividad está completa.

---

## Fase 6: Remate

- [X] T022 [P] Ampliar `tests/textos.test.tsx`, siguiendo su estilo, para comprobar los textos fijos de "Diferencias" (con tildes y signos de apertura), que `faltan` da singular para 1 y plural para 2 y 3, que `toques` incluye el número, y que cada botón de acción ("Jugar otra vez") y cada mensaje importante (fallo, felicitación) lleva icono y texto
- [X] T023 [P] Actualizar `CLAUDE.md`: añadir `src/actividades/diferencias/` (con `escena.ts` y `juego.ts`) a la sección "Estructura" y cambiar la nota "Las actividades reales por ahora son…" para incluir "Diferencias" junto a "Parejas", "Forma la palabra", "Sopa de letras" y "Adivinanzas"
- [X] T024 Ejecutar `npm test` y `npm run typecheck` completos: todo debe pasar, también las pruebas de las funcionalidades 001 a 005 (depende de T022)
- [ ] T025 Hacer la comprobación manual de los 15 pasos de [quickstart.md](quickstart.md) en un móvil con una persona mayor, incluidos esperar un par de minutos sin tocar nada (paso 3), los 10 toques en vacío (paso 6), el modo avión (paso 15) y, sobre todo, que los dos dibujos caben a la vez en un móvil pequeño, que las diferencias se ven con claridad y que los círculos se distinguen sin depender del color (pasos 2 y 14). Antes de cerrar la spec, preguntar al usuario si hay observaciones nuevas y anotarlas en [specs/ideas-pendientes.md](../ideas-pendientes.md) (no se construyen). **Requiere a una persona y un móvil: no la puede hacer el agente; déjala pendiente y avísalo.**

---

## Dependencias y orden de ejecución

### Entre fases

- **Fase 1** (T001): sin dependencias.
- **Fase 2** (T002 a T007): depende de la fase 1. Bloquea todas las historias.
- **Historia 1** (T008 a T014): depende de la fase 2. Es el MVP.
- **Historia 2** (T015 a T018): depende de la historia 1 (amplía `juego.ts`, `Diferencias.tsx` y las pruebas).
- **Historia 3** (T019 a T021): depende de la historia 2 (mismos archivos).
- **Remate** (T022 a T025): depende de las tres historias.

### Dentro de cada historia

- Las pruebas se escriben primero y deben fallar antes de implementar.
- Reglas (`juego.ts`) antes que pantallas; los componentes pequeños (`Dibujo`, `Felicitacion`) antes que `Diferencias.tsx`.

### Oportunidades de paralelismo

- Fase 2: T003 y T004 a la vez (archivos distintos); T006 en cuanto existan las ayudas de T004; T005 en cuanto exista T004.
- Historia 1: T008 y T009 a la vez; T011 a la vez que T010.
- Historia 2: T016 a la vez que T015.
- Remate: T022 y T023 a la vez.

Las historias no se pueden hacer en paralelo entre sí porque comparten `juego.ts`, `Diferencias.tsx` y los archivos de pruebas.

### Ejemplo de paralelismo: Historia 1

```text
# Pruebas de la historia 1 a la vez:
T008 tests/diferencias-juego.test.tsx
T009 tests/diferencias-pantalla.test.tsx

# Reglas y componente a la vez:
T010 src/actividades/diferencias/juego.ts
T011 src/actividades/diferencias/Dibujo.tsx
```

---

## Estrategia de implementación

### Primero el MVP (solo historia 1)

1. Fase 1 y fase 2.
2. Historia 1: se pueden encontrar diferencias y fallar sin penalización, aunque sin felicitación ni aviso de las que faltan.
3. **Parar y comprobar** con los pasos 1 a 8 del quickstart.

### Entrega incremental

1. Historia 2: la partida tiene final, felicitación con los toques y "Jugar otra vez".
2. Historia 3: aviso de las diferencias que faltan.
3. Remate y comprobación manual con personas mayores.

## Notas

- `[P]` = archivos distintos, sin dependencias pendientes.
- Marca cada tarea como hecha al terminarla.
- Los textos de la interfaz van en `src/textos.ts`. Los dibujos y las zonas son datos de la actividad y viven en `escena.ts`, como las palabras de "Forma la palabra" (`palabras.ts`), las sopas (`sopas.ts`) y las adivinanzas (`banco.ts`). Todos los tamaños y colores salen de `src/tema.ts`.
- Nada fuera de la spec: sin zoom, pistas, niveles, varias escenas, ranking ni guardado.
- Cada botón de acción y cada mensaje importante va con icono y texto.
