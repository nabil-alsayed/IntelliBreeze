import { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { StatusBar } from "expo-status-bar";
import Header from "./components/Header";
import MetricsDisplayWidget from "./components/MetricsDisplayWidget";
import { Client } from "paho-mqtt";
import FanSpeedDisplayWidget from "./components/FanSpeedDisplayWidget";
import { Colors } from "react-native/Libraries/NewAppScreen";

export default function App({ name = "Nabil" }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const clientId = `WioTerminal-${parseInt(Math.random() * 100)}`;
    const client = new Client("broker.hivemq.com", 8000, clientId);
 
    const onMessageArrived = (message) => {
      console.log("temperature:", message.payloadString);
      if (message.destinationName === "/intellibreeze/sensor/temperature") {
        setValue(parseInt(message.payloadString));
      }
    };

    client.onMessageArrived = onMessageArrived;

    client.connect({
      onSuccess: () => {
        console.log("Connected Successfully");
        client.subscribe("/intellibreeze/sensor/temperature");
      }, 
      onFailure: () => {
        console.log("Failed to connect!");
      },
    });

    return () => client.disconnect(); // to sclean up the connection when the component unmounts
  }, []);
  return (
    <View style={styles.container}>
      <Header name={name} />
      <MetricsDisplayWidget value={value} />
      <FanSpeedDisplayWidget value = {value}/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f3f3",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 50,
    paddingLeft: 10,
    paddingRight: 10,
  },
});
