# Guía de comprobación: Actividad "Forma la palabra"

Sirve para demostrar que la funcionalidad cumple la spec. Tiene dos partes: una para una
persona no técnica y mayor, usando solo la app, y otra automática.

## Parte 1. Comprobación con la app (persona no técnica)

**Antes de empezar**: la app instalada en el móvil. "Forma la palabra" ya aparece en la lista
de inicio junto a "Parejas".

| # | Qué hacer | Qué debe verse | Criterio |
|---|-----------|----------------|----------|
| 1 | Abrir la app | En la lista aparece "Forma la palabra" con su icono y una línea de descripción. | RF-018 |
| 2 | Tocar "Forma la palabra" | Aparecen unas casillas vacías, las letras desordenadas en botones grandes y cuatro botones: Comprobar, Borrar última letra, Empezar de nuevo y Ver la respuesta, todos con icono. | RF-001, RF-015, RF-016, CE-001 |
| 3 | Tocar una letra | La letra pasa a la primera casilla y desaparece de las desordenadas. | RF-002 |
| 4 | Tocar "Comprobar" con la palabra a medias | Un mensaje pide completar la palabra. Las letras siguen donde estaban. | RF-005 |
| 5 | Colocar todas las letras mal y tocar "Comprobar" | Un mensaje amable de que no es esa. Las letras siguen colocadas y se puede seguir. | RF-004, CE-004 |
| 6 | Tocar "Borrar última letra" | La última letra vuelve a las desordenadas; las demás se quedan. | RF-006 |
| 7 | Tocar "Empezar de nuevo" | Todas las letras vuelven a las desordenadas y las casillas quedan vacías. | RF-006 |
| 8 | Esperar un minuto sin tocar nada | No cambia nada ni sale ningún aviso de tiempo. | RF-014, CE-005 |
| 9 | Formar la palabra bien y tocar "Comprobar" | Mensaje positivo con icono y botón "Siguiente". Desaparecen las letras y los otros botones. | RF-003 |
| 10 | Tocar "Siguiente" | Aparecen las letras desordenadas de otra palabra y las casillas vacías. | RF-008, CE-003 |
| 11 | Fallar la palabra una vez y luego acertarla | Se muestra el acierto igual que antes. | RF-011 |
| 12 | En otra palabra, tocar "Ver la respuesta" | Se muestra la palabra correcta con un icono y aparece "Siguiente". | RF-007 |
| 13 | Llegar a la palabra 5 y resolverla | El botón se llama "Ver resultado", no "Siguiente". | RF-003, RF-012 |
| 14 | Tocar "Ver resultado" | "Has acertado X de 5", donde X es el número de palabras que formaste tú (sin contar las de "Ver la respuesta"), y el botón "Jugar otra vez". El "Volver al inicio" también está a la vista. | RF-012, CE-002 |
| 15 | Tocar "Jugar otra vez" | Empieza una partida nueva con palabras distintas a las de antes. | RF-013, CE-003 |
| 16 | Jugar 10 partidas seguidas | Dentro de cada partida no se repite ninguna palabra, y las partidas no son iguales entre sí. | RF-009, CE-003 |
| 17 | Si en alguna partida sale una palabra con letras repetidas (como "casa" o "pelota") | Se puede formar tocando cualquiera de las letras repetidas. Si no sale ninguna, este paso lo cubre la prueba automática. | RF-001, RF-002 |
| 18 | En una partida a medias, tocar "Volver al inicio" | Sale el aviso de salida del marco; al aceptar vuelve a la lista. Al entrar otra vez empieza una partida nueva. | RF-018, RF-019 |
| 19 | Tras resolver la palabra 5, tocar "Volver al inicio" sin pulsar "Ver resultado" | Sale a la lista sin preguntar nada. | RF-018 |
| 20 | Mirar todas las pantallas | Todo en español de España, con letra grande, buen contraste y cada botón con icono y texto. No hay cuentas atrás ni prisas. | RF-014, RF-015, RF-016, RF-017 |
| 21 | Poner el móvil en modo avión y jugar una partida | Funciona igual. | RF-019 |

La funcionalidad está lista cuando los 21 pasos salen como se describe.

## Parte 2. Comprobación automática

```bash
npm test           # todas las pruebas, incluidas las de Forma la palabra
npm run typecheck  # comprobar tipos
```

Las pruebas de esta funcionalidad (`tests/forma-palabra-*.test.tsx`) comprueban:

- La lista: 100 palabras o más, de 4 a 7 letras, sin tildes, sin repetidas y sin dos con las
  mismas letras.
- La partida: 5 palabras distintas y letras que no salen en el orden correcto.
- Colocar, borrar la última y empezar de nuevo.
- Las letras repetidas: cualquiera de ellas sirve, en cualquier orden.
- Palabra correcta, incorrecta e incompleta con "Comprobar".
- Ver la respuesta: muestra la palabra y no suma.
- Fallar y luego acertar sí suma.
- La puntuación y el final: tras la quinta palabra aparece "X de 5" y "Jugar otra vez" empieza
  de cero.
- La actividad avisa de que empieza una partida y de que termina al cerrar la quinta palabra.

Los pasos 8, 16, 19 y 21 (esperar sin que pase nada, varias partidas seguidas, salida sin
aviso y modo avión) necesitan una persona y un móvil; los hace una persona, no el agente.
