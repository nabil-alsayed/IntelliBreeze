import React, { useEffect, useState } from "react";
import {View, Text, StyleSheet, Image, StatusBar} from "react-native";
import Slider from "@react-native-community/slider";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faFan } from "@fortawesome/free-solid-svg-icons";
import SaveButton from "../components/SaveButton";
import WarningMessage from "../components/WarningMessage";
import ConfirmationMessage from "../components/ConfirmationMessage";
library.add(faFan);
import 'firebase/database';
import "firebase/compat/app";
import { db } from "../firebaseConfig";
import { collection, updateDoc, doc, onSnapshot} from "firebase/firestore";
import {connectToMqtt, publishToTopic} from "../utils/mqttUtils";
import "../components/Metric";
import DefaultCheckBox from "../components/DefaultCheckBox";

{/*PURPOSE OF SCREEN: This screen allows the user to change the temperatures at which they would like the fan to change its
 speed in automatic mode. The default checkbox component allows the user to select hard coded temperature thresholds, whereas
 the sliders allow them to set it freely. These values are saved to firebase and published to the MQTT broker when the save
 is pressed. A warning message is displayed if the temperature at which the fan switches to low is set higher than the
 temperature at which th fan switches to medium.*/}

const TemperatureThresholdSettings = () => {
    const [lowToMediumRange, setLowToMediumRange] = useState(0);
    const [mediumToHighRange, setMediumToHighRange] = useState(0);
    const [tempUnit, setTempUnit] = useState('C');
    const [showWarning, setShowWarning] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [slidersDisabled, setSlidersDisabled] = useState(false);
    const collectionRef = collection(db, 'temperatureThresholds');
    const documentID = 'aIPlgZv2kTA4axiMAnw5';
    const HIGH_THRESHOLD_PUB_TOPIC = "/intellibreeze/app/highThreshold"
    const MED_THRESHOLD_PUB_TOPIC = "/intellibreeze/app/mediumThreshold"



    //variable to store data to firestore
    const newThresholds = {
        LowToMediumRange: lowToMediumRange,
        MediumToHighRange: mediumToHighRange
    }


    //This function calculates the temperature if the preferredUnit/tempUnit is changed
    const convertTemperature = (temp) => {
        if (tempUnit === 'F') {
            return Math.floor(Math.round((temp * 9 / 5) + 32)) + '°F';
        } else if (tempUnit === 'K') {
            return Math.floor((temp + 273.15).toFixed(2)) + 'K';
        }
        return Math.floor(temp) + '°C';
    }


    //This fetches the temperatureThresholds from the firebase and renders the latest updated value
    useEffect(() => {
        const fetchTemperatureThreshold = onSnapshot(collectionRef, (querySnapshot) => {
            try {
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    setLowToMediumRange(data.LowToMediumRange);
                    setMediumToHighRange(data.MediumToHighRange);

                });
            } catch (error) {
                console.error("Failed to fetch previous thresholds", error);
            }
        });
        return () => fetchTemperatureThreshold();
    }, []);



    //this method is responsible for updating the slider values to the firebase
    async function updateThreshold () {

        try {
            const docRef = doc(collectionRef, documentID)
            await updateDoc(docRef, newThresholds);
            console.log("Saved Successfully!")

            const client = connectToMqtt();
            client.onConnected = () => {
                publishToTopic(client, HIGH_THRESHOLD_PUB_TOPIC, String((mediumToHighRange)), "high temperature threshold");
                publishToTopic(client, MED_THRESHOLD_PUB_TOPIC, String((lowToMediumRange)), "medium temperature threshold");

            };


        } catch (error) {
            console.error("Failed to save!");
            alert("Failed to save. Please try again later. ");
        }
    }




    //this is the core method which verifies the slider input
    const checkThreshold = (lowToMediumRange, mediumToHighRange) => {
        if (lowToMediumRange > mediumToHighRange) { //can be allowed but displays warning as is unusual
            setShowWarning(true);
            setShowConfirmation(false);
        } else {
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
        <View style={styles.container}>


            <View style={styles.header}>
                <Text style={styles.headerText}>Temperature Threshold Settings</Text>
            </View>
            <View style={styles.headerLine}></View>
            <Text style={styles.infoText}>Please set the temperature at which you would like the speed of the fan to change, or just select default.</Text>

            {/*Default Checkbox begins here*/}
            <View style={styles.checkBoxWrapper}>
                <DefaultCheckBox
                    onPress={() => {setLowToMediumRange(25); setMediumToHighRange(27); setSlidersDisabled(true)}}
                    onToggle = {handleDefaultCheckboxToggle}
                />
                <StatusBar style="auto" />
            </View>


            {/*LOW to MEDIUM Slider begins here*/}
            <View style={styles.adjustmentContainerLM}>
                <Image
                    source={require('../assets/OtherIcons/coldlogo.png')}
                    style={styles.coldLogo}
                />
                <View style={styles.sliderWrapper}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={styles.thresholdLabel}>LOW to MEDIUM </Text>
                        <FontAwesomeIcon icon={faFan} style={[{ color: 'black' }, { marginBottom: 15 }, { marginLeft: 5 }]} size={30} />
                    </View>
                    <Text style={{ fontSize: 18, fontWeight: 'normal', color: 'black', marginBottom: 10, marginRight: 10 }}>Switch at: {convertTemperature(lowToMediumRange)}</Text>
                    <Slider
                        style={{ width: 300, height: 50 }}
                        value={lowToMediumRange}
                        disabled = {slidersDisabled}
                        onValueChange={(value) => setLowToMediumRange(value)}
                        minimumValue={-50}
                        maximumValue={100}
                    />
                </View>
                <Image
                    source={require('../assets/OtherIcons/hotlogo.png')}
                    style={styles.hotLogo}
                />
            </View>


            <View style={styles.line}></View>


            {/*MEDIUM to HIGH Slider begins here*/}
            <View style={styles.adjustmentContainerMH}>
                <Image
                    source={require('../assets/OtherIcons/coldlogo.png')}
                    style={styles.coldLogo}
                />
                <View style={styles.sliderWrapper}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={styles.thresholdLabel}>MEDIUM to HIGH </Text>
                        <FontAwesomeIcon icon={faFan} style={[{ color: 'black' }, { marginBottom: 15 }, { marginLeft: 5 }]} size={30} />
                    </View>

                    <Text style={{ fontSize: 18, fontWeight: 'normal', color: 'black', marginBottom: 10, marginRight: 10 }}>Switch at: {convertTemperature(mediumToHighRange)}</Text>
                    <Slider
                        style={{ width: 300, height: 50 }}
                        value = {mediumToHighRange}
                        disabled = {slidersDisabled}
                        onValueChange={(value) => setMediumToHighRange(value)}
                        minimumValue={-50}
                        maximumValue={100}
                    />
                </View>
                <Image
                    source={require('../assets/OtherIcons/hotlogo.png')}
                    style={styles.hotLogo}
                />
            </View>
            <View style={styles.container}>
                <SaveButton onPress={() => {
                    checkThreshold(lowToMediumRange, mediumToHighRange);
                }} />
            </View>


            {/*condition and execution to show the warning message*/}
            {showWarning && (

                <WarningMessage
                    message="Your LOW to MEDIUM threshold is greater than your MEDIUM to HIGH threshold!
                    This means that the fan will run faster at a lower temperature.
                    Are you sure you want this?"
                    onPressCancel={() => setShowWarning(false)}
                    onPressSave={()=> {
                        updateThreshold() //function to store values to firebase is called
                            .then(setShowWarning(false)) //user accepts the unusual select so warning is removed
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


    );
}


//styling for individual components of the UI
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingHorizontal: 10,
        paddingTop: 20,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    headerText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
    },
    line: {
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        width: "100%",
        marginTop: 20,
        marginBottom: 1,
    },
    headerLine: {
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        width: "110%",
        marginTop: 1,
        marginBottom: 5,
    },
    hotLogo: {
        width: 40,
        height: 40,
    },
    coldLogo: {
        width: 50,
        height: 50,
    },
    adjustmentContainerLM: {   /*adjustment container for the low to medium slider*/
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 140,
    },
    adjustmentContainerMH: { /*adjustment container for the medium to high slider*/
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 15,
    },
    thresholdLabel: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
        marginLeft: 12,

    },
    sliderWrapper: {
        alignItems: "center",
    },
    warningMessage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    infoText: {
        fontSize: 16,
        color: "#666",
        textAlign: "center",
        marginBottom: 10,
    },
    checkBoxWrapper: {
        alignItems: "center",
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        padding: 10,
    },

});

export default TemperatureThresholdSettings;