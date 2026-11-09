# Investigación: spec 009

## 1. Paleta y contraste (RF-009, RF-010)

Contraste calculado con la fórmula de WCAG (la misma de la prueba `inicio-colores`):

| Color del logo | Con texto blanco | Con texto oscuro `#1F2A44` | Decisión |
|----------------|------------------|----------------------------|----------|
| Azul `#2563D6` | 5,48 | 2,60 | Oscurecer a `#1F53B4` (7,11) con texto blanco |
| Naranja `#F2800D` | 2,67 | 5,34 | Mantener el naranja puro con texto casi negro `#111111` (7,08) |
| Verde `#1E9E63` | 3,43 | 4,16 | Oscurecer a `#13653F` (7,09) con texto blanco |
| Magenta `#D6336C` | 4,62 | 3,09 | Oscurecer a `#A32752` (7,07) con texto blanco |
| Gris azulado `#5B6B8C` | 5,35 | 2,67 | Oscurecer a `#4C5974` (7,03) con texto blanco |

- Ningún color puro llega a 7 a 1; con texto blanco hay que oscurecer cuatro de ellos. El naranja oscurecido sería marrón (`#884807`) y perdería el aire del logo; con texto casi negro llega a 7,08 sin tocarlo. Por eso cada juego guarda **fondo y color de texto**.
- Texto general `#1F2A44` sobre el crema `#FFF9F0`: 13,62.
- Los tonos oscurecidos son la mezcla del color del logo con negro, hasta el mínimo que da 7 a 1. Los valores finales los fija y comprueba `tests/tema-contraste.test.tsx`.
- Los colores puros del logo solo aparecen en el logo (imagen) y en el fondo de la tarjeta naranja.

**Alternativas descartadas**: oscurecer también el naranja (pierde la identidad); texto casi negro en todas las tarjetas (no llega a 7 a 1 con azul, verde ni magenta).

## 2. Color de cada juego (RF-012)

Parejas azul, Forma la palabra verde, Sopa de letras naranja, Adivinanzas magenta y Diferencias gris azulado: cuatro de la paleta y el quinto, el gris del logo. Además del color, cada juego se distingue por icono y nombre. El verde de acierto (`#0F5A38`, algo más oscuro que el verde de Forma la palabra para llegar a 7 a 1 sobre el crema) es parecido al de Forma la palabra, pero siempre va con icono o texto. El rojo de las marcas de Diferencias (`#A0001C`) se mantiene.

## 3. Cómo llega el color a todo el juego (RF-013, RF-014)

**Decisión**: un contexto de React (`ColorJuego`) con `{ fondo, texto }`. `MarcoActividad` lo provee con el color de la actividad; `BotonGrande`, `ElegirOpcion` y los componentes de juego lo leen con `useColorJuego()`. Fuera de un juego el valor por defecto es el azul principal.

**Alternativas descartadas**: pasar `color` como propiedad por cada componente (toca unas 15 firmas y es fácil olvidar alguna); un tema global mutable (más complejo).

## 4. Bienvenida sin navegación (RF-001, RF-002)

**Decisión**: `App.tsx` guarda un estado `bienvenidaVista`, falso al abrir. Al pulsar "Empezar" pasa a verdadero y no vuelve a falso hasta cerrar la app. Sin librería de navegación (principio I).

## 5. Logo (RF-003, RF-015)

La app no tiene librería SVG y no se añade una (principio I). **Decisión**: usar un PNG, `assets/logo.png`, recortado con `jimp-compact` (ya está en `node_modules`) de la mitad izquierda de `assets/diseno/logo-presentacion.png`, que ya tiene el fondo crema `#FFF9F0`, igual que la app. Con la misma imagen se regeneran `icon.png`, `splash-icon.png` y el primer plano del icono adaptable (con fondo crema en `app.json`). Se conserva `assets/logo.svg` como fuente.

El recorte mide unos 660 puntos de ancho: de sobra para el logo grande (unos 220) y el pequeño (unos 48). **Alternativa descartada**: dibujar el logo con vistas (los lóbulos recortados por la mitad no son fáciles sin SVG).

## 6. Lista de juegos (RF-005 a RF-008)

**Decisión**: una columna de tarjetas grandes (alto mínimo de unos 120, icono de 72 sobre un círculo blanco, nombre de 28 y descripción de 22). **Alternativa descartada**: dos columnas, porque con 360 puntos de ancho las descripciones de 22 puntos quedarían muy apretadas.

## 7. Iconos de las escenas de Diferencias

Los iconos de `escena.ts` usan la paleta antigua (azul, naranja, verde, morado). Se pasan a los tonos oscurecidos de la nueva; marrones, gris y negro se mantienen por ser neutros. Hay que comprobar que siguen reconociéndose y que las pruebas de escena pasan.
