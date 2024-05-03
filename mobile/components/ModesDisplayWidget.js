import React, {useContext, useEffect, useState} from "react";
import {FlatList, Modal, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Mode from "./Mode";
import Icon from 'react-native-vector-icons/FontAwesome';
import {AntDesign} from "@expo/vector-icons";
import { Divider } from '@rneui/themed';
import AddModeForm from "./AddModeForm";
import {ModeFormContext} from "../contexts/ModeFormContext";
import { collection, onSnapshot } from "firebase/firestore";
import {db} from "../firebaseConfig";
import ModeSettingsForm from "./ModeSettingsForm";

const ModesDisplayWidget = () => {

  const [selectedModeId, setSelectedModeId] = useState(null); // I have to change it later to users selected
  const [currentModeDetails, setCurrentModeDetails] = useState({});
  const {
    modes,
    setModes,
    modalVisible,
    setModalVisible,
    modeEditModalVisible,
    setModeEditModalVisible
  } = useContext(ModeFormContext);


  const handleLongPress = (mode) => {
    setCurrentModeDetails(mode);
    setModeEditModalVisible(true);
  };

  const handleOpenModal = () => setModalVisible(true);
  const handleCloseModal = () => setModalVisible(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "modes"), (querySnapshot) => {
      const fetchedModes = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setModes(fetchedModes);
    });

    return () => unsubscribe();  // Clean up the subscription
  }, []);

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.sectionTitle}>General Modes</Text>

      {/* Auto + Modes Container */}
      <View style={styles.subContainer}>

        {/*  Auto button */}
        <View style={styles.smallContainer}>
          <View style={styles.auto} >
            <Icon name={"gear"} size={24} color={"black"} />
          </View>
          <Text style={styles.subTitle}>Auto</Text>
        </View>

        {/* Divider */}
        <Divider orientation="vertical" width={1} />

        {/*  Add button */}
        <View style={styles.smallContainer}>
          <TouchableOpacity
              style={[styles.plus,{borderWidth:1,padding:10,
                borderRadius:20,borderColor:"lightgrey",
                borderStyle:"dashed"}]}
              onPress={handleOpenModal}
          >
            <Icon name={"plus"} size={24} color={"grey"} />
          </TouchableOpacity>
          <Text style={styles.subTitle}>Add Mode</Text>
        </View>
        <View style={{width:160}}>
          <FlatList
              data={modes}
              keyExtractor={item => item.id}
              horizontal={true}
              contentContainerStyle={{ columnGap: 15 }}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => setSelectedModeId(item.id)} onLongPress={() => handleLongPress(item)}>
                    <Mode iconName={item.SelectedIcon} modeName={item.ModeName} selected={item.id === selectedModeId} />
                  </TouchableOpacity>
              )}
              showsVerticalScrollIndicator={false}
          />
          <Modal
              animationType="slide"
              transparent={true}
              visible={modeEditModalVisible}
              style={{width:"100%", height:"100%"}}
              onRequestClose={() => setModalVisible(false)}
          >
            <ModeSettingsForm
                modeId={currentModeDetails.id}
            />
          </Modal>
        </View>
      </View>
      <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={handleCloseModal}
      >

        <AddModeForm style={styles.modalView}/>

      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer:{
    flex:1,
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
modalView: {
  backgroundColor: '#fff',
  borderRadius: 20,
  paddingHorizontal: 20,
  paddingTop:90,
  rowGap:20,
  alignItems: 'center',
  width:"100%",
  height:"100%",
},
buttonClose: {
  backgroundColor: "#2196F3",
      borderRadius: 20,
      padding: 10,
      elevation: 2,
      marginTop: 15,
},button:{
    borderRadius:15,
    width: "100%",
    height: 50,
    justifyContent:"center",
    alignItems:"center"
  }
});

export default ModesDisplayWidget;
