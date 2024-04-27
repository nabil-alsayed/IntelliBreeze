import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const FanSpeedScreen = () => {
    return(
      <View>
        <View style = {styles.container}> 
            <Text> Fan Speed Slider Example</Text>
        </View>

        <View style = {styles.container}> 
        <Text> Fan Speed Slider Example</Text>
        </View>

        <View style = {styles.button}> 
          <Image> style = {styles.image} source={require("../assets/Power.png")}</Image>
        </View>
      
      </View>
    );
} 

const styles = StyleSheet.create({
    button: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
    image: {
      width: 100,
      height: 100
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