import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function TemperatureThresholdSettings() {
    return (
        <View style={styles.container}>
            <Text>Temperature Threshold Settings</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
