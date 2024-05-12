#ifndef FAN_SPEED_ADJUSTMENT_H
#define FAN_SPEED_ADJUSTMENT_H       //header guard
#include <Arduino.h>
#define fanPin 2


extern String mediumThresholdValue;  //value set by user in the application where the fan switches speed to MEDIUM
extern String highThresholdValue;    //value set by user in the application where the fan switches speed to HIGH
extern String customFanSpeedValue;    // value set by user in the application for fan speed for a specific custom mode
extern int dutyCycle;                //used to control the pulse width modulation of the fan
extern float tempValue;              //used to compare user thresholds to control fan speed



//function changes speed of fan using thresholds
extern void changeSpeed();
extern void changeSpeedToCustomMode();


#endif                               // end header guard