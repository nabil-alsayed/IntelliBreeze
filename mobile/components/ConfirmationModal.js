import React, { useContext } from 'react';
import {Modal, View, Text, StyleSheet, TouchableOpacity} from "react-native";
import { ModeFormContext } from "../contexts/ModeFormContext";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";

const ConfirmationModal = ({ modeId, actionTitle }) => {
    const { setModeEditModalVisible } = useContext(ModeFormContext);
    const { modeConfirmationModalVisible, setModeConfirmationModalVisible } = useContext(ModeFormContext);

    const handleCloseConfirmationModal = () => {
        setModeConfirmationModalVisible(false);
    };

    const handleCloseEditModeModal = () => {
        setModeEditModalVisible(false);
    };

    const deleteMode = async () => {
        if (!modeId) {
            alert("Invalid document ID");
            return;
        }
        try {
            await deleteDoc(doc(db, "modes", modeId));

        } catch (error) {
            console.error("Failed to delete mode:", error);
            alert('Failed to delete mode');
        } finally {
            handleCloseConfirmationModal();
            handleCloseEditModeModal();
        }
    };

    return (
            <Modal nimationType="fade"
                   transparent={true}
                   visible={modeConfirmationModalVisible}
            >
                    <View style={styles.modal}>
                        <View style={styles.container}>
                            <Text style={styles.label}>Are you sure you want to {actionTitle}?</Text>
                            <View style={styles.buttonsContainer}>
                                <TouchableOpacity style={styles.button} onPress={deleteMode} ><Text style={styles.buttonText}>I'm sure!</Text></TouchableOpacity>
                                <TouchableOpacity style={[styles.button,{backgroundColor: "#d40808"}]} title="Close" onPress={handleCloseConfirmationModal}><Text style={styles.buttonText}>Cancel</Text></TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
    );
};

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        shadowOpacity:0.1,
        shadowOffset:5,
        shadowRadius:8,
        flexShrink:1,
    },
    container: {
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height:"100%",
        rowGap:25,
    },
    label:{
        fontSize:18,
        fontWeight:"400"
    },
    buttonsContainer:{
        flexDirection:"row",
        justifyContent:"space-evenly",
        columnGap:20
    },
    button:{
        color:"#fff",
        height:55,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor: "#169EFFFF",
        borderRadius: 15,
        flex:1,
        borderStyle:"solid",
        shadowOffset:0.5,
        shadowOpacity:0.1
    },
    buttonText:{
        color:"#fff",
        fontWeight:"400",
        fontSize:18
    }
});

export default ConfirmationModal;