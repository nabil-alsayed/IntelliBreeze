import React, { useEffect, useState } from "react";
import {View, Text, StyleSheet, Image, Button, Alert, Animated} from "react-native";
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
import { Client } from "paho-mqtt";




export default function TemperatureThresholdSettings() {
    const [lowToMediumRange, setLowToMediumRange] = useState(0);
    const [mediumToHighRange, setMediumToHighRange] = useState(0);
    const [preferredUnit, setPreferredUnit] = useState('C');
    const [showWarning, setShowWarning] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const collectionRef = collection(db, 'temperatureThresholds');
    const documentID = 'aIPlgZv2kTA4axiMAnw5';
    const THRESHOLD_PUB_TOPIC = "/intellibreeze/app/temperatureThresholds"


    const newThresholds = { //variable to store data to firestore
        LowToMediumRange: lowToMediumRange,
        MediumToHighRange: mediumToHighRange
    }



    const convertTemperature = (temp) => { //This function calculates the temperature if the preferredUnit is changed
        if (preferredUnit === 'F') {
            return Math.floor(Math.round((temp * 9 / 5) + 32)) + '°F';
        } else if (preferredUnit === 'K') {
            return Math.floor((temp + 273.15).toFixed(2)) + 'K';
        }
        return Math.floor(temp) + '°C';
    }



    useEffect(() => { //This function allows modification of the preferredUnit test variable
        setPreferredUnit('C');
    }, []);



    useEffect(() => { //This fetches the temperatureThresholds from the firebase and renders the latest updated value
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





    async function updateThreshold () { //this method is repsonsible for adding the slider values to the firebase

        try {
            const docRef = doc(collectionRef, documentID)
            await updateDoc(docRef, newThresholds);
            console.log("Saved Successfully!")

            const client = connectToMqtt();
            client.onConnected = () => {
                publishToTopic(client, THRESHOLD_PUB_TOPIC, String(mediumToHighRange), "temperature thresholds");
                publishToTopic(client, THRESHOLD_PUB_TOPIC, String(lowToMediumRange), "temperature thresholds");

            };


        } catch (error) {
            console.error("Failed to save!");
            alert("Failed to save. Please try again later. ");
        }
    }




    const checkThreshold = (lowToMediumRange, mediumToHighRange) => { //this is the core method which verifies the slider input
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




    return (
        <View style={styles.container}>
            {/*LOW to MEDIUM Slider begins here*/}
            <View style={styles.header}>
                <Text style={styles.headerText}>Temperature Threshold Settings</Text>
            </View>
            <View style={styles.headerLine}></View>
            <Text style={styles.infoText}>Please set the temperature at which you would like the speed of the fan to change</Text>
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
        marginBottom: 1
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
        marginTop: 220,
    },
    adjustmentContainerMH: { /*adjustment container for the medium to high slider*/
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 70,
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
    }

});
