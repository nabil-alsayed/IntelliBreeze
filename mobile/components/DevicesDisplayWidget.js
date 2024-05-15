import React, {useContext, useEffect, useState} from "react";
import { View, Text, StyleSheet } from "react-native";
import DeviceCard from "./DeviceCard";
import {connectToMqtt, subscribeToTopic} from "../utils/mqttUtils";
import { useNavigation } from "@react-navigation/native";
import {ModeFormContext} from "../contexts/ModeFormContext";


const DevicesDisplayWidget = () => {

    const navigation = useNavigation();
  
  const handleButtonPress = () => {
    navigation.navigate("FanSpeedScreen");};

    const { autoDutyCycles, setAutoDutyCycles } = useContext(ModeFormContext);

  useEffect(()=>{

      const MANUAL_FAN_SPEED_PUB_TOPIC = "/intellibreeze/app/manual/fanspeed";
      const AUTO_FAN_SPEED_SUB_TOPIC = "/intellibreeze/sensor/automatic/fanspeed";

      const handleMessage = (message) =>{
          setAutoDutyCycles(parseInt(message.payloadString));
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
        <Text style={styles.sectionTitle}>Linked Devices</Text>
        <DeviceCard
        deviceTitle = "Fan"
        deviceValue = {autoDutyCycles}
        deviceUnits = "Cycle"
        onPress= {handleButtonPress}
          />
    </View>
  );
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection: "column",
        justifyContent: "flex-start",
        width: "100%",
        rowGap: 15,
    },
    sectionTitle:{
        color: "#000",
        fontSize: 17,
        fontWeight:'400'
    }
});

export default DevicesDisplayWidget;