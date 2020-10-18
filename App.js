
import React, { useState } from 'react';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  TouchableHighlight,Platform,
  TouchableWithoutFeedback,Keyboard
} from 'react-native';
import Formulario from './components/formulario'
import Cita from './components/cita'
const App = () => {
  //definir el state de citas
  const [mostrarform, guardarMostrar] = useState(false)
  const [citas, setCitas] = useState([]);

  //ELIMINAR PACIENTS
  const eliminarPaciente = id => {
    setCitas((citasActuales) => {
      return citasActuales.filter(cita => cita.id != id)
    })
  }
  //mostrar formulario
  const mostrarFormulario = () => {
    guardarMostrar(!mostrarform)
  }
  const cerrarTeclado = () => {
    Keyboard.dismiss()
  }
  
  return (
    <TouchableWithoutFeedback onPress={()=>cerrarTeclado()}>
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Administrador de Citas</Text>
      <View>
            <TouchableHighlight onPress={()=>mostrarFormulario()} style={styles.btnMostrarForm}>
  <Text style={styles.textoMostrarForm}>{ mostrarform ? 'Cancelar cita':'Agregar cita'}</Text>
            </TouchableHighlight>
        </View>
      <View style={styles.contenido}>
        {mostrarform ? (
        <>
         <Text style={styles.titulo}>Crear nueva cita</Text>
        <Formulario 
          citas={citas}
          setCitas={setCitas}
          mostrarFormulario={mostrarFormulario}
        />
        </>
        ) : (
          <>
            <Text style={styles.titulo}>{citas.length > 0 ? 'Administra tus citas' : 'No hay citas, agrega una.'}</Text>
            <FlatList
              style={styles.listado}
              data={citas}
              renderItem={({ item }) => <Cita cita={item} eliminarPaciente={eliminarPaciente} />}
              keyExtractor={cita => cita.id}
            />
          </>
        )}


      </View>

      {/*citas.map(cita=>(
      <View>
        <Text>{cita.paciente}</Text>
      </View>
        ))*/}
    </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  contenido: {
    flex: 1,
    marginHorizontal: '2.5%'
  },
  contenedor: {
    backgroundColor: '#AA076B',
    flex: 1
  },
  titulo: {
    color: '#fff',
    marginTop: Platform.OS === 'ios' ? 40:20,
    marginBottom: 20,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  listado: {
    flex: 1
  },
  btnMostrarForm:{
    padding:10,
    backgroundColor:'#7d024e',
    marginVertical:10,
    borderRadius:10
},
textoMostrarForm:{
    color:'#fff',
    fontWeight:'bold',
    textAlign:'center'

}
})

export default App;
