import React, {useState} from "react";
import { View, StyleSheet } from "react-native";
import Metric from "./Metric";
import {convertTemperature} from "./Metric";

const MetricsDisplayWidget = (props) => {
    const [metricUnit, setMetricUnit] = useState("C");
    const sendUnitData = (e) => {
        e.preventDefault();
        props.onSubmit(convertTemperature())
    }
  return (
    <View style={styles.container}>
        <MetricsDisplayWidget onSubmit={sendUnitData}/>
      <Metric
        iconName="temperature-half"
        metricName="Temperature"
        metricValue={props.value}
        metricUnit="°C"
        convertTemperature
      />
      <Metric iconName= "droplet" metricName="Humidity" metricValue="20" metricUnit="%" />
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
