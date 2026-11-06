# Investigación: Actividad "Adivinanzas"

El contexto técnico no tenía incógnitas abiertas: la base (Expo, React Native, TypeScript,
Jest) y los componentes comunes vienen de las funcionalidades 001 a 004. "Forma la palabra" ya
resuelve casi todo el esqueleto (5 preguntas, aciertos, resultado). Solo hay que decidir seis
cosas propias de esta actividad.

## 1. De dónde salen las adivinanzas

- **Decisión**: Un archivo `adivinanzas.ts` con una lista fija de al menos 10. Cada una tiene un
  `id`, el `texto`, la `correcta` y las dos `incorrectas`, todo escrito a mano. Propuesta inicial,
  a confirmar al escribir los textos (T-escritura) y a revisar por una persona:

  | Respuesta | Adivinanza (tradicional) | Incorrectas propuestas |
  |-----------|--------------------------|------------------------|
  | pera | Blanca por dentro, verde por fuera. Si quieres que te lo diga, espera. | manzana, uva |
  | plátano | Oro parece, plata no es. | limón, naranja |
  | reloj | Tiene agujas y no sabe coser, tiene números y no sabe leer. | calendario, espejo |
  | viento | Vuelo sin alas, silbo sin boca, azoto sin manos y nadie me toca. | trueno, río |
  | ajo | Tiene dientes y no come, tiene cabeza y no es hombre. | peine, tenedor |
  | huevo | Una cajita blanca como la cal, que todos saben abrir y nadie sabe cerrar. | pan, queso |
  | anillo | Redondo, redondo, barril sin fondo. | cubo, plato |
  | llave | Chiquita como un ratón y guarda la casa como un león. | perro, candado |
  | oscuridad | Cuanto más grande es, menos se ve. | montaña, nube |
  | aguacate | Agua pasa por mi casa, cate de mi corazón. | tomate, melón |

- **Razón**: Es lo más simple (principio I), funciona sin internet (V) y no guarda nada (VI). La
  spec prohíbe generar o descargar adivinanzas. Con 10, dos partidas seguidas comparten como
  mucho una parte de las adivinanzas y rara vez son iguales, sin guardar nada entre partidas.
- **Alternativas descartadas**: Un JSON aparte (un paso más sin beneficio); inventar adivinanzas
  nuevas (la spec pide tradicionales y conocidas); descargarlas (necesita internet).
- **Cómo se garantiza que el banco es bueno**: una prueba automática comprueba, para cada
  adivinanza, que hay 3 respuestas distintas de una sola palabra, que el `id` no se repite, que
  hay al menos 10 y que el texto de la adivinanza no contiene la respuesta correcta. Lo que no se
  puede automatizar es que las dos incorrectas no sean también una respuesta posible (RF-011, no
  hay diccionario) ni que la adivinanza sea realmente tradicional y conocida: lo revisa una
  persona al escribirlas y queda anotado en las tareas.

## 2. Cómo se eligen las 5 y cómo se sortea el orden de las respuestas

- **Decisión**: `crearPartida` recibe una función de azar que se puede cambiar. Baraja el banco y
  se queda con las 5 primeras (así no hay repetidas dentro de la partida). Para cada una, baraja
  sus tres respuestas **en ese momento** y guarda la lista ya ordenada en la partida.
- **Razón**: Cada adivinanza se ve una sola vez por partida, así que sortear el orden al preparar
  la partida equivale a sortearlo "cada vez que aparece" (RF-009) y es más simple: la pantalla no
  vuelve a mezclar al repintar y las respuestas no se mueven bajo el dedo. Pasar el azar como
  parámetro permite pruebas repetibles, igual que en las otras actividades.
- **Alternativas descartadas**: Mezclar al pintar (las respuestas cambiarían de sitio en cada
  repintado); dejar el orden fijo en el banco (rompe RF-009); evitar repetir adivinanzas de la
  partida anterior (necesita guardar estado entre partidas y la spec no lo pide).

