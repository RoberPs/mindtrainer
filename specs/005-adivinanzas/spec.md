# Especificación de la funcionalidad: Adivinanzas

**Rama de la funcionalidad**: `005-adivinanzas`

**Creada**: 2026-11-06

**Estado**: Borrador

**Entrada**: Actividad "Adivinanzas": se muestra una adivinanza y tres posibles respuestas. Pensada para personas mayores, para ejercitar la memoria y el lenguaje con adivinanzas tradicionales, sin tener que escribir. Una partida son 5 adivinanzas; al final se ve cuántas se han acertado ("X de 5"). Las adivinanzas son tradicionales, conocidas y de respuesta una sola palabra.

## Escenarios de usuario y pruebas *(obligatorio)*

### Historia 1 - Leer una adivinanza y tocar una de las tres respuestas (Prioridad: P1)

Una persona mayor abre la actividad y ve una adivinanza escrita en letra grande y, debajo, tres botones grandes con las posibles respuestas. Toca el que cree correcto. Solo tiene un intento por adivinanza. Si acierta, ve un mensaje positivo y el botón "Siguiente". Si falla, ve un mensaje amable que le muestra cuál era la respuesta correcta y el botón "Siguiente".

**Por qué esta prioridad**: es el corazón de la actividad. Sin ella no hay juego.

**Prueba independiente**: se puede probar entrando en la actividad y tocando una respuesta correcta y, en otra adivinanza, una incorrecta. Ya aporta valor aunque no exista el resto de historias.

**Escenarios de aceptación**:

1. **Dado** que veo una adivinanza con sus tres respuestas, **cuando** toco la respuesta correcta, **entonces** aparece un mensaje positivo y el botón "Siguiente", y las respuestas dejan de poder tocarse.
2. **Dado** que veo una adivinanza con sus tres respuestas, **cuando** toco una respuesta incorrecta, **entonces** aparece un mensaje amable que muestra cuál era la respuesta correcta y el botón "Siguiente", y las respuestas dejan de poder tocarse.
3. **Dado** que ya he respondido una adivinanza, **cuando** intento tocar otra de sus respuestas, **entonces** no ocurre nada: solo hay un intento por adivinanza.
4. **Dado** que he respondido una adivinanza, **cuando** pulso "Siguiente", **entonces** aparece la adivinanza siguiente con sus tres respuestas y sin ningún mensaje del turno anterior.

---

### Historia 2 - Terminar la partida y ver cuántas he acertado (Prioridad: P1)

Una partida son 5 adivinanzas. Al responder la quinta, el botón, que en lugar de "Siguiente" dice "Ver resultado", lleva al resultado: la persona ve cuántas ha acertado ("X de 5") y los botones "Jugar otra vez" y "Volver al inicio".

**Por qué esta prioridad**: da sentido de principio y fin a la actividad y permite comprobar la puntuación.

**Prueba independiente**: se puede probar jugando las 5 adivinanzas (con aciertos y fallos) y comprobando el resultado y los dos botones.

**Escenarios de aceptación**:

1. **Dado** que he respondido la quinta adivinanza, **cuando** pulso "Ver resultado", **entonces** veo el resultado "X de 5" con el número de aciertos y los botones "Jugar otra vez" y "Volver al inicio".
2. **Dado** que he acertado las 5, **cuando** veo el resultado, **entonces** dice "5 de 5".
3. **Dado** que he fallado las 5, **cuando** veo el resultado, **entonces** dice "0 de 5" con un mensaje amable y de ánimo.
4. **Dado** que estoy en el resultado, **cuando** pulso "Jugar otra vez", **entonces** empieza una partida nueva con 5 adivinanzas, con el recuento de aciertos a cero.
5. **Dado** que estoy en el resultado, **cuando** pulso "Volver al inicio", **entonces** vuelvo a la pantalla de inicio de la app.

---

### Casos límite

