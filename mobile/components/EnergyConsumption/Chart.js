import React, { useState } from 'react';
import {View, StyleSheet, Dimensions, Text, Pressable} from 'react-native';
import { EnergyData } from '../../data/Data';

const screenWidth = Dimensions.get('window').width;

const EnergyConsumptionStats = () => {
    const [timeframe, setTimeframe] = useState('day');

    const chartData = {
        labels: EnergyData[timeframe].labels,
        datasets: EnergyData[timeframe].datasets,
    };

    return (
        <View>
        </View>
    );
};

export default EnergyConsumptionStats;