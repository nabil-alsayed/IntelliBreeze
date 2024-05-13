#include "FanSpeedAdjustment.h"
#include "MQTT.h"
#include <Arduino.h>

  int dutyCycle;                 //used to control the pulse width modulation of the fan

  String highThresholdValue = "";
  String mediumThresholdValue = "";

//function that changes speed of the fan to MEDIUM and HIGH
  void changeSpeed(){
    
    float mediumThreshold = mediumThresholdValue.toFloat();
    float highThreshold = highThresholdValue.toFloat();

   Serial.println("YEAHHHH MEDIUM THRESHOLD IS: ");
   Serial.print(mediumThreshold);
   Serial.println("YEAHHHH HIGH THRESHOLD IS: ");
   Serial.print(highThreshold);
   Serial.println("YEAHHHH THE TEMPERATURE IS");
   Serial.print(tempValue);

   if(tempValue>=mediumThreshold && tempValue<highThreshold){
    dutyCycle = 180;
    analogWrite(fanPin, dutyCycle);
    Serial.print("Temperature is above ");
    Serial.println(mediumThreshold);
    Serial.println("Changed speed to medium.");
  } else if (tempValue>=highThreshold){
    dutyCycle = 255;
    analogWrite(fanPin, dutyCycle);
    Serial.print("Temperature is above ");
    Serial.println(highThreshold);
    Serial.println("Changed speed to high.");
  }

}
//function to convert the fan speed from slider value to duty cycle
float convertSliderToDutyCycle(float sliderValue) {
    return ((sliderValue - 1) / 99.0 * 195) + 60;
}

//function that changes fan speed to the selected speed in custom mode
void changeSpeedToCustomMode(){
  float customFanSpeed = customFanSpeedValue.toFloat();
    dutyCycle = convertSliderToDutyCycle(customFanSpeed);
    analogWrite(fanPin, dutyCycle);
    Serial.println("Changed speed to Custom Mode's speed: " + customFanSpeedValue + ". Duty Cycle: " + dutyCycle);
}


