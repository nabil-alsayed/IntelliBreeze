import {StyleSheet, ScrollView, SafeAreaView} from "react-native";
import {StatusBar} from "expo-status-bar";
import Header from "../components/Header";
import MetricsDisplayWidget from "../components/MetricsDisplayWidget";
import ModeDisplayWidget from "../components/ModesDisplayWidget";
import EnergyConsumptionWidget from "../components/EnergyConsumption/EnergyConsumptionWidget";
import FanSpeedDisplayWidget from "../components/FanSpeedDisplayWidget";

const HomeScreen = () => {

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView scrollEnabled={false} showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.innerContainer}>
                <Header name={"User"} style={{position: "sticky"}}/>
                <EnergyConsumptionWidget/>
                <MetricsDisplayWidget />
                <ModeDisplayWidget/>
                <FanSpeedDisplayWidget/>
                <StatusBar style="auto"/>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f3f3f3",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingLeft: 10,
        paddingRight: 10,
        position: 'relative',
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
    logo: {
        width: 70, 
        height: 70,
    },
    innerContainer: {
        flex:1,
        rowGap:15,
        paddingHorizontal:20
    }
});

export default HomeScreen;

