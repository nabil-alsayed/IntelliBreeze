import React, { useState } from 'react';
import {View, StyleSheet, Dimensions, Text, TouchableOpacity} from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const timeFrameRanges = {
    day: { start: 0, end: 7 },
    week: { start: 7, end: 13 },
    month: { start: 13, end: 25 }
};

const Chart = ({ selectedTimeFrame, energyData }) => {
    const [timeframe, setTimeframe] = useState(selectedTimeFrame);

    const chartData = {
        labels: energyData.labels.slice(timeFrameRanges[timeframe].start, timeFrameRanges[timeframe].end),
        datasets: [{ data: energyData.datasets[0].data.slice(timeFrameRanges[timeframe].start, timeFrameRanges[timeframe].end) }]
    };

    return (
        <View style={styles.container}>
            <LineChart
                data={chartData}
                width={screenWidth - 32}
                height={220}
                chartConfig={chartConfig}
                bezier
                style={styles.chart}
            />
            <View style={styles.buttonContainer}>
                {Object.keys(timeFrameRanges).map((key) => (
                    <TouchableOpacity
                        key={key}
                        onPress={() => setTimeframe(key)}
                        style={[styles.timeframe, {backgroundColor: timeframe === key ? "#2695e3" : "#eee"}]}
                    >
                        <Text style={{ color: timeframe === key ? '#fff' : '#000' }}>
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const chartConfig = {
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
    },
    chart: {
        marginVertical: 8,
        borderRadius: 16,
        shadowColor: "#867f7f",
        shadowOffset: 5,
        shadowRadius: 10,
        shadowOpacity: 10
    }
});

export default Chart;