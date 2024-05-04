import React, {useState} from "react";
import { View, StyleSheet } from "react-native";
import Metric from "./Metric";
import {useTemperatureSubscription} from "../hooks/useTemperatureSubscription";

const MetricsDisplayWidget = () => {
    const [temperature, setTemperature] = useState(0);

    useTemperatureSubscription((newTemperature) => {
        setTemperature(newTemperature);
    });

    return (
        <View style={styles.container}>
            <Metric
                iconName="temperature-half"
                metricName="Temperature"
                metricValue={temperature}
                metricUnit="°C"
            />
            <Metric iconName="droplet" metricName="Humidity" metricValue="20" metricUnit="%" />
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
