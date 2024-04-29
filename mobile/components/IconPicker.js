import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

    // The list of Icons to use in the picker
    const icons = ['bolt','filter','bed', 'sun-o', 'money','book', 'moon-o', 'heart','magic','paw','smile-o','refresh','leaf','tint','gamepad','cog','home','lock'];

const IconPicker = ({ onSelectIcon }) => {
    return (
        <View style={styles.container}>
            {icons.map((icon) => (
                <TouchableOpacity key={icon} style={styles.iconOption} onPress={() => onSelectIcon(icon)}>
                    <Icon name={icon} size={30} color="#555" />
                </TouchableOpacity>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    }
})

export default IconPicker;
