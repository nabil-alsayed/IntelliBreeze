import React from "react";
import { View, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const LogOutButton = () => {
  return (
    <View style={styles.rightContainer}>
      <MaterialIcons
        name="more-vert"
        size={30}
        color="#000"
        // onPress={() => openMenu}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  rightContainer: {
    borderRadius: 100,
    backgroundColor: "white",
    padding: 5,
  },
});

export default LogOutButton;
