# Plan de implementación: Actividad "Parejas"

**Rama**: `002-parejas-memoria` | **Fecha**: 2026-11-06 | **Spec**: [spec.md](spec.md)

**Entrada**: Especificación de la funcionalidad en `specs/002-parejas-memoria/spec.md`

## Resumen

Se añade la primera actividad real de la app: un juego de memoria de emparejar cartas. La
persona elige tamaño (6, 8 o 12 cartas), gira cartas de dos en dos y ve cuántos intentos ha
necesitado al terminar. Las reglas viven en funciones puras y pequeñas (fáciles de probar) y la
pantalla solo las pinta. Los dibujos son iconos que ya trae Expo, sin añadir librerías ni
descargar nada (ver [research.md](research.md)). La actividad cumple el contrato de la
funcionalidad 001 y se añade a `registro.ts`.

## Contexto técnico

**Lenguaje/Versión**: TypeScript (sobre React Native), igual que la funcionalidad 001

**Dependencias principales**: Ninguna nueva. Se usan Expo, React Native y los iconos de
`@expo/vector-icons` que ya están en el proyecto.

**Almacenamiento**: N/A. No se guarda nada (RF-015); cada vez que se abre empieza de cero.

**Pruebas**: Jest con React Native Testing Library (ya instalados)

**Plataforma de destino**: Móvil (Android e iOS, desde un único código)

**Tipo de proyecto**: Aplicación móvil

**Objetivos de rendimiento**: Sin objetivos propios. Girar una carta se ve al instante.

**Restricciones**: Funciona sin internet. Letra de al menos 22 puntos, botones de al menos 64
puntos de alto, contraste de al menos 7 a 1, sin límites de tiempo (RF-013, RF-014). Las cartas
no se tapan solas nunca. Textos en español de España en `src/textos.ts`.

**Escala/Alcance**: 3 pantallas dentro de la actividad (elegir tamaño, tablero, felicitación)
y 8 dibujos disponibles. Tableros de 6, 8 y 12 cartas.

## Comprobación de la constitución

*Puerta: debe pasar antes de la investigación. Se vuelve a comprobar tras el diseño.*

| Principio | Cumple | Cómo |
|-----------|--------|------|
| I. Simplicidad | Sí | Reglas en tres funciones puras; estado con `useState`; sin librerías nuevas, sin animaciones, sin gestor de estado. |
| II. Español de España | Sí | Textos nuevos en `src/textos.ts`; las pruebas comprueban los textos clave. |
| III. Cero alcance fantasma | Sí | Solo lo escrito en la spec. Nada de marcas, ranking, sonidos, dos jugadores ni guardado. |
| IV. Verificable por persona no técnica | Sí | [quickstart.md](quickstart.md) describe comprobaciones usando solo la app. |
| V. Todo en el teléfono | Sí | Sin red; los dibujos son iconos incluidos en la app. |
| VI. Datos con respeto | Sí | No se pide ni se guarda ningún dato; no hay claves. |
| VII. Pensada para mayores | Sí | Tamaños y colores salen de `src/tema.ts`; las cartas no se tapan solas; sin temporizadores. |
| VIII. Pruebas básicas | Sí | Pruebas de reglas, pareja correcta e incorrecta, intentos y final, para los tres tamaños. |
| IX. Imágenes e iconos intuitivos | Sí | Cada carta lleva dibujo grande y nombre escrito; los botones llevan icono y texto. Iconos con licencia libre incluidos en la app. |

**Resultado** (constitución v1.1.0, 9 principios): Sin infracciones. No hace falta la tabla de
complejidad. Se mantiene tras el diseño.

## Estructura del proyecto

### Documentación (esta funcionalidad)

```text
specs/002-parejas-memoria/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── parejas.md
├── checklists/
│   └── requirements.md
└── tasks.md          # Lo crea /speckit-tasks, no este comando
```

### Código fuente (raíz del repositorio)

```text
src/
├── actividades/
│   ├── registro.ts          # Se añade la actividad "Parejas" (deja de estar vacío)
│   └── parejas/
│       ├── dibujos.ts       # Los 8 dibujos: identificador, nombre e icono
│       ├── juego.ts         # Reglas: crearPartida, tocarCarta, seguir (funciones puras)
│       ├── Parejas.tsx      # Contenido de la actividad: elige entre las 3 pantallas
│       ├── ElegirTamano.tsx # Pantalla con los tres botones de tamaño
│       ├── Tablero.tsx      # Marcador de intentos, botón "Seguir" y cuadrícula de cartas
│       ├── Carta.tsx        # Una carta: tapada o con su dibujo y su nombre
│       └── Felicitacion.tsx # Mensaje final con los intentos y los dos botones
└── textos.ts                # Se añaden los textos de la actividad

tests/
├── parejas-juego.test.tsx   # Reglas: tamaños, pareja, no pareja, bloqueos, intentos, final
└── parejas-pantalla.test.tsx # Partida completa usando la pantalla, para los tres tamaños
```

**Decisión de estructura**: Proyecto único de app móvil, sin backend. La actividad vive en su
propia carpeta dentro de `src/actividades/`, como pide el contrato
[actividad.md](../001-pantalla-inicio/contracts/actividad.md). Las reglas van separadas de las
pantallas solo para poder probarlas sin pintar nada; no hay más capas. Las pruebas usan
extensión `.test.tsx` porque así está configurado Jest en el proyecto.

## Seguimiento de complejidad

Sin infracciones que justificar.
