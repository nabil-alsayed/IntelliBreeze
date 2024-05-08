import React, { useState } from 'react';
import {View, StyleSheet, Dimensions, Text, TouchableOpacity} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { EnergyData } from '../../data/Data';

const screenWidth = Dimensions.get('window').width;

const timeFrameRanges = {
    day: { start: 0, end: 7 },
    week: { start: 7, end: 13 },
    month: { start: 13, end: 25 }
};

    const chartData = {
        labels: EnergyData[timeframe].labels,
        datasets: EnergyData[timeframe].datasets,
    };

    return (
        <View style={styles.container}>
            <View>
                <LineChart
                    data={chartData}
                    width={screenWidth - 32}
                    height={220}
                    chartConfig={{
                        backgroundColor: '#1682d0',
                        backgroundGradientFrom: '#2695e3',
                        backgroundGradientTo: '#185191',
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                            borderRadius: 16,
                        },
                        propsForDots: {
                            r: '3',
                            strokeWidth: '2',
                            stroke: '#ffffff',
                        }
                    }}
                    bezier
                    style={{
                        marginVertical: 8,
                        borderRadius: 16,
                        shadowColor:"#867f7f",
                        shadowOffset:5,
                        shadowRadius:10,
                        shadowOpacity:10
                    }}
                />
            </View>
            <View style={styles.buttonContainer}>
                {Object.keys(EnergyData).map((key) => (
                    <TouchableOpacity
                        key={key}
                        title={key.charAt(0).toUpperCase() + key.slice(1)}
                        onPress={() => setTimeframe(key)}
                        style={[styles.timeframe, {backgroundColor: timeframe === key ? "#2695e3" : "rgba(255,255,255,0)" }]}
                    >
                                <Text style={[styles.timeframeLabel, {color: timeframe === key ? "#fff" : "#2695e3" }]}>{key.charAt(0).toUpperCase() + key.slice(1)}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        padding: 5,
    },
    timeframe: {
        alignItems:"center",
        justifyContent:"space-between",
        borderRadius:10,
        flexGrow:1,
        marginHorizontal:5,
        paddingVertical:10,
        shadowColor:"rgba(0,0,0,0.1)",
        shadowOffset:1,
        shadowRadius:3,
        shadowOpacity:5,
    },
    timeframeLabel: {
        fontWeight: "bold",
        color:"#fff"
    }
});

export default EnergyConsumptionStats;