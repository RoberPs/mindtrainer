# Tareas: Bienvenida, selección de juegos más intuitiva y nueva identidad de color

**Entrada**: Documentos de diseño en `specs/009-bienvenida-seleccion-juegos/`

**Requisitos previos**: [plan.md](plan.md), [spec.md](spec.md), [research.md](research.md), [data-model.md](data-model.md), [contracts/actividad-color.md](contracts/actividad-color.md), [quickstart.md](quickstart.md)

**Pruebas**: Se incluyen porque la constitución (principio VIII) las exige. Solo pruebas básicas y funcionales: navegación, textos, color de cada juego y contraste 7 a 1. Nada de aspecto visual fino. Las pruebas de cada historia se escriben o actualizan antes que el código.

**Formato**: `- [ ] T### [P?] [Historia?] Descripción con ruta de archivo`. `[P]` = se puede hacer en paralelo (archivos distintos, sin dependencias pendientes).

**Historias** (en el orden de la spec): US1 bienvenida (P1), US2 nueva identidad de color (P1), US3 lista de juegos con tarjetas (P2), US4 cada juego conserva su color (P2).

**Notas sobre el orden**:

- La fase 2 (paleta y contexto de color) bloquea todas las historias. Después, US1 y US2 son independientes entre sí; US3 y US4 dependen de la fase 2.
- Valores de color de partida (los fija y comprueba la prueba de contraste, T003): fondo `#FFF9F0`, texto `#1F2A44`; juegos: Parejas azul `#1F53B4` con texto blanco, Forma la palabra verde `#13653F` con blanco, Sopa naranja `#F2800D` con texto `#111111`, Adivinanzas magenta `#A32752` con blanco, Diferencias gris azulado `#4C5974` con blanco.
- Las fichas y casillas claras usan un crema algo más oscuro que el fondo (no blanco puro) para distinguirse de él.
- Esta funcionalidad cambia a propósito algunas pruebas antiguas: las que esperaban la lista como primera pantalla, la que fijaba que no hay "bienvenida" y `tests/inicio-colores.test.tsx`.
- Ids y textos: botón de bienvenida `Empezar`; testIDs `logo-grande`, `logo-pequeno`; en `src/textos.ts`, `textosBienvenida` con `nombreApp` ("MindTrainer"), `titulo` ("Empieza a entrenar tu mente"), `pregunta` ("¿Listo para ejercitar tu memoria hoy?"), `empezar` ("Empezar") y `eligeJuego` ("Elige uno de los juegos").

## Fase 1: Preparación

- [X] T001 Comprobar que `npm test` y `npm run typecheck` pasan en la rama `009-bienvenida-seleccion-juegos` antes de tocar nada

---

## Fase 2: Base común (bloquea todas las historias)

**Objetivo**: Tener la paleta nueva, el contrato con color de texto y el contexto de color de juego.

- [X] T002 [P] Escribir `tests/tema-contraste.test.tsx` (sustituye a la parte de contraste de `tests/inicio-colores.test.tsx`): recorre `tema.colores.actividades` y comprueba que cada par `{ fondo, texto }` tiene contraste ≥ 7 a 1; que el texto general sobre el fondo crema y `textoSobrePrimario` sobre `primario` también; que los 5 fondos de juego son distintos entre sí; y que `acierto` y `marca` tienen 7 a 1 con el fondo crema y con `tarjeta`, `texto` con `tarjeta`, y `borde` con `fondo`. Usa la misma fórmula de WCAG que la prueba actual. Debe fallar al principio (depende de T001)
- [X] T003 Reescribir `src/tema.ts` según [data-model.md](data-model.md) y [research.md](research.md): `fondo` crema, `texto` azul oscuro, `primario` azul oscurecido, `textoSobrePrimario` blanco, `tarjeta` crema algo más oscuro, `borde`, `acierto`, `marca`, `velo`, con `acierto: '#0F5A38'` y `marca: '#A0001C'`, y `actividades` con cinco pares `{ fondo, texto }` (`azul`, `verde`, `naranja`, `magenta`, `grisAzulado`); se eliminan `morado`, `marron` y `verdeAzulado`. Ajustar los tonos hasta que T002 pase (depende de T002)
- [X] T004 [P] Añadir `colorTexto?: string` a `Actividad` en `src/actividades/tipos.ts` y actualizar el comentario de `color` (color del juego, no solo de la tarjeta)
- [X] T005 [P] Escribir `tests/color-juego.test.tsx`: `useColorJuego()` devuelve `{ fondo: tema.colores.primario, texto: tema.colores.textoSobrePrimario }` sin proveedor, y el color del proveedor dentro de él; `BotonGrande` dentro de un proveedor con otro color se pinta con ese fondo y su texto. Debe fallar al principio (depende de T001)
- [X] T006 Crear `src/componentes/ColorJuego.tsx` con el contexto, `ProveedorColorJuego` y el hook `useColorJuego()` (valor por defecto: el azul principal con texto blanco) y hacer que `src/componentes/BotonGrande.tsx` pinte fondo, texto e icono con ese color (depende de T003, T005)

