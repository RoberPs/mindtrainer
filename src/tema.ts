// Tema accesible para personas mayores (FR-010). Un solo sitio para todos los tamaños y colores.
// Paleta basada en el logo (spec 009). Los tonos del logo se oscurecen lo mínimo para llegar a 7 a 1.
export const tema = {
  colores: {
    fondo: '#FFF9F0', // crema del logo
    texto: '#1F2A44', // azul muy oscuro
    primario: '#1F53B4', // azul del logo, oscurecido
    textoSobrePrimario: '#FFFFFF',
    tarjeta: '#F7EEE0', // crema algo más oscuro para fichas y casillas
    borde: '#1F2A44',
    acierto: '#0F5A38', // verde oscuro de lo acertado (siempre con icono o texto)
    velo: 'rgba(0, 0, 0, 0.6)',
    marca: '#A0001C', // rojo oscuro de los círculos de las diferencias encontradas
    // Un color por actividad: fondo y color del texto. Todos superan 7 a 1.
    actividades: {
      azul: { fondo: '#1F53B4', texto: '#FFFFFF' },
      verde: { fondo: '#13653F', texto: '#FFFFFF' },
      naranja: { fondo: '#F2800D', texto: '#111111' },
      magenta: { fondo: '#A32752', texto: '#FFFFFF' },
      grisAzulado: { fondo: '#4C5974', texto: '#FFFFFF' },
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
