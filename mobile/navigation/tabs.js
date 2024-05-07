import FanSpeedScreen from "../screens/FanSpeedScreen";
import HomeScreen from "../screens/HomeScreen"
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";


const tabs = () => {

    const Tab = createStackNavigator();

    return (
        <NavigationContainer>
            <Tab.Navigator>
               <Tab.Screen
                   name="Home"
                   options={{ headerShown: false }}
               >
                   {(props) => <HomeScreen {...props} name={"sda"} value={value} />}
               </Tab.Screen>
               <Tab.Screen name="FanSpeedScreen" component={FanSpeedScreen} />
           </Tab.Navigator>
        </NavigationContainer>
    )
}

export default tabs;