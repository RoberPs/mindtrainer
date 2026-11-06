# Plan de implementación: Actividad "Sopa de letras"

**Rama**: `004-sopa-de-letras` | **Fecha**: 2026-11-06 | **Spec**: [spec.md](spec.md)

**Entrada**: Especificación de la funcionalidad en `specs/004-sopa-de-letras/spec.md`

## Resumen

Se añade la tercera actividad real de la app: una cuadrícula de 5 filas por 6 columnas con 3
palabras escondidas relacionadas con una palabra de referencia. La persona marca cada palabra
tocando su primera y su última letra; la app dice si es una de las buscadas, cuenta los
intentos y, al encontrar las 3, felicita. Igual que en "Parejas" y "Forma la palabra", las reglas
viven en funciones puras y pequeñas (fáciles de probar) y la pantalla solo las pinta. Las sopas
son datos fijos dentro de la app (al menos 5, cada una con su cuadrícula ya escrita) y una
prueba automática comprueba que todas cumplen la spec (tamaño, letras, cada palabra una sola
vez, solo en horizontal o vertical). No se añade ninguna librería (ver [research.md](research.md)).
La actividad cumple el contrato de la funcionalidad 001 y se añade a `registro.ts`.

## Contexto técnico

**Lenguaje/Versión**: TypeScript (sobre React Native), igual que las funcionalidades 001, 002 y 003

**Dependencias principales**: Ninguna nueva. Se usan Expo, React Native y los iconos de
`@expo/vector-icons` que ya están en el proyecto, y los componentes `BotonGrande` e `Icono`.

**Almacenamiento**: N/A. No se guarda nada (RF-020); cada vez que se abre empieza de cero.

**Pruebas**: Jest con React Native Testing Library (ya instalados)

**Plataforma de destino**: Móvil (Android e iOS, desde un único código)

**Tipo de proyecto**: Aplicación móvil

**Objetivos de rendimiento**: Sin objetivos propios. Marcar una letra se ve al instante.

**Restricciones**: Funciona sin internet. Letra de al menos 22 puntos, botones de al menos 64
puntos de alto, contraste de al menos 7 a 1, sin límites de tiempo ni de intentos (RF-015,
RF-016). Textos en español de España en `src/textos.ts`. Seis columnas deben caber en el ancho de
un móvil pequeño sin bajar de la letra mínima: las casillas tienen 64 de alto y el ancho se
reparte entre las seis.

**Escala/Alcance**: 2 pantallas dentro de la actividad (la sopa y la felicitación final), una
cuadrícula de 30 casillas por partida y una lista de al menos 5 sopas.

## Comprobación de la constitución

*Puerta: debe pasar antes de la investigación. Se vuelve a comprobar tras el diseño.*

| Principio | Cumple | Cómo |
|-----------|--------|------|
| I. Simplicidad | Sí | Reglas en pocas funciones puras; estado con `useState`; sin librerías nuevas, sin animaciones, sin gestor de estado. Las sopas son datos escritos a mano, no se generan. Se reutilizan `BotonGrande` e `Icono`. |
| II. Español de España | Sí | Textos nuevos en `src/textos.ts`; las pruebas comprueban los textos clave. |
| III. Cero alcance fantasma | Sí | Solo lo escrito en la spec. Nada de pistas, niveles, ranking, guardado, sonidos, diagonales ni generador de sopas. |
| IV. Verificable por persona no técnica | Sí | [quickstart.md](quickstart.md) describe comprobaciones usando solo la app. |
| V. Todo en el teléfono | Sí | Sin red; las sopas y los iconos van incluidos en la app. |
| VI. Datos con respeto | Sí | No se pide ni se guarda ningún dato; no hay claves. |
| VII. Pensada para mayores | Sí | Tamaños y colores salen de `src/tema.ts`; sin temporizadores ni límite de intentos. |
| VIII. Pruebas básicas | Sí | Pruebas de reglas (línea recta, palabra encontrada, fallo, ya encontrada, intentos, faltan) y de final de partida; más una prueba de la lista de sopas. |
| IX. Imágenes e iconos intuitivos | Sí | Cada botón, cada mensaje (invitación, acierto, fallo, línea no recta, felicitación) y cada fila de la lista lleva icono grande junto al texto. Iconos con licencia libre incluidos en la app. |

**Resultado** (constitución v1.1.0, 9 principios): Sin infracciones. No hace falta la tabla de
complejidad. Se mantiene tras el diseño.

## Estructura del proyecto

### Documentación (esta funcionalidad)

```text
specs/004-sopa-de-letras/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── sopa-de-letras.md
├── checklists/
│   └── requirements.md
└── tasks.md          # Lo crea /speckit-tasks, no este comando
```

### Código fuente (raíz del repositorio)

```text
src/
├── actividades/
│   ├── registro.ts              # Se añade "Sopa de letras" tras "Forma la palabra"
│   └── sopa-de-letras/
│       ├── sopas.ts             # Lista de al menos 5 sopas: referencia, 3 palabras y cuadrícula
│       ├── juego.ts             # Reglas: crearPartida, tocarCasilla, faltan, haTerminado
│       │                        #   (funciones puras)
│       ├── SopaDeLetras.tsx     # Contenido de la actividad: elige entre sopa y felicitación
│       ├── Cuadricula.tsx       # Las 30 casillas, con la marca y las palabras encontradas
│       ├── ListaPalabras.tsx    # Las 3 palabras (ocultas o tachadas) y "Te faltan N palabras"
│       └── Felicitacion.tsx     # Mensaje final con los intentos y "Jugar otra vez"
└── textos.ts                    # Se añaden los textos de la actividad

tests/
├── sopa-sopas.test.tsx          # Comprobación de la lista de sopas
├── sopa-juego.test.tsx          # Reglas, intentos y final de partida
└── sopa-pantalla.test.tsx       # Partida completa usando la pantalla
```

También se actualizan, al implementar, la sección "Estructura" y la nota "Las actividades reales
por ahora son…" de `CLAUDE.md`.

**Decisión de estructura**: Proyecto único de app móvil, sin backend. La actividad vive en su
propia carpeta dentro de `src/actividades/`, como pide el contrato
[actividad.md](../001-pantalla-inicio/contracts/actividad.md) y como hacen "Parejas" y "Forma la
palabra". Las reglas van separadas de las pantallas solo para poder probarlas sin pintar nada; no
hay más capas. Las pruebas usan extensión `.test.tsx` porque así está configurado Jest.

## Seguimiento de complejidad

Sin infracciones que justificar.
