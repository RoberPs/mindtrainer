# Especificación de la funcionalidad: Diferencias

**Rama de la funcionalidad**: `006-diferencias`

**Creada**: 2026-11-06

**Estado**: Borrador

**Entrada**: Actividad "Diferencias": dos dibujos casi iguales y la persona debe encontrar las 3 diferencias. Pensada para personas mayores, para ejercitar la atención y la memoria visual con un ejercicio claro. Fuera de alcance: zoom, pistas, niveles y ranking.

## Escenarios de usuario y pruebas *(obligatorio)*

### Historia 1 - Tocar en el segundo dibujo donde veo una diferencia (Prioridad: P1)

Una persona mayor abre la actividad y ve dos dibujos grandes, uno encima del otro, casi iguales. Toca en el dibujo de abajo (el segundo) el lugar donde cree ver una diferencia. Si acierta, la diferencia queda marcada con un círculo en los dos dibujos. Si falla, aparece un mensaje amable y no pasa nada más.

**Por qué esta prioridad**: es el corazón de la actividad. Sin ella no hay juego.

**Prueba independiente**: se puede probar entrando en la actividad, tocando una diferencia y tocando un lugar sin diferencia. Ya aporta valor aunque no exista el resto de historias.

**Escenarios de aceptación**:

1. **Dado** que veo los dos dibujos, **cuando** toco en el segundo dibujo una zona donde hay una diferencia, **entonces** esa diferencia queda marcada con un círculo en el primer dibujo y en el segundo.
2. **Dado** que veo los dos dibujos, **cuando** toco en el segundo dibujo una zona donde no hay diferencia, **entonces** aparece un mensaje amable y no cambia nada más: no se marca nada y no se pierde nada.
3. **Dado** que ya he fallado un toque, **cuando** toco una diferencia, **entonces** se marca con normalidad: un fallo no bloquea ni cambia las reglas.

---

### Historia 2 - Encontrar las 3 diferencias y ver la felicitación (Prioridad: P1)

Al marcar la tercera diferencia, la persona ve un mensaje de felicitación que dice cuántos toques ha necesitado, y los botones "Jugar otra vez" y "Volver al inicio".

**Por qué esta prioridad**: da sentido de principio y fin a la actividad y permite comprobar el recuento de toques.

**Prueba independiente**: se puede probar encontrando las 3 diferencias (con y sin fallos por el camino) y comprobando el mensaje, el número de toques y los dos botones.

**Escenarios de aceptación**:

1. **Dado** que he marcado dos diferencias, **cuando** toco la tercera, **entonces** veo un mensaje de felicitación con el número de toques que he necesitado y los botones "Jugar otra vez" y "Volver al inicio".
2. **Dado** que he encontrado las 3 diferencias sin ningún fallo, **cuando** veo la felicitación, **entonces** el número de toques es 3.
3. **Dado** que he fallado 2 toques y he encontrado las 3 diferencias, **cuando** veo la felicitación, **entonces** el número de toques es 5.
4. **Dado** que estoy en la felicitación, **cuando** pulso "Jugar otra vez", **entonces** empieza una partida nueva con los dibujos sin ningún círculo, el aviso de que faltan 3 diferencias y el recuento de toques a cero.
5. **Dado** que estoy en la felicitación, **cuando** pulso "Volver al inicio", **entonces** vuelvo a la pantalla de inicio de la app.

---

### Historia 3 - Ver cuántas diferencias me faltan (Prioridad: P2)

Durante la partida, la persona ve siempre cuántas diferencias le faltan por encontrar, para saber cuánto le queda.

**Por qué esta prioridad**: ayuda a orientarse, pero la actividad se puede jugar sin ella.

**Prueba independiente**: se puede probar entrando en la actividad y comprobando que el aviso cambia cada vez que se encuentra una diferencia.

**Escenarios de aceptación**:

1. **Dado** que acabo de empezar una partida, **cuando** miro la pantalla, **entonces** veo que me faltan 3 diferencias.
2. **Dado** que me faltan 3 diferencias, **cuando** encuentro una, **entonces** el aviso pasa a decir que me faltan 2.
3. **Dado** que toco fuera de las diferencias, **cuando** miro el aviso, **entonces** sigue igual.

