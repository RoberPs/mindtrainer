# Investigación (Fase 0): Más variedad en los juegos

No quedaban marcas de aclaración pendientes en la spec. Esta investigación resuelve lo que la spec dejó para la planificación: el tamaño real de la sopa mediana, el diseño de las escenas, el tamaño de las zonas y la forma de evitar repeticiones.

## 1. Tamaño de la sopa mediana

- **Decisión**: cuadrícula de **6 filas × 6 columnas** con **5 palabras**, y **3 sopas medianas** hechas a mano.
- **Justificación**: en un móvil de 360 puntos de ancho quedan 328 puntos útiles (16 de margen a cada lado). Con 6 columnas y 5 huecos de 6 puntos, cada casilla mide (328 − 30) / 6 ≈ **49,7 puntos**: cumple los 44 puntos. Con 7 columnas serían (328 − 36) / 7 ≈ **41,7 puntos**, que no llegan. Por eso se descarta 7 columnas (la spec pedía probarlo antes de decidir; la cuenta basta para decidir y la comprobación manual del móvil la confirma). Con 6 filas, las palabras de 6 letras también caben en vertical, lo que da más margen para repartir direcciones. Tres sopas medianas permiten aplicar "no repetir la anterior" sin que se agote la elección.
- **Alternativas descartadas**: 7 columnas (casillas de unos 42 puntos); 5×6 también para la mediana (no tendría "más casillas"); más de 3 sopas medianas (más contenido a revisar a mano sin beneficio claro en una versión 1).

## 2. Reparto de direcciones en las sopas pequeñas

- **Decisión**: reescribir 3 de las 5 (`nube`, `mar`, `cocina`) con **2 palabras verticales y 1 horizontal**; `huerto` y `costura` quedan con 2 horizontales y 1 vertical.
- **Justificación**: `huerto` tiene TOMATE y PATATA, de 6 letras, que en una cuadrícula de 5 filas solo caben en horizontal, así que no se puede cambiar. `nube` (LLUVIA horizontal; CIELO y RAYO verticales), `mar` (BARCO horizontal; OLAS y ARENA verticales) y `cocina` (SARTEN horizontal; PLATO y HORNO verticales) sí. Se cumple "al menos 2" con margen (3).
- **Alternativas descartadas**: alargar las filas de 5 a 6 en las pequeñas (cambiaría el tamaño que ya conoce la persona).

## 3. Diseño de las escenas de "Diferencias"

- **Decisión**: una **escena** es un conjunto fijo de `comunes` (iconos iguales en los dos dibujos) más **7 cambios** posibles, cada uno con su zona. La partida con N diferencias activa los **primeros N cambios**; los otros 7 − N se pintan iguales en los dos dibujos (con el icono que tenga el cambio: el de arriba, o el de abajo si solo existe abajo). Las coordenadas y zonas son datos escritos a mano.
- **Justificación**: es lo más simple que cumple 3/5/7 con escenas fijas revisadas a mano (RF-012, RF-014 y RF-015). Una sola escena sirve para los tres niveles sin duplicar contenido. Las zonas no cambian con el nivel, así que basta revisar y probar 7 zonas por escena.
- **Distribución en el dibujo** (tal como quedó construido): una rejilla de 4 columnas × 3 filas de huecos. Cada icono mide 0,26 del alto del dibujo y va en el centro de un hueco; su zona mide 0,22 de ancho × 0,30 de alto, centrada en el hueco, así que ninguna zona se toca con otra. Los 7 cambios y los iconos comunes ocupan huecos distintos, y cada escena deja libres los que sobran. (Se pasó de 2 a 3 filas respecto al borrador inicial para poder variar la cantidad de iconos entre escenas.)
- **Tipos de cambio** (los mismos que hoy): *falta* (solo arriba), *sobra* (solo abajo) y *cambia* (mismo `id`, otro icono). Cada escena mezcla los tres tipos.
- **Número de escenas e iconos**: **4 escenas** (salón, cocina, jardín y mercado) con 2, 3, 4 y 5 iconos comunes, de modo que tienen 9, 10, 11 y 12 iconos con 7 diferencias activas (distinta cantidad en cada una). Cada escena usa sus comunes + 7 cambios + 3 iconos alternativos de los cambios de tipo *cambia*: 12, 13, 14 y 15 iconos distintos, **54 en total**, que es el "unos 50" de la spec. Los iconos no se repiten entre escenas.
- **Alternativas descartadas**: colocación aleatoria (la spec la excluye); una escena distinta por nivel (triplicaría el contenido); generar las zonas por código (más lógica y más pruebas).

