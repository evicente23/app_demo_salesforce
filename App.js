import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  StatusBar,
} from 'react-native';
import autos from './src/services/autos';

export default function App() {
  const [carros, setCarros] = React.useState([]);
  const [cargando, setCargando] = React.useState(true);

  const cargarCarros = () => {
    let lista = [];
    const uri = 'https://personaliza.kiaecuador.com.ec';
    setCargando(true);
    autos
      .lista()
      .then(data => data.data)
      .then(asd => {
        asd.map(i => {
          lista.push({
            src: uri + i.dt4,
            alt: i.dt1,
          });
          i.elements.map(j => {
            lista.push({
              src: uri + j.dt4,
              alt: j.dt1,
            });
          });
        });
        setCarros(lista);
        setCargando(false);
      });
  };

  const list = () => {
    return carros.map(element => {
      return (
        <Image
          key={element.alt}
          source={{uri: element.src}}
          resizeMode="contain"
          style={styles.imagen}
        />
      );
    });
  };

  useEffect(() => {
    cargarCarros();
  }, []);

  return (
    <SafeAreaView style={styles.main}>
      <StatusBar
        animated={true}
        backgroundColor="#fff"
        barStyle="dark-content"
        showHideTransition="fade"
        hidden={false}
      />
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollView} style={{flex: 1}}>
          <Text style={styles.titulo}>
            <Image
              source={{
                uri: 'https://hirereactnativedeveloper.com/images/react_icon.png',
              }}
              style={styles.imagenLogo}
            />
            Lista de vehículos Kia Ecuador.
          </Text>
          {cargando && <ActivityIndicator size="large" color="#fff" />}
          {!cargando && list()}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ECF0F1',
  },
  titulo: {
    marginLeft: 10,
    fontSize: 25,
    color: '#fff',
    marginBottom: 20,
    paddingTop: 30,
  },
  container: {
    flex: 1,
    paddingTop: 10,
  },
  scrollView: {
    backgroundColor: '#05141f',
    flexGrow: 1,
  },
  imagen: {
    width: '100%',
    height: 400,
    resizeMode: 'cover',
    backgroundColor: '#05141f',
  },
  imagenLogo: {
    width: 25,
    height: 25,
  },
});
