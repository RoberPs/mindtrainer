# Especificación de la funcionalidad: Más variedad en los juegos

**Rama de la funcionalidad**: `008-mas-variedad-juegos`

**Creada**: 2026-11-09

**Estado**: Borrador

**Entrada**: Última funcionalidad del proyecto. Reúne las mejoras de contenido y variedad observadas al probar los juegos (ver `specs/ideas-pendientes.md`). Historias por prioridad: P1) Adivinanzas con un banco de al menos 50; P1) Sopa de letras con las direcciones mejor repartidas; P2) Diferencias con varias escenas fijas y un catálogo de unos 50 iconos; P3) Diferencias con 3, 5 o 7 diferencias a elegir; P3) Sopa de letras en tamaño pequeño o mediano a elegir; P4) Animación de victoria con un fundido más largo. Fuera de alcance: palabras al revés o en diagonal, tres tamaños de sopa y colocación aleatoria de iconos.

## Aclaraciones

### Sesión 2026-11-09

- Q: Al pulsar "Jugar otra vez" en "Adivinanzas", ¿deben evitarse las adivinanzas de la partida anterior? → A: Sí. Las 5 de la partida nueva son distintas de las 5 de la anterior.
- Q: Al pulsar "Jugar otra vez" en "Diferencias", ¿debe evitarse la escena de la partida anterior? → A: Sí. La escena nueva es siempre distinta de la anterior.

## Escenarios de usuario y pruebas *(obligatorio)*

### Historia 1 - Adivinanzas distintas en cada partida (Prioridad: P1)

Una persona mayor juega a "Adivinanzas" varios días seguidos. Hoy el banco tiene solo 10 adivinanzas y cada partida enseña 5, así que las partidas se parecen mucho. Con al menos 50 adivinanzas tradicionales, cada partida le trae adivinanzas nuevas durante muchas partidas.

**Por qué esta prioridad**: es el cambio que más reduce la sensación de repetición y no toca ninguna regla ni pantalla, solo contenido.

**Prueba independiente**: se puede probar jugando varias partidas seguidas de "Adivinanzas" y comprobando que las adivinanzas que salen no se repiten de una partida a la siguiente más que por casualidad, y que cada una es entendible y tiene una sola respuesta correcta.

**Escenarios de aceptación**:

1. **Dado** que juego una partida de "Adivinanzas", **cuando** veo las 5 adivinanzas, **entonces** son 5 distintas entre sí, como hasta ahora.
2. **Dado** que termino una partida y pulso "Jugar otra vez", **cuando** veo las 5 adivinanzas nuevas, **entonces** ninguna es una de las 5 de la partida anterior.
3. **Dado** que veo cualquier adivinanza, **cuando** leo las 3 opciones, **entonces** solo una es correcta, ninguna de las otras dos podría valer también como respuesta y el texto no contiene la respuesta.
4. **Dado** que respondo, acierto o fallo, **cuando** termino las 5 adivinanzas, **entonces** el resultado, la puntuación y los botones funcionan igual que antes.

---

### Historia 2 - Sopas de letras con palabras en horizontal y en vertical bien repartidas (Prioridad: P1)

Ahora cada una de las 5 sopas tiene 2 palabras en horizontal y 1 en vertical, y da la impresión de que casi todo es horizontal. La persona quiere que cada sopa se sienta distinta: algunas con más palabras verticales.

**Por qué esta prioridad**: es un cambio pequeño de contenido que mejora la variedad desde la primera partida.

**Prueba independiente**: se puede probar jugando las 5 sopas y comprobando que no todas tienen la misma mezcla y que en algunas hay más palabras en vertical que en horizontal.

**Escenarios de aceptación**:

1. **Dado** que juego las 5 sopas pequeñas, **cuando** las comparo, **entonces** al menos 2 tienen 2 palabras en vertical y 1 en horizontal, y el resto mantienen 2 en horizontal y 1 en vertical.
2. **Dado** que una palabra tiene 6 letras, **cuando** aparece en una sopa, **entonces** está en horizontal, porque en vertical no cabría.
3. **Dado** que busco una palabra, **cuando** la miro en la cuadrícula, **entonces** aparece una sola vez y solo se lee de izquierda a derecha o de arriba abajo.
4. **Dado** que marco las letras de una palabra, **cuando** termino las 3 palabras, **entonces** la felicitación y los botones funcionan igual que antes.

