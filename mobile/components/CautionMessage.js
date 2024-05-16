import React from 'react';
import {View, Text, Button, StyleSheet, Modal} from 'react-native';

const CautionMessage = ({ message, onPressCancel }) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            onRequestClose={() => {}}>
            <View style={styles.container}>
                <View style={styles.warningContainer}>
                    <Text style={styles.message}>{message}</Text>
                    <Button title="Cancel" onPress={onPressCancel} />
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
        width: '105%',
        height: '20%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        marginTop: 300,
    },
    warningContainer: {
        backgroundColor: '#ffc107',
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
        alignItems: "center",
    },
});

export default CautionMessage;
