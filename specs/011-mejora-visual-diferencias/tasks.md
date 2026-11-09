# Tareas: Mejora visual de "Diferencias"

**Entrada**: Documentos de diseño en `specs/011-mejora-visual-diferencias/`

**Requisitos previos**: [plan.md](plan.md), [spec.md](spec.md), [research.md](research.md), [data-model.md](data-model.md), [quickstart.md](quickstart.md)

**Pruebas**: Se incluyen porque la constitución (principio VIII) las exige. Solo pruebas básicas y funcionales: escenas, reglas, pantalla y botones. Nada de aspecto visual.

**Formato**: `- [ ] T### [P?] [Historia?] Descripción con ruta de archivo`. `[P]` = se puede hacer en paralelo (archivos distintos, sin dependencias pendientes).

**Historias** (en el orden de la spec): US1 dos dibujos nítidos y vivos (P1), US2 exactamente 3 diferencias (P1), US3 escenas distintas entre partidas (P2), US4 botones con icono (P2).

**Notas**:

- Los dibujos son propios, hechos con `react-native-svg` (decisión de [research.md](research.md), puntos 1 y 2). No se descarga ni se añade ninguna imagen a `assets/`.
- Organización del código (afina el plan: un archivo por escena): `escena.ts` (tipos y `dibujosDe`), `objetos.tsx` (estilo común y ayudas de dibujo), `escenas/salon.tsx`, `escenas/cocina.tsx`, `escenas/jardin.tsx` (fondo, objetos y definición de cada escena) y `escenas/index.ts` (la lista `escenas`). Los archivos de `escenas/` importan de `escena.ts`, nunca al revés, para no crear ciclos.
- Estilo de los dibujos: lienzo 300 × 200, contorno `#1F1F1F` de grosor uniforme, colores vivos, fondo suave sin detalles que parezcan diferencias. Los objetos que cambian miden al menos 0,2 de ancho y 0,3 de alto del dibujo.
- Cada escena tiene exactamente 3 cambios, en este orden: `color`, `falta`, `sobra`.
- Al terminar la Fase 2 el código nuevo compila pero no hay escenas hasta la Fase 3; las pruebas de Diferencias vuelven a pasar al terminar la Fase 4. Hasta entonces solo se exige `npm run typecheck`.
- Las pruebas usan `getByTestId(..., { includeHiddenElements: true })` para los iconos. Se conservan los ids `icono-jugar-otra-vez`, `icono-volver`, `dibujo-arriba`, `dibujo-abajo` y `circulo-<lado>-<id>`.
- No se tocan `BotonGrande`, `MarcoActividad`, `ElegirOpcion` ni otras actividades (FR-010).
- Tarea que necesita a una persona con un móvil: T028. Se deja pendiente y se avisa.

## Fase 1: Preparación

- [X] T001 Comprobar que `npm test` y `npm run typecheck` pasan en la rama `011-mejora-visual-diferencias` antes de tocar nada
- [X] T002 Instalar la librería con `npx expo install react-native-svg` (debe quedar la versión 15.16.0 en `package.json`) y comprobar con una prueba desechable en `tests/` que `Svg`, `Rect` y `Circle` se renderizan en Jest; borrar la prueba después. Si no se renderizan, añadir el simulacro mínimo necesario en la configuración de Jest de `package.json`

---

## Fase 2: Base común (bloquea las historias)

**Propósito**: modelo de datos y reglas con 3 diferencias fijas, sin la pantalla de elegir.

