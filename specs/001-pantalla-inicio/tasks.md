# Tareas: Pantalla de inicio de MindTrainer

**Entrada**: Documentos de diseño en `specs/001-pantalla-inicio/`

**Requisitos previos**: [plan.md](plan.md), [spec.md](spec.md), [research.md](research.md), [data-model.md](data-model.md), [contracts/actividad.md](contracts/actividad.md), [quickstart.md](quickstart.md)

**Pruebas**: Se incluyen porque la constitución (principio VIII) las exige: una funcionalidad no está terminada hasta que sus pruebas pasan. Solo pruebas básicas y funcionales.

**Formato**: `- [ ] T### [P?] [Historia?] Descripción con ruta de archivo`. `[P]` = se puede hacer en paralelo (archivos distintos, sin dependencias pendientes).

## Fase 1: Preparación (esqueleto de la app)

- [X] T001 Crear el proyecto Expo con React Native y TypeScript en la raíz del repositorio, con `App.tsx` y las carpetas `src/`, `tests/` y `assets/` según [plan.md](plan.md)
- [X] T002 Configurar Jest con React Native Testing Library y el script `npm test` en `package.json`
- [X] T003 [P] Añadir un `.gitignore` adecuado (dependencias, compilados) en `.gitignore`

---

## Fase 2: Base común (bloquea todas las historias)

**⚠️ CRÍTICO**: Ninguna historia puede empezar hasta terminar esta fase.

- [X] T004 [P] Crear los textos en español de España ("Volver al inicio", "¿Seguro que quieres salir? Perderás la partida", "Sí, salir", "No, seguir jugando") en `src/textos.ts`
- [X] T005 [P] Crear el tema accesible (letra de al menos 22 puntos, botones de al menos 64 puntos de alto, contraste de al menos 7 a 1, según FR-010) en `src/tema.ts`
- [X] T006 [P] Definir el tipo `Actividad` (identificador, icono, nombre, descripción, contenido) y el aviso de partida en curso según [contracts/actividad.md](contracts/actividad.md) en `src/actividades/tipos.ts`
- [X] T007 Crear el registro de actividades, vacío por ahora, en `src/actividades/registro.ts` (depende de T006)
- [X] T008 [P] Crear el componente `Icono` que muestra un icono grande, incluido en la app y sin descargas, en `src/componentes/Icono.tsx`. Usa los iconos que trae Expo dentro de la app y acepta también una imagen propia en `assets/`
- [X] T009 Crear el componente `BotonGrande` (icono y texto, tamaño y contraste del tema, sin límites de tiempo) en `src/componentes/BotonGrande.tsx` (depende de T004, T005, T008)

**Punto de control**: Base lista; las historias pueden empezar.

---

## Fase 3: Historia 1 - Ver las actividades y empezar una (Prioridad: P1) 🎯 MVP

**Objetivo**: Al abrir la app se ve la lista de actividades con icono, nombre y descripción, y al tocar una se abre.

**Prueba independiente**: Abrir la app y comprobar que aparece la lista sin registro, permisos ni tutorial, y que al tocar una actividad se abre (pasos 1, 2, 8, 9, 11 del [quickstart.md](quickstart.md)).

### Pruebas de la historia 1

> Escribirlas primero y comprobar que fallan antes de implementar.

- [X] T010 [P] [US1] Prueba: con varias actividades de ejemplo se muestran todas con icono, nombre y descripción, en `tests/inicio.test.tsx` (FR-001, FR-002, FR-013)
- [X] T011 [P] [US1] Prueba: con una sola actividad se muestra igual que con varias, en `tests/inicio.test.tsx` (FR-005)
- [X] T012 [P] [US1] Prueba: con muchas actividades la lista se puede desplazar y se pueden ver todas, en `tests/inicio.test.tsx` (FR-006)
- [X] T013 [P] [US1] Prueba: al tocar una actividad se abre; no hay pantallas de registro, permisos ni tutorial antes de la lista, en `tests/inicio.test.tsx` (FR-003, FR-004)

### Implementación de la historia 1

- [X] T014 [US1] Crear la pantalla `Inicio` con la lista desplazable de actividades (icono grande, nombre y descripción de una línea) en `src/pantallas/Inicio.tsx` (depende de T004 a T009)
- [X] T015 [US1] Conectar `App.tsx`: al abrir, mostrar `Inicio`; al tocar una actividad, mostrar su contenido; recibir la lista de actividades del registro, para poder inyectar ejemplos en las pruebas, en `App.tsx` (depende de T014)

**Punto de control**: La historia 1 funciona y se prueba sola.

---

## Fase 4: Historia 2 - Volver al inicio desde cualquier actividad (Prioridad: P1)

**Objetivo**: Toda pantalla de actividad muestra siempre el botón "Volver al inicio"; con partida en curso pide confirmación antes de salir.

**Prueba independiente**: Entrar en una actividad, comprobar que el botón está siempre a la vista, volver al inicio, y repetirlo con una partida en curso (pasos 3 a 7, 12 del [quickstart.md](quickstart.md)).

