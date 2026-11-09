# Especificación de la funcionalidad: Mejora visual de "Parejas"

**Rama**: `010-mejora-visual-parejas`

**Creada**: 2026-11-09

**Estado**: Borrador

**Entrada**: Mejora visual de la actividad "Parejas" (proyecto existente). Las cartas, el dorso y los botones tienen un aspecto genérico y poco atractivo; se quiere un aspecto cuidado y coherente, sin cambiar cómo se juega. Se propone usar material gráfico gratuito de Openclipart o de Kenney (Board Game Icons y otros packs).

## Escenarios de usuario y pruebas *(obligatorio)*

### Historia 1 - Dibujos claros y del mismo estilo (Prioridad: P1)

Una persona mayor juega a "Parejas" y ve en cada carta descubierta un dibujo de un objeto cotidiano que reconoce sin dudar. Todos los dibujos comparten estilo (mismo trazo, misma forma de colorear) y ninguno se confunde con otro.

**Por qué esta prioridad**: los dibujos poco claros o poco agradables restan ganas de jugar y dificultan reconocer las cartas; es el problema central.

**Prueba independiente**: jugar una partida de 6, otra de 8 y otra de 12 cartas y descubrir todas las cartas; comprobar que cada dibujo se reconoce a primera vista y que no hay dos que se parezcan.

**Escenarios de aceptación**:

1. **Dado** una partida de 6, 8 o 12 cartas, **cuando** se descubren todas las cartas, **entonces** cada una muestra un dibujo de un objeto cotidiano reconocible, junto a su nombre escrito.
2. **Dado** los dibujos de una partida, **cuando** se comparan entre sí, **entonces** todos tienen el mismo estilo y ningún par de dibujos distintos se confunde.

---

### Historia 2 - Dorso inconfundible (Prioridad: P1)

La persona distingue a simple vista una carta boca abajo de una descubierta, porque todas las cartas boca abajo tienen el mismo dorso cuidado y ese dorso no se parece a ninguna cara.

**Por qué esta prioridad**: si no se distingue qué cartas están tapadas, no se puede jugar con comodidad.

**Prueba independiente**: empezar una partida y comprobar que todas las cartas tienen el mismo dorso; descubrir una y ver que su cara es claramente distinta del dorso.

**Escenarios de aceptación**:

1. **Dado** una partida recién empezada, **cuando** se miran las cartas, **entonces** todas muestran exactamente el mismo dorso.
2. **Dado** una carta descubierta junto a cartas tapadas, **cuando** se mira el tablero, **entonces** se distingue de inmediato cuál está descubierta.

---

### Historia 3 - Botones con icono grande junto al texto (Prioridad: P2)

Los botones "Seguir", "Jugar otra vez" y "Volver al inicio" de "Parejas" llevan un icono grande junto al texto, con el mismo aspecto cuidado que el resto de la actividad.

**Por qué esta prioridad**: mejora la comprensión y la coherencia, pero el juego es usable sin ello.

**Prueba independiente**: llegar a cada pantalla donde aparecen esos botones y comprobar que muestran icono y texto a la vez y que el texto se lee bien.

**Escenarios de aceptación**:

1. **Dado** cualquiera de los tres botones dentro de "Parejas", **cuando** se muestra, **entonces** enseña un icono grande y su texto a la vez.
2. **Dado** esos botones, **cuando** se leen, **entonces** el texto sigue siendo legible (tamaño y contraste del proyecto).

---

### Historia 4 - Partidas distintas, dibujos distintos (Prioridad: P2)

Al jugar varias partidas seguidas del mismo tamaño, no siempre salen los mismos dibujos, para que el juego no resulte repetitivo.

**Por qué esta prioridad**: aporta variedad, pero no es imprescindible para jugar.

**Prueba independiente**: jugar 3 partidas seguidas del mismo tamaño y comprobar que no todas usan el mismo conjunto de dibujos.

**Escenarios de aceptación**:

1. **Dado** 3 partidas seguidas del mismo tamaño, **cuando** se comparan los dibujos que salen, **entonces** aparece más de un conjunto de dibujos distinto.

---

### Casos límite