---

### Casos límite

- Tocar una diferencia ya marcada no hace nada: no sale ningún mensaje, no cambia el aviso de las que faltan y no cuenta como toque.
- Tocar fuera de las zonas de diferencia nunca penaliza: solo muestra un mensaje amable y suma un toque al recuento que se enseña al final, sin quitar nada ni bloquear el juego.
- Solo el segundo dibujo (el de abajo) responde a los toques. Tocar el primero no hace nada.
- Una diferencia se acierta tocando en cualquier punto de su zona; no hace falta tocar un punto exacto. Las zonas son lo bastante grandes para un dedo.
- No hay límite de tiempo en ninguna pantalla: la persona puede dejar la actividad parada el tiempo que quiera.
- La persona sale con "Volver al inicio" en mitad de una partida: la partida se abandona y no se guarda nada.
- El mensaje amable de fallo no tapa los dibujos de forma que impida seguir tocando.

## Requisitos *(obligatorio)*

### Requisitos funcionales

- **RF-001**: La actividad MUST mostrar dos dibujos grandes, uno encima del otro, casi iguales, que se diferencian exactamente en 3 puntos.
- **RF-002**: La persona MUST poder tocar el segundo dibujo (el de abajo) para señalar dónde cree ver una diferencia. El primer dibujo MUST NOT responder a toques.
- **RF-003**: Si el toque cae en una diferencia aún no marcada, la actividad MUST marcarla con un círculo en el primer dibujo y en el segundo, y MUST reducir en uno el número de diferencias que faltan.
- **RF-004**: Si el toque cae fuera de las diferencias, la actividad MUST mostrar un mensaje amable y MUST NOT cambiar nada más: no se marca nada, no se quita nada, no hay penalización de ningún tipo. Ese toque se cuenta solo para el número de toques que se enseña al final.
- **RF-005**: Tocar una diferencia ya marcada MUST NOT tener ningún efecto: ni mensaje, ni cambio en el aviso de las que faltan, ni toque contado.
- **RF-006**: Los círculos de las diferencias encontradas MUST seguir visibles hasta el final de la partida y MUST distinguirse sin depender solo del color (por ejemplo, con un círculo grueso que se ve aunque no se distingan los colores).
- **RF-007**: Al marcar la tercera diferencia, la actividad MUST mostrar un mensaje de felicitación que indique cuántos toques ha necesitado la persona, y los botones "Jugar otra vez" y "Volver al inicio".
- **RF-008**: El número de toques MUST ser la suma de los toques en el segundo dibujo que han acertado una diferencia nueva y los que han caído fuera de las diferencias. Los toques sobre diferencias ya marcadas y sobre el primer dibujo MUST NOT contarse.
- **RF-009**: "Jugar otra vez" MUST empezar una partida nueva con los dibujos sin círculos, 3 diferencias por encontrar, el recuento de toques a cero y sin mensajes de la partida anterior.
- **RF-010**: La actividad MUST mostrar en todo momento cuántas diferencias faltan por encontrar (por ejemplo, "Te faltan 2 diferencias"), con la forma singular cuando falta una.
- **RF-011**: La actividad MUST NOT tener límite de tiempo, cuenta atrás ni penalización por tardar.
- **RF-012**: Los dibujos MUST estar incluidos dentro de la app (sin descargar de internet), tener una licencia que permita usarlos, ser sencillos, grandes y de alto contraste, y representar objetos o escenas cotidianas que una persona mayor reconozca. Las 3 diferencias MUST ser claras, ni diminutas ni ambiguas.
- **RF-013**: La actividad MUST cumplir las reglas de accesibilidad del proyecto: letra de al menos 22 puntos, botones de al menos 64 puntos de alto y contraste de al menos 7 a 1. Los dos dibujos MUST caber en pantalla a la vez, sin tener que desplazarse, en un móvil pequeño.
- **RF-014**: Cada botón de acción ("Jugar otra vez" y "Volver al inicio" de la pantalla final) y cada mensaje importante (fallo, felicitación) MUST llevar un icono grande e intuitivo junto al texto, nunca en lugar de él, incluido dentro de la app.
- **RF-015**: Todos los textos de la actividad MUST estar en español de España, con tildes y signos de apertura, y guardarse junto al resto de textos fijos de la app.
- **RF-016**: La actividad MUST integrarse en la pantalla de inicio como una actividad más, con su identificador, icono, nombre y descripción, y MUST avisar de cuándo empieza y termina una partida según el contrato de actividades de la app.
- **RF-017**: La actividad MUST funcionar completa sin internet, sin cuentas y sin guardar ningún dato de la persona.
- **RF-018**: La actividad MUST tener pruebas básicas y funcionales de: acierto de una diferencia (marcada en ambos dibujos), toque fuera sin penalización, toque sobre una diferencia ya marcada sin efecto, aviso de diferencias que faltan, recuento de toques y final de partida con "Jugar otra vez".

