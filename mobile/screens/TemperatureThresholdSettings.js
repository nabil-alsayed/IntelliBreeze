import React, { useEffect, useState } from "react";
import 'firebase/database';
import "firebase/compat/app";
import { db } from "../firebaseConfig";
import {collection, updateDoc, doc, onSnapshot} from "firebase/firestore";
import {connectToMqtt, publishToTopic} from "../utils/mqttUtils";
import "../components/Metric";
import CautionMessage from "../components/TemperatureThresholds/CautionMessage";
import { StyleSheet, View, Text, SafeAreaView, StatusBar } from 'react-native';
import { faFan } from '@fortawesome/free-solid-svg-icons';
import SaveButton from '../components/TemperatureThresholds/SaveButton';
import WarningMessage from '../components/TemperatureThresholds/WarningMessage';
import ConfirmationMessage from '../components/TemperatureThresholds/ConfirmationMessage';
import DefaultCheckBox from '../components/TemperatureThresholds/DefaultCheckBox';
import TemperatureSlider from '../components/TemperatureThresholds/TemperatureSlider';
import { SLIDER_VALUES, TEMPERATURE } from "../constants/LogicConstants";




{/*PURPOSE OF SCREEN: This screen allows the user to change the temperatures at which they would like the fan to change its
 speed in automatic mode. The default checkbox component allows the user to select hard coded temperature thresholds, whereas
 the sliders allow them to set it freely. These values are saved to firebase and published to the MQTT broker when the save
 button is pressed. A warning message is displayed if the temperature at which the fan switches to low is set higher
 than the temperature at which the fan switches to medium.*/}

