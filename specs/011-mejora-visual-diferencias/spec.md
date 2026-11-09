# Especificación de la funcionalidad: Mejora visual de "Diferencias"

**Rama**: `011-mejora-visual-diferencias`

**Creada**: 2026-11-09

**Estado**: Borrador

**Entrada**: Mejora visual de la actividad "Diferencias" (proyecto existente). Las imágenes y los botones tienen un aspecto genérico; se quieren escenas dibujadas con cuidado y claras, sin cambiar cómo se juega. Se pregunta si se puede usar una galería de imágenes gratuita para sustituir los iconos por imágenes.

## Escenarios de usuario y pruebas *(obligatorio)*

### Historia 1 - Dos dibujos grandes, nítidos y con colores vivos (Prioridad: P1)

Una persona mayor abre "Diferencias" y ve dos dibujos de la misma escena, uno encima del otro o uno junto al otro, del mismo tamaño y bien alineados, con líneas nítidas y colores vivos. Los dos caben completos en la pantalla sin necesidad de acercar.

**Por qué esta prioridad**: si los dibujos son poco claros, comparar y encontrar diferencias resulta pesado y quita ganas de jugar. Es el problema central.

**Prueba independiente**: empezar una partida en un móvil y comprobar que se ven los dos dibujos enteros, iguales en tamaño, alineados y reconocibles sin acercar.

**Escenarios de aceptación**:

1. **Dado** una partida recién empezada, **cuando** se mira la pantalla, **entonces** se ven los dos dibujos completos, con el mismo tamaño y alineados entre sí.
2. **Dado** cualquier escena, **cuando** se miran los objetos que la componen, **entonces** cada uno se reconoce a primera vista, con líneas nítidas y colores vivos, y todos comparten un mismo estilo de dibujo.

---

### Historia 2 - Exactamente 3 diferencias, grandes y evidentes (Prioridad: P1)

En cada partida hay exactamente 3 diferencias entre los dos dibujos, de tres clases distintas: un objeto que cambia de color, un objeto que falta y un objeto añadido. Son grandes y evidentes. La persona marca cada una tocando justo donde se ve.

**Por qué esta prioridad**: es lo que hace el juego jugable y justo: ni más diferencias de las anunciadas ni diferencias dudosas.

**Prueba independiente**: jugar una partida entera tocando las 3 diferencias; comprobar que cada toque encima de una diferencia la marca, que al marcar la tercera termina la partida y que no queda ninguna diferencia más por encontrar.

**Escenarios de aceptación**:

1. **Dado** cualquier escena, **cuando** se comparan los dos dibujos, **entonces** hay exactamente 3 diferencias: un cambio de color, un objeto que falta y un objeto añadido.
2. **Dado** una diferencia sin marcar, **cuando** se toca justo donde se ve, **entonces** queda marcada como acierto.
3. **Dado** que se han marcado las 3 diferencias, **cuando** se marca la última, **entonces** termina la partida y no queda ninguna diferencia más.

---

### Historia 3 - Partidas distintas, composiciones distintas (Prioridad: P2)

Al jugar varias partidas seguidas, cada una muestra una composición distinta: otro lugar, otros objetos y otras diferencias. Hay al menos 6 lugares (ambientes) y al menos 30 composiciones posibles, elegidas al azar, de modo que no se repiten las mismas cada 2 o 3 partidas.

**Por qué esta prioridad**: aporta variedad, pero el juego es usable con una sola escena.

**Prueba independiente**: jugar 10 partidas seguidas y comprobar que cada una es distinta de las demás y que el lugar nunca se repite en dos partidas seguidas.

**Escenarios de aceptación**:

1. **Dado** varias partidas seguidas, **cuando** se comparan las escenas que salen, **entonces** cada una tiene objetos y diferencias distintos de las demás y el lugar cambia siempre de una partida a la siguiente.

---

### Historia 4 - Botones con icono grande junto al texto (Prioridad: P2)

Los botones "Jugar otra vez" y "Volver al inicio" de "Diferencias" llevan un icono grande junto al texto.

**Por qué esta prioridad**: mejora la comprensión y la coherencia con el resto de la app, pero no impide jugar.

**Prueba independiente**: terminar una partida y comprobar que los dos botones muestran icono y texto a la vez.

**Escenarios de aceptación**:

1. **Dado** cualquiera de los dos botones dentro de "Diferencias", **cuando** se muestra, **entonces** enseña un icono grande y su texto a la vez, con el texto legible.

---

### Casos límite

- Ninguna diferencia se confunde con un detalle propio del dibujo: lo que cambia entre los dos dibujos es siempre una de las 3 diferencias, y los detalles que aparecen en ambos son idénticos en los dos.
- Tocar fuera de una diferencia sigue contando como fallo, y tocar una diferencia ya marcada no cuenta como fallo ni como acierto nuevo, como hasta ahora.
- Las reglas, el aviso al acertar o fallar y la puntuación no cambian.
- Los dibujos se ven completos y alineados en móviles pequeños y grandes, y también con letra del sistema ampliada.

## Requisitos *(obligatorio)*

### Requisitos funcionales

