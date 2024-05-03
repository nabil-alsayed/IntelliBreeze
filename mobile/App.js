import { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { StatusBar } from "expo-status-bar";
import Header from "./components/Header";
import MetricsDisplayWidget from "./components/MetricsDisplayWidget";
import { Client } from "paho-mqtt";
import FanSpeedDisplayWidget from "./components/FanSpeedDisplayWidget";
import FanSpeedScreen from "./screens/FanSpeedScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";


export default function App({ name = "Nabil" }) {
  const [temperature, setTemperature] = useState(0);
  const [fanSpeed, setFanSpeed] = useState(0);

  useEffect(() => {
    const clientId = `WioTerminal-${parseInt(Math.random() * 100)}`;
    const client = new Client("broker.hivemq.com", Number(8000), clientId);

    const TEMP_SUB_TOPIC = "/intellibreeze/sensor/temperature"; //Intialising all the topics as variables
    const MANUAL_FAN_SPEED_PUB_TOPIC = "/intellibreeze/app/manual/fanspeed";
    const AUTO_FAN_SPEED_SUB_TOPIC = "/intellibreeze/sensor/automatic/fanspeed";

 
    const onMessageArrived = (message) => {
  
      if (message.destinationName === TEMP_SUB_TOPIC) {
        setTemperature(parseInt(message.payloadString));
        console.log("temperature:", message.payloadString);
      }else if(message.destinationName === MANUAL_FAN_SPEED_PUB_TOPIC){  // Based on what topic the message belongs the that particular message will be printed on the console
        setFanSpeed(parseInt(message.payloadString));
        console.log("fan speed (Manual Mode)", message.payloadString);
      }else if(message.destinationName === AUTO_FAN_SPEED_SUB_TOPIC){
        setFanSpeed(parseInt(message.payloadString));
        console.log("fan speed (Automatic Mode)", message.payloadString);
      }
    };

    client.onMessageArrived = onMessageArrived;

    client.connect({
      onSuccess: () => {
        console.log("Connected Successfully");
        client.subscribe(TEMP_SUB_TOPIC);
        client.subscribe(AUTO_FAN_SPEED_SUB_TOPIC);
      }, 
      onFailure: () => {
        console.log("Failed to connect!");
      },
    });

    return () => client.disconnect(); // to sclean up the connection when the component unmounts
  }, []);
  return (
    <NavigationContainer>
           <Stack.Navigator>
               <Stack.Screen
                   name="Home"
                   options={{ headerShown: false }}
               >
                   {(props) => <HomeScreen {...props} name={name} temperature = {temperature} fanSpeed = {fanSpeed}/>}
               </Stack.Screen>
               <Stack.Screen name="FanSpeedScreen" component={FanSpeedScreen} />
           </Stack.Navigator>
    </NavigationContainer>
  );
}

const Stack = createStackNavigator();

const HomeScreen = ({ name, navigation, fanSpeed, temperature}) => (
  <View style={styles.container}>
      <Header name={name} />
      <MetricsDisplayWidget  value = {temperature}/>
      <FanSpeedDisplayWidget value = {fanSpeed} navigation = {navigation}/>
      <StatusBar style="auto" />
  </View>
);

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
