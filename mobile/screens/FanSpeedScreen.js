import React, {useState} from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import Slider from "@react-native-community/slider";
import PowerButton from '../components/PowerButton';
import SaveButton from "../components/SaveButton";
import {connectToMqtt, publishToTopic} from "../utils/mqttUtils";
import {FAN_SLIDER_MANUAL} from "../constants/LogicConstants";

const FanSpeedScreen = () => {

    const[fanSpeedRange,setFanSpeedRange] = useState(0)

    const handlePress = () => {
        try{
            const client = connectToMqtt(); // connect to mqtt

            client.onConnected = () => { // on connection
                console.log("Successfully connected to MQTT of slider.");
                publishToTopic(client, FAN_SLIDER_MANUAL.TOPIC, fanSpeedRange, FAN_SLIDER_MANUAL.TOPIC_NAME); // publish topic with client, Fanspeedrange of 0 to 255 and topicName
            }
            console.log("Successfully published slider value!");
        }catch(error){
            console.error("Failed to publish slider value", error);
        }

    }

    return(
      <SafeAreaView style={{flex:1}}>
          <View  style={{justifyContent:"center", alignItems:"center", flexGrow:1, rowGap:30}}>
            <View style = {styles.container}>
                <View style = {styles.valueDisplayContainer}>
                    <Text> Cooler </Text>
                    <Text> {Math.floor(fanSpeedRange)}</Text>
                    <Text> cycles </Text>
                    <Text> Speed </Text>
                </View>
                <View style = {styles.slideContainer}>
                  <Slider style = {{width: 300, height: 50}}
                  onValueChange={(value)=> setFanSpeedRange(value)}
                  minimumValue={0}
                  maximumValue={100}
                  />
                    <View>
                        <SaveButton onPress = {handlePress}/>
                    </View>
                </View>
            </View>

            <View style = {styles.buttonContainer}>
              <PowerButton style = {styles.button}/>
            </View>
          </View>
      </SafeAreaView>
    );
}  

const styles = StyleSheet.create({
    valueDisplayContainer: {
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 5,
        borderColor: "#2196F3",
        padding: 20,
        width:275,
        height: 275,
        borderRadius: 200
    },
    valueDisplayImage: {
      width: 230,
      height: 230,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
      flexDirection: "column",
      borderRadius: 20,
      backgroundColor: "white",
      width: "82%",
      height: 440,
      alignItems: "center",
      justifyContent: "center",
    },
    buttonContainer: {
      alignItems: 'center',
    },
    child: {
      margin: 3,
    },
    value: {
      fontWeight: "bold",
      fontSize: 20,
    },
    name: {
      fontSize: 15,
    },
  });

  export default FanSpeedScreen;