# Plan de implementación: Mejora visual de "Diferencias"

**Rama**: `011-mejora-visual-diferencias` | **Fecha**: 2026-11-09 | **Spec**: [spec.md](spec.md)

**Entrada**: especificación en `specs/011-mejora-visual-diferencias/spec.md`

## Resumen

Hoy los dos dibujos de "Diferencias" son rejillas de iconos sueltos sobre fondo crema, y se elige entre 3, 5 o 7 diferencias. La spec pide escenas dibujadas con cuidado, con exactamente 3 diferencias (color, falta, añadido) y sin elegir cuántas.

Enfoque (detalle en [research.md](research.md)): **no se usa ninguna galería externa**. Las escenas se dibujan en la propia app como ilustraciones vectoriales propias (fondo, muebles y objetos con contorno oscuro y colores vivos), con una única librería nueva, `react-native-svg`, que ya forma parte del SDK de Expo. Al ser dibujos propios, tienen un solo estilo, no exigen revisar licencias de terceros y permiten cambiar el color de un objeto con solo cambiar un parámetro. Las reglas del juego (`tocar`, fallo, toques, final) se conservan; solo desaparece el número variable de diferencias.

## Contexto técnico

**Lenguaje/Versión**: TypeScript 6 sobre Expo SDK 58 (React Native 0.88, React 19)

**Dependencias principales**: las actuales, más `react-native-svg` (versión que fija Expo, 15.16.0, instalada con `npx expo install`)

**Almacenamiento**: N/A (nada se guarda)

**Pruebas**: Jest (`jest-expo`) + React Native Testing Library, como hasta ahora

**Plataforma de destino**: Android e iOS con Expo Go o compilación de Expo

**Tipo de proyecto**: app móvil

**Objetivos de rendimiento**: N/A (la constitución no pide pruebas de rendimiento)

**Restricciones**: sin internet, sin descargas, sin límites de tiempo; letra de 22 puntos o más; botones de 64 o más; zonas táctiles de al menos 44 puntos en el móvil más pequeño

**Escala/alcance**: 3 escenas fijas con 3 diferencias cada una; solo afecta a `src/actividades/diferencias/`, su texto y sus pruebas

## Comprobación de la constitución

*Puerta: debe pasar antes de la investigación y se revisa tras el diseño.*

| Principio | Estado | Nota |
|---|---|---|
| I. Simplicidad | Pasa, con una excepción justificada | Una sola dependencia nueva (ver Seguimiento de complejidad). Se elimina código: la elección 3/5/7 y los iconos sueltos. |
| II. Español de España | Pasa | Textos en `src/textos.ts`, con tildes. |
| III. Cero alcance fantasma | Pasa | Solo lo pedido. Quitar 3/5/7 viene de "exactamente 3" y está en las suposiciones de la spec. |
| IV. Verificable por una persona | Pasa | Ver [quickstart.md](quickstart.md). |
| V. Todo en el teléfono | Pasa | Dibujos dentro del código, sin descargas. |
| VI. Datos con respeto | Pasa | No se guarda nada. |
| VII. Personas mayores | Pasa | Letra y botones del tema; sin tiempo; diferencias grandes. |
| VIII. Pruebas básicas | Pasa | Se actualizan las 3 pruebas de Diferencias; nada de aspecto visual. |
| IX. Imágenes intuitivas | Pasa | Dibujos propios, incluidos, sin licencia de terceros; los botones llevan icono y texto. |

**Después del diseño**: se mantiene el resultado. El único punto abierto es la salvedad de licencia de la librería (MIT), explicada en la investigación.

## Estructura del proyecto

### Documentación de esta funcionalidad

```text
specs/011-mejora-visual-diferencias/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
└── tasks.md        # lo crea /speckit-tasks
```

No hay carpeta `contracts/`: el contrato de actividad no cambia y el formato de las escenas es interno (ver `data-model.md`).

### Código fuente

```text
src/actividades/diferencias/
├── objetos.tsx      # NUEVO: biblioteca de dibujos vectoriales (sofá, ventana, lámpara, gato, taza...)
├── escena.ts        # CAMBIA: 3 escenas fijas, 3 cambios cada una (color, falta, sobra); sin Total
├── escenas-fondos.tsx  # NUEVO: fondo de cada escena (pared, suelo, cielo...)
├── Dibujo.tsx       # CAMBIA: dibuja con Svg en lugar de iconos sueltos; mismos círculos de acierto
├── Diferencias.tsx  # CAMBIA: sin pantalla de elegir; la partida empieza al abrir
├── Felicitacion.tsx # CAMBIA mínimo: ya no recibe el total
└── juego.ts         # CAMBIA: sin total variable (siempre 3)
src/textos.ts        # QUITA elegirNumero/tres/cinco/siete; felicitación con 3 fijo
tests/
├── diferencias-escena.test.tsx   # ACTUALIZA: 3 cambios por escena, uno de cada tipo
├── diferencias-juego.test.tsx    # ACTUALIZA: siempre 3
├── diferencias-pantalla.test.tsx # ACTUALIZA: sin elegir; botones con icono y texto
└── ayudas-diferencias.ts         # AJUSTA a las nuevas formas
package.json         # añade react-native-svg
CLAUDE.md            # actualiza la descripción de la carpeta diferencias
```

**Decisión de estructura**: se mantiene la carpeta de la actividad y se añaden dos archivos de dibujo. `ElegirOpcion` se sigue usando en Sopa de letras, así que no se toca.

## Seguimiento de complejidad

| Elemento | Por qué hace falta | Alternativa más simple descartada |
|---|---|---|
| Dependencia `react-native-svg` | Es la única forma de dibujar curvas, contornos y colores cuidados con un solo estilo y poder cambiar el color de un objeto | Solo vistas rectangulares y círculos: los dibujos quedarían toscos, lo contrario de lo pedido. Imágenes PNG: habría que buscar, revisar y recolorear cada una, y mezclarían estilos |
