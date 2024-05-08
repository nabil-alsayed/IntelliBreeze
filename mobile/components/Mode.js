import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

const Mode = ( props ) => {
  return (
      <View style={styles.mainContainer}>
        <View style={[styles.modeContainer, {backgroundColor : props.selected === true ? "#169EFFFF" : "#fff"}]}>
          <Icon name={props.iconName} size={25} style={{color : props.selected === true ? "#fff" : "#000"}}/>
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
    borderRadius: 20,
  },
  modeTitle:{
    color:"#868585",
  },
});

export default Mode;