- [X] T003 [P] En `src/textos.ts`, dentro de `textosDiferencias`, quitar `elegirNumero`, `tres`, `cinco` y `siete`, y cambiar `felicitacion` de función a texto fijo `'¡Enhorabuena! Has encontrado las 3 diferencias'`
- [X] T004 [P] Crear `src/actividades/diferencias/objetos.tsx` con el estilo común: constantes del contorno (`#1F1F1F`, grosor), la paleta de colores vivos para los dibujos y la ayuda `Contorno`/props comunes que usarán todos los objetos; cada objeto es una función `(color: string) => JSX.Element` pensada para un lienzo de 300 × 200 (nada de iconos)
- [X] T005 Reescribir `src/actividades/diferencias/escena.ts` según [data-model.md](data-model.md): tipos `Objeto`, `Colocado`, `Cambio` (con `tipo: 'color' | 'falta' | 'sobra'`), `Zona`, `Diferencia` y `Escena` (con `fondo`, `comunes` y `cambios`), `proporcionDibujo = 1.5`, la ayuda `zonaEn(x, y, ancho, alto)` y `dibujosDe(escena)` que devuelve `{ arriba, abajo, diferencias }`; quitar `Total` y la rejilla de iconos. No debe importar de `escenas/` (depende de T004)
- [X] T006 Crear `src/actividades/diferencias/escenas/index.ts` con `export const escenas: Escena[] = []` (vacía por ahora; se rellena en T012 y T022) y adaptar `src/actividades/diferencias/juego.ts`: `crearPartida(idEscenaAnterior?, azar = Math.random)` sin `total`; `terminada` cuando `encontradas.length === 3`; `faltan` usa 3; importar `escenas` de `./escenas`. Las reglas de `tocar` (acierto, repetida, fallo, toques) no cambian (depende de T005)
- [X] T007 [P] Adaptar `src/actividades/diferencias/Felicitacion.tsx`: quitar la propiedad `total` y usar `t.felicitacion` como texto (depende de T003)
- [X] T008 Adaptar `src/actividades/diferencias/Diferencias.tsx`: quitar `ElegirOpcion`, `opciones` y `Total`; la partida empieza al abrir (`useState(() => crearPartida())` y `avisarPartida(true)` una sola vez al montar); "Jugar otra vez" crea otra partida con `escenaAnterior` y vuelve a avisar `avisarPartida(true)`; pasar a `Dibujo` el `fondo` de `partida.escena` y los objetos de `dibujosDe(partida.escena)`; ajustar `altoReservado` y quitar `anchoMinimo` basado en 7 diferencias (usar el mínimo que da zonas de 44 puntos con zona ≥ 0,2 de ancho, es decir 220) (depende de T006 y T007)
- [X] T009 Adaptar `tests/ayudas-diferencias.ts` a las nuevas formas: `escenaDePrueba = escenas[0]`, `segundaEscena = escenas[1]`, sin parámetro `total`, importando `escenas` de `../src/actividades/diferencias/escenas` (depende de T005 y T006)

**Punto de control**: `npm run typecheck` pasa (la lista de escenas existe pero está vacía hasta la Fase 3).

---

## Fase 3: Historia 1 - Dos dibujos nítidos y vivos (P1) 🎯 MVP

**Objetivo**: dos dibujos de la misma escena, del mismo tamaño y alineados, bien dibujados. Se entrega con la escena Salón completa.

**Prueba independiente**: abrir "Diferencias" y ver los dos dibujos enteros, iguales y alineados, con objetos reconocibles y colores vivos.

### Pruebas de la historia 1

- [X] T010 [P] [US1] En `tests/diferencias-pantalla.test.tsx` (se rehace entera en T016; aquí solo el bloque nuevo) añadir una prueba de que, al abrir "Diferencias", `dibujo-arriba` y `dibujo-abajo` existen y tienen exactamente el mismo `width` y `height` en su estilo

### Implementación de la historia 1

