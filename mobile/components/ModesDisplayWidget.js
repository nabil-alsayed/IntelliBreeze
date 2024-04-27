import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Mode from "./Mode";
import { FontAwesome6 } from '@expo/vector-icons';
import { Divider } from '@rneui/themed';

const ModesDisplayWidget = () => {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.sectionTitle}>General Modes</Text>

      {/* Auto + Modes Container */}
      <View style={styles.subContainer}>

        {/*  Auto button */}
        <View style={styles.smallContainer}>
          <View style={styles.auto} >
            <FontAwesome6 name={"gear"} size={24} color={"black"} />
          </View>
          <Text style={styles.subTitle}>Auto</Text>
        </View>

        {/* Add Modes Container */}
        <View style={styles.subContainer}>

          {/*  List of Modes */}
          <Mode iconName="envira" modeName="Eco-friendly"/>

          {/*  Add button */}
          <View style={styles.smallContainer}>
            <View style={styles.plus} >
              <FontAwesome6 name={"plus"} size={24} color={"grey"} />
            </View>
            <Text style={styles.subTitle}>Add Mode</Text>
          </View>

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
  auto: {
    display: "flex",
    width: 70,
    height: 70,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#fff",
  },
});

export default ModesDisplayWidget;
