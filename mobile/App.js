import { useState, useEffect, useContext } from "react";
import { StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import Header from "./components/Header";
import MetricsDisplayWidget from "./components/MetricsDisplayWidget";
import ModeDisplayWidget from "./components/ModesDisplayWidget";
import { Client,Message } from "paho-mqtt";

export default function App({ name = "Nabil" }) {
  const [value, setValue] = useState(0);
  const [tempUnit, setTempUnit] = useState('°C');

  const getData = () => {

  }

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

        //if statements for celsius, fahrenheit, kelvin
        let tempUnitString;

       if  (tempUnit === '°C'){
         tempUnitString = '°C';
         console.log("celsius");
       } else if (tempUnit === '°F'){
         tempUnitString = '°F';
         console.log("fahr");
       } else{
         tempUnitString = 'K'
         console.log("kelvin");
       }
        const tempUnitMessage = new Message(tempUnitString);
       tempUnitMessage.destinationName = "/intellibreeze/app/tempUnit"
        client.send(tempUnitMessage);
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
      <MetricsDisplayWidget value={value} onSubmit={getData()}/>
      <ModeDisplayWidget />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f3f3",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "flex-start",
    gap: 20,
    paddingTop: 50,
    paddingLeft: 20,
    paddingRight: 20,
  },
});