## 4. Tamaño real de las zonas

- **Decisión**: las zonas miden **al menos 0,20 de ancho y 0,30 de alto** (las construidas miden 0,22 × 0,30) (en coordenadas relativas) y se sube el ancho mínimo del dibujo de 160 a **240 puntos** (la pantalla ya es desplazable).
- **Justificación**: con un ancho de 240 puntos y una proporción de 1,5, el alto es de 160 puntos; 0,20 × 240 = **48 puntos** y 0,30 × 160 = **48 puntos**, por encima de los 44 pedidos. Hoy el mínimo de 160 daría zonas de 29 puntos, que no valen para 7 diferencias. Subir el mínimo solo afecta a pantallas muy bajas, y la pantalla ya hace scroll.
- **Alternativas descartadas**: mantener 160 (zonas de 29 puntos); reducir a 5 el máximo (la spec pide 7).

## 5. Pantalla de elegir compartida

- **Decisión**: un componente `ElegirOpcion` (invitación + lista de botones grandes con icono y texto) que usan "Sopa de letras" y "Diferencias". "Parejas" conserva su `ElegirTamano`.
- **Justificación**: dos usos justifican un componente pequeño; copiar el de "Parejas" dos veces duplicaría código y tocar "Parejas" sería alcance fantasma. Los iconos de los botones son `size-s` y `size-m` para la sopa (los mismos que ya usa "Parejas") y `numeric-3-circle`, `numeric-5-circle` y `numeric-7-circle` para las diferencias.
- **Alternativas descartadas**: un selector dentro de la pantalla de juego (la partida empezaría sin que la persona haya elegido); reescribir "Parejas" para usar el componente nuevo.

## 6. No repetir la partida anterior

- **Decisión**: cada `crearPartida` recibe lo anterior y lo excluye antes de sortear:
  - Adivinanzas: `crearPartida(idsAnteriores = [], azar)`; se mezclan solo las adivinanzas cuyo `id` no esté en `idsAnteriores`.
  - Diferencias: `crearPartida(total, idEscenaAnterior?, azar)`; se sortea entre las escenas con otro `id`.
  - Sopa: `crearPartida(tamano, idAnterior?, azar)`; se sortea entre las sopas de ese tamaño con otro `id` (hoy ya lo hace sin tamaño).
- **Justificación**: es la solución más simple y coincide con lo ya hecho en la sopa (spec 004). La actividad guarda en memoria solo el último valor mientras está abierta.
- **Alternativas descartadas**: recorrer todo el banco antes de repetir (opción B de la aclaración, descartada).

## 7. Duración del fundido

- **Decisión**: `animacion.duracion = 900` ms (entre 800 y 1000).
- **Justificación**: es el valor medio del rango pedido y no toca nada más: la animación sigue siendo un fundido de opacidad, una sola vez, apagada en las pruebas y desactivada con "reducir movimiento".
- **Alternativas descartadas**: añadir crecimiento (descartado en la spec 007 y en esta).

## 8. Contenido de 40 adivinanzas nuevas

- **Decisión**: se escriben 40 adivinanzas tradicionales de respuesta de una sola palabra, con dos opciones incorrectas de la misma categoría que no puedan valer como respuesta (misma regla que el RF-011 de la spec 005). Las pruebas del banco ya comprueban tres respuestas distintas, una palabra y que el texto no contenga la respuesta; esas mismas pruebas valen para las 50. Una persona las revisa una por una (RF-004).
- **Justificación**: la parte difícil es de contenido, no de código. Por eso la revisión humana es una tarea propia y queda pendiente para una persona (como T027 de la spec 001).
- **Riesgo**: una incorrecta que también pudiera valer (por ejemplo, "melón" y "sandía" en una adivinanza de fruta grande y verde). Se evita eligiendo incorrectas de otra categoría o muy distintas.

## 9. Textos con número

- **Decisión**: los textos que hoy dicen "3" pasan a ser funciones del número: en la sopa, `etiqueta(n)` y `felicitacion(n)`; en "Diferencias", `felicitacion(n)`. La descripción de "Diferencias" en el inicio pasa a no llevar número ("Encuentra las diferencias entre dos dibujos"), porque ahora se elige. El aviso `faltan(n)` ya es una función y se mantiene.
- **Justificación**: es lo que pide el RF-010 y el RF-017; la descripción del inicio no puede decir "3" si se pueden buscar 3, 5 o 7.
