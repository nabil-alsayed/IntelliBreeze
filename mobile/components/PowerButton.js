import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import {connectToMqtt, publishToTopic} from "../utils/mqttUtils";

const PowerButton = () => {
    const [image, setImage] = useState(0);

    const FAN_TOGGLE_PUB_TOPIC = "/intellibreeze/app/manual/button";

    const images = [
        require("../assets/OtherIcons/power-on.png"),
        require("../assets/OtherIcons/power-off.png")
    ];

    const handlePress = () => {
        const newState = image === 0 ? 1 : 0; // if image at power on when on press do power off and vice versa
        setImage(newState);
        const message = newState === 0 ? 'HIGH' : 'LOW'; // if the newState is on, let message be HIGH otherwise LOW

        try{
            const client = connectToMqtt(); // connect to mqtt

            client.onConnected = () => { // on connection
                console.log("Successfully connected to MQTT.");
                publishToTopic(client, FAN_TOGGLE_PUB_TOPIC, message, "fan on/off toggle"); // publish topic with client, message HIGH or LOW and topicName
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