---

### Historia 3 - Escenas distintas y más iconos en "Diferencias" (Prioridad: P2)

Hoy la escena de "Diferencias" es una sola y fija, así que se memoriza a la segunda partida. La persona quiere que cada partida le enseñe una escena distinta, con iconos variados, para que siga siendo un reto.

**Por qué esta prioridad**: da vida a un juego que hoy se agota enseguida, pero necesita más trabajo de preparación y revisión que las historias anteriores.

**Prueba independiente**: se puede probar jugando varias partidas seguidas de "Diferencias" y comprobando que las escenas cambian (iconos distintos, en sitios distintos y en distinta cantidad) y que las diferencias se encuentran y se marcan correctamente en todas.

**Escenarios de aceptación**:

1. **Dado** que empiezo una partida de "Diferencias", **cuando** aparecen los dos dibujos, **entonces** muestran una escena de entre varias preparadas de antemano.
2. **Dado** que termino una partida y pulso "Jugar otra vez", **cuando** aparece la escena nueva, **entonces** es distinta de la anterior, con iconos diferentes y con distinta cantidad de iconos.
3. **Dado** que miro cualquier escena, **cuando** examino los dos dibujos, **entonces** todos los iconos se reconocen a simple vista, tienen colores de alto contraste y caben sin tocarse.
4. **Dado** que toco una diferencia en cualquier escena, **cuando** acierto, **entonces** se marca con su círculo y cuenta, igual que hasta ahora.
5. **Dado** que toco un icono que no es una diferencia o un hueco, **cuando** lo hago, **entonces** no se marca ni se cuenta nada.

---

### Historia 4 - Elegir cuántas diferencias buscar en "Diferencias" (Prioridad: P3)

Antes de empezar, la persona elige buscar 3, 5 o 7 diferencias. Así puede empezar fácil y subir de dificultad cuando quiera, como ya hace en "Parejas" al elegir el tamaño.

**Por qué esta prioridad**: añade una decisión nueva y cambia reglas y textos del juego, pero la app funciona igual de bien sin ella.

**Prueba independiente**: se puede probar eligiendo cada opción (3, 5 y 7), encontrando todas las diferencias y comprobando que el aviso de cuántas faltan y la felicitación final dicen el número correcto.

**Escenarios de aceptación**:

1. **Dado** que abro "Diferencias", **cuando** veo la pantalla de elegir, **entonces** puedo escoger entre 3, 5 o 7 diferencias con botones grandes, cada uno con su número escrito.
2. **Dado** que elijo un número, **cuando** empieza la partida, **entonces** hay exactamente ese número de diferencias entre los dos dibujos y la descripción dice cuántas hay que buscar.
3. **Dado** que voy encontrando diferencias, **cuando** encuentro cada una, **entonces** el aviso dice cuántas faltan según el número elegido.
4. **Dado** que encuentro la última, **cuando** termina la partida, **entonces** la felicitación menciona el número de diferencias que había y puedo jugar otra vez o volver al inicio.
5. **Dado** que termino una partida, **cuando** pulso "Jugar otra vez", **entonces** puedo volver a elegir 3, 5 o 7.

---

### Historia 5 - Elegir el tamaño de la sopa de letras (Prioridad: P3)

Antes de empezar, la persona elige una sopa pequeña (la actual, con 3 palabras) o mediana (con más casillas y 5 palabras). Es el mismo tipo de elección que ya existe en "Parejas".

**Por qué esta prioridad**: da más reto a quien ya domina la sopa actual, pero requiere sopas nuevas hechas y revisadas a mano.

**Prueba independiente**: se puede probar eligiendo cada tamaño, encontrando todas las palabras y comprobando que las casillas se pueden tocar con comodidad y que los avisos y la felicitación dicen el número correcto de palabras.

**Escenarios de aceptación**:

