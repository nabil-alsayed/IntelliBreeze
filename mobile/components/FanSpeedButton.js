import React from "react";
import { Text, View, StyleSheet, Button } from "react-native";

const FanSpeedButton = ({FmetricName, FmetricValue, FmetricUnit}) =>{
    return(
    <View style={styles.Fcontainer}>
        <Text style={[styles.Fvalue, styles.Fchild]}>
          {FmetricValue} {FmetricUnit}
        </Text>
        <Text style={[styles.Fname, styles.Fchild]}>{FmetricName}</Text>
      </View>
    );    
};

const styles = StyleSheet.create({
    Fcontainer: {
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
    Fchild: {
      margin: 3,
    },
    Fvalue: {
      fontWeight: "bold",
      fontSize: 20,
    },
    Fname: {
      fontSize: 15,
    },
  });

  export default FanSpeedButton;