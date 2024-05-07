import React, {useState} from "react";
import { View, StyleSheet } from "react-native";
import FanSpeedButton from "./FanSpeedButton";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const FanSpeedDisplayWidget = ({ value, navigation }) => {
    const handleButtonPress = () => {
      navigation.navigate("FanSpeedScreen");
    };
  return (
    <View style={styles.container}>
        <FanSpeedButton
        buttonTitle = "Fan Speed"
        buttonValue = {"23"}
        buttonUnits = "rpm"
        onPress= {handleButtonPress}
          />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row", // Aligns children (Metric components) in a row
    justifyContent: "flex-start",
    width: "100%", // Full width to contain the Metric components
  },
});

export default FanSpeedDisplayWidget;