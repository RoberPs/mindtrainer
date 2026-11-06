# Investigación: Actividad "Sopa de letras"

El contexto técnico no tenía incógnitas abiertas: la base (Expo, React Native, TypeScript,
Jest) y los componentes comunes vienen de las funcionalidades 001, 002 y 003. Solo hay que
decidir cómo resolver siete cosas propias del juego.

## 1. De dónde salen las sopas

- **Decisión**: Un archivo `sopas.ts` con una lista fija de al menos 5 sopas. Cada sopa tiene un
  `id`, la palabra de referencia, las 3 palabras buscadas y la cuadrícula escrita a mano como 5
  textos de 6 letras en mayúsculas. Propuesta inicial, a confirmar al escribir las cuadrículas:

  | Referencia | Palabras buscadas |
  |------------|-------------------|
  | NUBE | LLUVIA, CIELO, RAYO |
  | MAR | OLAS, ARENA, BARCO |
  | COCINA | SARTEN, PLATO, HORNO |
  | HUERTO | TOMATE, PATATA, AZADA |
  | COSTURA | AGUJA, HILO, DEDAL |

- **Razón**: Es lo más simple (principio I), funciona sin internet (V) y no guarda nada (VI). La
  spec prohíbe generar sopas nuevas, así que se escriben a mano y se revisan una vez. Con 5 sopas,
  "Jugar otra vez" nunca repite la misma seguida (aclaración de la spec).
- **Alternativas descartadas**: Generar la cuadrícula al azar colocando palabras (es justo lo que
  la spec deja fuera y complica garantizar que no aparezcan otras palabras relacionadas); un JSON
  aparte (un paso más sin beneficio); descargar sopas (necesita internet).
- **Límites de tamaño**: en 6 columnas caben palabras de hasta 6 letras en horizontal; en 5
  filas, de hasta 5 en vertical. Todas las palabras de la propuesta cumplen eso. Palabras y
  letras van en mayúsculas y sin tildes, como pide RF-014 (por eso "SARTEN" y no "SARTÉN").
- **Cómo se garantiza que la sopa es buena**: una prueba automática comprueba, para cada sopa,
  que la cuadrícula tiene 5 filas de 6 letras (A-Z y "Ñ"), que hay 3 palabras distintas y que
  cada una aparece **exactamente una vez** leyendo en horizontal (izquierda a derecha) o en
  vertical (arriba abajo). Lo que no se puede automatizar es que no aparezca *otra* palabra
  relacionada con la de referencia (RF-013, porque no hay diccionario): lo revisa una persona al
  escribir cada cuadrícula, y queda anotado en la lista de tareas.
- **Revisión hecha al escribir las cuadrículas (T005)**: se leyeron a mano las filas y las
  columnas de las cinco sopas y no aparece ninguna otra palabra relacionada con la referencia,
  salvo las que ya están dentro de otra: "ARCO" dentro de "BARCO" (sopa MAR), que no tiene
  relación con el mar. En NUBE se usó "RAYO" en lugar de "TRUENO": con dos palabras de 6 letras
  en horizontal, una vertical de 5 no podía cruzarlas de forma consistente. Esta revisión la
  tiene que confirmar una persona en T027.

## 2. Cómo se sortea la sopa

- **Decisión**: `crearPartida` recibe el `id` de la sopa anterior (si la hay) y una función de
  azar que se puede cambiar. Elige una sopa al azar entre las que tienen un `id` distinto.
- **Razón**: Es lo mínimo que cumple "una distinta de la que se acaba de jugar" (RF-011).
  Pasar el azar como parámetro permite pruebas repetibles, igual que en las otras actividades.
- **Alternativas descartadas**: Barajar toda la lista y recorrerla en orden (estado extra que
  guardar entre partidas, cuando la spec dice que no se guarda nada); sortear sin excluir la
  anterior (podría repetir).

## 3. Cómo se lee una marca

- **Decisión**: Una casilla es un par `{ fila, columna }`. Con la primera y la última casilla
  tocadas se decide así, en este orden:
  1. Misma casilla otra vez: se quita la marca. Sin mensaje y sin intento.
  2. Distinta fila **y** distinta columna: línea no recta. Mensaje amable, se quita la marca, sin
     intento (RF-006).
  3. Misma fila o misma columna: se lee el texto de la línea **en el orden en que se tocó**
     (de la primera a la última casilla, sea cual sea el sentido).
     - Si ese texto es una palabra ya encontrada: no pasa nada, se quita la marca, sin mensaje
       y sin intento (RF-007).
     - Si ese texto es una de las buscadas aún no encontradas: se guarda como encontrada con sus
       casillas, mensaje positivo, un intento más.
     - Si no: mensaje amable de fallo, se quita la marca, un intento más.
