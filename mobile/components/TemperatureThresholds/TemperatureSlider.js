import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Animated } from 'react-native';
import Slider from '@react-native-community/slider';
import { convertTemperature } from '../../utils/temperatureConverterUtils';

const TemperatureSlider = ({ label, icon, value, onValueChange, disabled }) => {
    
    

    const [tempUnit, setTempUnit] = useState('C');
    let temperature = convertTemperature(value, tempUnit)

    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/OtherIcons/coldlogo.png')}
                style={styles.logo}
            />
            <View style={styles.content}>
                <Text style={styles.label}>{label}</Text>
                <View style={{flexDirection:"row",flexGrow:1, width:130,justifyContent:"space-between"}}>
                    <Text style={styles.value}>
                        Switches at: { }
                    </Text>
                    <Text style={[styles.value,{fontWeight:"bold"}]}>
                       {temperature}
                    </Text>
                </View>
                <Slider
                    style={styles.slider}
                    value={value}
                    onValueChange={onValueChange}
                    minimumValue={-50}
                    maximumValue={100}
                    step={1}
                    minimumTrackTintColor="#169EFFFF"
                    maximumTrackTintColor="#d3d3d3"
                    thumbTintColor="#169EFFFF"
                    disabled={disabled}
                />
            </View>
            <Image
                source={require('../../assets/OtherIcons/hotlogo.png')}
                style={styles.logo}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.02,
        shadowRadius: 4,
        elevation: 3,
        padding: 15,
    },
    logo: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
    },
    content: {
        flex: 1,
        paddingHorizontal: 10,
        alignItems: 'center',
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    icon: {
        color: '#333',
        marginBottom: 10,
    },
    value: {
        fontSize: 16,
        color: '#333',
        marginBottom: 5,
    },
    slider: {
        width: '100%',
        height: 40,
    }
});

export default TemperatureSlider;
