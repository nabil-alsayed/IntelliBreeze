import Stacks from './navigations/Stacks'
import { ModeFormProvider } from './contexts/ModeFormContext'
import { TemperatureProvider } from "./contexts/TemperatureContext";
import React from 'react';
import {StyleSheet, View} from 'react-native';

export default function App() {

    return (
        <ModeFormProvider>
            <TemperatureProvider>
                <View style={styles.container}>
                    <Stacks/>
                </View>
            </TemperatureProvider>
        </ModeFormProvider>
        )
};

const styles = StyleSheet.create({
    container:{
        flexGrow:1
    }
})

