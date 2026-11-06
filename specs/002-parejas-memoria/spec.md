# Especificación de funcionalidad: Actividad "Parejas"

**Rama de funcionalidad**: `002-parejas-memoria`

**Creada**: 2026-11-06

**Estado**: Borrador

**Entrada**: Actividad "Parejas": juego de memoria de emparejar cartas. Usuarios: personas mayores. Problema: ejercitar la memoria visual con un juego conocido y sin prisa.

## Escenarios de usuario y pruebas *(obligatorio)*

### Historia de usuario 1 - Jugar una partida de parejas (Prioridad: P1)

Una persona mayor ve varias cartas boca abajo y toca dos para girarlas. Si las dos son iguales, quedan a la vista para el resto de la partida. Si son distintas, las dos se quedan a la vista el tiempo que la persona necesite, hasta que toca un botón grande "Seguir"; entonces vuelven a taparse y puede probar con otras dos. Las cartas muestran dibujos de objetos cotidianos fáciles de reconocer, cada uno acompañado de su nombre escrito.

**Por qué esta prioridad**: Es el juego en sí. Sin esto no hay actividad.

**Prueba independiente**: Abrir "Parejas" desde el inicio, empezar una partida y tocar cartas. Se comprueba que dos iguales se quedan descubiertas y que dos distintas se ven hasta tocar "Seguir".

**Escenarios de aceptación**:

1. **Dado** que hay cartas boca abajo, **cuando** la persona toca una carta, **entonces** esa carta se gira y se ve su dibujo.
2. **Dado** que hay una carta girada, **cuando** la persona toca otra carta tapada que es igual, **entonces** las dos cartas se quedan descubiertas.
3. **Dado** que hay una carta girada, **cuando** la persona toca otra carta tapada que es distinta, **entonces** las dos cartas se ven y aparece un botón grande "Seguir".
4. **Dado** que hay dos cartas distintas a la vista, **cuando** la persona toca "Seguir", **entonces** las dos vuelven a taparse y el botón desaparece.
5. **Dado** que hay dos cartas distintas a la vista, **cuando** pasa el tiempo sin que la persona toque nada, **entonces** las cartas siguen a la vista sin cambios.

---

### Historia de usuario 2 - Ver la felicitación al terminar (Prioridad: P1)

Cuando la persona descubre la última pareja, ve un mensaje de felicitación que le dice cuántos intentos ha necesitado, y dos botones grandes: "Jugar otra vez" y "Volver al inicio".

**Por qué esta prioridad**: Da sentido de logro y cierra la partida con claridad. Sin un final, la persona no sabe si ha terminado.

**Prueba independiente**: Jugar una partida pequeña hasta descubrir todas las parejas. Se comprueba que aparece la felicitación con el número de intentos y los dos botones.

**Escenarios de aceptación**:

1. **Dado** que falta una sola pareja por descubrir, **cuando** la persona la descubre, **entonces** aparece un mensaje de felicitación con el número de intentos que ha necesitado.
2. **Dado** que aparece el mensaje de felicitación, **cuando** la persona mira la pantalla, **entonces** ve los botones "Jugar otra vez" y "Volver al inicio".
3. **Dado** que aparece el mensaje de felicitación, **cuando** la persona toca "Jugar otra vez", **entonces** vuelve a la pantalla de elegir tamaño para empezar una partida nueva.
4. **Dado** que aparece el mensaje de felicitación, **cuando** la persona toca "Volver al inicio", **entonces** ve la pantalla de inicio de la app.
5. **Dado** que la persona ha jugado una partida y ha empezado otra, **cuando** empieza la nueva, **entonces** el contador de intentos vuelve a cero y las cartas están tapadas y en un orden nuevo.

---

### Historia de usuario 3 - Elegir el tamaño de la partida (Prioridad: P2)

Antes de empezar, la persona elige el tamaño de la partida con tres botones grandes: pequeña (6 cartas), mediana (8 cartas) o grande (12 cartas). Cada botón muestra su nombre y el número de cartas.

**Por qué esta prioridad**: Permite adaptar la dificultad a cada persona, pero el juego ya es útil con un solo tamaño fijo.

**Prueba independiente**: Abrir "Parejas", elegir cada uno de los tres tamaños y contar las cartas que aparecen.

**Escenarios de aceptación**:

1. **Dado** que la persona abre "Parejas", **cuando** aparece la primera pantalla, **entonces** ve los tres botones de tamaño: pequeña (6 cartas), mediana (8 cartas) y grande (12 cartas).
2. **Dado** que ve los tres tamaños, **cuando** toca uno, **entonces** empieza una partida con exactamente ese número de cartas, todas boca abajo.
3. **Dado** que ha empezado una partida de cualquier tamaño, **cuando** mira las cartas, **entonces** cada dibujo aparece exactamente dos veces.

---

### Casos límite

- Tocar una carta que ya está descubierta no hace nada: ni la vuelve a tapar ni cuenta como intento.
- Mientras hay dos cartas distintas a la vista, tocar cualquier otra carta no hace nada hasta pulsar "Seguir".
- Nunca hay tiempo límite ni se pierde la partida: la persona puede tardar lo que quiera y siempre puede terminar.
- Si la persona toca "Volver al inicio" a mitad de una partida, la partida se abandona sin guardarse; al volver a entrar a "Parejas" empieza desde la elección de tamaño.
- Si la persona toca dos veces seguidas la misma carta tapada, la segunda pulsación no cuenta como segunda carta.

