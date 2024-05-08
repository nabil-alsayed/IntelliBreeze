import React from 'react';
import { View, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';

const BlurryModal = ({ visible, onClose, children }) => {
    return (
        <Modal
            transparent
            visible={visible}
            animationType="fade"
            onRequestClose={onClose}
        >
            <TouchableOpacity style={styles.container} activeOpacity={1} onPressOut={onClose}>
                <BlurView
                    style={styles.absolute}
                />
                <View style={styles.modalContent}>
                    {children}
                </View>
            </TouchableOpacity>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    absolute: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    modalContent: {
        width: '75%',
        backgroundColor: 'rgba(255,255,255,0.4)',
        borderRadius: 10,
        padding: 20,
        elevation: 20,
    },
});

export default BlurryModal;
