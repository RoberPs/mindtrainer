# Modelo de datos: spec 009

No hay datos guardados. Solo cambian estas definiciones:

- **Paleta** (`src/tema.ts`): fondo crema, texto azul oscuro, `primario` (azul `#1F53B4`), `textoSobrePrimario` (blanco), `acierto`, `marca`, `velo` y `actividades`: cinco pares `{ fondo, texto }` (azul, verde, naranja, magenta, gris azulado). Desaparecen `morado`, `marron` y `verdeAzulado`.
- **Actividad** (`src/actividades/tipos.ts`): se añade `colorTexto?: string`. `color` sigue siendo el fondo; sin `colorTexto`, es blanco; sin `color`, el azul principal.
- **ColorJuego** (contexto): `{ fondo: string; texto: string }`. Valor por defecto: `{ primario, textoSobrePrimario }`.
- **Estado de `App`**: `bienvenidaVista: boolean` y `abierta: Actividad | null`. Orden de pantallas: bienvenida → lista → actividad; "Volver al inicio" lleva a la lista.
