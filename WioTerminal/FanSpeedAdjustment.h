#ifndef FAN_SPEED_ADJUSTMENT_H
#define FAN_SPEED_ADJUSTMENT_H       //header guard
#include <Arduino.h>


extern String mediumThresholdValue;  //value set by user in the application where the fan switches speed to MEDIUM
extern String highThresholdValue;    //value set by user in the application where the fan switches speed to HIGH
//extern int dutyCycle;                //used to control the pulse width modulation of the fan


//function changes speed of fan using thresholds
extern void changeSpeed();



#endif                               // end header guard