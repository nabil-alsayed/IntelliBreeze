import React, {useState} from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';

const SaveButton = () => {
    return(
      <View>
        <TouchableOpacity>
            <Image style={styles.buttonImage} source={require("../assets/OtherIcons/SaveButton.png")} />
        </TouchableOpacity>
      </View>
    );
}  

const styles = StyleSheet.create({
    buttonImage: {
      width: 120,
      length: 70,
        marginLeft: 90,
    }
});

export default SaveButton;