import React, {useContext, useEffect, useState} from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {FontAwesome6} from '@expo/vector-icons';
import {connectToMqtt, publishToTopic} from "../utils/mqttUtils";
import {useTopicSubscription} from "../hooks/useTopicSubscription";
import {TemperatureContext} from "../contexts/TemperatureContext";

const TEMP_UNIT_TOPIC = "/intellibreeze/app/tempUnit"
const TEMP_PUB_TOPIC =  "/intellibreeze/sensor/temperature"

const Metric = ({ iconName, metricName, metricValue, metricUnit}) => {
    const {
        unit,
        setUnit
    } = useContext(TemperatureContext);
    const [temperature, setTemperature] = useState(0);
    const temperatureTopic = "/intellibreeze/sensor/temperature";
    const topicName = "temperature";

    const convertSubscribedTemperature = (subscribedTemp) => {
        let newTemp;
        if (unit === '°C') {
            // Convert Celsius temperature to Fahrenheit
            newTemp = subscribedTemp;

        } else if (unit === '°F') {
            // Convert Fahrenheit temperature to Kelvin
            newTemp = (subscribedTemp * 9 / 5) + 32;

        } else {
            // Convert Kelvin temperature to Celsius
            newTemp = subscribedTemp + 273;
        }
        setTemperature(newTemp);
    }

    // Subscribe for Temperature
    useTopicSubscription((newTemperature) => {
        convertSubscribedTemperature(newTemperature);
    }, temperatureTopic, topicName);

    const publishChangedTempUnit = () => {
        let newUnit;

        if (unit === '°C') {
            // Change Celsius unit to Fahrenheit unit
            newUnit = '°F';
            setUnit(newUnit);
            console.log(newUnit);
        } else if (unit === '°F') {
            // Change Fahrenheit unit to Kelvin unit
            newUnit = 'K';
            setUnit(newUnit);
            console.log(newUnit);
        } else {
            // Convert Kelvin unit to Celsius unit
            newUnit = '°C';
            setUnit(newUnit);
            console.log(newUnit);
        }

        const client = connectToMqtt();
        console.log(newUnit);
        client.onConnected = () => {
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
                    <TouchableOpacity onPress={publishChangedTempUnit}>
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