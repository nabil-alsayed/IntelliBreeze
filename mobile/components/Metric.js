import React, { useEffect, useState} from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {FontAwesome6} from '@expo/vector-icons';
import {connectToMqtt, publishToTopic} from "../utils/mqttUtils";
import {useTopicSubscription} from "../hooks/useTopicSubscription";

const TEMP_UNIT_TOPIC = "/intellibreeze/app/tempUnit" //TODO: Move To Constants
const TEMP_PUB_TOPIC =  "/intellibreeze/sensor/temperature" //TODO: Move To Constants

const Metric = ({ iconName, metricName, metricValue, metricUnit}) => { //TODO: Enhance SOLID
    const [unit, setUnit] = useState('°C'); //
    const [temperature, setTemperature] = useState(0);
    const temperatureTopic = "/intellibreeze/sensor/temperature"; //TODO: Move to constants
    const topicName = "temperature"; //TODO: Move to constants

    // Subscribe for Temperature
    useTopicSubscription((newTemperature) => {
        setTemperature(newTemperature);
    }, temperatureTopic, topicName);

    const onMessageArrived = (message) => {
        console.log("temperature:", message.payloadString);
        if (message.destinationName === TEMP_PUB_TOPIC) {
            setTemperature(parseInt(message.payloadString));
        }
    };

    const convertTemperature = () => {
        let newTemp;
        let newUnit;

        if (unit === '°C') {
            // Convert Celsius to Fahrenheit
            newTemp = (temperature * 9 / 5) + 32;
            newUnit = '°F';
            setUnit(newUnit);
            console.log(newUnit);
        } else if (unit === '°F') {
            // Convert Fahrenheit to Kelvin
            newTemp = (((temperature - 32) * 5 / 9) + 273);
            newUnit = 'K';
            setUnit(newUnit);
            console.log(newUnit);
        } else {
            // Convert Kelvin to Celsius
            newTemp = temperature - 273;
            newUnit = '°C';
            setUnit(newUnit);
            console.log(newUnit);
        }

        const client = connectToMqtt();
        setTemperature(Math.round(newTemp));

        console.log(newTemp);
        console.log(newUnit);
        client.onConnected = () => {
            //subscribeToTopic(client, onMessageArrived, TEMP_PUB_TOPIC, "currentTemp")
            publishToTopic(client, TEMP_UNIT_TOPIC, newUnit, "TEMP_UNIT " );
            console.log(newUnit);
        };
    };




    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <FontAwesome6 name={"temperature-half"} size={30} />
            </View>
            <View style={styles.subContainer}>
                <View style={{flexDirection:'row', columnGap:5}}>
                    {/*Value*/}
                    <Text numberOfLines={1} style={{fontSize:25, fontWeight:"bold"}}>{temperature}</Text>
                    {/*Unit*/}
                    <TouchableOpacity onPress={convertTemperature}>
                        <Text numberOfLines={1} style={{fontSize:25, fontWeight:"bold", color:"#1881d5"}}>{unit}</Text>
                    </TouchableOpacity>
                </View>
                    <Text numberOfLines={1} style={{fontSize:15, fontWeight:"400"}}>
                        Your current room temperature
                    </Text>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 15,
        height: 100,
        borderRadius: 20,
        backgroundColor: "#fff",
        columnGap: 10,
        flexDirection: "row",
    },
    subContainer:{
        flex:1,
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
    },
    iconContainer: {
        height:60,
        width:60,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f3f3f3",
        borderRadius: 50,
    }
});

export default Metric;