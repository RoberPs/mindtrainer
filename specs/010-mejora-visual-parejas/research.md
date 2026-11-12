# Investigación: Mejora visual de "Parejas"

## 1. De dónde salen los dibujos (la decisión que se aparta de la propuesta)

- **Decisión**: seguir usando `MaterialCommunityIcons`, que ya viene con `@expo/vector-icons`, y ampliar de 8 a 12 objetos. No se incorpora material de Openclipart ni de Kenney.
- **Qué se comprobó**:
  - **Kenney, "Board Game Icons"**: licencia CC0 (sin crédito), unos 250 archivos, pero las etiquetas de la página son juego de mesa, tarjeta e interfaz. No se pudo confirmar que traiga objetos del hogar (llave, taza, cama…); por su nombre y etiquetas, lo más probable es que no.
  - **Openclipart**: todo es CC0 y no exige crédito, pero cada dibujo lo sube una persona distinta, con estilos distintos, y la propia web avisa de que puede haber dudas de procedencia (etiqueta "pd_issue"). Reunir 12 dibujos del mismo estilo exige elegirlos y revisar la licencia de cada uno a mano, y no se puede comprobar desde aquí cómo se ven en un móvil.
  - Ambas fuentes darían imágenes (SVG o PNG): las SVG necesitarían una librería nueva, y los PNG habría que guardarlos en `assets/`, con peso y mantenimiento.
- **Razón**: la familia de iconos actual tiene un solo estilo (cumple FR-002 por construcción), ya está en la app, no añade nada (principio I) y las 12 figuras existen en el paquete instalado (comprobado). La mejora visual se consigue con color, tamaño, dorso y bordes, no con otra fuente.
- **Alternativas descartadas**: Openclipart (estilos mezclados, revisión de licencias a mano, dependencia nueva); Kenney (sin objetos cotidianos confirmados); emojis (su aspecto cambia según el móvil).
- **Salvedad de licencia (ACEPTADA por la persona responsable el 2026-11-12)**: los iconos de `@expo/vector-icons` tienen licencia libre (tipo Apache 2.0), sin crédito en pantalla ni cuenta ni pago, pero esa licencia pide conservar su aviso al redistribuir el código. El proyecto ya depende de ello desde la spec 001. Si se considera que choca con "no heredar una licencia", habría que cambiar de fuente en las 5 actividades, lo que queda fuera de esta spec.
- **Si tras probarlo en el móvil los dibujos siguen pareciendo genéricos**: se abre otra spec para sustituirlos por imágenes de una sola fuente CC0, revisando una a una.

## 2. Los 12 dibujos

- **Decisión**: los 8 actuales (llave, taza, reloj, gafas, cama, silla, lámpara, tijeras) más paraguas (`umbrella`), teléfono (`phone-classic`), libro (`book-open-variant`) y sombrero (`hat-fedora`). Todos comprobados en el paquete.
- **Razón**: 12 es el doble de lo que necesita la partida grande (6 parejas), así que las partidas varían (historia 4). Se evitaron figuras parecidas (por ejemplo sofá junto a silla).
- **Alternativa descartada**: más de 12; no aporta más variedad visible y hay que revisar cada figura a mano.

## 3. Color de cada dibujo

- **Decisión**: cada dibujo tiene su propio color oscuro en `tema.colores.dibujos`, sobre la ficha crema (`tarjeta`). Cada color debe llegar a 7 a 1 sobre ese fondo; lo comprueba `tests/tema-contraste.test.tsx`.
- **Razón**: da vida y ayuda a distinguir un dibujo de otro, sin bajar el contraste. El color nunca es la única pista: el nombre va escrito debajo.
- **Alternativa descartada**: un solo color para todos (es lo que hay hoy y parece genérico).

## 4. Dorso, caras y estados

- **Decisión**:
  - **Dorso** (igual en todas las cartas tapadas): fondo del color del juego, borde claro grueso, icono `brain` grande y el texto "Carta". Se mantienen el texto "Carta" y el id de prueba `icono-carta-N`.
  - **Cara** (girada): ficha crema con el dibujo en su color, borde del color del juego.
  - **Acertada**: igual que la cara, con borde verde y el visto, como hasta ahora.
- **Razón**: el dorso es sólido y coloreado, la cara es clara; se distinguen sin mirar el detalle. Reutiliza el color del juego (`useColorJuego()`), según las reglas del proyecto.
- **Alternativa descartada**: una imagen de dorso en `assets/` (archivo nuevo sin necesidad).

## 5. Tamaño del dibujo según la partida

- **Decisión**: 88 puntos en partidas de 6 y 8 cartas (2 columnas) y 64 en la de 12 (3 columnas), para que el dibujo y su nombre quepan sin cortarse.
- **Razón**: hoy el dibujo mide 64 en todas; las cartas de 2 columnas tienen sitio de sobra.

## 6. Botones y variedad

- **Botones**: "Seguir" (`arrow-right-circle`), "Jugar otra vez" (`refresh`) y "Volver al inicio" (`home`) ya muestran icono de 48 puntos junto al texto mediante `BotonGrande`. No se cambia código; se añade prueba. "Volver al inicio" lo pone el marco común, así que cambiarlo tocaría a las demás actividades (fuera de alcance, FR-010).
- **Variedad**: `crearPartida` ya elige los dibujos al azar entre todos los disponibles; con 12 dibujos basta con probarlo con tres azares distintos.
