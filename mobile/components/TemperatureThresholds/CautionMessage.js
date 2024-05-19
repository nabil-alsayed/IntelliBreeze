import React from 'react';
import {View, Text, StyleSheet, Modal, TouchableOpacity} from 'react-native';

const CautionMessage = ({ message, onPressOk }) => {
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
                    <TouchableOpacity onPress={onPressOk}
                                      style={[styles.button]}>
                        <Text style={[styles.message,{color:"#fff", fontSize: 16,}]}>
                            Go back
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height:"100%",
        rowGap:25,
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
        rowGap: 20,
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
        backgroundColor:"#d40808",
        width:'100%',
        height:50,
        borderRadius:20
    }
});

export default CautionMessage;
