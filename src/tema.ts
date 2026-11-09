// Tema accesible para personas mayores (FR-010). Un solo sitio para todos los tamaños y colores.
export const tema = {
  colores: {
    fondo: '#FFFFFF',
    texto: '#111111',
    primario: '#0B3D91',
    textoSobrePrimario: '#FFFFFF',
    tarjeta: '#F2F5FA',
    borde: '#0B3D91',
    acierto: '#1B5E20', // verde oscuro para las parejas encontradas
    velo: 'rgba(0, 0, 0, 0.6)',
    marca: '#A0001C', // rojo oscuro de los círculos de las diferencias encontradas
    // Un color por actividad en la lista de inicio. Todos superan 7 a 1 con texto blanco.
    actividades: {
      azul: '#0B3D91',
      verde: '#1B5E20',
      morado: '#5B2A86',
      marron: '#7A3E00',
      verdeAzulado: '#006064',
    },
  },
  letra: {
    normal: 22, // mínimo 22 puntos
    titulo: 28,
  },
  boton: {
    altoMinimo: 64, // mínimo 64 puntos de alto
  },
  icono: {
    tamano: 48,
  },
  grosor: {
    circulo: 6, // borde grueso: se ve aunque no se distingan los colores
  },
  contrasteMinimo: 7, // al menos 7 a 1 entre texto y fondo
  espacio: 16,
};
