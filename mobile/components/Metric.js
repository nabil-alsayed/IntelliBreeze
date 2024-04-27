import React, { useEffect, useState } from "react";
import {StyleSheet, Text, View} from "react-native";
import {FontAwesome6} from '@expo/vector-icons';

const Metric = ({ iconName, metricName, metricValue, metricUnit }) => {
    return (
        <View style={styles.container}>
            <View style={styles.metricValueIcon}>
                <FontAwesome6 name={ iconName } size={24} color={metricName === "Humidity" ? "skyblue" : "black"}/>
                <Text style={[styles.value, styles.child]}>
                    {metricValue} {metricUnit}
                </Text>
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
});

export default Metric;