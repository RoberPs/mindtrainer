# Especificación de la funcionalidad: Forma la palabra

**Rama de la funcionalidad**: `003-forma-la-palabra`

**Creada**: 2026-11-06

**Estado**: Borrador

**Entrada**: Actividad "Forma la palabra": se muestran las letras de una palabra desordenadas y la persona las ordena para formarla. Pensada para personas mayores, para ejercitar la memoria de palabras con un ejercicio corto y claro.

## Escenarios de usuario y pruebas *(obligatorio)*

### Historia 1 - Formar una palabra con las letras desordenadas (Prioridad: P1)

Una persona mayor abre la actividad y ve las letras de una palabra cotidiana desordenadas, cada una en un botón grande. Toca las letras en el orden que cree correcto; cada letra tocada pasa a una casilla de la palabra. Cuando termina, pulsa "Comprobar". Si acierta, ve un mensaje positivo y el botón "Siguiente". Si se equivoca, ve un mensaje amable y puede seguir intentándolo.

**Por qué esta prioridad**: es el corazón de la actividad. Sin ella no hay juego.

**Prueba independiente**: se puede probar entrando en la actividad, colocando las letras de una palabra y pulsando "Comprobar", con acierto y con error. Ya aporta valor aunque no existan el resto de historias.

**Escenarios de aceptación**:

1. **Dado** que veo las letras desordenadas de una palabra, **cuando** toco una letra, **entonces** esa letra pasa a la primera casilla libre de la palabra y deja de estar entre las desordenadas.
2. **Dado** que he colocado todas las letras formando la palabra correcta, **cuando** pulso "Comprobar", **entonces** aparece un mensaje positivo y el botón "Siguiente".
3. **Dado** que he colocado todas las letras formando una palabra incorrecta, **cuando** pulso "Comprobar", **entonces** aparece un mensaje amable, las letras siguen colocadas y puedo volver a intentarlo.
4. **Dado** que he colocado solo una parte de las letras, **cuando** pulso "Comprobar", **entonces** aparece un mensaje que me pide completar la palabra y no se cuenta como intento fallido.

---

### Historia 2 - Corregir lo colocado (Prioridad: P1)

La persona se da cuenta de que se ha equivocado antes de comprobar, o después de un intento fallido. Puede quitar la última letra colocada con "Borrar última letra" o devolver todas con "Empezar de nuevo".

**Por qué esta prioridad**: sin poder corregir, un solo toque erróneo obligaría a fallar. Es necesaria para que la historia 1 sea cómoda para personas mayores.

**Prueba independiente**: se puede probar colocando varias letras y usando cada botón de corrección, comprobando que las letras vuelven al grupo de las desordenadas.

**Escenarios de aceptación**:

1. **Dado** que he colocado varias letras, **cuando** pulso "Borrar última letra", **entonces** la última letra colocada vuelve a las desordenadas y las demás siguen en su sitio.
2. **Dado** que he colocado varias letras, **cuando** pulso "Empezar de nuevo", **entonces** todas las letras vuelven a las desordenadas y las casillas quedan vacías.
3. **Dado** que no he colocado ninguna letra, **cuando** miro los botones de corrección, **entonces** no hacen nada y no provocan ningún error.

---

### Historia 3 - Terminar una partida de 5 palabras y ver el resultado (Prioridad: P1)

Una partida son 5 palabras seguidas. Al terminar la quinta, la persona ve cuántas ha acertado ("X de 5") y puede pulsar "Jugar otra vez" o "Volver al inicio".

**Por qué esta prioridad**: da sentido de principio y fin a la actividad y permite comprobar la puntuación.

**Prueba independiente**: se puede probar jugando las 5 palabras (acertando algunas y fallando otras) y comprobando el resultado final y los dos botones.

**Escenarios de aceptación**:

1. **Dado** que he resuelto una palabra que no es la quinta, **cuando** pulso "Siguiente", **entonces** aparecen las letras desordenadas de una palabra nueva y las casillas vacías.
2. **Dado** que he terminado la quinta palabra, **cuando** continúo, **entonces** veo la pantalla final con el resultado "X de 5", donde X es el número de palabras acertadas.
3. **Dado** que estoy en la pantalla final, **cuando** pulso "Jugar otra vez", **entonces** empieza una partida nueva de 5 palabras con la puntuación a cero.
4. **Dado** que estoy en la pantalla final, **cuando** pulso "Volver al inicio", **entonces** vuelvo a la pantalla de inicio de la app.
5. **Dado** que juego varias partidas seguidas, **cuando** empiezo cada una, **entonces** las 5 palabras no se repiten dentro de la misma partida y varían de una partida a otra.

