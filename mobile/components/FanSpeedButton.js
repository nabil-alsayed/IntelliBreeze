import React from "react";
import { Text, StyleSheet, TouchableOpacity} from "react-native";
import {FontAwesome6} from '@expo/vector-icons';


const FanSpeedButton = ({buttonTitle, buttonValue, buttonUnits, onPress}) =>{
    return(
    <TouchableOpacity onPress = {onPress} style={styles.fanButtonContainer}>
      <FontAwesome6 name={ 'fan' } size={24} color = {"white"}/>
        <Text style={[styles.speedValue, styles.fanChild, {color: "white"}]}>
          {buttonValue} {buttonUnits}
        </Text>
        <Text style={[styles.title, styles.fanChild, {color: "white"}]}>{buttonTitle}</Text>
      </TouchableOpacity>
    );    
};

const styles = StyleSheet.create({
    fanButtonContainer: {
      padding: 15,
      flexDirection: "column",
      borderRadius: 20,
      backgroundColor: "#00BFFF",
      width: "45%",
      height: 150,
      margin: 5,
      alignItems: "center",
      justifyContent: "center",
    },
    fanChild: {
      margin: 3,
    },
    speedValue: {
      fontWeight: "bold",
      fontSize: 20,
    },
    title: {
      fontSize: 20,
    }
  });


  export default FanSpeedButton;