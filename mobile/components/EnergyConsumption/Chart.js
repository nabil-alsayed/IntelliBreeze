import React, { useState } from 'react';
import {View, StyleSheet, Dimensions, Text, Pressable} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { EnergyData } from '../../data/Data';

const screenWidth = Dimensions.get('window').width;

const EnergyConsumptionStats = () => {
    const [timeframe, setTimeframe] = useState('day');

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
                    }}
                />
            </View>
            <View style={styles.buttonContainer}>
                {Object.keys(EnergyData).map((key) => (
                    <Pressable
                        key={key}
                        title={key.charAt(0).toUpperCase() + key.slice(1)}
                        onPress={() => setTimeframe(key)}
                        style={styles.timeframe}
                    >
                                <Text style={styles.timeframeLabel}>{key}</Text>
                    </Pressable>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        padding: 10,
    },
    timeframe: {
        alignItems:"center",
        backgroundColor:"#fff",
        borderRadius:10,
        flex:1,
        marginHorizontal:5,
        paddingVertical:10,
    },
    timeframeLabel: {
        fontWeight: "500"
    }
});

export default EnergyConsumptionStats;