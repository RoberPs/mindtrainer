# Modelo de datos: Color por actividad y animación de victoria

Todo son datos fijos de la app. No hay estado de partida nuevo ni se guarda nada.

## Color de actividad

Un campo opcional más en `Actividad` (definida en `src/actividades/tipos.ts`).

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `color` | texto (color), opcional | Color de fondo de la tarjeta de la actividad en la lista de inicio. Si falta, se usa `tema.colores.primario` (azul). |

**Reglas**:
- Los valores salen de `tema.colores.actividades` (`azul`, `verde`, `morado`, `marron`,
  `verdeAzulado`); `registro.ts` no escribe colores a mano.
- Los cinco son distintos entre sí y cada uno tiene un contraste de al menos 7 a 1 con
  `tema.colores.textoSobrePrimario` (blanco).
- Ninguno es igual a `tema.colores.marca` (rojo de los círculos de "Diferencias").
- Solo lo lee `Inicio`. Las pantallas de las actividades no lo usan.

## Interruptor de animación

Un objeto en `src/animacion.ts`.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `activa` | verdadero/falso | Verdadero en la app; falso en las pruebas automáticas (`NODE_ENV` igual a `test`). Las pruebas de la animación lo ponen a verdadero y lo restauran. |
| `duracion` | número (ms) | Duración del fundido: 400. |

## Estados del icono de victoria

El icono de celebración no guarda datos de partida; solo tiene un valor de opacidad mientras
se pinta.

| Situación | Opacidad al aparecer | Qué ocurre |
|-----------|----------------------|------------|
| `animacion.activa` falso | 1 | Se ve ya, sin animar |
| "Reducir movimiento" activado en el móvil | 1 | Se ve ya, sin animar |
| Caso normal | 0 → 1 en 400 ms | Fundido una vez y se queda en 1 |
| Se desmonta durante el fundido | — | Se para la animación |
