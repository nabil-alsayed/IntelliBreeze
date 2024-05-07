import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Client } from 'paho-mqtt';
import {connectToMqtt, publishToTopic} from "../utils/mqttUtils";

const PowerButton = () => {
    const [image, setImage] = useState(0);

    const FAN_TOGGLE_PUB_TOPIC = "/intellibreeze/app/manual/button";

    const images = [
        require("../assets/OtherIcons/power-on.png"),
        require("../assets/OtherIcons/power-off.png")
    ];

    const client = new Client("broker.hivemq.com", 8000, `WioTerminal-${parseInt(Math.random() * 100)}`);

    const handlePress = () => {
        const newState = image === 0 ? 1 : 0;
        setImage(newState);
        const message = newState === 0 ? 'HIGH' : 'LOW';

        try{
            const client = connectToMqtt();

            client.onConnected = () => {
                console.log("Successfully connected to MQTT.");
                publishToTopic(client, FAN_TOGGLE_PUB_TOPIC, message, "fan on/off toggle");
            }
            console.log("Successfully published toggle value!");
        }catch(error){
            console.error("Failed to publish toggle value", error);
        }

    }

    return(
      <View>
        <TouchableOpacity onPress={handlePress}>
          <Image style={styles.buttonImage} source={images[image]} />  
        </TouchableOpacity>
      </View>
    );
}  

const styles = StyleSheet.create({
    buttonImage: {
      width: 100,
      height: 100,
    }
});

export default PowerButton;
