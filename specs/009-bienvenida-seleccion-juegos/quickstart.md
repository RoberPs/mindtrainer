# Guía de comprobación: spec 009

**Preparación**: `npm install`, `npm test`, `npm run typecheck`, `npm start` y abrir la app en un móvil de unos 360 puntos de ancho.

1. **Bienvenida** (historia 1): al abrir se ven el logo, "MindTrainer", "Empieza a entrenar tu mente", "¿Listo para ejercitar tu memoria hoy?" y "Empezar". Pulsar "Empezar" lleva a la lista. Salir de un juego con "Volver al inicio" lleva a la lista, no a la bienvenida.
2. **Colores** (historia 2): recorrer las pantallas; el fondo es crema, no queda blanco puro ni los azul oscuro, verde, morado o marrón antiguos, y todo el texto se lee bien.
3. **Lista** (historia 3): el encabezado es "Elige uno de los juegos"; las 5 tarjetas son grandes, con icono, nombre y descripción, y se puede deslizar.
4. **Color por juego** (historia 4): entrar en cada juego y ver que sus botones (elegir tamaño o número, acciones, pantalla final) usan el color de su tarjeta; los 5 son distintos.
5. **Pruebas**: `npm test` pasa, incluida la de contraste de 7 a 1.
6. **Pendiente de una persona con móvil**: revisar a ojo los colores, el logo y los iconos de Diferencias.
