import React, {useState} from 'react';
import { View, Text, StyleSheet, ImageBackground} from 'react-native';
import Slider from "@react-native-community/slider";
import PowerButton from '../components/PowerButton';

const FanSpeedScreen = () => {

  const[fanSpeedRange,setFanSpeedRange] = useState(0)

    return(
      <View>
        <View style = {styles.container}> 
            <View style = {styles.valueDisplayImageContainer}>
              <ImageBackground style={styles.valueDisplayImage} source={require("../assets/ValueDisplay.png")}>
                <Text style = {{fontSize: 15, marginLeft: 91, marginTop: 75}}> Cooler </Text>
                <Text style = {{fontSize: 40, marginTop: 3, marginRight: 95, alignSelf: "center", fontWeight: "bold"}}> {Math.floor(fanSpeedRange)}</Text>
                <Text style = {{fontSize: 40, marginLeft: 127, marginTop: -48, fontWeight: "bold"}}> rpm </Text>
                <Text style = {{fontSize: 15, marginLeft: 91, marginTop: 10}}> Speed </Text>
              </ImageBackground>
            </View>
            <View style = {styles.slideContainer}>
              <Slider style = {{width: 300, height: 50}}
              onValueChange={(value)=> setFanSpeedRange(value)}
              minimumValue={0}
              maximumValue={2000}
              />
            </View>
        </View>

        <View style = {styles.buttonContainer}>
          <PowerButton style = {styles.button}/>
        </View>

      </View>
    );
}  

const styles = StyleSheet.create({
    valueDisplayImageContainer: {
      marginBottom: 20,
    },
    valueDisplayImage: {
      width: 230,
      height: 230,
    },
    button: {
      backgroundColor: "#fff",
    },  
    container: {
      padding: 15,
      flexDirection: "column",
      borderRadius: 20,
      backgroundColor: "white",
      width: "82%",
      height: 440,
      marginTop: 130,
      alignItems: "center",
      justifyContent: "center",
      marginLeft: 39,
    },
    buttonContainer: {
      flex: 1,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'flex-end',
      marginTop: 50,
      paddingRight: 30,
      marginLeft: 17
    },
    child: {
      margin: 3,
    },
    value: {
      fontWeight: "bold",
      fontSize: 20,
    },
    name: {
      fontSize: 15,
    },
  });

  export default FanSpeedScreen;