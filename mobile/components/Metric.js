import React, { useEffect, useState, createContext} from "react";
import {StyleSheet, Text, View} from "react-native";
import {FontAwesome6} from '@expo/vector-icons';

export const tempUnitContext = createContext()

const Metric = ({ iconName, metricName, metricValue, metricUnit }) => {

    const [temperature, setTemp] = useState(metricValue);
    const [unit, setUnit] = useState(metricUnit); //

    useEffect(() => {
        setTemp(metricValue);
        setUnit(metricUnit);
    }, [metricValue, metricUnit]);

    const convertTemperature = () => {
        if (unit === '°C') {
            // Convert Celsius to Fahrenheit
            const newTemp = (temperature * 9/5) + 32;
            setTemp(Math.round(newTemp));
            setUnit('°F');
        } else if (unit === '°F'){
            // Convert Fahrenheit to Celsius
            const newTemp = (((temperature - 32) * 5/9) + 273);
            setTemp(Math.round(newTemp));
            setUnit('K');
        }else {
            // Convert Fahrenheit to Kelvin
            const newTemp = temperature - 273 ;
            setTemp(Math.round(newTemp));
            setUnit('°C');
        }
    };

    const getOnPressHandler = () => {
        if (metricName === "Temperature") {
            return convertTemperature;
        }
        return null;  // No handler if condition is not met
    };

    return (
        <View style={styles.container}>
            <View style={styles.metricValueIcon}>
                <FontAwesome6 name={ iconName } size={24} color={metricName === "Humidity" ? "skyblue" : "black"}/>
                {/*Value*/}
                <Text style={[styles.value, styles.child]}>
                    {temperature}
                </Text>
                {/*Unit*/}
                <tempUnitContext.Provider value={unit}>
                <Text style={[styles.value, styles.child, metricName === "Temperature" ? styles.temperature : {}]} onPress={getOnPressHandler()}>
                    {unit}
                </Text>
                </tempUnitContext.Provider>
            </View>
            <Text style={[styles.name, styles.child]}>{metricName}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: "flex",
        width: 170,
        maxHeight: 170,
        minHeight: 120,
        padding: 20,
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        flexShrink: 0,
        alignSelf: "stretch",
        backgroundColor: "#fff",
        borderRadius: 20,
    },
    value: {
        fontWeight: "bold",
        fontSize: 20,
    },
    name: {
        color: "#000",
        fontSize: 20,
        fontStyle: "normal",
        fontWeight: "normal",
    },
    metricValueIcon:{
      flexDirection:"row",
      columnGap: 10,
    },
    temperature:{
        textDecorationLine: "underline",
    }
});

export default Metric;