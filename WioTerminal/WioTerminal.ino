#include "MQTT.h"
#include <DHT.h>
#include "fanbutton.h"


#define DHT_PIN 0  
#define DHT_TYPE DHT11
#define fanPin 2

  DHT dht(DHT_PIN, DHT_TYPE);
 
  const int tempReadingX = 80;
  const int tempReadingY = 100;
  const int tempTitleX = 40 ;
  const int tempTitleY = 60;

  bool manualMode = true; // a boolean to check if the mode is set to manual or not in the GUI

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
    pinMode(fanPin, OUTPUT);
  }


  void loop() {
    

    toggleFan();

    float tempValue = dht.readTemperature();
    String temperatureString = String(tempValue);
    const char* temperatureChars = temperatureString.c_str();
    String tempName = "Temperature";
    const char* tempNameChar = tempName.c_str();
    
      // Gradually increase the fan speed
      Serial.println("Increasing fan speed...");
    
    //CODE FOR FAN SPEED MQTT
    float fanSpeedValue = dutyCycle;
    String fanSpeedString = String(fanSpeedValue);
    const char* fanSpeedChars = fanSpeedString.c_str();
    String fanSpeedName = "Fan Speed";
    const char* fanSpeedNameChar = fanSpeedName.c_str();

    tft.setTextColor(TFT_BLACK);          //sets the text colour to black
    tft.setTextSize(2); //sets the size of text
    tft.drawString("Current Temperature:", tempTitleX, tempTitleY);
    tft.setTextSize(5);               +
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

    publish(TEMP_PUB_TOPIC, temperatureChars, tempNameChar);
    publish(MANUAL_FAN_SPEED_PUB_TOPIC, fanSpeedChars, fanSpeedNameChar);
    publish(AUTO_FAN_SPEED_PUB_TOPIC, fanSpeedChars, fanSpeedNameChar);
  }
}

