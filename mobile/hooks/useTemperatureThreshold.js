import {useEffect} from "react";
import {onSnapshot} from "firebase/firestore";
import {connectToMqtt, publishToTopic} from "../utils/mqttUtils";
import {TEMPERATURE} from "../constants/LogicConstants"

{/*PURPOSE OF HOOK: The purpose of this hook is to increase reusability of fetching the thresholds from the firebase and
publishing it to the MQTT whenever the application is opened (issue #46).
It also separates responsibility and makes the TemperatureThresholdSettings class more modular (primarily where this
hook is used).*/}
const useTemperatureThreshold = (lowToMediumRange, mediumToHighRange, setLowToMediumRange, setMediumToHighRange) => {
    useEffect(() => {
        const fetchTemperatureThreshold = onSnapshot(TEMPERATURE.firebase.collectionRef, (querySnapshot) => {
            try {
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    setLowToMediumRange(data.LowToMediumRange);
                    setMediumToHighRange(data.MediumToHighRange);
                    const client = connectToMqtt();
                    client.onConnected = () => {
                        publishToTopic(client, TEMPERATURE.thresholds.HIGH_THRESHOLD_PUB_TOPIC, String((mediumToHighRange)), "high temperature threshold");
                        publishToTopic(client, TEMPERATURE.thresholds.MED_THRESHOLD_PUB_TOPIC, String((lowToMediumRange)), "medium temperature threshold");
                        console.log("SIIIUUUUU");
                    };
                });
            } catch (error) {
                console.error("Failed to fetch previous thresholds", error);
            }
        });
        return () => fetchTemperatureThreshold();
    }, []);
};

export default useTemperatureThreshold;