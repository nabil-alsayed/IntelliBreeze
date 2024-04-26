import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FanSpeedScreen = () => {
    return(
        <View style = {styles.container}> 
            <Text> Hello gay skillz</Text>
        </View>


    );
} 

const styles = StyleSheet.create({
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