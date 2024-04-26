import React from "react";
import { Text, View, StyleSheet, TouchableOpacity} from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const FanSpeedButton = ({buttonTitle, buttonValue, buttonUnits, onPress}) =>{
    return(
    <TouchableOpacity onPress = {onPress} style={styles.fanButtonContainer}>
        <Text style={[styles.speedValue, styles.fanChild, {color: "blue"}]}>
          {buttonValue} {buttonUnits}
        </Text>
        <Text style={[styles.title, styles.fanChild, {color: "blue"}]}>{buttonTitle}</Text>
      </TouchableOpacity>
    );    
};

const styles = StyleSheet.create({
    fanButtonContainer: {
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
    fanChild: {
      margin: 3,
    },
    speedValue: {
      fontWeight: "bold",
      fontSize: 20,
    },
    title: {
      fontSize: 15,
    }
  });

  export default FanSpeedButton;