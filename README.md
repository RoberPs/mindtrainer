# MindTrainer

App móvil para entrenar la memoria de personas mayores con preguntas y juegos. Cada persona la
usa en su propio teléfono. Todo el producto está en español de España.

## Qué hace hoy

- Al abrir la app se ve la **pantalla de inicio**: una lista de actividades, cada una con su
  icono, su nombre y una descripción de una línea. Se toca una para empezar.
- Dentro de cualquier actividad hay un botón **"Volver al inicio"** siempre visible. Si hay una
  partida en curso, antes de salir pregunta si se quiere salir ("Sí, salir" / "No, seguir
  jugando").
- La lista de actividades está **vacía** hasta que se especifique la primera actividad. Cada
  juego o tipo de pregunta se añade en su propia especificación, paso a paso.

## Cómo está pensada

La [constitución](.specify/memory/constitution.md) recoge las reglas del proyecto. Las
principales:

1. Simplicidad ante todo: es una versión 1.
2. Todo en español de España.
3. No se construye nada que no esté escrito en la especificación.
4. Cada criterio se puede comprobar usando la app, sin leer código.
5. Funciona completa en el teléfono: sin servidor ni internet.
6. Sin cuentas ni registro; los datos se quedan en el teléfono.
7. Letra grande, contraste alto, botones grandes y sin límites de tiempo.
8. Pruebas básicas y funcionales de cada juego y tipo de pregunta.
9. Muchos iconos e imágenes intuitivos, siempre junto al texto.

## Cómo probarla

Necesitas [Node.js](https://nodejs.org) instalado.

```bash
npm install        # instala las dependencias (solo la primera vez)
npm start          # arranca la app; se abre con la aplicación Expo Go en el móvil
npm test           # ejecuta las pruebas automáticas
npm run typecheck  # comprueba los tipos
```

Para comprobar la app con una persona, sigue la
[guía de comprobación](specs/001-pantalla-inicio/quickstart.md). Mientras no haya actividades
reales, hay dos de ejemplo en `src/actividades/ejemplos.ts`; se activan cambiando una línea en
`App.tsx` (hay una nota allí) y se quitan al terminar.

## Cómo se trabaja

El proyecto usa [Spec Kit](https://github.com/github/spec-kit): cada funcionalidad pasa por
especificación, plan y tareas antes de construirse, y cada paso queda guardado en un commit.

| Carpeta | Contenido |
|---------|-----------|
| `specs/` | Una carpeta por funcionalidad: spec, plan, tareas y guía de comprobación |
| `src/` | Código de la app |
| `tests/` | Pruebas automáticas |
| `assets/` | Iconos e imágenes incluidos en la app |
| `.specify/` | Constitución y configuración de Spec Kit |

## Estado

- Funcionalidad 1, [pantalla de inicio](specs/001-pantalla-inicio/spec.md): construida y con las
  pruebas automáticas pasando. Falta la comprobación con una persona y un móvil (tarea T027).
