#include "fanbutton.h"
#include "MQTT.h"
#define fanPin 2

String fanToggleValue = "";

// if fanToggleValue is HIGH, then return true and vice versa
bool toggleFan(){
  if (fanToggleValue == "HIGH") {
      return true;
  } else if (fanToggleValue == "LOW") {
      return false;
  }
}
