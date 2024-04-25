import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TemperatureThresholdSettings from "./screens/TemperatureThresholdSettings";
import { useState, useEffect } from "react";
import { Button, StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import Header from "./components/Header";
import MetricsDisplayWidget from "./components/MetricsDisplayWidget";
import { Client } from "paho-mqtt";

const Stack = createStackNavigator();

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

        return () => client.disconnect(); // to clean up the connection when the component unmounts
    }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    options={{ headerShown: false }}
                >
                    {(props) => <HomeScreen {...props} name={name} value={value} />}
                </Stack.Screen>
                <Stack.Screen name="TemperatureThresholdSettings" component={TemperatureThresholdSettings} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const HomeScreen = ({ navigation, name, value }) => (
    <View style={styles.container}>
        <Header name={name} />
        <MetricsDisplayWidget value={value} />
        <Button
            title="TempSettings"
            onPress={() => navigation.navigate("TemperatureThresholdSettings")}
        />
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
