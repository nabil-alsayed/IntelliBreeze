import React, { useState } from 'react';
import {Text, View, StyleSheet, TextInput, Dimensions} from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import IconPicker from "./IconPicker";

const AddModeForm = () => {

    const [modeName, setModeName ] = useState('');
    const [selectedIcon, setSelectedIcon] = useState('home');
    const [fanSpeed, setFanSpeed] = useState(0)

    let screenWidth = Dimensions.get('window').width - 150;
    return (
        <View style={styles.form}>
            <View style={styles.settingField}>
                <Text style={styles.label}>Choose Mode Name</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setModeName}
                    value={modeName}
                    placeholder="Mode Name"
                />
            </View>
            <View style={styles.settingField}>
                <Text style={styles.label}> Choose Mode Icon</Text>
                <IconPicker onSelectIcon={setSelectedIcon} selectedIcon={selectedIcon}/>
            </View>
            <View style={styles.settingField}>
                <Text style={styles.label}>Choose Mode Name</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setModeName}
                    value={modeName}
                    placeholder="Mode Name"
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    form: {
        flexDirection: "column",
        width:"100%",
        alignItems: "flex-start",
        rowGap:10,
        backgroundColor:"white",
        padding:20,
        borderRadius:20,
    },
    input: {
        height: 40,
        padding:5,
        borderColor: "lightgrey",
        borderWidth: 2,
        borderRadius:10,
        width:"100%",
    },
    label: {
        fontWeight:"600",
        fontSize:15
    }
})

export default AddModeForm;