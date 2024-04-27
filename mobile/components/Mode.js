import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { FontAwesome6 } from '@expo/vector-icons';

const MetricsDisplayWidget = ( props ) => {
  return (
      <View style={styles.mainContainer}>
        <View style={styles.modeContainer}>
          <FontAwesome6 name={props.iconName} size={25}/>
        </View>
        <Text style={styles.modeTitle}>{props.modeName}</Text>
      </View>
  );
};

const styles = StyleSheet.create({
  mainContainer:{
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
    backgroundColor: "#fff",
    borderRadius: 20,
  },
  modeTitle:{
    color:"#868585",
  },
});

export default MetricsDisplayWidget;
