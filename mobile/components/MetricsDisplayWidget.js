/*
<<<<<<< HEAD
import React, {useEffect, useState} from "react";
import { View, StyleSheet } from "react-native";
import Metric from "./Metric";
import {connectToMqtt, subscribeToTopic} from "../utils/mqttUtils";


const MetricsDisplayWidget = () => {
    const [tempValue, setTemperature] = useState(0);

    useEffect(()=>{

        const TEMP_SUB_TOPIC = "/intellibreeze/sensor/temperature";

        const handleMessage = (message) =>{
            setTemperature(parseInt(message.payloadString));
            console.log("fan speed (Auto Mode)", message.payloadString);
        }

        try{
            const client = connectToMqtt(); // connect to mqtt

            client.onConnected = () => { // on connection
                console.log("Successfully connected to MQTT.");
                subscribeToTopic(client, handleMessage, TEMP_SUB_TOPIC, "Subscribing to temperature");
            }
            console.log("Successfully subscribed to temperature");
        }catch(error){
            console.error("Failed to subscribed to temperature", error);
        }

    })

    return (
    <View style={styles.container}>
      <Metric
        iconName="temperature-half"
        metricName="Temperature"
        metricValue={tempValue}
        metricUnit="°C"
      />
      <Metric iconName= "droplet" metricName="Humidity" metricValue="20" metricUnit="%" />
    </View>
  );
};
=======
*/


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

