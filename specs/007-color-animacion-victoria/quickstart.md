# Guía de comprobación: Color por actividad y animación de victoria

Sirve para comprobar, con la app en un móvil o en el simulador, que la funcionalidad cumple la
spec. No hace falta leer código. Los criterios de éxito están en [spec.md](spec.md); el
comportamiento detallado, en [contracts/color-y-animacion.md](contracts/color-y-animacion.md).

## Preparación

```bash
npm install        # solo la primera vez
npm test           # las pruebas automáticas deben pasar (CE-009)
npm run typecheck  # sin errores de tipos
npm start          # arranca la app; ábrela en el móvil con Expo Go o en el simulador
```

Para los pasos 8 y 9 hace falta cambiar un ajuste del móvil:
- Android: Ajustes > Accesibilidad > Quitar animaciones (o "Eliminar animaciones").
- iPhone: Ajustes > Accesibilidad > Movimiento > Reducir movimiento.

## Comprobaciones a mano (con la app)

| Nº | Qué hacer | Qué debe pasar | Criterio |
|----|-----------|----------------|----------|
| 1 | Abrir la app y mirar la lista de inicio | Hay 5 actividades y cada una tiene un color de fondo distinto, con el texto y el icono en blanco. Se leen bien | RF-001, RF-002, CE-001, CE-002 |
| 2 | Mirar la lista con calma, sobre todo "Forma la palabra" y "Diferencias" (los dos verdes) | Los cinco colores se distinguen entre sí. Ninguno es rojo | RF-003 |
| 3 | Mirar la lista en blanco y negro (ajuste de filtro de color o escala de grises del móvil) | Cada actividad se sigue reconociendo por su icono y su nombre | RF-004, CE-003 |
| 4 | Abrir cada actividad y mirar sus botones ("Volver al inicio", "Jugar otra vez", etc.) | Siguen azules, igual que antes. Solo cambia la lista de inicio | RF-005, CE-004 |
| 5 | Terminar una partida de "Parejas" | La pantalla final aparece con el texto y el botón ya visibles, y el icono de celebración aparece poco a poco (menos de 1 segundo) y se queda quieto. No se mueve, no cambia de tamaño y no parpadea | RF-008, RF-009, CE-005 |
| 6 | Pulsar "Jugar otra vez" mientras el icono todavía aparece | El botón responde al primer toque | RF-010, CE-006 |
| 7 | Repetir el paso 5 en "Forma la palabra", "Sopa de letras", "Adivinanzas" y "Diferencias" | En las cinco el icono aparece igual, una sola vez | RF-008 |
| 8 | Activar "reducir movimiento" en el móvil y terminar una partida | El icono se ve directamente, sin animación | RF-011, CE-007 |
| 9 | Desactivar "reducir movimiento" y volver a jugar y ganar | El icono vuelve a aparecer poco a poco, una vez | RF-008 |
| 10 | Jugar una partida entera, mirando si algo se anima en otro momento (aciertos, errores, lista de inicio, cambio de pantalla) | Nada se anima fuera de la pantalla final | RF-012 |
| 11 | Dejar la pantalla final quieta un par de minutos | El icono no se repite, no parpadea ni se mueve | RF-009 |
| 12 | Comprobar que funciona sin internet (modo avión) | Todo funciona igual | RF-013 |

## Criterios que se comprueban con las pruebas automáticas

Estas pruebas están en `tests/` (`inicio-colores` e `icono-victoria`) y cubren RF-014:

- Las 5 actividades reales tienen colores distintos entre sí, y cada uno tiene un contraste de al
  menos 7 a 1 con el blanco y es distinto del rojo de los círculos.
- Una actividad sin color aparece en la lista con el azul de siempre.
- Con la animación activa, el icono de victoria va de transparente a visible en menos de 1
  segundo y se queda visible.
- Con "reducir movimiento" activado, el icono está visible desde el primer momento.
- Con la animación activa, el mensaje y el botón "Jugar otra vez" están a la vista y responden
  al primer toque.
- Las pruebas de las cinco pantallas finales de las funcionalidades 002 a 006 siguen pasando.

Estas **no** se pueden automatizar y las revisa una persona con la app: que los colores se
distingan bien entre sí, que se lean con comodidad y que el fundido se sienta suave y no
distraiga (comprobaciones 1 a 3, 5 y 7).
