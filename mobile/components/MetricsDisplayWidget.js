import React, {useState} from "react";
import { View, StyleSheet } from "react-native";
import Metric from "./Metric";
import {useTopicSubscription} from "../hooks/useTopicSubscription";

const MetricsDisplayWidget = () => {
    const [temperature, setTemperature] = useState(0);
    const temperatureTopic = "/intellibreeze/sensor/temperature"; //TODO: Move to constants
    const topicName = "temperature"; //TODO: Move to constants

    // Subscribe for Temperature
    useTopicSubscription((newTemperature) => {
        setTemperature(newTemperature);
    }, temperatureTopic, topicName);

    return (
        <View style={styles.container}>
            <Metric
                iconName="temperature-half"
                metricName="Temperature"
                metricValue={temperature}
                metricUnit="°C"
            />
            <Metric iconName="droplet" metricName="Humidity" metricValue="20" metricUnit="%"/>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        columnGap: 15,
        width: "100%",
    },
});

export default MetricsDisplayWidget;

