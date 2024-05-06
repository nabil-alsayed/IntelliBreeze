#include <Arduino.h>
#include <WiFi.h>
#include"TFT_eSPI.h"
#include <PubSubClient.h>
#include <DHT.h>

#define DHT_PIN 0  
#define DHT_TYPE DHT11

DHT dht(DHT_PIN, DHT_TYPE);
 
//TEMPERATURE_READING_INITIALISATIONS
const int tempReadingX = 80;
const int tempReadingY = 100;
const int tempTitleX = 40 ;
const int tempTitleY = 60;
 
 
// Update these with values suitable for your network.
const char* ssid = "Tele2_357564"; // WiFi Name
const char* password = "vujjwagy";  // WiFi Password
const char* mqtt_server = "broker.hivemq.com";  // MQTT Broker URL
TFT_eSPI tft;
WiFiClient wioClient;
PubSubClient client(wioClient);
long lastMsg = 0;
char msg[50];
int value = 0;
const char* TEMP_PUB_TOPIC = "/intellibreeze/sensor/temperature" ;
const char* TEMP_SUB_TOPIC = "/intellibreeze/app/temperature" ;
byte fanPin = 16; 
 
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
  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
    buff_p[i] = (char)payload[i];
  }
  Serial.println();
  buff_p[length] = '\0';
  String msg_p = String(buff_p);
  tft.fillScreen(TFT_BLACK);
  tft.setCursor((320 - tft.textWidth("MQTT Message")) / 2, 90);
  tft.print("MQTT Message: " );
  tft.setCursor((320 - tft.textWidth(msg_p)) / 2, 120);
  tft.print(msg_p); // Print receved payload
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
  digitalWrite(fanPin, LOW);
}
void loop() {
   digitalWrite(fanPin, HIGH); 
   float tempValue = dht.readTemperature();
  
    String temperatureString = String(tempValue);
    const char* temperatureChars = temperatureString.c_str();

   
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
  }
}

