# Modelo de datos: Pantalla de inicio de MindTrainer

Esta funcionalidad no guarda ningún dato de la persona (principio VI). Solo describe cosas que
existen mientras la app está abierta.

## Actividad

Cada una de las cosas que la persona puede hacer en la app (un juego o un tipo de pregunta).

| Campo | Qué es | Reglas |
|-------|--------|--------|
| Identificador | Nombre interno único | Obligatorio y sin repetir entre actividades |
| Nombre | Texto que ve la persona | Obligatorio, en español de España, breve |
| Descripción | Una línea que explica la actividad | Obligatoria, una sola línea, en español de España |
| Contenido | La pantalla de la actividad | Obligatorio; sigue el [contrato](contracts/actividad.md) |

**Relaciones**: La lista de actividades contiene cero o más actividades. Una actividad no
depende de otra.

## Estado de la pantalla (solo mientras la app está abierta)

| Estado | Valores | Cambia cuando |
|--------|---------|---------------|
| Pantalla actual | Inicio, o una actividad concreta | La persona toca una actividad (va a la actividad) o "Volver al inicio" (va a Inicio) |
| Partida en curso | Sí / No | La actividad avisa de que empieza o termina una partida |
| Aviso de salida visible | Sí / No | Se toca "Volver al inicio" con partida en curso (se muestra); se elige "Sí, salir" o "No, seguir jugando" (se oculta) |

### Transiciones

```text
Inicio ──(tocar actividad)──────────────────────► Actividad (sin partida)
Actividad ──(actividad avisa: empieza partida)──► Actividad (con partida)
Actividad (con partida) ──(actividad avisa: termina)► Actividad (sin partida)
Actividad (sin partida) ──(Volver al inicio)────► Inicio
Actividad (con partida) ──(Volver al inicio)────► Aviso de salida
Aviso de salida ──(Sí, salir)───────────────────► Inicio
Aviso de salida ──(No, seguir jugando)──────────► Actividad (con partida, igual que antes)
```

Al volver a Inicio, el estado de la actividad se descarta. Nada se guarda.
