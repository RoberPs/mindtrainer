# Especificación de la funcionalidad: Bienvenida, selección de juegos más intuitiva y nueva identidad de color

**Rama de la funcionalidad**: `009-bienvenida-seleccion-juegos`

**Creada**: 2026-11-09

**Estado**: Borrador

**Entrada**: Pantalla de bienvenida, pantalla de juegos con encabezado claro y selección de juego más intuitiva (ideas de `specs/ideas-pendientes.md`, sección "Pantalla de bienvenida y selección de juegos más intuitiva"), más el cambio de los colores de toda la app por los del logo y los bocetos. Recursos ya en el repositorio: `assets/logo.svg`, `assets/diseno/logo-presentacion.png` (paleta), `assets/diseno/boceto-dashboard-inicio.png` (boceto de la bienvenida) y `assets/diseno/icono-app.png`. Historias por prioridad: P1) Pantalla de bienvenida; P1) Nueva identidad de color en toda la app; P2) Pantalla de juegos con tarjetas grandes; P2) Cada juego conserva su color en todos sus botones y elementos. Fuera de alcance: nuevas reglas de juego, animaciones nuevas, internet, cuentas y datos guardados.

## Aclaraciones

### Sesión 2026-11-09

- Q: ¿Qué mensaje lleva la bienvenida: "Empieza a entrenar tu mente" (ideas pendientes) o "Buenos días" (boceto)? → A (decisión por defecto, revisable): título "Empieza a entrenar tu mente" y debajo la pregunta del boceto "¿Listo para ejercitar tu memoria hoy?". "Buenos días" se descarta porque sería incorrecto por la tarde o por la noche y la app no usa la hora.
- Q: ¿Cuál es el nombre de la app que sustituye al hueco "[Nombre de la app]" del boceto? → A: el actual, "MindTrainer".

## Escenarios de usuario y pruebas *(obligatorio)*

### Historia 1 - Pantalla de bienvenida (Prioridad: P1)

Al abrir la app, la persona ve primero una pantalla tranquila y acogedora, como el boceto: arriba, el logo pequeño junto al nombre de la app; en el centro, el logo grande; debajo, el mensaje "Empieza a entrenar tu mente" y la pregunta "¿Listo para ejercitar tu memoria hoy?"; abajo, un botón grande "Empezar" que lleva a la pantalla de juegos.

**Por qué esta prioridad**: es lo primero que se ve y da la identidad de la app; el resto de la funcionalidad cuelga de ella.

**Prueba independiente**: se puede probar abriendo la app, comprobando que aparece la bienvenida con el logo y los textos, y pulsando "Empezar" para llegar a la lista de juegos.

**Escenarios de aceptación**:

1. **Dado** que abro la app, **cuando** termina de cargar, **entonces** veo la bienvenida con el logo, el nombre "MindTrainer", el mensaje, la pregunta y el botón "Empezar", sin necesidad de internet.
2. **Dado** que estoy en la bienvenida, **cuando** pulso "Empezar", **entonces** llego a la pantalla de juegos.
3. **Dado** que estoy en la pantalla de juegos, **cuando** vuelvo atrás desde un juego con "Volver al inicio", **entonces** regreso a la pantalla de juegos, no a la bienvenida.
4. **Dado** que veo el logo, **cuando** miro la pantalla, **entonces** el logo va siempre junto a texto (el nombre o el mensaje) y nunca en lugar de él.

---

### Historia 2 - Nueva identidad de color en toda la app (Prioridad: P1)

Hoy la app usa azul oscuro, verde, morado, marrón y verde azulado. La persona responsable quiere que todo siga los colores del logo y los bocetos: fondo crema cálido, azul, naranja, verde y magenta, con textos en azul muy oscuro, de modo que la app se sienta como una sola marca.

**Por qué esta prioridad**: afecta a todas las pantallas y fija la paleta de la que dependen las demás historias.

**Prueba independiente**: se puede probar recorriendo la bienvenida, la lista de juegos y cada juego, y comprobando que el fondo es crema, los colores son los de la paleta y todo el texto se lee con claridad.

**Escenarios de aceptación**:

