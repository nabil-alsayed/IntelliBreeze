import React, {useEffect, useState} from 'react';
import Header from '../components/Header';
import MetricsDisplayWidget from '../components/MetricsDisplayWidget';
import FanSpeedDisplayWidget from '../components/FanSpeedDisplayWidget';
import {ModeFormProvider} from "../contexts/ModeFormContext";
import {ScrollView, StatusBar, View, StyleSheet, SafeAreaView} from "react-native";
import ModesDisplayWidget from "../components/ModesDisplayWidget";
import {Client} from "paho-mqtt";


const HomeScreen = ({navigation, name = "Nabil"}) => {
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

    return(
        <SafeAreaView style={{flex:1}}>
            <ModeFormProvider>
                <View style={styles.container}>
                    <ScrollView scrollEnabled={false} showsVerticalScrollIndicator={false} contentContainerStyle={styles.innerContainer}>
                        <Header name={name} style={{position:"sticky"}}/>
                        <MetricsDisplayWidget value={value} />
                        <ModesDisplayWidget />
                        <FanSpeedDisplayWidget value = {value} navigation={navigation}/>
                        <StatusBar style="auto" />
                    </ScrollView>
                </View>
          </ModeFormProvider>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f3f3f3",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingHorizontal:20,
        width:"100%",
    },
    innerContainer: {
        flexDirection: "column",
        width:"100%",
        rowGap: 15
    }
})

export default HomeScreen;
