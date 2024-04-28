import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import PowerButton from '../components/PowerButton';

const FanSpeedScreen = () => {
    return(
      <View>
        <View style = {styles.container}> 
            <Text> Fan Speed Slider Example</Text>
        </View>

        <View style = {styles.buttonContainer}>
          <PowerButton style = {styles.button}/>
        </View>

      </View>
    );
}  

const styles = StyleSheet.create({
    button: {
      backgroundColor: "#fff",
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
    buttonContainer: {
      flex: 1,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'flex-end',
      marginTop: 450,
      paddingRight: 30,
      marginLeft: 17
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