1. **Dado** que recorro cualquier pantalla de la app, **cuando** miro los fondos, **entonces** el fondo general es el crema del logo y no queda ningún fondo blanco puro ni color de la paleta antigua.
2. **Dado** que veo cualquier botón o tarjeta de color con texto, **cuando** mido el contraste entre el texto y su fondo, **entonces** es de al menos 7 a 1.
3. **Dado** que el tono puro del logo no llegara a 7 a 1 con el texto que lleva, **cuando** se aplica a un botón o tarjeta, **entonces** se usa una versión más oscura de ese mismo color, lo mínimo necesaria, o se cambia el color del texto; nunca se baja el contraste.
4. **Dado** que veo cualquier texto sobre el fondo crema, **cuando** lo leo, **entonces** es de azul muy oscuro (o negro) y se distingue con comodidad.

---

### Historia 3 - Pantalla de juegos con tarjetas grandes (Prioridad: P2)

La pantalla de juegos tiene el encabezado "Elige uno de los juegos". Cada juego se muestra como una tarjeta grande con un icono grande, su nombre y su descripción, de modo que se reconozca de un vistazo y no sea solo una lista de botones iguales.

**Por qué esta prioridad**: mejora mucho la comprensión, pero la app se puede usar con la lista actual si hiciera falta.

**Prueba independiente**: se puede probar entrando en la pantalla de juegos, leyendo el encabezado, identificando cada juego por su icono, color y nombre, y pulsando una tarjeta para abrir el juego.

**Escenarios de aceptación**:

1. **Dado** que estoy en la pantalla de juegos, **cuando** miro arriba, **entonces** leo "Elige uno de los juegos".
2. **Dado** que veo la lista, **cuando** miro cada juego, **entonces** es una tarjeta grande con icono grande, color propio y nombre y descripción escritos junto al icono.
3. **Dado** que hay 5 juegos (y podrá haber más), **cuando** deslizo la pantalla, **entonces** puedo ver y pulsar todos, y cada tarjeta tiene al menos 64 puntos de alto y letra de al menos 22 puntos.
4. **Dado** que pulso una tarjeta, **cuando** se abre el juego, **entonces** funciona igual que antes.

---

### Historia 4 - Cada juego conserva su color (Prioridad: P2)

Dentro de cada juego, sus botones y elementos principales (botones de acción, casillas o tarjetas seleccionables, marcas, avisos y pantalla final) usan el color propio de ese juego, el mismo de su tarjeta en la lista. Así la persona siempre sabe en qué juego está.

**Por qué esta prioridad**: da coherencia, pero depende de que la paleta (historia 2) ya esté definida.

**Prueba independiente**: se puede probar entrando en cada uno de los 5 juegos y comprobando que sus botones y elementos principales tienen el color de su tarjeta, y que cada juego tiene un color distinto de los demás.

**Escenarios de aceptación**:

1. **Dado** que abro un juego, **cuando** miro sus botones, **entonces** usan el color de su tarjeta en la lista.
2. **Dado** que paso de la pantalla de elegir tamaño o número, a la partida y a la pantalla final, **cuando** miro los botones y las marcas, **entonces** todas conservan el mismo color del juego.
3. **Dado** que comparo los 5 juegos, **cuando** miro sus colores, **entonces** cada juego tiene uno distinto y reconocible, y se distinguen por el texto y el icono, no solo por el color.
4. **Dado** que el color de un juego es el mismo que el de las marcas de acierto o de error, **cuando** acierto o fallo, **entonces** el resultado se entiende también por el texto o el icono, no solo por el color.

---

### Casos límite

- Ninguna parte de esta funcionalidad cambia las reglas de los juegos: acertar, fallar, puntuación, final de partida y avisos siguen igual.
- La bienvenida se ve completa, sin deslizar, en un móvil pequeño (unos 360 puntos de ancho) y con la letra del móvil aumentada; si no cupiera, se puede deslizar y el botón "Empezar" sigue accesible.
- Si en el futuro se añade un sexto juego, su tarjeta se muestra con el mismo estilo; si no tiene color propio, usa el azul principal.
- El logo se ve igual sin internet.
- Con el ajuste de reducir movimiento activado, no hay diferencia: la bienvenida no tiene animaciones.
- Las marcas de acierto (verde) y de error (rojo) no se confunden con el color de un juego ni se distinguen solo por el color.

