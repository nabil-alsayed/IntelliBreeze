import React from "react";
import { View, Text, StyleSheet } from "react-native";
import DeviceCard from "./DeviceCard";

const DevicesDisplayWidget = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>Linked Devices</Text>
            <View style={styles.deviceCardContainer}>
                <DeviceCard
                    deviceTitle = "Fan"
                    deviceUnits = "Cycle"
                />
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        flexGrow: 1,
        flexDirection: "column",
        justifyContent: "flex-start",
        width: "100%",
        paddingVertical: 10,

    },
    sectionTitle:{
        width: "100%",
        color: "#000",
        fontSize: 17,
        fontWeight:'400',
    },
    deviceCardContainer: {
        flexDirection: 'row',
        width: '100%',
        columnGap: 15,
        marginTop: 20,
    }
});

export default DevicesDisplayWidget;