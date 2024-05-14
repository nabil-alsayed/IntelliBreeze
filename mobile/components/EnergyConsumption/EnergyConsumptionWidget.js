import React, { useState, useEffect, useContext } from 'react';
import { Text, StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import moment from 'moment';
import { db } from "../../firebaseConfig";
import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import EnergyCalculatorUtils from '../../utils/EnergyCalculatorUtils';
import { ModeFormContext } from "../../contexts/ModeFormContext";

const energyCalculator = new EnergyCalculatorUtils();

const EnergyConsumptionWidget = () => {
    const [energy, setEnergy] = useState(0);
    const {
        modes,
        fanIsOn,
        selectedModeId,
    } = useContext(ModeFormContext);
    const unit = "kWh";
    const [timeFrame, setTimeFrame] = useState("day");
    const [counter, setCounter] = useState(0);
    const [modalVisible, setModalVisible] = useState({visible: false, timeframe: timeFrame})
    const frames = ["day","week","month"];
    const [energyData, setEnergyData] = useState(initialEnergyData());
    const [currentDay, setCurrentDay] = useState(moment().format('ddd'));

    const handleToggleFrame = () => {
        const newCounter = (counter + 1) % frames.length; // Calculate next index
        setCounter(newCounter);
        setTimeFrame(frames[newCounter]); // Update the time frame based on new counter
    };

    const handleToggleModal = () => {
        setModalVisible( {
            visible: true,
            timeframe: timeFrame
        })
    }

    useEffect(() => {
        const fetchData = async () => {
            const paths = [
                `Year/${moment().format('YYYY')}`,
                `Month/${moment().format('MMMM')}`,
                `Week/Week ${moment().isoWeek()}`,
                `Day/${moment().format('ddd')}`
            ];

            const dataPromises = paths.map(async (path) => {
                const docRef = doc(db, path);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    return { path, energy: docSnap.data().energy };
                }
                return { path, energy: 0 }; // default to 0 if not found
            });

            const results = await Promise.all(dataPromises);
            const newData = { ...energyData };
            results.forEach((result) => {
                const { path, energy } = result;
                const label = path.split('/').pop();
                const index = newData.labels.findIndex(l => l.includes(label));
                if (index !== -1) {
                    newData.datasets[0].data[index] = energy;
                }
            });
            setEnergyData(newData);
        };

        fetchData().then(r => {});
    }, []);

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