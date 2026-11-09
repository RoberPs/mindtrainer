# Plan de implementación: Mejora visual de "Parejas"

**Rama**: `010-mejora-visual-parejas` | **Fecha**: 2026-11-09 | **Spec**: [spec.md](spec.md)

**Entrada**: especificación en `specs/010-mejora-visual-parejas/spec.md`

## Resumen

Mejorar el aspecto de las cartas de "Parejas" sin tocar sus reglas: dibujos más claros y variados (de 8 a 12 objetos cotidianos, cada uno con su color oscuro), un dorso único y reconocible, y caras que se distinguen a simple vista de las cartas tapadas y de las acertadas. Los tres botones ("Seguir", "Jugar otra vez", "Volver al inicio") ya llevan icono y texto: solo se añade la prueba que lo garantiza. **Decisión importante** (ver [research.md](research.md)): los dibujos siguen saliendo de la familia de iconos que ya viene con la app, en lugar de Openclipart o Kenney.

## Contexto técnico

**Lenguaje/Versión**: TypeScript, Expo ~58 y React Native 0.88 (los del proyecto)

**Dependencias principales**: ninguna nueva (`@expo/vector-icons`, ya instalada)

**Almacenamiento**: N/A (nada se guarda)

**Pruebas**: Jest + React Native Testing Library (`npm test`), más `npm run typecheck`

**Plataforma**: móvil (iOS y Android) con Expo

**Tipo de proyecto**: app móvil

**Objetivos de rendimiento**: N/A (no se hacen pruebas de rendimiento)

**Restricciones**: letra de al menos 22 puntos, botones de al menos 64, contraste de 7 a 1, sin límites de tiempo, todo dentro de la app, sin internet

**Escala/Alcance**: solo la carpeta `src/actividades/parejas/`, `src/tema.ts`, `src/textos.ts` y sus pruebas

## Comprobación de la constitución

| Principio | Resultado |
|-----------|-----------|
| I. Simplicidad | Cumple: ninguna dependencia ni archivo gráfico nuevo; se amplía una lista y se retoca un componente. |
| II. Español de España | Cumple: los nombres nuevos de dibujos van en `src/textos.ts`, con tildes. |
| III. Cero alcance fantasma | Cumple: nada fuera de la spec (sin animaciones, sonidos, créditos ni cambios en otros juegos). |
| IV. Verificable por persona no técnica | Cumple: [quickstart.md](quickstart.md) se comprueba usando la app. |
| V. Todo en el teléfono | Cumple: sin descargas. |
| VI. Datos con respeto | Cumple: sin datos nuevos. |
| VII. Personas mayores | Cumple: letra, botones y contraste de siempre; los colores de dibujo se prueban a 7 a 1. |
| VIII. Pruebas básicas | Cumple: se añaden pruebas de dibujos, dorso, botones y variedad. |
| IX. Imágenes e iconos | Cumple, con una salvedad de licencia explicada en research.md (punto 1). |

Sin violaciones: no hace falta tabla de complejidad. Se vuelve a comprobar tras el diseño: sigue cumpliendo.

## Estructura del proyecto

### Documentación de esta funcionalidad

```text
specs/010-mejora-visual-parejas/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── checklists/requirements.md
└── tasks.md              # lo crea /speckit-tasks
```

No hay carpeta `contracts/`: el contrato de las actividades no cambia.

### Código fuente

```text
src/
├── tema.ts                          # + colores de los 12 dibujos (tema.colores.dibujos)
├── textos.ts                        # + 4 nombres de dibujo nuevos
└── actividades/parejas/
    ├── dibujos.ts                   # 8 → 12 dibujos
    └── Carta.tsx                    # dorso nuevo, caras con color y bordes distintos
tests/
├── parejas-juego.test.tsx           # + variedad entre partidas
├── parejas-pantalla.test.tsx        # + dorso único, iconos de los 3 botones
└── tema-contraste.test.tsx          # + contraste de los 12 colores de dibujo
```

**Decisión de estructura**: se mantiene la estructura actual; no se crean carpetas ni archivos de código nuevos.
