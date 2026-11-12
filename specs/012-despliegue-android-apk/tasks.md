# Tareas: Despliegue de MindTrainer como app descargable para Android

**Entrada**: documentos de `/specs/012-despliegue-android-apk/`

**Requisitos previos**: [plan.md](plan.md), [spec.md](spec.md), [research.md](research.md), [data-model.md](data-model.md), [contracts/configuracion-android.md](contracts/configuracion-android.md), [quickstart.md](quickstart.md)

**Pruebas**: no hay lógica nueva, así que no se escriben pruebas nuevas. Las existentes (`npm test`, `npm run typecheck`) deben seguir pasando (SC-006). La comprobación real se hace en el móvil.

**Formato**: `[ID] [P?] [Historia] Descripción con ruta`. **[P]** = se puede hacer en paralelo (ficheros distintos). 🧑 = la necesita una persona con un móvil o con su cuenta de Expo: el agente no puede hacerla y se deja pendiente.

**Datos fijos**: paquete `automatizacionro.mindtrainer`; Android mínimo 7.0 (el móvil de destino tiene Android 11); APK ≤ 50 MB.

---

## Fase 1: Preparación

- [x] T001 Instalar el plugin de Expo para limitar arquitecturas con `npx expo install expo-build-properties` (modifica `package.json` y `package-lock.json`)
- [x] T002 [P] Crear `eas.json` con `cli.appVersionSource: "local"` y el perfil `build.preview` (`distribution: "internal"`, `android.buildType: "apk"`), tal como indica `contracts/configuracion-android.md`
- [x] T003 [P] Ampliar `.gitignore` con `credentials.json` y `*.keystore` (ya excluye `*.jks`, `*.key`, `*.p12`)

---

## Fase 2: Base (bloquea todas las historias)

**Objetivo**: configuración de Android completa y guía de generación disponible antes de compilar.

- [x] T004 Editar `app.json`: añadir `android.package` = `automatizacionro.mindtrainer`, `android.versionCode` = `1`, `android.blockedPermissions` (INTERNET, READ/WRITE_EXTERNAL_STORAGE, ACCESS_FINE/COARSE_LOCATION, CAMERA, RECORD_AUDIO, READ_CONTACTS) y el plugin `["expo-build-properties", { "android": { "buildArchs": ["arm64-v8a", "armeabi-v7a"] } }]` sin quitar `expo-font` ni `expo-asset`; no tocar `name`, `orientation` ni iconos (FR-002, FR-004, FR-010, FR-011)
- [x] T005 Comprobar que la configuración es válida con `npx expo config --type public` y que `npm test` y `npm run typecheck` siguen pasando (SC-006)
- [x] T005b Comprobar los permisos antes de compilar: `npx expo prebuild --platform android --no-install` y revisar `android/app/src/main/AndroidManifest.xml` (la carpeta `/android` está en `.gitignore`; borrarla después). Es una comprobación parcial: no incluye los manifiestos de las librerías, así que T013 sigue siendo la prueba definitiva
- [x] T006 [P] Escribir `docs/generar-apk.md` en español para la persona responsable: requisitos (Node, cuenta gratuita de Expo), `npx eas-cli login`, `npx eas-cli build -p android --profile preview`, aceptar que EAS genere la clave la primera vez, enlazar el proyecto con `npx eas-cli init` (avisar de que escribe `extra.eas.projectId` y quizá `owner` en `app.json`; no son secretos y se commitean tras T007), descargar el APK, subir `versionCode` en +1 antes de cada APK nuevo, copia de seguridad de la clave con `npx eas-cli credentials` guardada fuera del proyecto y aviso de qué pasa si se pierde (FR-007, FR-008, FR-009, FR-010)

**Punto de control**: `app.json`, `eas.json` y `docs/generar-apk.md` cumplen el contrato; pruebas y tipos en verde.

---

## Fase 3: Historia 1 - Instalar MindTrainer desde un archivo (P1) 🎯 MVP

**Objetivo**: un APK que se instala en el móvil Android sin Expo Go y se abre en la bienvenida.

**Prueba independiente**: en un móvil que nunca ha tenido la app ni Expo Go, descargar el archivo, instalarlo y abrir MindTrainer.

- [x] T007 [US1] 🧑 Generar el primer APK siguiendo `docs/generar-apk.md` (la persona responsable inicia sesión en Expo y lanza la compilación; `versionCode` 1)
- [x] T008 [US1] 🧑 Anotar el tamaño real del APK en `specs/012-despliegue-android-apk/research.md` (D5). Si pasa de 50 MB, avisar y decidir qué hacer; no se añade trabajo extra por cuenta propia (SC-007)
- [ ] T009 [US1] 🧑 Instalar el APK en el móvil Android 11 sin Expo Go: aparece "MindTrainer" con su icono propio en la lista de aplicaciones (FR-001, FR-002)
- [ ] T010 [US1] 🧑 Abrir la app: se ve la bienvenida y se puede jugar a los cinco juegos con las mismas reglas, textos y aspecto que en Expo Go; no pide cuenta ni inicio de sesión (FR-003, FR-005)
- [ ] T011 [US1] 🧑 Comprobar casos límite: con el móvil girado se mantiene vertical y los botones de Android (inicio, atrás) no tapan ningún botón de la app

**Punto de control**: la app instalada funciona igual que con Expo Go.