- **Razón**: Leer el texto en el orden del toque resuelve de golpe el caso de la palabra al
  revés: "AIVULL" no es "LLUVIA", así que cuenta como un fallo normal (aclaración de la spec),
  sin escribir ninguna regla especial. Tampoco hace falta guardar dónde está cada palabra: basta
  leer lo marcado y compararlo con las 3 palabras.
- **Alternativas descartadas**: Guardar la posición y el sentido de cada palabra en los datos (más
  datos que mantener y que pueden contradecir la cuadrícula); aceptar también la lectura al revés
  (la spec dice que nunca van al revés).

## 4. Cómo se cuentan los intentos

- **Decisión**: `intentos` sube en uno cada vez que se completa una marca en línea recta que no
  es una palabra ya encontrada: tanto si acierta como si falla (RF-008). Las pulsaciones que no
  forman línea recta, las marcas quitadas al tocar otra vez la primera casilla y tocar una palabra
  ya encontrada no suman.
- **Razón**: Es la definición de la spec. Con ella, el mínimo es 3 (los 3 aciertos), y "3 aciertos
  más los fallos" es fácil de comprobar a mano (CE-002).
- **Alternativas descartadas**: Contar solo los fallos (no encaja con "intentos necesitados" ni
  con el mínimo de 3); contar cada toque (confunde: dos toques son un intento).

## 5. Cómo se guarda el estado de la partida

- **Decisión**: Un objeto `Partida` inmutable que cambian funciones puras (`crearPartida`,
  `tocarCasilla`) y un `useState` en la pantalla. Guarda la sopa, las palabras encontradas (cada
  una con sus casillas, para resaltarlas), la marca actual (la primera casilla o nada), los
  intentos y un aviso (`ninguno`, `encontrada`, `incorrecta` o `norecta`). Si la partida ha
  terminado o falta alguna palabra se calcula con las encontradas, sin campo propio.
- **Razón**: Las reglas (cuándo se acierta, qué cuenta como intento, cuándo termina) son justo lo
  que exige probar el principio VIII. En funciones puras se prueban sin pintar pantallas.
  `useState` basta; no hace falta gestor de estado. El mensaje de invitación no necesita aviso
  propio: se muestra cuando hay una marca.
- **Alternativas descartadas**: `useReducer` (más ceremonia para una sola acción); Redux/Zustand
  (innecesarios, principio I).

## 6. Cómo se coloca la pantalla en el móvil

- **Decisión**: Pantalla con desplazamiento. De arriba abajo: la palabra de referencia con un
  texto corto que explica qué buscar, la cuadrícula, el mensaje con icono, y la lista de palabras
  con "Te faltan N palabras". Al terminar, la cuadrícula sigue visible con las 3 palabras
  resaltadas y debajo aparece la felicitación con los intentos y "Jugar otra vez" (aclaración de
  la spec). Cada casilla mide 64 de alto y reparte el ancho entre las 6 columnas; la letra es de
  28 puntos (`tema.letra.titulo`).
- **Cómo se distinguen los estados sin depender del color** (RF-016):
  - casilla normal: borde fino y fondo claro;
  - primera letra marcada: borde muy grueso, además del color;
  - palabra encontrada: fondo oscuro sólido con letra blanca (cambia la forma de contraste, no
    solo el tono);
  - en la lista, las palabras encontradas aparecen tachadas y con un icono de "hecho", y las
    ocultas como "???" con un icono de interrogación.
- **Razón**: Con casillas de 64 de alto, 5 filas ocupan unos 330 puntos más separaciones: cabe en
  móviles pequeños con un poco de desplazamiento, sin bajar el tamaño de letra (principio VII).
  El ancho de cada casilla es de unos 50 puntos en un móvil de 360; la regla del proyecto fija
  64 de alto, no de ancho.
- **Alternativas descartadas**: Casillas cuadradas de 64×64 (6 columnas serían 384 de ancho y no
  caben); letra más pequeña para que todo quepa de una vez (rompe el principio VII).
- **Texto extra mínimo**: el único texto que la spec no nombra es la etiqueta fija junto a la
  palabra de referencia (por ejemplo "Busca 3 palabras relacionadas con:"). Se añade porque sin
  ella una persona nueva no sabe qué se le pide (CE-001); no es una pista ni una función nueva.

## 7. Qué hace la actividad con el aviso de partida en curso

- **Decisión**: Llamar a `avisarPartida(true)` al abrir la actividad y al pulsar "Jugar otra
  vez", y a `avisarPartida(false)` en cuanto se encuentra la tercera palabra, sin esperar a nada
  más. En la felicitación no hay partida en curso, así que "Volver al inicio" sale sin preguntar.
- **Razón**: Es lo que pide el [contrato de actividad](../001-pantalla-inicio/contracts/actividad.md).
  Si se sale a mitad de partida, el marco pide confirmación y la partida se pierde sin guardarse,
  como dice la spec.
- **Diferencia con "Forma la palabra"**: Allí hay un botón intermedio ("Ver resultado") entre la
  última palabra y el final; aquí la felicitación aparece directamente al encontrar la tercera.