## Requisitos *(obligatorio)*

### Requisitos funcionales

**Bienvenida**

- **RF-001**: Al abrir la app, MUST mostrarse primero una pantalla de bienvenida con: el logo pequeño junto al nombre "MindTrainer" arriba, el logo grande en el centro, el título "Empieza a entrenar tu mente", la pregunta "¿Listo para ejercitar tu memoria hoy?" y un botón grande "Empezar" abajo, siguiendo el boceto `assets/diseno/boceto-dashboard-inicio.png`.
- **RF-002**: Pulsar "Empezar" MUST llevar a la pantalla de juegos. La bienvenida MUST mostrarse solo al abrir la app; al volver al inicio desde un juego, MUST verse la pantalla de juegos.
- **RF-003**: El logo MUST ir incluido en la app y verse sin internet, y MUST ir siempre junto a texto, nunca en lugar de él.
- **RF-004**: La bienvenida MUST NO pedir datos, cuentas ni permisos, ni guardar nada, y MUST NO tener animaciones.

**Pantalla de juegos**

- **RF-005**: La pantalla de juegos MUST mostrar el encabezado "Elige uno de los juegos".
- **RF-006**: Cada juego MUST mostrarse como una tarjeta grande con un icono grande, su nombre y su descripción escritos junto al icono, y el color propio del juego.
- **RF-007**: Todos los juegos MUST poder verse y pulsarse deslizando la pantalla, con los 5 actuales y con los que se añadan después. Cada tarjeta MUST tener al menos 64 puntos de alto y letra de al menos 22 puntos, con contraste de al menos 7 a 1.
- **RF-008**: Pulsar una tarjeta MUST abrir el juego igual que hasta ahora; el contrato de las actividades MUST seguir sirviendo sin que cada juego tenga que cambiar sus reglas.

**Colores**

- **RF-009**: La paleta de toda la app MUST basarse en la del logo: azul `#2563D6`, naranja `#F2800D`, verde `#1E9E63` y magenta `#D6336C`, con el gris azulado `#5B6B8C` del logo, el fondo crema `#FFF9F0` y un azul muy oscuro para los textos. Los colores MUST vivir en un solo sitio (el tema de la app).
- **RF-010**: Todo texto, y todo icono con significado, MUST tener un contraste de al menos 7 a 1 con su fondo. Si el tono puro de la paleta no lo alcanza, MUST usarse una versión más oscura del mismo color (la mínima necesaria) o texto de otro color, manteniendo el aire del logo.
- **RF-011**: El fondo general de todas las pantallas MUST ser el crema del logo. La paleta antigua (azul oscuro `#0B3D91`, verde oscuro, morado, marrón y verde azulado) MUST desaparecer de la app.
- **RF-012**: Cada uno de los 5 juegos MUST tener un color propio distinto de los demás, tomado de la paleta (azul, naranja, verde y magenta, más un quinto tono derivado de ellos o del gris azulado). El quinto MUST distinguirse claramente de los otros cuatro.
- **RF-013**: Dentro de cada juego, sus botones y elementos principales (botones de acción, elementos seleccionables, marcas de selección, avisos, pantalla de elegir tamaño o número y pantalla final) MUST usar el color propio del juego. Los colores de acierto y de error MUST mantenerse reconocibles y se MUST acompañar de texto o icono.
- **RF-014**: El resto de pantallas y componentes comunes (botón "Volver al inicio", avisos de salir, felicitaciones) MUST usar el color del juego en el que se está, o el azul principal en la bienvenida y la lista de juegos.
- **RF-015**: Los iconos de la app (el de la app en el móvil y la pantalla de carga) MUST usar el logo de `assets/diseno/icono-app.png` y `assets/logo.svg`, y MUST seguir viéndose bien con sus recursos actuales si no se cambian.

**General**

