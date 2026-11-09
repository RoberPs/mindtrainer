# Contrato: configuración de Android

Este es el contrato entre el proyecto y la herramienta de compilación. Lo que debe cumplir tras implementar.

## `app.json` (dentro de `expo`)

| Clave | Valor |
|---|---|
| `name` | `MindTrainer` (sin cambios) |
| `version` | `1.0.0` |
| `orientation` | `portrait` (sin cambios) |
| `android.package` | `automatizacionro.mindtrainer` |
| `android.versionCode` | `1` (sube 1 con cada APK) |
| `android.blockedPermissions` | `android.permission.INTERNET`, `android.permission.READ_EXTERNAL_STORAGE`, `android.permission.WRITE_EXTERNAL_STORAGE`, `android.permission.ACCESS_FINE_LOCATION`, `android.permission.ACCESS_COARSE_LOCATION`, `android.permission.CAMERA`, `android.permission.RECORD_AUDIO`, `android.permission.READ_CONTACTS`, `android.permission.SYSTEM_ALERT_WINDOW`, `android.permission.VIBRATE` |
| `plugins` | los actuales + `["expo-build-properties", { "android": { "buildArchs": ["arm64-v8a", "armeabi-v7a"] } }]` |

## `eas.json`

```json
{
  "cli": { "appVersionSource": "local" },
  "build": {
    "preview": {
      "distribution": "internal",
      "android": { "buildType": "apk" }
    }
  }
}
```

## Garantías comprobables

- El APK instalado muestra "MindTrainer" y su icono.
- Ajustes > Aplicaciones > MindTrainer > Permisos: sin permisos.
- Funciona en modo avión.
- Instalar un APK con `versionCode` mayor encima del anterior se completa sin desinstalar.
- El repositorio no contiene claves ni archivos de firma.
