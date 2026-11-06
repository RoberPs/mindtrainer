<!--
Informe de impacto de la sincronización
- Cambio de versión: 1.0.0 → 1.1.0 (MENOR: se añade un principio)
- Principios modificados: ninguno
- Principios añadidos: IX. Imágenes e iconos intuitivos
- Secciones añadidas: ninguna
- Secciones eliminadas: ninguna
- Pendientes (TODO): ninguno
- Historial: 1.0.0 (2026-11-06) creó los 8 principios iniciales
-->
# Constitución de MindTrainer

MindTrainer es una app móvil para entrenar la memoria de personas mayores con preguntas y
juegos. Es un proyecto nuevo (versión 1). Cada persona la usa en su propio teléfono.

## Principios fundamentales

### I. Simplicidad ante todo
Entre dos soluciones, se elige siempre la más simple. Es una versión 1: no se construye nada
"por si acaso" ni se anticipa complejidad futura.

### II. Todo en español de España
Todo el producto (textos, mensajes, preguntas y juegos) está en español de España.

### III. Cero alcance fantasma
No se implementa ninguna funcionalidad que no esté escrita en la especificación. Si surge una
idea nueva, se propone; no se construye hasta que se añada a la especificación.

### IV. Verificable por una persona no técnica y mayor
Cada criterio de éxito se puede comprobar usando la app, sin leer código. Si un criterio exige
conocimientos técnicos para comprobarse, se reescribe.

### V. Todo en el teléfono
La app funciona completa dentro del móvil de la persona: sin servidor, sin hosting y sin
depender de internet.

### VI. Datos con respeto
No hay cuentas ni registro. Se pide solo lo imprescindible y los datos se quedan en el
teléfono de su dueño. No se guarda ninguna clave ni secreto en el código.

### VII. Pensada para personas mayores
Letra grande, contraste alto y botones grandes. No hay límites de tiempo en preguntas ni en
juegos: cada persona va a su ritmo.

### VIII. Pruebas básicas y funcionales (NO NEGOCIABLE)
Cada juego y cada tipo de pregunta tiene pruebas que comprueban que funciona: reglas,
respuesta correcta e incorrecta, puntuación y final de la partida. Solo lo básico: no se
hacen pruebas exhaustivas, de rendimiento ni de aspecto visual. Una funcionalidad no está
terminada hasta que sus pruebas pasan.

### IX. Imágenes e iconos intuitivos
Toda la app se construye con una gran variedad de iconos e imágenes intuitivos para personas
mayores. Los iconos e imágenes acompañan al texto, nunca lo sustituyen. Son grandes, de alto
contraste, están incluidos dentro de la app (sin descargar de internet) y tienen una licencia
que permite usarlos. Se entienden sin leer: sirven de apoyo a quien tiene poca soltura.

## Límites del producto

- No hay servidor, base de datos externa, publicidad ni análisis de uso.
- No hay temporizadores, cuenta atrás ni penalizaciones por tardar.
- Las funciones que necesiten internet o una cuenta quedan fuera de la versión 1.

## Forma de trabajar

- Todo cambio parte de la especificación; lo que no está en ella no se construye.
- Antes de dar algo por terminado, sus pruebas pasan y su criterio de éxito se ha comprobado
  usando la app.
- Si una decisión choca con esta constitución, se explica el motivo y se decide de forma
  expresa, nunca en silencio.

## Gobierno

Esta constitución prevalece sobre cualquier otra práctica del proyecto. Para cambiarla hay que
escribir el cambio, explicar el motivo y actualizar la versión y la fecha. La versión sigue
este criterio: MAYOR si se elimina o cambia el sentido de un principio; MENOR si se añade un
principio o se amplía mucho uno existente; PARCHE si solo se aclara la redacción. Cada
especificación, plan y revisión comprueba que cumple estos principios.

**Versión**: 1.1.0 | **Ratificada**: 2026-11-06 | **Última modificación**: 2026-11-06
