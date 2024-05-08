import { createStackNavigator } from "@react-navigation/stack";
import { useState } from "react";
import {StyleSheet, View, ScrollView} from "react-native";
import { StatusBar } from "expo-status-bar";
import Header from "./components/Header";
import MetricsDisplayWidget from "./components/MetricsDisplayWidget";
import ModesDisplayWidget from "./components/ModesDisplayWidget";
import {connectToMqtt} from "./utils/mqttUtils";
import {ModeFormProvider} from "./contexts/ModeFormContext";
import Stacks from './navigations/Stacks'


const LM_PUB_TOPIC = "/intellibreeze/slider/lowToMediumThreshold"

export default function App({name = "Nabil"}) {



  //return (
  //  <View style={styles.container}>
  //    <Header name={name} />
  //    <MetricsDisplayWidget value={value} />
  //    <DefaultCheckBox />
  //    <StatusBar style="auto" />
  //  </View>
  //);

    return (
        <Stacks/>
    );

}

const MH_PUB_TOPIC = "/intellibreeze/slider/mediumToHighThreshold"


