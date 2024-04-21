import React from "react";
import { StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import Header from "./components/Header";
import MetricsDisplayWidget from "./components/MetricsDisplayWidget";

export default function App({ name = "Nabil" }) {
  return (
    <View style={styles.container}>
      <Header name={name} />
      <MetricsDisplayWidget />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f3f3", // Light grey background
    alignItems: "center",
    justifyContent: "top",
    paddingTop: 50,
    paddingLeft: 10,
    paddingRight: 10,
  },
});
