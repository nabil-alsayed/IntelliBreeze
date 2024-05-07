#ifndef RPM_SENSOR_H
#define RPM_SENSOR_H

  const int fanPin = 2;
  extern int dutyCycle;


  void setupFanPin();

  void runFan();

#endif