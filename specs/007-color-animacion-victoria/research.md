# Investigación: Color por actividad y animación de victoria

El contexto técnico no tenía incógnitas abiertas. Solo hay que decidir seis cosas.

## 1. Qué cinco colores

- **Decisión**: Colores oscuros, con contraste calculado contra blanco (fórmula de luminancia
  relativa de WCAG):

  | Actividad | Nombre del color | Valor | Contraste con blanco |
  |-----------|------------------|-------|----------------------|
  | Parejas | azul (el actual `primario`) | `#0B3D91` | 10,04 a 1 |
  | Forma la palabra | verde bosque | `#1B5E20` | 7,87 a 1 |
  | Sopa de letras | morado | `#5B2A86` | 9,90 a 1 |
  | Adivinanzas | marrón | `#7A3E00` | 8,34 a 1 |
  | Diferencias | verde azulado | `#006064` | 7,35 a 1 |

- **Razón**: Los cinco superan 7 a 1 (RF-002). Ninguno es rojo, así que no hay rojo junto a verde
  y no se repite el rojo `#A0001C` de los círculos de "Diferencias" (RF-003). Los dos verdes
  (bosque y azulado) no quedan en posiciones contiguas de la lista y se distinguen por el tono
  (uno tira a amarillo, otro a azul) y por la luminosidad. Aun así el color es solo refuerzo
  (RF-004): el icono y el nombre siguen identificando cada juego.
- **Alternativas descartadas**: Naranja o ámbar claros (no llegan a 7 a 1 con blanco); un rojo
  (choca con los círculos de Diferencias y con verde en daltonismo); colores generados o
  elegibles por la persona (alcance extra, principio III).
- **A confirmar al implementar**: que una persona mire la lista en el móvil y compruebe que los
  cinco se distinguen entre sí (comprobación manual, paso 2 del quickstart). Si alguno no
  convence se cambia por otro que supere 7 a 1; la prueba de contraste lo garantiza.

## 2. Dónde se guarda cada color y cómo lo indica la actividad

- **Decisión**: Los cinco colores se añaden a `tema.colores.actividades` (con nombre por tono:
  `azul`, `verde`, `morado`, `marron`, `verdeAzulado`). `Actividad` gana el campo opcional
  `color?: string` y `registro.ts` lo rellena con `tema.colores.actividades.<tono>`.
- **Razón**: RF-006 pide que los colores vivan junto al resto de colores y que cada actividad
  indique el suyo. El campo es opcional para que una actividad nueva o de prueba no falle
  (RF-007) y para no tocar `tests/ayudas.tsx` ni `ejemplos.ts`.
- **Alternativas descartadas**: Un mapa `id → color` dentro de `Inicio.tsx` (la pantalla tendría
  que conocer cada actividad); colores por posición en la lista (cambian al reordenar).

## 3. Cómo se pinta la tarjeta del inicio

- **Decisión**: La tarjeta pasa a tener el color como **fondo**, con texto blanco
  (`textoSobrePrimario`), icono blanco y borde del mismo color. Sin color usa
  `tema.colores.primario`. Nombre, descripción, icono, tamaños y la etiqueta de accesibilidad no
  cambian.
- **Razón**: Es el cambio más pequeño que hace que cada tarjeta se vea de su color a primera vista
  y mantiene el contraste de 7 a 1 que ya se calcula contra blanco (RF-002). Las tarjetas de
  fondo claro con borde azul de hoy se sustituyen también cuando no hay color, para que todas
  las tarjetas se vean con la misma forma.
- **Alternativas descartadas**: Solo teñir el borde o el icono (más sutil, cuesta distinguir);
  una franja lateral de color (más elementos y más estilos).

## 4. Qué animación y con qué herramienta

- **Decisión**: Fundido de la opacidad del icono de 0 a 1 en **400 ms**, una vez, con `Animated`
  de React Native con el motor de JavaScript (`useNativeDriver: false`: es un solo icono durante 400 ms y así se puede probar, porque en Jest el motor nativo no actualiza el valor). Sin desplazamiento ni cambio de
  tamaño (decisión de la aclaración del 2026-11-09).
- **Razón**: `Animated` ya viene con React Native, así que no hay librerías (RF-013). La opacidad
  es la animación menos mareante. 400 ms está dentro de 300–600 (RF-008) y por debajo de 1
  segundo (CE-005).
- **Alternativas descartadas**: Rebote o crecimiento (descartados en la aclaración);
  `react-native-reanimated` o `lottie` (librerías nuevas, principio I).

## 5. Cómo se respeta "reducir movimiento" y no se bloquea nada

- **Decisión**: `IconoVictoria` consulta `AccessibilityInfo.isReduceMotionEnabled()` al montarse.
  Si está activado, pone la opacidad en 1 y no anima. Si no, anima el fundido. Solo el icono va
  dentro del `Animated.View`; el mensaje, los toques o puntos y los botones se pintan fuera, ya
  visibles, y los botones reciben toques desde el primer instante (RF-010, CE-006). Si la
  pantalla se desmonta durante el fundido, se para la animación.
- **Razón**: La consulta es una llamada que ya trae React Native; no hace falta ajuste propio ni
  estado global. Al ir la animación solo en el icono, es imposible que retrase o tape un botón.
- **Alternativas descartadas**: Escuchar el cambio del ajuste mientras la pantalla está abierta
  (complejidad sin valor: la pantalla final dura segundos); un ajuste propio de la app
  (alcance extra).

## 6. Cómo se desactiva en las pruebas

- **Decisión**: `src/animacion.ts` exporta `animacion = { activa: process.env.NODE_ENV !== 'test' }`.
  Con `activa` en falso, `IconoVictoria` muestra el icono ya visible, sin consultar nada ni
  crear animaciones, así que las pruebas actuales de las cinco pantallas finales siguen igual.
  Solo `tests/icono-victoria.test.tsx` pone `animacion.activa = true` para comprobar el fundido,
  con temporizadores simulados de Jest, y lo restaura al terminar.
- **Razón**: RF-014 pide poder desactivarla en pruebas. Un objeto con un campo es lo más simple y
  no necesita configuración de Jest. Evita avisos de actualizaciones fuera de `act` por la
  consulta asíncrona de "reducir movimiento".
- **Alternativas descartadas**: Simular `Animated` en todos los tests con un archivo de
  configuración de Jest (más piezas); no desactivar nada (pruebas frágiles).