1. **Dado** que abro "Sopa de letras", **cuando** veo la pantalla de elegir, **entonces** puedo escoger entre pequeña (3 palabras) y mediana (5 palabras) con botones grandes y su descripción escrita.
2. **Dado** que elijo pequeña, **cuando** empieza la partida, **entonces** juego una sopa como las de ahora.
3. **Dado** que elijo mediana, **cuando** empieza la partida, **entonces** veo una cuadrícula con más casillas y 5 palabras que buscar, con todas las casillas lo bastante grandes para tocarlas con comodidad en un móvil pequeño.
4. **Dado** que voy encontrando palabras, **cuando** encuentro cada una, **entonces** el aviso dice cuántas faltan según el tamaño elegido.
5. **Dado** que encuentro la última palabra, **cuando** termina la partida, **entonces** la felicitación menciona el número de palabras que había y puedo jugar otra vez o volver al inicio.
6. **Dado** que termino una partida, **cuando** pulso "Jugar otra vez", **entonces** puedo volver a elegir el tamaño.

---

### Historia 6 - Animación de victoria más visible (Prioridad: P4)

El fundido del icono de celebración dura hoy 400 milisegundos y casi no se nota. La persona quiere que se vea mejor, pero sin marear: un fundido más lento, sin movimiento ni crecimiento.

**Por qué esta prioridad**: es una mejora pequeña de pulido; la app se usa igual sin ella.

**Prueba independiente**: se puede probar terminando una partida de cada actividad y observando cómo aparece el icono; después, activando en el móvil el ajuste de reducir movimiento y comprobando que el icono aparece directamente.

**Escenarios de aceptación**:

1. **Dado** que termino una partida de cualquiera de las 5 actividades, **cuando** aparece la pantalla final, **entonces** el icono de celebración aparece poco a poco, más despacio que antes, en entre 800 y 1000 milisegundos, sin moverse de sitio ni cambiar de tamaño.
2. **Dado** que la animación ha terminado, **cuando** sigo en la pantalla final, **entonces** el icono se queda quieto y no se repite.
3. **Dado** que la animación está en marcha, **cuando** pulso "Jugar otra vez" o "Volver al inicio", **entonces** el botón responde al instante.
4. **Dado** que tengo activado en el móvil el ajuste de reducir movimiento, **cuando** aparece la pantalla final, **entonces** el icono se ve directamente, sin animación.

---

### Casos límite

- Ninguna mejora cambia el funcionamiento básico de los juegos: acertar, fallar, la puntuación y el final de la partida siguen igual que antes.
- Una adivinanza nunca aparece dos veces en la misma partida ni en dos partidas seguidas.
- Si el banco de adivinanzas, las sopas o las escenas tuvieran un error de contenido (una respuesta ambigua, una palabra que aparece dos veces, una zona de diferencia que se sale del dibujo), las pruebas automáticas lo detectan antes de entregar la app.
- Con 7 diferencias, los círculos de las zonas no se pisan entre sí ni se salen del dibujo, y se pueden tocar con comodidad.
- En un móvil pequeño (unos 360 puntos de ancho), la sopa mediana sigue pudiéndose jugar sin errores al tocar.
- Los textos que mencionan un número ("3 palabras", "las 3 diferencias", "faltan 2") se adaptan al número elegido; no queda ningún "3" fijo que contradiga lo que se está jugando.
- Al volver al inicio y abrir de nuevo el juego, se vuelve a pedir la elección de tamaño o de número de diferencias.
- La animación de victoria no retrasa ni bloquea el texto ni los botones, y las pruebas automáticas no dependen de ella.

## Requisitos *(obligatorio)*

### Requisitos funcionales

**Adivinanzas**

- **RF-001**: El banco de "Adivinanzas" MUST tener al menos 50 adivinanzas. Este requisito sustituye al RF-010 de la spec 005, que exigía al menos 10.
- **RF-002**: Cada adivinanza MUST ser tradicional y conocida, tener como respuesta una sola palabra, mostrar 3 opciones distintas con una sola correcta, y sus dos opciones incorrectas MUST NO valer también como respuesta (RF-011 de la spec 005). El texto de la adivinanza MUST NO contener la respuesta.
- **RF-003**: Cada partida MUST seguir enseñando 5 adivinanzas distintas entre sí, elegidas del banco completo, y MUST NO incluir ninguna de las 5 de la partida inmediatamente anterior.
- **RF-004**: Una persona MUST haber revisado una por una las adivinanzas nuevas antes de darlas por buenas.

**Sopa de letras**

