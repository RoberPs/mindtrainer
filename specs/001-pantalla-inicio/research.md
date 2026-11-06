# Investigación: Pantalla de inicio de MindTrainer

No quedaba ninguna aclaración abierta en la spec. Estas son las decisiones técnicas que la spec
no fijaba. Todas se pueden cambiar antes de `/speckit-tasks`.

## D1. Tecnología de la app

- **Decisión**: Expo con React Native y TypeScript.
- **Motivo**: Un único código para Android e iOS, funciona dentro del móvil sin servidor y tiene
  herramientas de pruebas maduras. Encaja con los principios I y V.
- **Alternativas descartadas**: Apps nativas separadas (doble trabajo, contra el principio I);
  web instalable (depende más del navegador y de cómo se publique).

## D2. Navegación

- **Decisión**: Sin librería de navegación. Un estado en `App.tsx` indica si se ve el inicio o
  una actividad.
- **Motivo**: Solo hay dos destinos. Una librería añadiría complejidad anticipada (principio I).
- **Alternativas descartadas**: React Navigation o Expo Router; se reconsiderarán si aparecen
  más pantallas y la spec lo pide.

## D3. Botón "Volver al inicio" siempre visible

- **Decisión**: Un marco común (`MarcoActividad`) envuelve a toda actividad y fija el botón en
  una zona que no se desplaza.
- **Motivo**: Garantiza FR-007 en todas las actividades sin que cada una tenga que acordarse.
- **Alternativas descartadas**: Que cada actividad pinte su propio botón (se puede olvidar).

## D4. Saber si hay partida en curso

- **Decisión**: Cada actividad avisa al marco con una función cuando empieza y termina una
  partida (ver [contrato](contracts/actividad.md)). El marco pide confirmación solo si hay una
  en curso.
- **Motivo**: Es lo más simple que cumple FR-011 y FR-012.
- **Alternativas descartadas**: Pedir confirmación siempre (molesta sin partida); estado global
  compartido (más complejo).

## D5. Lista de actividades

- **Decisión**: Un archivo de registro dentro de la app con las actividades. Empieza vacío.
  Las pruebas inyectan actividades de ejemplo.
- **Motivo**: Principio III: esta spec no define ninguna actividad real, así que no se inventa
  ninguna ni siquiera de relleno. Los principios V y VI: nada sale del teléfono.
- **Consecuencia**: Hasta que se especifique la primera actividad, la app mostrará la lista
  vacía. La spec no define qué se ve en ese caso, y no se construye nada para ello.

## D6. Accesibilidad

- **Decisión**: Un archivo `tema.ts` con tamaños de letra grandes, colores de alto contraste y
  tamaño mínimo de botón; todas las pantallas lo reutilizan.
- **Motivo**: Principio VII en un solo sitio, fácil de ajustar.
- **Alternativas descartadas**: Estilos sueltos por pantalla.

## D7. Iconos e imágenes

- **Decisión**: Los iconos e imágenes van incluidos dentro de la app: los iconos de uso común
  (casa, aceptar, cancelar) con los que trae Expo (licencia libre) y las imágenes propias de
  cada actividad como archivos en `assets/`, con licencia que permita usarlos. Un componente `Icono` los muestra siempre grandes y junto a
  su texto.
- **Motivo**: FR-013 a FR-016 y principio V: se ven sin internet y no se descarga nada.
- **Alternativas descartadas**: Descargarlos de internet (contra el principio V); iconos solo de
  texto o emojis (se ven distinto según el móvil y no garantizan contraste ni tamaño).

## D8. Pruebas

- **Decisión**: Jest y React Native Testing Library, con pruebas funcionales de comportamiento.
  Sin pruebas de aspecto visual ni de rendimiento.
- **Motivo**: Principio VIII.
- **Nota**: Las pruebas automáticas no sustituyen la comprobación manual del
  [quickstart](quickstart.md) hecha por una persona no técnica (principio IV).
