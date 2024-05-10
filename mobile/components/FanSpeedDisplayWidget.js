import React, {useEffect, useState} from "react";
import { View, StyleSheet } from "react-native";
import FanSpeedButton from "./FanSpeedButton";
import {connectToMqtt, subscribeToTopic} from "../utils/mqttUtils";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";


const FanSpeedDisplayWidget = () => {
  
  const navigation = useNavigation();
  
  const handleButtonPress = () => {
    navigation.navigate("FanSpeedScreen");};

    const [fanSpeed, setFanSpeed] = useState(0);

  useEffect(()=>{

      const MANUAL_FAN_SPEED_PUB_TOPIC = "/intellibreeze/app/manual/fanspeed";
      const AUTO_FAN_SPEED_SUB_TOPIC = "/intellibreeze/sensor/automatic/fanspeed";

      const handleMessage = (message) =>{
          setFanSpeed(parseInt(message.payloadString));
          console.log("fan speed (Auto Mode)", message.payloadString);
      }

      try{
          const client = connectToMqtt(); // connect to mqtt

          client.onConnected = () => { // on connection
              console.log("Successfully connected to MQTT.");
              subscribeToTopic(client, handleMessage, AUTO_FAN_SPEED_SUB_TOPIC, "Subscribing to auto fan Speed");
          }
          console.log("Successfully subscribed to auto fan speed");
      }catch(error){
          console.error("Failed to subscribed to auto fan speed", error);
      }

  })


  return (
    <View style={styles.container}>
        <FanSpeedButton
        buttonTitle = "Fan Speed"
        buttonValue = {fanSpeed}
        buttonUnits = "cycles"
        onPress= {handleButtonPress}
          />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row", // Aligns children (Metric components) in a row
    justifyContent: "flex-start",
    width: "100%", // Full width to contain the Metric components
  },
});

export default FanSpeedDisplayWidget;