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
import { useNavigation } from "@react-navigation/native";
import {FAN_SPEED, MODES} from "../constants/LogicConstants";
import {TemperatureContext} from "../contexts/TemperatureContext";
import useTemperatureThreshold from "../hooks/useTemperatureThreshold";
import {connectToMqtt, publishToTopic} from "../utils/mqttUtils";
const MODENAME_PUB_TOPIC =  "/intellibreeze/app/modeName"


const ModesDisplayWidget = () => {
  const navigation = useNavigation();

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
  const {
    lowToMediumRange,
    mediumToHighRange,
    setLowToMediumRange,
    setMediumToHighRange,
    isAutoMode,
    setIsAutoMode
  } = useContext(TemperatureContext);


  const publishSelectedModeName = ( modeNameId ) => {
    const selectedMode = modes.find( mode => mode.id === modeNameId);
    const selectedModeName = selectedMode.ModeName;

    console.log(selectedModeName);

    const client = connectToMqtt();
    try {
      client.onConnected = () => {
        publishToTopic(client, MODENAME_PUB_TOPIC, selectedModeName, "selectedModeName");
      };
    } catch (error) {
      console.error("Publishing Error", error); // Shows error on phone app and highlights error message in log
    }

  };

  // fetches created modes and set the local state to it
  const handlePress = (item) => {
    setSelectedModeId(item.id);
    publishSelectedModeName(item.id);
    handleCustomModeSelection(item.id);
    console.log(selectedModeId);

  };

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

  //Call to the hook to fetch and publish the threshold values as soon as the modes are rendered on the home screen
  useTemperatureThreshold(lowToMediumRange, mediumToHighRange, setLowToMediumRange, setMediumToHighRange)


  const handleLongPress = (mode) => {
    setCurrentModeDetails(mode);
    setModeEditModalVisible(true);
  };
  const handleOpenModal = () => setModalVisible(true);
  const handleCloseModal = () => setModalVisible(false);

  // Updates db to set the old selected Mode to Selected: false
  const deselectMode = async (modeRef) => {
    try {
      await updateDoc(modeRef, { Selected: false });
      console.log("Old mode was successfully deselected.");
    } catch (error) {
      console.error("Error in deselecting mode:", error);
    }
  }

  // Updates db to set the newly selected Mode to Selected: true

  const selectMode = async (modeRef) => {
    try {
      await updateDoc(modeRef, { Selected: true });
      console.log("New mode was successfully selected.");
    } catch (error) {
      console.error("Error in selecting mode:", error);
    }
  }

  // Checks if Mode Exist in Database to Use for Deciding to Update or Not

  const modeExistInDB = async (modeRef) => {
    const docSnap = await getDoc(modeRef);
    return docSnap.exists()
  }

  // Handle Selection of New Mode and Deselection of Old Mode When a Mode is Pressed

  const handleCustomModeSelection = async (modeId) => {

    // gets the reference for old selected mode and the newly selected mode

    const oldModeRef = doc(db, "modes", selectedModeId);
    const newModeRef = doc(db, "modes", modeId);

    try {

      // if mode doesn't exist or if it is same as old mode, it doesn't deselect
      if (selectedModeId !== modeId && await modeExistInDB(oldModeRef) ) {
        deselectMode(oldModeRef);
      }

      // if mode is same as old mode, mode will not be selected/updated in db
      if (selectedModeId !== modeId) {
        selectMode(newModeRef);
      }
      setSelectedModeId(modeId);  // Assume setSelectedModeId is a state setter function
    } catch (error) {
      console.error("Error in handling mode selection:", error);
    }
  }

  // Navigates the user to the Temperature Threshold Screen by Long Pressing
  const handleAutoModeLongPress = () => {
    navigation.navigate("TemperatureThreshold");
    console.log("Navigated");
  };

  /* Changes context/global state of modeSelectedId to
  "auto" to select Auto and deselect previous mode */

  const handleAutoModePress = () => {
    if(selectedModeId !== MODES.AUTO_MODE.ID){
      const oldModeRef = doc(db, "modes", selectedModeId);
      deselectMode(oldModeRef)
      console.log("Switched to auto mode");
      setSelectedModeId(MODES.AUTO_MODE.ID);
      setIsAutoMode(!isAutoMode);
    }
  }

  // Hook to continuously check for Mode and Speed changes to communicate it with MQTT

  useEffect(() => {
    // Checks if the mode is not null and is not Auto Mode
    const topic = FAN_SPEED.TOPIC;
    const topicName = FAN_SPEED.TOPIC_NAME;
    const client = connectToMqtt();
    if (selectedModeId && selectedModeId !== MODES.AUTO_MODE.ID) {
      const selectedMode = modes.find(mode => mode.id === selectedModeId);
      const selectedFanSpeed = selectedMode.FanSpeed;

      try {
        client.onConnected = () => {
          publishToTopic(client, topic, selectedFanSpeed, topicName);
        };
      } catch (error) {
        console.error("Publishing Error", error); // Shows error on phone app and highlights error message in log
      }
      console.log(`Publishing fan speed for mode ${selectedMode.ModeName}: ${selectedFanSpeed}`);
    } else {

      try {
        client.onConnected = () => {
          publishToTopic(client, topic, MODES.AUTO_MODE.ID, topicName);
        };
      } catch (error) {
        console.error("Publishing Error", error); // Shows error on phone app and highlights error message in log
      }


      console.log(`Publishing fan speed for mode AUTO`);
    }
  }, [modes,selectedModeId]);


  return (
      <View style={styles.mainContainer}>
        <Text style={styles.sectionTitle}>Modes</Text>

        {/* Auto + Modes Container */}
        <View style={styles.subContainer}>

          {/*  Auto button */}
          <TouchableOpacity onPress={handleAutoModePress} onLongPress={handleAutoModeLongPress}>
            <AutoModeButton />
          </TouchableOpacity>

          {/* Divider */}
          <Divider orientation="vertical" width={1}/>

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
          <View style={{flex:1}}>
            <FlatList
                data={modes}
                keyExtractor={item => item.id}
                horizontal={true}
                contentContainerStyle={{columnGap: 15}}
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => (
                    <TouchableOpacity onPress={() => handlePress(item)}
                                      onLongPress={() => handleLongPress(item)}>

                      {/* the modes that will be shown in the list */}
                      <Mode iconName={item.SelectedIcon}
                            modeName={item.ModeName}
                            selectedModeId={item.id}/>

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
    fontSize: 17,
    fontWeight:'400'
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