- Los dibujos se ven bien y con contraste alto sobre el fondo de la carta en cualquier tamaño de partida (6, 8 y 12 cartas), también cuando las cartas son más pequeñas.
- Las reglas, la puntuación y los tamaños de partida no cambian.
- Una carta de una pareja ya acertada sigue distinguiéndose de las tapadas y de las recién descubiertas, como hasta ahora.

## Requisitos *(obligatorio)*

### Requisitos funcionales

- **FR-001**: Cada carta descubierta DEBE mostrar un dibujo de un objeto cotidiano, grande y reconocible, junto a su nombre escrito (el dibujo nunca sustituye al texto).
- **FR-002**: Todos los dibujos de las cartas DEBEN compartir un mismo estilo visual y ninguno DEBE poder confundirse con otro.
- **FR-003**: Todas las cartas tapadas DEBEN mostrar el mismo dorso, claramente distinto de cualquier cara.
- **FR-004**: Una carta tapada, una descubierta y una ya acertada DEBEN distinguirse a simple vista.
- **FR-005**: Los botones "Seguir", "Jugar otra vez" y "Volver al inicio" de "Parejas" DEBEN mostrar un icono grande junto al texto, con texto legible.
- **FR-006**: El conjunto de dibujos de una partida DEBE poder variar entre partidas del mismo tamaño; hay más dibujos disponibles que los que caben en la partida más grande.
- **FR-007**: Los dibujos DEBEN tener contraste alto con el fondo de la carta en los tres tamaños de partida, y los textos mantienen el contraste de 7 a 1 del proyecto.
- **FR-008**: Todo el material gráfico nuevo DEBE estar incluido en la app (sin descargas) y tener una licencia que permita usarlo sin pagar, sin dar crédito, sin crear una cuenta y sin heredar una licencia.
- **FR-009**: Las reglas, la puntuación, los tamaños de partida y el color propio del juego NO DEBEN cambiar.
- **FR-010**: Los cambios afectan solo a "Parejas"; las demás actividades no cambian.

### Entidades clave

- **Dibujo**: objeto cotidiano con su nombre en español y su imagen; todos del mismo estilo.
- **Dorso**: imagen única que comparten todas las cartas tapadas.
- **Conjunto de dibujos de una partida**: selección de dibujos que salen en una partida concreta.

## Criterios de éxito *(obligatorio)*

### Resultados medibles

- **SC-001**: En partidas de 6, 8 y 12 cartas, una persona identifica el 100 % de los dibujos nada más descubrirlos, sin dudar entre dos dibujos.
- **SC-002**: En una partida recién empezada, el 100 % de las cartas tapadas tienen un dorso idéntico, y una persona distingue tapadas y descubiertas a simple vista.
- **SC-003**: Los tres botones ("Seguir", "Jugar otra vez", "Volver al inicio") muestran icono y texto a la vez en el 100 % de las veces que aparecen en "Parejas".
- **SC-004**: En 3 partidas seguidas del mismo tamaño, aparece más de un conjunto de dibujos distinto.
- **SC-005**: Las reglas, la puntuación y los tamaños de partida se comportan igual que antes; las pruebas existentes de "Parejas" siguen pasando.
- **SC-006**: No se necesita pagar, dar crédito, crear una cuenta ni aceptar una licencia heredada para usar ningún material gráfico de la app.

## Suposiciones

- Las fuentes gráficas propuestas (Openclipart y Kenney) se admiten solo si el material concreto elegido se puede usar sin condiciones (dominio público o equivalente); la comprobación de licencia de cada dibujo se hace al planificar.
- Los packs de iconos de juegos de mesa pueden no tener objetos cotidianos adecuados; si no los tienen, se elige otra fuente con la misma restricción de licencia.
- Los dibujos actuales (llave, taza, reloj, gafas, cama, silla, lámpara, tijeras) pueden ampliarse con objetos cotidianos nuevos hasta tener claramente más de los 6 que pide la partida de 12 cartas.
- El color propio de "Parejas" se mantiene para botones y elementos, como hasta ahora.
- Que un dibujo "se reconozca sin dudar" lo comprueba una persona con un móvil; el agente no puede darlo por hecho.

## Fuera de alcance

Nuevas reglas, nuevos tamaños de partida, animaciones, sonidos, modo oscuro, pantalla de créditos y cambios en otras actividades.
