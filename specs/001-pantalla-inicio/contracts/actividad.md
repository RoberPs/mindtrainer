# Contrato de una actividad

Toda actividad (juego o tipo de pregunta) que quiera aparecer en la pantalla de inicio debe
cumplir este contrato. Es la única interfaz entre la pantalla de inicio y las actividades.

## Qué entrega la actividad

| Campo | Obligatorio | Descripción |
|-------|-------------|-------------|
| Identificador | Sí | Único entre todas las actividades |
| Icono | Sí | Icono o imagen propio, incluido en la app, distinto del de las demás |
| Nombre | Sí | Texto para la lista, en español de España |
| Descripción | Sí | Una línea, en español de España |
| Contenido | Sí | La pantalla de la actividad |

## Qué recibe el contenido de la actividad

| Elemento | Para qué sirve |
|----------|----------------|
| Aviso de partida en curso | Una función a la que la actividad llama con "sí" cuando empieza una partida y con "no" cuando termina o se abandona. |

## Reglas

1. La actividad NO pinta el botón "Volver al inicio": lo pone siempre el marco común.
2. La actividad MUST avisar de que hay partida en curso en cuanto empieza, para que salir pida
   confirmación (FR-011).
3. La actividad MUST avisar de que la partida ha terminado al acabar, para que salir ya no pida
   confirmación.
4. La actividad NO MUST usar límites de tiempo (principio VII).
5. La actividad NO MUST guardar datos fuera del teléfono (principios V y VI).

## Qué ve la persona (contrato de pantalla)

**Pantalla de inicio**
- Una lista que se puede desplazar.
- Cada elemento muestra su icono grande, el nombre y, debajo, la descripción de una línea.
- Tocar un elemento abre esa actividad.
- Con una sola actividad el aspecto es el mismo que con varias.

**Marco de actividad**
- Zona fija con el botón "Volver al inicio" (icono de casa y texto), siempre a la vista.
- Debajo, el contenido de la actividad.

**Aviso de salida** (solo con partida en curso)
- Texto: "¿Seguro que quieres salir? Perderás la partida".
- Dos botones grandes, cada uno con icono y texto: "Sí, salir" y "No, seguir jugando".
- Sin límite de tiempo para responder.
