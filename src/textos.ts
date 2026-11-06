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
  etiqueta: 'Busca 3 palabras relacionadas con:',
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
  felicitacion: '¡Enhorabuena! Has encontrado las 3 palabras',
  intentosNecesitados: (n: number) => (n === 1 ? 'Has necesitado 1 intento' : `Has necesitado ${n} intentos`),
  jugarOtraVez: 'Jugar otra vez',
  celda: (letra: string, fila: number, columna: number) => `Letra ${letra}, fila ${fila}, columna ${columna}`,
};