### Pruebas de la historia 2

> Escribirlas primero y comprobar que fallan antes de implementar.

- [X] T016 [P] [US2] Prueba: el botón "Volver al inicio" (con icono y texto) está presente en el marco de la actividad, en `tests/marco-actividad.test.tsx` (FR-007, FR-015)
- [X] T017 [P] [US2] Prueba: sin partida en curso, tocar "Volver al inicio" muestra el inicio sin preguntar, en `tests/marco-actividad.test.tsx` (FR-008)
- [X] T018 [P] [US2] Prueba: con partida en curso, tocar "Volver al inicio" muestra el aviso con "Sí, salir" y "No, seguir jugando", en `tests/marco-actividad.test.tsx` (FR-011)
- [X] T019 [P] [US2] Prueba: "No, seguir jugando" cierra el aviso y la partida sigue como estaba; "Sí, salir" muestra el inicio, en `tests/marco-actividad.test.tsx` (FR-008, FR-012)
- [X] T020 [P] [US2] Prueba: cuando la actividad avisa de que la partida terminó, salir ya no pide confirmación, en `tests/marco-actividad.test.tsx` (contrato, regla 3)

### Implementación de la historia 2

- [X] T021 [US2] Crear `MarcoActividad`: zona fija con el botón "Volver al inicio" (icono de casa y texto), contenido de la actividad debajo, y el aviso de partida en curso que se pasa al contenido, en `src/pantallas/MarcoActividad.tsx` (depende de T009)
- [X] T022 [US2] Añadir al marco el aviso de salida con los botones grandes "Sí, salir" y "No, seguir jugando" (con icono y texto, sin límite de tiempo) en `src/pantallas/MarcoActividad.tsx` (depende de T021)
- [X] T023 [US2] Hacer que `App.tsx` muestre toda actividad dentro de `MarcoActividad` y vuelva a `Inicio` al salir, en `App.tsx` (depende de T015, T022)

**Punto de control**: Las historias 1 y 2 funcionan juntas.

---

## Fase 5: Cierre y comprobaciones transversales

- [X] T024 [P] Prueba de textos: los textos fijos de la app están en español de España y los botones llevan icono y texto, en `tests/textos.test.tsx` (FR-009, FR-014)
- [X] T025 Ejecutar `npm test` y comprobar que todas las pruebas pasan (principio VIII)
- [X] T026 [P] Crear `src/actividades/ejemplos.ts` con dos actividades de ejemplo (icono, nombre, descripción y una partida simple) SOLO para la comprobación manual. No se registran en `registro.ts`; se activan cambiando una sola línea en `App.tsx` y se retiran al terminar, con una nota en el archivo que lo explique (principio III)
- [X] T027 Hacer la comprobación manual de los 13 pasos de [quickstart.md](quickstart.md) en un móvil con una persona no técnica y las actividades de T026, incluido el modo avión. Cronometrar los pasos 2 y 4 (SC-001, SC-004) y repetir 10 veces la prueba de distinguir iconos (SC-007). Al terminar, retirar las actividades de ejemplo (principio IV, SC-001 a SC-008). **Requiere a una persona y un móvil: no la puede hacer el agente.**

---

## Dependencias y orden de ejecución

- **Fase 1 → Fase 2 → Historias**: la preparación va primero; la base común bloquea las historias.
- **Historia 1 (US1)**: empieza tras la Fase 2. No depende de la historia 2.
- **Historia 2 (US2)**: empieza tras la Fase 2. T023 necesita `App.tsx` de T015, por eso se hace después de la historia 1.
- **Cierre**: tras las dos historias.
- Dentro de cada historia: las pruebas se escriben y fallan antes de implementar.

### Oportunidades de paralelismo

- Fase 2: T004, T005, T006 y T008 a la vez; luego T007 y T009.
- Historia 1: T010 a T013 a la vez (mismo archivo: coordinar al escribirlas).
- Historia 2: T016 a T020 a la vez (mismo archivo: coordinar al escribirlas).
- La Fase 4 (T016 a T022) puede avanzar a la vez que la Fase 3 hasta llegar a T023.

## Estrategia de implementación

### Primero el mínimo (solo historia 1)

1. Fase 1 y Fase 2.
2. Fase 3 (historia 1).
3. **Parar y comprobar**: la lista aparece y se abre una actividad.

### Entrega paso a paso

1. Base común → historia 1 → comprobar.
2. Historia 2 → comprobar con la app.
3. Cierre y comprobación manual con una persona no técnica.

## Notas

- `[P]` = archivos distintos y sin dependencias pendientes.
- No se crea ninguna actividad real ni de relleno (principio III): las pruebas usan actividades de ejemplo.
- Con la lista vacía, la spec no define qué se ve; no se construye nada para ello.
- Las actividades reales llegarán en sus propias specs, una por funcionalidad.
- Se hace un commit al terminar cada comando de Spec Kit.
