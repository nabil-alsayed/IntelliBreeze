#include "fanbutton.h"
#include "FanSpeedAdjustment.h"
#define fanPin 2

  String fanToggleValue = "";
  void toggleFan(){
    fanToggleValue.toUpperCase(); // Uppercase the recieved values
    uint32_t digitalValue; // variable that used for digitalWrite
    if (fanToggleValue == "HIGH") { // logic where if fanToggleValue "HIGH", changes digitalValue to HIGH and vice versa
      dutyCycle = 255;
      digitalValue = HIGH;
      fanIsOn = true;
    } else if (fanToggleValue == "LOW") {
      dutyCycle = 0;
      digitalValue = LOW;
      fanIsOn = false;
    }
    digitalWrite(fanPin, digitalValue); // function that recieves value and turns it on or off, depending on GUI Button
  }