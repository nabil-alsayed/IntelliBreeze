import React, {useContext, useEffect, useState} from "react";
import {FlatList, Modal, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Mode from "./Mode";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Divider } from '@rneui/themed';
import AddModeForm from "./AddModeForm";
import {ModeFormContext} from "../contexts/ModeFormContext";
import { collection, onSnapshot, updateDoc, doc, getDoc} from "firebase/firestore";
import {db} from "../firebaseConfig";
import ModeSettingsForm from "./ModeSettingsForm";
import AutoModeButton from "./AutoModeButton";

const ModesDisplayWidget = () => {

  const [currentModeDetails, setCurrentModeDetails] = useState({});
  const {
    modes,
    setModes,
    modalVisible,
    setModalVisible,
    modeEditModalVisible,
    setModeEditModalVisible,
    selectedModeId,
    setSelectedModeId,
  } = useContext(ModeFormContext);

  // fetch created modes and set the local state to it

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

  // fetch selected mode and set the context state to it

  useEffect(() => {
    const selectedMode = modes.find(mode => mode.Selected === true);
    if (selectedMode) {
      setSelectedModeId(selectedMode.id);
    }
  }, [modes]); // I added modes as dependency to account for modes changes

  const handleLongPress = (mode) => {
    setCurrentModeDetails(mode);
    setModeEditModalVisible(true);
  };
  const handleOpenModal = () => setModalVisible(true);
  const handleCloseModal = () => setModalVisible(false);

  return (
      <View style={styles.mainContainer}>
        <Text style={styles.sectionTitle}>General Modes</Text>

        {/* Auto + Modes Container */}
        <View style={styles.subContainer}>

          {/*  Auto button */}
          <AutoModeButton/>

          {/* Divider */}
          <Divider orientation="vertical" width={1}/>

          {/*  Add button */}
          <View style={styles.smallContainer}>
            <TouchableOpacity
                style={[styles.plus, {
                  borderWidth: 1, padding: 10,
                  borderRadius: 20, borderColor: "lightgrey",
                  borderStyle: "dashed"
                }]}
                onPress={handleOpenModal}
            >
              <Icon name={"plus"} size={24} color={"grey"}/>
            </TouchableOpacity>
            <Text style={styles.subTitle}>Add Mode</Text>
          </View>
          <View style={{width: 160}}>
            <FlatList
                data={modes}
                keyExtractor={item => item.id}
                horizontal={true}
                contentContainerStyle={{columnGap: 15}}
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => (
                    <TouchableOpacity onPress={() => handleModeSelection(item.id)}
                                      onLongPress={() => handleLongPress(item)}>

                      {/* the modes that will be shown in the list */}
                      <Mode iconName={item.SelectedIcon}
                            modeName={item.ModeName}
                            selected={item.Selected}/>

                    </TouchableOpacity>
                )}
                showsVerticalScrollIndicator={false}
            />
            <Modal
                animationType="slide"
                transparent={true}
                visible={modeEditModalVisible}
                style={{width: "100%", height: "100%"}}
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
