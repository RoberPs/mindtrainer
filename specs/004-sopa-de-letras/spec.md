# Especificación de la funcionalidad: Sopa de letras

**Rama de la funcionalidad**: `004-sopa-de-letras`

**Creada**: 2026-11-06

**Estado**: Borrador

**Entrada**: Actividad "Sopa de letras": una cuadrícula pequeña de 5 filas por 6 columnas donde hay que encontrar 3 palabras relacionadas con una palabra dada (por ejemplo, con "NUBE", encontrar "LLUVIA"). Pensada para personas mayores, para ejercitar la memoria y la atención con un ejercicio visual claro. Las palabras están solo en horizontal (de izquierda a derecha) o en vertical (de arriba abajo), nunca en diagonal ni al revés.

## Escenarios de usuario y pruebas *(obligatorio)*

### Historia 1 - Encontrar una palabra marcando su primera y su última letra (Prioridad: P1)

Una persona mayor abre la actividad y ve arriba la palabra de referencia (por ejemplo, "NUBE"), la cuadrícula de 5 filas por 6 columnas con una letra grande en cada casilla y la lista de palabras que debe encontrar. Marca una palabra tocando su primera letra y, después, su última letra. Si la palabra marcada es una de las 3 buscadas, queda resaltada en la cuadrícula y se tacha en la lista. Si no lo es, aparece un mensaje amable y la marca se quita para poder intentarlo de nuevo.

**Por qué esta prioridad**: es el corazón de la actividad. Sin ella no hay juego.

**Prueba independiente**: se puede probar entrando en la actividad y marcando una palabra correcta y una incorrecta. Ya aporta valor aunque no existan el resto de historias.

**Escenarios de aceptación**:

1. **Dado** que veo la cuadrícula sin ninguna marca, **cuando** toco una letra, **entonces** esa letra queda resaltada como primera letra de la marca y aparece un mensaje que me invita a tocar la última letra.
2. **Dado** que he tocado la primera letra de una de las palabras buscadas, **cuando** toco su última letra, **entonces** toda la palabra queda resaltada de forma permanente en la cuadrícula y aparece tachada en la lista de palabras, con un mensaje positivo.
3. **Dado** que he tocado una primera letra, **cuando** toco una última letra y la línea marcada no es ninguna de las palabras buscadas, **entonces** aparece un mensaje amable, la marca se quita y puedo intentarlo otra vez.
4. **Dado** que he tocado la primera letra, **cuando** toco otra letra que no está en la misma fila ni en la misma columna, **entonces** esa pulsación se ignora, aparece un mensaje amable que me pide marcar una línea recta y la marca se quita.
5. **Dado** que he tocado la primera letra, **cuando** vuelvo a tocar esa misma letra, **entonces** la marca se quita sin ningún mensaje de error y sin contar como intento.

---

### Historia 2 - Terminar la sopa y ver cuántos intentos he necesitado (Prioridad: P1)

Cuando la persona encuentra las 3 palabras, ve un mensaje de felicitación que le dice cuántos intentos ha necesitado, y los botones "Jugar otra vez" y "Volver al inicio".

**Por qué esta prioridad**: da sentido de principio y fin a la actividad y permite comprobar la puntuación.

**Prueba independiente**: se puede probar encontrando las 3 palabras (con y sin errores intermedios) y comprobando el mensaje final, el número de intentos y los dos botones.

**Escenarios de aceptación**:

1. **Dado** que he encontrado dos palabras, **cuando** encuentro la tercera, **entonces** aparece un mensaje de felicitación con el número de intentos que he necesitado y los botones "Jugar otra vez" y "Volver al inicio".
2. **Dado** que he encontrado las 3 palabras sin ningún fallo, **cuando** veo el mensaje final, **entonces** el número de intentos es 3.
3. **Dado** que he fallado dos veces y he encontrado las 3 palabras, **cuando** veo el mensaje final, **entonces** el número de intentos es 5.
4. **Dado** que estoy en el mensaje final, **cuando** pulso "Jugar otra vez", **entonces** empieza una partida nueva con otra sopa, sin palabras encontradas y con los intentos a cero.
5. **Dado** que estoy en el mensaje final, **cuando** pulso "Volver al inicio", **entonces** vuelvo a la pantalla de inicio de la app.

---

### Historia 3 - Saber cuántas palabras me faltan (Prioridad: P2)

Durante la partida, la persona ve en pantalla cuántas palabras le faltan por encontrar, sin que se le diga cuáles son. Las que aún no ha encontrado aparecen en la lista ocultas; las que ya ha encontrado aparecen escritas y tachadas.

**Por qué esta prioridad**: orienta a la persona y evita que se pierda, pero la actividad funciona sin ella.

**Prueba independiente**: se puede probar encontrando palabras una a una y comprobando que el aviso de cuántas faltan baja y que nunca se muestra una palabra sin encontrar.

**Escenarios de aceptación**:

