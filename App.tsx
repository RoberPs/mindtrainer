import { useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { actividades as registro } from './src/actividades/registro';
// Para la comprobación manual con actividades de ejemplo, sustituir la línea de arriba por:
// import { ejemplos as registro } from './src/actividades/ejemplos';
import type { Actividad } from './src/actividades/tipos';
import { Bienvenida } from './src/pantallas/Bienvenida';
import { Inicio } from './src/pantallas/Inicio';
import { MarcoActividad } from './src/pantallas/MarcoActividad';
import { tema } from './src/tema';

type Props = {
  // Las pruebas pasan sus propias actividades; la app real usa el registro.
  actividades?: Actividad[];
};

export default function App({ actividades = registro }: Props) {
  const [abierta, setAbierta] = useState<Actividad | null>(null);
  const [bienvenidaVista, setBienvenidaVista] = useState(false);

  return (
    <View style={estilos.pantalla}>
      {!bienvenidaVista ? (
        <Bienvenida alEmpezar={() => setBienvenidaVista(true)} />
      ) : abierta ? (
        <MarcoActividad actividad={abierta} alVolver={() => setAbierta(null)} />
      ) : (
        <Inicio actividades={actividades} alAbrir={setAbierta} />
      )}
      <StatusBar style="dark" />
    </View>
  );
}

const estilos = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: tema.colores.fondo,
    paddingTop: Platform.OS === 'ios' ? 56 : 32,
  },
});
