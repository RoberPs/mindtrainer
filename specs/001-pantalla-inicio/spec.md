# Especificación de funcionalidad: Pantalla de inicio de MindTrainer

**Rama de funcionalidad**: `001-pantalla-inicio`

**Creada**: 2026-11-06

**Estado**: Borrador

**Entrada**: Pantalla de inicio de MindTrainer. Usuarios: personas mayores que usan el móvil con poca soltura y sin ayuda. Problema: al abrir la app tienen que saber qué hacer sin leer instrucciones ni buscar menús.

## Escenarios de usuario y pruebas *(obligatorio)*

### Historia de usuario 1 - Ver las actividades y empezar una (Prioridad: P1)

Una persona mayor abre la app y ve de inmediato la lista de actividades disponibles. Cada actividad muestra su nombre y una descripción de una línea. Toca una y empieza. No hay registro, permisos ni tutorial previos.

**Por qué esta prioridad**: Es la puerta de entrada a todo el producto. Sin ella, la persona no sabe qué hacer al abrir la app.

**Prueba independiente**: Abrir la app en un móvil sin haberla usado nunca. Se comprueba que aparece la lista y que, al tocar una actividad, esta se abre sin ninguna pantalla intermedia.

**Escenarios de aceptación**:

1. **Dado** que la persona abre la app por primera vez, **cuando** termina de cargar, **entonces** ve la lista de actividades, cada una con su nombre y una descripción de una línea.
2. **Dado** que ve la lista de actividades, **cuando** toca una de ellas, **entonces** se abre esa actividad.
3. **Dado** que la persona abre la app por primera vez, **cuando** aparece la pantalla de inicio, **entonces** no se le pide registro ni permisos y no se le muestra ningún tutorial antes de la lista.

---

### Historia de usuario 2 - Volver al inicio desde cualquier actividad (Prioridad: P1)

Una persona que está dentro de una actividad puede volver a la pantalla de inicio en cualquier momento con un botón siempre visible, llamado "Volver al inicio".

**Por qué esta prioridad**: Sin una salida clara, la persona se queda atrapada o perdida dentro de una actividad. Es lo que le da seguridad para probar.

**Prueba independiente**: Entrar en cualquier actividad, recorrer sus pantallas y comprobar que en todas hay un botón "Volver al inicio" a la vista. Tocarlo y comprobar que aparece la pantalla de inicio.

**Escenarios de aceptación**:

1. **Dado** que la persona está en cualquier pantalla de una actividad, **cuando** mira la pantalla, **entonces** ve el botón "Volver al inicio" sin tener que desplazarse ni abrir ningún menú.
2. **Dado** que la persona está en una actividad, **cuando** toca "Volver al inicio", **entonces** ve la pantalla de inicio con la lista de actividades.

---

### Casos límite

- Si hay una sola actividad, se muestra igual que si hubiera varias: dentro de la lista, con su nombre y su descripción.
- Cuando se añaden más actividades, la lista las muestra todas, desplazándose si no caben en la pantalla.
- Si la persona toca "Volver al inicio" con una partida en curso, la app pide confirmación antes de salir: un aviso claro ("¿Seguro que quieres salir? Perderás la partida") con dos botones grandes, "Sí, salir" y "No, seguir jugando". Si elige salir, ve la pantalla de inicio; si elige seguir, continúa la partida donde estaba. Sin partida en curso, se vuelve al inicio directamente.

## Requisitos *(obligatorio)*

### Requisitos funcionales

- **FR-001**: Al abrir la app, la primera pantalla que se ve es la pantalla de inicio con la lista de actividades.
- **FR-002**: Cada actividad de la lista MUST mostrar su nombre y una descripción de una línea.
- **FR-003**: La persona MUST poder abrir una actividad tocándola en la lista, con un solo toque.
- **FR-004**: La app NO MUST pedir registro, permisos ni mostrar tutorial antes de la pantalla de inicio.
- **FR-005**: Con una sola actividad, la lista MUST mostrarse con el mismo aspecto que con varias.
- **FR-006**: Si hay más actividades de las que caben en pantalla, la lista MUST permitir desplazarse para verlas todas.
- **FR-007**: Cada pantalla de cada actividad MUST mostrar un botón "Volver al inicio" siempre visible, sin necesidad de desplazarse ni de abrir menús.
- **FR-008**: Al tocar "Volver al inicio", la app MUST mostrar la pantalla de inicio.
- **FR-009**: Todos los textos de la pantalla de inicio y del botón MUST estar en español de España.
- **FR-010**: La pantalla de inicio y el botón MUST cumplir las pautas para personas mayores de la constitución: letra grande, contraste alto, botones grandes y sin límite de tiempo.
- **FR-011**: Al tocar "Volver al inicio" con una partida en curso, la app MUST pedir confirmación antes de salir, con los botones grandes "Sí, salir" y "No, seguir jugando". Sin límite de tiempo para responder.
- **FR-012**: Si la persona elige "No, seguir jugando", la partida MUST continuar exactamente donde estaba.

### Entidades clave

- **Actividad**: Cada una de las cosas que la persona puede hacer en la app (un juego o un tipo de pregunta). Tiene un nombre y una descripción de una línea.

## Criterios de éxito *(obligatorio)*

### Resultados medibles

- **SC-001**: Una persona mayor que abre la app por primera vez, sin ayuda, empieza una actividad en menos de 30 segundos desde que aparece la pantalla de inicio.
- **SC-002**: Al abrir la app por primera vez, se llega a la lista de actividades sin ninguna pantalla intermedia: 0 pantallas de registro, permisos o tutorial.
- **SC-003**: En el 100 % de las pantallas de actividad, el botón "Volver al inicio" está a la vista sin desplazarse.
- **SC-004**: Una persona mayor que ha entrado en una actividad vuelve a la pantalla de inicio con un solo toque, sin ayuda, en menos de 10 segundos.
- **SC-005**: Con 1 actividad y con 10 actividades, todas se pueden ver y abrir desde la pantalla de inicio.
- **SC-006**: Una persona no técnica puede comprobar cada criterio anterior usando solo la app, sin leer código.

## Fuera de alcance

Cuentas, perfil, ajustes, estadísticas, favoritos, recordatorios y buscador.

## Supuestos

- Las personas usuarias manejan el móvil con poca soltura y no cuentan con ayuda.
- La lista de actividades no depende de internet: está disponible siempre que se abre la app (constitución, principio V).
- El orden de las actividades en la lista lo decide la spec de cada actividad; esta funcionalidad solo las muestra.
- Las actividades concretas (nombre, descripción, reglas) se especifican por separado; esta funcionalidad no las define.
- No se guarda ningún dato de la persona para mostrar la pantalla de inicio.
