import React, { useState } from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';

const DefaultCheckBox = ({onPress, onToggle}) => {
    const [isSelected, setIsSelected] = useState(false);

    const handleCheckBoxToggle  = () => {
        setIsSelected(!isSelected);
        onToggle(!isSelected);
    }

    return (
        <View style={styles.container}>

            <Pressable onPress={() => { onPress(); handleCheckBoxToggle(); }} style={styles.checkboxContainer}>
                <View style={[styles.checkbox, isSelected && styles.checked]}>
                    {isSelected && <Text style={styles.checkMark}>&#10003;</Text>}
                </View>
                <Text style={[styles.label, { fontWeight: 'bold' }]}>Default</Text>
            </Pressable>


            <Text style={styles.subLabel}>LOW (&lt;25°C)</Text>
        <Text style={styles.subLabel}>MEDIUM (&lt;27°C)</Text>
        <Text style={styles.subLabel}>HIGH (&gt;27°C)</Text>
    </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginRight: 140,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        width: 30,
        height: 30,
        borderWidth: 1,
        borderColor: '#01162d',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    checked: {
        backgroundColor: '#01162d',
    },
    label: {
        fontSize: 18,
    },
    subLabel: {
        marginLeft: 39,
        fontSize: 18,
    },
    checkMark: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default DefaultCheckBox;