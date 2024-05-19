#ifndef FAN_SPEED_ADJUSTMENT_H
#define FAN_SPEED_ADJUSTMENT_H       //header guard
#include <Arduino.h>
#define fanPin 2


extern String mediumThresholdValue;  //value set by user in the application where the fan switches speed to MEDIUM
extern String highThresholdValue;    //value set by user in the application where the fan switches speed to HIGH
extern String startingThresholdValue; //value set by user on the apllication for when fan turns on and off in automatic mode
extern String customFanSpeedValue;    // value set by user in the application for fan speed for a specific custom mode
extern int dutyCycle;                //used to control the pulse width modulation of the fan
extern float tempValue;              //used to compare user thresholds to current temperature
extern boolean fanIsOn;

extern const int lowFanSpeedDutyCycle; //LOW FAN SPEED DUTY CYCLE VALUE
extern const int mediumFanSpeedDutyCycle; //MEDIUM FAN SPEED DUTY CYCLE VALUE
extern const int highFanSpeedDutyCycle; //HIGH FAN SPEED DUTY CYCLE VALUE


//function changes speed of fan using thresholds
extern void changeSpeed();
extern float convertSliderToDutyCycle(float sliderValue);
extern void changeSpeedToCustomMode();
extern void changeSpeedToManualModeSlider();



#endif                               // end header guard