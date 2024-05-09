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
    Serial.println("Changed speed to high:");

  }

}
