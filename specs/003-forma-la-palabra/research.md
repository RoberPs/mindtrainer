# Investigación: Actividad "Forma la palabra"

El conteto técnico no tenía incógnitas abiertas: la base (Expo, React Native, TypeScript,
Jest) y los componentes comunes vienen de las funcionalidades 001 y 002. Solo hay que decidir
cómo resolver seis cosas propias del juego.

## 1. De dónde sale la lista de palabras

- **Decisión**: Un archivo `palabras.ts` con una lista fija de al menos 100 palabras, en minúsculas,
  de 4 a 7 letras, sin tildes (la "ñ" se permite). Sustantivos y objetos cotidianos.
- **Razón**: Es lo más simple (principio I), funciona sin internet (V) y no guarda nada (VI).
  Con 100 palabras y 5 por partida, las partidas no se hacen monótonas enseguida.
- **Alternativas descartadas**: Diccionario externo o descarga de palabras (necesita internet);
  un archivo JSON aparte (un paso más sin beneficio); generar palabras al azar (no serían
  palabras reales).
- **Cómo se garantiza la "única solución"**: Dos palabras son anagramas si tienen las mismas
  letras. Una prueba automática ordena las letras de cada palabra y comprueba que no hay dos
  iguales. Así, las letras desordenadas de una palabra nunca pueden formar otra de la lista. No
  se intenta cubrir palabras que no estén en la lista: la comprobación es contra la palabra de
  la partida (ver punto 4).

## 2. Cómo se sortean las 5 palabras y se desordenan las letras

- **Decisión**: Mezcla de Fisher-Yates con una función de azar que se puede cambiar, igual que en
  "Parejas". Se mezcla la lista y se toman las 5 primeras (así no se repiten en una partida).
  Las letras de cada palabra se mezclan igual. Si el resultado coincide con la palabra, se
  vuelve a mezclar hasta 10 veces; si aun así coincide (por ejemplo, con un azar fijo en las
  pruebas), se intercambian las dos primeras letras distintas.
- **Razón**: Es el algoritmo estándar, corto y sin sesgo, y pasar el azar como parámetro permite
  pruebas repetibles sin librerías. Evitar que las letras salgan ya en orden correcto impide que
  la persona "acierte" sin hacer nada.
- **Alternativas descartadas**: `sort(() => Math.random() - 0.5)` (reparte mal); una librería de
  azar con semilla (dependencia innecesaria).
- **Nota**: Como las letras de una palabra tienen al menos dos distintas, siempre existe una
  mezcla diferente de la original. Con el tope de 10 intentos y el intercambio final, la función
  siempre termina, también con un azar constante.

## 3. Cómo se tratan las letras repetidas

- **Decisión**: Cada letra desordenada es un objeto con su propio número (`{ id, letra }`). Al
  colocarla se mueve de la lista de disponibles a la de colocadas. La palabra se comprueba
  uniendo las letras colocadas y comparándolas con la palabra.
- **Razón**: Con palabras como "casa" o "pelota" hay letras repetidas. Con un número propio cada
  botón es único y colocar uno no afecta al otro. Y como se compara el texto final, da igual
  cuál de las dos "a" se tocó primero.
- **Alternativas descartadas**: Guardar solo la letra (no se sabría qué botón quitar de la
  vista); guardar posiciones (más complicado para borrar la última).

## 4. Cómo se guarda el estado de la partida

- **Decisión**: Un objeto `Partida` inmutable que cambian funciones puras (`crearPartida`,
  `colocarLetra`, `borrarUltima`, `empezarDeNuevo`, `comprobar`, `verRespuesta`, `siguiente`), y
  un `useState` en la pantalla. Cada palabra tiene un estado: `jugando`, `acertada` o `rendida`;
  y un aviso: ninguno, `incompleta` o `incorrecta`.
- **Razón**: Las reglas (cuándo se acierta, qué cuenta como acierto, cuándo termina) son justo
  lo que exige probar el principio VIII. En funciones puras se prueban sin pintar pantallas.
  `useState` basta; no hace falta gestor de estado.
- **Alternativas descartadas**: `useReducer` (más ceremonia para siete acciones); Redux/Zustand
  (innecesarios, principio I).
- **Cuándo cuenta un acierto**: `comprobar` suma uno al acertar la palabra, y solo si está en
  `jugando`; una palabra `rendida` o `acertada` no vuelve a sumar. Así un fallo previo no impide
  contar, y ver la respuesta nunca suma. Todas las funciones de colocación y corrección no hacen
  nada si la palabra ya está cerrada.

## 5. Cómo se coloca la pantalla en el móvil

- **Decisión**: Pantalla con desplazamiento. De arriba abajo: fila de casillas, mensaje
  con icono, letras desordenadas (botones de al menos 64 de alto, que pasan a otra fila si no
  caben) y los botones "Comprobar", "Borrar última letra", "Empezar de
  nuevo" y "Ver la respuesta". Cuando la palabra se cierra (acierto o respuesta vista), se
  esconden letras y botones de corrección y quedan solo la palabra, el mensaje y un botón
  "Siguiente" (o "Ver resultado").
- **Razón**: Con tantos botones de 64 de alto, en un móvil pequeño no cabe todo a la vez. El
  botón que hace falta al terminar la palabra no queda nunca fuera de la vista porque lo demás
  desaparece. Las casillas se pintan siempre con letra de 22 o más puntos.
- **Alternativas descartadas**: Reducir la letra o los botones para que todo quepa (rompe el
  principio VII); dejar todos los botones siempre visibles (el botón "Siguiente" podría quedar
  fuera de la vista).

## 6. Qué hace la actividad con el aviso de partida en curso

- **Decisión**: Llamar a `avisarPartida(true)` al crear la partida (al abrir la actividad y al
  pulsar "Jugar otra vez") y a `avisarPartida(false)` cuando se cierra la quinta palabra, sin
  esperar a "Ver resultado". En la pantalla de resultado no hay partida en curso, así que
  "Volver al inicio" sale sin preguntar.
- **Razón**: Es lo que pide el [contrato de actividad](../001-pantalla-inicio/contracts/actividad.md).
  Si se sale a mitad de partida, el marco pide confirmación y la partida se pierde sin guardarse,
  como dice la spec. No tiene sentido preguntar si se quiere salir cuando ya no queda nada por
  jugar.
- **Diferencia con "Parejas"**: Allí hay una pantalla previa para elegir el tamaño; aquí no, así
  que la partida empieza al entrar en la actividad.
