import {StyleSheet, ScrollView, SafeAreaView} from "react-native";
import {StatusBar} from "expo-status-bar";
import Header from "../components/Header";
import MetricsDisplayWidget from "../components/MetricsDisplayWidget";
import ModeDisplayWidget from "../components/ModesDisplayWidget";
import EnergyConsumptionWidget from "../components/EnergyConsumption/EnergyConsumptionWidget";
import DevicesDisplayWidget from "../components/DevicesDisplayWidget";
import Metric from "../components/Metric";

const HomeScreen = () => {

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView scrollEnabled={false} showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.innerContainer}>
                <Header/>
                <EnergyConsumptionWidget/>
                <Metric/>
                <ModeDisplayWidget/>
                <DevicesDisplayWidget/>
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
    },
    innerContainer: {
        rowGap:15,
        paddingHorizontal:20
    }
});

export default HomeScreen;

