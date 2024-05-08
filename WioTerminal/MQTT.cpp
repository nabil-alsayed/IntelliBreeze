#include "MQTT.h"
#include "fanbutton.h"
  
  
  const char* ssid = "Tele2_357564"; // WiFi Name
  const char* password = "vujjwagy";  // WiFi Password
  const char* mqtt_server = "broker.hivemq.com";  // MQTT Broker URL
  TFT_eSPI tft;
  WiFiClient wioClient;
  PubSubClient client(wioClient);
  long lastMsg = 0;
  char msg[50];
  int value = 0;
  
  //MQTT Topics for Publish and Subscribe
  const char* TEMP_PUB_TOPIC = "/intellibreeze/sensor/temperature" ;
  const char* PREF_TEMP_SUB_TOPIC = "/intellibreeze/app/temperature" ;
  const char* MANUAL_FAN_SPEED_PUB_TOPIC = "/intellibreeze/sensor/manual/fanspeed" ; // Topic for WIO to subscribe to from the GUI, because the user sets the fan speed via a slider
  const char* MANUAL_FAN_SPEED_SUB_TOPIC = "/intellibreeze/app/manual/fanspeed"; //Topic for WIO to publish
  const char* AUTO_FAN_SPEED_PUB_TOPIC = "/intellibreeze/sensor/automatic/fanspeed"; //Topic for WIO to publish
  const char* FAN_TOGGLE_SUB_TOPIC = "/intellibreeze/app/manual/button";

   String fanToggleValue = "";


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
   if (strcmp(topic, FAN_TOGGLE_SUB_TOPIC) == 0) {
    fanToggleValue = ""; 
    
    for (int i = 0; i < length; i++) {
      fanToggleValue += (char)payload[i];
    }
    
    Serial.print("Received fan toggle value: ");
    Serial.println(fanToggleValue);
  }

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
      client.subscribe(FAN_TOGGLE_SUB_TOPIC);
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);
      }
    }
  }

  void publish(const char* SUBSCRIPTION_TOPIC, const char* payload, const char* topicName){

    snprintf(msg, 50, "%.1f", payload); // Convert temperature to string
        client.publish(SUBSCRIPTION_TOPIC, payload); // Publish temperature value to MQTT broker
        //client.publish(TEMP_PUB_TOPIC, msg); // Publish temperature value to MQTT broker
        Serial.printf("Published %s\n", topicName);
        Serial.println(payload);


  }
