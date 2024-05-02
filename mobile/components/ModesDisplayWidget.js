import React, {useContext, useEffect, useState} from "react";
import {FlatList, Modal, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Mode from "./Mode";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Divider } from '@rneui/themed';
import AddModeForm from "./AddModeForm";
import {ModeFormContext} from "../contexts/ModeFormContext";
import { collection, onSnapshot } from "firebase/firestore";
import {db} from "../firebaseConfig";

const ModesDisplayWidget = () => {

  const [modes, setModes] = useState([]);
  const [selectedModeId, setSelectedModeId] = useState(null);
  const { modalVisible, setModalVisible } = useContext(ModeFormContext);

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
              data={TemporaryData}
              keyExtractor={item => item.id}
              horizontal={true}
              contentContainerStyle={{ columnGap: 15 }}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                  <View>
                    <TouchableOpacity onPress={() => setSelectedModeId(item.id)}>
                      <Mode
                          iconName={item.customModes.icon}
                          modeName={item.customModes.modeName}
                          selected={item.id === selectedModeId}
                      />
                    </TouchableOpacity>
                  </View>
              )}
              showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
      <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={handleCloseModal}
          style={{width:"100%", height:"100%"}}
      >
          <View style={styles.modalView}>

            <View style={{position:"absolute", top:20, right:20}}>
                <Icon name={"close"} size={20} onPress={handleCloseModal}/>
            </View>

            <AddModeForm/>

            <Pressable style={[styles.button,{backgroundColor:"#ff1631",}]} onPress={handleCloseModal}><Text style={{color:"white", fontSize:20, fontWeight:500}}>Cancel</Text></Pressable>
          </View>

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
    centeredView: {
      flex: 1,
      justifyContent: 'center',
},
modalView: {
  backgroundColor: '#fff',
  borderRadius: 20,
  paddingHorizontal: 20,
  paddingTop:35,
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
