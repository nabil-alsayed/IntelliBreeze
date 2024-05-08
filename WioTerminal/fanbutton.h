#ifndef FANBUTTON_H
#define FANBUTTON_H
#include <Arduino.h>

  extern int dutyCycle;

#define fanPin 2

extern String fanToggleValue;

extern void toggleFan();

#endif