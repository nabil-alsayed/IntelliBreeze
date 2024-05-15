import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

const SaveButton =({ onPress }) => {
    return (
        <TouchableOpacity
            style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>{"Save"}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 18,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default SaveButton;