- Las tres respuestas se muestran siempre en orden distinto entre partidas: la respuesta correcta no ocupa siempre el mismo lugar y el orden se vuelve a sortear cada vez que aparece una adivinanza.
- En una misma partida no se repite ninguna adivinanza.
- No hay límite de tiempo para responder en ninguna pantalla: la persona puede dejar la actividad parada el tiempo que quiera.
- Se puede ver qué adivinanza toca (por ejemplo, "Adivinanza 2 de 5") para no perderse durante la partida.
- La persona sale con "Volver al inicio" en mitad de una partida: la partida se abandona y no se guarda nada.
- Tras responder, la adivinanza y las tres respuestas siguen visibles, con la correcta señalada, para que se pueda leer con calma antes de pulsar "Siguiente".

## Requisitos *(obligatorio)*

### Requisitos funcionales

- **RF-001**: La actividad MUST mostrar, en cada turno, una adivinanza y tres botones grandes con tres posibles respuestas, una sola correcta y de una sola palabra.
- **RF-002**: La persona MUST poder responder tocando uno de los tres botones. Solo MUST haber un intento por adivinanza: tras responder, las respuestas no admiten más pulsaciones.
- **RF-003**: Si la respuesta es correcta, la actividad MUST mostrar un mensaje positivo y el botón "Siguiente", y MUST sumar un acierto.
- **RF-004**: Si la respuesta es incorrecta, la actividad MUST mostrar un mensaje amable que indique la respuesta correcta, y el botón "Siguiente". No MUST sumar acierto y MUST NOT haber penalización de ningún tipo.
- **RF-005**: Tras responder, la adivinanza y las tres respuestas MUST seguir visibles, con la respuesta correcta señalada de una forma que no dependa solo del color.
- **RF-006**: Cada partida MUST constar de 5 adivinanzas distintas. Al responder la última, el botón MUST decir "Ver resultado" en lugar de "Siguiente" y llevar al resultado.
- **RF-007**: El resultado MUST mostrar el número de aciertos con el formato "X de 5", un mensaje acorde a la puntuación y los botones "Jugar otra vez" y "Volver al inicio".
- **RF-008**: "Jugar otra vez" MUST empezar una partida nueva de 5 adivinanzas, con los aciertos a cero y sin mensajes de la partida anterior.
- **RF-009**: Cada vez que se muestra una adivinanza, el orden de sus tres respuestas MUST sortearse, de modo que no sea siempre el mismo entre partidas.
- **RF-010**: Debe haber al menos 10 adivinanzas preparadas, para que las partidas no sean siempre iguales. Cada una tiene su texto, su respuesta correcta y dos respuestas incorrectas verosímiles, de una sola palabra. Las adivinanzas están incluidas en la app: la actividad MUST NOT generar ni descargar adivinanzas nuevas.
- **RF-011**: Las adivinanzas MUST ser tradicionales y conocidas por personas mayores, de respuesta una sola palabra, sin tecnicismos y con una única respuesta correcta clara entre las tres opciones.
- **RF-012**: La actividad MUST mostrar qué adivinanza toca de la partida (por ejemplo, "Adivinanza 2 de 5").
- **RF-013**: La actividad MUST NOT tener límite de tiempo, cuenta atrás ni penalización por tardar.
- **RF-014**: La actividad MUST cumplir las reglas de accesibilidad del proyecto: letra de al menos 22 puntos, botones de al menos 64 puntos de alto y contraste de al menos 7 a 1. El acierto y el fallo MUST distinguirse sin depender solo del color.
- **RF-015**: Cada botón de acción ("Siguiente", "Jugar otra vez" y "Volver al inicio" de la pantalla final) y cada mensaje importante (acierto, fallo, resultado final) MUST llevar un icono grande e intuitivo junto al texto, nunca en lugar de él, incluido dentro de la app.
- **RF-016**: Todos los textos de la actividad, incluidas las adivinanzas, MUST estar en español de España, con tildes y signos de apertura. Los textos de la interfaz se guardan junto al resto de textos fijos de la app; las adivinanzas y sus respuestas se guardan con los datos de la propia actividad, como las palabras y las sopas de las otras actividades.
- **RF-017**: La actividad MUST integrarse en la pantalla de inicio como una actividad más, con su identificador, icono, nombre y descripción, y MUST avisar de cuándo empieza y termina una partida según el contrato de actividades de la app.
- **RF-018**: La actividad MUST funcionar completa sin internet, sin cuentas y sin guardar ningún dato de la persona.
- **RF-019**: La actividad MUST tener pruebas básicas y funcionales de: respuesta correcta, respuesta incorrecta con la correcta mostrada, un solo intento por adivinanza, puntuación "X de 5", adivinanzas sin repetir dentro de la partida, orden de respuestas sorteado y final de partida.