- **RF-005**: Las 5 sopas pequeñas actuales MUST repartirse mejor: al menos 2 de ellas MUST tener 2 palabras en vertical y 1 en horizontal. Las palabras de 6 letras MUST seguir en horizontal.
- **RF-006**: Cada palabra MUST aparecer una sola vez en su cuadrícula y MUST poder leerse solo de izquierda a derecha o de arriba abajo. No se añaden palabras al revés ni en diagonal.
- **RF-007**: Al abrir "Sopa de letras", la persona MUST poder elegir entre dos tamaños: pequeño (la cuadrícula actual, con 3 palabras) y mediano (una cuadrícula con más casillas, de 6 o 7 columnas como máximo, con 5 palabras).
- **RF-008**: Cada tamaño MUST tener sus propias sopas hechas a mano y revisadas una a una por una persona. Cada sopa mediana MUST cumplir también RF-006.
- **RF-009**: Las casillas de la sopa mediana MUST ser lo bastante grandes para tocarlas con comodidad en un móvil de unos 360 puntos de ancho, y la cuadrícula MUST caber en la pantalla sin deslizar de lado.
- **RF-010**: Los textos de "Sopa de letras" que mencionan el número de palabras (etiqueta, descripción, aviso de cuántas faltan y felicitación) MUST reflejar el tamaño elegido (3 o 5).
- **RF-011**: La pantalla de elegir tamaño MUST usar botones grandes con su nombre y su descripción escritos junto a un icono, y MUST volver a mostrarse al pulsar "Jugar otra vez".

**Diferencias**

- **RF-012**: "Diferencias" MUST tener varias escenas fijas, preparadas y revisadas a mano (no generadas al azar), de modo que cada partida use una escena elegida entre ellas, siempre distinta de la de la partida inmediatamente anterior.
- **RF-013**: Las escenas MUST usar entre todas un catálogo de unos 50 iconos distintos. Cada icono MUST existir en la app, reconocerse a simple vista, tener colores de alto contraste y haber sido revisado una a una por una persona.
- **RF-014**: Las escenas MUST variar en los iconos que usan, en dónde están colocados y en cuántos hay. Cada escena MUST tener suficientes elementos para albergar hasta 7 diferencias sin que se pisen.
- **RF-015**: Las zonas donde se marca cada diferencia MUST medir al menos unos 44 puntos, no solaparse entre sí y no salirse del dibujo. Las zonas MUST ser datos fijos revisados a mano, no calculados al azar.
- **RF-016**: Al abrir "Diferencias", la persona MUST poder elegir entre 3, 5 o 7 diferencias, con botones grandes que muestran el número escrito junto a un icono. La elección MUST volver a pedirse al pulsar "Jugar otra vez".
- **RF-017**: Con la elección hecha, la partida MUST tener exactamente ese número de diferencias entre los dos dibujos. Los textos que mencionan la cantidad (descripción, aviso de cuántas faltan y felicitación) y la regla de terminar la partida MUST seguir el número elegido.
- **RF-018**: Tocar un icono que no es una diferencia, o un hueco, MUST NO marcar ni contar nada, igual que hasta ahora.

**Animación de victoria**

- **RF-019**: El fundido del icono de celebración de la pantalla final MUST durar entre 800 y 1000 milisegundos. Este requisito sustituye al RF-008 de la spec 007, que fijaba entre 300 y 600 milisegundos.
- **RF-020**: La animación MUST seguir ocurriendo una sola vez, sin movimiento, giro, temblor, parpadeo ni crecimiento. No bloquea ni retrasa el texto ni los botones, y se desactiva con el ajuste de reducir movimiento del móvil (RF-009, RF-010 y RF-011 de la spec 007 siguen vigentes).

**General**

- **RF-021**: Ninguna mejora MUST cambiar las reglas básicas de los juegos (acertar, fallar, puntuación, final de partida), ni añadir sonidos, vibración, internet, cuentas o datos guardados.
- **RF-022**: Todos los textos nuevos o cambiados MUST estar en español de España, con tildes y signos de apertura, y con letra de al menos 22 puntos y botones de al menos 64 puntos de alto.
- **RF-023**: Las pruebas automáticas MUST comprobar, de forma básica: que el banco de adivinanzas tiene al menos 50, con tres respuestas distintas, una sola palabra y sin la respuesta en el texto; que cada sopa (pequeña y mediana) tiene cada palabra una sola vez y en horizontal o vertical, y que al menos 2 sopas pequeñas tienen más palabras verticales que horizontales; que cada escena tiene zonas que no se solapan y de tamaño suficiente, y que cada número de diferencias (3, 5 y 7) se puede jugar hasta el final con el aviso de cuántas faltan y la felicitación correctos; y que la duración de la animación está entre 800 y 1000 milisegundos.

