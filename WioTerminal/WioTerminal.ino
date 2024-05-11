#include "MQTT.h"
#include <DHT.h>
#include "fanbutton.h"
#include "FanSpeedAdjustment.h"
#define DHT_PIN 0  
#define DHT_TYPE DHT11



  DHT dht(DHT_PIN, DHT_TYPE);
 
//TEMPERATURE_READING_INITIALISATIONS
const int tempReadingX = 80;
const int tempReadingY = 100;
const int tempTitleX = 40 ;
const int tempTitleY = 60;
String tempUnit = "C";

 
  extern float tempValue = 0; //temperature sensor reading
 
  bool manualMode = true; // a boolean to check if the mode is set to manual or not in the GUI




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
  //tempValue = dht.readTemperature();
     //float tempValue = dht.readTemperature();

     //toggleFan();

      float tempValue = dht.readTemperature();
      String temperatureString = String(tempValue);
      const char* temperatureChars = temperatureString.c_str();
      String tempName = "Temperature";
      const char* tempNameChar = tempName.c_str();


        Serial.println("preliminary tempValue = " );
        Serial.print(tempValue);

        Serial.println("subscribedPayload = " );
        Serial.print(subscribedPayload);


    if (subscribedPayload == "°F"){
      tempUnit = "F";
      tempValue = (tempValue * 9/5) + 32;
      Serial.println("FAHRENHEIT TEMP = " );
      Serial.print(subscribedPayload);

    }else if (subscribedPayload == "K"){
      tempUnit = "K";
      tempValue = (tempValue  + 273);
      Serial.println("kelvin temp = " );
      Serial.print(subscribedPayload);
    }


      changeSpeed();

      float fanSpeedValue = dutyCycle;
      String fanSpeedString = String(fanSpeedValue);
      const char* fanSpeedChars = fanSpeedString.c_str();
      String fanSpeedName = "Fan Speed";
      const char* fanSpeedNameChar = fanSpeedName.c_str();


      tft.setTextColor(TFT_BLACK);         //sets the text colour to blac
      tft.setTextSize(2); //sets the size of text

      tft.drawString("Current Temperature:", tempTitleX, tempTitleY);
      tft.setTextSize(5);

      tft.drawString(temperatureString, tempReadingX, tempReadingY); //prints strings from given coordinates
      tft.drawString(".", tempReadingX + 150, tempReadingY - 30);
      tft.drawString(tempUnit, tempReadingX + 170, tempReadingY);

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