const TemperatureThresholdSettings = () => {
    const[preferredTemp, setPreferredTemp] = useState(0);
    const [lowToMediumRange, setLowToMediumRange] = useState(0);
    const [mediumToHighRange, setMediumToHighRange] = useState(0);
    const [showWarning, setShowWarning] = useState(false);
    const [showCaution, setShowCaution] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [slidersDisabled, setSlidersDisabled] = useState(false);
    const collectionRef = collection(db, TEMPERATURE.dbPath);
    const documentID = TEMPERATURE.documentId;    
    const HIGH_THRESHOLD_PUB_TOPIC = TEMPERATURE.thresholds.HIGH_THRESHOLD_PUB_TOPIC
    const MED_THRESHOLD_PUB_TOPIC = TEMPERATURE.thresholds.MED_THRESHOLD_PUB_TOPIC
    const PREF_TEMP_PUB_TOPIC = TEMPERATURE.thresholds.PREF_TEMP_PUB_TOPIC;

    //variable to store data to firestore
    const newThresholds = {
        PreferredTemp: preferredTemp,
        LowToMediumRange: lowToMediumRange,
        MediumToHighRange: mediumToHighRange
    }


    //This fetches the temperatureThresholds from the firebase and renders the latest updated value
    useEffect(() => {
        const fetchTemperatureThreshold = onSnapshot(collectionRef, (querySnapshot) => {
            try {
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    setPreferredTemp(data.PreferredTemp);
                    setLowToMediumRange(data.LowToMediumRange);
                    setMediumToHighRange(data.MediumToHighRange);

                });
            } catch (error) {
                console.error("Failed to fetch previous thresholds", error);
            }
        });
        return () => fetchTemperatureThreshold();
    }, [ ]);



    //this method is responsible for updating the slider values to the firebase
    async function updateThreshold () {

        try {
            const docRef = doc(collectionRef, documentID)
            await updateDoc(docRef, newThresholds);
            console.log("Saved Successfully!")

            const client = connectToMqtt();
            client.onConnected = () => {
                publishToTopic(client, PREF_TEMP_PUB_TOPIC, String((preferredTemp)), "preferred Temperature");
                publishToTopic(client, HIGH_THRESHOLD_PUB_TOPIC, String((mediumToHighRange)), "high temperature threshold");
                publishToTopic(client, MED_THRESHOLD_PUB_TOPIC, String((lowToMediumRange)), "medium temperature threshold");
                
                
            };

        } catch (error) {
            console.error("Failed to save!");
            alert("Failed to save. Please try again later. ");
        }
    }


    //this is the core method which verifies the slider input
    const checkThreshold = () => {
    if((preferredTemp > lowToMediumRange) || (preferredTemp > mediumToHighRange)){ //is not allowed so shows caution
       setShowCaution(true);
       setShowConfirmation(false);
    } else if (lowToMediumRange > mediumToHighRange) { //can be allowed but displays warning as is unusual
        console.log("ENTERED WARNING MESSAGE")

            setShowCaution(false);
            setShowWarning(true);
            setShowConfirmation(false);
    } else {
            setShowCaution(false);
            setShowWarning(false);
            updateThreshold().then(() => {
                setShowConfirmation(true); //threshold addition is successful hence we return confirmation message
            });
        }
    }

    const handleDefaultCheckboxToggle = (isChecked) => {
        setSlidersDisabled(isChecked);
    };



    //UI for the sliders
    return (
        <SafeAreaView style={styles.container}>
            <View style={[{padding:20, rowGap:20}]}>
                <StatusBar style="auto" />
                <View style={styles.header}>
                    <Text style={styles.headerText}>Temperature Threshold Settings</Text>
                    <Text style={styles.description}>
                        Set the temperatures at which the fan speeds change, or select defaults.
                    </Text>
                </View>
            {/*Default Checkbox begins here*/}
            <View style={styles.checkBoxWrapper}>
                <DefaultCheckBox
                    onPress={() => {setPreferredTemp(SLIDER_VALUES.preferredTemp);setLowToMediumRange(SLIDER_VALUES.mediumDefaultThreshold); setMediumToHighRange(SLIDER_VALUES.highDefaultThreshold); setSlidersDisabled(true)}}
                    onToggle = {handleDefaultCheckboxToggle}
                />

                <TemperatureSlider
                    label="OFF to LOW"
                    icon={faFan}
                    value={preferredTemp}
                    onValueChange={setPreferredTemp}
                    disabled={slidersDisabled}
                /> 

                <TemperatureSlider
                    label="LOW to MEDIUM"
                    icon={faFan}
                    value={lowToMediumRange}
                    onValueChange={setLowToMediumRange}
                    disabled={slidersDisabled}
                />

                <TemperatureSlider
                    label="MEDIUM to HIGH"
                    icon={faFan}
                    value={mediumToHighRange}
                    onValueChange={setMediumToHighRange}
                    disabled={slidersDisabled}
                />

                <SaveButton onPress={checkThreshold} />


                {/*condition and execution to show the caution message*/}
                {showCaution && (

                    <CautionMessage
                        message="Your selected preferred temperature value must be lower than both the LOW to MEDIUM and MEDIUM to HIGH thresholds!"
                        onPressOk={() => setShowCaution(false)}
                    />

                        )}


                {/*condition and execution to show the warning message*/}
                {showWarning && (

                    <WarningMessage
                        message="LOW to MEDIUM threshold is higher than MEDIUM to HIGH!"
                        onPressCancel={() => setShowWarning(false)}
                        onPressSave={() => {  //function to store values to firebase is called
                            updateThreshold() //user accepts the unusual select so warning is removed
                                .then(setShowWarning(false))
                                .then(setShowConfirmation(true))
                        }}
                    />

                )}


                {/*condition and execution to show the confirmation message*/}
                {showConfirmation && (
                    <ConfirmationMessage
                        message="Settings Saved!"
                        onPress={() => setShowConfirmation(false)}
                    />
                )}
            </View>    
            </View>
        </SafeAreaView>
    );
};

//styling for individual components of the UI
const styles = StyleSheet.create({
    container: {
        flexShrink: 1,
        backgroundColor: '#f0f0f0',
    },
    header: {
        justifyContent:"center",
        alignItems:"center",
        rowGap:10
    },
    headerText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
    },
    description: {
        fontSize: 16,
        color: '#666',
        marginBottom: 20,
    },
});

export default TemperatureThresholdSettings;
