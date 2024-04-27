import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import PowerButton from '../components/PowerButton';

const FanSpeedScreen = () => {
    return(
      <View>
        <View style = {styles.container}> 
            <Text> Fan Speed Slider Example</Text>
        </View>

        <PowerButton style = {styles.button}/>

      </View>
    );
}  

const styles = StyleSheet.create({
    button: {
      flex: 1,
      backgroundColor: "#fff",
      flexDirection: 'column', // so that it goes to column
      alignItems: "center",  // align  button to center           
      justifyContent: "flex-end", // should flex to end but idk why u not working      
    },  
    container: {
      padding: 15,
      flexDirection: "column",
      borderRadius: 20,
      backgroundColor: "white",
      width: "45%",
      height: 150,
      margin: 5,
      alignItems: "center",
      justifyContent: "center",
    },
    child: {
      margin: 3,
    },
    value: {
      fontWeight: "bold",
      fontSize: 20,
    },
    name: {
      fontSize: 15,
    },
  });

  export default FanSpeedScreen;