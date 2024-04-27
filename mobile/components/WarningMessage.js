import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const WarningMessage = ({ message, onPress }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.message}>{message}</Text>
            <Button title="Save Anyway" onPress={onPress} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        width: '100',
        height: '15%',
        backgroundColor: '#ffc107', // Semi-transparent background to overlay on the screen
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
    },
});

export default WarningMessage;
