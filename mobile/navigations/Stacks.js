import React from 'react'
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {TemperatureThresholdSettings, HomeScreen, FanSpeedScreen} from "../screens/index"

const Stacks = () => {

    const Stack = createStackNavigator();

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: true }}>
                <Stack.Screen name={"Home"} component={HomeScreen}/>
                <Stack.Screen name={"TemperatureThreshold"} component={TemperatureThresholdSettings}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Stacks;