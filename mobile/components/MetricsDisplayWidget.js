import React from "react";
import { View, StyleSheet } from "react-native";
import Metric from "./Metric";

const MetricsDisplayWidget = (props) => {
  return (
    <View style={styles.container}>
      <Metric
        metricName="Temperature"
        metricValue={props.value}
        metricUnit="°c"
      />
      <Metric metricName="Humidity" metricValue="20" metricUnit="%" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row", // Aligns children (Metric components) in a row
    // justifyContent: "space-around", // Even spacing around the Metric components
    justifyContent: "space-evenly",
    columnGap: 15,
    width: "100%", // Full width to contain the Metric components
  },
});

export default MetricsDisplayWidget;
