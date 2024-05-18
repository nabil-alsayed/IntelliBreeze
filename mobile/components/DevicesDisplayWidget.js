import React from "react";
import { View, Text, StyleSheet } from "react-native";
import DeviceCard from "./DeviceCard";


const DevicesDisplayWidget = () => {


    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>Linked Devices</Text>
            <View style={{flexDirection:'row', width:"100%", columnGap:15}}>
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
        flex:1,
        flexDirection: "column",
        justifyContent: "flex-start",
        width: "100%",
        rowGap: 15,
    },
    sectionTitle:{
        color: "#000",
        fontSize: 17,
        fontWeight:'400'
    }
});

export default DevicesDisplayWidget;