# Plan de implementación: Color por actividad y animación de victoria

**Rama**: `007-color-animacion-victoria` | **Fecha**: 2026-11-09 | **Spec**: [spec.md](spec.md)

**Entrada**: Especificación de la funcionalidad en `specs/007-color-animacion-victoria/spec.md`

## Resumen

Dos mejoras visuales pequeñas que no tocan ninguna regla de juego.

1. **Color por actividad.** El contrato de actividad gana un campo opcional `color`. Los cinco
   colores viven en `src/tema.ts` y cada actividad de `registro.ts` indica el suyo. La pantalla
   de inicio pinta cada tarjeta con ese color de fondo, texto e icono en blanco; si una actividad
   no indica color, usa el azul de siempre (`tema.colores.primario`). El resto de la app no cambia.
2. **Animación de victoria.** Un componente nuevo y pequeño, `IconoVictoria`, sustituye al icono
   `party-popper` de las cinco pantallas finales. Hace un **fundido** del icono (de transparente a
   visible, 400 ms, una vez) con `Animated` de React Native, sin librerías nuevas. El texto y los
   botones no forman parte de la animación, así que se ven y se pueden pulsar desde el primer
   instante. Si el móvil tiene activado "reducir movimiento", el icono sale ya visible. Un
   interruptor en `src/animacion.ts` apaga la animación en las pruebas.

Detalles y alternativas descartadas en [research.md](research.md).

## Contexto técnico

**Lenguaje/Versión**: TypeScript (sobre React Native), igual que las funcionalidades 001 a 006

**Dependencias principales**: Ninguna nueva. Se usa `Animated` y `AccessibilityInfo` de
React Native, y los componentes `Icono` y `BotonGrande` que ya existen.

**Almacenamiento**: N/A. No se guarda nada.

**Pruebas**: Jest con React Native Testing Library (ya instalados)

**Plataforma de destino**: Móvil (Android e iOS, desde un único código)

**Tipo de proyecto**: Aplicación móvil

**Objetivos de rendimiento**: Fundido de 400 ms (entre 300 y 600 según RF-008), con el motor
nativo para opacidad, sin trabajo extra en el hilo de la interfaz.

**Restricciones**: Funciona sin internet. Letra de al menos 22 puntos, botones de al menos 64
puntos de alto, contraste de al menos 7 a 1 entre el texto blanco y cada color de actividad
(RF-002). Sin límites de tiempo. Sin sonidos ni vibración (RF-013).

**Escala/Alcance**: 1 pantalla con color (inicio), 5 pantallas finales con fundido, 5 colores.

## Comprobación de la constitución

*Puerta: debe pasar antes de la investigación. Se vuelve a comprobar tras el diseño.*

| Principio | Cumple | Cómo |
|-----------|--------|------|
| I. Simplicidad | Sí | Un campo opcional en el contrato, cinco colores en `tema.ts` y un componente de unas 30 líneas. Solo `Animated` de React Native; sin librerías, sin ajustes de la persona, sin animar nada más. |
| II. Español de España | Sí | No hay textos nuevos; los existentes no cambian. |
| III. Cero alcance fantasma | Sí | Solo lo escrito en la spec: color en la lista de inicio y fundido en las pantallas finales. Nada de sonidos, vibración, confeti, modo oscuro ni colores elegibles. |
| IV. Verificable por persona no técnica | Sí | [quickstart.md](quickstart.md) describe comprobaciones mirando la app y activando "reducir movimiento" en el móvil. |
| V. Todo en el teléfono | Sí | Sin red ni descargas. |
| VI. Datos con respeto | Sí | No se pide ni se guarda ningún dato. |
| VII. Pensada para mayores | Sí | Contraste de al menos 7 a 1 en los cinco colores (calculado, ver [research.md](research.md)); movimiento mínimo, una vez, sin bloquear botones y respetando "reducir movimiento"; sin tiempos. |
| VIII. Pruebas básicas | Sí | Pruebas de los colores (distintos, contraste, respaldo azul) y del fundido (aparece, respeta "reducir movimiento", no bloquea botones). Sin pruebas de aspecto visual. |
| IX. Imágenes e iconos intuitivos | Sí | No se quita ni se cambia ningún icono; el color solo refuerza. |

**Resultado** (constitución v1.1.0, 9 principios): Sin infracciones. No hace falta la tabla de
complejidad. Se mantiene tras el diseño.

## Estructura del proyecto

### Documentación (esta funcionalidad)

```text
specs/007-color-animacion-victoria/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── color-y-animacion.md
├── checklists/
│   └── requirements.md
└── tasks.md          # Lo crea /speckit-tasks, no este comando
```

### Código fuente (raíz del repositorio)

```text
src/
├── animacion.ts                    # Interruptor `animacion.activa` (apagado en pruebas) y duración
├── tema.ts                         # Se añaden los 5 colores de actividad
├── actividades/
│   ├── tipos.ts                    # `Actividad` gana el campo opcional `color`
│   ├── registro.ts                 # Cada actividad indica su color
│   ├── parejas/Felicitacion.tsx    # Usa IconoVictoria
│   ├── forma-palabra/Resultado.tsx # Usa IconoVictoria
│   ├── sopa-de-letras/Felicitacion.tsx # Usa IconoVictoria
│   ├── adivinanzas/Resultado.tsx   # Usa IconoVictoria
│   └── diferencias/Felicitacion.tsx # Usa IconoVictoria
├── componentes/
│   └── IconoVictoria.tsx           # Icono de celebración con fundido
└── pantallas/
    └── Inicio.tsx                  # Tarjetas con el color de su actividad

tests/
├── inicio-colores.test.tsx         # Colores distintos, contraste 7:1, respaldo azul
└── icono-victoria.test.tsx         # Fundido, "reducir movimiento" y botones sin bloquear
```

También se actualizan, al implementar, el contrato
[actividad.md](../001-pantalla-inicio/contracts/actividad.md) (campo `Color`) y la sección
"Estructura" de `CLAUDE.md`.

**Decisión de estructura**: Proyecto único de app móvil, sin backend. No se crea ninguna carpeta
nueva: el componente va con los demás comunes y el interruptor es un archivo suelto en `src/`.
Las pruebas usan extensión `.test.tsx` porque así está configurado Jest.

## Seguimiento de complejidad

Sin infracciones que justificar.
