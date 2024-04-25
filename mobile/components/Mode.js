import React from "react";
import { Text, View, StyleSheet } from "react-native";

const MetricsDisplayWidget = (props) => {
  return (
      <View style={styles.mainContainer}>
        <View style={styles.modeContainer}>
          <Text> Mode </Text>
        </View>
        <Text style={styles.modeTitle}>Mode</Text>
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
