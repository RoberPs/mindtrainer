# Investigación: Mejora visual de "Diferencias"

## 1. De dónde salen las imágenes (respuesta a la pregunta de la galería gratuita)

- **Decisión**: dibujar las escenas dentro de la app como ilustraciones vectoriales propias. No se descarga nada de ninguna galería.
- **Qué se sabe de las galerías** (comprobado en la spec 010 y sin cambios):
  - **Kenney**: licencia CC0 (sin crédito), pero sus paquetes de iconos son de juego de mesa, tarjetas e interfaz; no hay muebles ni objetos del hogar confirmados.
  - **Openclipart**: todo es CC0, pero cada dibujo lo sube una persona distinta, con estilos distintos, y la propia web avisa de posibles dudas de procedencia.
  - Otras galerías conocidas (Flaticon, Freepik, unDraw, Pixabay) piden crédito, cuenta o tienen condiciones de uso propias: quedan descartadas por la restricción de la spec.
- **Problemas comunes a cualquier galería** para este juego:
  1. Hay que juntar escenas completas con objetos del mismo estilo; mezclar estilos es lo que hoy hace que parezca genérico.
  2. Una diferencia de color exige dos versiones del mismo objeto; con imágenes ya hechas habría que editar cada una.
  3. Las imágenes ráster (PNG) se ven borrosas al ampliar y pesan; las vectoriales (SVG) necesitarían igualmente `react-native-svg`.
  4. La licencia hay que revisarla imagen a imagen, y desde aquí no se puede comprobar cómo se ven en un móvil.
- **Razón**: dibujos propios = un solo estilo por construcción, color como parámetro, nítidos a cualquier tamaño, sin licencia de terceros, funcionan sin internet.
- **Alternativas descartadas**: galerías CC0 (arriba); seguir con los iconos de `@expo/vector-icons` sueltos (es el aspecto genérico que se quiere dejar); emojis (cambian según el móvil).
- **Qué sigue usando los iconos**: la app en general y los botones ("Jugar otra vez", "Volver al inicio", etc.). Solo cambia el contenido de los dibujos del juego.

## 2. Cómo se dibuja

- **Decisión**: `react-native-svg` (MIT), la versión que fija Expo para el SDK 58 (15.16.0, ver `node_modules/expo/bundledNativeModules.json`), instalada con `npx expo install react-native-svg`. Es una dependencia oficial de Expo, funciona en Expo Go y no requiere cuenta ni internet.
- **Razón**: permite formas con curvas y contorno oscuro, color por parámetro y escalado nítido. Es el único añadido (principio I).
- **Comprobación pendiente**: que `jest-expo` renderice los componentes de SVG en las pruebas (suele funcionar). Si no, se evita con un simulacro mínimo en las pruebas; no se cambia el enfoque.
- **Salvedad de licencia (ACEPTADA por la persona responsable el 2026-11-09)**: `react-native-svg` es MIT, que pide conservar su aviso al redistribuir el código. Es el mismo tipo de condición que ya tienen los iconos de `@expo/vector-icons` (Apache 2.0) desde la spec 001. Los dibujos de las escenas son propios y no heredan nada. Si la persona responsable considera que esa condición choca con "no heredar una licencia", la alternativa es dibujar con vistas de React Native (sin dependencia) a costa de formas más toscas.

## 3. Estilo de los dibujos

- **Decisión**: estilo plano e infantil: formas grandes y sencillas, contorno oscuro de grosor uniforme (`#1F1F1F`), colores vivos y fondo suave que no compite con los objetos. Cada objeto es una función que recibe su color principal.
- **Razón**: el contorno oscuro da nitidez y contraste; los colores vivos cumplen la historia 1; la sencillez hace que cada objeto se reconozca a primera vista.
- **Lienzo**: proporción 3 : 2 (300 × 200), la que ya usan los dibujos (`proporcionDibujo`), así el tamaño en pantalla y las zonas no cambian de lógica.
- **Los fondos** (pared, suelo, cielo, césped) son iguales en los dos dibujos y no tienen detalles que puedan confundirse con una diferencia.

## 4. Los ambientes y la composición al azar

- **Decisión**: 6 ambientes (Salón, Cocina, Jardín, Dormitorio, Playa, Granja). Cada uno tiene 6 huecos fijos (3 columnas por 2 filas, todos del mismo tamaño, revisados para que ni sus zonas ni sus dibujos se pisen) y un catálogo de 4 a 7 objetos para cada fila. Al empezar cada partida se elige al azar: el color de la pared o del cielo (de 2 a 4 posibles), los objetos de cada hueco, cuál es el cambio de color, cuál falta y cuál sobra, y los colores.
- **Razón**: la petición posterior pide unas 20 o 30 composiciones y más aleatoriedad. Dibujar y revisar 30 escenas fijas es mucho trabajo; componerlas con piezas revisadas da miles de combinaciones y todas cumplen las reglas por construcción (las pruebas lo comprueban con 40 azares por ambiente).
- **Reglas de diseño**: cada diferencia ocupa una zona de al menos 0,2 de ancho y 0,3 de alto (al menos 44 puntos en el móvil más pequeño), no se solapa con otras y está dentro del dibujo. Los objetos que no tienen sentido de otro color (animales, sol, árbol, nubes) no pueden ser el cambio de color. Las parejas de colores se distinguen por tono y también por claridad.
- **Alternativas descartadas**: 30 escenas dibujadas a mano (mucho trabajo y menos variedad real); colocar los objetos en posiciones libres al azar (riesgo de solapamientos y de diferencias poco claras).

## 5. Cómo se elige la escena

- **Decisión**: `crearPartida(anterior, azar)` elige un ambiente distinto del de la partida anterior y compone dentro de él la escena. Dos partidas seguidas nunca tienen el mismo lugar y, además, casi nunca los mismos objetos.
- **Razón**: con solo 3 escenas fijas se repetían cada 2 o 3 partidas.

## 6. Quitar la elección de 3, 5 o 7

- **Decisión**: la pantalla de elegir desaparece y la partida empieza al abrir "Diferencias". `Total` deja de existir; las funciones del juego usan siempre 3.
- **Razón**: la spec pide "exactamente 3". `ElegirOpcion` sigue en Sopa de letras.
- **Consecuencia**: las ideas 2 y 3 de la spec 008 sobre Diferencias (varias escenas con 3, 5 o 7) quedan reemplazadas por esta; se anota en `specs/ideas-pendientes.md` al cerrar la spec.

## 7. Botones

- **Decisión**: "Jugar otra vez" (`refresh`) y "Volver al inicio" (`home`) ya muestran un icono de 48 puntos junto al texto mediante `BotonGrande`. No se cambia código; se añade una prueba que lo compruebe. "Volver al inicio" lo pinta el marco común, así que cambiarlo tocaría a las demás actividades (fuera de alcance, FR-010).
