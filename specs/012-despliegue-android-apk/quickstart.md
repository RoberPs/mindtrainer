# Guía de validación: Despliegue Android

Qué comprobar y cómo, de lo automático a lo manual. Los pasos 5 a 9 los hace una persona con un móvil (el agente no puede).

## Requisitos

- Ordenador con Node y el proyecto; cuenta gratuita de Expo.
- Un móvil Android con **Android 7.0 o superior** (Ajustes > Acerca del teléfono). Idealmente, el móvil antiguo de destino.

## Pasos

1. **Pruebas y tipos**: `npm test` y `npm run typecheck` pasan (SC-006).
2. **Configuración**: `app.json` y `eas.json` cumplen el [contrato](contracts/configuracion-android.md).
3. **Repositorio limpio**: `git ls-files` no muestra `*.jks`, `*.keystore`, `credentials.json` ni claves (SC-006, FR-009).
4. **Generar el APK** siguiendo `docs/generar-apk.md`: `npx eas-cli build -p android --profile preview`. Anotar el tamaño (objetivo ≤ 50 MB, SC-007).
5. **Instalar** en el móvil siguiendo solo `docs/instalar-android.md`: aparece "MindTrainer" con su icono (SC-001).
6. **Primera apertura**: bienvenida, y los cinco juegos funcionan igual que en Expo Go. El móvil girado no cambia a horizontal; los botones de Android no tapan ningún botón.
7. **Modo avión**: jugar de principio a fin a los cinco juegos (SC-002).
8. **Permisos**: Ajustes > Aplicaciones > MindTrainer > Permisos: ninguno (SC-003).
9. **Actualizar encima**: subir `versionCode` a 2, generar otro APK e instalarlo sin desinstalar (SC-004).
10. **Persona no técnica**: que al menos 2 personas con 2 móviles distintos instalen solo con la guía en menos de 5 minutos (SC-001).
11. **Repetibilidad**: que la persona responsable genere un APK nuevo desde un proyecto recién descargado (SC-005).