- **FR-001**: La partida DEBE mostrar dos dibujos de la misma escena, del mismo tamaño y alineados, completos en pantalla sin acercar.
- **FR-002**: Los dibujos DEBEN ser nítidos, de colores vivos y de un mismo estilo, y cada objeto DEBE poder reconocerse a primera vista.
- **FR-003**: Cada partida DEBE tener exactamente 3 diferencias: un objeto de otro color, un objeto que falta y un objeto añadido. No DEBE haber ninguna diferencia más entre los dos dibujos.
- **FR-004**: Cada diferencia DEBE ser grande y evidente, y DEBE poder marcarse tocando justo donde se ve.
- **FR-005**: Los detalles propios del dibujo DEBEN ser idénticos en los dos dibujos, para que no se confundan con diferencias.
- **FR-006**: DEBE haber al menos 6 ambientes (lugares) distintos y al menos 30 composiciones posibles. La composición se elige al azar al empezar cada partida: el ambiente NO DEBE repetirse en dos partidas seguidas y cambian también los objetos, los colores de fondo y cuáles son las 3 diferencias.
- **FR-007**: Los botones "Jugar otra vez" y "Volver al inicio" de "Diferencias" DEBEN mostrar un icono grande junto al texto, con texto legible.
- **FR-008**: Las reglas, el aviso al acertar o fallar, la puntuación y el color propio del juego NO DEBEN cambiar. Los textos mantienen el contraste de 7 a 1 y el tamaño mínimo del proyecto.
- **FR-009**: Todo el material gráfico nuevo DEBE estar incluido en la app (sin descargas ni internet) y tener una licencia que permita usarlo sin pagar, sin dar crédito, sin crear una cuenta y sin heredar una licencia.
- **FR-010**: Los cambios afectan solo a "Diferencias"; las demás actividades no cambian.

### Entidades clave

- **Ambiente**: un lugar (Salón, Cocina, Jardín, Dormitorio, Playa, Granja) con su fondo y un catálogo de objetos propios.
- **Escena**: composición concreta de una partida: un ambiente con unos objetos colocados al azar, que se muestra en dos versiones (con y sin las 3 diferencias).
- **Diferencia**: cambio entre los dos dibujos de una escena, de una de tres clases (color, falta, añadido), con la zona donde se marca.
- **Material gráfico**: imágenes de la app con licencia sin condiciones.

## Criterios de éxito *(obligatorio)*

### Resultados medibles

- **SC-001**: En una partida, el 100 % de las veces se ven los dos dibujos completos, con el mismo tamaño y alineados, sin acercar.
- **SC-002**: En cada escena hay exactamente 3 diferencias, y una persona que juega la escena entera encuentra las 3 y no halla ninguna más.
- **SC-003**: Una persona mayor localiza cada una de las 3 diferencias a simple vista, sin ayuda, en cada escena.
- **SC-004**: En 10 partidas seguidas, las 10 composiciones son distintas entre sí y el ambiente nunca se repite en dos partidas seguidas; en total hay al menos 30 composiciones posibles.
- **SC-005**: Los dos botones ("Jugar otra vez", "Volver al inicio") muestran icono y texto a la vez el 100 % de las veces que aparecen en "Diferencias".
- **SC-006**: Las reglas, el aviso al acertar o fallar y la puntuación se comportan igual que antes; las pruebas existentes de "Diferencias" que sigan valiendo siguen pasando.
- **SC-007**: No se necesita pagar, dar crédito, crear una cuenta ni aceptar una licencia heredada para usar ningún material gráfico de la app.

## Suposiciones

- **Pregunta sobre galerías gratuitas**: sí, se pueden usar imágenes de una galería gratuita, pero solo las que estén en dominio público (por ejemplo, CC0) y se copien dentro de la app. Las galerías que exigen citar al autor, tienen cuenta o mezclan licencias quedan descartadas. La elección concreta y la comprobación de licencia de cada imagen se hacen al planificar. Si no hay material adecuado y con el mismo estilo, se dibujan las escenas con formas propias de la app.
- **Mismo estilo**: es más importante que todos los objetos de una escena compartan estilo que el origen de cada imagen; mezclar estilos no se admite.
- **Solo 3 diferencias**: la petición fija exactamente 3 diferencias por escena y por partida. Por tanto, desaparece la elección actual de 3, 5 o 7 diferencias (spec 008) y la partida empieza directamente. Es el único cambio de reglas, pedido de forma expresa; el resto del juego no cambia.
- **Cambio de color**: el mismo objeto aparece en los dos dibujos con un color claramente distinto (no un tono parecido).
- **Más variedad (petición posterior)**: se pidió más variedad (unas 20 o 30 composiciones, más aleatorias) y al menos el doble de ambientes que los 3 iniciales. Se resuelve con 6 ambientes y composición al azar de objetos, colores y diferencias en cada partida, en lugar de dibujar una escena fija para cada composición. Las escenas fijas anteriores se sustituyen por este sistema.
- El color propio de "Diferencias" se mantiene para botones y elementos, como hasta ahora.
- Que los dibujos se vean "nítidos y vivos" y las diferencias "evidentes" lo comprueba una persona con un móvil; el agente no puede darlo por hecho.

## Fuera de alcance

Zoom, pistas, nuevas reglas, animaciones, sonidos, pantalla de créditos y cambios en otras actividades.