---

### Historia 4 - Ver la respuesta cuando no me sale (Prioridad: P2)

Si la persona no consigue la palabra, puede pulsar "Ver la respuesta". Se le muestra la palabra correcta y puede seguir con la siguiente. Esa palabra no cuenta como acierto.

**Por qué esta prioridad**: evita que la persona se frustre y abandone, pero la actividad funciona sin ella.

**Prueba independiente**: se puede probar pulsando "Ver la respuesta" en una palabra y comprobando que se muestra, que se puede continuar y que no suma al resultado final.

**Escenarios de aceptación**:

1. **Dado** que estoy ante una palabra, **cuando** pulso "Ver la respuesta", **entonces** se muestra la palabra correcta y aparece el botón "Siguiente".
2. **Dado** que he visto la respuesta de una palabra, **cuando** termina la partida, **entonces** esa palabra no suma en el "X de 5".
3. **Dado** que he fallado una palabra y después la he acertado, **cuando** termina la partida, **entonces** esa palabra sí suma en el "X de 5".

---

### Casos límite

- "Comprobar" con la palabra incompleta: se muestra un mensaje que pide completarla; no cuenta como fallo.
- No hay límite de intentos por palabra ni límite de tiempo en ninguna pantalla.
- Palabra acertada tras uno o más fallos: cuenta como acierto.
- Palabra cuya respuesta se ha visto: no cuenta como acierto.
- Una vez comprobada y acertada, o tras ver la respuesta, las letras ya no se pueden mover hasta pasar a la siguiente palabra.
- La persona sale con "Volver al inicio" en mitad de una partida: la partida se abandona y no se guarda nada.
- Letras repetidas dentro de una palabra (por ejemplo "casa"): cada letra es un botón distinto y la palabra es correcta si las letras colocadas forman exactamente la palabra, sin importar qué botón concreto se tocó.

## Requisitos *(obligatorio)*

### Requisitos funcionales

- **RF-001**: La actividad MUST mostrar las letras de una palabra desordenadas, cada una en un botón grande y tocable, y una fila de casillas vacías con tantas casillas como letras tiene la palabra.
- **RF-002**: Al tocar una letra desordenada, la actividad MUST colocarla en la primera casilla libre y quitarla de las desordenadas.
- **RF-003**: La actividad MUST ofrecer el botón "Comprobar". Con la palabra completa y correcta MUST mostrar un mensaje positivo y el botón "Siguiente".
- **RF-004**: Con la palabra completa e incorrecta, la actividad MUST mostrar un mensaje amable, mantener las letras colocadas y permitir seguir intentándolo sin límite de intentos.
- **RF-005**: Con la palabra incompleta, "Comprobar" MUST mostrar un mensaje que pide completarla y no MUST contar como intento fallido.
- **RF-006**: La actividad MUST ofrecer "Borrar última letra", que devuelve la última letra colocada a las desordenadas, y "Empezar de nuevo", que devuelve todas.
- **RF-007**: La actividad MUST ofrecer "Ver la respuesta", siempre visible mientras la palabra no esté resuelta. Al pulsarlo MUST mostrar la palabra correcta, MUST ofrecer "Siguiente" y MUST dejar esa palabra sin contar como acierto.
- **RF-008**: Una partida MUST constar de exactamente 5 palabras, distintas entre sí dentro de la misma partida.
- **RF-009**: Las palabras de cada partida MUST sortearse de una lista de unas 100 palabras cotidianas incluidas en la app, para que las partidas no resulten repetitivas.
- **RF-010**: Cada palabra de la lista MUST tener entre 4 y 7 letras, estar escrita sin tildes y tener una única solución posible: las letras desordenadas de una palabra no deben poder formar otra palabra de la lista.
- **RF-011**: Una palabra MUST contar como acierto si la persona la forma correctamente en cualquier intento, y MUST NOT contar si ha visto la respuesta.
- **RF-012**: Al terminar la quinta palabra, la actividad MUST mostrar el resultado "X de 5" con los botones "Jugar otra vez" y "Volver al inicio".
- **RF-013**: "Jugar otra vez" MUST empezar una partida nueva con la puntuación a cero y 5 palabras sorteadas de nuevo.
- **RF-014**: La actividad MUST NOT tener límite de tiempo, cuenta atrás ni penalización por tardar.
- **RF-015**: La actividad MUST cumplir las reglas de accesibilidad del proyecto: letra de al menos 22 puntos, botones de al menos 64 puntos de alto y contraste de al menos 7 a 1.
- **RF-016**: Cada botón, mensaje y estado importante (acierto, fallo, respuesta mostrada, resultado final) MUST llevar un icono grande e intuitivo junto al texto, nunca en lugar de él, incluido dentro de la app.
- **RF-017**: Todos los textos de la actividad MUST estar en español de España, con tildes y signos de apertura, y guardarse junto al resto de textos fijos de la app.
- **RF-018**: La actividad MUST integrarse en la pantalla de inicio como una actividad más, con su identificador, icono, nombre y descripción, y MUST avisar de cuándo empieza y termina una partida según el contrato de actividades de la app.
- **RF-019**: La actividad MUST funcionar completa sin internet, sin cuentas y sin guardar ningún dato de la persona.
- **RF-020**: La actividad MUST tener pruebas básicas y funcionales de: reglas de colocación y corrección, respuesta correcta, incorrecta e incompleta, ver la respuesta, puntuación y final de partida.

