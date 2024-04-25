import React from "react";
import { Text, View, StyleSheet } from "react-native";

const Metric = ({ metricName, metricValue, metricUnit }) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.value, styles.child]}>
        {metricValue} {metricUnit}
      </Text>
      <Text style={[styles.name, styles.child]}>{metricName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: 170,
    maxHeight: 170,
    minHeight: 120,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    flexShrink: 0,
    alignSelf: "stretch",
    backgroundColor: "#fff",
    borderRadius: "20",
  },
  value: {
    fontWeight: "bold",
    fontSize: 20,
  },
  name: {
    color: "#000",
    fontSize: 20,
    fontStyle: "normal",
    fontWeight: 400,
  },
});

export default Metric;
