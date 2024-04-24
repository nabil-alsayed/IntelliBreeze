import React from "react";
import { View, StyleSheet } from "react-native";
import FanSpeedButton from "./FanSpeedButton";
import { Colors } from "react-native/Libraries/NewAppScreen";

const FanSpeedDisplayWidget = (props) => {
  return (
    <View style={styles.container}>
        <FanSpeedButton
        buttonTitle = "Fan Speed"
        buttonValue = {props.value}
        buttonUnits = "rpm"
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row", // Aligns children (Metric components) in a row
    padding: 10,
    // justifyContent: "space-around", // Even spacing around the Metric components
    justifyContent: "flex-start",
    width: "100%", // Full width to contain the Metric components
    justifyContent: "center",
  },
});

export default FanSpeedDisplayWidget;