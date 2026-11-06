# MindTrainer

App móvil (Expo, React Native, TypeScript) para entrenar la memoria de personas mayores con
preguntas y juegos. Proyecto de Spec Kit. Idioma de trabajo y de todo el producto: español de
España.

## Reglas que mandan

Lee [la constitución](.specify/memory/constitution.md) antes de cambiar nada. Resumen:

- **Simplicidad**: entre dos soluciones, la más simple. Es una versión 1; nada de complejidad
  anticipada ni librerías que no hagan falta.
- **Cero alcance fantasma**: no se implementa nada que no esté en la spec. Una idea nueva se
  propone, no se construye.
- **Todo en el teléfono**: sin servidor, hosting ni internet. Sin cuentas ni registro. Ningún
  dato sale del móvil y ninguna clave o secreto va en el código.
- **Personas mayores**: letra de al menos 22 puntos, botones de al menos 64 puntos de alto,
  contraste de al menos 7 a 1, sin límites de tiempo. Los valores viven en `src/tema.ts`.
- **Iconos e imágenes**: muchos, intuitivos, grandes, incluidos en la app y siempre junto al
  texto, nunca en lugar de él.
- **Textos**: todos en español de España, en `src/textos.ts`. Con tildes y signos de apertura.
- **Pruebas básicas y funcionales** por cada juego y tipo de pregunta: reglas, respuesta
  correcta e incorrecta, puntuación y final de partida. Nada exhaustivo, de rendimiento ni de
  aspecto visual. Una funcionalidad no está terminada hasta que sus pruebas pasan.
- **Verificable por una persona no técnica**: cada criterio de éxito se comprueba usando la
  app.

## Comandos

```bash
npm install        # dependencias
npm start          # arrancar la app (Expo)
npm test           # pruebas (Jest + React Native Testing Library)
npm run typecheck  # comprobar tipos
```

## Estructura

```text
App.tsx                      # Decide si se ve el inicio o una actividad
src/
├── actividades/             # tipos.ts (contrato), registro.ts (lista real), ejemplos.ts (solo pruebas a mano)
│   ├── parejas/             # Actividad "Parejas": juego.ts (reglas puras), dibujos.ts y sus pantallas
│   ├── forma-palabra/       # Actividad "Forma la palabra": palabras.ts, juego.ts (reglas puras) y sus pantallas
│   └── sopa-de-letras/      # Actividad "Sopa de letras": sopas.ts (5 sopas fijas), juego.ts (reglas puras) y sus pantallas
├── pantallas/               # Inicio.tsx, MarcoActividad.tsx
├── componentes/             # BotonGrande.tsx, Icono.tsx
├── tema.ts                  # Tamaños y colores accesibles
└── textos.ts                # Textos fijos
tests/                       # *.test.tsx; ayudas.tsx crea actividades de prueba
specs/<nnn-nombre>/          # spec, plan, tareas y quickstart de cada funcionalidad
```

## Cómo añadir una actividad

Cada actividad (juego o tipo de pregunta) tiene su propia spec. Al implementarla:

1. Cumple el contrato de [specs/001-pantalla-inicio/contracts/actividad.md](specs/001-pantalla-inicio/contracts/actividad.md):
   identificador, icono, nombre, descripción y contenido.
2. El contenido avisa con `avisarPartida(true)` al empezar una partida y `avisarPartida(false)`
   al terminarla.
3. No pinta el botón "Volver al inicio": lo pone siempre `MarcoActividad`.
4. Se añade a `src/actividades/registro.ts`.
5. Lleva sus propias pruebas en `tests/`.

## Flujo de Spec Kit

`/speckit-specify` → `/speckit-plan` → `/speckit-tasks` → `/speckit-analyze` →
`/speckit-implement`. Para cambiar las reglas del proyecto: `/speckit-constitution`.

- Una rama por funcionalidad (`001-pantalla-inicio`, …), creada por `/speckit-specify`.
- **Al cerrar cada spec** (tareas hechas, pruebas y comprobación manual pasadas), pregunta
  siempre al usuario si se fusiona la rama en `main`. No fusiones sin su respuesta. La
  siguiente spec debe crearse desde `main` ya actualizado.
- Los hooks de `.specify/extensions.yml` hacen un commit automático al terminar cada comando de
  Spec Kit. No hace falta commitear a mano esos pasos.
- Marca cada tarea de `tasks.md` como hecha al terminarla.
- Las tareas que necesitan a una persona y un móvil (como T027) no las puede hacer el agente:
  déjalas pendientes y avísalo.

## Cosas a tener en cuenta

- Las actividades reales por ahora son "Parejas", "Forma la palabra" y "Sopa de letras". No se inventan actividades de relleno.
- Las pruebas usan `getByTestId(..., { includeHiddenElements: true })` para los iconos, porque
  son decorativos y están ocultos a la accesibilidad a propósito.
- En PowerShell 5.1, `Set-Content -Encoding utf8` añade BOM y rompe los JSON; usa Node para
  reescribirlos.
