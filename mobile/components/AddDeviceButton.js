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
        backgroundColor:"rgba(33,150,243,0.9)"
    },
    icon:{
        color: "#fff"
    }
});


export default AddDeviceButton;