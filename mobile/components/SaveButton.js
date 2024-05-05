import React,  {useState} from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Button, Pressable, Modal, Text } from 'react-native';

const PowerButton = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    return(
      <View>
        <TouchableOpacity   onPress={() => setIsModalVisible(true)}>
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

export default PowerButton;