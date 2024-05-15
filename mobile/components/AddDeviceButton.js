import React from "react";
import {TouchableOpacity, StyleSheet, View } from "react-native";
import { AntDesign } from '@expo/vector-icons';
const AddDeviceButton = () =>{

    return(
        <View style={styles.container}>
            <AntDesign name={"plus"} size={30} style={styles.icon}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 15,
        flexDirection: "column",
        borderRadius: 20,
        width: 170,
        height: 215,
        alignItems: "center",
        justifyContent: "center",
        borderStyle: "dashed",
        borderWidth:3,
        borderColor:"rgba(141,140,140,0.36)"
    },
    icon:{
        color: "rgba(141,140,140,0.58)"
    }
});


export default AddDeviceButton;