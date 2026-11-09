# Contrato: color por actividad y animación de victoria

Esta funcionalidad amplía el [contrato de actividades](../../001-pantalla-inicio/contracts/actividad.md)
de la funcionalidad 001 y añade un componente común. Aquí se concreta lo que cambia.

## Cambio en lo que entrega la actividad

| Campo | Obligatorio | Descripción |
|-------|-------------|-------------|
| Color | **No** | Color de fondo de su tarjeta en la lista de inicio. Oscuro, con contraste de al menos 7 a 1 con el texto blanco, distinto del de las demás actividades. Sin color, la tarjeta es azul. |

Al implementar, este campo se añade a la tabla "Qué entrega la actividad" de
[actividad.md](../../001-pantalla-inicio/contracts/actividad.md) y al contrato de pantalla de
inicio ("cada elemento muestra su icono, el nombre y la descripción sobre el color de la
actividad").

## Colores asignados

| Actividad | Color (en `tema.colores.actividades`) |
|-----------|---------------------------------------|
| Parejas | `azul` |
| Forma la palabra | `verde` |
| Sopa de letras | `morado` |
| Adivinanzas | `marron` |
| Diferencias | `verdeAzulado` |

## Componente `IconoVictoria`

Icono de celebración (`party-popper`) con fundido de entrada. Lo usan las cinco pantallas finales.

| Entrada | Descripción |
|---------|-------------|
| `testID` | Identificador del icono. Cada pantalla mantiene el suyo (`icono-felicitacion` o `icono-resultado`) para que las pruebas actuales sigan valiendo. |
| `tamano` | Tamaño del icono (96 como hasta ahora). |

**Comportamiento**:
1. Con la animación activa y sin "reducir movimiento": el icono empieza transparente y llega a
   visible en 400 ms, una vez. No se mueve, no cambia de tamaño y no se repite.
2. Con "reducir movimiento" activado, o con la animación desactivada (pruebas): el icono se ve
   visible desde el primer momento.
3. El icono sigue siendo decorativo (oculto a la accesibilidad), como `Icono`.
4. No contiene ni envuelve texto ni botones: no puede retrasarlos ni bloquearlos.

## Qué ve la persona

**Pantalla de inicio**
- Cada tarjeta tiene el color de su actividad, con texto e icono blancos. El resto de la tarjeta
  (tamaño, orden, textos, aviso de accesibilidad) no cambia.

**Pantallas finales** (Parejas, Forma la palabra, Sopa de letras, Adivinanzas y Diferencias)
- El texto y los botones se ven desde el primer instante. Solo el icono de celebración aparece
  poco a poco.
