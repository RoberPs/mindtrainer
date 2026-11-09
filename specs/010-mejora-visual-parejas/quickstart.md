# Guía de comprobación: Mejora visual de "Parejas"

## Pruebas automáticas

```bash
npm test
npm run typecheck
```

Deben pasar todas, incluidas las de "Parejas" que ya existían (reglas, puntuación y tamaños no cambian).

## Comprobación a mano con un móvil (`npm start`)

Abre la app, pulsa "Empezar" y elige "Parejas".

1. **Dibujos (SC-001)**: juega una partida de 6, otra de 8 y otra de 12 cartas, y descubre todas las cartas. Cada dibujo se reconoce sin dudar, tiene su color y su nombre debajo, y ninguno se parece a otro.
2. **Dorso (SC-002)**: al empezar, todas las cartas tienen el mismo dorso, con el color del juego y la palabra "Carta". Al girar una, se ve de inmediato cuál está descubierta.
3. **Estados**: una pareja acertada se distingue de una carta recién girada (borde verde y visto).
4. **Botones (SC-003)**: "Seguir" (al girar dos cartas distintas), "Volver al inicio" (arriba) y "Jugar otra vez" (al terminar) muestran un icono junto al texto y se leen bien.
5. **Variedad (SC-004)**: juega 3 partidas seguidas del mismo tamaño; no siempre salen los mismos dibujos.
6. **Contraste y tamaño**: en el tamaño de 12 cartas, el dibujo y el nombre caben sin cortarse y se ven con claridad.
7. **Otros juegos (SC-005)**: abre otro juego y comprueba que se ve igual que antes.

Esta comprobación la hace una persona con un móvil; el agente no puede darla por hecha.
