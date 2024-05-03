#include <Arduino.h>
#include <WiFi.h>
#include <PubSubClient.h>
 
#include <WiFi.h>
#include <PubSubClient.h>
#include <DHT.h>
#include <MQTT_FanSpeed.h>
  
  
  ssid = "Tele2_357564"; // WiFi Name
  password = "vujjwagy";  // WiFi Password
  mqtt_server = "broker.hivemq.com";  // MQTT Broker URL
  TFT_eSPI tft;
  WiFiClient wioClient;
  PubSubClient client(wioClient);
  lastMsg = 0;
  msg[50];
  value = 0;
  
  //MQTT Topics for Publish and Subscribe
  TEMP_PUB_TOPIC = "/intellibreeze/sensor/temperature" ;
  PREF_TEMP_SUB_TOPIC = "/intellibreeze/app/temperature" ;
  MANUAL_FAN_SPEED_SUB_TOPIC = "/intellibreeze/sensor/manual/fanspeed" ; // Topic for WIO to subscribe to from the GUI, because the user sets the fan speed via a slider
  MANUAL_FAN_SPEED_PUB_TOPIC = "/intellibreeze/app/manual/fanspeed"; //Topic for WIO to publish
  AUTO_FAN_SPEED_PUB_TOPIC = "/intellibreeze/sensor/automatic/fanspeed"; //Topic for WIO to publish


  void setupClient(){
      client.subscribe(MANUAL_FAN_SPEED_SUB_TOPIC);
      client.subscribe(PREF_TEMP_SUB_TOPIC);
  }

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