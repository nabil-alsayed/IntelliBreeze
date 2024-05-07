import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {NavigationContainer} from "@react-navigation/native";
import { EnergyConsumptionStats, Home } from '../screens/index'
import {View} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const Tab = createBottomTabNavigator();

const screenOptions = {
    tabBarShowLabel: false,
    headerShown: false,
    tabBarStyle: {
        justifyContent:"center",
        alignItems:"center",
        padding:20,
        position: "absolute",
        bottom: 20,
        right: 20,
        left: 20,
        elevation: 0,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#fff'
    }
};
function Tabs() {
    const handleButtonOption = (buttonIcon) => ({
        tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Icon name={buttonIcon} size={24} color={focused ? "#169EFF" : "#868585"} />
            </View>
        )
    });

    return (
        <NavigationContainer>
            <Tab.Navigator screenOptions={screenOptions}>
                <Tab.Screen name={"Home"} component={Home} options={handleButtonOption("home")} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default Tabs;