### Fuera de alcance

Escribir la respuesta, lectura en voz alta, pistas, y ranking o clasificación. No se construyen en esta funcionalidad.

### Entidades clave

- **Adivinanza**: un texto, tres respuestas posibles de una palabra y cuál de ellas es la correcta.
- **Partida**: una serie de 5 adivinanzas distintas, con la adivinanza actual y el número de aciertos hasta el momento.

## Criterios de éxito *(obligatorio)*

### Resultados medibles

- **CE-001**: Una persona que usa la app por primera vez responde su primera adivinanza sin ayuda, en menos de 1 minuto desde que entra en la actividad.
- **CE-002**: En una partida completa, el "X de 5" del resultado coincide siempre con el número de adivinanzas en las que la persona ha tocado la respuesta correcta.
- **CE-003**: En el 100 % de los fallos, el mensaje muestra la respuesta correcta y permite continuar con "Siguiente" sin quedarse bloqueada la pantalla.
- **CE-004**: Tras 10 partidas seguidas, en ninguna se repite una adivinanza dentro de la misma partida, y la respuesta correcta aparece en los tres lugares posibles (arriba, en medio y abajo).
- **CE-005**: Tras responder una adivinanza, ninguna pulsación posterior en sus respuestas cambia el resultado de esa adivinanza ni la puntuación.
- **CE-006**: La persona puede dejar la actividad parada el tiempo que quiera en cualquier pantalla sin que cambie nada ni se pierda la partida.
- **CE-007**: Una persona mayor sin conocimientos técnicos puede comprobar usando solo la app, y sin leer código, que cada una de las historias de usuario se cumple.
- **CE-008**: Todas las pruebas de la actividad pasan.

## Suposiciones

- La actividad se añade a la lista real de actividades junto a "Parejas", "Forma la palabra" y "Sopa de letras", y sigue el contrato de actividades de la funcionalidad 001.
- Hay un banco de al menos 10 adivinanzas preparadas de antemano; cada partida sortea 5 distintas de ese banco. No se exige que "Jugar otra vez" evite repetir adivinanzas de la partida anterior, solo que no se repitan dentro de una misma partida.
- "Orden distinto entre partidas" se entiende como que el orden de las tres respuestas se sortea cada vez que se muestra la adivinanza, y no está fijado en el banco.
- Los mensajes de acierto y de fallo son siempre los mismos; basta con un mensaje positivo, un mensaje amable de fallo (con la respuesta correcta) y un mensaje final según la puntuación; no hace falta variarlos.
- El botón "Volver al inicio" durante la partida lo pone el marco común de la app, como en el resto de actividades. La pantalla final añade además su propio "Volver al inicio", como pide la descripción.
- Las respuestas se escriben en mayúsculas o en minúsculas de forma coherente en toda la actividad, con tildes cuando correspondan, ya que no hay que teclearlas.
- No se guarda nada entre partidas: ni puntuaciones, ni adivinanzas vistas, ni progreso.
