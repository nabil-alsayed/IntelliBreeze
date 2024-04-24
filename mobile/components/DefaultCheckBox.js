import React from "react";
import { Text, View, StyleSheet } from "react-native";
import React, {useState} from 'react';
import {CheckBox, Text, StyleSheet, View} from 'react-native';


const DefaultCheckBox = () => {
    const[isSelected, setSelection] = useState(false);

    return (
        <CheckBox
            value = {isSelected}
            onValueChange = {setSelection(true)}



    )

}

const styles = StyleSheet.create({
    container:
})