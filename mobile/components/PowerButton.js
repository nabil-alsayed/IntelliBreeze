import React,  {useState} from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Button, Pressable, Modal, Text } from 'react-native';

const PowerButton = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    return(
      <View>
        <TouchableOpacity 
    
            onPress={() => setIsModalVisible(true)}
        >

            <Image style={styles.buttonImage} source={require("../assets/Power.png")} />  

        </TouchableOpacity>

        <Modal
         visible={isModalVisible}
         onRequestClose= {() => setIsModalVisible(false)}
         animationType= "slide"
        >
            <View style={{flex: 1, backgroundColor: "rainbow", padding: 60}}>
                <Text> Text example </Text>
                    <Button
                     title="Close"
                     color= "midnightblue"
                     onPress={() => setIsModalVisible(false)}
                 />
            </View>
        </Modal>

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