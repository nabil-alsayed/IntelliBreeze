import React, { useState } from 'react';
import CheckBox from '@react-native-community/checkbox';
import { View, Text, StyleSheet } from 'react-native';

const DefaultCheckBox = () => {
    const [isSelected, setIsSelected] = useState(false)

    return (
        <View style={styles.container}>
            <View style={styles.checkboxContainer}>
            <CheckBox
                disabled={false}
                value={isSelected}
                onValueChange={(newValue) => setIsSelected(newValue)}
                tintColors={{ true: '#01162d', false: '#c92064' }}
                style={styles.checkbox}
            />
                <Text style={[styles.label, { fontWeight: 'bold' }]}>Default</Text>
            </View>
            <Text style={styles.subLabel}>LOW (&lt;20°C)</Text>
            <Text style={styles.subLabel}>MEDIUM (&lt;27°C)</Text>
            <Text style={styles.subLabel}>HIGH (&gt;27°C)</Text>
            {isSelected && <Text>&#10003;</Text>}
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        width: 24,
        height: 24,
    },
    label: {
        marginLeft: 8,
        fontSize: 16,
    },
    subLabel: {
        marginLeft: 32, // Adjust this value for alignment
        fontSize: 14,
    },
});

export default DefaultCheckBox;