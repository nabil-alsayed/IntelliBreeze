import React from 'react';
import {View, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Divider } from "@rneui/themed";

// The list of Icons to use in the picker
const icons = ['home','bolt','filter','bed', 'sun-o', 'money','book', 'moon-o', 'heart','magic','paw','smile-o','refresh','leaf','tint','gamepad','cog','lock'];

const IconPicker = ({ onSelectIcon, selectedIcon }) => {
    return (
        <View style={styles.container}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                {icons.map((icon) => (
                    <TouchableOpacity key={icon} style={[styles.iconOption, { backgroundColor: selectedIcon === icon ? "#169eff" : "#000" }]} onPress={() => onSelectIcon(icon)}>
                        <Icon name={icon} size={25} color={"#fff"}/>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <Divider orientation="vertical" size={2}/>
            <View style={[styles.iconOption, {backgroundColor: "#398e15"}]}>
                <Icon name={selectedIcon} size={25} color={"#fff"}/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'nowrap',
        width:"100%",
        justifyContent:"space-between",
    },
    iconOption: {
        // padding: 10,
        marginHorizontal: 5,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 30,
    }
});

export default IconPicker;
