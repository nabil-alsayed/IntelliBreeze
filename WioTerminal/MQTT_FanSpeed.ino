#include <Arduino.h>
#include <WiFi.h>
#include <PubSubClient.h>
 
#include <WiFi.h>
#include <PubSubClient.h>
#include <DHT.h>

  const char* MANUAL_FAN_SPEED_SUB_TOPIC = "/intellibreeze/sensor/manual/fanspeed" ; // Topic for WIO to subscribe to from the GUI, because the user sets the fan speed via a slider
  const char* MANUAL_FAN_SPEED_PUB_TOPIC = "/intellibreeze/app/manual/fanspeed"; //Topic for WIO to publish
  const char* AUTO_FAN_SPEED_PUB_TOPIC = "/intellibreeze/sensor/automatic/fanspeed"; //Topic for WIO to publish

  void setupClient(){
    client.subscribe(MANUAL_FAN_SPEED_SUB_TOPIC) //The terminal subscribes to the topic for the manual fan speed from the broker
  }