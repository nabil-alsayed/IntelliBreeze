import React, { useState, useEffect, useContext } from 'react';
import { Text, StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import moment from 'moment';
import { db } from "../../firebaseConfig";
import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import EnergyCalculatorUtils from '../../utils/EnergyCalculatorUtils';
import { ModeFormContext } from "../../contexts/ModeFormContext";
import {useTopicSubscription} from "../../hooks/useTopicSubscription";
import {AUTO_MODE} from "../../constants/LogicConstants";

const energyCalculator = new EnergyCalculatorUtils();

const EnergyConsumptionWidget = () => {
    // State to track energy level
    const [energy, setEnergy] = useState(0);
    // Global states needed for implementing the Energy Consumption display
    const {
        modes,
        fanIsOn,
        selectedModeId,
        autoDutyCycles,
        setAutoDutyCycles
    } = useContext(ModeFormContext);
    const unit = "kWh";

    // Hook to Fetch and set initial energy when the component mounts
    useEffect(() => {
        const todayStr = moment().format('YYYY-MM-DD');
        const docRef = doc(db, "EnergyData", todayStr);

        const fetchInitialEnergy = async () => {
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const initialEnergy = docSnap.data().energy;
                setEnergy(initialEnergy);
                energyCalculator.setInitialEnergy(initialEnergy);
            }
        };

        fetchInitialEnergy();
    }, []);

    // Hook to subscribe to Fan's Duty Cycles to use for Auto Mode's Energy Calc
    useTopicSubscription(AutoDutyCycles => {
        setAutoDutyCycles(AutoDutyCycles)
    },AUTO_MODE.CYCLE.TOPIC,AUTO_MODE.CYCLE.TOPIC_NAME)

    // Method to convert the subscribed Duty Cycle back to Fan Speed to pass to energy calculator
    const convertCycleToFanSpeed = (dutyCycles) => {
        return ((dutyCycles - 60) / 195.0 * 99) + 1;
    }

    // Hook to Display and Store Energy at an Interval of 1 second and reset state to updated level
    useEffect(() => {
        if (fanIsOn) {

            const selectedMode = modes.find(mode => mode.id === selectedModeId);
            const intervalId = setInterval(() => {
            let updatedEnergy = 0;

            // Decide if the mode selected is Auto
            if(selectedMode){
                updatedEnergy = energyCalculator.updateEnergy(selectedMode.FanSpeed);
            } else {
                updatedEnergy = energyCalculator.updateEnergy(convertCycleToFanSpeed(autoDutyCycles))
            }
            const todayStr = moment().format('YYYY-MM-DD');
            const docRef = doc(db, "EnergyData", todayStr);

            setEnergy(updatedEnergy);
            updateEnergyInDatabase(docRef, updatedEnergy);
            }, 1000);

            return () => clearInterval(intervalId); // Clean up on unmount
        }
    }, [autoDutyCycles, fanIsOn, modes, selectedModeId]);

    // Method to update the Energy in Database
    const updateEnergyInDatabase = async (docRef, updatedEnergy) => {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            await updateDoc(docRef, { energy: updatedEnergy });
        } else {
            await setDoc(docRef, { energy: updatedEnergy, date: moment().toDate() });
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <Icon name={"bolt"} size={30}/>
            </View>
            <View style={styles.textContainer}>
                <Text numberOfLines={1} style={{fontSize:25, fontWeight:"bold"}}>{energy.toFixed(2) + " " + unit}</Text>
                <Text numberOfLines={1} style={{fontSize:15, fontWeight:"400"}}>
                    Your Energy consumption today
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 15,
        height: 100,
        borderRadius: 20,
        backgroundColor: "#fff",
        columnGap: 10,
        flexDirection: "row",
    },
    iconContainer: {
        width: 60,
        height: 60,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f3f3f3",
        borderRadius: 50
    },
    textContainer: {
        flexDirection: "column",
        justifyContent: "flex-start",
    }
});

export default EnergyConsumptionWidget;