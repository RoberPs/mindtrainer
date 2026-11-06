# Investigación: Actividad "Diferencias"

El contexto técnico no tenía incógnitas abiertas: la base (Expo, React Native, TypeScript,
Jest) y los componentes comunes vienen de las funcionalidades 001 a 005. Solo hay que decidir
siete cosas propias de esta actividad.

## 1. De dónde salen los dos dibujos

- **Decisión**: Se dibujan con **iconos de `@expo/vector-icons`** (familia MaterialCommunityIcons,
  ya instalada y de licencia libre) colocados en un recuadro con posiciones relativas. Una lista
  de elementos `{ id, icono, x, y, tamano, color }` describe el dibujo de arriba; el de abajo es
  la misma lista con tres cambios. Propuesta inicial, a confirmar al implementar y a revisar por
  una persona mirando la app:

  | Elemento | Dibujo de arriba | Dibujo de abajo | Tipo de diferencia |
  |----------|------------------|-----------------|--------------------|
  | Ventana | ventana | ventana | igual |
  | Lámpara | lámpara | lámpara | igual |
  | Sillón | sillón | sillón | igual |
  | Planta | planta | planta | igual |
  | Reloj | reloj de pared | _(no está)_ | falta |
  | Taza | taza de café | taza de té (otro icono) | cambia |
  | Gato | _(no está)_ | gato | sobra |

- **Razón**: Es lo más simple (principio I): sin descargar nada (V), sin licencias que revisar
  aparte de la de los iconos, sin tener que crear ni mantener archivos de imagen y con la misma
  forma de trabajo que el resto de la app. Los iconos son grandes, de alto contraste y se
  reconocen sin leer (IX). Las tres clases de diferencia (falta, cambia, sobra) son las más fáciles
  de entender para una persona mayor.
- **Alternativas descartadas**: Dos imágenes PNG o ilustraciones hechas a mano (hay que
  conseguirlas o dibujarlas, comprobar su licencia y mantener dos archivos que coincidan casi por
  completo); descargar imágenes (necesita internet, prohibido); dibujo con SVG (una librería más
  sin necesidad).
- **Cómo se garantiza que las diferencias son 3 y están bien puestas**: una prueba automática
  compara las dos listas y comprueba que difieren en exactamente 3 elementos, que cada diferencia
  tiene una zona de toque y que el centro del elemento distinto cae dentro de su zona. Que
  las diferencias sean claras de ver y que los iconos se reconozcan lo revisa una persona
  mirando la app (se anota en las tareas).

## 2. Cómo se colocan los dibujos y cómo se sabe dónde se ha tocado

- **Decisión**: Cada dibujo es un recuadro con tamaño calculado y los elementos se colocan con
  posición absoluta usando coordenadas relativas (de 0 a 1 sobre el ancho y el alto). Las zonas
  de diferencia son rectángulos `{ x, y, ancho, alto }` en la misma escala. Al tocar el dibujo de
  abajo se toma la posición del toque dentro del recuadro (`locationX` y `locationY`), se divide
  entre el ancho y el alto medidos con `onLayout` y se pasa a la regla `tocar(partida, x, y)`.
- **Razón**: Con coordenadas relativas las zonas valen para cualquier móvil y no hay que
  recalcular nada si cambia el tamaño. La regla es una función pura de dos números, fácil de probar
  sin pintar nada, y los rectángulos son más simples que los círculos (no dependen de la
  proporción del dibujo).
- **Alternativas descartadas**: Una zona táctil (`Pressable`) separada por cada diferencia (revela
  dónde están al lector de pantalla y complica la regla de "fuera de las zonas"); coordenadas en
  puntos fijos (se rompen en cuanto cambia el tamaño de la pantalla); gestos o zoom (fuera de
  alcance).

## 3. Cómo caben los dos dibujos en pantalla

- **Decisión**: El tamaño de cada dibujo se calcula con `useWindowDimensions`: ancho disponible
  (ancho de la pantalla menos márgenes) y alto como la mitad de lo que queda tras reservar el hueco
  fijo del marco, el aviso de las que faltan y el mensaje de fallo. Se mantiene una proporción
  fija (algo más ancho que alto) y se toma el tamaño más pequeño de los dos posibles.
