import React, {useContext, useEffect, useState} from 'react';
import {Text, View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import { ModeFormContext } from "../contexts/ModeFormContext";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import IconPicker from "./IconPicker";
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import ConfirmationModal from "./ConfirmationModal";
import Icon from 'react-native-vector-icons/FontAwesome';

const ModeSettingsForm = ({modeId} ) => {
    const {
        modes,
        setModeEditModalVisible,
        modeConfirmationModalVisible,
        setModeConfirmationModalVisible
    } = useContext(ModeFormContext);
    const [modeDetails, setModeDetails] = useState({
        modeName: '',
        selectedIcon: '',
        fanSpeed: [0] // Initialize with an array containing the default fan speed
    });

    const handleModalClose = () => {
        setModeEditModalVisible(false);
    }

    // Fetch mode details when the component mounts or the modeId changes
    useEffect(() => {
        const currentMode = modes.find(mode => mode.id === modeId);
        if (currentMode) {
            setModeDetails({
                modeName: currentMode.ModeName,
                selectedIcon: currentMode.SelectedIcon,
                fanSpeed: [currentMode.FanSpeed] // Ensure this is an array
            });
        }
    }, [modes, modeId]);

    const handleValuesChange = (values) => {
        setModeDetails(prev => ({ ...prev, fanSpeed: values }));
    };

    const submitModification = async () => {
        if (!modeId) {
            alert("Invalid document ID");
            return;
        }
        try {
            const modeDoc = doc(db, "modes", modeId);
            await updateDoc(modeDoc, {
                ModeName: modeDetails.modeName,
                SelectedIcon: modeDetails.selectedIcon,
                FanSpeed: modeDetails.fanSpeed[0] // Since fanSpeed is an array, take the first element
            });
            alert('Mode updated successfully!');
            handleModalClose();
        } catch (error) {
            console.error("Failed to update mode:", error);
            alert('Failed to update mode');
        }
    };

    const handleOpenConfirmationModal = () => {
        setModeConfirmationModalVisible(true)
    }

    const validateForm = () => {
        return modeDetails.modeName.length <= 12 && modeDetails.modeName.length > 0 && modeDetails.selectedIcon && modeDetails.fanSpeed > 0;
    };

    return (
    <View style={styles.form}>
            <ConfirmationModal style={styles.modal} actionTitle={"Log Out"} visibility={modeConfirmationModalVisible} modeId={modeId}/>
            <View style={styles.settingField}>
                <Text style={styles.label}>Choose Mode Name</Text>
                <TextInput
                    value={modeDetails.modeName}
                    style={styles.input}
                    onChangeText={text => setModeDetails(prev => ({ ...prev, modeName: text }))}
                    placeholder="Mode Name"
                    />
            </View>
            <View style={styles.settingField}>
                <Text style={styles.label}> Choose Mode Icon</Text>
                <IconPicker onSelectIcon={icon => setModeDetails(prev => ({ ...prev, selectedIcon: icon }))} selectedIcon={modeDetails.selectedIcon}/>
            </View>
            <View style={styles.settingField}>
                <Text style={styles.label}> Choose Fan Speed</Text>
                <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center",columnGap:15}}>
                    <MultiSlider
                        values={modeDetails.fanSpeed}
                        onValuesChange={handleValuesChange}
                        min={1}
                        max={100}
                        step={1}
                        selectedStyle={{ backgroundColor: 'blue' }}
                        unselectedStyle={{ backgroundColor: 'grey' }}
                    />
                    <Text style={{fontSize:15, fontWeight:"bold"}}>{modeDetails.fanSpeed.toString()}</Text>
                </View>
            </View>
            <Pressable style={[styles.button,{backgroundColor: validateForm() === true ? "#169EFFFF" : "#909092"}]} onPress={submitModification}><Text style={{color:"white", fontSize:20, fontWeight:500}}>Apply Changes</Text></Pressable>
            <Pressable style={[styles.button,{backgroundColor:"#ff1631"}]} onPress={handleOpenConfirmationModal}><Text style={{color:"white", fontSize:20, fontWeight:500}}>Delete</Text></Pressable>
            <Pressable style={[styles.button,{backgroundColor:"#ffffff"}]} onPress={handleModalClose}><Text style={{color:"black", fontSize:20, fontWeight:500}}>Cancel</Text></Pressable>
    </View>
)
}

const styles = StyleSheet.create({
    form: {
        flexDirection: "column",
        width:"100%",
        alignItems: "center",
        justifyContent:"flex-start",
        rowGap:10,
        borderRadius:20,
        backgroundColor:"#fff",
        paddingHorizontal:20,
        paddingTop:100,
        flex:1
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
        width: "100%",
        height: 50,
        justifyContent:"center",
        alignItems:"center",
        borderStyle:"solid",
        shadowOffset:2,
        shadowOpacity:0.2
    },
    settingField:{
        width:"100%",
        rowGap:10,
        flexShrink:1,
        padding:15
    },
    slider:{
        flex:1,
        height:40
    },
    modal:{
        width:"100%",
        justifyContent:"center",
        alignItems:"center"
    }
})

export default ModeSettingsForm;
