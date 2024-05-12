#ifndef MQTT_H
#define MQTT_H

#include <Arduino.h>
#include <WiFi.h>
#include <PubSubClient.h>
#include <WiFi.h>
#include <PubSubClient.h>
#include <TFT_eSPI.h>

  // Update these with values suitable for your network.
  extern const char* ssid; // WiFi Name
  extern const char* password;  // WiFi Password
  extern const char* mqtt_server;  // MQTT Broker URL
  extern TFT_eSPI tft;
  extern WiFiClient wioClient;
  extern PubSubClient client;
  extern long lastMsg;
  extern char msg[50];
  extern int value;
  
  extern const char* TEMP_PUB_TOPIC;
  extern const char* PREF_TEMP_SUB_TOPIC;
  extern const char* TEMPUNIT_SUB_TOPIC;
  extern const char* HIGH_THRESHOLD_SUB_TOPIC;
  extern const char* MED_THRESHOLD_SUB_TOPIC;
  extern const char* MANUAL_FAN_SPEED_SUB_TOPIC ; // Topic for WIO to subscribe to from the GUI, because the user sets the fan speed via a slider
  extern const char* MANUAL_FAN_SPEED_PUB_TOPIC; //Topic for WIO to publish
  extern const char* AUTO_FAN_SPEED_PUB_TOPIC; //Topic for WIO to publish
  extern const char* FAN_SPEED_SUB_TOPIC;
  
  extern String subscribedPayload;

  void setupClient();

  void setup_wifi();

  void callback(char* topic, byte* payload, unsigned int length);

  void publish(const char* SUBSCRIPTION_TOPIC, const char* payload, const char* topicName);

  void reconnect();

  #endif