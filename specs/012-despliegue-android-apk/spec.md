# Especificación de la funcionalidad: Despliegue de MindTrainer como app descargable para Android

**Rama**: `012-despliegue-android-apk`

**Creada**: 2026-11-09

**Estado**: Borrador

**Entrada**: Preparar el despliegue de MindTrainer como app descargable para Android. Hoy la app solo se prueba con Expo Go en el móvil de desarrollo. Se quiere un archivo instalable (APK) que una persona pueda descargar e instalar en su móvil Android sin Expo Go, sin ordenador y sin cuentas. Fuera de alcance: iOS, publicación en Google Play u otras tiendas, actualizaciones automáticas, nuevas funciones o cambios en los juegos.

## Escenarios de usuario y pruebas *(obligatorio)*

### Historia 1 - Instalar MindTrainer desde un archivo (Prioridad: P1)

Una persona (o quien la ayuda) recibe un archivo instalable de MindTrainer en su móvil Android, lo abre, lo instala y encuentra la app en su lista de aplicaciones con su nombre y su icono, sin tener instalado Expo Go y sin usar ordenador.

**Por qué esta prioridad**: sin un instalable no se puede entregar la app a nadie; es el objetivo de toda la funcionalidad.

**Prueba independiente**: en un móvil Android que nunca ha tenido la app ni Expo Go, descargar el archivo, instalarlo y abrir MindTrainer.

**Escenarios de aceptación**:

1. **Dado** un móvil Android sin Expo Go, **cuando** se descarga el archivo y se instala, **entonces** MindTrainer aparece entre las aplicaciones con su nombre y su icono.
2. **Dado** la app instalada, **cuando** se abre por primera vez, **entonces** se ve la pantalla de bienvenida y se puede jugar a los cinco juegos igual que con Expo Go.
3. **Dado** la instalación terminada, **cuando** se mira el móvil, **entonces** no hace falta haber creado ninguna cuenta ni iniciar sesión en ningún sitio.

---

### Historia 2 - Funciona sin internet (Prioridad: P1)

Una vez instalada, la app funciona entera sin conexión: no pide internet ni para abrirse ni para jugar, y no envía ningún dato fuera del móvil.

**Por qué esta prioridad**: es un principio de la constitución (todo en el teléfono) y es lo que se espera de una app para personas mayores.

**Prueba independiente**: poner el móvil en modo avión, abrir la app y jugar una partida de cada juego.

**Escenarios de aceptación**:

1. **Dado** el móvil en modo avión, **cuando** se abre MindTrainer y se juega a cada uno de los cinco juegos, **entonces** todo funciona igual que con conexión.
2. **Dado** la app instalada, **cuando** se revisan los permisos que pide, **entonces** no solicita acceso a internet ni a datos personales como contactos, ubicación, cámara o micrófono.

---

### Historia 3 - Instrucciones para instalar sin ayuda técnica (Prioridad: P2)

Quien entrega la app dispone de una guía corta en español, con pasos y capturas o descripciones claras, que explica cómo descargar e instalar el archivo, incluido el aviso de Android sobre instalar aplicaciones de fuera de la tienda y cómo permitirlo.

**Por qué esta prioridad**: el archivo se instala fuera de la tienda, así que Android muestra avisos que pueden asustar; la guía evita abandonos, pero la app funciona sin ella.

**Prueba independiente**: pedir a una persona no técnica que instale la app siguiendo solo la guía, sin ayuda.

**Escenarios de aceptación**:

1. **Dado** la guía, **cuando** una persona no técnica la sigue en un móvil Android, **entonces** consigue instalar y abrir la app sin ayuda.
2. **Dado** el aviso de Android sobre instalar de orígenes desconocidos, **cuando** aparece, **entonces** la guía ya lo ha explicado y dice qué pulsar.

---

### Historia 4 - Poder generar un archivo nuevo cuando haga falta (Prioridad: P2)

La persona responsable puede generar de nuevo el archivo instalable (por ejemplo, tras añadir un juego) siguiendo pasos documentados y repetibles, con el mismo nombre de app y la misma firma, y sin que ninguna clave o secreto quede dentro del código del proyecto.

**Por qué esta prioridad**: el proyecto seguirá creciendo; si generar el archivo depende de recordar pasos sueltos, se perderá. No bloquea la primera entrega.

**Prueba independiente**: seguir los pasos documentados desde un proyecto recién descargado y obtener un archivo instalable que se instala y funciona.

**Escenarios de aceptación**:

1. **Dado** los pasos documentados, **cuando** la persona responsable los sigue, **entonces** obtiene un archivo instalable con el mismo nombre de app.
2. **Dado** el repositorio del proyecto, **cuando** se revisa, **entonces** no contiene claves, contraseñas ni archivos de firma.
3. **Dado** una versión ya instalada, **cuando** se instala encima una versión nueva generada con los mismos pasos, **entonces** la instalación se completa sin desinstalar antes.

---

### Casos límite

