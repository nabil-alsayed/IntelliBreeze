import { StyleSheet, View, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import Header from "../components/Header";
import MetricsDisplayWidget from "../components/MetricsDisplayWidget";
import ModeDisplayWidget from "../components/ModesDisplayWidget";
import EnergyConsumptionWidget from "../components/EnergyConsumption/Home/EnergyConsumptionWidget";
import { ModeFormProvider } from "../contexts/ModeFormContext";

const Home = ({ name = "Nabil" }) => {

    return (
        <ModeFormProvider>
            <View style={styles.container}>
                <ScrollView scrollEnabled={false} showsVerticalScrollIndicator={false} contentContainerStyle={styles.innerContainer}>
                    <Header name={name} />
                    <EnergyConsumptionWidget />
                    <MetricsDisplayWidget />
                    <ModeDisplayWidget />
                    <StatusBar style="auto" />
                </ScrollView>
            </View>
        </ModeFormProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: "#f3f3f3",
        paddingTop: 50,
        paddingHorizontal:20,
        width:"100%",
        height:"100"
    },
    innerContainer: {
        flexDirection: "column",
        width:"100%",
        rowGap:15
    },
});

export default Home;