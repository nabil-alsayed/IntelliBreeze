import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import Chart from '../components/EnergyConsumption/Chart';

const EnergyConsumptionStats = () => {

    return (
        <View>
            <Text>{this.name}</Text>
        </View>
    )
}

export default EnergyConsumptionStats;

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"flex-start",
        alignItems:"center"
    }
})