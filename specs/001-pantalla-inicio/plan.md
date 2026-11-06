# Plan de implementación: Pantalla de inicio de MindTrainer

**Rama**: `001-pantalla-inicio` | **Fecha**: 2026-11-06 | **Spec**: [spec.md](spec.md)

**Entrada**: Especificación de la funcionalidad en `specs/001-pantalla-inicio/spec.md`

## Resumen

Se construye la base de la app: una pantalla de inicio con la lista de actividades (icono,
nombre y descripción de una línea) y un marco común para las actividades que muestra siempre el botón
"Volver al inicio". Si hay una partida en curso, el botón pide confirmación antes de salir. Es
la primera funcionalidad del proyecto, así que también crea el esqueleto de la app. Todo corre
dentro del móvil, sin servidor ni internet (ver [research.md](research.md)).

## Contexto técnico

**Lenguaje/Versión**: TypeScript (sobre React Native)

**Dependencias principales**: Expo y React Native. Sin librería de navegación: con dos
pantallas basta un estado simple (principio I).

**Almacenamiento**: N/A. Esta funcionalidad no guarda ningún dato.

**Pruebas**: Jest con React Native Testing Library

**Plataforma de destino**: Móvil (Android e iOS, desde un único código)

**Tipo de proyecto**: Aplicación móvil

**Objetivos de rendimiento**: Sin objetivos propios. La pantalla de inicio se ve al abrir la
app y la respuesta al toque es inmediata a ojos de la persona.

**Restricciones**: Funciona sin internet. Sin cuentas, permisos ni tutorial. Letra grande,
contraste alto, botones grandes, sin límites de tiempo. Textos en español de España.

**Escala/Alcance**: 2 pantallas (inicio y marco de actividad) más el aviso de confirmación.
La lista debe soportar desde 1 hasta unas decenas de actividades.

## Comprobación de la constitución

*Puerta: debe pasar antes de la investigación. Se vuelve a comprobar tras el diseño.*

| Principio | Cumple | Cómo |
|-----------|--------|------|
| I. Simplicidad | Sí | Sin librería de navegación, sin gestor de estado, sin base de datos. |
| II. Español de España | Sí | Todos los textos en un único archivo en español; las pruebas comprueban los textos clave. |
| III. Cero alcance fantasma | Sí | Solo lo escrito en la spec. No se crea ninguna actividad real ni de prueba en el producto. |
| IV. Verificable por persona no técnica | Sí | [quickstart.md](quickstart.md) describe comprobaciones usando solo la app. |
| V. Todo en el teléfono | Sí | Sin servidor, sin red; la lista de actividades va dentro de la app. |
| VI. Datos con respeto | Sí | No se pide ni se guarda ningún dato; no hay claves. |
| VII. Pensada para mayores | Sí | Tamaños y contraste definidos en un solo sitio y reutilizados; sin temporizadores. |
| VIII. Pruebas básicas | Sí | Pruebas funcionales de la lista, la navegación y la confirmación de salida. |
| IX. Imágenes e iconos intuitivos | Sí | Iconos grandes incluidos en `assets/`, siempre junto al texto (FR-013 a FR-016). |

**Resultado** (constitución v1.1.0, 9 principios): Sin infracciones. No hace falta la tabla de complejidad. Se mantiene tras el
diseño.

## Estructura del proyecto

### Documentación (esta funcionalidad)

```text
specs/001-pantalla-inicio/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── actividad.md
└── tasks.md          # Lo crea /speckit-tasks, no este comando
```

### Código fuente (raíz del repositorio)

```text
App.tsx                      # Punto de entrada: decide si se ve el inicio o una actividad
assets/                      # Iconos e imágenes incluidos en la app (sin descargas)
src/
├── actividades/
│   └── registro.ts          # Lista de actividades disponibles (vacía por ahora)
├── pantallas/
│   ├── Inicio.tsx           # Lista de actividades
│   └── MarcoActividad.tsx   # Marco con el botón "Volver al inicio" y la confirmación
├── componentes/
│   ├── BotonGrande.tsx      # Botón con tamaño y contraste accesibles, con icono y texto
│   └── Icono.tsx            # Muestra un icono o imagen grande, siempre junto a texto
├── tema.ts                  # Tamaños de letra y colores de alto contraste
└── textos.ts                # Todos los textos en español de España

tests/
├── inicio.test.tsx          # Lista, una sola actividad, varias, abrir actividad
└── marco-actividad.test.tsx # Botón visible, volver, confirmación con partida en curso
```

**Decisión de estructura**: Proyecto único de app móvil, sin backend. Las actividades futuras
se añaden como carpetas dentro de `src/actividades/` y se registran en `registro.ts`, según el
contrato [actividad.md](contracts/actividad.md).

## Seguimiento de complejidad

Sin infracciones que justificar.
