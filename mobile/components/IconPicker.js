import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

    // The list of Icons to use in the picker
    const icons = ['bolt','filter','bed', 'sun-o', 'money','book', 'moon-o', 'heart','magic','paw','smile-o','refresh','leaf','tint','gamepad','cog','home','lock'];

const IconPicker = ({ onSelectIcon, selectedIcon }) => {
    return (
        <View style={styles.container}>
            {icons.map((icon) => (
                <TouchableOpacity key={icon} style={[styles.iconOption, { backgroundColor: selectedIcon === icon ? "#169eff" : "#000" }]} onPress={() => onSelectIcon(icon)}>
                    <Icon name={icon} size={30} color={"#fff"}/>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        padding: 10,
    },
    iconOption: {
        padding: 10,
        margin: 5,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 30,
    }
});

export default IconPicker;
