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
    padding: 15,
    flexDirection: "column",
    borderRadius: 20,
    backgroundColor: "white",
    width: "45%",
    height: 150,
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  child: {
    margin: 3,
  },
  value: {
    fontWeight: "bold",
    fontSize: 20,
  },
  name: {
    fontSize: 15,
  },
});

export default Metric;
