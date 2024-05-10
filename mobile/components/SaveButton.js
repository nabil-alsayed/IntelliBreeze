/*
<<<<<<< HEAD
import React, {useState} from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';

const SaveButton = () => {
    return(
      <View>
        <TouchableOpacity>
            <Image style={styles.buttonImage} source={require("../assets/OtherIcons/SaveButton.png")} />
        </TouchableOpacity>
      </View>
    );
}  

const styles = StyleSheet.create({
    buttonImage: {
      width: 120,
      length: 70,
        marginLeft: 90,
    }
});

export default SaveButton;
=======
*/


import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

const SaveButton = ({ onPress, title }) => {
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
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default SaveButton;
