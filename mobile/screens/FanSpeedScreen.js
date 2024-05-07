import React, {useState} from 'react';
import {View, Text, StyleSheet, ImageBackground, SafeAreaView} from 'react-native';
import Slider from "@react-native-community/slider";
import PowerButton from '../components/PowerButton';
import SaveButton from "../components/SaveButton";

const FanSpeedScreen = () => {

  const[fanSpeedRange,setFanSpeedRange] = useState(0)

    return(
      <SafeAreaView style={{flex:1}}>
          <View  style={{justifyContent:"center", alignItems:"center", flexGrow:1, rowGap:30}}>
            <View style = {styles.container}>
                <View style = {styles.valueDisplayImageContainer}>
                  <ImageBackground style={styles.valueDisplayImage} source={require("../assets/OtherIcons/ValueDisplay.png")}>
                    <Text style = {{fontSize: 15, marginLeft: 91, marginTop: 75}}> Cooler </Text>
                    <Text style = {{fontSize: 40, marginTop: 3, marginRight: 95, alignSelf: "center", fontWeight: "bold"}}> {Math.floor(fanSpeedRange)}</Text>
                    <Text style = {{fontSize: 40, marginLeft: 110, marginTop: -48, fontWeight: "bold"}}> rpm </Text>
                    <Text style = {{fontSize: 15, marginLeft: 91, marginTop: 10}}> Speed </Text>
                  </ImageBackground>
                </View>
                <View style = {styles.slideContainer}>
                  <Slider style = {{width: 300, height: 50}}
                  onValueChange={(value)=> setFanSpeedRange(value)}
                  minimumValue={40}
                  maximumValue={255}
                  />
                    <View>
                        <SaveButton/>
                    </View>
                </View>
            </View>

            <View style = {styles.buttonContainer}>
              <PowerButton style = {styles.button}/>
            </View>
          </View>
      </SafeAreaView>
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
    container: {
      flexDirection: "column",
      borderRadius: 20,
      backgroundColor: "white",
      width: "82%",
      height: 440,
      alignItems: "center",
      justifyContent: "center",
    },
    buttonContainer: {
      alignItems: 'center',
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