#include "MQTT.h"
#include <DHT.h>
#include "fanbutton.h"
#include "FanSpeedAdjustment.h"
#define DHT_PIN 0
#define DHT_TYPE DHT11
#define Gate 2

DHT dht(DHT_PIN, DHT_TYPE);

//TEMPERATURE_READING_INITIALISATIONS
const int tempReadingX = 40;
const int tempReadingY = 80;
const int tempTitleX = 40 ;
const int tempTitleY = 40;
String tempUnit = "C";
extern String customFanSpeedValue;    // value set by user in the application for fan speed for a specific custom mode

extern float tempValue = 0; //temperature sensor reading

//SELECTED MODE_READING INITIALISATION
const int modeReadingX = 80;
const int modeReadingY = 180;
const int modeTitleX = 80 ;
const int modeTitleY = 140;

String subscribedTempUnit = "C";

bool fanState = false; // true = on, false = off

void setup() {
  tft.begin();
  tft.fillScreen(TFT_BLACK);
  tft.setRotation(3);
  Serial.println();
  Serial.begin(115200);
  setup_wifi();
  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);
  dht.begin();
  pinMode(Gate, OUTPUT);
  digitalWrite(Gate, LOW);
}

void loop() {
  tempValue = dht.readTemperature();
  String tempName = "Temperature";
  const char* tempNameChar = tempName.c_str();

  Serial.print("preliminary tempValue = ");
  Serial.println(tempValue);
  Serial.print("subscribedTempUnit = ");
  Serial.println(subscribedTempUnit);

  if (subscribedTempUnit == "°F") {
    tempUnit = "F";
    tempValue = (tempValue * 9 / 5) + 32;
    Serial.print("FAHRENHEIT TEMP = ");
    Serial.println(tempValue);
  } else if (subscribedTempUnit == "K") {
    tempUnit = "K";
    tempValue = (tempValue + 273);
    Serial.print("kelvin temp = ");
    Serial.println(tempValue);
  }

  String temperatureString = String(tempValue);
  const char* temperatureChars = temperatureString.c_str();

// if fanToggleValue is HIGH, then the state of fan is on and running and vice versa
  if (fanToggleValue == "HIGH") {
    fanState = true;
  } else if (fanToggleValue == "LOW") {
    fanState = false;
  }

// if fanState is on or customFanSpeedValue is auto then..
  if (fanState || (strcmp(customFanSpeedValue.c_str(), "auto") == 0) ) {
    // if its in auto, changeSpeed depending on temperature
    if (strcmp(customFanSpeedValue.c_str(), "auto") == 0 ) {
      changeSpeed();
    // else if its in on state (meaning customFanSpeedValue not publishing the auto String but a value instead), then changeSpeedToCustomMode based on slider
    } else {
      changeSpeedToCustomMode();
    }
// otherwise, if fanState is off, turn it off.
  } else {
    dutyCycle = 0;
    analogWrite(fanPin, dutyCycle); // Turn off the fan
  }

  float fanSpeedValue = dutyCycle;
  String fanSpeedString = String(fanSpeedValue);
  const char* fanSpeedChars = fanSpeedString.c_str();
  String fanSpeedName = "Fan Speed";
  const char* fanSpeedNameChar = fanSpeedName.c_str();

  tft.setTextColor(TFT_BLACK); //sets the text colour to black
  tft.setTextSize(2); //sets the size of text

  //Prints String from given coordinates

  //Label Strings
  tft.drawString("Current Temperature:", tempTitleX, tempTitleY);
  tft.drawString("Selected Mode:", modeTitleX, modeTitleY);

  //Temperature Strings
  tft.setTextSize(5);
  tft.drawString(temperatureString, tempReadingX, tempReadingY);
  tft.drawString(".", tempReadingX + 180, tempReadingY - 30);
  tft.drawString(tempUnit, tempReadingX + 200, tempReadingY);

  //Selected fan mode Strings:
  tft.setTextSize(4);
  tft.drawString(selectedMode, modeReadingX, modeReadingY);

  delay(1000);
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
    Serial.print("Selected Mode:");
    Serial.println(selectedMode);
  }
}
