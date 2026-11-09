# Especificación de la funcionalidad: Color por actividad y animación de victoria

**Rama de la funcionalidad**: `007-color-animacion-victoria`

**Creada**: 2026-11-09

**Estado**: Borrador

**Entrada**: Pulido visual en dos mejoras pequeñas. (1) Hoy todos los botones de la lista de actividades de la pantalla de inicio son azules y se ven iguales al elegir: cada actividad tendrá su propio color solo en esa lista. (2) Una animación sencilla y suave en la pantalla final de cada actividad cuando la persona termina la partida. Fuera de alcance: sonidos, vibración, animaciones en otros momentos (aciertos intermedios, menú de inicio), confeti y cambios de color en el resto de botones de la app.

## Aclaraciones

### Sesión 2026-11-09

- Q: ¿Cómo entra el icono de celebración en la pantalla final: con un fundido suave o con un pequeño rebote? → A: Fundido. El icono aparece poco a poco, sin moverse de sitio ni cambiar de tamaño.

## Escenarios de usuario y pruebas *(obligatorio)*

### Historia 1 - Distinguir las actividades del inicio por su color (Prioridad: P1)

Una persona mayor abre la app y ve la lista de actividades. Cada actividad tiene su propio color de fondo, además de su icono y su nombre, así que reconoce de un vistazo dónde está la que busca y no confunde unas con otras.

**Por qué esta prioridad**: es el problema que se quiere resolver: con todos los botones azules, la lista parece un bloque uniforme y cuesta elegir.

**Prueba independiente**: se puede probar abriendo la app y mirando la lista de inicio: las 5 actividades tienen colores distintos entre sí, y el icono y el nombre siguen a la vista.

**Escenarios de aceptación**:

1. **Dado** que estoy en la pantalla de inicio, **cuando** miro la lista, **entonces** cada una de las 5 actividades ("Parejas", "Forma la palabra", "Sopa de letras", "Adivinanzas" y "Diferencias") tiene un color de fondo distinto del de las demás.
2. **Dado** que miro la lista, **cuando** leo cualquiera de los botones, **entonces** el texto sigue siendo perfectamente legible sobre su color (contraste de al menos 7 a 1) y el icono y el nombre siguen junto a la descripción.
3. **Dado** que toco una actividad, **cuando** se abre, **entonces** su pantalla y sus botones ("Volver al inicio", "Jugar otra vez", etc.) mantienen el aspecto que tenían: el color por actividad solo afecta a la lista de inicio.
4. **Dado** que se añade en el futuro una actividad nueva, **cuando** no indica ningún color, **entonces** aparece en la lista con el color azul de siempre y la app no falla.

---

### Historia 2 - Ver una pequeña animación de victoria al terminar (Prioridad: P2)

Al terminar una partida, la pantalla final (felicitación o resultado) aparece con el icono de celebración entrando con suavidad, de forma muy breve y una sola vez, para darle un momento de alegría sin marear ni distraer.

**Por qué esta prioridad**: mejora la sensación de premio, pero la app se usa igual sin ella.

**Prueba independiente**: se puede probar terminando una partida de cada actividad y observando cómo entra el icono de celebración; después, activando en el móvil el ajuste de reducir movimiento y comprobando que el icono aparece directamente, sin animación.

**Escenarios de aceptación**:

1. **Dado** que termino una partida de cualquiera de las 5 actividades, **cuando** aparece la pantalla final, **entonces** el icono de celebración aparece poco a poco (un fundido suave, sin moverse de sitio ni cambiar de tamaño) en menos de un segundo y se queda quieto.
2. **Dado** que la animación ha terminado, **cuando** sigo en la pantalla final, **entonces** el icono se queda quieto: no se repite, no gira, no tiembla ni parpadea.
3. **Dado** que la animación está en marcha, **cuando** pulso "Jugar otra vez" o "Volver al inicio", **entonces** el botón responde al instante, sin esperar a que acabe.
4. **Dado** que tengo activado en el móvil el ajuste de reducir movimiento, **cuando** aparece la pantalla final, **entonces** el icono se ve directamente, sin animación.
5. **Dado** que pulso "Jugar otra vez" y vuelvo a ganar, **cuando** aparece de nuevo la pantalla final, **entonces** la animación se repite una vez, igual que la primera.

---

### Casos límite

- La animación nunca retrasa ni oculta el mensaje de felicitación, los toques o puntos ni los botones: todo el texto y los botones están visibles y se pueden usar desde el primer momento.
- No hay animación durante el juego: ni al acertar una pareja, una palabra, una adivinanza o una diferencia, ni en la lista de inicio ni al cambiar de pantalla.
- Si la persona sale con "Volver al inicio" mientras la animación está en marcha, no pasa nada raro: la pantalla de inicio se ve normal y sin restos de la animación.
- Las pruebas automáticas no dependen de la animación: se comportan igual con ella y sin ella.
- Los colores de las actividades se distinguen también para quien tiene daltonismo; por eso nunca son lo único que identifica una actividad.

## Requisitos *(obligatorio)*

### Requisitos funcionales

