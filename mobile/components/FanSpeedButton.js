import React from "react";
import { Text, View, StyleSheet, Button} from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

const FanSpeedButton = ({buttonTitle, buttonValue, buttonUnits}) =>{
    return(
    <View style={styles.fanButtonContainer}>
        <Text style={[styles.speedValue, styles.fanChild, {color: "blue"}]}>
          {buttonValue} {buttonUnits}
        </Text>
        <Text style={[styles.title, styles.fanChild, {color: "blue"}]}>{buttonTitle}</Text>
      </View>
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