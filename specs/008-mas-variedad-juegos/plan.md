# Plan de implementación: Más variedad en los juegos

**Rama**: `008-mas-variedad-juegos` | **Fecha**: 2026-11-09 | **Especificación**: [spec.md](spec.md)

**Entrada**: especificación de la funcionalidad en `specs/008-mas-variedad-juegos/spec.md`

## Resumen

Última funcionalidad del proyecto. Seis mejoras sobre juegos que ya existen, ordenadas por prioridad:

1. **Adivinanzas** (P1): el banco pasa de 10 a 50 adivinanzas y `crearPartida` excluye las 5 de la partida anterior.
2. **Sopa, direcciones** (P1): se reescriben las cuadrículas de 3 de las 5 sopas pequeñas para que tengan 2 palabras verticales y 1 horizontal.
3. **Diferencias, escenas** (P2): la escena única pasa a ser una lista de 4 escenas fijas con 7 cambios posibles cada una (unos 50 iconos en total); cada partida usa una escena distinta de la anterior.
4. **Diferencias, 3/5/7** (P3): pantalla previa para elegir cuántas diferencias; la partida activa solo los primeros N cambios de la escena.
5. **Sopa, tamaño** (P3): pantalla previa para elegir pequeña (5×6, 3 palabras) o mediana (6×6, 5 palabras, 3 sopas nuevas hechas a mano).
6. **Animación** (P4): la duración del fundido pasa de 400 a 900 ms.

Enfoque técnico: ningún dato nuevo en el teléfono, ninguna librería nueva y ningún cambio en el contrato de actividad. Las reglas siguen siendo funciones puras en `juego.ts` de cada actividad; lo que cambia es el contenido (`banco.ts`, `sopas.ts`, `escena.ts`) y la entrada de datos de esas funciones (tamaño, número de diferencias, partida anterior). La pantalla de elegir se comparte entre "Sopa de letras" y "Diferencias" con un componente nuevo y pequeño. "Parejas" no se toca.

## Contexto técnico

**Lenguaje/Versión**: TypeScript 6 sobre React Native 0.88 con Expo 58 (sin cambios).

**Dependencias principales**: las existentes (`@expo/vector-icons`, `react-native`). No se añade ninguna.

**Almacenamiento**: ninguno. Todo se queda en memoria durante la sesión de la actividad (la "partida anterior" se recuerda solo mientras la actividad está abierta).

**Pruebas**: Jest + React Native Testing Library (`npm test`), `npm run typecheck`.

**Plataforma de destino**: Android e iOS, móviles de 360 puntos de ancho como mínimo.

**Tipo de proyecto**: app móvil.

**Objetivos de rendimiento**: no aplica (no hay cálculos pesados; el azar es una sola elección por partida).

**Restricciones**: letra ≥ 22 pt, botones ≥ 64 pt, contraste ≥ 7:1, sin límites de tiempo, español de España con tildes, textos en `src/textos.ts`, valores en `src/tema.ts` y `src/animacion.ts`, sin red.

**Escala/Alcance**: 4 actividades tocadas de 5, unos 12 ficheros de código, 3 de contenido y unos 8 de pruebas. El grueso del trabajo es contenido revisado a mano: 40 adivinanzas nuevas, 3 sopas pequeñas reescritas, 3 sopas medianas y 4 escenas con unos 50 iconos.

## Comprobación de la constitución

*Puerta: debe pasar antes de la investigación (Fase 0) y volver a comprobarse tras el diseño (Fase 1).*

| Principio | Cumple | Cómo |
|---|---|---|
| I. Simplicidad | Sí | Escenas fijas (no generadas), cuadrículas hechas a mano, un solo componente nuevo compartido, sin librerías. |
| II. Español de España | Sí | Todos los textos nuevos o cambiados van en `src/textos.ts` con tildes y signos de apertura. |
| III. Cero alcance fantasma | Sí | Solo lo que dice la spec 008; lo descartado (diagonales, tres tamaños de sopa, colocación aleatoria) queda fuera. |
| IV. Verificable por persona no técnica | Sí | [quickstart.md](quickstart.md) comprueba cada historia usando la app. |
| V. Todo en el teléfono | Sí | Todo el contenido va dentro de la app; no hay red. |
| VI. Datos con respeto | Sí | No se guarda nada. |
| VII. Personas mayores | Sí | Botones de elegir ≥ 64 pt; zonas y casillas ≥ 44 pt (ver [research.md](research.md)); sin tiempos. |
| VIII. Pruebas básicas | Sí | Se actualizan las pruebas de adivinanzas, sopa, diferencias y animación; cada tamaño y cada número tienen su prueba. |
| IX. Iconos intuitivos | Sí | ~50 iconos reconocibles de alto contraste, siempre junto a texto; las pantallas de elegir llevan icono y texto. |

