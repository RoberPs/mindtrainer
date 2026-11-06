# Guía de comprobación: Pantalla de inicio de MindTrainer

Sirve para demostrar que la funcionalidad cumple la spec. Tiene dos partes: una para una
persona no técnica y mayor, usando solo la app, y otra automática.

## Parte 1. Comprobación con la app (persona no técnica)

**Antes de empezar**: la app instalada en el móvil, sin haberla abierto nunca. Para esta
comprobación hacen falta al menos dos actividades de ejemplo en la app. Mientras no exista
ninguna actividad real, se añaden temporalmente solo para la prueba y se quitan después.

| # | Qué hacer | Qué debe verse | Criterio |
|---|-----------|----------------|----------|
| 1 | Abrir la app | Aparece la lista de actividades, cada una con nombre y una línea de descripción. Sin registro, permisos ni tutorial. | FR-001 a FR-004, SC-002 |
| 2 | Tocar una actividad | Se abre esa actividad. | FR-003, SC-001 |
| 3 | Mirar la pantalla de la actividad | El botón "Volver al inicio" está a la vista, sin desplazarse. | FR-007, SC-003 |
| 4 | Tocar "Volver al inicio" sin haber empezado partida | Vuelve a la lista, sin preguntar nada. | FR-008, SC-004 |
| 5 | Entrar en una actividad, empezar una partida y tocar "Volver al inicio" | Sale el aviso "¿Seguro que quieres salir? Perderás la partida" con "Sí, salir" y "No, seguir jugando". | FR-011 |
| 6 | Tocar "No, seguir jugando" | La partida sigue donde estaba. | FR-012 |
| 7 | Repetir el paso 5 y tocar "Sí, salir" | Vuelve a la lista. | FR-008 |
| 8 | Con una sola actividad disponible, abrir la app | Se ve igual que con varias: dentro de la lista. | FR-005 |
| 9 | Con muchas actividades, deslizar el dedo por la lista | Se pueden ver y abrir todas. | FR-006, SC-005 |
| 10 | Mirar todos los textos | Todo en español de España, con letra grande y buen contraste. | FR-009, FR-010 |
| 11 | Mirar la lista sin leer los textos | Cada actividad tiene un icono grande y distinto; se distinguen solo por el icono. | FR-013, SC-007 |
| 12 | Mirar el botón "Volver al inicio" y el aviso de salida | Cada botón lleva icono y texto; el de volver lleva una casa. | FR-014, FR-015, SC-008 |
| 13 | Poner el móvil en modo avión y abrir la app | Todos los iconos e imágenes se ven igual. | FR-016, SC-008 |

La funcionalidad está lista cuando los 13 pasos salen como se describe.

## Parte 2. Pruebas automáticas

**Requisitos**: Node.js instalado y las dependencias del proyecto instaladas.

- Ejecutar todas las pruebas: `npm test`
- Resultado esperado: todas pasan.

Las pruebas cubren: la lista (una, varias y desplazamiento), abrir una actividad, el botón
"Volver al inicio" en el marco, la vuelta al inicio y la confirmación con partida en curso (salir
y seguir). Detalles de contrato en [contracts/actividad.md](contracts/actividad.md) y del estado
en [data-model.md](data-model.md).
