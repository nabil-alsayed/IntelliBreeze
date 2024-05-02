import React, {useContext, useState} from 'react';
import {Text, View, StyleSheet, TextInput, Dimensions, Pressable} from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import IconPicker from "./IconPicker";
import { db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { ModeFormContext } from "../contexts/ModeFormContext";

const AddModeForm = () => {

    const [modeName, setModeName ] = useState('');
    const [selectedIcon, setSelectedIcon] = useState('home');
    const [fanSpeed, setFanSpeed] = useState([0])
    const {setModalVisible} = useContext(ModeFormContext)
    const handleModalClose = () => { setModalVisible(false) }

    const submitMode = async () => {
        try {
            const docRef = await addDoc(collection(db,"modes"), {
                ModeName: modeName,
                SelectedIcon: selectedIcon,
                FanSpeed: fanSpeed[0]
            });
            console.log("Document written with ID: ", docRef.id);
            alert('Mode added successfully!');
        } catch (error) {
            console.error("Failed to add mode:", error);
            alert('Failed to add mode');
        }
    };

    let screenWidth = Dimensions.get('window').width - 150;
    return (
        <View style={styles.form}>
            <View style={styles.settingField}>
                <Text style={styles.label}>Choose Mode Name</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={text => setModeName(text)}
                    value={modeName}
                    placeholder="Mode Name"
                />
            </View>
            <View style={styles.settingField}>
                <Text style={styles.label}> Choose Mode Icon</Text>
                <IconPicker onSelectIcon={icon => setSelectedIcon(icon)} selectedIcon={selectedIcon}/>
            </View>
            <View style={styles.settingField}>
                <Text style={styles.label}> Choose Fan Speed</Text>
                <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center",columnGap:15}}>
                    <MultiSlider
                        sliderLength={screenWidth}
                        onValuesChange={(values) => setFanSpeed(values)}
                        min={0}
                        max={100}
                        step={1}
                        allowOverlap={false}
                    />
                    <Text style={{fontSize:15, fontWeight:"bold"}}>{fanSpeed}</Text>
                </View>
            </View>
            <Pressable style={[styles.button,{backgroundColor:"#169EFFFF",}]} onPress={submitMode}><Text style={{color:"white", fontSize:20, fontWeight:500}}>Create Mode</Text></Pressable>
            <ModeFormContext.Provider value={setModalVisible}>
            </ModeFormContext.Provider>
        </View>
    )
}

const styles = StyleSheet.create({
    form: {
        flexDirection: "column",
        width:"100%",
        alignItems: "center",
        justifyContent:"center",
        rowGap:10,
        borderRadius:20,
    },
    input: {
        height: 40,
        padding:10,
        borderColor: "#d4d4d4",
        borderWidth: 2,
        borderRadius:10,
        width:"100%",
    },
    label: {
        fontWeight:"600",
        fontSize:15
    },
    button:{
        borderRadius:15,
        backgroundColor:"#169EFFFF",
        width: "100%",
        height: 50,
        justifyContent:"center",
        alignItems:"center"
    },
    settingField:{
        width:"100%",
        rowGap:10,
        flexShrink:1,
        padding:15
    }
})

export default AddModeForm;