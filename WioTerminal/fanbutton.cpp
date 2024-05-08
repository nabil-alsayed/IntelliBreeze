#include "fanbutton.h"
#define fanPin 2

void toggleFan(){
   fanToggleValue.toUpperCase(); // Uppercase the recieved values
   uint32_t digitalValue; // variable that used for digitalWrite
   if (fanToggleValue == "HIGH") { // logic where if fanToggleValue "HIGH", changes digitalValue to HIGH and vice versa
    digitalValue = HIGH;
   } else if (fanToggleValue == "LOW") {
    digitalValue = LOW;
   }
   digitalWrite(fanPin, digitalValue); // function that recieves value and turns it on or off, depending on GUI Button
}