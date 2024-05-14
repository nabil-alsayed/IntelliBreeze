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

    // Method to convert the subscribed Duty Cycle back to Fan Speed to pass to energy calculator
    const convertCycleToFanSpeed = (dutyCycles) => {
        return ((dutyCycles - 60) / 195.0 * 99) + 1;
    }

    useTopicSubscription(async (newEnergyData) => {
        if (newEnergyData) {
            const today = moment();
            const yearPath = `Year/${today.format('YYYY')}`
            const monthPath = `Month/${today.format('MMMM')}`
            const weekPath = `Week/Week ${today.isoWeek()}`
            const dayPath = `Day/${today.format('ddd')}`;
            const energyIncrement = parseFloat(newEnergyData) * 0.5;

            // Update Firestore for day, week, and month
            const updateFirestore = async (path, increment) => {
                const docRef = doc(db, path);
                try {
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        // Document exists, fetch current energy and add the new increment
                        const currentEnergy = docSnap.data().energy || 0; // Handle case where energy might not be set
                        await updateDoc(docRef, {
                            energy: currentEnergy + increment
                        });
                    } else {
                        // Document does not exist, create it with th initial value
                        await setDoc(docRef, { energy: increment });
                    }
                } catch (error) {
                    console.error("Error accessing or updating the document:", error);
                }
            };

            // Update all timeframes with energy increment value
            await Promise.all([
                updateFirestore(dayPath, energyIncrement),
                updateFirestore(weekPath, energyIncrement),
                updateFirestore(monthPath, energyIncrement),
                updateFirestore(yearPath, energyIncrement),
            ]);

            // Update local state
            setEnergyData(prevData => {
                const newData = {...prevData};
                const dayIndex = prevData.labels.indexOf(moment().format('ddd'));
                const weekIndex = prevData.labels.indexOf(`Week ${moment().isoWeek()}`);
                const monthIndex = prevData.labels.indexOf(moment().format('MMMM'));

                if (dayIndex !== -1) newData.datasets[0].data[dayIndex] += energyIncrement;
                if (weekIndex !== -1) newData.datasets[0].data[weekIndex] += energyIncrement;
                if (monthIndex !== -1) newData.datasets[0].data[monthIndex] += energyIncrement;

                return newData;
            });
        }
    }, FAN_SPEED.TOPIC, FAN_SPEED.TOPIC_NAME);

    useEffect(() => {
        const interval = setInterval(() => {
            const today = moment().format('ddd');
            if (today !== currentDay) {
                setCurrentDay(today);
                rollOverData(today);
            }
        }, 86400000); // 24 hours
        return () => clearInterval(interval);
    }, [currentDay]);

    const rollOverData = today => {
        setEnergyData(prevData => {
            const newData = {...prevData};
            if (moment(today).day() === 1) {
                newData.labels.splice(7, 6, ...Array.from({length: 6}, (_, i) => `Week ${moment().subtract(i, 'weeks').isoWeek()}`));
                newData.datasets[0].data.fill(0, 7, 13);
            }
            newData.datasets[0].data.fill(0, 0, 7);
            return newData;
        });
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
    container:{
        justifyContent:"flex-start",
        alignItems:"center",
        padding:15,
        height:100,
        borderRadius:20,
        backgroundColor:"#fff",
        columnGap:10,
        flexDirection:"row"
    },
    iconContainer:{
        width:60,
        height:60,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor: "#f3f3f3",
        borderRadius:50
    }
})
export default EnergyConsumptionWidget;