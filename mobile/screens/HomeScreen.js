import {useState} from "react";
import {StyleSheet, View, ScrollView} from "react-native";
import {StatusBar} from "expo-status-bar";
import Header from "../components/Header";
import MetricsDisplayWidget from "../components/MetricsDisplayWidget";
import ModeDisplayWidget from "../components/ModesDisplayWidget";
import {ModeFormProvider} from "../contexts/ModeFormContext";
import {TemperatureThresholdSettings} from "./index";


const LM_PUB_TOPIC = "/intellibreeze/slider/lowToMediumThreshold"
const MH_PUB_TOPIC = "/intellibreeze/slider/mediumToHighThreshold"

const HomeScreen = () => {

    const [value, setValue] = useState(0);

    return (
        <ModeFormProvider>
            <View style={styles.container}>
                <ScrollView scrollEnabled={false} showsVerticalScrollIndicator={false}
                            contentContainerStyle={styles.innerContainer}>
                    <Header name={"Manas"} style={{position: "sticky"}}/>
                    <MetricsDisplayWidget value={value}/>
                    <ModeDisplayWidget/>
                    <StatusBar style="auto"/>
                </ScrollView>
            </View>
        </ModeFormProvider>
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
        width: 70, // Adjust the width as needed
        height: 70, // Adjust the height as needed
    },
    innerContainer: {
        flex:1
    }
});

export default HomeScreen;