- **RF-016**: La funcionalidad MUST NO cambiar las reglas de los juegos, ni añadir sonidos, vibración, animaciones nuevas, internet, cuentas o datos guardados.
- **RF-017**: Todos los textos nuevos o cambiados MUST estar en español de España, con tildes y signos de apertura, con letra de al menos 22 puntos y botones de al menos 64 puntos de alto, y MUST vivir en el archivo de textos.
- **RF-018**: Las pruebas automáticas MUST comprobar, de forma básica: que al abrir la app aparece la bienvenida y "Empezar" lleva a la lista de juegos; que "Volver al inicio" desde un juego lleva a la lista y no a la bienvenida; que la lista muestra el encabezado "Elige uno de los juegos" y los 5 juegos, cada uno con su icono y su texto; que los 5 colores de juego son distintos entre sí; y que cada combinación de texto y fondo de la paleta tiene un contraste de al menos 7 a 1.

### Fuera de alcance

Nuevas reglas o juegos, animaciones nuevas, sonidos, saludo según la hora ("Buenos días"), nombre o logo a elegir por la persona, modo oscuro, internet, cuentas, datos guardados, y cualquier otra idea nueva. No se construyen en esta funcionalidad.

### Entidades clave

- **Paleta**: conjunto de colores de la app (fondo crema, texto azul oscuro, azul, naranja, verde, magenta, gris azulado y sus versiones oscurecidas para alcanzar el contraste), definidos en un solo sitio.
- **Color de juego**: color propio de cada juego, distinto del de los demás, que usa en su tarjeta y en todos sus botones y elementos.
- **Tarjeta de juego**: elemento grande de la pantalla de juegos con icono, nombre, descripción y color propio.
- **Bienvenida**: primera pantalla de la app, con el logo, el mensaje y el botón "Empezar".

## Criterios de éxito *(obligatorio)*

### Resultados medibles

- **CE-001**: Al abrir la app, una persona llega de la bienvenida a la lista de juegos pulsando un solo botón ("Empezar"), y la bienvenida muestra el logo, el nombre, el mensaje y la pregunta del boceto.
- **CE-002**: En la pantalla de juegos, una persona mayor identifica el juego que busca por su icono, color y nombre sin leer las descripciones, y abre cualquiera de los 5 juegos con un solo toque.
- **CE-003**: El 100 % de las combinaciones de texto y fondo de la app tienen un contraste de al menos 7 a 1, y todos los botones y tarjetas tienen al menos 64 puntos de alto y letra de al menos 22 puntos.
- **CE-004**: Los 5 juegos tienen 5 colores distintos, y en cada juego los botones y elementos principales (elegir tamaño o número, partida y pantalla final) conservan el color de su tarjeta.
- **CE-005**: En ninguna pantalla queda un fondo blanco puro ni un color de la paleta antigua.
- **CE-006**: Una persona sin conocimientos técnicos puede comprobar usando solo la app, y sin leer código, que cada historia de usuario se cumple, en un móvil de unos 360 puntos de ancho.
- **CE-007**: Todas las pruebas de la funcionalidad pasan, y siguen pasando las de las funcionalidades 001 a 008 (salvo las que fijaban la lista como pantalla inicial o los colores antiguos, que esta funcionalidad cambia a propósito).

## Suposiciones

- Es una funcionalidad de presentación: no toca la lógica de ningún juego ni su contenido.
- El logo se incluye como imagen vectorial `assets/logo.svg`, o como imagen equivalente si la app lo necesitara, siempre dentro de la app. El logo ya facilitado por la persona responsable es el definitivo.
- El nombre "MindTrainer" es el nombre actual de la app; si cambia, se cambia en un solo texto.
- Los colores puros de la paleta (azul `#2563D6`, naranja `#F2800D`, verde `#1E9E63`, magenta `#D6336C`) no alcanzan 7 a 1 con texto blanco, y algunos tampoco con texto oscuro; por eso se oscurecen lo mínimo necesario o se elige el color del texto que lo cumpla. Los tonos exactos se fijan al planificar, comprobándolos con la prueba de contraste.
- El quinto color de juego se deriva de la paleta (por ejemplo, un azul verdoso o el gris azulado) y se fija al planificar; se prefiere un tono claramente distinto de los otros cuatro.
- El orden de los juegos en la lista no cambia.
- Si alguna historia de prioridad baja resultara demasiado grande al planificar, se puede dejar fuera sin afectar a las anteriores: cada historia se puede probar y entregar por separado.
- Los cambios sustituyen en lo que se indica a los requisitos de las specs 001 (pantalla de inicio como primera pantalla) y 007 (un color por actividad en la lista); el resto de esas specs sigue vigente.