### Fuera de alcance

Pistas, niveles de dificultad, ranking o clasificación, y guardar partidas. No se construyen en esta funcionalidad.

### Entidades clave

- **Palabra**: una palabra cotidiana de la lista, de 4 a 7 letras, sin tildes, con una única solución posible.
- **Partida**: una serie de 5 palabras distintas sorteadas de la lista, con el número de aciertos conseguido hasta el momento.
- **Intento**: las letras que la persona ha colocado en las casillas en un momento dado para la palabra actual.

## Criterios de éxito *(obligatorio)*

### Resultados medibles

- **CE-001**: Una persona que usa la app por primera vez forma y comprueba su primera palabra sin ayuda, en menos de 1 minuto desde que entra en la actividad.
- **CE-002**: En una partida completa de 5 palabras, el resultado "X de 5" coincide siempre con el número de palabras que la persona ha formado correctamente, sin contar las que ha rendido con "Ver la respuesta".
- **CE-003**: Tras 10 partidas seguidas, nunca se repite una palabra dentro de una misma partida y las partidas no son idénticas entre sí.
- **CE-004**: En el 100 % de los casos, un fallo o una palabra incompleta muestra un mensaje amable y permite seguir sin perder las letras ya colocadas ni quedar bloqueada la pantalla.
- **CE-005**: La persona puede dejar la actividad parada el tiempo que quiera en cualquier pantalla sin que cambie nada ni se pierda la partida.
- **CE-006**: Una persona mayor sin conocimientos técnicos puede comprobar usando solo la app, y sin leer código, que cada una de las historias de usuario se cumple.
- **CE-007**: Todas las pruebas de la actividad pasan.

## Suposiciones

- La actividad se añade a la lista real de actividades junto a "Parejas" y sigue el contrato de actividades de la funcionalidad 001.
- El botón "Volver al inicio" durante la partida lo pone el marco común de la app, como en el resto de actividades. La pantalla final añade además su propio "Volver al inicio", como pide la descripción.
- Las palabras son sustantivos y objetos cotidianos conocidos por personas mayores (por ejemplo "mesa", "silla", "ventana"), sin tecnicismos, nombres propios ni extranjerismos.
- Si la persona repite partida, no se evita que reaparezcan palabras de partidas anteriores: solo se garantiza que no se repitan dentro de la misma partida.
- Tras acertar o ver la respuesta, la palabra queda cerrada hasta pulsar "Siguiente".
- No se guarda nada entre partidas: ni puntuaciones, ni palabras vistas, ni progreso.
- Basta con un mensaje positivo, un mensaje amable de error y un mensaje de palabra incompleta; no hace falta variarlos.
