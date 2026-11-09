# Tareas: Color por actividad y animación de victoria

**Entrada**: Documentos de diseño en `specs/007-color-animacion-victoria/`

**Requisitos previos**: [plan.md](plan.md), [spec.md](spec.md), [research.md](research.md), [data-model.md](data-model.md), [contracts/color-y-animacion.md](contracts/color-y-animacion.md), [quickstart.md](quickstart.md)

**Pruebas**: Se incluyen porque la constitución (principio VIII) las exige: una funcionalidad no está terminada hasta que sus pruebas pasan. Solo pruebas básicas y funcionales: colores distintos, con contraste y con respaldo azul; fundido del icono, "reducir movimiento" y botones que no se bloquean. Nada de aspecto visual. Las pruebas de cada historia se escriben antes que el código y deben fallar al principio.

**Formato**: `- [ ] T### [P?] [Historia?] Descripción con ruta de archivo`. `[P]` = se puede hacer en paralelo (archivos distintos, sin dependencias pendientes).

**Nota sobre el orden**: No hay fase de base común: cada historia es independiente de la otra y toca archivos distintos (la historia 1, el inicio y el registro; la historia 2, las pantallas finales). Se hacen en orden de prioridad. Esta funcionalidad no cambia ninguna regla de juego, así que no se tocan los `juego.ts` ni sus pruebas.

**Convenciones de pantalla** (para que las pruebas y las pantallas coincidan): las tarjetas del inicio se buscan con `getByRole('button', { name: '<nombre>. <descripción>' })` y su color de fondo se comprueba con `toHaveStyle({ backgroundColor })`. Los iconos de victoria conservan sus `testID` actuales (`icono-felicitacion` en "Parejas", "Sopa de letras" y "Diferencias"; `icono-resultado` en "Forma la palabra" y "Adivinanzas") y se buscan con `getByTestId(..., { includeHiddenElements: true })`. El color de fondo de los cinco colores de actividad sale de `tema.colores.actividades`, sin escribir valores a mano en las pruebas. El contraste se calcula en la propia prueba con la fórmula de luminancia relativa.

## Fase 1: Preparación

- [ ] T001 Comprobar que `npm test` y `npm run typecheck` pasan en la rama `007-color-animacion-victoria` antes de tocar nada, para saber que cualquier fallo posterior es de esta funcionalidad

---

## Fase 2: Historia 1 - Distinguir las actividades del inicio por su color (Prioridad: P1) 🎯 MVP

**Objetivo**: Cada actividad de la lista de inicio tiene su propio color de fondo, con texto e icono blancos; el resto de la app no cambia.

**Prueba independiente**: Abrir la app y mirar la lista de inicio (pasos 1 a 4 del [quickstart.md](quickstart.md)).

### Pruebas de la historia 1

- [ ] T002 [US1] Escribir en `tests/inicio-colores.test.tsx` las pruebas de los colores: las 5 actividades de `src/actividades/registro.ts` tienen `color` y son 5 valores distintos entre sí; cada color tiene un contraste de al menos 7 a 1 con `tema.colores.textoSobrePrimario` (calculado en la prueba) y ninguno es igual a `tema.colores.marca`; una actividad de `crearActividades` de `tests/ayudas.tsx` (sin color) se pinta con fondo `tema.colores.primario`; una actividad con `color` se pinta con ese color de fondo; el nombre y la descripción siguen visibles y la etiqueta de accesibilidad de la tarjeta no cambia. Deben fallar al principio (depende de T001)

### Implementación de la historia 1

