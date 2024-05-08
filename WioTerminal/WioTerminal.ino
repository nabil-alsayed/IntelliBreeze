#include <Arduino.h>
#include <PubSubClient.h>
#include <WiFi.h>
#include"TFT_eSPI.h"
#include <DHT.h>
#include "FanSpeedAdjustment.h"


#define DHT_PIN 0  
#define DHT_TYPE DHT11
#define Gate 2

DHT dht(DHT_PIN, DHT_TYPE);
 
//TEMPERATURE_READING_INITIALISATIONS
const int tempReadingX = 80;
const int tempReadingY = 100;
const int tempTitleX = 40 ;
const int tempTitleY = 60;
String subscribedPayload = "C";
String tempUnit = "C";
 
extern float tempValue = 0; //temperature sensor reading
 
// Update these with values suitable for your network.
const char* ssid = "Tele2_357564"; // WiFi Name
const char* password = "vujjwagy";  // WiFi Password
const char* mqtt_server = "broker.hivemq.com";  // MQTT Broker URL

//Initialization of MQTT client
TFT_eSPI tft;
WiFiClient wioClient;
PubSubClient client(wioClient);
long lastMsg = 0;
char msg[50];
int value = 0;

//TOPICS for PUB/SUB :-
const char* TEMP_PUB_TOPIC = "/intellibreeze/sensor/temperature" ;
const char* TEMP_SUB_TOPIC = "/intellibreeze/app/temperature" ;
const char* TEMPUNIT_SUB_TOPIC = "/intellibreeze/app/tempUnit" ;

const char* HIGH_THRESHOLD_SUB_TOPIC = "/intellibreeze/app/highThreshold";
const char* MED_THRESHOLD_SUB_TOPIC = "/intellibreeze/app/mediumThreshold";

//These variables hold the value of the temperature thresholds published by the GUI
extern String highThresholdValue = "";
extern String mediumThresholdValue = "";



 
void setup_wifi() {
  delay(10);
  tft.setTextSize(2);
  tft.setCursor((320 - tft.textWidth("Connecting to Wi-Fi..")) / 2, 120);
  tft.print("Connecting to Wi-Fi..");
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);
  WiFi.begin(ssid, password); // Connecting WiFi
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");
  tft.fillScreen(TFT_BLACK);
  tft.setCursor((320 - tft.textWidth("Connected!")) / 2, 120);
  tft.print("Connected!");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP()); // Display Local IP Address
}
 
//SETTINGUP_TEMPERATURE_READING
void setup_temperature(){
 
    Serial.begin(9600);
      tft.begin();
  tft.setRotation(3);
 
  tft.fillScreen(TFT_RED); //Red background
 
}



void callback(char* topic, byte* payload, unsigned int length) {

   Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");

    char buff_p[length];
  Serial.print("Payload:");
  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
    buff_p[i] = (char)payload[i];
  }
  Serial.println();

  //Conditional for storing HIGH temperature threshold payload into variable
  if (strcmp(topic, HIGH_THRESHOLD_SUB_TOPIC) == 0) {
    highThresholdValue = ""; //this is done so new value is not concatenated with previously saved values
    
    for (int i = 0; i < length; i++) {
      highThresholdValue += (char)payload[i];
    }
    
    Serial.print("Received high threshold value: ");
    Serial.println(highThresholdValue);

  //Conditional for storing MEDIUM temperature threshold payload into variable
  } else if (strcmp(topic, MED_THRESHOLD_SUB_TOPIC) == 0) {
    mediumThresholdValue = ""; 
    
    for (int i = 0; i < length; i++) {
      mediumThresholdValue += (char)payload[i];
    }

    Serial.print("Received medium threshold value: ");
    Serial.println(mediumThresholdValue);

  } else if (strcmp(topic, TEMPUNIT_SUB_TOPIC) == 0){

    subscribedPayload = String(buff_p);
  }

  buff_p[length] = '\0';
}

void reconnect() {
  // Loop until we're reconnected
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    // Create a random client ID
    String clientId = "WioTerminal-";
    clientId += String(random(0xffff), HEX);
    // Attempt to connect
    if (client.connect(clientId.c_str())) {
      Serial.println("connected");
      // Once connected, publish an announcement...
      client.publish("WTout", "hello world");
      // ... and resubscribe
      client.subscribe("WTin");

      //Subscribing to temperature threshold values
      client.subscribe(HIGH_THRESHOLD_SUB_TOPIC);
      client.subscribe(MED_THRESHOLD_SUB_TOPIC);    
      
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
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

  pinMode(Gate, OUTPUT);
  digitalWrite(Gate, LOW);
  
}

void loop() {
 
   tempValue = dht.readTemperature();
   float tempValue = dht.readTemperature();

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

    String temperatureString = String(tempValue);
    const char* temperatureChars = temperatureString.c_str();
    changeSpeed();

   
    tft.setTextColor(TFT_BLACK);         //sets the text colour to black
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
    snprintf(msg, 50, "%.1f", temperatureChars); // Convert temperature to string

        // Publish temperature value to MQTT broker
        client.publish(TEMP_PUB_TOPIC, temperatureChars); 
        Serial.println("Published temperature: ");
         Serial.println(tempValue);

          //subscribe to incoming temperature units from phone app
          client.subscribe(TEMPUNIT_SUB_TOPIC);
  }
}



