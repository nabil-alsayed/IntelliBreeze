#include "RPM_Sensor.h"
#include "MQTT_FanSpeed.h"

    
    int dutyCycle = 0;

    void setupFanPin() {
      // Initialize serial communication
      // Set the fan pin as an output
      pinMode(fanPin, OUTPUT);
      Serial.begin(9600);
    }
    
    void runFan() {
      // Gradually increase the fan speed
      Serial.println("Increasing fan speed...");
      for (dutyCycle = 0; dutyCycle <= 255; dutyCycle += 5) {
        analogWrite(fanPin, dutyCycle);
        Serial.print("Duty Cycle: ");
        Serial.println(dutyCycle);
        delay(2000);
      }
      

      // Gradually decrease the fan speed
      Serial.println("Decreasing fan speed...");
      for (dutyCycle = 255; dutyCycle >= 0; dutyCycle -= 25) {
        analogWrite(fanPin, dutyCycle);
        Serial.print("Duty Cycle: ");
        Serial.println(dutyCycle);
        delay(2000);
      }
    }
    