import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Mode from "./Mode";
import { FontAwesome6 } from '@expo/vector-icons';

const ModesDisplayWidget = () => {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.text}>General Modes</Text>
        <View style={styles.modesContainer}>
        <Mode iconName="envira" modeName="Eco-friendly"/>
        <View style={styles.plusContainer}>
          <View style={styles.plus} >
            <FontAwesome6 name={"plus"} size={24} color={"grey"} />
          </View>
          <Text style={styles.addTitle}>Add Mode</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer:{
    flexDirection: "column",
    justifyContent: "flex-start",
    width: "100%",
    rowGap: 15,
  },
  text:{
    color: "#000",
    fontSize: 20,
  },
  addTitle:{
    color: "#868585",
  },
  modesContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%",
    columnGap: 15,
  },
  plusContainer:{
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    rowGap:5,
  },
  plus: {
    display: "flex",
    width: 70,
    height: 70,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
});

export default ModesDisplayWidget;