### Fuera de alcance

Zoom, pistas, niveles de dificultad y ranking o clasificación. No se construyen en esta funcionalidad.

### Entidades clave

- **Diferencia**: una zona del dibujo en la que los dos dibujos no coinciden; puede estar sin encontrar o marcada.
- **Partida**: una sesión de juego con las 3 diferencias, cuáles se han encontrado y el número de toques hasta el momento.

## Criterios de éxito *(obligatorio)*

### Resultados medibles

- **CE-001**: Una persona que usa la app por primera vez entiende qué hacer y toca su primera diferencia sin ayuda, en menos de 1 minuto desde que entra en la actividad.
- **CE-002**: Al tocar cada una de las 3 diferencias, el círculo aparece en los dos dibujos en el 100 % de los casos.
- **CE-003**: Tocar 10 veces fuera de las diferencias no marca nada, no cambia el aviso de las que faltan y no impide encontrar después las 3 diferencias.
- **CE-004**: Tocar una diferencia ya marcada, las veces que se quiera, no cambia el aviso de las que faltan ni el número de toques de la felicitación.
- **CE-005**: En una partida completa, el número de toques de la felicitación coincide siempre con los toques que la persona ha hecho en el segundo dibujo sobre diferencias nuevas o sobre zonas sin diferencia.
- **CE-006**: El aviso de diferencias que faltan es correcto en todo momento: empieza en 3 y baja de uno en uno hasta que aparece la felicitación.
- **CE-007**: La persona puede dejar la actividad parada el tiempo que quiera en cualquier pantalla sin que cambie nada ni se pierda la partida.
- **CE-008**: Una persona mayor sin conocimientos técnicos puede comprobar usando solo la app, y sin leer código, que cada una de las historias de usuario se cumple.
- **CE-009**: Todas las pruebas de la actividad pasan.

## Suposiciones

- La actividad se añade a la lista real de actividades junto a "Parejas", "Forma la palabra", "Sopa de letras" y "Adivinanzas", y sigue el contrato de actividades de la funcionalidad 001.
- Hay un único par de dibujos preparado de antemano, con exactamente 3 diferencias fijas. "Jugar otra vez" repite el mismo par: no hay niveles ni variedad de dibujos en esta versión.
- Los dibujos se construyen con elementos propios incluidos en la app (formas e iconos con licencia libre), de modo que sean casi iguales con diferencias claras (por ejemplo, un objeto que falta, que cambia o que aparece de más).
- "Toques necesitados" es el recuento de toques útiles en el segundo dibujo (aciertos y fallos). No es una nota ni una penalización: es solo información para la persona, sin comparar con otras partidas.
- Un toque acierta si cae dentro de la zona de la diferencia, que es algo más grande que el objeto cambiado para facilitarlo a quien tiene poca precisión.
- El mensaje amable de fallo es siempre el mismo y no hace falta variarlo.
- El botón "Volver al inicio" durante la partida lo pone el marco común de la app, como en el resto de actividades. La felicitación añade además su propio "Volver al inicio", como pide la descripción.
- No se guarda nada entre partidas: ni toques, ni mejores resultados, ni progreso.
