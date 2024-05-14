import {useContext, useEffect, useState} from "react";
import {collection, onSnapshot} from "firebase/firestore";
import {connectToMqtt, publishToTopic} from "../utils/mqttUtils";
import {TEMPERATURE} from "../constants/LogicConstants"
import {db} from "../firebaseConfig";
import {TemperatureContext} from "../contexts/TemperatureContext";



{/*PURPOSE OF HOOK: The purpose of this hook is to increase re-usability of fetching the thresholds from the firebase and
publishing it to the MQTT whenever the application is opened or the auto mode is selected (issue #46).*/}
const useTemperatureThreshold = () => {
    const {
        lowToMediumRange,
        setLowToMediumRange,
        mediumToHighRange,
        setMediumToHighRange,
        isAutoMode,
        setIsAutoMode,
    } = useContext(TemperatureContext);

    const collectionRef =  collection(db, 'temperatureThresholds');
    useEffect(() => {
        const fetchTemperatureThreshold = onSnapshot(collectionRef, (querySnapshot) => {
            try {
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    setLowToMediumRange(data.LowToMediumRange);
                    setMediumToHighRange(data.MediumToHighRange);
                    const client = connectToMqtt();
                    client.onConnected = () => {
                        publishToTopic(client, TEMPERATURE.thresholds.HIGH_THRESHOLD_PUB_TOPIC, String((data.MediumToHighRange)), "high temperature threshold");
                        publishToTopic(client, TEMPERATURE.thresholds.MED_THRESHOLD_PUB_TOPIC, String((data.LowToMediumRange)), "medium temperature threshold");
                        console.log("Low to medium range that was sent is: " + data.LowToMediumRange)
                        console.log("Medium to high range that was sent is: " + data.MediumToHighRange)
                    };
                });
            } catch (error) {
                console.error("Failed to fetch previous thresholds", error);
            }
        });
        return () => fetchTemperatureThreshold();
    }, [isAutoMode]);
};

export default useTemperatureThreshold;