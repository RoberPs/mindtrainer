# Plan de implementación: Actividad "Diferencias"

**Rama**: `006-diferencias` | **Fecha**: 2026-11-06 | **Spec**: [spec.md](spec.md)

**Entrada**: Especificación de la funcionalidad en `specs/006-diferencias/spec.md`

## Resumen

Se añade la quinta actividad real de la app: dos dibujos casi iguales, uno encima del otro, y la
persona toca en el de abajo donde ve una diferencia. Hay 3 diferencias fijas; al acertar se marca
con un círculo en los dos dibujos, al fallar sale un mensaje amable y no pasa nada más, y al
encontrar las 3 se ve la felicitación con los toques necesitados. Siguiendo el patrón de las otras
actividades, las reglas viven en funciones puras y pequeñas (`juego.ts`) y las pantallas solo las
pintan. Los dibujos no son imágenes descargadas: se **dibujan con iconos que ya trae la app**
(`@expo/vector-icons`, licencia libre) colocados en una cuadrícula relativa, de modo que el
dibujo de abajo es el de arriba con tres cambios (uno que falta, uno que cambia y uno que
sobra). Las zonas de acierto son rectángulos en coordenadas relativas (0 a 1), así valen para
cualquier tamaño de pantalla. No se añade ninguna librería (ver [research.md](research.md)). La
actividad cumple el contrato de la funcionalidad 001 y se añade a `registro.ts`.

## Contexto técnico

**Lenguaje/Versión**: TypeScript (sobre React Native), igual que las funcionalidades 001 a 005

**Dependencias principales**: Ninguna nueva. Se usan Expo, React Native, los iconos de
`@expo/vector-icons` que ya están en el proyecto y los componentes `BotonGrande` e `Icono`.

**Almacenamiento**: N/A. No se guarda nada (RF-017); cada vez que se abre empieza de cero.

**Pruebas**: Jest con React Native Testing Library (ya instalados)

**Plataforma de destino**: Móvil (Android e iOS, desde un único código)

**Tipo de proyecto**: Aplicación móvil

**Objetivos de rendimiento**: Sin objetivos propios. El círculo aparece al instante al tocar.

**Restricciones**: Funciona sin internet. Letra de al menos 22 puntos, botones de al menos 64
puntos de alto, contraste de al menos 7 a 1, sin límites de tiempo (RF-011, RF-013). Textos en
español de España en `src/textos.ts`. Los dos dibujos deben caber a la vez en un móvil pequeño
(unos 360 × 640 puntos) sin desplazarse (RF-013): el tamaño de cada dibujo se calcula a partir del
alto disponible. Zonas de toque de al menos unos 44 puntos (ancho y alto) en el dibujo más pequeño.

**Escala/Alcance**: 2 pantallas dentro de la actividad (los dos dibujos y la felicitación), 1
escena fija, 3 diferencias.

## Comprobación de la constitución

*Puerta: debe pasar antes de la investigación. Se vuelve a comprobar tras el diseño.*

| Principio | Cumple | Cómo |
|-----------|--------|------|
| I. Simplicidad | Sí | Reglas en pocas funciones puras (`crearPartida`, `tocar`, `faltan`); estado con `useState`; sin librerías nuevas, sin gestor de gestos, sin imágenes externas, sin animaciones. Una sola escena escrita a mano como lista de iconos. Se reutilizan `BotonGrande` e `Icono`. Se crea un componente de dibujo (`Escena`) porque ningún componente existente dibuja una composición con círculos encima. |
| II. Español de España | Sí | Textos nuevos en `src/textos.ts`; las pruebas comprueban los textos clave. |
| III. Cero alcance fantasma | Sí | Solo lo escrito en la spec. Nada de zoom, pistas, niveles, varias escenas, ranking ni guardado. |
| IV. Verificable por persona no técnica | Sí | [quickstart.md](quickstart.md) describe comprobaciones usando solo la app. |
| V. Todo en el teléfono | Sí | Sin red; los dibujos se pintan con iconos incluidos en la app. |
| VI. Datos con respeto | Sí | No se pide ni se guarda ningún dato; no hay claves. |
| VII. Pensada para mayores | Sí | Tamaños y colores salen de `src/tema.ts` (se añade un color de marca con contraste mayor de 7 a 1); sin temporizadores. El círculo es grueso y se ve sin depender del color. |
| VIII. Pruebas básicas | Sí | Pruebas de reglas (acierto, fallo, repetida, faltan, toques, final), de la escena (exactamente 3 diferencias y zonas bien puestas) y de pantalla (partida completa). |
| IX. Imágenes e iconos intuitivos | Sí | Los dibujos son iconos grandes y reconocibles; "Jugar otra vez", "Volver al inicio", el aviso de fallo y la felicitación llevan icono grande junto al texto. Iconos con licencia libre incluidos en la app. |

**Resultado** (constitución v1.1.0, 9 principios): Sin infracciones. No hace falta la tabla de
complejidad. Se mantiene tras el diseño.

## Estructura del proyecto

### Documentación (esta funcionalidad)

```text
specs/006-diferencias/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── diferencias.md
├── checklists/
│   └── requirements.md
└── tasks.md          # Lo crea /speckit-tasks, no este comando
```

### Código fuente (raíz del repositorio)

```text
src/
├── actividades/
│   ├── registro.ts                 # Se añade "Diferencias" tras "Adivinanzas"
│   └── diferencias/
│       ├── escena.ts               # Los dos dibujos (lista de iconos) y las 3 zonas de diferencia
│       ├── juego.ts                # Reglas: crearPartida, tocar, faltan (funciones puras)
│       ├── Diferencias.tsx         # Contenido de la actividad: elige entre dibujos y felicitación
│       ├── Dibujo.tsx              # Pinta un dibujo con sus círculos y, el de abajo, recibe toques
│       └── Felicitacion.tsx        # Mensaje, toques necesitados y botón "Jugar otra vez"
├── textos.ts                       # Se añaden los textos de la actividad
└── tema.ts                         # Se añade el color de marca de los círculos

tests/
├── diferencias-escena.test.tsx     # Comprobación de la escena: 3 diferencias y zonas correctas
├── diferencias-juego.test.tsx      # Reglas, toques y final de partida
└── diferencias-pantalla.test.tsx   # Partida completa usando la pantalla
```

También se actualizan, al implementar, la sección "Estructura" y la nota "Las actividades reales
por ahora son…" de `CLAUDE.md`.

**Decisión de estructura**: Proyecto único de app móvil, sin backend. La actividad vive en su
propia carpeta dentro de `src/actividades/`, como pide el contrato
[actividad.md](../001-pantalla-inicio/contracts/actividad.md) y como hacen las otras cuatro. Las
reglas van separadas de las pantallas solo para poder probarlas sin pintar nada; no hay más
capas. Las pruebas usan extensión `.test.tsx` porque así está configurado Jest.

## Seguimiento de complejidad

Sin infracciones que justificar.
