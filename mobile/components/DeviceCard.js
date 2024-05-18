import React, {useContext, useEffect, useState} from "react";
import { Text, StyleSheet, View, Switch } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import { ModeFormContext } from "../contexts/ModeFormContext";
import Icon from "react-native-vector-icons/FontAwesome";
import {connectToMqtt, publishToTopic, subscribeToTopic} from "../utils/mqttUtils";
import { MODES } from '../constants/LogicConstants'


const DeviceCard = ({deviceTitle, deviceUnits, onPress}) =>{
    const { selectedModeId, modes } = useContext(ModeFormContext)
    const [ selectedModeName, setSelectedModeName ] = useState('Auto')
    const [ selectedModeIcon, setSelectedModeIcon ] = useState('gear')
    const [ isEnabled, setIsEnabled ] = useState(false)
    const { autoDutyCycles, setAutoDutyCycles, fanIsOn, setFanIsOn } = useContext(ModeFormContext);

    const FAN_TOGGLE_PUB_TOPIC = "/intellibreeze/app/manual/button";

    useEffect(()=>{

        const AUTO_FAN_SPEED_SUB_TOPIC = "/intellibreeze/sensor/automatic/fanspeed";
        const handleMessage = (message) =>{
            setAutoDutyCycles(parseInt(message.payloadString));
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

    useEffect(() => {
        // Find the mode that matches the selectedModeId
        const selectedMode = modes.find(mode => mode.id === selectedModeId);

        // If selectedMode exists, update the state with the mode's name
        if (selectedMode) {
            setSelectedModeName(selectedMode.ModeName);  // Use selectedMode.ModeName, not selectedModeId.ModeName
            setSelectedModeIcon(selectedMode.SelectedIcon);  // Use selectedMode.ModeName, not selectedModeId.ModeName
        }
    }, [selectedModeId, modes]);  // Include 'modes' in the dependencies array
    const toggleSwitch = () => {
        const message = !fanIsOn ? 'HIGH' : 'LOW'; // if the newState is on, let message be HIGH otherwise LOW        console.log("FAN: " + newFanState);
        if (isEnabled) {
            setFanIsOn(false)
        } else {
            setFanIsOn(true)
        }
        try{
            const client = connectToMqtt(); // connect to mqtt
            setFanIsOn(!fanIsOn);
            client.onConnected = () => { // on connection
                console.log("Successfully connected to MQTT.");
                publishToTopic(client, FAN_TOGGLE_PUB_TOPIC, message, "fan on/off toggle"); // publish topic with client, message HIGH or LOW and topicName
                console.log("Successfully published " + message + " to MQTT.");
            }
            console.log("Successfully published toggle value!");
            console.log("MESSAGE ON MQTT : =====> " + message )
        }catch(error){
            console.error("Failed to publish toggle value", error);
        }
        setIsEnabled(previousState => !previousState)

    }

    useEffect(()=> {
        if(selectedModeId === MODES.AUTO_MODE){
            setIsEnabled(!isEnabled)
        }
    },[selectedModeId])

    const determineModeType = () => {
        if (selectedModeId === (MODES.AUTO_MODE.ID)) {
            return { modeName: "Auto", modeIcon: "tachometer" };
        } else {
            return { modeName: selectedModeName, modeIcon: selectedModeIcon }
        }
    }

    return(
        <View style={styles.container}>
            <View style={{flex:1, flexDirection:"column", justifyContent: 'space-evenly'}}>
                <View style={{flexDirection:'row', columnGap:15}}>
                    <FontAwesome5 name={"fan"} size={35}></FontAwesome5>
                    <View style={{flexDirection:'row', columnGap:5}}>
                        <Text style={[styles.deviceSubText, {fontWeight: 'bold', color: "#000"}]}>{autoDutyCycles}</Text>
                        <Text style={[styles.deviceSubText, {color: "#000"}]}>{deviceUnits}</Text>
                    </View>
                </View>
                <Text style={[styles.deviceSubText, {fontWeight: 'bold', color: "#000"}]}>{deviceTitle}</Text>
                <View style={styles.deviceModeContainer}>
                    <Icon name={determineModeType().modeIcon} size={14}/>
                    <Text style={styles.deviceModeTitle} numberOfLines={1}>{determineModeType().modeName.toString()}</Text>
                </View>
                <View>
                    <Switch
                        trackColor={{false: 'lightgrey', true: '#57c325'}}
                        thumbColor={'white'}
                        ios_backgroundColor={'#f8f8f8'}
                        disabled = {(selectedModeId === MODES.AUTO_MODE.ID)}
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 15,
        flexDirection: "column",
        borderRadius: 20,
        backgroundColor: "#00BFFF",
        width: "100%",
        maxWidth: 170,
        height: 215,
        alignItems: "center",
        justifyContent: "center",
    },
    deviceModeContainer: {
        backgroundColor: "#f3f3f3",
        flexShrink:1,
        paddingVertical:10,
        paddingHorizontal:10,
        borderRadius:6,
        flexDirection: "row",
        columnGap: 7,
        alignItems: "center",
        justifyContent: 'flex-start',
        width: 130
    },
    toggle: {
        backgroundColor: "#f3f3f3",
        flexShrink:1,
        padding:5,
        borderRadius:6
    },
    fanChild: {
        margin: 3,
    },
    deviceSubText: {
        fontSize: 20,
    },
    title: {
        fontSize: 15,
    },
    deviceModeTitle:{
        fontSize:14,
        fontWeight:"500"
    }
});


export default DeviceCard;