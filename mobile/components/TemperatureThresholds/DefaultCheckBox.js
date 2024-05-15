import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Animated } from 'react-native';

const DefaultCheckBox = ({ onPress, onToggle }) => {
    const [isSelected, setIsSelected] = useState(false);
    const animation = new Animated.Value(0);

    useEffect(() => {
        Animated.timing(animation, {
            toValue: isSelected ? 1 : 0,
            duration: 200,
            useNativeDriver: false
        }).start();
    }, [isSelected]);

    const handleCheckBoxToggle = () => {
        setIsSelected(!isSelected);
        onToggle(!isSelected);
    };

    const boxInterpolation = animation.interpolate({
        inputRange: [0, 1],
        outputRange: ['#fff','#169eff']
    });

    const textInterpolation = animation.interpolate({
        inputRange: [0, 1],
        outputRange: ['#169eff', '#fff']
    });

    return (
        <View style={styles.container}>
            <Pressable onPress={() => { onPress(); handleCheckBoxToggle(); }} style={styles.checkboxContainer}>
                <Animated.View style={[styles.checkbox, { backgroundColor: boxInterpolation }]}>
                    <Animated.Text style={[styles.checkMark, { color: textInterpolation }]}>
                        {isSelected ? '✓' : ''}
                    </Animated.Text>
                </Animated.View>
            </Pressable>
            <View style={{flexDirection:"column", rowGap:3}}>
                <Text style={[styles.label, { fontWeight: 'bold' }]}>Default</Text>
                <View style={styles.subLabels}>
                    <View style={styles.labelContainer}>
                        <Text style={styles.subLabel}>Low (&lt;25°C) |</Text>
                    </View>
                    <View style={styles.labelContainer}>
                        <Text style={styles.subLabel}>Medium (&lt;27°C) |</Text>
                    </View>
                    <View style={styles.labelContainer}>
                        <Text style={styles.subLabel}>High (&gt;27°C)</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.02,
        shadowRadius: 4,
        elevation: 3,
        padding: 15,
        flexDirection:"row",
        columnGap:5
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        width: 28,
        height: 28,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5,
        borderColor: '#2c6cb0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        borderWidth:0.5
    },
    label: {
        fontSize: 18,
        color: '#01162d',
    },
    subLabels: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems:"center",
        columnGap:5,
    },
    subLabel: {
        fontSize: 12.3,
        color: '#828181',
        fontWeight: "600"
    },
    labelContainer :{
        flexDirection:"row",
    },
    icon: {
        color: '#01162d',
        fontSize: 18,
    },
    checkMark: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default DefaultCheckBox;
