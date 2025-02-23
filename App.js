import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native';

let timer = null
let ss = 0
let mm = 0
let hh = 0

let ultimos = []

export default function App() {

  const [numero, setNumero] = useState(0)
  const [botao, setaBotao] = useState('Iniciar!')
  const [ultimo, setUltimo] = useState(null)

  function vai(){
    if(timer !== null){
      clearInterval(timer)
      timer = null
      setaBotao('Iniciar!')
    } else {
      timer = setInterval(()=> {
        ss++
        if (ss == 60){
          ss = 0
          mm++
        }

        if (mm == 60){
          mm = 0
          hh++
        }

        let format = (hh < 10 ? '0' + hh : hh) + ':' + (mm < 10 ? '0' + mm : mm) + ':' + (ss < 10 ? '0' + ss : ss)
        setNumero(format)
      }, 100)
      setaBotao('Pausar')
    }
  }

  function volta(){
    if (numero !== 0){
      ultimos.unshift(numero)
      setUltimo(`Volta: ${ultimos[ultimos.length - 1]}`)
    } else {
      setUltimo(null)
    }
  }

  function reset(){
    if (timer !== null) {
      clearInterval(timer)
      timer = null
      ultimos = []
    }

    setUltimo(null)
    setNumero(0)
    ss = 0
    mm = 0
    hh = 0

    setaBotao('Iniciar!')
  }

  return (
    <View style={styles.container}>
      <Image
        source={require('./src/images/crono.png')}
        style={styles.image}
      />

      <Text style={styles.timer}>{numero}</Text>

      <StatusBar style="auto" />

      <View style={styles.btnArea}>
        <TouchableOpacity style={styles.btn} onPress={vai}>
          <Text style={styles.btnTexto}>{botao}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.btn]} onPress={volta}>
          <Text style={styles.btnTexto}>Volta</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={reset}>
          <Text style={styles.btnTexto}>Reset</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tempos}>
        <FlatList
          data={ultimos}
          keyExtractor={item => item}
          renderItem={({item}) => {
            return (
              <Text style={styles.volta}>
                {item}
              </Text>
            )
          }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00aeef',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  image: {
    marginTop: 20,
  },
  timer: {
    marginTop: -160,
    fontSize: 45,
    fontWeight: 'bold',
    color: '#fff'
  },
  btnArea: {
    flexDirection: 'row',
    marginTop: 130,
    height: 40
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 40,
    margin: 17,
    borderRadius: 9
  },
  btnTexto: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00aeef'
  },
  tempos: {
    marginTop: 40,
    width: '100%',
    flex: 1,
    alignItems: 'center'
  },
  flatList: {
    flexGrow: 1,
  },
  volta: {
    fontSize: 23,
    color: '#fff',
    fontStyle: 'italic'
  }
});
