// Animación de victoria (spec 007, duración ampliada en la spec 008). Un solo sitio para activarla o apagarla y para su duración.
export const animacion = {
  // Apagada en las pruebas automáticas para que no las haga inestables.
  activa: process.env.NODE_ENV !== 'test',
  // Duración del fundido, en milisegundos (entre 800 y 1000).
  duracion: 900,
};