1. **Dado** que empiezo una partida, **cuando** miro la lista, **entonces** veo que me faltan 3 palabras y ninguna de las tres está escrita.
2. **Dado** que he encontrado una palabra, **cuando** miro la lista, **entonces** veo que me faltan 2 palabras, la encontrada aparece escrita y tachada, y las otras siguen ocultas.
3. **Dado** que me falta una sola palabra, **cuando** miro la lista, **entonces** el aviso está bien escrito en singular y la palabra sigue oculta.

---

### Casos límite

- Tocar una palabra ya encontrada (marcar de nuevo su primera y su última letra): no hace nada; no cuenta como intento, no cambia la lista ni aparece ningún mensaje de error.
- Dos letras que no forman una línea recta (ni la misma fila ni la misma columna): se ignora la pulsación con un mensaje amable y la marca se quita; no cuenta como intento.
- Dos letras en la misma fila o columna que no forman ninguna palabra buscada: cuenta como intento fallido, con mensaje amable y marca quitada.
- Dos letras de una línea recta marcadas en sentido contrario (de derecha a izquierda o de abajo arriba): como las palabras nunca están al revés, se trata como una línea que no es ninguna palabra buscada (intento fallido).
- Volver a tocar la primera letra: quita la marca, sin error y sin contar como intento.
- Una letra que pertenece a dos palabras a la vez (cruce): se puede marcar en cualquiera de ellas; si una palabra ya encontrada comparte una letra con otra, esa letra sigue resaltada.
- No hay límite de intentos ni límite de tiempo en ninguna pantalla.
- La persona sale con "Volver al inicio" en mitad de una partida: la partida se abandona y no se guarda nada.
- Una vez encontradas las 3 palabras, la cuadrícula deja de aceptar marcas hasta empezar otra partida.

## Requisitos *(obligatorio)*

### Requisitos funcionales

- **RF-001**: La actividad MUST mostrar la palabra de referencia de la sopa (por ejemplo, "NUBE"), una cuadrícula de 5 filas por 6 columnas con una letra grande y tocable en cada casilla, y la lista de las 3 palabras que hay que encontrar.
- **RF-002**: Las 3 palabras buscadas MUST estar relacionadas con la palabra de referencia, y cada una MUST aparecer en la cuadrícula exactamente una vez, solo en horizontal de izquierda a derecha o en vertical de arriba abajo, nunca en diagonal ni al revés.
- **RF-003**: La persona MUST poder marcar una palabra tocando su primera letra y, después, su última letra. La primera letra tocada MUST quedar resaltada hasta que se toque la última, y la actividad MUST mostrar un mensaje que invite a tocar la última letra.
- **RF-004**: Si la línea marcada coincide con una de las 3 palabras buscadas y aún no estaba encontrada, la actividad MUST resaltarla de forma permanente en la cuadrícula, tacharla en la lista y mostrar un mensaje positivo.
- **RF-005**: Si las dos letras tocadas están en la misma fila o columna pero la línea no coincide con ninguna palabra buscada, la actividad MUST mostrar un mensaje amable, quitar la marca y permitir seguir intentándolo sin límite de intentos.
- **RF-006**: Si las dos letras tocadas no están en la misma fila ni en la misma columna, la actividad MUST ignorar la pulsación, mostrar un mensaje amable que pida marcar una línea recta y quitar la marca.
- **RF-007**: Tocar una palabra ya encontrada MUST NOT hacer nada: ni cambia el resaltado, ni la lista, ni los intentos, ni muestra un error. Volver a tocar la primera letra marcada MUST quitar la marca sin error.
- **RF-008**: Un intento MUST contarse cada vez que la persona completa una marca con dos letras en la misma fila o columna (acierto o fallo), salvo que sea una palabra ya encontrada. Las pulsaciones ignoradas por no formar línea recta y las marcas quitadas al volver a tocar la primera letra MUST NOT contar como intento.
- **RF-009**: La actividad MUST mostrar en todo momento cuántas palabras faltan por encontrar, con el singular y el plural bien escritos, sin mostrar cuáles son. En la lista, las palabras sin encontrar MUST aparecer ocultas, y las encontradas MUST aparecer escritas y tachadas.
- **RF-010**: Al encontrar las 3 palabras, la actividad MUST mostrar un mensaje de felicitación con el número de intentos necesitados y los botones "Jugar otra vez" y "Volver al inicio".
- **RF-011**: "Jugar otra vez" MUST empezar una partida nueva con una sopa distinta de la que se acaba de jugar, sin palabras encontradas y con los intentos a cero.
- **RF-012**: Cada partida MUST constar de una única cuadrícula. Las sopas MUST estar preparadas de antemano e incluidas en la app: la actividad MUST NOT generar sopas nuevas.
- **RF-013**: Debe haber al menos 5 sopas preparadas, cada una con su palabra de referencia, sus 3 palabras relacionadas y su cuadrícula. En ninguna cuadrícula puede aparecer, además de las 3 buscadas, otra palabra relacionada con la de referencia en horizontal o vertical que la persona pudiera marcar y no se reconociera.
- **RF-014**: Las palabras y las letras de la cuadrícula MUST escribirse en mayúsculas y sin tildes (la "ñ" se permite como una letra más), para que cada casilla tenga una sola letra clara.
- **RF-015**: La actividad MUST NOT tener límite de tiempo, cuenta atrás ni penalización por tardar.
- **RF-016**: La actividad MUST cumplir las reglas de accesibilidad del proyecto: letra de al menos 22 puntos, botones de al menos 64 puntos de alto y contraste de al menos 7 a 1. La marca de la primera letra, las palabras encontradas y el resto de casillas MUST distinguirse sin depender solo del color.
- **RF-017**: Cada botón de acción ("Jugar otra vez" y "Volver al inicio" de la pantalla final), cada mensaje y cada estado importante (invitación a tocar la última letra, palabra encontrada, palabra no encontrada, línea no recta, felicitación final) MUST llevar un icono grande e intuitivo junto al texto, nunca en lugar de él, incluido dentro de la app. Las casillas de la cuadrícula son solo texto, porque la letra ya es lo que se lee.
- **RF-018**: Todos los textos de la actividad MUST estar en español de España, con tildes y signos de apertura, y guardarse junto al resto de textos fijos de la app.
- **RF-019**: La actividad MUST integrarse en la pantalla de inicio como una actividad más, con su identificador, icono, nombre y descripción, y MUST avisar de cuándo empieza y termina una partida según el contrato de actividades de la app.
- **RF-020**: La actividad MUST funcionar completa sin internet, sin cuentas y sin guardar ningún dato de la persona.
- **RF-021**: La actividad MUST tener pruebas básicas y funcionales de: reglas de marcado (línea recta, horizontal y vertical), palabra encontrada, palabra no encontrada, línea no recta, palabra ya encontrada, aviso de palabras que faltan, recuento de intentos y final de partida.

