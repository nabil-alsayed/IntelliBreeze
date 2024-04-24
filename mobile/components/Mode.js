import React from "react";
import { Text, View, StyleSheet } from "react-native";

const MetricsDisplayWidget = (props) => {
  return (
    <View style={styles.container}>
      <Text> Mode </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    padding: 10,
    justifyContent: "flex-start",
    width: 120,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 20,
  },
});

export default MetricsDisplayWidget;