## Requisitos *(obligatorio)*

### Requisitos funcionales

- **RF-001**: La actividad "Parejas" DEBE aparecer en la pantalla de inicio con su icono, su nombre y una descripción de una línea, y abrirse al tocarla.
- **RF-002**: Al abrir la actividad, la persona DEBE ver primero la elección de tamaño con tres botones: pequeña (6 cartas), mediana (8 cartas) y grande (12 cartas).
- **RF-003**: Cada partida DEBE tener exactamente el número de cartas del tamaño elegido, con cada dibujo repetido exactamente dos veces, todas empezando boca abajo.
- **RF-004**: Cada partida DEBE colocar las cartas en un orden aleatorio, distinto de una partida a otra.
- **RF-005**: Cada carta DEBE mostrar un dibujo de un objeto cotidiano fácil de reconocer, grande, junto con su nombre escrito. Los dibujos de una misma partida DEBEN ser distintos entre sí (salvo la repetición en pareja).
- **RF-006**: Al tocar una carta tapada, el sistema DEBE girarla y mostrar su dibujo.
- **RF-007**: Cuando hay dos cartas giradas y son iguales, DEBEN quedar descubiertas hasta el final de la partida.
- **RF-008**: Cuando hay dos cartas giradas y son distintas, DEBEN permanecer a la vista y DEBE aparecer un botón grande "Seguir". Al pulsarlo, las dos cartas DEBEN volver a taparse. No DEBE existir ningún tiempo que las tape por sí solas.
- **RF-009**: Tocar una carta ya descubierta, o cualquier carta mientras hay dos distintas a la vista, NO DEBE producir ningún efecto.
- **RF-010**: El sistema DEBE contar un intento cada vez que la persona gira dos cartas, sean iguales o distintas, y DEBE mostrar el número de intentos durante la partida.
- **RF-011**: Al descubrir la última pareja, el sistema DEBE mostrar un mensaje de felicitación con el número de intentos necesitados y los botones "Jugar otra vez" y "Volver al inicio".
- **RF-012**: "Jugar otra vez" DEBE llevar a la elección de tamaño con una partida nueva (intentos a cero, cartas tapadas y mezcladas de nuevo).
- **RF-013**: La actividad NO DEBE tener tiempo límite, cuenta atrás, penalizaciones ni pérdida de partida.
- **RF-014**: Todos los textos DEBEN estar en español de España; los botones y el texto cumplen los tamaños y contraste definidos para personas mayores, y cada botón o carta lleva icono o dibujo junto al texto, nunca en lugar de él.
- **RF-015**: La actividad NO DEBE guardar nada: ni partidas, ni mejores marcas, ni clasificaciones. Cada vez que se abre empieza de cero.

### Entidades clave

- **Partida**: Una sesión de juego. Tiene un tamaño elegido (6, 8 o 12 cartas), un conjunto de cartas, un número de intentos y un estado (eligiendo tamaño, jugando, terminada).
- **Carta**: Una pieza del tablero. Tiene un dibujo con su nombre y un estado (tapada, girada, descubierta).
- **Pareja**: Dos cartas con el mismo dibujo. Una partida de N cartas tiene N/2 parejas.

## Criterios de éxito *(obligatorio)*

### Resultados medibles

- **CE-001**: Una persona que abre la app por primera vez encuentra "Parejas" en el inicio y llega a ver las cartas de su primera partida en no más de 3 toques, sin ayuda.
- **CE-002**: En los tres tamaños, el número de cartas contadas en pantalla coincide exactamente con el elegido (6, 8 o 12) y cada dibujo aparece dos veces.
- **CE-003**: Al descubrir dos cartas distintas, estas siguen a la vista aunque la persona espere 1 minuto sin tocar nada, hasta que pulsa "Seguir".
- **CE-004**: Una partida de cada tamaño se puede completar hasta la felicitación, y el número de intentos mostrado coincide con las veces que la persona ha girado dos cartas.
- **CE-005**: Al menos 9 de cada 10 personas mayores que prueban el juego reconocen todos los dibujos de las cartas sin preguntar qué son.
- **CE-006**: Una persona puede jugar partidas seguidas con "Jugar otra vez" y en cada una las cartas aparecen tapadas, en un orden distinto y con el contador de intentos a cero.

## Supuestos

- La actividad respeta el contrato de actividades de la funcionalidad 001: tiene identificador, icono, nombre y descripción, y el botón "Volver al inicio" lo pone siempre el marco de la app, también en la pantalla de felicitación.
- Un "intento" es girar dos cartas, aciertes o no. Girar una sola carta no cuenta hasta que se gira la segunda.
- Hay al menos 6 dibujos distintos de objetos cotidianos disponibles (los que necesita la partida grande); todos van incluidos en la app, con licencia que permite su uso.
- "Jugar otra vez" lleva a la elección de tamaño (en lugar de repetir el mismo tamaño), para que la persona pueda cambiarlo si lo desea.
- El texto de apoyo (nombre del objeto en cada carta) acompaña siempre al dibujo, en línea con el principio de que las imágenes nunca sustituyen al texto.
- Las pruebas automáticas básicas de la actividad (reglas, pareja correcta e incorrecta, intentos y final de partida) se definirán en el plan, según la constitución.

## Fuera de alcance

- Mejores marcas y ranking.
- Dos jugadores.
- Sonidos.
- Guardar partidas.
