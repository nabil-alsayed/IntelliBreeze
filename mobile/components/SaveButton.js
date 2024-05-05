import React, {useState} from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';

const SaveButton = () => {
    return(
      <View>
        <TouchableOpacity>
            <Image style={styles.buttonImage} source={require("../assets/SaveButton.png")} />  
        </TouchableOpacity>
      </View>
    );
}  

const styles = StyleSheet.create({
    buttonImage: {
      width: 100,
      height: 100,
    }
});

export default SaveButton;