- [ ] T003 [US1] Añadir a `src/tema.ts` el bloque `colores.actividades` con los cinco colores de [research.md](research.md): `azul` `#0B3D91`, `verde` `#1B5E20`, `morado` `#5B2A86`, `marron` `#7A3E00` y `verdeAzulado` `#006064`. Volver a comprobar con un cálculo que cada uno supera 7 a 1 con blanco (depende de T002)
- [ ] T004 [P] [US1] Añadir a `Actividad` en `src/actividades/tipos.ts` el campo opcional `color?: string`, con un comentario breve: color de fondo de la tarjeta en el inicio; si falta, azul (depende de T002)
- [ ] T005 [US1] Cambiar `src/pantallas/Inicio.tsx` para que cada tarjeta use como fondo y borde `actividad.color ?? tema.colores.primario`, con el nombre, la descripción y el icono en `tema.colores.textoSobrePrimario`. El icono se pinta con la prop `color` de `Icono`. Los tamaños, el orden, el `testID` y la etiqueta de accesibilidad no cambian (depende de T003, T004)
- [ ] T006 [US1] Indicar el `color` de cada actividad en `src/actividades/registro.ts` usando `tema.colores.actividades`: Parejas `azul`, Forma la palabra `verde`, Sopa de letras `morado`, Adivinanzas `marron` y Diferencias `verdeAzulado` (depende de T003, T004)
- [ ] T007 [P] [US1] Actualizar `specs/001-pantalla-inicio/contracts/actividad.md` según [contracts/color-y-animacion.md](contracts/color-y-animacion.md): añadir el campo opcional "Color" a la tabla "Qué entrega la actividad" y, en "Pantalla de inicio", que cada elemento se muestra sobre el color de la actividad
- [ ] T008 [US1] Ejecutar `npm test` y `npm run typecheck`: T002 debe pasar, sin romper las pruebas de las funcionalidades 001 a 006 (depende de T005, T006)

**Punto de control**: La lista de inicio tiene cinco colores distintos; las pantallas finales aún no se animan.

---

## Fase 3: Historia 2 - Ver una pequeña animación de victoria al terminar (Prioridad: P2)

**Objetivo**: En las cinco pantallas finales, el icono de celebración aparece con un fundido de 400 ms, una vez, sin bloquear nada y respetando "reducir movimiento".

**Prueba independiente**: Terminar una partida de cada actividad, y repetir con "reducir movimiento" activado en el móvil (pasos 5 a 11 del [quickstart.md](quickstart.md)).

### Pruebas de la historia 2

- [ ] T009 [US2] Escribir en `tests/icono-victoria.test.tsx` las pruebas del icono de victoria, con temporizadores simulados de Jest y poniendo `animacion.activa = true` (y restaurándolo al terminar cada prueba): con la animación activa y sin "reducir movimiento" (simulado con `jest.spyOn(AccessibilityInfo, 'isReduceMotionEnabled')` devolviendo falso) el icono empieza con opacidad 0, llega a opacidad 1 al avanzar 400 ms y se queda en 1 al avanzar más tiempo; con "reducir movimiento" devolviendo verdadero el icono tiene opacidad 1 sin avanzar el reloj; con `animacion.activa` en falso el icono tiene opacidad 1 desde el primer momento; con la animación activa, la `Felicitacion` de `src/actividades/diferencias/Felicitacion.tsx` muestra el mensaje y el botón "Jugar otra vez" a la vista desde el primer instante y el botón responde al primer toque (llama a `alJugarOtraVez`) sin avanzar el reloj. Deben fallar al principio (depende de T008)

### Implementación de la historia 2

- [ ] T010 [P] [US2] Crear `src/animacion.ts` con el objeto exportado `animacion = { activa: process.env.NODE_ENV !== 'test', duracion: 400 }`, según [data-model.md](data-model.md) (depende de T009)
- [ ] T011 [US2] Crear `src/componentes/IconoVictoria.tsx`: icono `party-popper` (props `testID` y `tamano`, por defecto 96) dentro de un `Animated.View`. Con `animacion.activa` en falso, o con "reducir movimiento" activado (consulta única a `AccessibilityInfo.isReduceMotionEnabled()` al montarse), la opacidad es 1 y no se anima. En los demás casos la opacidad va de 0 a 1 en `animacion.duracion` ms con `Animated.timing` y `useNativeDriver: true`, una sola vez, sin desplazamiento ni cambio de tamaño; si se desmonta durante el fundido se para la animación. Envuelve solo el icono, nunca texto ni botones. El icono sigue siendo decorativo (usa `Icono`) (depende de T010)
- [ ] T012 [P] [US2] Cambiar `src/actividades/parejas/Felicitacion.tsx` para usar `IconoVictoria` con `testID="icono-felicitacion"` en lugar de `Icono` (depende de T011)
- [ ] T013 [P] [US2] Cambiar `src/actividades/sopa-de-letras/Felicitacion.tsx` para usar `IconoVictoria` con `testID="icono-felicitacion"` en lugar de `Icono` (depende de T011)
- [ ] T014 [P] [US2] Cambiar `src/actividades/diferencias/Felicitacion.tsx` para usar `IconoVictoria` con `testID="icono-felicitacion"` en lugar de `Icono` (depende de T011)
- [ ] T015 [P] [US2] Cambiar `src/actividades/forma-palabra/Resultado.tsx` para usar `IconoVictoria` con `testID="icono-resultado"` en lugar de `Icono` (depende de T011)
- [ ] T016 [P] [US2] Cambiar `src/actividades/adivinanzas/Resultado.tsx` para usar `IconoVictoria` con `testID="icono-resultado"` en lugar de `Icono` (depende de T011)
- [ ] T017 [US2] Ejecutar `npm test` y `npm run typecheck`: T009 debe pasar, sin romper las pruebas de las funcionalidades 001 a 006 (en especial las de las cinco pantallas finales) (depende de T012 a T016)