- **RF-001**: Cada actividad de la lista de inicio MUST tener un color de fondo propio, distinto del de las demás actividades reales (hoy, 5 colores distintos).
- **RF-002**: Cada color MUST ser oscuro y tener un contraste de al menos 7 a 1 con el texto blanco que lleva encima.
- **RF-003**: Los colores MUST distinguirse entre sí también con los tipos más habituales de daltonismo: no se usan juntos un rojo y un verde, y ninguno repite el rojo oscuro de los círculos de "Diferencias".
- **RF-004**: El color MUST ser solo un refuerzo: cada elemento de la lista MUST seguir mostrando su icono grande, su nombre y su descripción, y la actividad MUST poder identificarse sin ver el color.
- **RF-005**: El color por actividad MUST aplicarse solo a la lista de la pantalla de inicio. El resto de botones y pantallas de la app MUST mantener el aspecto actual.
- **RF-006**: Cada actividad MUST indicar su color como parte de lo que entrega a la pantalla de inicio (el contrato de actividad se amplía con este campo), y los colores MUST guardarse junto al resto de colores de la app.
- **RF-007**: Si una actividad no indica color, la lista MUST mostrarla con el color azul actual, sin fallar.
- **RF-008**: La pantalla final de cada actividad que termina con felicitación o resultado ("Parejas", "Forma la palabra", "Sopa de letras", "Adivinanzas" y "Diferencias") MUST animar la entrada del icono de celebración con un fundido suave (aparece poco a poco, sin desplazarse ni cambiar de tamaño) de entre 300 y 600 milisegundos.
- **RF-009**: La animación MUST ocurrir una sola vez cada vez que aparece la pantalla final, y MUST NOT repetirse, girar, temblar ni parpadear. No hay confeti ni efectos que cubran la pantalla.
- **RF-010**: La animación MUST NOT retrasar, ocultar ni bloquear nada: el texto y todos los botones MUST estar visibles y activos desde que aparece la pantalla.
- **RF-011**: Si la persona tiene activado en el móvil el ajuste de reducir movimiento, la pantalla final MUST mostrar el icono directamente, sin animar.
- **RF-012**: La animación MUST NOT usarse en ningún otro momento: ni en aciertos intermedios, ni en la lista de inicio, ni en transiciones entre pantallas.
- **RF-013**: La funcionalidad MUST NOT añadir sonidos ni vibración, ni requerir internet, cuentas o datos guardados.
- **RF-014**: Las pruebas automáticas de la funcionalidad MUST comprobar, de forma básica: que las 5 actividades reales tienen colores distintos entre sí y con contraste de al menos 7 a 1 con el blanco, que una actividad sin color usa el azul de siempre, y que la pantalla final muestra el mensaje y los botones también con la animación. La animación MUST poder desactivarse en las pruebas para que no las haga inestables.

### Fuera de alcance

Sonidos, vibración, confeti, animaciones durante el juego o en el menú, cambios de color en el resto de botones o pantallas, colores elegidos por la persona y modo oscuro. No se construyen en esta funcionalidad.

### Entidades clave

- **Color de actividad**: el color de fondo con el que una actividad aparece en la lista de inicio; es opcional y, si falta, se usa el azul de siempre.
- **Pantalla final**: la felicitación o el resultado que se ve al terminar una partida, con el icono de celebración que se anima.

## Criterios de éxito *(obligatorio)*

### Resultados medibles

- **CE-001**: En la pantalla de inicio se ven 5 colores distintos, uno por actividad, y una persona puede señalar una actividad concreta por su color en menos de 3 segundos.
- **CE-002**: Los 5 colores tienen un contraste de al menos 7 a 1 con el texto blanco.
- **CE-003**: Con los 5 botones vistos en blanco y negro (o por una persona con daltonismo), cada actividad sigue reconociéndose por su icono y su nombre.
- **CE-004**: Fuera de la lista de inicio, ninguna pantalla ni botón cambia de aspecto respecto a antes de esta funcionalidad.
- **CE-005**: Al terminar una partida de cada una de las 5 actividades, el icono de celebración aparece poco a poco en menos de 1 segundo y después queda completamente quieto.
- **CE-006**: Durante la animación, los botones "Jugar otra vez" y "Volver al inicio" responden al primer toque en el 100 % de los casos.
- **CE-007**: Con el ajuste de reducir movimiento activado en el móvil, ninguna pantalla final muestra animación.
- **CE-008**: Una persona mayor sin conocimientos técnicos puede comprobar usando solo la app, y sin leer código, que cada una de las historias de usuario se cumple.
- **CE-009**: Todas las pruebas de la funcionalidad pasan, y siguen pasando las de las funcionalidades 001 a 006.

## Suposiciones

- Los 5 colores concretos se eligen al planificar, respetando los requisitos de contraste y daltonismo; esta especificación no fija cuáles son.
- El color por actividad sustituye al azul solo en el fondo del botón de la lista de inicio; el borde, el texto blanco, el icono y la descripción mantienen su forma actual.
- "Pantalla final" incluye la felicitación de "Parejas", "Sopa de letras" y "Diferencias" y el resultado de "Forma la palabra" y "Adivinanzas": todas tienen el mismo icono de celebración.
- La animación es un fundido (decidido en la sesión de aclaraciones). Se aplica la misma a las 5 pantallas.
- El ajuste de reducir movimiento es el que ofrece el propio móvil en su configuración de accesibilidad; la app no tiene un ajuste propio.
- Esta funcionalidad no cambia ninguna regla de juego. La siguiente y última funcionalidad del proyecto recogerá las ideas de `specs/ideas-pendientes.md` (cantidades, catálogos, etc.).
