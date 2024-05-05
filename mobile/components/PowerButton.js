import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';

const PowerButton = () => {
    const [image, setImage] = useState(0);

    const images = [
        require("../assets/Power.png"),
        require("../assets/power-off.png")
    ];

    const handlePress = () =>{
        setImage(image === 0 ? 1: 0);
    }

    return(
      <View>
        <TouchableOpacity onPress={handlePress}>
          <Image style={styles.buttonImage} source={images[image]} />  
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

export default PowerButton;
