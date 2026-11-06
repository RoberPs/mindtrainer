# Guía de comprobación: Actividad "Diferencias"

Sirve para comprobar, con la app en un móvil o en el simulador, que la actividad cumple la spec.
No hace falta leer código. Los criterios de éxito están en [spec.md](spec.md); el comportamiento
detallado, en [contracts/diferencias.md](contracts/diferencias.md).

## Preparación

```bash
npm install        # solo la primera vez
npm test           # las pruebas automáticas deben pasar (CE-009)
npm run typecheck  # sin errores de tipos
npm start          # arranca la app; ábrela en el móvil con Expo Go o en el simulador
```

## Comprobaciones a mano (con la app)

| Nº | Qué hacer | Qué debe pasar | Criterio |
|----|-----------|----------------|----------|
| 1 | En el inicio, buscar "Diferencias" y abrirla | Aparece en la lista con su icono, su nombre y su descripción. Se abre con dos dibujos, uno encima del otro, y el aviso "Te faltan 3 diferencias" | RF-001, RF-010, RF-016, CE-001 |
| 2 | Mirar la pantalla sin tocar nada | Se ven los dos dibujos enteros a la vez, sin desplazar, y las 3 diferencias se pueden ver a simple vista con calma | RF-012, RF-013 |
| 3 | Dejar la app parada un par de minutos | No cambia nada y no se pierde la partida | RF-011, CE-007 |
| 4 | Tocar una diferencia en el dibujo de abajo | Aparece un círculo grueso en ese sitio, en el dibujo de abajo **y** en el de arriba. El aviso pasa a "Te faltan 2 diferencias" | RF-003, RF-006, CE-002 |
| 5 | Tocar un lugar sin diferencia del dibujo de abajo | Sale el mensaje amable con su icono. No se marca nada ni cambia el aviso. Los dibujos no se mueven | RF-004, CE-003 |
| 6 | Tocar otras 9 veces zonas sin diferencia | Nada se estropea ni se bloquea; se puede seguir encontrando diferencias | CE-003 |
| 7 | Tocar el círculo ya marcado varias veces | No pasa nada: ni mensaje nuevo, ni cambia el aviso | RF-005, CE-004 |
| 8 | Tocar en el dibujo de arriba | No pasa nada | RF-002 |
| 9 | Marcar la segunda diferencia y mirar el aviso | Dice "Te falta 1 diferencia" (en singular) | RF-010, CE-006 |
| 10 | Marcar la tercera diferencia | Aparece la felicitación con su icono y "Has necesitado X toques", donde X = 3 más los fallos que hayas hecho (sin contar los toques repetidos ni los del dibujo de arriba). Se ven los botones "Jugar otra vez" y "Volver al inicio" | RF-007, RF-008, CE-005 |
| 11 | Pulsar "Jugar otra vez" | Vuelve la partida con los dibujos sin círculos, "Te faltan 3 diferencias" y el recuento a cero | RF-009 |
| 12 | Pulsar "Volver al inicio" desde la felicitación | Vuelve a la pantalla de inicio sin preguntar nada | RF-016 |
| 13 | Entrar de nuevo y pulsar "Volver al inicio" a mitad de partida | Sale el aviso "¿Seguro que quieres salir? Perderás la partida" | RF-016 |
| 14 | Comprobar la letra, los botones y los círculos | Letra grande, botones altos y círculos gruesos que se ven aunque no se distingan los colores | RF-006, RF-013, RF-014 |
| 15 | Comprobar que la actividad funciona sin internet (modo avión) | Todo funciona igual | RF-017 |

## Criterios que se comprueban con las pruebas automáticas

Estas pruebas están en `tests/` (`diferencias-escena`, `diferencias-juego` y
`diferencias-pantalla`) y cubren RF-018:

- La escena tiene exactamente 3 diferencias y cada zona contiene el elemento distinto.
- Un toque en una zona marca la diferencia (en los dos dibujos); fuera de las zonas no marca nada.
- Un toque en una diferencia ya marcada no cambia nada ni cuenta como toque.
- "Te faltan N diferencias" baja de 3 a 0, con singular cuando queda una.
- Los toques de la felicitación son aciertos más fallos, y nada más.
- Al encontrar las 3 aparece la felicitación; "Jugar otra vez" empieza de cero.

Estas **no** se pueden automatizar y las revisa una persona con la app: que los dibujos sean
claros y los iconos se reconozcan, que las diferencias sean visibles sin ser difíciles, y que todo
quepa en un móvil pequeño (comprobaciones 2 y 14).
