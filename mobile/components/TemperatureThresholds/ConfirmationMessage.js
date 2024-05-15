import React from 'react';
import {View, Text, StyleSheet, Modal, TouchableOpacity} from 'react-native';

const ConfirmationMessage = ({ message, onPress }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            onRequestClose={() => {}}>
            <View style={styles.container}>
                <View style={styles.confirmationContainer}>
                    <View style={{flex:1, justifyContent:"center"}}>
                        <Text style={[styles.message,{color:"#000", fontSize: 25}]}>{message} 🎉</Text>
                    </View>
                    <TouchableOpacity onPress={onPress}
                                      style={styles.button}>
                        <Text style={[styles.message,{color:"#fff", fontSize: 16}]}>
                            OK
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    confirmationContainer: {
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
        marginBottom: 5,
        marginLeft: 10,
        marginRight: 10,
        textAlign: 'center',
        fontWeight: '500',
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

export default ConfirmationMessage;
