# Plan de implementación: Bienvenida, selección de juegos más intuitiva y nueva identidad de color

**Rama**: `009-bienvenida-seleccion-juegos` | **Fecha**: 2026-11-09 | **Spec**: [spec.md](spec.md)

## Resumen

Es un cambio de presentación, sin tocar reglas ni contenido de los juegos:

1. Una pantalla de **bienvenida** previa a la lista (estado en `App.tsx`, sin librería de navegación).
2. La **lista de juegos** pasa a tarjetas grandes con el encabezado "Elige uno de los juegos".
3. Una **paleta nueva** en `src/tema.ts` (crema, texto azul oscuro y los colores del logo, oscurecidos lo justo para llegar a 7 a 1).
4. Cada juego tiene un **color propio** (fondo + color de texto) que llega a todos sus botones y elementos mediante un contexto de React que pone `MarcoActividad`.

Decisiones y cálculos de contraste en [research.md](research.md).

## Contexto técnico

**Lenguaje**: TypeScript (Expo ~58, React Native 0.88, React 19). **Dependencias nuevas**: ninguna (el contexto es de React; el logo es un PNG incluido en la app). **Almacenamiento**: N/A. **Pruebas**: Jest + React Native Testing Library (`npm test`, `npm run typecheck`). **Plataforma**: móvil Android/iOS, sin internet. **Tipo**: app móvil. **Restricciones**: letra ≥ 22, botones ≥ 64 de alto, contraste ≥ 7 a 1, móvil de 360 puntos de ancho. **Escala**: 1 pantalla nueva, 1 rediseñada y unos 20 archivos con cambios de color.

## Comprobación de la constitución

| Principio | Estado |
|-----------|--------|
| I Simplicidad | Cumple: estado local en lugar de navegación; contexto en lugar de pasar el color por props en cada componente; sin librerías. |
| II Español de España | Cumple: textos nuevos en `src/textos.ts`. |
| III Sin alcance fantasma | Cumple: solo lo de la spec; sin saludo por hora, modo oscuro ni animaciones. |
| IV Verificable | Cumple: [quickstart.md](quickstart.md) se comprueba con la app. |
| V y VI Todo en el móvil, sin datos | Cumple: el logo va dentro de la app; no se guarda nada. |
| VII Mayores | Cumple: prueba de contraste 7 a 1 para todas las combinaciones de la paleta. |
| VIII Pruebas | Cumple: pruebas de bienvenida, lista, color de juego y contraste. |
| IX Iconos | Cumple: logo siempre junto a texto; iconos grandes en las tarjetas. |

Sin violaciones, antes y después del diseño: no hace falta tabla de complejidad.

## Estructura

```text
specs/009-bienvenida-seleccion-juegos/
├── plan.md, research.md, data-model.md, quickstart.md
├── contracts/actividad-color.md   # cambios al contrato de actividad
└── tasks.md                       # lo crea /speckit-tasks

App.tsx                            # estado: bienvenida → lista → actividad
assets/logo.png                    # recorte de assets/diseno/logo-presentacion.png (fondo crema); icon.png, splash-icon.png y android-icon-foreground.png se regeneran con él
src/
├── pantallas/Bienvenida.tsx       # NUEVA
├── pantallas/Inicio.tsx           # tarjetas grandes + encabezado
├── pantallas/MarcoActividad.tsx   # provee el color del juego
├── componentes/ColorJuego.tsx     # NUEVO: contexto + hook useColorJuego()
├── componentes/BotonGrande.tsx    # usa el color del contexto
├── actividades/tipos.ts           # Actividad: + colorTexto opcional
├── actividades/registro.ts        # un color por juego (tonos nuevos)
├── actividades/*/                 # sustituyen tema.colores.primario por el color del juego
├── actividades/diferencias/escena.ts  # colores de los iconos sin la paleta antigua
├── tema.ts                        # paleta nueva
└── textos.ts                      # textos de bienvenida y encabezado
tests/                             # bienvenida.test.tsx, color-juego.test.tsx, tema-contraste.test.tsx (sustituye a inicio-colores.test.tsx) y ajustes de las pruebas que abren App
```

**Decisión de estructura**: se mantiene el proyecto único actual; no hay carpetas nuevas salvo los archivos citados.
