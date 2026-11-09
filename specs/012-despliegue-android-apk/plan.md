# Plan de implementación: Despliegue de MindTrainer como app descargable para Android

**Rama**: `012-despliegue-android-apk` | **Fecha**: 2026-11-09 | **Spec**: [spec.md](spec.md)

**Entrada**: especificación de `/specs/012-despliegue-android-apk/spec.md`

## Resumen

Generar un APK de MindTrainer instalable sin Expo Go, sin ordenador (para quien instala) y sin
cuentas. Camino más simple: **EAS Build con el perfil `preview` (APK)**, lanzado desde el ordenador
de la persona responsable con su cuenta gratuita de Expo. Solo se toca la configuración
(`app.json`, `eas.json`) y se añaden dos guías en español. No cambia ni una línea de los juegos.

Decisiones clave (detalle en [research.md](research.md)):

- Identificador del paquete: `automatizacionro.mindtrainer` (confirmado por la persona responsable).
- Versión mínima de Android: **7.0 (nivel de API 24)**, la que fija React Native 0.88 de este
  proyecto. Un móvil con Android 6 o anterior **no** puede instalarla.
- Permisos: ninguno. Se bloquea `INTERNET` y cualquier otro que se cuele.
- Tamaño objetivo del APK: **50 MB como máximo** (cómodo en datos móviles y en gama baja), limitando
  las arquitecturas a las de móviles reales (`arm64-v8a` y `armeabi-v7a`).
- Firma: la gestiona EAS (clave guardada en los servidores de Expo, nunca en el repositorio), con
  copia de seguridad que guarda la persona responsable fuera del proyecto.
- Versión: `version` y `android.versionCode` en `app.json`; `versionCode` sube con cada APK.

## Contexto técnico

**Lenguaje/Versión**: TypeScript 6 / Expo SDK 58, React Native 0.88.1, React 19.3 (sin cambios)

**Dependencias principales**: se añade solo `expo-build-properties` (plugin oficial de Expo, para
limitar las arquitecturas del APK) y la herramienta `eas-cli` (se usa con `npx`, no se instala en el
proyecto)

**Almacenamiento**: N/A (la app no guarda datos)

**Pruebas**: Jest + RNTL existentes (deben seguir pasando); comprobación manual en móvil real

**Plataforma de destino**: Android 7.0+ (API 24+); iOS fuera de alcance

**Tipo de proyecto**: app móvil

**Objetivos de rendimiento**: N/A

**Restricciones**: sin internet, sin permisos, vertical, APK ≤ 50 MB, sin secretos en el repositorio

**Escala/Alcance**: un archivo instalable, dos guías cortas, 4 ficheros de configuración editados/creados (`app.json`, `eas.json`, `package.json`, `.gitignore`)

## Comprobación de la constitución

| Principio | Cumple | Nota |
|---|---|---|
| I. Simplicidad | Sí | EAS `preview` es el camino con menos pasos; solo una dependencia añadida, justificada por el tamaño (SC-007) |
| II. Español de España | Sí | Guías en español; nombre de app sin cambios |
| III. Cero alcance fantasma | Sí | Sin juegos nuevos, sin tiendas, sin iOS, sin actualizaciones automáticas, sin créditos |
| IV. Verificable por persona no técnica | Sí | Instalar, abrir, modo avión y revisar permisos se comprueban en el móvil |
| V. Todo en el teléfono | Sí | La app no usa internet; el servicio de compilación lo usa solo quien genera el archivo |
| VI. Datos con respeto | Sí | Sin cuentas para quien usa la app; keystore fuera del repo |
| VII. Personas mayores | Sí | Sin cambios de interfaz; la guía usa frases cortas y letra grande |
| VIII. Pruebas | Sí | No hay lógica nueva; las pruebas existentes deben seguir pasando (SC-006) |
| IX. Iconos | Sí | Se reutilizan los iconos actuales |

Se explica de forma expresa un punto: la constitución dice "sin cuentas" y "sin servidor". Se
interpreta (como ya recoge la spec) como aplicable a la app y a quien la usa, no a las herramientas
de quien la genera. Sin violaciones; no hace falta tabla de complejidad.

**Re-evaluación tras el diseño**: sin cambios; sigue cumpliéndose todo.

## Estructura del proyecto

### Documentación (esta funcionalidad)

```text
specs/012-despliegue-android-apk/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── configuracion-android.md
└── tasks.md              # lo crea /speckit-tasks
```

### Código fuente (raíz del repositorio)

```text
app.json                  # EDITAR: android.package, versionCode, permisos bloqueados, plugin de arquitecturas
eas.json                  # NUEVO: perfil preview (APK) y versión local
package.json              # EDITAR: añade expo-build-properties
.gitignore                # EDITAR: ignora keystores de EAS y credenciales
docs/
├── instalar-android.md   # NUEVO: guía para quien instala (FR-006)
└── generar-apk.md        # NUEVO: pasos para la persona responsable (FR-007)
README.md                 # EDITAR: enlace a las dos guías
```

**Decisión de estructura**: sin código de aplicación nuevo; `src/` y `tests/` no cambian.