- [X] T011 [P] [US1] Crear `src/actividades/diferencias/escenas/salon.tsx`: fondo del salón (pared, suelo, zócalo), objetos comunes (ventana con cortinas, planta, mesita con lámpara, alfombra), el sofá (cambio `color`: rojo en el dibujo de arriba y azul en el de abajo), el reloj de pared (cambio `falta`, solo arriba) y el gato (cambio `sobra`, solo abajo); exportar la `Escena` `salon` con `nombre: 'Salón'` y las zonas con `zonaEn` (depende de T004 y T005)
- [X] T012 [US1] Actualizar `src/actividades/diferencias/escenas/index.ts` (creado en T006) para exportar `escenas: Escena[] = [salon]` (se ampliará en la Fase 5) (depende de T011)
- [X] T013 [US1] Reescribir `src/actividades/diferencias/Dibujo.tsx`: recibe una propiedad `fondo` además de los objetos y dibuja con `Svg` (`viewBox="0 0 300 200"`, tamaño `ancho` × `alto`), el fondo de la escena y los objetos colocados, todo con `pointerEvents="none"`; conservar el recuadro con `testID`, el rótulo, la medición con `onLayout`, el toque con `locationX/locationY` relativos y los círculos de las diferencias encontradas tal como están hoy (depende de T005 y T012)

**Punto de control**: se ve el Salón en los dos dibujos; la prueba de T010 pasa.

---

## Fase 4: Historia 2 - Exactamente 3 diferencias (P1)

**Objetivo**: cada partida tiene 3 diferencias, una de cada clase; se marcan tocando donde se ven; no hay más.

**Prueba independiente**: jugar una partida entera tocando las 3 diferencias y ver la felicitación; comprobar que no queda ninguna otra.

### Pruebas de la historia 2

- [X] T014 [P] [US2] Rehacer `tests/diferencias-escena.test.tsx` con las reglas de [data-model.md](data-model.md) para cada escena de `escenas` (con `describe.each`): exactamente 3 cambios con ids distintos y uno de cada `tipo`; `color` con la misma posición y dos colores distintos en `arriba` y `abajo`; `falta` solo con `arriba`; `sobra` solo con `abajo`; zonas dentro de 0 a 1, de al menos 0,2 de ancho y 0,3 de alto, sin solaparse; los dos dibujos de `dibujosDe` solo difieren en los 3 ids de los cambios; hay al menos 2 escenas con ids distintos; el color de cada par `color` tiene una diferencia de luminancia clara (por ejemplo, razón de contraste entre ambos de al menos 1,5)
- [X] T015 [P] [US2] Rehacer `tests/diferencias-juego.test.tsx` sin `total`: acierto de una diferencia (suma toque, la marca, no termina), diferencia ya marcada (no cambia nada), fallo (suma toque, `fallo`), terminada al marcar las 3 (y los toques posteriores no hacen nada), `faltan` baja de 3 a 0 y la puntuación (`toques`) cuenta aciertos nuevos y fallos
- [X] T016 [P] [US2] Rehacer `tests/diferencias-pantalla.test.tsx` (conservando la prueba de T010): al abrir "Diferencias" no aparece ninguna elección de número y se ve `t.faltan(3)`; tocar el centro de cada zona la marca (círculos `circulo-arriba-<id>` y `circulo-abajo-<id>`) y baja la cuenta; tocar fuera muestra `t.fallo` y suma un toque; tocar el dibujo de arriba no reacciona; al marcar la tercera aparece `t.felicitacion` con `t.toques(n)`; `avisarPartida` se llama con `true` al empezar y con `false` al terminar (con el `MarcoActividad` como en las pruebas actuales)

### Implementación de la historia 2

- [X] T017 [US2] Ejecutar `npm test -- diferencias` y corregir en `src/actividades/diferencias/` (escena Salón, `juego.ts`, `Diferencias.tsx`) lo que las pruebas de T014 a T016 descubran, hasta que pasen; ajustar las zonas del Salón si alguna no cumple las medidas mínimas (depende de T014, T015 y T016)

**Punto de control**: las pruebas de Diferencias pasan con la escena Salón. Historias 1 y 2 completas.

---

## Fase 5: Historia 3 - Escenas distintas entre partidas (P2)

**Objetivo**: hay 3 escenas y partidas seguidas muestran escenas distintas.

**Prueba independiente**: jugar 3 partidas seguidas con "Jugar otra vez" y ver más de una escena.

### Pruebas de la historia 3

