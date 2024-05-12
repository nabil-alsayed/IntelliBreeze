#include "FanSpeedAdjustment.h"
#include "MQTT.h"
#include <Arduino.h>

  int dutyCycle;                 //used to control the pulse width modulation of the fan

  String highThresholdValue = "";
  String mediumThresholdValue = "";
  String startingThresholdValue = "";
  boolean fanIsOn = false;

//function that changes speed of the fan to MEDIUM and HIGH
  void changeSpeed(){
    
    //float startingThreshold = startingThresholdValue.toFloat();
    //float mediumThreshold = mediumThresholdValue.toFloat();
    //float highThreshold = highThresholdValue.toFloat();

    float startingThreshold = 25;
    float mediumThreshold = 27;
    float highThreshold = 29;

    if(tempValue >= startingThreshold && (tempValue < mediumThreshold && tempValue < highThreshold) && fanIsOn == false){
      
      fanIsOn = true;
      dutyCycle = 255;
      analogWrite(fanPin, dutyCycle);
      delay(1500);
      Serial.println("Fan is on");
      dutyCycle = 60;
      analogWrite(fanPin, dutyCycle);

    }else if(tempValue>=mediumThreshold && tempValue<highThreshold){

      dutyCycle = 180;
      analogWrite(fanPin, dutyCycle);
      Serial.println("Changed speed to medium:");

    } else if (tempValue>=highThreshold){

      dutyCycle = 255;
      analogWrite(fanPin, dutyCycle);
      Serial.println("Changed speed to high.");
    }else{
      
      fanIsOn = false;
      dutyCycle = 0;
      analogWrite(fanPin, dutyCycle);
      Serial.println("Fan is off");

    }
  }
