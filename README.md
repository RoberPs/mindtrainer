<p align="center">
  <img src="assets/logo.png" alt="Logo de MindTrainer" width="160">
</p>

<h1 align="center">MindTrainer</h1>

<p align="center">
  App móvil para entrenar la memoria de personas mayores con cinco juegos sencillos.<br>
  Sin internet, sin cuentas y sin prisas: todo ocurre dentro del teléfono.
</p>

<p align="center">
  <a href="https://github.com/RoberPs/mindtrainer/actions/workflows/ci.yml"><img alt="CI" src="https://github.com/RoberPs/mindtrainer/actions/workflows/ci.yml/badge.svg"></a>
  <img alt="Expo SDK 58" src="https://img.shields.io/badge/Expo-SDK%2058-000020?logo=expo">
  <img alt="React Native 0.88" src="https://img.shields.io/badge/React%20Native-0.88-61DAFB?logo=react">
  <img alt="TypeScript strict" src="https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript">
  <img alt="Licencia MIT" src="https://img.shields.io/badge/licencia-MIT-green">
</p>

## Capturas

| Bienvenida | Inicio | Parejas | Forma la palabra |
|:---:|:---:|:---:|:---:|
| <img src="docs/capturas/bienvenida.png" width="180" alt="Pantalla de bienvenida"> | <img src="docs/capturas/inicio.png" width="180" alt="Lista de juegos"> | <img src="docs/capturas/parejas.png" width="180" alt="Juego de parejas"> | <img src="docs/capturas/forma-palabra.png" width="180" alt="Juego de formar la palabra"> |

| Sopa de letras | Adivinanzas | Diferencias | Victoria |
|:---:|:---:|:---:|:---:|
| <img src="docs/capturas/sopa-de-letras.png" width="180" alt="Sopa de letras"> | <img src="docs/capturas/adivinanzas.png" width="180" alt="Adivinanzas"> | <img src="docs/capturas/diferencias.png" width="180" alt="Juego de las diferencias"> | <img src="docs/capturas/victoria.png" width="180" alt="Pantalla final de una partida"> |

## Los juegos

| Juego | En qué consiste |
|---|---|
| **Parejas** | Encontrar las cartas iguales. Tres tamaños de partida: 6, 8 o 12 cartas. |
| **Forma la palabra** | Ordenar letras desordenadas. 5 palabras por partida, elegidas de más de 100 palabras cotidianas. |
| **Sopa de letras** | Encontrar palabras escondidas en cuadrículas pequeñas y medianas. |
| **Adivinanzas** | Elegir la respuesta entre varias opciones. 5 por partida, de un banco de 50. |
| **Diferencias** | Encontrar las 3 diferencias entre dos dibujos. 6 ambientes (salón, cocina, jardín, dormitorio, playa y granja) compuestos al azar en cada partida. |

## Diseñada para personas mayores

La accesibilidad no es un añadido: son reglas del proyecto, y algunas las comprueban pruebas
automáticas.

- **Letra de al menos 22 puntos y botones de al menos 64 puntos de alto**, centralizados en
  [`src/tema.ts`](src/tema.ts).
- **Contraste de al menos 7 a 1** (nivel AAA de WCAG) en todos los pares de texto y fondo.
  Lo verifica [`tests/tema-contraste.test.tsx`](tests/tema-contraste.test.tsx).
- **Sin límites de tiempo** ni penalizaciones: cada persona va a su ritmo.
- **Iconos siempre junto al texto**, nunca en su lugar, y un color propio para cada juego.
- **Respeta "reducir movimiento"**: la única animación de la app (la de victoria) se adapta.

## Privacidad por diseño

- Sin servidor, sin cuentas y sin análisis de uso. Ningún dato sale del teléfono.
- El APK de Android **no pide ningún permiso**: internet, cámara, micrófono, ubicación,
  contactos y almacenamiento están bloqueados de forma explícita en [`app.json`](app.json).
- Funciona completa en modo avión.

## Tecnología

- **Expo SDK 58**, **React Native 0.88**, **React 19** y **TypeScript** en modo `strict`.
- Dibujos vectoriales propios con `react-native-svg`; ninguna imagen se descarga.
- **645 pruebas** con Jest y React Native Testing Library: reglas, aciertos, fallos,
  puntuación y final de partida de cada juego. La lógica de cada juego está en funciones
  puras (`juego.ts`), separadas de las pantallas, para probarla de forma aislada.
- Compilación del APK con **EAS Build**.

## Cómo se ha construido

El proyecto sigue un flujo de **desarrollo guiado por especificaciones** con
[Spec Kit](https://github.com/github/spec-kit):

1. Una [constitución](.specify/memory/constitution.md) con los principios que mandan sobre
   todo lo demás: simplicidad, cero alcance no especificado, privacidad y accesibilidad.
2. Cada funcionalidad pasa por **especificación → plan → tareas → implementación**, en su
   propia rama. Las 12 están en [`specs/`](specs/), con su guía de comprobación manual.
3. Cada criterio de éxito puede comprobarlo una persona no técnica usando la app.

La implementación se ha hecho con ayuda de **Claude Code** (los commits lo indican con
`Co-Authored-By`). Las especificaciones, las decisiones de producto y la comprobación con la
app son trabajo propio. La configuración del agente está en [`CLAUDE.md`](CLAUDE.md) y
[`.claude/`](.claude/).

## Probarla

### En Android, sin instalar nada más

Descarga el APK de la sección *Releases* y sigue la
[guía de instalación](docs/instalar-android.md) (Android 7.0 o superior).

### Desde el código

Necesitas [Node.js](https://nodejs.org) y la app **Expo Go** en el móvil.

```bash
npm install        # dependencias
npm start          # arranca la app; escanea el código QR con Expo Go
npm test           # pruebas automáticas
npm run typecheck  # comprobación de tipos
```

Para generar el APK: [docs/generar-apk.md](docs/generar-apk.md).

## Estructura

```text
App.tsx              Decide qué pantalla se ve: bienvenida, lista de juegos o un juego
src/
├── actividades/     Un juego por carpeta: reglas puras (juego.ts), contenido y pantallas
├── pantallas/       Bienvenida, inicio y el marco común de cada juego
├── componentes/     Botones, iconos y piezas compartidas
├── tema.ts          Tamaños y colores accesibles
└── textos.ts        Todos los textos de la app
tests/               Pruebas de cada juego y de las reglas de accesibilidad
specs/               Especificación, plan y tareas de cada funcionalidad
docs/                Guías para generar e instalar el APK
```

## Licencia

[MIT](LICENSE). Usa `react-native-svg` (MIT) y los iconos de `@expo/vector-icons`
(Apache 2.0), que conservan sus propias licencias.