- Móvil con una versión de Android antigua que la app no admite: la guía indica qué versión mínima hace falta.
- Móvil sin espacio suficiente: el archivo es lo bastante pequeño para instalarse en móviles de gama baja.
- Se instala encima de una versión anterior: funciona, y como la app no guarda datos no se pierde nada.
- Android avisa de que la app es de un origen desconocido o la marca el antivirus del móvil: la guía lo explica y dice cómo continuar.
- La app se abre con el móvil girado: se mantiene en vertical, como hasta ahora.
- Los botones del móvil (inicio, atrás) no tapan ningún botón de la app.
- Las reglas de los juegos, los textos y el aspecto no cambian respecto a Expo Go.

## Requisitos *(obligatorio)*

### Requisitos funcionales

- **FR-001**: DEBE existir un archivo instalable de MindTrainer para Android que se pueda instalar sin Expo Go, sin ordenador y sin cuentas.
- **FR-002**: La app instalada DEBE llamarse "MindTrainer" y mostrar su icono propio en la lista de aplicaciones.
- **FR-003**: La app instalada DEBE abrirse en la pantalla de bienvenida y ofrecer los mismos cinco juegos, con las mismas reglas, textos y aspecto que la versión de desarrollo.
- **FR-004**: La app instalada DEBE funcionar completa sin conexión a internet y NO DEBE solicitar permiso de internet ni de datos personales (contactos, ubicación, cámara, micrófono, almacenamiento).
- **FR-005**: La app NO DEBE pedir cuenta, registro ni inicio de sesión, ni enviar datos fuera del móvil.
- **FR-006**: DEBE haber una guía de instalación en español de España, para una persona no técnica, que cubra la descarga, el permiso de instalar desde fuera de la tienda, la instalación y la primera apertura.
- **FR-007**: DEBEN existir pasos documentados y repetibles para que la persona responsable genere un archivo instalable nuevo.
- **FR-008**: El archivo instalable DEBE estar firmado siempre con la misma identidad, para que una versión nueva se pueda instalar encima de la anterior.
- **FR-009**: Ninguna clave, contraseña ni archivo de firma DEBE quedar en el repositorio del proyecto.
- **FR-010**: La app DEBE mostrar su versión de forma identificable para la persona responsable (por ejemplo, en la información de la app de Android), y esa versión DEBE subir con cada archivo nuevo.
- **FR-011**: Las reglas de los juegos, la puntuación, los textos y el diseño NO DEBEN cambiar; no se añade ninguna función nueva.
- **FR-012**: El despliegue afecta solo a Android; iOS, tiendas de aplicaciones y actualizaciones automáticas quedan fuera.

### Entidades clave

- **Archivo instalable**: el paquete de MindTrainer para Android, con nombre, icono y versión.
- **Identidad de firma**: la clave con la que se firma el archivo; vive fuera del repositorio y la custodia la persona responsable.
- **Guía de instalación**: documento corto para quien instala, en español.

## Criterios de éxito *(obligatorio)*

### Resultados medibles

- **SC-001**: Una persona no técnica instala y abre la app en menos de 5 minutos siguiendo solo la guía, sin ayuda (comprobado con al menos 2 personas y 2 móviles Android distintos).
- **SC-002**: Con el móvil en modo avión, el 100 % de los cinco juegos se pueden jugar de principio a fin.
- **SC-003**: La app instalada no solicita ningún permiso de internet ni de datos personales.
- **SC-004**: Se puede instalar una versión nueva encima de la anterior sin desinstalar y sin perder nada.
- **SC-005**: Partiendo de los pasos documentados, la persona responsable genera un archivo nuevo que se instala y funciona.
- **SC-006**: El repositorio no contiene claves ni archivos de firma, y las pruebas existentes siguen pasando.
- **SC-007**: El archivo instalable ocupa lo bastante poco como para descargarse con datos móviles y caber en móviles de gama baja (el plan fija el tamaño objetivo).

## Suposiciones

- **Cómo recibe la gente el archivo**: la persona responsable decide cómo lo reparte (un enlace de descarga, una carpeta compartida, un mensaje o un cable). La app no depende de ello y no necesita ningún servidor propio; el reparto queda fuera del producto.
- **Cuentas del desarrollador**: la restricción "sin cuentas" se refiere a quien usa la app. Generar el archivo puede requerir herramientas o servicios gratuitos que use la persona responsable; el plan elige el camino más simple y avisa si pide una cuenta.
- **Versión mínima de Android**: la que admita la versión de Expo del proyecto; el plan la fija y la guía la indica.
- **Nombre de la app e icono**: son los actuales (`MindTrainer` y los iconos ya incluidos en el proyecto); no se rediseñan.
- **Identificador del paquete**: un identificador estable y propio (por ejemplo, de tipo `com.<responsable>.mindtrainer`), que el plan propone y la persona responsable confirma, porque no se puede cambiar después sin crear otra app.
- **La app no guarda datos**: por eso instalar encima o desinstalar no hace perder nada.
- Que la guía se entienda y que la instalación sea cómoda lo comprueba una persona con un móvil Android; el agente no puede darlo por hecho.

## Fuera de alcance

iOS, publicación en Google Play u otras tiendas, actualizaciones automáticas, nuevas funciones o cambios en los juegos, pantalla de créditos, analítica o informes de errores.
