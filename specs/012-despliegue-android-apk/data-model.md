# Modelo de datos: Despliegue Android

La app no guarda datos. Las entidades de la spec se concretan así:

| Entidad | Dónde vive | Campos / contenido | Reglas |
|---|---|---|---|
| Archivo instalable (APK) | Lo genera EAS; no se guarda en el repositorio | nombre `MindTrainer`, paquete `automatizacionro.mindtrainer`, `version`, `versionCode`, icono | ≤ 50 MB; sin permisos; mínimo Android 7.0 |
| Identidad de firma | Servidor de EAS + copia de la persona responsable fuera del repo | clave de firma (keystore) | Siempre la misma; nunca en el repositorio |
| Guía de instalación | `docs/instalar-android.md` | pasos de descarga, permiso de orígenes desconocidos, instalación y primera apertura | Español de España, frases cortas |
| Pasos de generación | `docs/generar-apk.md` | comandos, subida de `versionCode`, copia de la clave | Repetibles desde un proyecto recién descargado |

## Reglas de versión

- `version`: texto visible (`1.0.0`, `1.0.1`, …).
- `android.versionCode`: entero; empieza en 1; **+1 en cada APK nuevo**. Si no sube, Android rechaza instalar encima.

## Transiciones

Primer APK (`versionCode` 1) → cambios → subir `versionCode` → nuevo APK firmado con la misma clave → se instala encima sin perder nada (la app no guarda datos).