**Punto de control**: `tests/tema-contraste.test.tsx` y `tests/color-juego.test.tsx` pasan. Otras pruebas pueden fallar hasta las fases siguientes.

---

## Fase 3: Historia 1 - Pantalla de bienvenida (P1)

**Objetivo**: La app abre con la bienvenida y "Empezar" lleva a la lista; salir de un juego lleva a la lista.

**Prueba independiente**: [quickstart.md](quickstart.md) paso 1.

- [X] T007 [P] [US1] Escribir `tests/bienvenida.test.tsx`: al renderizar `App` se ven `textosBienvenida.nombreApp`, el título, la pregunta, el botón "Empezar" y los logos (`logo-grande` y `logo-pequeno`, con `includeHiddenElements: true`) y no se ve la lista; al pulsar "Empezar" se ve la lista; al abrir una actividad y pulsar "Volver al inicio" se ve la lista, no la bienvenida; la bienvenida no pide registro ni permisos. Debe fallar al principio (depende de T001)
- [X] T008 [P] [US1] Añadir `textosBienvenida` a `src/textos.ts` con los textos de las notas de arriba
- [X] T009 [P] [US1] Generar `assets/logo.png` recortando con `jimp-compact` (script de un solo uso, que no se guarda en el repositorio) la mitad izquierda con fondo crema de `assets/diseno/logo-presentacion.png`, ajustando el recorte al logo con un margen pequeño y comprobando el resultado a ojo. El PNG resultante debe ser **cuadrado** (lienzo crema alrededor del logo) para que `Icono` no lo deforme
- [X] T010 [US1] Crear `src/pantallas/Bienvenida.tsx`: arriba, fila con el logo pequeño (`logo-pequeno`, unos 48 puntos) y el nombre "MindTrainer"; en el centro, el logo grande (`logo-grande`, unos 220 puntos, decorativo y oculto a la accesibilidad); debajo, el título y la pregunta (letra de 28 y 22, color de texto de la paleta, centrados); abajo, un `BotonGrande` "Empezar" con icono (por ejemplo `play-circle`) que llama a `alEmpezar`. Con `ScrollView` por si la letra del móvil es grande. Usa `Icono` con `{ imagen: require('../../assets/logo.png') }` y el `tamano` indicado (el logo es cuadrado, T009) (depende de T003, T006, T008, T009)
- [X] T011 [US1] Cambiar `App.tsx`: estado `bienvenidaVista` (falso al abrir); si es falso se pinta `Bienvenida`, y su botón lo pone a verdadero; la lista y las actividades siguen como hasta ahora. Cambiar el fondo de `pantalla` a `tema.colores.fondo` (depende de T007, T010)
- [X] T012 [US1] Actualizar las ocho pruebas que renderizan `App` y esperaban la lista de entrada: `tests/adivinanzas-pantalla.test.tsx`, `diferencias-pantalla.test.tsx`, `forma-palabra-pantalla.test.tsx`, `inicio.test.tsx`, `marco-actividad.test.tsx`, `parejas-pantalla.test.tsx`, `sopa-pantalla.test.tsx` y `textos.test.tsx`. Crear en `tests/ayudas.tsx` una función `abrirApp(actividades?)` que renderiza `App` y pulsa "Empezar", y usarla en todas; en `inicio.test.tsx` quitar además `bienvenid` de la comprobación de textos prohibidos (depende de T011)

**Punto de control**: `tests/bienvenida.test.tsx` y `tests/inicio.test.tsx` pasan.

---

## Fase 4: Historia 2 - Nueva identidad de color en toda la app (P1)

