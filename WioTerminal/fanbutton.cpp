#include "fanbutton.h"
#include "MQTT.h"
#define fanPin 2

String fanToggleValue = "";

uint32_t toggleFan(){
  Serial.println("ENTERED TOGGLE FAN SIIIIUUUU");
   fanToggleValue.toUpperCase(); // Uppercase the recieved values
   uint32_t digitalValue; // variable that used for digitalWrite
   if (fanToggleValue == "HIGH") { // logic where if fanToggleValue "HIGH", changes digitalValue to HIGH and vice versa
    dutyCycle = 255;
    digitalValue = HIGH;
   } else if (fanToggleValue == "LOW") {
    dutyCycle = 0;
    digitalValue = LOW;
   }
   digitalWrite(fanPin, digitalValue); // function that recieves value and turns it on or off, depending on GUI Button
   Serial.println("TOGGLE VALUE IS ");
   Serial.print(fanToggleValue);
   Serial.println("DIGITAL VALUE IS ");
   Serial.print(digitalValue);
  return digitalValue;
}
