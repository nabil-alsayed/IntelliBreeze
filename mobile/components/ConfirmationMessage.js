import React, {useEffect, useState} from 'react';
import {View, Text, Button, StyleSheet, Modal, Animated} from 'react-native';

const ConfirmationMessage = ({ message, onPress }) => {
    const opacity = useState(new Animated.Value(0)) [0]


    useEffect(() => {
        Animated.timing(opacity, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true
        }).start()
    }, [opacity]);


    return (
        <Modal
            animationType="fade"
            transparent={true}
            onRequestClose={() => {}}>
            <View style={styles.container}>
                <Animated.View>
                <View style={[styles.confirmationContainer, {opacity}]}>
                    <Text style={styles.message}>{message}</Text>
                </View>
                </Animated.View>
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
        marginTop: 300,
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
        alignItems: "center",
    },
});

export default ConfirmationMessage;