- [X] T018 [P] [US3] En `tests/diferencias-juego.test.tsx` añadir pruebas de que `escenas` tiene 3 elementos, de que `crearPartida(idAnterior, azar)` nunca devuelve la escena anterior para ningún valor del azar (0, 0,5 y 0,99) y de que encadenar 3 partidas con `idEscenaAnterior` produce al menos 2 escenas distintas
- [X] T019 [P] [US3] En `tests/diferencias-pantalla.test.tsx` añadir una prueba de que, al terminar una partida y pulsar "Jugar otra vez" (con `Math.random` fijado), la partida nueva empieza (vuelve a verse `t.faltan(3)`) y usa una escena distinta de la anterior (comparando los círculos/ids de diferencias de la zona de la escena nueva con los de la anterior)

### Implementación de la historia 3

- [X] T020 [P] [US3] Crear `src/actividades/diferencias/escenas/cocina.tsx`: fondo (pared con azulejos suaves, encimera), comunes (nevera, fogón, ventana), la olla (cambio `color`), el cuadro o reloj (cambio `falta`) y la manzana o el pan (cambio `sobra`); exportar la `Escena` `cocina` con `nombre: 'Cocina'` (depende de T004 y T005)
- [X] T021 [P] [US3] Crear `src/actividades/diferencias/escenas/jardin.tsx`: fondo (cielo, césped, camino), comunes (casa, valla, árbol), la flor grande o la sombrilla (cambio `color`), el sol (cambio `falta`) y el pájaro o la mariposa (cambio `sobra`); exportar la `Escena` `jardin` con `nombre: 'Jardín'` (depende de T004 y T005)
- [X] T022 [US3] Actualizar `src/actividades/diferencias/escenas/index.ts` (de `[salon]`) a `[salon, cocina, jardin]` (depende de T020 y T021)

**Punto de control**: las pruebas de la historia 3 pasan y las de la historia 2 siguen pasando con las 3 escenas.

---

## Fase 6: Historia 4 - Botones con icono grande junto al texto (P2)

**Objetivo**: "Jugar otra vez" y "Volver al inicio" muestran icono y texto a la vez.

**Prueba independiente**: terminar una partida y ver los dos botones con icono y texto.

- [X] T023 [US4] En `tests/diferencias-pantalla.test.tsx` añadir una prueba de que, en la pantalla final, "Jugar otra vez" y "Volver al inicio" muestran su texto (`t.jugarOtraVez` y el texto de volver de `src/textos.ts`) y su icono (`icono-jugar-otra-vez` e `icono-volver`, con `includeHiddenElements: true`) a la vez. Si falla, corregir en `Felicitacion.tsx`; no se espera cambiar `MarcoActividad` ni `BotonGrande` (FR-010)

**Punto de control**: la prueba pasa sin tocar código de producción, como se espera.

---

## Fase 7: Cierre y transversal

- [X] T024 Ejecutar `npm test` y `npm run typecheck` completos: todas las pruebas de la app deben pasar (SC-006); corregir lo que falle
- [X] T025 [P] Actualizar `CLAUDE.md`: la línea de `diferencias/` de la estructura (3 escenas fijas con 3 diferencias cada una, dibujos propios con `react-native-svg`, `escena.ts`, `objetos.tsx`, `escenas/`), la lista de componentes (`ElegirOpcion.tsx` ya solo lo usa Sopa de letras) y, en "Cosas a tener en cuenta", una línea sobre la excepción de licencia de `react-native-svg`
- [X] T026 [P] Añadir en `specs/ideas-pendientes.md` el estado tras la spec 011: Diferencias pasa a 3 escenas dibujadas con 3 diferencias fijas (sustituye a las ideas 2 y 3 de la spec 008 sobre 3, 5 o 7); no se usó ninguna galería; salvedad de licencia MIT de `react-native-svg` pendiente de aceptación expresa
- [X] T027 Comprobar la restricción de licencia (SC-007): `git status` y `git diff --stat main` no muestran archivos de imagen nuevos en `assets/`, y la única dependencia nueva en `package.json` es `react-native-svg`
- [X] T028 Tarea para una persona con móvil (no la puede hacer el agente): seguir [quickstart.md](quickstart.md) puntos 1 a 7 y anotar si los dibujos se ven nítidos, si las diferencias son evidentes y si la persona responsable acepta la licencia MIT de `react-native-svg`. Dejar pendiente y avisar
- [X] T029 Antes de cerrar la spec, preguntar al usuario si hay observaciones nuevas de los juegos para `specs/ideas-pendientes.md`, y preguntar si se fusiona la rama en `main` (no fusionar sin su respuesta)