**Objetivo**: Fondo crema y paleta del logo en todas las pantallas, sin restos de la paleta antigua.

**Prueba independiente**: [quickstart.md](quickstart.md) paso 2.

- [X] T013 [P] [US2] Actualizar `src/actividades/registro.ts`: los 5 juegos usan `tema.colores.actividades.*` nuevos (Parejas azul, Forma la palabra verde, Sopa naranja, Adivinanzas magenta, Diferencias gris azulado) con su `colorTexto`; Sopa y Diferencias cambian de color respecto a ahora (depende de T003, T004)
- [X] T014 [P] [US2] Cambiar en `src/actividades/diferencias/escena.ts` los colores de los iconos que usan la paleta antigua (`azul`, `naranja`, `verde`, `morado`) por los cinco fondos de `tema.colores.actividades` (azul, verde, naranja, magenta y gris azulado); mantener marrones, gris y negro. Comprobar que `npm test -- diferencias-escena` pasa y que los iconos siguen reconociéndose (depende de T003)
- [X] T015 [P] [US2] Cambiar `app.json`: fondo del icono adaptable a `#FFF9F0`. Regenerar con `jimp-compact` (script de un solo uso) `assets/icon.png`, `assets/splash-icon.png` y `assets/android-icon-foreground.png` con el logo de `assets/logo.png` centrado sobre crema; `assets/android-icon-background.png` y `assets/android-icon-monochrome.png` si hace falta. Mantener tamaños actuales (depende de T009)
- [X] T016 [US2] Buscar con Grep en `src/`, `App.tsx` y `tests/` cualquier color suelto de la paleta antigua (`#0B3D91`, `#1B5E20`, `#5B2A86`, `#7A3E00`, `#006064`, `#FFFFFF` como fondo) y cualquier referencia a `actividades.morado`, `.marron` o `.verdeAzulado`; sustituirlos por la paleta nueva (depende de T013, T014)
- [X] T017 [US2] Borrar `tests/inicio-colores.test.tsx` conservando solo sus pruebas útiles (5 actividades con color, 5 colores distintos, tarjeta con el color de su actividad, actividad sin color en azul) en `tests/color-juego.test.tsx`; el contraste ya lo cubre `tests/tema-contraste.test.tsx` (depende de T013)

**Punto de control**: `npm test` y `npm run typecheck` pasan; no quedan colores antiguos.

---

## Fase 5: Historia 3 - Lista de juegos con tarjetas grandes (P2)

**Objetivo**: Encabezado "Elige uno de los juegos" y tarjetas grandes con icono grande, nombre y descripción.

**Prueba independiente**: [quickstart.md](quickstart.md) paso 3.

- [X] T018 [US3] Escribir o ampliar `tests/inicio.test.tsx`: se ve el encabezado "Elige uno de los juegos"; con las 5 actividades reales hay 5 tarjetas con su icono, nombre y descripción y cada una abre su actividad; con 30 actividades de prueba la lista sigue siendo desplazable (ya existente); la tarjeta de una actividad sin color es azul. Debe fallar al principio (depende de T012)
- [X] T019 [US3] Rediseñar `src/pantallas/Inicio.tsx`: añadir el encabezado `textosBienvenida.eligeJuego` encima de la lista (dentro del `ScrollView`, letra de 28 y negrita); cada tarjeta mantiene `accessibilityLabel` y `testID` actuales, con alto mínimo de unos 120 puntos, icono de unos 72, pintado con el color del texto del juego, dentro de un círculo `tema.colores.tarjeta` (nunca blanco puro), nombre de 28 y descripción de 22, con el fondo y el texto del color del juego (`actividad.color` y `actividad.colorTexto`); sin `colorTexto`, blanco. Una columna (depende de T018, T013)

**Punto de control**: `tests/inicio.test.tsx` pasa.

---

## Fase 6: Historia 4 - Cada juego conserva su color (P2)

**Objetivo**: Los botones y elementos de cada juego usan su color propio, desde elegir hasta la pantalla final.

**Prueba independiente**: [quickstart.md](quickstart.md) paso 4.

