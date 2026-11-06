# Investigación: Actividad "Parejas"

El contexto técnico no tenía incógnitas abiertas: la base (Expo, React Native, TypeScript,
Jest) viene de la funcionalidad 001. Solo hay que decidir cómo resolver cuatro cosas propias
del juego.

## 1. De dónde salen los dibujos de las cartas

- **Decisión**: Usar iconos de `MaterialCommunityIcons`, que ya vienen con `@expo/vector-icons`
  (dependencia existente). Ocho objetos cotidianos: llave, taza, reloj, gafas, cama, silla,
  lámpara y tijeras.
- **Razón**: Ya están dentro de la app (sin internet), tienen licencia libre, son grandes y de
  alto contraste, y no añaden dependencias ni archivos. Es lo más simple (principio I) y
  cumple el principio IX. Se comprobó que los ocho glifos existen en el paquete instalado.
- **Alternativas descartadas**: Imágenes propias en `assets/` (habría que conseguirlas, revisar
  licencias y mantenerlas; más trabajo sin beneficio claro en la versión 1); emojis (su aspecto
  cambia según el móvil y no se controla el contraste).
- **Por qué ocho y no seis**: La partida grande necesita 6 dibujos. Con ocho, dos partidas
  grandes seguidas no siempre llevan los mismos, lo que da algo de variedad sin complicar nada.
- **Riesgo conocido**: Un icono es un dibujo simple, de un solo color. Por eso cada carta
  muestra también el nombre escrito, y el criterio CE-005 de la spec se comprueba con personas
  mayores reales en el [quickstart](quickstart.md).

## 2. Cómo se mezclan las cartas

- **Decisión**: Mezcla de Fisher-Yates con una función de azar que se puede cambiar. Por
  defecto usa `Math.random`; las pruebas pasan un azar fijo para saber dónde está cada carta.
- **Razón**: Es el algoritmo estándar, corto y sin sesgo. Pasar el azar como parámetro es la
  forma más simple de tener pruebas repetibles, sin librerías de simulación.
- **Alternativas descartadas**: Ordenar con `sort(() => Math.random() - 0.5)` (reparte mal);
  una librería de azar con semilla (dependencia innecesaria).

## 3. Cómo se guarda el estado de la partida

- **Decisión**: Un objeto `Partida` inmutable, que cambian tres funciones puras (`crearPartida`,
  `tocarCarta`, `seguir`), y un `useState` en la pantalla.
- **Razón**: Las reglas (qué pasa al tocar, cuándo se cuenta un intento, cuándo termina) son
  justo lo que exige probar el principio VIII. En funciones puras se prueban en milisegundos y
  sin pintar pantallas. `useState` basta; no hace falta gestor de estado.
- **Alternativas descartadas**: `useReducer` (más ceremonia para tres acciones); Redux/Zustand
  (innecesarios, principio I).

## 4. Cómo se coloca el tablero en el móvil

- **Decisión**: Cuadrícula de 2 columnas para 6 y 8 cartas y de 3 columnas para 12, dentro de
  un `ScrollView`. El marcador de intentos y el botón "Seguir" van fijos encima del tablero,
  fuera del desplazamiento.
- **Razón**: Con el tablero grande hay que poder desplazarse; si "Seguir" estuviera dentro,
  podría quedar fuera de la vista justo cuando hace falta. Con 3 columnas la carta sigue siendo
  grande y cabe un nombre en letra de 22 puntos. Los nombres elegidos son cortos (máximo 8
  letras) por la misma razón.
- **Alternativas descartadas**: Reducir la letra para que todo quepa (rompe el mínimo de 22
  puntos, principio VII); 4 columnas (cartas demasiado pequeñas).

## 5. Qué hace la actividad con el aviso de partida en curso

- **Decisión**: Llamar a `avisarPartida(true)` al elegir un tamaño y a `avisarPartida(false)` al
  descubrir la última pareja. En la elección de tamaño y en la felicitación no hay partida en
  curso, así que "Volver al inicio" sale sin preguntar.
- **Razón**: Es lo que pide el [contrato de actividad](../001-pantalla-inicio/contracts/actividad.md).
  Si se sale a mitad de partida, el marco ya pide confirmación y la partida se pierde sin
  guardarse, como dice la spec.
