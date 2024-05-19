import Stacks from './navigations/Stacks'
import { FanProvider } from './contexts/FanContext'
import { TemperatureProvider } from "./contexts/TemperatureContext";
import React from 'react';
import {StyleSheet, View} from 'react-native';

export default function App() {

    return (
        <FanProvider>
            <TemperatureProvider>
                <View style={styles.container}>
                    <Stacks/>
                </View>
            </TemperatureProvider>
        </FanProvider>
        )
};

const styles = StyleSheet.create({
    container:{
        flexGrow:1
    }
})