---

## Fase 4: Historia 2 - Funciona sin internet (P1)

**Objetivo**: sin conexión y sin permisos.

**Prueba independiente**: modo avión, abrir la app y jugar una partida de cada juego.

- [ ] T012 [US2] 🧑 Con el móvil en modo avión, abrir MindTrainer y jugar de principio a fin a los cinco juegos (SC-002)
- [ ] T013 [US2] 🧑 Revisar Ajustes > Aplicaciones > MindTrainer > Permisos: no pide ninguno (internet, contactos, ubicación, cámara, micrófono, almacenamiento) (FR-004, SC-003)

**Punto de control**: cinco juegos completos sin conexión y sin permisos.

---

## Fase 5: Historia 3 - Instrucciones para instalar sin ayuda técnica (P2)

**Objetivo**: guía corta para quien instala.

**Prueba independiente**: una persona no técnica instala la app siguiendo solo la guía.

- [x] T014 [P] [US3] Escribir `docs/instalar-android.md` en español de España, con frases cortas y letra clara: versión mínima (Android 7.0), cómo descargar el archivo, el aviso de Android 11 sobre instalar apps desconocidas (se concede a la aplicación desde la que se abre el APK, qué pulsar), el posible aviso del antivirus o de origen desconocido, la instalación y la primera apertura; sin necesidad de cuenta (FR-006)
- [x] T015 [P] [US3] Enlazar las dos guías (`docs/instalar-android.md` y `docs/generar-apk.md`) desde `README.md`
- [ ] T016 [US3] 🧑 Probar la guía con al menos 2 personas no técnicas y 2 móviles Android distintos: instalan y abren la app en menos de 5 minutos sin ayuda; corregir la guía con lo que salga (SC-001)

**Punto de control**: la guía se sigue sin ayuda.

---

## Fase 6: Historia 4 - Generar un archivo nuevo cuando haga falta (P2)

**Objetivo**: proceso repetible, misma firma, sin secretos en el repositorio.

**Prueba independiente**: seguir los pasos desde un proyecto recién descargado y obtener un APK que se instala y funciona.

- [x] T017 [US4] Comprobar que el repositorio no contiene claves ni archivos de firma: `git ls-files` sin `*.jks`, `*.keystore`, `*.p12`, `*.key` ni `credentials.json`, y revisión de que `app.json`, `eas.json` y `docs/` no llevan contraseñas ni tokens (FR-009, SC-006)
- [x] T018 [US4] 🧑 Hacer y guardar fuera del proyecto la copia de seguridad de la clave de firma con `npx eas-cli credentials`
- [ ] T019 [US4] 🧑 Subir `android.versionCode` a `2` en `app.json`, generar otro APK e instalarlo encima del anterior sin desinstalar: se completa y la app sigue funcionando; dejar `versionCode` = 2 en `app.json` y commitearlo para no repetir el número (SC-004, FR-008, FR-010)
- [ ] T020 [US4] 🧑 Comprobar que la persona responsable puede generar un APK nuevo desde un proyecto recién descargado (`git clone`, `npm install` y los pasos de `docs/generar-apk.md`) (SC-005)

**Punto de control**: se puede repetir el proceso con la misma firma.

---

## Fase 7: Cierre

- [x] T021 [P] Actualizar `CLAUDE.md`: añadir en Comandos/Estructura una línea con `eas.json`, `docs/` y el aviso de subir `versionCode` en cada APK, y en "Cosas a tener en cuenta" que la clave de firma está fuera del repositorio
- [x] T022 Ejecutar `npm test` y `npm run typecheck` por última vez y repasar `quickstart.md` marcando qué pasos quedan pendientes de una persona
- [X] T023 Preguntar al usuario si hay observaciones nuevas para `specs/ideas-pendientes.md` antes de cerrar la spec
- [x] T024 Preguntar al usuario si se fusiona la rama `012-despliegue-android-apk` en `main`; no fusionar sin su respuesta

---

## Dependencias y orden

- Fase 1 → Fase 2 → historias. T004 necesita T001 (plugin instalado); T005 necesita T004; T006 puede hacerse a la vez que T004.
- **US1** necesita toda la Fase 2 (sobre todo T004 y T006). **US2** necesita el APK de T007 instalado (T009). **US3** (T014, T015) puede escribirse en cuanto exista la Fase 2, pero se prueba (T016) con el APK de US1. **US4**: T017 se puede hacer en cuanto estén T002-T004; T019 y T020 necesitan T007 y T018.
- Fase 7 al final.

## Oportunidades de paralelismo

- T002 y T003 a la vez.
- T006 mientras se hace T004.
- T014 y T015 a la vez.
- T021 en cualquier momento tras la Fase 2.

## Estrategia de implementación

**MVP = Fase 1 + Fase 2 + US1 + US2.** Un APK instalable, sin permisos y que funciona sin internet.

1. El agente hace T001–T006, T014, T015, T017 y T021–T022 (configuración, guías y comprobaciones).
2. La persona responsable hace las tareas 🧑 con su cuenta de Expo y los móviles.
3. Se corrige lo que salga de las pruebas con personas (T016) y se cierra la spec (T023, T024).

## Tareas que necesitan a una persona (no las puede hacer el agente)

T007, T008, T009, T010, T011, T012, T013, T016, T018, T019, T020.
