import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EnergyConsumptionStats from '../screens/EnergyConsumptionStats'

const Tab = createBottomTabNavigator();

function Tabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Energy" component={EnergyConsumptionStats}/>
        </Tab.Navigator>
    );
}

export default Tabs;