# Cambios al contrato de actividad (spec 009)

Amplía [specs/001-pantalla-inicio/contracts/actividad.md](../../001-pantalla-inicio/contracts/actividad.md).

| Campo | Cambio |
|-------|--------|
| Color | Ahora es el **color del juego**: lo usan su tarjeta y todos sus botones y elementos. Debe tener 7 a 1 con su color de texto y ser distinto del de las demás. |
| Color de texto (nuevo, opcional) | Color del texto e iconos sobre el color del juego. Por defecto, blanco. |

## Reglas nuevas

1. Los botones y elementos de color de una actividad MUST leer el color con `useColorJuego()` (o usar `BotonGrande`). No usan colores fijos de la paleta, salvo acierto, error y marcas, que van siempre con texto o icono.
2. `MarcoActividad` MUST proveer el color de la actividad que muestra.

## Qué ve la persona

- **Bienvenida**: logo pequeño y "MindTrainer" arriba; logo grande; título; pregunta; botón "Empezar".
- **Lista**: encabezado "Elige uno de los juegos" y una tarjeta grande por juego con icono, nombre y descripción.
