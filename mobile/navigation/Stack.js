import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { FanSpeedScreen, HomeScreen } from "../screens/index"

const Stack = (name = "Nabil") => {
    const Stack = createStackNavigator();

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

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={screenOptions}>
                <Stack.Screen name={"HomeScreen"} component={HomeScreen} options={{}} />
                <Stack.Screen name={"FanSpeedScreen"} component={FanSpeedScreen} />
           </Stack.Navigator>
        </NavigationContainer>
    )
}
export default Stack;
