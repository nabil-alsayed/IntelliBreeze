import React, {useContext, useEffect, useState} from 'react';
import {Text, View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import IconPicker from "./IconPicker";
import { db } from "../firebaseConfig";
import {collection, addDoc, onSnapshot} from "firebase/firestore";
import { ModeFormContext } from "../contexts/ModeFormContext";

const AddModeForm = () => {

    const [modeName, setModeName ] = useState('');
    const [selectedIcon, setSelectedIcon] = useState('home');
    const [fanSpeed, setFanSpeed] = useState([0]);
    const {
        setModes,
        setModalVisible,
        setFormValid,
    } = useContext(ModeFormContext);

    const handleModalClose = () => { setModalVisible(false) }

    const handleValuesChange = (values) => {
        setFanSpeed(values);
        setFormValid(validateForm())
    };

    //to Validate forms input fields
    const validateForm = () => {
        return modeName.length <= 12 && modeName.length > 0 && selectedIcon && fanSpeed[0] > 0;
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

    const submitMode = async () => {
        if (!validateForm()) {
            alert('Please fill in all fields correctly.');
            return;
        }
        try {
            const docRef = await addDoc(collection(db,"modes"), {
                ModeName: modeName,
                SelectedIcon: selectedIcon,
                FanSpeed: fanSpeed[0]
            });
            console.log("Document written with ID: ", docRef.id);
            alert('Mode added successfully!');
            handleModalClose();
        } catch (error) {
            console.error("Failed to add mode:", error);
            alert('Failed to add mode');
        }
    };

    return (
        <View style={styles.form}>
            <ModeFormContext.Provider value={setModalVisible}>
                <View style={styles.settingField}>
                    <Text style={styles.label}>Choose Mode Name</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => {
                            setModeName(text);
                        }}
                        onEndEditing={() => setFormValid(validateForm())}
                        value={modeName}
                        placeholder="Mode Name"
                        maxLength={12}
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
                            values={[0]}
                            onValuesChange={handleValuesChange}
                            min={1}
                            max={100}
                            step={1}
                            selectedStyle={{
                                backgroundColor: '#169EFFFF',
                            }}
                            unselectedStyle={{
                                backgroundColor: '#d3d3d3',
                            }}
                            containerStyle={styles.slider}
                        />
                        <Text style={{fontSize:15, fontWeight:"bold"}}>{fanSpeed}</Text>
                    </View>
                </View>
                <View style={{ rowGap:10, flexDirection:"column", width:"100%" }}>
                    <TouchableOpacity style={[styles.button,{backgroundColor: validateForm() === true ? "#169EFFFF" : "#909092"}]} onPress={submitMode}><Text style={[styles.buttonText,{color:"#fff"}]}>Create Mode</Text></TouchableOpacity>
                    <TouchableOpacity style={[styles.button,{backgroundColor:"#fff"}]} onPress={handleModalClose}><Text style={[styles.buttonText,{color:"#000"}]}>Cancel</Text></TouchableOpacity>
                </View>
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