### Fuera de alcance

Palabras al revés o en diagonal, tres tamaños de sopa de letras, colocación aleatoria de iconos, sonidos, vibración, confeti, tamaños o niveles en otras actividades, y cualquier otra idea nueva. No se construyen en esta funcionalidad.

### Entidades clave

- **Adivinanza**: texto de la adivinanza, 3 opciones de una palabra y cuál es la correcta. El banco pasa de 10 a al menos 50.
- **Sopa**: cuadrícula de letras con sus palabras, la posición y la dirección (horizontal o vertical) de cada una, y su tamaño (pequeña o mediana).
- **Escena**: par de dibujos de iconos para "Diferencias", con los iconos de cada uno, su colocación y las zonas donde se pueden marcar las diferencias. Hay varias, fijas y revisadas a mano.
- **Catálogo de iconos**: lista de unos 50 iconos reconocibles y de alto contraste que usan las escenas.
- **Elección de partida**: el tamaño de la sopa (pequeño o mediano) o el número de diferencias (3, 5 o 7) que la persona escoge antes de empezar.

## Criterios de éxito *(obligatorio)*

### Resultados medibles

- **CE-001**: El banco de "Adivinanzas" contiene al menos 50 adivinanzas, y dos partidas seguidas nunca comparten ninguna adivinanza (en 2 partidas seguidas se ven siempre 10 adivinanzas distintas).
- **CE-002**: Al menos 2 de las 5 sopas pequeñas tienen más palabras verticales que horizontales, y en todas las sopas cada palabra se encuentra una sola vez.
- **CE-003**: Al elegir tamaño en "Sopa de letras", la sopa mediana tiene 5 palabras y se completa tocando las casillas con comodidad en un móvil de unos 360 puntos de ancho, sin errores al tocar.
- **CE-004**: Dos partidas seguidas de "Diferencias" nunca usan la misma escena, y en 5 partidas seguidas se ven al menos 2 escenas distintas entre sí.
- **CE-005**: Al elegir 3, 5 o 7 diferencias, la partida tiene exactamente ese número, el aviso de cuántas faltan es correcto en cada momento y la felicitación final menciona el número elegido.
- **CE-006**: En todas las escenas, ninguna zona de diferencia se solapa con otra ni se sale del dibujo, y todas se pueden tocar con comodidad.
- **CE-007**: En las 5 actividades, el icono de celebración aparece poco a poco en entre 0,8 y 1 segundo, se queda quieto y no se repite; con el ajuste de reducir movimiento activado, no se anima.
- **CE-008**: Una persona mayor sin conocimientos técnicos puede comprobar usando solo la app, y sin leer código, que cada una de las historias de usuario se cumple.
- **CE-009**: Todas las pruebas de la funcionalidad pasan, y siguen pasando las de las funcionalidades 001 a 007 (salvo las que fijaban las cantidades y la duración que esta funcionalidad cambia a propósito).

## Suposiciones

- Es la última funcionalidad del proyecto: recoge las ideas de `specs/ideas-pendientes.md` acordadas con la persona responsable el 2026-11-09. Las ideas descartadas (palabras al revés o en diagonal, tres tamaños de sopa, colocación aleatoria) no se construyen.
- Los cambios de la spec 007 (duración de la animación) y de las specs 004, 005 y 006 (cantidades de palabras, adivinanzas y diferencias) sustituyen a los requisitos antiguos en lo que se indica; el resto de esas specs sigue vigente.
- La elección de tamaño de la sopa y de número de diferencias se hace en una pantalla de elegir antes de empezar, con el mismo estilo que la de "Parejas".
- El número de sopas medianas y de escenas se fija al planificar; esta especificación pide como mínimo más de una sopa mediana, al menos 3 escenas distintas y los unos 50 iconos del catálogo, todo revisado a mano.
- Los iconos salen de los ya incluidos en la app (sin internet) y las adivinanzas son tradicionales, revisadas por la persona responsable.
- Si alguna historia de prioridad baja resultara demasiado grande al planificar, se puede dejar fuera sin afectar a las anteriores: cada historia se puede probar y entregar por separado.
- El ajuste de reducir movimiento es el del propio móvil; la app no tiene uno propio.
