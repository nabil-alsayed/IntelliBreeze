import React from "react";
import { Text, View, StyleSheet } from "react-native";
import DropDownMenuButton from "./DropDownMenuButton";

const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.leftContainer}>
        <Text style={styles.headerText}>Hello! 👋</Text>
        <Text style={styles.subHeaderText}>Welcome back to IntelliBreeze</Text>
      </View>
      <DropDownMenuButton />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row", //
    paddingTop: 20,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  leftContainer: {
    flex: 1,
  },
  headerText: {
    color: "#333",
    fontSize: 25,
  },
  subHeaderText: {
    color: "#707070",
    fontSize: 20,
  },
});

export default Header;
