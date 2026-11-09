# Guía de comprobación: Mejora visual de "Diferencias"

## Preparación

```bash
npm install        # incluye react-native-svg
npm run typecheck
npm test           # deben pasar las pruebas de Diferencias y las del resto
npm start          # abrir la app en un móvil con Expo Go
```

Hace falta una persona con un móvil para los puntos 1 a 6 (el agente no puede darlos por hechos).

## Comprobaciones con la app

1. **Dos dibujos completos (SC-001)**: abrir "Diferencias". La partida empieza sin pedir cuántas diferencias. Se ven los dos dibujos enteros, del mismo tamaño y alineados, sin acercar. En un móvil muy pequeño puede hacer falta desplazar la pantalla para ver el aviso de fallo, pero nunca para ver un dibujo cortado.
2. **Dibujos nítidos y vivos (historia 1)**: cada objeto se reconoce a primera vista, con contorno oscuro y colores vivos, y todos tienen el mismo estilo.
3. **Exactamente 3 diferencias (SC-002, SC-003)**: en cada escena hay un objeto de otro color, uno que falta arriba y uno añadido abajo. La pantalla dice "Te faltan 3 diferencias". Tocar cada una la marca con un círculo en los dos dibujos y baja la cuenta. Al marcar la tercera aparece la felicitación con "las 3 diferencias". No se encuentra ninguna otra.
4. **Fallo (casos límite)**: tocar un sitio sin diferencia muestra el aviso amable de siempre y suma un toque. Tocar una diferencia ya marcada no cambia nada.
5. **Escenas distintas (SC-004)**: jugar 3 partidas seguidas con "Jugar otra vez": aparece más de una escena (nunca la misma dos veces seguidas).
6. **Botones (SC-005)**: en la felicitación, "Jugar otra vez" y "Volver al inicio" muestran un icono grande junto a su texto.
7. **Otras actividades (FR-010)**: abrir Parejas, Forma la palabra, Sopa de letras y Adivinanzas; funcionan igual que antes (la elección de número de Sopa de letras sigue ahí).

## Comprobaciones de licencia (SC-007)

- Los dibujos de las escenas están hechos en el proyecto: no se ha descargado ninguna imagen (`git status` no muestra imágenes nuevas en `assets/`).
- La única dependencia nueva es `react-native-svg` (MIT). La persona responsable debe aceptar de forma expresa su aviso de licencia al cerrar la spec (ver `research.md`, punto 2).

## Pruebas automáticas (resumen)

- Escenas: 3 cambios por escena, uno de cada tipo, zonas válidas, dibujos iguales salvo en los cambios, al menos 2 escenas.
- Juego: acierto, fallo, diferencia repetida, final al encontrar las 3, puntuación (toques).
- Pantalla: sin elegir número, dos dibujos, marcado, felicitación, "Jugar otra vez" con icono y texto, escena distinta en la partida siguiente.
