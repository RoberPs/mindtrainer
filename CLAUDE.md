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
- **Color por juego**: cada juego tiene su color (fondo y texto, en `tema.colores.actividades`) y lo usa en todos sus botones y elementos mediante `useColorJuego()`. Texto sobre el crema: siempre `tema.colores.texto`. Todo par texto/fondo, 7 a 1 (lo comprueba `tests/tema-contraste.test.tsx`).
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
App.tsx                      # Decide si se ve la bienvenida, la lista de juegos o una actividad
src/
├── actividades/             # tipos.ts (contrato), registro.ts (lista real), ejemplos.ts (solo pruebas a mano)
│   ├── parejas/             # Actividad "Parejas": juego.ts (reglas puras), dibujos.ts (12 dibujos, cada uno con su color en tema.colores.dibujos) y sus pantallas (dorso común con cerebro)
│   ├── forma-palabra/       # Actividad "Forma la palabra": palabras.ts, juego.ts (reglas puras) y sus pantallas
│   ├── sopa-de-letras/      # Actividad "Sopa de letras": sopas.ts (5 pequeñas y 3 medianas, fijas), juego.ts (reglas puras) y sus pantallas
│   ├── adivinanzas/         # Actividad "Adivinanzas": banco.ts (50 adivinanzas), juego.ts (reglas puras) y sus pantallas
│   └── diferencias/         # Actividad "Diferencias": escena.ts (tipos de las escenas), objetos.tsx (estilo común de los dibujos), composicion.ts (compone al azar la escena de cada partida) y escenas/ (6 ambientes: Salón, Cocina, Jardín, Dormitorio, Playa y Granja, con sus objetos dibujados con react-native-svg; cada escena tiene 3 diferencias: color, falta y añadido), juego.ts (reglas puras, siempre 3 diferencias) y sus pantallas
├── pantallas/               # Bienvenida.tsx (logo y botón Empezar), Inicio.tsx (tarjetas grandes de juegos), MarcoActividad.tsx (da su color al juego)
├── componentes/             # BotonGrande.tsx, ColorJuego.tsx (contexto del color del juego), Icono.tsx, ElegirOpcion.tsx (pantalla de elegir de Sopa de letras), IconoVictoria.tsx (icono de las pantallas finales, con fundido)
├── animacion.ts             # Interruptor de la animación de victoria (apagada en pruebas) y su duración
├── tema.ts                  # Tamaños y colores accesibles (paleta del logo: crema, azul, verde, naranja, magenta y gris azulado; un color por actividad)
└── textos.ts                # Textos fijos
tests/                       # *.test.tsx; ayudas.tsx crea actividades de prueba
specs/<nnn-nombre>/          # spec, plan, tareas y quickstart de cada funcionalidad
```

## Cómo añadir una actividad

Cada actividad (juego o tipo de pregunta) tiene su propia spec. Al implementarla:

1. Cumple el contrato de [specs/001-pantalla-inicio/contracts/actividad.md](specs/001-pantalla-inicio/contracts/actividad.md)
   y [specs/009-bienvenida-seleccion-juegos/contracts/actividad-color.md](specs/009-bienvenida-seleccion-juegos/contracts/actividad-color.md):
   identificador, icono, nombre, descripción, contenido y, opcional, su color y el color de su texto
   (`tema.colores.actividades`; distinto del de las demás y con contraste de 7 a 1).
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
- Las mejoras que se observen al probar los juegos a mano se anotan en
  [specs/ideas-pendientes.md](specs/ideas-pendientes.md). No se construyen: se recogen en la
  última spec del proyecto. Antes de cerrar cada spec, pregunta si hay observaciones nuevas.
- Las tareas que necesitan a una persona y un móvil (como T027) no las puede hacer el agente:
  déjalas pendientes y avísalo.

## Cosas a tener en cuenta

- Los dibujos de "Diferencias" son propios (vectoriales, con `react-native-svg`, licencia MIT): no se descarga ninguna imagen. Esa librería, como los iconos de `@expo/vector-icons` (Apache 2.0), pide conservar su aviso al redistribuir el código; la persona responsable debe aceptarlo de forma expresa.
- Las actividades reales por ahora son "Parejas", "Forma la palabra", "Sopa de letras", "Adivinanzas" y "Diferencias". No se inventan actividades de relleno.
- Las pruebas usan `getByTestId(..., { includeHiddenElements: true })` para los iconos, porque
  son decorativos y están ocultos a la accesibilidad a propósito.
- La pantalla final de cada actividad usa `IconoVictoria` (fundido de 900 ms, una sola vez, respeta
  "reducir movimiento"). Es la única animación de la app; no se animan los aciertos ni el inicio.
- En PowerShell 5.1, `Set-Content -Encoding utf8` añade BOM y rompe los JSON; usa Node para
  reescribirlos.
