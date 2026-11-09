# Guía de comprobación: Más variedad en los juegos

Cómo comprobar que la funcionalidad cumple la [especificación](spec.md). Las pruebas automáticas las ejecuta el agente; la comprobación en el móvil la hace una persona.

## Requisitos previos

- Dependencias instaladas: `npm install`.
- Para la parte manual, la app abierta en un móvil con `npm start` (Expo Go) o en un emulador. Lo ideal es un móvil pequeño (unos 360 puntos de ancho).

## 1. Pruebas automáticas

```bash
npm run typecheck   # sin errores
npm test            # todas las pruebas pasan, también las de las specs 001 a 007
```

Resultado esperado: sin errores de tipos y todas las pruebas en verde. Las pruebas que fijaban "10 adivinanzas", "3 diferencias", "3 palabras" y "400 ms" se han actualizado a propósito (ver [data-model.md](data-model.md) y [contracts/contenido.md](contracts/contenido.md)).

## 2. Comprobación en la app (una persona con un móvil)

### Historia 1: adivinanzas distintas (CE-001)

1. Abre "Adivinanzas" y juega una partida completa; apunta la primera frase de cada adivinanza.
2. Pulsa "Jugar otra vez" y compara: ninguna de las 5 nuevas debe estar entre las 5 anteriores.
3. Repite 3 o 4 veces. Cada vez deben ser distintas de las de la partida inmediatamente anterior.
4. En cada una, comprueba que solo una de las 3 opciones es correcta y que ninguna otra podría valer.

### Historia 2: sopas con verticales (CE-002)

1. Abre "Sopa de letras", elige **pequeña** y juega las sopas que salgan (pulsa "Jugar otra vez" varias veces hasta ver las 5).
2. Comprueba que las sopas "NUBE", "MAR" y "COCINA" tienen 2 palabras en vertical y 1 en horizontal.
3. Comprueba que cada palabra aparece una sola vez.

### Historia 5: tamaño de la sopa (CE-003)

1. Abre "Sopa de letras": aparece la pantalla de elegir, con "Pequeña" y "Mediana" y sus iconos.
2. Elige **mediana**: se ve una cuadrícula de 6 × 6 y la lista de 5 palabras.
3. En un móvil pequeño, toca las casillas sin fallar por tamaño y sin deslizar de lado.
4. Encuentra las 5 palabras: el aviso de "te faltan…" baja de 5 a 0 y la felicitación dice "5 palabras".
5. Pulsa "Jugar otra vez": vuelve a aparecer la pantalla de elegir. Elige **pequeña** y comprueba que la felicitación dice "3 palabras".

### Historias 3 y 4: escenas y número de diferencias (CE-004, CE-005, CE-006)

1. Abre "Diferencias": aparece la pantalla de elegir con 3, 5 y 7, cada uno con su número escrito.
2. Elige **3**, **5** y **7** en tres partidas distintas, pulsando "Jugar otra vez" entre ellas.
3. En cada partida comprueba que:
   - el aviso dice "Te faltan N diferencias" con el número elegido;
   - cada acierto pone un círculo y baja el aviso;
   - tocar un icono que no cambia no marca nada;
   - la felicitación final dice el número elegido.
4. Comprueba que dos partidas seguidas nunca tienen la misma escena (salón, cocina, jardín, mercado) y que en la de 7 diferencias todos los círculos se pueden tocar con comodidad.

### Historia 6: animación (CE-007)

1. Termina una partida de cada actividad. El icono de celebración aparece poco a poco, en cerca de 1 segundo, y se queda quieto.
2. Activa "Reducir movimiento" en el móvil y repite una: el icono aparece directamente.

## 3. Revisión de contenido (una persona)

Con [contracts/contenido.md](contracts/contenido.md) en la mano, revisar una a una:

- las 40 adivinanzas nuevas;
- las 3 sopas pequeñas reescritas y las 3 medianas;
- las 4 escenas con sus unos 50 iconos, vistas con 7 diferencias.

Esta revisión y la comprobación del móvil no las puede hacer el agente: se dejan pendientes y se avisa.
