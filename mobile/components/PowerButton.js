import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Client } from 'paho-mqtt';

const PowerButton = () => {
    const [image, setImage] = useState(0);

    const TEMP_PUB_TOPIC = "/intellibreeze/app/manual/button";

    const images = [
        require("../assets/OtherIcons/power-on.png"),
        require("../assets/OtherIcons/power-off.png")
    ];

    const client = new Client("broker.hivemq.com", 8000, `WioTerminal-${parseInt(Math.random() * 100)}`);

    const handlePress = () => {
        const newState = image === 0 ? 1 : 0;
        setImage(newState);
        const message = newState === 0 ? 'HIGH' : 'LOW';
        client.connect({
            onSuccess: () => {
                console.log("Connected Successfully");
                client.publish("/intellibreeze/app/manual/button", message);
            },
            onFailure: () => {
                console.log("Connection Failed!");
            },
        });
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
