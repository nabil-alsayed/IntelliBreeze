import React from 'react';
import { View, Text, StyleSheet, Modal } from 'react-native';

const ConfirmationMessage = ({ message }) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            onRequestClose={() => {}}>
            <View style={styles.container}>
                <View style={styles.confirmationContainer}>
                    <Text style={styles.message}>{message}</Text>
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
        backgroundColor: '#0180ee',
        padding: 10,
        borderRadius: 5,
        width: '80%',
        alignItems: 'center', // Center align the content horizontally
    },
    message: {
        color: 'black',
        fontSize: 16,
        marginBottom: 5,
        marginLeft: 10,
        marginRight: 10,
        textAlign: 'center',
    },
});

export default ConfirmationMessage;
