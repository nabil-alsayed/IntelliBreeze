import React, { useContext } from "react";
import {StyleSheet, Text, View} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import {FanContext} from "../contexts/FanContext";
import {MODES} from "../constants/LogicConstants";

const AutoModeButton = () => {
    const { selectedModeId } = useContext(FanContext)

    const handleSelectionHighlight = () => {
        return selectedModeId === MODES.AUTO_MODE.ID  ;
    }

    return (
        <View style={styles.smallContainer}>
            <View style={[styles.modeContainer, {backgroundColor : handleSelectionHighlight() ? "#169EFFFF" : "#fff"}]}>
                <Icon name={"tachometer"} size={25} style={{color : handleSelectionHighlight() ? "#fff" : "#000"}}/>
            </View>
            <Text style={styles.subTitle}>Auto</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    smallContainer:{
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        rowGap:5,
    },
    modeContainer: {
        display: "flex",
        width: 70,
        height: 70,
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
    },
    subTitle:{
        color:"#868585",
    },
});

export default AutoModeButton;
