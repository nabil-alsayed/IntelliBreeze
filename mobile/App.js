import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TemperatureThresholdSettings from "./screens/TemperatureThresholdSettings";
import { useState, useEffect } from "react";
import {Button, StyleSheet, TouchableOpacity, View, Image} from "react-native";
import { StatusBar } from "expo-status-bar";
import Header from "./components/Header";
import MetricsDisplayWidget from "./components/MetricsDisplayWidget";
import {connectToMqtt} from "./utils/mqttUtils";


const Stack = createStackNavigator();
const LM_PUB_TOPIC = "/intellibreeze/slider/lowToMediumThreshold"
const MH_PUB_TOPIC = "/intellibreeze/slider/mediumToHighThreshold"

export default function App({ name = "Nabil" }) {
    const [value, setValue] = useState(0);


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
        <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => navigation.navigate("TemperatureThresholdSettings")}
        >
            <Image
                source={require('./assets/OtherIcons/thresholdlogo.png')} //temperature settings icon
                style={styles.logo}
            />
        </TouchableOpacity>
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
        position: 'relative',
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
    logo: {
        width: 70, // Adjust the width as needed
        height: 70, // Adjust the height as needed
    },
});