import React, {useContext, useEffect, useState} from "react";
import { Text, StyleSheet, TouchableOpacity, View } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import { ModeFormContext } from "../contexts/ModeFormContext";


const DeviceCard = ({deviceTitle, deviceValue, deviceUnits, onPress}) =>{

    return(
    <TouchableOpacity onPress = {onPress} style={styles.container}>
        <View style={{flex:1, flexDirection:"column", justifyContent: 'space-evenly'}}>
            <View style={{flexDirection:'row', columnGap:15}}>
                <FontAwesome5 name={"fan"} size={35}></FontAwesome5>
                <View style={{flexDirection:'row', columnGap:5}}>
                    <Text style={[styles.deviceSubText, {fontWeight: 'bold', color: "#000"}]}>{deviceValue}</Text>
                    <Text style={[styles.deviceSubText, {color: "#000"}]}>{deviceUnits}</Text>
                </View>
            </View>
            <Text style={[styles.deviceSubText, {fontWeight: 'bold', color: "#000"}]}>{deviceTitle}</Text>
        </View>
      </TouchableOpacity>
    );    
};

const styles = StyleSheet.create({
    container: {
      padding: 15,
      flexDirection: "column",
      borderRadius: 20,
      backgroundColor: "#fff",
      width: 170,
      height: 215,
      alignItems: "center",
      justifyContent: "center",
    },
    deviceModeContainer: {
       backgroundColor: "#f3f3f3",
        flexShrink:1,
        padding:5,
        borderRadius:6
    },
    toggle: {
       backgroundColor: "#f3f3f3",
        flexShrink:1,
        padding:5,
        borderRadius:6
    },
    fanChild: {
      margin: 3,
    },
    deviceSubText: {
      fontSize: 20,
    },
    title: {
      fontSize: 15,
    },
    deviceModeTitle:{
        fontSize:10
    }
  });


  export default DeviceCard;