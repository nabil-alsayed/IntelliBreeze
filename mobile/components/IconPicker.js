import React from 'react';
import { View } from 'react-native';
const IconPicker = () => {

    // The list of Icons to use in the picker
    const icons = ['bolt','filter','bed', 'sun-o', 'money','book', 'moon-o', 'heart','magic','paw','smile-o','refresh','leaf','tint','gamepad','cog','home','lock'];

    return (
        <View style = {styles.container}>

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    }
})

export default IconPicker;
