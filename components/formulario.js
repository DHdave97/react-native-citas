
import React,{useState} from 'react';
import {Text,StyleSheet,View,TextInput,Button,TouchableHighlight,Alert,ScrollView} from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import shortid from 'shortid'
const Formulario = ({citas,setCitas,mostrarFormulario}) => {
    const [ paciente,guardarPaciente] = useState('')
    const [ propietario,guardarPropietario] = useState('')
    const [ telefono,guardarTelefono] = useState('')
    const [ sintomas,guardarSintomas] = useState('')

    const [ fecha,guardarFecha] = useState('')
    const [ hora,guardarHora] = useState('')
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };
  
    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };
    const handleConfirm = date => {
        console.warn("A date has been picked: ", date);
       const opciones = {year:'numeric',month:'long',day:'2-digit'};
        guardarFecha(date.toLocaleDateString('es-ES',opciones));
        hideDatePicker();
      };
    //for time
    const showTimePicker = () => {
        setTimePickerVisibility(true);
      };
    
      const hideTimePicker = () => {
        setTimePickerVisibility(false);
      };
      const handleConfirmTime = hora => {
        console.warn("A date has been picked: ", hora);
        const opciones = {hour:'numeric',minute:'2-digit',hour12:false};
        guardarHora(hora.toLocaleString('es-US',opciones));
        hideTimePicker();
      };

     

      //alertas
      const mostrarAlerta = () => {
        Alert.alert(
            'Error',
            'Todos los campos son obligatorios',
            [{
                text:'OK'
            }])
      }
       //crear cita
       const crearNuevaCita=()=>{
        //validar
        if(paciente.trim()=='' || sintomas.trim()=='' 
        || propietario.trim()=='' || telefono.trim()==''
        || fecha.trim()=='' || hora.trim()=='' ){
          mostrarAlerta()
        }
        //crear
        const cita = {paciente,propietario,telefono,fecha,hora,sintomas}
        cita.id = shortid.generate()
        //agregar al state
        const citas_nuevas = [... citas,cita]
        setCitas(citas_nuevas)
        console.log(citas_nuevas)
        //ocultar form
        mostrarFormulario(false)

    }

 
    return(
        <>
        <ScrollView style={styles.formulario}>
        <View>
            <Text style={styles.label}>Paciente:</Text>
            <TextInput style={styles.input} onChangeText={(texto)=>guardarPaciente(texto)} />
        </View>
        <View>
            <Text style={styles.label}>Dueño:</Text>
            <TextInput style={styles.input} onChangeText={(texto)=>guardarPropietario(texto)} />
        </View>
        <View>
            <Text style={styles.label}>Telefono/Contacto:</Text>
            <TextInput style={styles.input} 
            onChangeText={(texto)=>guardarTelefono(texto)} 
            keyboardType='numeric'
            />
        </View>
        <View>
      <Text style={styles.label}>Fecha</Text>

      <Button title="Seleccione la fecha" onPress={showDatePicker} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        locale='es_ES'
        headerTextIOS='Elige una fecha'
        cancelTextIOS='Cancelar'
        confirmTextIOS='Confirmar'
      />
      <Text>{fecha}</Text> 
    </View>
    <View>
    <Text style={styles.label}>Hora</Text>
      <Button title="Seleccione la hora" onPress={showTimePicker} />
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        locale='es_ES'
        headerTextIOS='Elige una hora'
        cancelTextIOS='Cancelar'
        confirmTextIOS='Confirmar'
        onConfirm={handleConfirmTime}
        onCancel={hideTimePicker}
      />
      <Text>{hora}</Text>
    </View>
        <View>
            <Text style={styles.label}>Sintomas:</Text>
            <TextInput 
            multiline
            style={styles.input} 
            onChangeText={(texto)=>guardarSintomas(texto)} 
            keyboardType='numeric'
            />
        </View>
        <View>
            <TouchableHighlight onPress={()=>crearNuevaCita()} style={styles.btnGuardar}>
                <Text style={styles.textoGuardar}>Guardar cita</Text>
            </TouchableHighlight>
        </View>
        </ScrollView>
       
        </>
    );
}
const styles = StyleSheet.create({
    formulario:{
        backgroundColor:'#fff',
        paddingHorizontal:20,
        paddingVertical:10,
       
    },
    label:{
       fontWeight:'bold',
       fontSize:18,
       marginTop:20 
    },
    input:{
        marginTop:10,
        height:50,
        borderColor:'#e1e1e1',
        borderWidth:1,
        borderStyle:'solid'
    },
    btnGuardar:{
        padding:10,
        backgroundColor:'#7d024e',
        marginVertical:10,
        borderRadius:10
    },
    textoGuardar:{
        color:'#fff',
        fontWeight:'bold',
        textAlign:'center'

    }
});
export default Formulario;