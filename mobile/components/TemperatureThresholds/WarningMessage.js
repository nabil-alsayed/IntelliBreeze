import React from 'react';
import {View, Text, Button, StyleSheet, Modal, TouchableOpacity} from 'react-native';

const WarningMessage = ({ message, onPressSave, onPressCancel }) => {
    return (
        <Modal
            animationType="slide"
            transparent={false}
            onRequestClose={() => {}}
            style={styles.modalContainer}
        >
            <View style={styles.container}>
                <View style={styles.warningContainer}>
                    <Text style={styles.message}>{message}</Text>
                    <TouchableOpacity onPress={onPressCancel}
                                      style={[styles.button]}>
                        <Text style={[styles.message,{color:"#fff", fontSize: 16,}]}>
                            Cancel
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onPressSave}
                                      style={[styles.button,{backgroundColor:"red"}]}>
                        <Text style={[styles.message,{color:"#fff", fontSize: 16,}]}>
                            Save Anyway
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height:"100%",
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    warningContainer: {
        backgroundColor: 'rgba(255,255,255,0.96)',
        paddingVertical:50,
        paddingHorizontal:30,
        borderRadius: 30,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent:'center',
        rowGap: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 3,
    },
    message: {
        color: 'black',
        fontSize: 20,
        marginBottom: 5,
        marginLeft: 10,
        marginRight: 10,
        textAlign: 'center',
    },
    button: {
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#0180EEFF",
        width:'100%',
        height:50,
        borderRadius:20
    }
});

export default WarningMessage;
