import React, {useState} from 'react';
import {View, Text, StyleSheet, ImageBackground, SafeAreaView} from 'react-native';
import Slider from "@react-native-community/slider";
import PowerButton from '../components/PowerButton';
import {connectToMqtt, publishToTopic} from "../utils/mqttUtils";
import {FAN_SLIDER_MANUAL} from "../constants/LogicConstants";
import SaveButton from "../components/TemperatureThresholds/SaveButton";
import SaveButtonSlider from "../components/SaveButtonSlider";

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
                <View style = {styles.valueDisplayImageContainer}>
                  <ImageBackground style={styles.valueDisplayImage} source={require("../assets/OtherIcons/ValueDisplay.png")}>
                    <Text style = {{fontSize: 15, marginLeft: 91, marginTop: 75}}> Cooler </Text>
                    <Text style = {{fontSize: 40, marginTop: 3, marginRight: 95, alignSelf: "center", fontWeight: "bold"}}> {Math.floor(fanSpeedRange)}</Text>
                    <Text style = {{fontSize: 35, marginLeft: 110, marginTop: -100, fontWeight: "bold"}}> cycles </Text>
                    <Text style = {{fontSize: 15, marginLeft: 91, marginTop: 10}}> Speed </Text>
                  </ImageBackground>
                </View>
                <View style = {styles.slideContainer}>
                  <Slider style = {{width: 300, height: 50}}
                  onValueChange={(value)=> setFanSpeedRange(value)}
                  minimumValue={0}
                  maximumValue={100}
                  />
                    <View>
                        <SaveButtonSlider onPress = {handlePress}/>
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
    valueDisplayImageContainer: {
      marginBottom: 20,
    },
    valueDisplayImage: {
      width: 230,
      height: 230,
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