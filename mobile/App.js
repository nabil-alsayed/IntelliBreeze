import Stacks from './navigations/Stacks'


const LM_PUB_TOPIC = "/intellibreeze/slider/lowToMediumThreshold"
const MH_PUB_TOPIC = "/intellibreeze/slider/mediumToHighThreshold"

export default function App() {



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

