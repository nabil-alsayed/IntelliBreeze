#ifndef FANBUTTON_H
#define FANBUTTON_H
#include <Arduino.h>
#include "FanSpeedAdjustment.h"

  extern int dutyCycle;
  extern String fanToggleValue = "";


#define fanPin 2

extern String fanToggleValue;

extern void toggleFan();

#endif