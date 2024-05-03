#ifndef MQTT_FANSPEED_H
#define MQTT_FANSPEED_H

#include <Arduino.h>
#include <WiFi.h>
#include <PubSubClient.h>
 
#include <WiFi.h>
#include <PubSubClient.h>
#include <DHT.h>

  // Update these with values suitable for your network.
  const char* ssid; // WiFi Name
  const char* password;  // WiFi Password
  const char* mqtt_server;  // MQTT Broker URL
  TFT_eSPI tft;
  WiFiClient wioClient;
  PubSubClient client(wioClient);
  long lastMsg;
  char msg[50];
  int value;
  
  const char* TEMP_PUB_TOPIC;
  const char* PREF_TEMP_SUB_TOPIC;
  const char* MANUAL_FAN_SPEED_SUB_TOPIC ; // Topic for WIO to subscribe to from the GUI, because the user sets the fan speed via a slider
  const char* MANUAL_FAN_SPEED_PUB_TOPIC; //Topic for WIO to publish
  const char* AUTO_FAN_SPEED_PUB_TOPIC =; //Topic for WIO to publish

  

  void setup_wifi();

  void callback(char* topic, byte* payload, unsigned int length);

  void reconnect();