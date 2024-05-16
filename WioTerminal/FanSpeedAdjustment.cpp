#include "FanSpeedAdjustment.h"
#include "MQTT.h"
#include <Arduino.h>

  int dutyCycle;                 //used to control the pulse width modulation of the fan

  String highThresholdValue = "";
  String mediumThresholdValue = "";
  String startingThresholdValue = "";
  boolean fanIsOn = false;

//function that changes speed of the fan to MEDIUM and HIGH

  void changeSpeed(float tempValue){
    float startingThreshold = startingThresholdValue.toFloat();
    float mediumThreshold = mediumThresholdValue.toFloat();
    float highThreshold = highThresholdValue.toFloat();

    if(tempValue >= startingThreshold && (tempValue < mediumThreshold && tempValue < highThreshold)){ // && fanIsOn == false){
      
      //fanIsOn = true;
      dutyCycle = 255;
      Serial.print("Temperature is above ");
      Serial.println(startingThreshold);
      analogWrite(fanPin, dutyCycle);
      delay(1500);

      Serial.println("Fan is on");
      dutyCycle = 20;
      analogWrite(fanPin, dutyCycle);

    }else if(tempValue>=mediumThreshold && tempValue<highThreshold){

      dutyCycle = 180;
      analogWrite(fanPin, dutyCycle);
      Serial.print("Temperature is above ");
      Serial.println(mediumThreshold);
      Serial.println("Changed speed to medium:");
      Serial.print(dutyCycle);

    } else if (tempValue>=highThreshold){

      dutyCycle = 255;
      analogWrite(fanPin, dutyCycle);
      Serial.print("Temperature is above ");
      Serial.println(highThreshold);
      Serial.println("Changed speed to high.");
      Serial.print(dutyCycle);

    }else{
      //fanIsOn = false;
      dutyCycle = 0;
      analogWrite(fanPin, dutyCycle);
      Serial.println("Fan is off");
      Serial.print(dutyCycle);
    }
  }
/*=======
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
>>>>>>> main
  }

*/


   


//function to convert the fan speed from slider value to duty cycle
float convertSliderToDutyCycle(float sliderValue) {
    return ((sliderValue - 1) / 99.0 * 195) + 60;
}

//function that changes fan speed to the selected speed in custom mode
void changeSpeedToCustomMode(){
  float customFanSpeed = customFanSpeedValue.toFloat();
    dutyCycle = convertSliderToDutyCycle(customFanSpeed);
    analogWrite(fanPin, dutyCycle);
    //Serial.println("Changed speed to Custom Mode's speed: " + customFanSpeedValue + ". Duty Cycle: " + dutyCycle);
}

