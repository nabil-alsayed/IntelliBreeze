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
      Serial.println("Changed speed to medium:");
    } else if (tempValue>=highThreshold){
      dutyCycle = 255;
      analogWrite(fanPin, dutyCycle);
      Serial.println("Changed speed to high.");

    }

  }