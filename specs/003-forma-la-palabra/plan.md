# Plan de implementación: Actividad "Forma la palabra"

**Rama**: `003-forma-la-palabra` | **Fecha**: 2026-11-06 | **Spec**: [spec.md](spec.md)

**Entrada**: Especificación de la funcionalidad en `specs/003-forma-la-palabra/spec.md`

## Resumen

Se añade la segunda actividad real de la app: una partida de 5 palabras cotidianas cuyas letras
salen desordenadas y la persona va colocando en casillas hasta formarlas. Hay comprobar, borrar
la última letra, empezar de nuevo, ver la respuesta y un resultado final "X de 5". Igual que en
"Parejas", las reglas viven en funciones puras y pequeñas (fáciles de probar) y la pantalla solo
las pinta. La lista de al menos 100 palabras es un archivo de código dentro de la app, y una prueba
automática comprueba que todas cumplen la spec (longitud, sin tildes, sin anagramas entre
ellas). No se añade ninguna librería (ver [research.md](research.md)). La actividad cumple el
contrato de la funcionalidad 001 y se añade a `registro.ts`.

## Contexto técnico

**Lenguaje/Versión**: TypeScript (sobre React Native), igual que las funcionalidades 001 y 002

**Dependencias principales**: Ninguna nueva. Se usan Expo, React Native y los iconos de
`@expo/vector-icons` que ya están en el proyecto, y los componentes `BotonGrande` e `Icono`.

**Almacenamiento**: N/A. No se guarda nada (RF-019); cada vez que se abre empieza de cero.

**Pruebas**: Jest con React Native Testing Library (ya instalados)

**Plataforma de destino**: Móvil (Android e iOS, desde un único código)

**Tipo de proyecto**: Aplicación móvil

**Objetivos de rendimiento**: Sin objetivos propios. Colocar una letra se ve al instante.

**Restricciones**: Funciona sin internet. Letra de al menos 22 puntos, botones de al menos 64
puntos de alto, contraste de al menos 7 a 1, sin límites de tiempo ni de intentos (RF-014,
RF-015). Textos en español de España en `src/textos.ts`. Palabras de 4 a 7 letras: la fila de
casillas y las letras deben caber sin letra pequeña, pasando a una segunda fila si hace falta.

**Escala/Alcance**: 2 pantallas dentro de la actividad (la palabra y el resultado final), 5
palabras por partida y una lista de al menos 100 palabras.

## Comprobación de la constitución

*Puerta: debe pasar antes de la investigación. Se vuelve a comprobar tras el diseño.*

| Principio | Cumple | Cómo |
|-----------|--------|------|
| I. Simplicidad | Sí | Reglas en pocas funciones puras; estado con `useState`; sin librerías nuevas, sin animaciones, sin gestor de estado. Se reutilizan `BotonGrande` e `Icono`. |
| II. Español de España | Sí | Textos nuevos en `src/textos.ts`; las pruebas comprueban los textos clave. |
| III. Cero alcance fantasma | Sí | Solo lo escrito en la spec. Nada de pistas, niveles, ranking, guardado, sonidos ni contador de intentos. |
| IV. Verificable por persona no técnica | Sí | [quickstart.md](quickstart.md) describe comprobaciones usando solo la app. |
| V. Todo en el teléfono | Sí | Sin red; la lista de palabras y los iconos van incluidos en la app. |
| VI. Datos con respeto | Sí | No se pide ni se guarda ningún dato; no hay claves. |
| VII. Pensada para mayores | Sí | Tamaños y colores salen de `src/tema.ts`; sin temporizadores ni límite de intentos. |
| VIII. Pruebas básicas | Sí | Pruebas de reglas (colocar, borrar, reiniciar), correcta, incorrecta, incompleta, ver respuesta, puntuación y final; más una prueba de la lista de palabras. |
| IX. Imágenes e iconos intuitivos | Sí | Cada botón y cada mensaje (acierto, fallo, incompleta, respuesta, final) lleva icono grande junto al texto. Iconos con licencia libre incluidos en la app. |

**Resultado** (constitución v1.1.0, 9 principios): Sin infracciones. No hace falta la tabla de
complejidad. Se mantiene tras el diseño.

## Estructura del proyecto

### Documentación (esta funcionalidad)

```text
specs/003-forma-la-palabra/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── forma-palabra.md
├── checklists/
│   └── requirements.md
└── tasks.md          # Lo crea /speckit-tasks, no este comando
```

### Código fuente (raíz del repositorio)

```text
src/
├── actividades/
│   ├── registro.ts            # Se añade "Forma la palabra" junto a "Parejas"
│   └── forma-palabra/
│       ├── palabras.ts        # Lista de al menos 100 palabras cotidianas
│       ├── juego.ts           # Reglas: crearPartida, colocarLetra, borrarUltima, empezarDeNuevo,
│       │                      #   comprobar, verRespuesta, siguiente (funciones puras)
│       ├── FormaPalabra.tsx   # Contenido de la actividad: elige entre palabra y resultado
│       ├── Palabra.tsx        # Pantalla de una palabra: casillas, letras, botones y mensajes
│       └── Resultado.tsx      # Resultado "X de 5" y botón "Jugar otra vez"
└── textos.ts                  # Se añaden los textos de la actividad

tests/
├── forma-palabra-palabras.test.tsx # Comprobación de la lista de palabras
├── forma-palabra-juego.test.tsx    # Reglas, puntuación y final de partida
└── forma-palabra-pantalla.test.tsx # Partida completa usando la pantalla
```

**Decisión de estructura**: Proyecto único de app móvil, sin backend. La actividad vive en su
propia carpeta dentro de `src/actividades/`, como pide el contrato
[actividad.md](../001-pantalla-inicio/contracts/actividad.md) y como hace "Parejas". Las reglas
van separadas de las pantallas solo para poder probarlas sin pintar nada; no hay más capas. Las
pruebas usan extensión `.test.tsx` porque así está configurado Jest.

## Seguimiento de complejidad

Sin infracciones que justificar.