**Punto de control**: Las dos historias funcionan; la funcionalidad está completa.

---

## Fase 4: Remate

- [ ] T018 [P] Actualizar `CLAUDE.md`: en la sección "Estructura" añadir `animacion.ts` junto a `tema.ts` y `IconoVictoria.tsx` a `componentes/`, y en "Cómo añadir una actividad" mencionar el `color` opcional en el contrato
- [ ] T019 Ejecutar `npm test` y `npm run typecheck` completos: todo debe pasar, también las pruebas de las funcionalidades 001 a 006 (depende de T017, T018)
- [ ] T020 Hacer la comprobación manual de los 12 pasos de [quickstart.md](quickstart.md) en un móvil con una persona mayor, incluidos los colores de la lista (pasos 1 a 3), activar y desactivar "reducir movimiento" en el móvil (pasos 8 y 9), esperar un par de minutos en la pantalla final (paso 11) y el modo avión (paso 12). Antes de cerrar la spec, preguntar al usuario si hay observaciones nuevas y anotarlas en [specs/ideas-pendientes.md](../ideas-pendientes.md) (no se construyen), y preguntarle si se fusiona la rama en `main`. **Requiere a una persona y un móvil: no la puede hacer el agente; déjala pendiente y avísalo.**

---

## Dependencias y orden de ejecución

### Entre fases

- **Fase 1** (T001): sin dependencias.
- **Historia 1** (T002 a T008): depende de la fase 1. Es el MVP.
- **Historia 2** (T009 a T017): depende de la historia 1 (T008) solo por orden de prioridad y para partir de pruebas en verde; no comparte archivos con ella.
- **Remate** (T018 a T020): depende de las dos historias.

### Dentro de cada historia

- Las pruebas se escriben primero y deben fallar antes de implementar.
- Datos (`tema.ts`, `tipos.ts`, `animacion.ts`) antes que los componentes; el componente `IconoVictoria` antes de las cinco pantallas finales.

### Oportunidades de paralelismo

- Historia 1: T003 y T004 a la vez (archivos distintos); T005 y T006 a la vez tras ellos; T007 en cualquier momento.
- Historia 2: T012 a T016 a la vez (cinco archivos distintos) en cuanto exista T011.
- Remate: T018 a la vez que T019 solo si T019 espera a T018; por seguridad se hace T018 primero.

### Ejemplo de paralelismo: Historia 2

```text
# Las cinco pantallas finales a la vez (tras T011):
T012 src/actividades/parejas/Felicitacion.tsx
T013 src/actividades/sopa-de-letras/Felicitacion.tsx
T014 src/actividades/diferencias/Felicitacion.tsx
T015 src/actividades/forma-palabra/Resultado.tsx
T016 src/actividades/adivinanzas/Resultado.tsx
```

---

## Estrategia de implementación

### Primero el MVP (solo historia 1)

1. Fase 1.
2. Historia 1: la lista de inicio con cinco colores, sin animación.
3. **Parar y comprobar** con los pasos 1 a 4 del quickstart.

### Entrega incremental

1. Historia 2: fundido del icono en las cinco pantallas finales.
2. Remate y comprobación manual con personas mayores.

## Notas

- `[P]` = archivos distintos, sin dependencias pendientes.
- Marca cada tarea como hecha al terminarla.
- No hay textos nuevos: todos los textos de la interfaz siguen en `src/textos.ts`. Todos los colores y la duración salen de `src/tema.ts` y `src/animacion.ts`.
- Nada fuera de la spec: sin sonidos, vibración, confeti, animaciones en otros momentos, modo oscuro ni colores elegibles.
- La animación nunca envuelve texto ni botones.
- La siguiente y última funcionalidad del proyecto recogerá las ideas de `specs/ideas-pendientes.md`.
