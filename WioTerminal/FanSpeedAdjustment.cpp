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


   if(tempValue>=mediumThreshold && tempValue<highThreshold){
    dutyCycle = 180;
    analogWrite(fanPin, dutyCycle);
    Serial.print("Temperature is above ");
    Serial.println(mediumThreshold);
    Serial.println("Speed is at medium.");
  } else if (tempValue>=highThreshold){
    dutyCycle = 255;
    analogWrite(fanPin, dutyCycle);
    Serial.print("Temperature is above ");
    Serial.println(highThreshold);
    Serial.println("Speed is at high.");
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
//function that changes fan speed based on published value of slider in manual mode
void changeSpeedToManualModeSlider(){
  float manualFanSpeedSlider = manualFanSpeedSlider.toFloat;
  dutyCycle = convertSliderToDutyCycle(manualFanSpeedSlider);
  analogWrite(fanPin, dutyCycle);
  Serial.println("Changed speed to Custom Mode's speed: " + manualFanSpeedSlider + ". Duty Cycle: " + dutyCycle);
}



