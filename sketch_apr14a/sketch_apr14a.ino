#include <math.h>
#include"TFT_eSPI.h"
TFT_eSPI tft;

const int B = 4275;               // B value of the thermistor
const int R0 = 100000;            // R0 = 100k
const int pinTempSensor = A0;     // Grove - Temperature Sensor connect to A0
const int tempReadingX = 80;
const int tempReadingY = 100;
const int tempTitleX = 40 ;
const int tempTitleY = 60;

#if defined(ARDUINO_ARCH_AVR)
#define debug  Serial
#elif defined(ARDUINO_ARCH_SAMD) ||  defined(ARDUINO_ARCH_SAM)
#define debug  SerialUSB
#else
#define debug  Serial
#endif

void setup()
{
    Serial.begin(9600);
      tft.begin();
  tft.setRotation(3);

  tft.fillScreen(TFT_RED); //Red background
  
}

void loop()
{

  float tempValue = analogRead(pinTempSensor);
    
/*
    y = y + 40;
    
      
      if (y >= tft.height()){
         y = 0;
    tft.fillScreen(TFT_RED);
  } 
  */
   
    int temperature = map(tempValue,20,358,-40,125);// convert to temperature via datasheet
    String temperatureString = String(temperature);
    
    tft.setTextColor(TFT_BLACK);          //sets the text colour to black
    tft.setTextSize(2); //sets the size of text
    tft.drawString("Current Temperature:", tempTitleX, tempTitleY);
    tft.setTextSize(8);                
    tft.drawString(temperatureString, tempReadingX, tempReadingY); //prints strings from (0, 0)
    tft.drawString(".", tempReadingX + 80, tempReadingY - 35);
    tft.drawString("C", tempReadingX + 110, tempReadingY);

    Serial.print("temperature = ");
    Serial.println(temperature);
    

    delay(5000);
    tft.fillScreen(TFT_RED);
}