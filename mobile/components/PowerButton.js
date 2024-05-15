import React, {useContext, useEffect, useState} from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import {connectToMqtt, publishToTopic} from "../utils/mqttUtils";
import {ModeFormContext} from "../contexts/ModeFormContext";
import { AntDesign } from '@expo/vector-icons';

const PowerButton = () => {
    const { fanIsOn, setFanIsOn } = useContext(ModeFormContext)

    const FAN_TOGGLE_PUB_TOPIC = "/intellibreeze/app/manual/button";


    const handlePress = () => {
        const message = !fanIsOn ? 'HIGH' : 'LOW'; // if the newState is on, let message be HIGH otherwise LOW        console.log("FAN: " + newFanState);
        try{
            const client = connectToMqtt(); // connect to mqtt
            setFanIsOn(!fanIsOn);
            client.onConnected = () => { // on connection
                console.log("Successfully connected to MQTT.");
                publishToTopic(client, FAN_TOGGLE_PUB_TOPIC, message, "fan on/off toggle"); // publish topic with client, message HIGH or LOW and topicName
                console.log("Successfully published " + message + " to MQTT.");
            }
            console.log("Successfully published toggle value!");
        }catch(error){
            console.error("Failed to publish toggle value", error);
        }
    }

    return(
        <TouchableOpacity onPress={handlePress}>
            <View style={[styles.buttonContainer, {backgroundColor: fanIsOn ? "#2196F3FF" : "#999797"}]}>
                <AntDesign name="poweroff" size={24} color="black" size={55} color={"white"}/>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    buttonContainer:{
        justifyContent:"center",
        alignItems:"center",
        padding:25,
        borderRadius:100
    }
});

export default PowerButton;