- **Razón**: Cumple RF-013 (los dos dibujos a la vez, sin desplazarse, en un móvil pequeño) con
  una cuenta sencilla y sin medir otros componentes. El mensaje de fallo ocupa siempre su hueco
  (vacío si no hay fallo) para que los dibujos no se muevan bajo el dedo.
- **Alternativas descartadas**: Una pantalla con desplazamiento (el segundo dibujo quedaría fuera
  de la vista al comparar); dibujos en horizontal, uno al lado del otro (la spec los pide uno
  encima del otro); medir cada componente con `onLayout` para repartir el alto (más código sin
  beneficio).

## 4. Reglas: acierto, fallo y toque repetido

- **Decisión**: `tocar(partida, x, y)` devuelve la partida nueva. Hay tres casos:
  1. El toque cae en una zona **aún no encontrada**: se añade a las encontradas, se suma un
     toque y se quita el mensaje de fallo. Si ya son 3, la partida termina.
  2. El toque cae **fuera de todas las zonas**: se suma un toque y se muestra el mensaje de fallo.
     No cambia nada más.
  3. El toque cae en una zona **ya encontrada**: se devuelve la misma partida sin cambios
     (ni mensaje, ni toque).
  Si la partida ha terminado, no se hace nada.
- **Razón**: Cumple RF-003 a RF-005 y RF-008 con un único campo de estado por cada cosa que se
  muestra (encontradas, toques, si se ve el mensaje de fallo). Devolver la misma partida cuando
  no hay cambios hace evidente que no hay efecto. Quitar el mensaje de fallo al acertar evita que
  quede un aviso viejo junto a un círculo nuevo.
- **Alternativas descartadas**: Guardar la lista de todos los toques (nadie la usa); que el mensaje
  de fallo desaparezca solo con un temporizador (la constitución prohíbe depender del tiempo);
  contar también los toques repetidos o en el dibujo de arriba (contradice RF-008).

## 5. Círculos y accesibilidad

- **Decisión**: El círculo de una diferencia encontrada es un recuadro con bordes muy
  redondeados y un borde grueso (unos 6 puntos) de un color de marca nuevo en `src/tema.ts`
  (rojo oscuro, contraste de más de 7 a 1 sobre blanco), colocado sobre la zona, en los dos
  dibujos. Los círculos se quedan hasta el final de la partida.
- **Razón**: Un borde grueso se ve aunque la persona no distinga bien los colores (RF-006), y el
  rojo oscuro cumple el contraste del proyecto. Reutilizar la zona como tamaño del círculo evita
  un segundo dato por diferencia.
- **Alternativas descartadas**: Marcar solo con color de relleno (no se distingue sin color);
  animaciones al marcar (complejidad sin necesidad).

## 6. Pantalla de felicitación

- **Decisión**: Al encontrar la tercera diferencia, la actividad cambia a una pantalla de
  felicitación (como en las otras actividades) con un icono grande, el mensaje "Has encontrado las
  3 diferencias", "Has necesitado X toques" y el botón "Jugar otra vez". El botón "Volver al
  inicio" de esa pantalla es el del marco común, que siempre está a la vista, como en
  Adivinanzas y Parejas. Al terminar se avisa con `avisarPartida(false)`, y al jugar otra vez con
  `avisarPartida(true)`.
- **Razón**: Reutiliza el patrón ya probado y deja la pantalla de juego sin elementos que solo se
  usan al final. El número de toques se comprueba así sin depender de si cabe junto a los
  dibujos.
- **Alternativas descartadas**: Mostrar la felicitación sobre los dibujos (tapa los círculos y
  hay que resolver el espacio en móviles pequeños); un botón "Volver al inicio" propio en la
  felicitación (el contrato de actividades dice que lo pone siempre el marco).

## 7. Textos

- **Decisión**: Se añade `textosDiferencias` en `src/textos.ts`, igual que `textosAdivinanzas`:
  nombre, descripción, instrucción ("Toca en el dibujo de abajo lo que sea distinto"), nombres de
  los dos dibujos ("Dibujo de arriba", "Dibujo de abajo"), aviso de las que faltan (con
  singular), mensaje de fallo, felicitación, toques y botón "Jugar otra vez". Los textos de la
  escena (nombres de los iconos) no hacen falta porque los iconos son decorativos.
- **Razón**: Cumple RF-015 y la regla del proyecto de que todos los textos viven en un solo
  sitio.
- **Alternativas descartadas**: Textos dentro de los componentes (rompe la regla del proyecto).
