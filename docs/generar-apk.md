# Cómo generar el archivo instalable (APK) de MindTrainer

Guía para la persona responsable del proyecto. El resultado es un archivo `.apk` que se instala
en un móvil Android (versión 7.0 o superior) sin Expo Go.

## Qué necesitas

- Un ordenador con [Node.js](https://nodejs.org) y el proyecto descargado (`npm install` hecho).
- Una **cuenta gratuita de Expo** (expo.dev). Solo la usas tú para generar el archivo. Quien
  instala la app **no necesita ninguna cuenta**.
- Conexión a internet en el ordenador (la compilación se hace en los servidores de Expo).

## Primera vez

1. Inicia sesión en Expo:

   ```bash
   npx eas-cli login
   ```

2. Enlaza el proyecto con tu cuenta:

   ```bash
   npx eas-cli init
   ```

   Esto escribe en `app.json` un identificador de proyecto (`extra.eas.projectId`) y puede
   añadir `owner`. No son secretos. **Haz commit de ese cambio.**

3. Genera el archivo:

   ```bash
   npx eas-cli build -p android --profile preview
   ```

   - Si pregunta si quieres que Expo cree la **clave de firma** (keystore), responde que **sí**.
     Es la identidad con la que se firma la app: tiene que ser siempre la misma para poder
     instalar versiones nuevas encima de las anteriores.
   - La compilación tarda unos minutos y puede haber cola en el plan gratuito.

4. Al terminar, EAS muestra un **enlace de descarga** del `.apk`. Descárgalo o comparte el
   enlace con quien vaya a instalarlo (cómo repartirlo lo decides tú).

## Guardar la copia de la clave de firma (importante)

Si pierdes la clave, no podrás instalar versiones nuevas encima de la actual (habría que
desinstalar y perder la app instalada).

```bash
npx eas-cli credentials
```

Elige Android y descarga la clave. Guarda el archivo **fuera de la carpeta del proyecto** (un
gestor de contraseñas o un disco aparte). **Nunca** la subas al repositorio: `.gitignore` ya
ignora `*.jks`, `*.keystore`, `*.key`, `*.p12` y `credentials.json`.

## Generar una versión nueva

1. Haz los cambios y comprueba que `npm test` y `npm run typecheck` pasan.
2. En `app.json`, **sube en 1 `android.versionCode`** (1 → 2 → 3…). Si no sube, Android no deja
   instalar encima. Cambia también `version` (por ejemplo, `1.0.1`) para que se vea.
3. Haz commit y repite el paso 3 de "Primera vez". EAS usará la misma clave.
4. Instala el archivo nuevo encima del anterior, sin desinstalar: la app no guarda datos, así
   que no se pierde nada.

La versión se ve en el móvil en Ajustes > Aplicaciones > MindTrainer.

## Qué debe cumplir el archivo

- Nombre **MindTrainer** y su icono.
- Paquete `automatizacionro.mindtrainer` (no se puede cambiar después sin crear otra app).
- **Sin permisos**: Ajustes > Aplicaciones > MindTrainer > Permisos debe decir que no se ha
  concedido ninguno.
- Funciona en **modo avión**.
- Tamaño objetivo: **50 MB como máximo**.
- Solo Android 7.0 o superior. En un móvil con Android 6 o anterior no se puede instalar.
