# Investigación: Despliegue Android (APK)

## D1. Cómo generar el APK

- **Decisión**: EAS Build, perfil `preview` con `buildType: apk`, lanzado con `npx eas-cli build -p android --profile preview`.
- **Motivo**: no exige Android Studio ni SDK; la persona responsable ya tiene cuenta gratuita de Expo; el resultado es un enlace de descarga del APK. Es el camino con menos pasos.
- **Alternativas**: compilación local con Gradle (`expo prebuild` + `gradlew assembleRelease`): sin cuenta, pero exige Java, Android SDK y gestionar la firma a mano; más compleja. Descartada.
- **Aviso (exigido por la spec)**: este camino pide cuenta de Expo **solo a quien genera el archivo**. El plan gratuito tiene cola y un cupo mensual de compilaciones, suficiente para esta app.

## D2. Identificador del paquete

- **Decisión**: `automatizacionro.mindtrainer` (confirmado por la persona responsable el 2026-11-09).
- **Motivo**: es válido en Android (al menos dos segmentos, solo letras minúsculas). No se puede cambiar después sin crear otra app.

## D3. Versión mínima de Android y móvil antiguo

- **Hecho comprobado**: `node_modules/react-native/gradle/libs.versions.toml` fija `minSdk = 24` (Android 7.0 Nougat), `targetSdk = 36`.
- **Decisión**: la versión mínima es **Android 7.0**; no se rebaja (no es posible con esta versión de React Native sin cambiar de Expo, y eso queda fuera de alcance).
- **Riesgo**: un móvil con Android 6.0 o anterior no instalará la app (Android dirá que no es compatible). Hay que **comprobar la versión de Android del móvil de destino** (Ajustes > Acerca del teléfono) antes de generar nada. Si fuera inferior a 7.0, esta funcionalidad no sirve para ese móvil y habría que decidirlo aparte.
- La guía de instalación indica la versión mínima.
- **Comprobado (2026-11-09)**: el móvil de destino tiene **Android 11** (API 30), superior al mínimo; el riesgo no aplica. En Android 8 o superior, el permiso de "instalar apps desconocidas" se da a la aplicación desde la que se abre el APK (navegador o gestor de archivos), no al sistema entero; la guía lo explica así.

## D4. Permisos

- **Decisión**: bloquear `android.permission.INTERNET` y los de almacenamiento, ubicación, cámara, micrófono y contactos con `android.blockedPermissions` en `app.json`. La app de producción no necesita `INTERNET` (solo lo usa el modo desarrollo para conectar con Metro).
- **Comprobación**: tras compilar, revisar los permisos en el móvil (Ajustes > Aplicaciones > MindTrainer > Permisos: "No se han concedido permisos") o con `aapt dump permissions` si se dispone de él.
- **Alternativa descartada**: no hacer nada; las librerías de Expo pueden añadir permisos por defecto.

## D5. Tamaño del APK

- **Decisión**: objetivo **≤ 50 MB**. Se limitan las arquitecturas a `arm64-v8a` y `armeabi-v7a` con el plugin `expo-build-properties` (`android.buildArchs`); se descartan `x86` y `x86_64`, que solo usan emuladores.
- **Motivo**: un móvil antiguo suele ser `armeabi-v7a`; hay que incluirla. Quitar las de PC reduce el tamaño a la mitad aproximadamente.
- **Nota**: el tamaño real se mide al generar el primer APK; si pasa de 50 MB se anota y la persona responsable decide (no se inventa trabajo extra).
- **Alternativa descartada**: AAB por arquitectura; solo vale para Google Play, que está fuera de alcance.

## D6. Firma y custodia de claves

- **Decisión**: EAS crea y guarda la clave de firma en su servidor la primera vez (`eas build` pregunta; se acepta generar). Es siempre la misma identidad, así que una versión nueva se instala encima (FR-008). Nada de claves en el repositorio (FR-009).
- **Copia de seguridad**: la persona responsable descarga la credencial con `npx eas-cli credentials` y la guarda **fuera del proyecto** (por ejemplo, en un gestor de contraseñas o un disco). Si se pierde la clave, las siguientes versiones no se podrían instalar encima.
- **Protección**: `.gitignore` ya excluye `*.jks`, `*.key`, `*.p12`; se añaden `credentials.json` y `*.keystore`.

## D7. Versionado

- **Decisión**: `eas.json` con `cli.appVersionSource: "local"`. `version` (texto, p. ej. `1.0.0`) y `android.versionCode` (entero, empieza en 1 y **sube 1 con cada APK**) viven en `app.json`.
- **Motivo**: es visible y editable sin servicios; Android exige que `versionCode` suba para instalar encima (SC-004, FR-010). La versión se ve en Ajustes > Aplicaciones > MindTrainer.

## D8. Orientación, botones del sistema, icono

- Ya cubierto en `app.json`: `orientation: portrait`, icono adaptativo, sin `edgeToEdge` que cambie el aspecto. No se cambia. Se comprueba a mano que los botones de Android no tapan ningún botón (caso límite de la spec).

## D9. Reparto del archivo

- Fuera del producto (spec). La guía propone, sin obligar, el enlace de descarga que da EAS.
