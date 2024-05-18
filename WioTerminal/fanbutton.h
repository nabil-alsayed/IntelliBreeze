#ifndef FANBUTTON_H
#define FANBUTTON_H
#include <Arduino.h>
#include "FanSpeedAdjustment.h"

extern int dutyCycle;

#define fanPin 2

extern bool toggleFan();

#endif