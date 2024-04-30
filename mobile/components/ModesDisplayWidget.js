import React, {useState} from "react";
import {FlatList, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Mode from "./Mode";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Divider } from '@rneui/themed';
import AddModeForm from "./AddModeForm";

const TemporaryData = [
  {
    id: '1',
    name: 'John Doe',
    customModes: {
      icon: 'fan',
      modeName: 'Night Mode',
      selected:true
    }
  },
  {
    id: '2',
    name: 'Jane Smith',
    customModes: {
      icon: 'sun',
      modeName: 'Day Mode',
      selected:false
    }
  },
  {
    id: '3',
    name: 'Jane Smith',
    customModes: {
      icon: 'car',
      modeName: 'Car Mode',
      selected:false
    }
  },
];

const ModesDisplayWidget = () => {

  const [selectedModeId, setSelectedModeId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

    const handleOpenModal = () => {
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.sectionTitle}>General Modes</Text>

      {/* Auto + Modes Container */}
      <View style={styles.subContainer}>

        {/*  Auto button */}
        <View style={styles.smallContainer}>
          <View style={styles.auto} >
            <FontAwesome6 name={"gear"} size={24} color={"black"} />
          </View>
          <Text style={styles.subTitle}>Auto</Text>
        </View>

        {/* Divider */}
        <Divider orientation="vertical" width={1} />

        {/* Add Modes Container */}
        <View style={styles.subContainer}>

          {/*  List of Modes */}
          <Mode iconName="envira" modeName="Eco-friendly"/>

          {/*  Add button */}
          <View style={styles.smallContainer}>
            <View style={styles.plus} >
              <FontAwesome6 name={"plus"} size={24} color={"grey"} />
            </View>
            <Text style={styles.subTitle}>Add Mode</Text>
          </View>

        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer:{
    flexDirection: "column",
    justifyContent: "flex-start",
    width: "100%",
    rowGap: 15,
  },
  sectionTitle:{
    color: "#000",
    fontSize: 20,
  },
  subTitle:{
    color: "#868585",
  },
  subContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%",
    columnGap: 15,
  },
  smallContainer:{
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    rowGap:5,
  },
  plus: {
    display: "flex",
    width: 70,
    height: 70,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  auto: {
    display: "flex",
    width: 70,
    height: 70,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#fff",
  },
});

export default ModesDisplayWidget;
