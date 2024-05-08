import React, {useEffect, useState} from 'react';
import Header from '../components/Header';
import MetricsDisplayWidget from '../components/MetricsDisplayWidget';
import FanSpeedDisplayWidget from '../components/FanSpeedDisplayWidget';
import {ModeFormProvider} from "../contexts/ModeFormContext";
import {ScrollView, StatusBar, View, StyleSheet, SafeAreaView} from "react-native";
import ModesDisplayWidget from "../components/ModesDisplayWidget";
import {Client} from "paho-mqtt";
import {connectToMqtt, subscribeToTopic} from "../utils/mqttUtils";


const HomeScreen = ({navigation, name = "Nabil"}) => {


   // useEffect(() => {
        // const clientId = `WioTerminal-${parseInt(Math.random() * 100)}`;

            // new Client("broker.hivemq.com", 8000, clientId);
        /*
        const handleMessage = (message) => {
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



        subscribeToTopic(client, handleMessage, )

        // client.onMessageArrived = handleMessage;

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


         */
   //  }, []);




    return(
        <SafeAreaView style={{flex:1}}>
            <ModeFormProvider>
                <View style={styles.container}>
                    <ScrollView scrollEnabled={false} showsVerticalScrollIndicator={false} contentContainerStyle={styles.innerContainer}>
                        <Header name={name} style={{position:"sticky"}}/>
                        <MetricsDisplayWidget />
                        <ModesDisplayWidget />
                        <FanSpeedDisplayWidget navigation = {navigation}/>
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
