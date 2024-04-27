import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Slider from "@react-native-community/slider";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faFan } from "@fortawesome/free-solid-svg-icons";

library.add(faFan);

export default function TemperatureThresholdSettings() {
    const [range, setRange] = useState(0);
    const [preferredUnit, setPreferredUnit] = useState('C');

    const convertTemperature = (temp) => { //This function calculates the temperature if the preferredUnit is changed
        if (preferredUnit === 'F') {
            return Math.floor(Math.round((temp * 9 / 5) + 32)) + '°F';
        } else if (preferredUnit === 'K') {
            return Math.floor((temp + 273.15).toFixed(2)) + 'K';
        }
        return Math.floor(temp) + '°C';
    }

    useEffect(() => { //This function allows modification of the preferredUnit test variable
        setPreferredUnit('F');
    }, []);

    return (
        <View style={styles.container}>
            {/*LOW to MEDIUM Slider begins here*/}
            <View style={styles.header}>
                <Text style={styles.headerText}>Temperature Threshold Settings</Text>
            </View>
            <View style={styles.line}></View>
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
                    <Text style={{ fontSize: 18, fontWeight: 'normal', color: 'black', marginBottom: 10, marginRight: 10 }}>Threshold: {convertTemperature(range)}</Text>
                    <Slider
                        style={{ width: 300, height: 50 }}
                        onValueChange={(value) => setRange(value)}
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
                    <Text style={{ fontSize: 18, fontWeight: 'normal', color: 'black', marginBottom: 10, marginRight: 10 }}>Threshold: {convertTemperature(range)}</Text>
                    <Slider
                        style={{ width: 300, height: 50 }}
                        onValueChange={(value) => setRange(value)}
                        minimumValue={-50}
                        maximumValue={100}
                    />
                </View>
                <Image
                    source={require('../assets/OtherIcons/hotlogo.png')}
                    style={styles.hotLogo}
                />
            </View>
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

    },
    sliderWrapper: {
        alignItems: "center",
    },
});