Resultado: **sin violaciones**. No hay tabla de complejidad. La comprobación posterior al diseño da el mismo resultado: el diseño no añade dependencias ni capas.

## Estructura del proyecto

### Documentación de esta funcionalidad

```text
specs/008-mas-variedad-juegos/
├── plan.md              # Este fichero
├── research.md          # Decisiones de la Fase 0
├── data-model.md        # Entidades y reglas de la Fase 1
├── quickstart.md        # Comprobación con la app y con las pruebas
├── contracts/
│   └── contenido.md     # Formato y reglas del contenido que revisa una persona
└── tasks.md             # Lo genera /speckit-tasks (no este comando)
```

### Código fuente (raíz del repositorio)

```text
src/
├── animacion.ts                       # duracion: 400 → 900
├── componentes/
│   ├── ElegirOpcion.tsx               # NUEVO: pantalla de elegir con botones grandes (la usan Sopa y Diferencias)
│   └── IconoVictoria.tsx              # solo el comentario de la duración
├── actividades/
│   ├── adivinanzas/
│   │   ├── banco.ts                   # 10 → 50 adivinanzas
│   │   ├── juego.ts                   # crearPartida(idsAnteriores, azar)
│   │   └── Adivinanzas.tsx            # pasa los ids de la partida anterior al jugar otra vez
│   ├── sopa-de-letras/
│   │   ├── sopas.ts                   # campo tamano; 3 pequeñas reescritas; 3 medianas nuevas
│   │   ├── juego.ts                   # crearPartida(tamano, idAnterior, azar); palabras = sopa.palabras.length
│   │   ├── SopaDeLetras.tsx           # elegir tamaño → partida → felicitación
│   │   ├── Felicitacion.tsx           # recibe el número de palabras
│   │   └── ListaPalabras.tsx          # sin cambios de lógica (ya recorre sopa.palabras)
│   └── diferencias/
│       ├── escena.ts                  # lista de 4 escenas con 7 cambios cada una; dibujosDe(escena, total)
│       ├── juego.ts                   # crearPartida(total, idEscenaAnterior, azar); tocar y faltan usan la partida
│       ├── Diferencias.tsx            # elegir número → partida → felicitación
│       ├── Dibujo.tsx                 # recibe las diferencias activas en vez de importarlas
│       └── Felicitacion.tsx           # recibe el total
├── textos.ts                          # etiquetas y felicitaciones con número; textos de elegir
└── tema.ts                            # sin cambios
tests/
├── adivinanzas-banco.test.tsx         # mínimo 50
├── adivinanzas-juego.test.tsx         # nunca repite las de la partida anterior
├── adivinanzas-pantalla.test.tsx      # jugar otra vez trae adivinanzas distintas
├── sopa-sopas.test.tsx                # tamaños, una sola aparición, ≥ 2 sopas con más verticales
├── sopa-juego.test.tsx                # 3 y 5 palabras, no repetir sopa del mismo tamaño
├── sopa-pantalla.test.tsx             # pantalla de elegir y las dos partidas completas
├── diferencias-escena.test.tsx        # todas las escenas, para 3, 5 y 7
├── diferencias-juego.test.tsx         # reglas con total variable
├── diferencias-pantalla.test.tsx      # pantalla de elegir y las tres partidas completas
├── elegir-opcion.test.tsx             # NUEVO: el componente compartido
├── icono-victoria.test.tsx            # duración entre 800 y 1000 ms
├── inicio.test.tsx / textos.test.tsx  # descripción de Diferencias sin "3"
└── ayudas.tsx                         # sin cambios
```

**Decisión de estructura**: se mantiene la estructura por actividad que ya existe. El único fichero nuevo de código es `src/componentes/ElegirOpcion.tsx`, porque dos actividades necesitan la misma pantalla de elegir (regla de simplicidad: no se duplica, pero tampoco se toca "Parejas", que tiene la suya y funciona).

## Seguimiento de complejidad

Sin violaciones de la constitución que justificar.
