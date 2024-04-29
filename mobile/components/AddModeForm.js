import React, { useState } from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';

const AddModeForm = () => {

    const [modeName, setModeName ] = useState('');
    const [selectedIcon, setSelectedIcon] = useState('');

    return (
        <View style={styles.form}>
            <Text style={{fontWeight:"600",fontSize:15,}}>Mode Name</Text>
            <TextInput
                style={styles.input}
                onChangeText={setModeName}
                value={modeName}
                placeholder="Mode Name"
            />
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
})

export default AddModeForm;