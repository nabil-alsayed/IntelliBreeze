#include "FanSpeedAdjustment.h"
#include "MQTT.h"
#include <Arduino.h>

  int dutyCycle;                 //used to control the pulse width modulation of the fan

  String highThresholdValue = "";
  String mediumThresholdValue = "";
  String startingThresholdValue = "";

//function that changes speed of the fan to MEDIUM and HIGH
  void changeSpeed(){
    float startingThreshold = startingThresholdValue.toFloat();
    float mediumThreshold = mediumThresholdValue.toFloat();
    float highThreshold = highThresholdValue.toFloat();

    

    if(tempValue >= startingThreshold){
      dutyCycle = 100;
      Serial.println("Turning on Fan");
    } else if(tempValue>=mediumThreshold && tempValue<highThreshold){
      dutyCycle = 180;
      analogWrite(fanPin, dutyCycle);
      Serial.println("Changed speed to medium:");
    } else if (tempValue>=highThreshold){
      dutyCycle = 255;
      analogWrite(fanPin, dutyCycle);
      Serial.println("Changed speed to high.");
    }else {
      dutyCycle = 0;
      Serial.println("Turning off fan");
    }
    

  }