---

## Dependencias y orden

- Fase 1 → Fase 2 → Fase 3 (MVP) → Fase 4. Las fases 5 y 6 dependen de la 4 (comparten archivos de pruebas con ella) y entre sí son independientes.
- Fase 2: T003 y T004 en paralelo → T005 → T006 → (T007 en paralelo con T006) → T008 → T009.
- Fase 3: T011 → T012 → T013; T010 en paralelo.
- Fase 4: T014, T015 y T016 en paralelo → T017.
- Fase 5: T020 y T021 en paralelo → T022; T018 y T019 en paralelo.
- T016, T019 y T023 editan el mismo archivo de pruebas: se hacen una detrás de otra.

## Estrategia de implementación

1. **MVP**: Fases 1 a 4 (una escena completa, 3 diferencias, reglas probadas). Ya se puede jugar y comprobar en el móvil.
2. **Variedad**: Fase 5 (2 escenas más).
3. **Botones y cierre**: Fases 6 y 7.

## Resumen

- 36 tareas (T030 a T036 son la fase 8, de la petición de más variedad). Preparación 2 (T001-T002), base 7 (T003-T009), US1 4 (T010-T013), US2 4 (T014-T017), US3 5 (T018-T022), US4 1 (T023), cierre 6 (T024-T029).
- Oportunidades de paralelismo: T003 y T004; T014 a T016; T020 y T021; T025 y T026.

---

## Fase 8: Más variedad (petición posterior: 20 o 30 composiciones, al menos el doble de ambientes)

**Objetivo**: 6 ambientes y composición al azar de objetos, colores y diferencias en cada partida (historia 3 ampliada, FR-006 y SC-004 de la spec).

- [X] T030 Crear `src/actividades/diferencias/composicion.ts` con los tipos `Ambiente` y `Elegible`, los 6 huecos fijos (3 columnas por 2 filas), las parejas de color y `componerEscena(ambiente, azar)`; añadir `ambiente` a `Escena` en `escena.ts` y mover `cuadro` y `estante` a `objetos.tsx`
- [X] T031 [P] Reescribir `escenas/salon.tsx`, `escenas/cocina.tsx` y `escenas/jardin.tsx` como ambientes con catálogo de objetos (fila de arriba y de abajo) y varios colores de fondo, y exportar los objetos que otros ambientes reutilizan
- [X] T032 [P] Crear los ambientes nuevos `escenas/dormitorio.tsx`, `escenas/playa.tsx` y `escenas/granja.tsx` con sus objetos propios y `escenas/index.ts` con la lista `ambientes` (6)
- [X] T033 Adaptar `juego.ts` (`crearPartida(anterior, azar)` elige un ambiente distinto del anterior y compone la escena) y `Diferencias.tsx` (`crearPartida(partida.escena)`)
- [X] T034 Rehacer `tests/diferencias-escena.test.tsx` (reglas de 40 composiciones por ambiente, al menos 30 distintas por ambiente y más de 200 en total), `tests/diferencias-juego.test.tsx` (ambiente nunca repetido y 12 partidas seguidas distintas) y ajustar `tests/ayudas-diferencias.ts` y `tests/diferencias-pantalla.test.tsx`
- [X] T035 Revisar el aspecto de las composiciones con una vista previa fuera del proyecto y actualizar `CLAUDE.md`
- [X] T036 Tarea para una persona con móvil: jugar 10 partidas seguidas y comprobar que cada una es distinta, que el lugar cambia siempre y que las diferencias son evidentes (SC-004, quickstart punto 5)
