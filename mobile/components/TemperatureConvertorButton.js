import React, {Component} from 'react';
import {Button, StyleSheet, View} from 'react-native';

class TemperatureConvertorButton extends Component {
    _onPressButton() {
      console.log("Button Pressed")
    }

    TemperatureConvertorButton = (props) => {;
    return (
      
        <View style={styles.buttonContainer}>
          <Button onPress={this._onPressButton} title="Convert To Temperature" color="#841584" />
        </View>
       
    );
  }
}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    buttonContainer: {
      margin: 20,
      padding: 150
    },
});

  export default TemperatureConvertorButton;