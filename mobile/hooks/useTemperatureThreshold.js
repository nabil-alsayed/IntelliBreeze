import {useContext, useEffect, useState} from "react";
import {collection, onSnapshot} from "firebase/firestore";
import {connectToMqtt, publishToTopic} from "../utils/mqttUtils";
import {TEMPERATURE} from "../constants/LogicConstants"
import {db} from "../firebaseConfig";
import {TemperatureContext} from "../contexts/TemperatureContext";



{/*PURPOSE OF HOOK: The purpose of this hook is to increase reusability of fetching the thresholds from the firebase and
publishing it to the MQTT whenever the application is opened (issue #46).
It also separates responsibility and makes the TemperatureThresholdSettings class more modular (primarily where this
hook is used).*/}
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
                    console.log("FB LM " + data.LowToMediumRange)
                    console.log("FB MH " + data.MediumToHighRange)
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