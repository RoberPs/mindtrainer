# Plan de implementación: Actividad "Adivinanzas"

**Rama**: `005-adivinanzas` | **Fecha**: 2026-11-06 | **Spec**: [spec.md](spec.md)

**Entrada**: Especificación de la funcionalidad en `specs/005-adivinanzas/spec.md`

## Resumen

Se añade la cuarta actividad real de la app: se lee una adivinanza tradicional y se toca una de
tres respuestas, con un solo intento. Una partida son 5 adivinanzas distintas sacadas de un banco
fijo de al menos 10, y al final se ve "X de 5". Igual que en "Forma la palabra" (la actividad
más parecida: una pregunta tras otra y un resultado final), las reglas viven en funciones puras y
pequeñas, fáciles de probar, y la pantalla solo las pinta. El orden de las tres respuestas se
sortea al preparar la partida. Las adivinanzas son datos fijos dentro de la app y una prueba
automática comprueba que todas cumplen la spec (tres respuestas distintas, una correcta, el texto
no contiene la respuesta). No se añade ninguna librería (ver [research.md](research.md)). La
actividad cumple el contrato de la funcionalidad 001 y se añade a `registro.ts`.

## Contexto técnico

**Lenguaje/Versión**: TypeScript (sobre React Native), igual que las funcionalidades 001 a 004

**Dependencias principales**: Ninguna nueva. Se usan Expo, React Native y los iconos de
`@expo/vector-icons` que ya están en el proyecto, y los componentes `BotonGrande` e `Icono`.

**Almacenamiento**: N/A. No se guarda nada (RF-018); cada vez que se abre empieza de cero.

**Pruebas**: Jest con React Native Testing Library (ya instalados)

**Plataforma de destino**: Móvil (Android e iOS, desde un único código)

**Tipo de proyecto**: Aplicación móvil

**Objetivos de rendimiento**: Sin objetivos propios. Responder y pasar a la siguiente se ve al
instante.

**Restricciones**: Funciona sin internet. Letra de al menos 22 puntos, botones de al menos 64
puntos de alto, contraste de al menos 7 a 1, sin límites de tiempo (RF-013, RF-014). Textos en
español de España en `src/textos.ts`. Una adivinanza de cuatro líneas más tres botones y el
botón "Siguiente" no caben siempre sin desplazar: la pantalla tiene desplazamiento.

**Escala/Alcance**: 2 pantallas dentro de la actividad (la adivinanza y el resultado), 5
adivinanzas por partida y un banco de al menos 10.

## Comprobación de la constitución

*Puerta: debe pasar antes de la investigación. Se vuelve a comprobar tras el diseño.*

| Principio | Cumple | Cómo |
|-----------|--------|------|
| I. Simplicidad | Sí | Reglas en pocas funciones puras; estado con `useState`; sin librerías nuevas, sin animaciones, sin gestor de estado. Las adivinanzas son datos escritos a mano. Se reutilizan `BotonGrande` e `Icono`. Solo se crea un componente nuevo (`Respuesta`) porque ningún botón existente tiene estado de acierto o fallo. |
| II. Español de España | Sí | Textos nuevos en `src/textos.ts`, incluidas las adivinanzas; las pruebas comprueban los textos clave. |
| III. Cero alcance fantasma | Sí | Solo lo escrito en la spec. Nada de escribir la respuesta, voz, pistas, ranking, guardado, niveles ni categorías. |
| IV. Verificable por persona no técnica | Sí | [quickstart.md](quickstart.md) describe comprobaciones usando solo la app. |
| V. Todo en el teléfono | Sí | Sin red; las adivinanzas y los iconos van incluidos en la app. |
| VI. Datos con respeto | Sí | No se pide ni se guarda ningún dato; no hay claves. |
| VII. Pensada para mayores | Sí | Tamaños y colores salen de `src/tema.ts`; sin temporizadores. Acierto y fallo se distinguen por icono y texto, no solo por color. |
| VIII. Pruebas básicas | Sí | Pruebas de reglas (acierto, fallo, un solo intento, puntuación, sin repetir, orden sorteado, final) y de pantalla; más una prueba del banco de adivinanzas. |
| IX. Imágenes e iconos intuitivos | Sí | Cada botón (respuestas, "Siguiente", "Ver resultado", "Jugar otra vez"), cada mensaje (acierto, fallo, resultado) y cada respuesta tras responder llevan icono grande junto al texto. Iconos con licencia libre incluidos en la app. |

**Resultado** (constitución v1.1.0, 9 principios): Sin infracciones. No hace falta la tabla de
complejidad. Se mantiene tras el diseño.

## Estructura del proyecto

### Documentación (esta funcionalidad)

```text
specs/005-adivinanzas/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── adivinanzas.md
├── checklists/
│   └── requirements.md
└── tasks.md          # Lo crea /speckit-tasks, no este comando
```

### Código fuente (raíz del repositorio)

```text
src/
├── actividades/
│   ├── registro.ts                 # Se añade "Adivinanzas" tras "Sopa de letras"
│   └── adivinanzas/
│       ├── banco.ts                # Banco de al menos 10: id, texto, correcta y 2 incorrectas
│       ├── juego.ts                # Reglas: crearPartida, responder, siguiente, esUltima
│       │                           #   (funciones puras)
│       ├── Adivinanzas.tsx         # Contenido de la actividad: elige entre adivinanza y resultado
│       ├── Adivinanza.tsx          # Pantalla de un turno: texto, tres respuestas, mensaje, botón
│       ├── Respuesta.tsx           # Botón de una respuesta, con su estado tras responder
│       └── Resultado.tsx           # "X de 5", mensaje según puntuación y "Jugar otra vez"
└── textos.ts                       # Se añaden los textos de la actividad

tests/
├── adivinanzas-banco.test.tsx      # Comprobación del banco de adivinanzas
├── adivinanzas-juego.test.tsx      # Reglas, puntuación y final de partida
└── adivinanzas-pantalla.test.tsx   # Partida completa usando la pantalla
```

También se actualizan, al implementar, la sección "Estructura" y la nota "Las actividades reales
por ahora son…" de `CLAUDE.md`.

**Decisión de estructura**: Proyecto único de app móvil, sin backend. La actividad vive en su
propia carpeta dentro de `src/actividades/`, como pide el contrato
[actividad.md](../001-pantalla-inicio/contracts/actividad.md) y como hacen las otras tres. Las
reglas van separadas de las pantallas solo para poder probarlas sin pintar nada; no hay más
capas. Las pruebas usan extensión `.test.tsx` porque así está configurado Jest.

## Seguimiento de complejidad

Sin infracciones que justificar.
