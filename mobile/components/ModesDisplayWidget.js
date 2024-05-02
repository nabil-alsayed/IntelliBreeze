import React, {useState} from "react";
import {FlatList, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Mode from "./Mode";
import Icon from 'react-native-vector-icons/FontAwesome';
import {AntDesign} from "@expo/vector-icons";
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
      >
          <View style={styles.modalView}>

            <TouchableOpacity style={{position:"absolute", top:65, right:35} } onPress={handleCloseModal} >
                <AntDesign name={"close"} size={30} />
            </TouchableOpacity>

            <AddModeForm/>

            <Pressable style={[styles.button,{backgroundColor:"#169EFFFF",}]} ><Text style={{color:"white", fontSize:20, fontWeight:500}}>Create Mode</Text></Pressable>
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
