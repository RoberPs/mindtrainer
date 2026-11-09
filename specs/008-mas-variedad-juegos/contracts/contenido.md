# Contrato de contenido: formato y reglas para quien revisa

La funcionalidad no añade interfaces externas ni cambia el [contrato de actividad](../../001-pantalla-inicio/contracts/actividad.md). Este documento fija el formato del contenido que una persona debe revisar una a una (RF-004, RF-008, RF-013) y las reglas que las pruebas automáticas comprueban.

## Adivinanzas (`src/actividades/adivinanzas/banco.ts`)

Total: **al menos 50**. Cada entrada:

```text
id: pera
texto: Blanca por dentro, verde por fuera. Si quieres que te lo diga, espera.
correcta: pera
incorrectas: manzana, uva
```

Quien revisa comprueba, para cada una:

- Es una adivinanza **tradicional y conocida**.
- La respuesta correcta es **una sola palabra** y es la única posible.
- Las dos incorrectas **no podrían valer también** como respuesta.
- Está en español de España, con tildes.

Las pruebas comprueban: 50 o más; `id` distintos; tres respuestas distintas; una sola palabra; el texto no contiene la respuesta como palabra entera.

## Sopas (`src/actividades/sopa-de-letras/sopas.ts`)

Totales: **5 pequeñas** (5 × 6, 3 palabras) y **3 medianas** (6 × 6, 5 palabras). Letras mayúsculas y sin tildes.

Quien revisa comprueba, para cada sopa:

- Cada palabra está **una sola vez**, en horizontal (izquierda a derecha) o en vertical (arriba abajo).
- La palabra no aparece **al revés** en ninguna fila ni columna.
- Las palabras son conocidas y tienen que ver con la referencia (el tema).
- Las letras de relleno no forman por casualidad otra palabra reconocible.

Las pruebas comprueban: tamaño de la cuadrícula; número de palabras; una sola aparición por palabra; que no aparece al revés; que al menos 2 sopas pequeñas tienen más verticales que horizontales; que hay al menos 2 sopas de cada tamaño.

## Escenas de "Diferencias" (`src/actividades/diferencias/escena.ts`)

Total: **4 escenas** con **7 cambios** cada una y **unos 50 iconos** distintos entre todas. Cada escena:

```text
escena: salon
comunes: ventana, lámpara, sillón            # iguales en los dos dibujos
cambios (siempre 7), cada uno con:
  tipo: falta | sobra | cambia
  icono(s): arriba y/o abajo
  zona: x, y, ancho, alto                     # relativas, de 0 a 1
```

Quien revisa comprueba, para cada escena (viéndola en la app con 7 diferencias):

- Todos los iconos se **reconocen a simple vista** y no se confunden con otros de la misma escena.
- Los colores tienen **alto contraste** sobre el fondo.
- Ningún icono **se solapa** con otro ni se sale del dibujo.
- Cada círculo de diferencia **rodea** el icono que cambia y cabe para un dedo.
- Las diferencias son **evidentes** una vez vistas (no hay cambios de matiz).

Las pruebas comprueban, para cada escena: 7 cambios con `id` distintos; los tipos de cambio; que las zonas están dentro del dibujo, no se solapan y miden ≥ 0,20 × 0,30; que cada zona contiene el centro de su elemento; que los iconos existen en la librería de iconos; que el contraste es ≥ 7:1; y que `dibujosDe(escena, n)` difiere exactamente en `n` elementos para `n` = 3, 5 y 7.
