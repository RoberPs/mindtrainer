// Todos los textos fijos de la app, en español de España.
export const textos = {
  volverAlInicio: 'Volver al inicio',
  avisoSalir: '¿Seguro que quieres salir? Perderás la partida',
  siSalir: 'Sí, salir',
  noSeguir: 'No, seguir jugando',
};

// Textos de la actividad "Parejas".
export const textosParejas = {
  nombre: 'Parejas',
  descripcion: 'Encuentra las cartas iguales',
  elegirTamano: 'Elige el tamaño de la partida',
  pequena: 'Pequeña: 6 cartas',
  mediana: 'Mediana: 8 cartas',
  grande: 'Grande: 12 cartas',
  intentos: 'Intentos',
  seguir: 'Seguir',
  carta: 'Carta',
  felicitacion: '¡Enhorabuena! Has encontrado todas las parejas',
  intentosNecesitados: (n: number) => (n === 1 ? 'Has necesitado 1 intento' : `Has necesitado ${n} intentos`),
  jugarOtraVez: 'Jugar otra vez',
  dibujos: {
    llave: 'Llave',
    taza: 'Taza',
    reloj: 'Reloj',
    gafas: 'Gafas',
    cama: 'Cama',
    silla: 'Silla',
    lampara: 'Lámpara',
    tijeras: 'Tijeras',
    paraguas: 'Paraguas',
    telefono: 'Teléfono',
    libro: 'Libro',
    sombrero: 'Sombrero',
  },
};

// Textos de la actividad "Forma la palabra".
export const textosFormaPalabra = {
  nombre: 'Forma la palabra',
  descripcion: 'Ordena las letras para formar la palabra',
  comprobar: 'Comprobar',
  borrarUltima: 'Borrar última letra',
  empezarDeNuevo: 'Empezar de nuevo',
  verRespuesta: 'Ver la respuesta',
  siguiente: 'Siguiente',
  verResultado: 'Ver resultado',
  jugarOtraVez: 'Jugar otra vez',
  acierto: '¡Muy bien! Has formado la palabra',
  fallo: 'Todavía no es esa. Inténtalo otra vez',
  incompleta: 'Completa la palabra antes de comprobar',
  laPalabraEs: (palabra: string) => `La palabra es: ${palabra}`,
  aciertos: (n: number) => `Has acertado ${n} de 5`,
};

// Textos de la actividad "Sopa de letras".
export const textosSopa = {
  nombre: 'Sopa de letras',
  descripcion: 'Encuentra las palabras escondidas',
  elegirTamano: 'Elige el tamaño de la sopa',
  pequena: 'Pequeña: 3 palabras',
  mediana: 'Mediana: 5 palabras',
  etiqueta: (n: number) => `Busca ${n} palabras relacionadas con:`,
  invitar: 'Ahora toca la última letra de la palabra',
  acierto: '¡Muy bien! Has encontrado una palabra',
  fallo: 'Esa no es una de las palabras. Inténtalo otra vez',
  noRecta: 'Marca una línea recta, en horizontal o en vertical',
  oculta: '???',
  palabraSinEncontrar: 'Palabra sin encontrar',
  faltan: (n: number) => {
    if (n === 0) return 'No te falta ninguna palabra';
    return n === 1 ? 'Te falta 1 palabra' : `Te faltan ${n} palabras`;
  },
  felicitacion: (n: number) => `¡Enhorabuena! Has encontrado las ${n} palabras`,
  intentosNecesitados: (n: number) => (n === 1 ? 'Has necesitado 1 intento' : `Has necesitado ${n} intentos`),
  jugarOtraVez: 'Jugar otra vez',
  celda: (letra: string, fila: number, columna: number) => `Letra ${letra}, fila ${fila}, columna ${columna}`,
};

// Textos de la actividad "Adivinanzas".
export const textosAdivinanzas = {
  nombre: 'Adivinanzas',
  descripcion: 'Descubre la respuesta de cada adivinanza',
  numero: (n: number) => `Adivinanza ${n} de 5`,
  acierto: '¡Muy bien! Esa es la respuesta correcta',
  fallo: (correcta: string) => `No pasa nada. La respuesta correcta es: ${correcta}`,
  siguiente: 'Siguiente',
  verResultado: 'Ver resultado',
  jugarOtraVez: 'Jugar otra vez',
  aciertos: (n: number) => `Has acertado ${n} de 5`,
  mensajeFinal: (n: number) => {
    if (n === 5) return '¡Perfecto! Las has acertado todas';
    if (n >= 3) return '¡Muy bien! Tienes buena memoria';
    return '¡Ánimo! Con la práctica saldrán más';
  },
};

export const textosDiferencias = {
  nombre: 'Diferencias',
  descripcion: 'Encuentra las diferencias entre dos dibujos',
  elegirNumero: 'Elige cuántas diferencias quieres buscar',
  tres: '3 diferencias',
  cinco: '5 diferencias',
  siete: '7 diferencias',
  instruccion: 'Toca en el dibujo de abajo lo que sea distinto',
  rotuloArriba: 'Dibujo de arriba',
  rotuloAbajo: 'Dibujo de abajo',
  faltan: (n: number) => (n === 1 ? 'Te falta 1 diferencia' : `Te faltan ${n} diferencias`),
  fallo: 'Ahí no hay ninguna diferencia. ¡Sigue buscando!',
  felicitacion: (n: number) => `¡Enhorabuena! Has encontrado las ${n} diferencias`,
  toques: (n: number) => `Has necesitado ${n} toques`,
  jugarOtraVez: 'Jugar otra vez',
};

// Textos de la pantalla de bienvenida y de la lista de juegos.
export const textosBienvenida = {
  nombreApp: 'MindTrainer',
  titulo: 'Empieza a entrenar tu mente',
  pregunta: '¿Listo para ejercitar tu memoria hoy?',
  empezar: 'Empezar',
  eligeJuego: 'Elige uno de los juegos',
};
