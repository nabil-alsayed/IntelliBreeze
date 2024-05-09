import React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

const AutoModeButton = () => {
    const navigation = useNavigation();

    const handleAutoButtonClick = () => {
        navigation.navigate("TemperatureThreshold");
        console.log("Navigated");
    };

    return (
        <TouchableOpacity style={styles.smallContainer} onPress={handleAutoButtonClick}>
            <View style={styles.auto} >
                <Icon name={"gear"} size={24} color={"black"} />
            </View>
            <Text style={styles.subTitle}>Auto</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    smallContainer:{
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        rowGap:5,
    },
    auto: {
        display: "flex",
        width: 70,
        height: 70,
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        backgroundColor: "#fff",
    }
});

export default AutoModeButton;