## 3. Cómo se responde y cómo se cuenta

- **Decisión**: `responder(partida, opcion)` solo hace algo si la adivinanza actual aún no tiene
  respuesta elegida. Guarda la opción elegida; si coincide con la correcta suma un acierto. Una
  segunda pulsación (en cualquier botón) no cambia nada.
- **Razón**: Cumple el único intento por adivinanza (RF-002) sin estado extra: "ya respondida"
  se calcula como "hay opción elegida". Los aciertos nunca bajan ni cuentan dos veces (CE-005).
- **Alternativas descartadas**: Deshabilitar los botones en la pantalla como única protección (la
  regla se saltaría en las pruebas y en cualquier toque rápido): la regla manda y la pantalla
  además no ofrece los botones como tocables.

## 4. Qué se ve tras responder

- **Decisión**: La adivinanza y las tres respuestas siguen visibles (RF-005). Cada respuesta
  muestra un icono junto al texto según su estado:
  - la correcta: icono de "correcto" y fondo verde oscuro con letra blanca, además del icono;
  - la elegida si era incorrecta: icono de "error", fondo claro y borde muy grueso;
  - la tercera: icono neutro y fondo claro.
  Antes de responder, las tres llevan el mismo icono y el estilo de botón normal.
  Sobre las respuestas aparece el mensaje con icono grande: positivo si acierta; amable si falla,
  con el texto "La respuesta correcta es: X". Debajo, el botón "Siguiente" (o "Ver resultado" en
  la quinta).
- **Razón**: Acierto y fallo se distinguen por icono, forma y texto, no solo por color
  (RF-014), y la persona puede releer con calma (caso límite de la spec). Los colores salen de
  `src/tema.ts`.
- **Alternativas descartadas**: Ocultar las respuestas tras responder y mostrar solo el mensaje
  (la persona no puede relacionar su elección con la correcta); marcar solo con color (rompe
  RF-014).

## 5. Cómo se guarda el estado de la partida

- **Decisión**: Un objeto `Partida` inmutable que cambian funciones puras (`crearPartida`,
  `responder`, `siguiente`) y un `useState` en la pantalla. Guarda las 5 adivinanzas ya
  preparadas, el índice, la opción elegida del turno actual (o nada), los aciertos y si la
  partida ha terminado.
- **Razón**: Las reglas (cuándo se acierta, un solo intento, cuándo termina) son justo lo que
  exige probar el principio VIII. En funciones puras se prueban sin pintar pantallas. `useState`
  basta; no hace falta gestor de estado.
- **Alternativas descartadas**: `useReducer` (más ceremonia para tres acciones); Redux/Zustand
  (innecesarios, principio I).

## 6. Resultado, aviso de partida y repetición de código

- **Decisión (resultado)**: Tres mensajes según los aciertos: 5 → "¡Perfecto! …"; 3 o 4 → "¡Muy
  bien! …"; 0 a 2 → "¡Ánimo! Con la práctica saldrán más". Siempre junto a "X de 5" y con
  "Jugar otra vez". Los tramos son los mínimos que pide la spec ("mensaje acorde a la
  puntuación", "amable y de ánimo" con 0 de 5).
- **Decisión (aviso)**: `avisarPartida(true)` al abrir la actividad y con "Jugar otra vez";
  `avisarPartida(false)` en cuanto se responde la quinta adivinanza, como en "Forma la palabra".
  En el resultado no hay partida en curso, así que "Volver al inicio" sale sin preguntar. Ese
  botón lo pone el marco de la app, siempre visible, como en las otras actividades.
- **Decisión (código repetido)**: `mezclar` se escribe de nuevo en `juego.ts` (4 líneas), como ya
  hacen "Parejas" y "Forma la palabra". No se crea una utilidad común: sería refactorizar
  actividades ya cerradas, fuera de esta spec (principios I y III).
- **Alternativas descartadas**: Un mensaje distinto por cada puntuación (6 textos sin necesidad);
  un único mensaje (no es "acorde a la puntuación").
