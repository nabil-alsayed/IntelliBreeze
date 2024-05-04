import React, { useState, useContext } from 'react'
import {Text, StyleSheet, View, TouchableOpacity} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const EnergyConsumptionWidget = ( { value = 20, unit = "kWh" }  ) => {

    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <Icon  name={"bolt"} size={30}></Icon>
            </View>
            <View>
                <View style={styles.value}>
                    <Text numberOfLines={1} style={{fontSize:25,fontWeight:"bold"}}> {value + " " + unit}</Text>
                </View>
                <View style={styles.caption}>
                    <Text numberOfLines={1} style={{fontSize:15,fontWeight:"400"}}> Electricity consumption this {""}
                        <TouchableOpacity><Text style={{color:"#169EFFFF",bottom:-4.7,fontSize:15,fontWeight:"400"}}>{timeFrame}</Text>
                        </TouchableOpacity>
                    </Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        justifyContent:"flex-start",
        alignItems:"center",
        padding:15,
        height:100,
        borderRadius:20,
        backgroundColor:"#fff",
        columnGap:10,
        flexDirection:"row"
    },
    iconContainer:{
        width:60,
        height:60,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor: "#f3f3f3",
        borderRadius:50
    }
})
export default EnergyConsumptionWidget;