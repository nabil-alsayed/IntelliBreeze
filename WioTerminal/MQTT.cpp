#include "MQTT.h"
#include "fanbutton.h"
#include "FanSpeedAdjustment.h"
  
  
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

    //MQTT Temperature Related Topics
  const char* TEMP_PUB_TOPIC = "/intellibreeze/sensor/temperature" ;
  const char* PREF_TEMP_SUB_TOPIC = "/intellibreeze/app/temperature" ;
  const char* TEMPUNIT_SUB_TOPIC = "/intellibreeze/app/tempUnit" ;
  const char* HIGH_THRESHOLD_SUB_TOPIC = "/intellibreeze/app/highThreshold";
  const char* MED_THRESHOLD_SUB_TOPIC = "/intellibreeze/app/mediumThreshold";

    //MQTT Fan Speed Related Topics
  const char* MANUAL_FAN_SPEED_PUB_TOPIC = "/intellibreeze/sensor/manual/fanspeed" ; // Topic for WIO to subscribe to from the GUI, because the user sets the fan speed via a slider
  const char* MANUAL_FAN_SPEED_SUB_TOPIC = "/intellibreeze/app/manual/fanspeed"; //Topic for WIO to publish
  const char* AUTO_FAN_SPEED_PUB_TOPIC = "/intellibreeze/sensor/automatic/fanspeed"; //Topic for WIO to publish
  const char* FAN_TOGGLE_SUB_TOPIC = "/intellibreeze/app/manual/button";


   // String fanToggleValue = "";
   //String highThresholdValue = "";
   //String mediumThresholdValue = "";
   String subscribedPayload = "C";


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
      client.subscribe(TEMPUNIT_SUB_TOPIC);   
      
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
