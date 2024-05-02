#include <Arduino.h>
#include <WiFi.h>
#include <PubSubClient.h>
 
#include <WiFi.h>
#include"TFT_eSPI.h"
#include <PubSubClient.h>
#include <DHT.h>
#include <MQTT_FanSpeed.h>

#define DHT_PIN 0  
#define DHT_TYPE DHT11

  DHT dht(DHT_PIN, DHT_TYPE);
 
//TEMPERATURE_READING_INITIALISATIONS
  const int tempReadingX = 80;
  const int tempReadingY = 100;
  const int tempTitleX = 40 ;
  const int tempTitleY = 60;

  bool manualMode = true; // a boolean to check if the mode is set to manual or not in the GUI

  byte fanPin = 16; 
 

 
//SETTINGUP_TEMPERATURE_READING
  void setup_temperature(){
  
      Serial.begin(9600);
        tft.begin();
    tft.setRotation(3);
  
    tft.fillScreen(TFT_RED); //Red background
  
  }


  void setup() {
    tft.begin();
    tft.fillScreen(TFT_BLACK);
    tft.setRotation(3);
  
    Serial.println();
    Serial.begin(115200);
    setup_wifi();
    client.setServer(mqtt_server, 1883); // Connect the MQTT Server
    client.setCallback(callback);
    dht.begin(); 
    digitalWrite(fanPin, LOW);
  }



  void loop() {
   digitalWrite(fanPin, HIGH); 

    float tempValue = dht.readTemperature();
    String temperatureString = String(tempValue);
    const char* temperatureChars = temperatureString.c_str();


    //CODE FOR FAN SPEED MQTT
    String fanSpeedString = String(fanSpeedValue);
    const char* fanSpeedChars = fanSpeedValue.c_str();


    tft.setTextColor(TFT_BLACK);          //sets the text colour to black
    tft.setTextSize(2); //sets the size of text
    tft.drawString("Current Temperature:", tempTitleX, tempTitleY);
    tft.setTextSize(5);               
    tft.drawString(temperatureString, tempReadingX, tempReadingY); //prints strings from (0, 0)
    tft.drawString(".", tempReadingX + 150, tempReadingY - 30);
    tft.drawString("C", tempReadingX + 170, tempReadingY);
 
    Serial.print("temperature = ");
    Serial.println(tempValue);
   
 
    delay(5000);
    tft.fillScreen(TFT_RED);
 
  if (!client.connected()) {
    reconnect();
  }
  client.loop();
  long now = millis();
  if (now - lastMsg > 2000) {
    lastMsg = now;
    ++value;
    snprintf(msg, 50, "%.1f", temperatureChars); // Convert temperature to string
        client.publish(TEMP_PUB_TOPIC, temperatureChars); // Publish temperature value to MQTT broker
        //client.publish(TEMP_PUB_TOPIC, msg); // Publish temperature value to MQTT broker
        Serial.print("Published temperature: ");
        Serial.println(tempValue);


    // CODE FOR FAN SPEED MQTT
    snprintf(msg, 50, "", fanSpeedChars); //Fan speed value is converted to string
      if(manualMode){ // checks if the mode set by the user is manual or automatic, and based on that it publishes to the respective topic
        client.publish(MANUAL_FAN_SPEED_PUB_TOPIC, fanSpeedChars);
      }else{
        client.publish(AUTO_FAN_SPEED_PUB_TOPIC, fanSpeedChars);
      }
      Serial.print("Published fan speed: "); // printing the value is published on the serial moniter to keep track
        Serial.println(tempValue);


  }
}

