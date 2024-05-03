import React, { useContext } from 'react';
import {Modal, View, Text, StyleSheet, TouchableOpacity} from "react-native";
import { ModeFormContext } from "../contexts/ModeFormContext";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";

const ConfirmationModal = ({ modeId, visibility, action, actionTitle }) => {
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
                            <Text>Are you sure you want to {action}?</Text>
                            <View style={styles.buttonsContainer}>
                                <TouchableOpacity style={styles.button} onPress={deleteMode} ><Text style={styles.buttonText}>Delete</Text></TouchableOpacity>
                                <TouchableOpacity style={styles.button} title="Close" onPress={handleCloseConfirmationModal}><Text style={styles.buttonText}>Close</Text></TouchableOpacity>
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
    },
    container: {
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
        width: 350,
        height:200,
        rowGap:20
    },
    buttonsContainer:{
        flexDirection:"row",
        columnGap:20
    },
    button:{
        color:"#fff",
        width:100,
        height:45,
        justifyContent:"center",
        alignItems:"center"
    },
    buttonText:{
        color:"#000"
    }
});

export default ConfirmationModal;