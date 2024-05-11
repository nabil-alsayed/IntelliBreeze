#include "FanSpeedAdjustment.h"
#include <Arduino.h>

#define Gate 2



int dutyCycle;                 //used to control the pulse width modulation of the fan


//function that changes speed of the fan to MEDIUM and HIGH
void changeSpeed(){
  float mediumThreshold = mediumThresholdValue.toFloat();
  float highThreshold = highThresholdValue.toFloat();


   if(tempValue>=mediumThreshold && tempValue<highThreshold){
    dutyCycle = 180;
    analogWrite(Gate, dutyCycle);
    Serial.println("Changed speed to medium:");
  } else if (tempValue>=highThreshold){
    dutyCycle = 255;
    analogWrite(Gate, dutyCycle);
    Serial.println("Changed speed to high.");

  }

}

//function to convert the fan speed from slider value to duty cycle
float convertSliderToDutyCycle(float sliderValue) {
    return ((sliderValue - 1) / 99.0 * 195) + 20;
}

//function that changes fan speed to the selected speed in custom mode
void changeSpeedToCustomMode(){
  float customFanSpeed = customFanSpeedValue.toFloat();
    dutyCycle = convertSliderToDutyCycle(customFanSpeed);
    analogWrite(Gate, dutyCycle);
    Serial.println("Changed speed to Custom Mode's speed: " + customFanSpeedValue + ". Duty Cycle: " + dutyCycle);
}
