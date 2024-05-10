import React, { useEffect, useState} from "react";
import {StyleSheet, Text, View} from "react-native";
import {FontAwesome6} from '@expo/vector-icons';
import {connectToMqtt, publishToTopic, subscribeToTopic} from "../utils/mqttUtils";

const TEMP_UNIT_TOPIC = "/intellibreeze/app/tempUnit" //TODO: Move To Constants
const TEMP_PUB_TOPIC =  "/intellibreeze/sensor/temperature" //TODO: Move To Constants

const Metric = ({ iconName, metricName, metricValue, metricUnit}) => { //TODO: Enhance SOLID
    const [unit, setUnit] = useState('°C'); //
    const [temperature, setTemp] = useState(0);


    useEffect(() => {
        setTemp(metricValue);
        setUnit(metricUnit);
    }, [metricValue, metricUnit]);



    const client = connectToMqtt();

    const convertTemperature = () => {

        if (unit === '°C') {
            // Convert Celsius to Fahrenheit
            const newTemp = (temperature * 9/5) + 32;
            setTemp(Math.round(newTemp));
            setUnit('°F');
        } else if (unit === '°F'){
            // Convert Fahrenheit to Celsius
            const newTemp = (((temperature - 32) * 5/9) + 273);
            setTemp(Math.round(newTemp));
            setUnit('K');

        }else {
            // Convert Fahrenheit to Kelvin
            const newTemp = temperature - 273 ;
            setTemp(Math.round(newTemp));
            setUnit('°C');

        }
    };

    const onMessageArrived = (message) => {
        console.log("temperature:", message.payloadString);
        if (message.destinationName === TEMP_PUB_TOPIC) {
            setTemp(parseInt(message.payloadString));
        }
    };

    client.onConnected = () => {
        subscribeToTopic(client, onMessageArrived, TEMP_PUB_TOPIC, "currentTemp")
        publishToTopic(client, TEMP_UNIT_TOPIC, unit, "currentTemperature" );
        console.log(unit);
    };
    return (
        <View style={styles.container}>
            <View style={styles.metricValueIcon}>
                <FontAwesome6 name={ iconName } size={24} color={metricName === "Humidity" ? "skyblue" : "black"}/>
                {/*Value*/}
                <Text style={[styles.value, styles.child]}>
                    {temperature}
                </Text>
                {/*Unit*/}
                <Text style={[styles.value, styles.child, metricName === "Temperature" ? styles.temperature : {}]} onPress={convertTemperature}>
                    {unit}
                </Text>
            </View>
            <Text style={[styles.name, styles.child]}>{metricName}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flex: 1,
        minHeight: 120,
        padding: 20,
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        backgroundColor: "#fff",
        borderRadius: 20,
    },
    value: {
        fontWeight: "bold",
        fontSize: 20,
    },
    name: {
        color: "#000",
        fontSize: 20,
    },
    metricValueIcon:{
      flexDirection:"row",
      columnGap: 10,
    },
    temperature:{
        textDecorationLine: "underline",
    }
});

export default Metric;