- [X] T020 [P] [US4] Ampliar `tests/marco-actividad.test.tsx`: con una actividad con `color` y `colorTexto`, el botón "Volver al inicio" y los botones del aviso de salir se pintan con ese color; sin color, con el azul principal (depende de T006)
- [X] T021 [US4] Hacer que `src/pantallas/MarcoActividad.tsx` envuelva el contenido, la barra superior y el aviso en `ProveedorColorJuego` con `actividad.color` y `actividad.colorTexto` (depende de T020, T006)
- [X] T022 [P] [US4] En `src/actividades/parejas/` (`Carta.tsx`, `Tablero.tsx`, `ElegirTamano.tsx`, `Felicitacion.tsx`): sustituir `tema.colores.primario`, `textoSobrePrimario` y `borde` por `useColorJuego()` (carta tapada, borde de carta visible, botones). Mantener el verde de acierto con su icono (depende de T021)
- [X] T023 [P] [US4] En `src/actividades/forma-palabra/` (`Palabra.tsx`, `Resultado.tsx`): igual que T022 para las letras, el borde y los botones (depende de T021)
- [X] T024 [P] [US4] En `src/actividades/sopa-de-letras/` (`Cuadricula.tsx`, `ListaPalabras.tsx`, `SopaDeLetras.tsx`, `Felicitacion.tsx`): igual para el borde de las casillas, la palabra de referencia, los iconos de la lista y los botones. La casilla hallada y la palabra hallada siguen en verde de acierto con su icono (depende de T021)
- [X] T025 [P] [US4] En `src/actividades/adivinanzas/` (`Adivinanza.tsx`, `Respuesta.tsx`, `Resultado.tsx`): el estado "pendiente" de cada respuesta y los bordes usan el color del juego; "correcta" y "elegida incorrecta" siguen con su color, su icono y su texto (depende de T021)
- [X] T026 [P] [US4] En `src/actividades/diferencias/` (`Dibujo.tsx`, `Diferencias.tsx`, `Felicitacion.tsx`): el borde del dibujo y los botones usan el color del juego; los círculos de las diferencias encontradas siguen con `marca` (depende de T021)
- [X] T027 [US4] Ampliar `tests/color-juego.test.tsx`: para cada una de las 5 actividades reales, abrir su `Contenido` dentro de `MarcoActividad` y comprobar que al menos el botón "Volver al inicio" y un botón principal de su primera pantalla (elegir tamaño o número, o de acción) se pintan con el `color` de esa actividad, y que el color de los 5 es distinto (depende de T022 a T026)

**Punto de control**: `npm test` y `npm run typecheck` pasan. Todas las pruebas de juegos siguen pasando.

---

## Fase 7: Cierre

- [X] T028 Ejecutar `npm test` y `npm run typecheck` y comprobar que pasan completos, incluidas las pruebas de las funcionalidades 001 a 008
- [X] T029 [P] Añadir al final de `specs/001-pantalla-inicio/contracts/actividad.md` una línea que remita a `specs/009-bienvenida-seleccion-juegos/contracts/actividad-color.md`. Actualizar `CLAUDE.md`: estructura (`Bienvenida.tsx`, `ColorJuego.tsx`, logo), regla "un color por juego en todos sus botones" y la nota de contraste; y la sección "Estado" de `specs/ideas-pendientes.md` con lo hecho en la spec 009
- [X] T030 Pasar [quickstart.md](quickstart.md) pasos 1 a 5 y anotar el resultado
- [X] T031 Tarea para una persona con móvil (no la puede hacer el agente): revisar a ojo en un móvil de unos 360 puntos de ancho el logo, los colores de cada juego, que los iconos de Diferencias se siguen reconociendo y el icono de la app

---

## Dependencias y orden

- Fase 1 → Fase 2 → Fases 3 a 6 → Fase 7.
- US1 (fase 3) y US2 (fase 4) se pueden hacer en paralelo tras la fase 2, salvo T015, que necesita T009 (logo).
- US3 necesita US1 solo por T012 (las pruebas de `App` ya actualizadas) y T013 (colores).
- US4 necesita T006 (contexto) y T021 (marco); T022 a T026 son independientes entre sí.

## Ejemplo de paralelo

Tras T021: T022, T023, T024, T025 y T026 a la vez (cada uno en su carpeta de actividad).

## Estrategia

- **MVP**: fases 1 a 3 (bienvenida). Se puede entregar sola: la app abre con la bienvenida y el resto queda como estaba, ya con la paleta de la fase 2.
- Después, US2 (identidad de color), US3 (tarjetas) y US4 (color por juego), cada una comprobable por separado.
