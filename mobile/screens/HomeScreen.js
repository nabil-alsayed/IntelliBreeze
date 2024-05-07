import React from 'react';
import Header from '../components/Header';
import MetricsDisplayWidget from '../components/MetricsDisplayWidget';
import FanSpeedDisplayWidget from '../components/FanSpeedDisplayWidget';


const HomeScreen = ({ navigation, name, value }) => {
    
    return(
        <ModeFormProvider>
        <View style={styles.container}>
          <ScrollView scrollEnabled={false} showsVerticalScrollIndicator={false} contentContainerStyle={styles.innerContainer}>
              <Header name={name} style={{position:"sticky"}}/>
              <MetricsDisplayWidget value={value} />
              <ModeDisplayWidget />
              <FanSpeedDisplayWidget />
              <StatusBar style="auto" />
              <Tabs/>
          </ScrollView>
        </View>
      </ModeFormProvider>
    )
}

export default HomeScreen;
