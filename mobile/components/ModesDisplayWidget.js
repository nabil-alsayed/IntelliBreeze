import React from "react";
import { View, StyleSheet } from "react-native";
import Mode from "./Mode";

const MetricsDisplayWidget = (props) => {
  return (
    <View style={styles.container}>
      <Mode />
      <View style={styles.plus} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "flex-start",
    width: "100%",
    justifyContent: "start",
    backgroundColor: "#000",
  },
  plus: {},
});

export default MetricsDisplayWidget;