### Fuera de alcance

Más de una cuadrícula por partida, niveles de dificultad, generar sopas nuevas, y ranking o clasificación. No se construyen en esta funcionalidad.

### Entidades clave

- **Sopa**: una cuadrícula de 5 filas por 6 columnas con una palabra de referencia y 3 palabras relacionadas colocadas en ella (horizontal o vertical).
- **Partida**: el juego de una sopa, con las palabras encontradas hasta el momento y el número de intentos.
- **Marca**: la primera letra que la persona ha tocado y todavía no ha completado con la última.

## Criterios de éxito *(obligatorio)*

### Resultados medibles

- **CE-001**: Una persona que usa la app por primera vez encuentra su primera palabra sin ayuda, en menos de 2 minutos desde que entra en la actividad.
- **CE-002**: En una partida completa, el número de intentos del mensaje final coincide siempre con el número de veces que la persona ha marcado una línea recta (3 aciertos más los fallos), sin contar las pulsaciones ignoradas.
- **CE-003**: Tras 10 partidas seguidas, ninguna sopa se repite dos veces seguidas y en todas se pueden encontrar las 3 palabras.
- **CE-004**: En el 100 % de los casos, un fallo o una línea no recta muestra un mensaje amable y permite seguir sin quedar bloqueada la pantalla ni perderse las palabras ya encontradas.
- **CE-005**: En ningún momento de la partida se puede ver una palabra aún no encontrada, solo cuántas faltan.
- **CE-006**: La persona puede dejar la actividad parada el tiempo que quiera en cualquier pantalla sin que cambie nada ni se pierda la partida.
- **CE-007**: Una persona mayor sin conocimientos técnicos puede comprobar usando solo la app, y sin leer código, que cada una de las historias de usuario se cumple.
- **CE-008**: Todas las pruebas de la actividad pasan.

## Suposiciones

- La actividad se añade a la lista real de actividades junto a "Parejas" y "Forma la palabra", y sigue el contrato de actividades de la funcionalidad 001.
- "5x6" se entiende como 5 filas por 6 columnas, que permite colocar una palabra de 6 letras (como "LLUVIA") en horizontal. En vertical caben palabras de hasta 5 letras.
- Como no se generan sopas nuevas, las sopas están preparadas de antemano y "Jugar otra vez" sortea otra distinta de la actual. Si se prefiriera una única sopa fija, bastaría con reducir la lista a una; hacerlo es una decisión de la persona responsable del producto.
- Las palabras buscadas son palabras cotidianas conocidas por personas mayores, sin tecnicismos, y su relación con la palabra de referencia es clara (por ejemplo, "NUBE": "LLUVIA", "CIELO", "VIENTO").
- Un intento es cada marca completa de dos letras en una línea recta, sea acierto o fallo. Por eso el mínimo de intentos es 3.
- Una línea recta marcada al revés (de derecha a izquierda o de abajo arriba) se trata como un fallo normal, ya que las palabras nunca están al revés.
- Las palabras ocultas de la lista se muestran como casillas vacías o puntos, sin indicar cuántas letras tienen.
- El botón "Volver al inicio" durante la partida lo pone el marco común de la app, como en el resto de actividades. La pantalla final añade además su propio "Volver al inicio", como pide la descripción.
- No se guarda nada entre partidas: ni puntuaciones, ni sopas vistas, ni progreso.
- Basta con un mensaje positivo, un mensaje amable de error, un mensaje de línea no recta y un mensaje de invitación a tocar la última letra; no hace falta variarlos.
