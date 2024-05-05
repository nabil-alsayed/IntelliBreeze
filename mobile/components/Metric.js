import React, { useEffect, useState, createContext} from "react";
import {StyleSheet, Text, View} from "react-native";
import {FontAwesome6} from '@expo/vector-icons';

const Metric = ({ iconName, metricName, metricValue, metricUnit}) => {

    useEffect(() => {
        setTemp(metricValue);
        setUnit(metricUnit);
    }, [metricValue, metricUnit]);

convertTemperature(metricUnit);


    return (
        <View style={styles.container}>
            <View style={styles.metricValueIcon}>
                <FontAwesome6 name={ iconName } size={24} color={metricName === "Humidity" ? "skyblue" : "black"}/>
                {/*Value*/}
                <Text style={[styles.value, styles.child]}>
                    {temperature}
                </Text>
                {/*Unit*/}
                <Text style={[styles.value, styles.child, metricName === "Temperature" ? styles.temperature : {}]} onPress={convertTemperature}>
                    {unit}
                </Text>
            </View>
            <Text style={[styles.name, styles.child]}>{metricName}</Text>
        </View>
    );
};

const convertTemperature = (unit) => {

    const [temperature, setTemp] = useState(0);
    const [unit, setUnit] = useState('°C'); //

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
    return unit
};

export {convertTemperature};

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