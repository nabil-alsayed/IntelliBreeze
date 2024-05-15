import React, { useState, useEffect, useContext } from 'react';
import { Text, StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Feather } from '@expo/vector-icons';
import moment from 'moment';
import { db } from "../../firebaseConfig";
import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import EnergyCalculatorUtils from '../../utils/energyCalculatorUtils';
import { ModeFormContext } from "../../contexts/ModeFormContext";
import { useTopicSubscription } from "../../hooks/useTopicSubscription";
import { AUTO_MODE } from "../../constants/LogicConstants";

const energyCalculator = new EnergyCalculatorUtils();

const EnergyConsumptionWidget = () => {
    // State to track last day
    const [currentDay, setCurrentDay] = useState(moment().format('YYYY-MM-DD'));
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


    // Hook to subscribe to Fan's Duty Cycles to use for Auto Mode's Energy Calc
    useTopicSubscription(AutoDutyCycles => {
        setAutoDutyCycles(AutoDutyCycles)
    },AUTO_MODE.CYCLE.TOPIC,AUTO_MODE.CYCLE.TOPIC_NAME)


    useEffect(() => {
        const todayStr = moment().format('YYYY-MM-DD');
        const docRef = doc(db, "EnergyData", todayStr);
        const isSameDay = currentDay === todayStr
        const fetchInitialEnergy = async () => {
            const docSnap = await getDoc(docRef);
            const initialEnergy = docSnap.data().energy;
            if (docSnap.exists() && isSameDay) {
                setEnergy(initialEnergy);
                energyCalculator.setInitialEnergy(initialEnergy);
            } else {
                setEnergy(0);
                energyCalculator.resetEnergy();
                setCurrentDay(todayStr)
            }
        };

        fetchInitialEnergy();
    }, []);

    // Hook to Display and Store Energy at an Interval of 1 second and reset state to updated level
    useEffect(() => {
        const todayStr = moment().format('YYYY-MM-DD');
        const intervalId = setInterval(() => {
            if (todayStr !== currentDay) {
                // Reset energy at the start of a new day
                energyCalculator.resetEnergy();
                setEnergy(0);
                setCurrentDay(todayStr);
                updateEnergyInDatabase(doc(db, "EnergyData", todayStr), 0);
            } else if (fanIsOn) {
                const selectedMode = modes.find(mode => mode.id === selectedModeId);
                const autoSpeed = energyCalculator.convertCycleToFanSpeed(autoDutyCycles)
                const updatedEnergy = selectedMode ?
                    energyCalculator.updateEnergy(selectedMode.FanSpeed) :
                    energyCalculator.updateEnergy(autoSpeed);

                setEnergy(updatedEnergy);
                updateEnergyInDatabase(doc(db, "EnergyData", todayStr), updatedEnergy);
            }
        }, 1000);

        return () => clearInterval(intervalId);
    }, [fanIsOn, modes, selectedModeId, autoDutyCycles, currentDay]);


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
            <View style={{flexDirection:"row"}}>
                <View style={styles.textContainer}>
                    <Text numberOfLines={1} style={{fontSize:25, fontWeight:"bold"}}>{energy.toFixed(5) + " " + unit}</Text>
                    <Text numberOfLines={1} style={{fontSize:15, fontWeight:"400"}}>
                        Your Energy consumption today
                    </Text>
                </View>
                <Feather name="arrow-right-circle" size={24} color="black" />
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