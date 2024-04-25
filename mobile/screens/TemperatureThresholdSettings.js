import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Slider from "@react-native-community/slider";

export default function TemperatureThresholdSettings() {
    const [range, setRange] = useState(0);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Temperature Threshold Settings</Text>
            </View>
            <View style={styles.line}></View>
            <View style={styles.adjustmentContainer}>
                <Image
                    source={require('../assets/OtherIcons/coldlogo.png')}
                    style={styles.coldLogo}
                />
                <Slider
                    style={{ width: 300, height: 50 }}
                />
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
        marginTop: 5,
    },
    logoContainer: {
        marginLeft: 10,
    },
    hotLogo: {
        width: 40,
        height: 40,
    },
    coldLogo: {
        width: 50,
        height: 50,
    },
    adjustmentContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between", // Added for spacing between logos and slider
        marginTop: 20,
    },
});
