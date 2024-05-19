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

  //MODE Related TOPICS
  const char* MODENAME_SUB_TOPIC =  "/intellibreeze/app/modeName";

    //MQTT Fan Speed Related Topics
  const char* MANUAL_FAN_SPEED_PUB_TOPIC = "/intellibreeze/sensor/manual/fanspeed" ; // Topic for WIO to subscribe to from the GUI, because the user sets the fan speed via a slider
  const char* AUTO_FAN_SPEED_PUB_TOPIC = "/intellibreeze/sensor/automatic/fanspeed"; //Topic for WIO to publish
  const char* FAN_TOGGLE_SUB_TOPIC = "/intellibreeze/app/manual/button";
  const char* FAN_SPEED_SUB_TOPIC = "/intellibreeze/app/sensor/fanspeed" ;

   String selectedMode;
   String customFanSpeedValue = "";


  void setup_wifi() {
  
  const int contributorsLabelY = 80;
  delay(10);
  tft.setTextSize(2);
  tft.setCursor((320 - tft.textWidth("Connecting to Wi-Fi..")) / 2, 20);
  tft.print("Connecting to Wi-Fi..");

  tft.setCursor((320 - tft.textWidth("Contributors:")) / 2, contributorsLabelY);
  tft.print("Contributors:");

  tft.drawString("Nabil Al Sayed", (320 - tft.textWidth("Nabil Al Sayed")) / 2, contributorsLabelY + 30);
  tft.drawString("Vaibhav Puram", (320 - tft.textWidth("Vaibhav Puram")) / 2, contributorsLabelY + 50);
  tft.drawString("Manas Ahuja", (320 - tft.textWidth("Manas Ahuja")) / 2, contributorsLabelY + 70);
  tft.drawString("Mohamed Taha Jasser", (320 - tft.textWidth("Mohammed Taha Jasser")) / 2, contributorsLabelY + 90);
  tft.drawString("Raghav Khurana", (320 - tft.textWidth("Raghav Khurana")) / 2, contributorsLabelY + 110);

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

  // Conditional for changing speed of fan manually
  /*
    if (strcmp(topic, MANUAL_FAN_SPEED_SUB_TOPIC) == 0) {
        manualFanSpeedSliderValue = "";

        for (int i = 0; i < length; i++) {
          manualFanSpeedSliderValue += (char)payload[i];
        }

        Serial.print("Received fan slider value: ");
        Serial.println(manualFanSpeedSliderValue);
      }
*/
  // Conditional for toggling on and off the fan
  if (strcmp(topic, FAN_TOGGLE_SUB_TOPIC) == 0) {
      fanToggleValue = "";

      for (int i = 0; i < length; i++) {
        fanToggleValue += (char)payload[i];
      }

      Serial.print("Received fan toggle value: ");
      Serial.println(fanToggleValue);

  //Conditional for storing LOW temperature threshold payload into variable
  } else if(strcmp(topic, PREF_TEMP_SUB_TOPIC) == 0){
    startingThresholdValue = "";

    for(int i = 0; i <length; i++){
      startingThresholdValue += (char)payload[i];
    }
    Serial.println("Received Preferred Temperature value: ");
    Serial.println(startingThresholdValue);
  //Conditional for storing HIGH temperature threshold payload into variable
  } else if (strcmp(topic, HIGH_THRESHOLD_SUB_TOPIC) == 0) {
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

  } else if (strcmp(topic, FAN_SPEED_SUB_TOPIC) == 0){
       customFanSpeedValue = "";

          for (int i = 0; i < length; i++) {
            customFanSpeedValue += (char)payload[i];
          }

          Serial.println("Received Custom Fan Speed value: ");
          Serial.println(customFanSpeedValue);
          //selectedMode = "";
   } else if (strcmp(topic, TEMPUNIT_SUB_TOPIC) == 0){

    subscribedTempUnit = String(buff_p);

  } else if (strcmp(topic, MODENAME_SUB_TOPIC) == 0){

        selectedMode = String(buff_p);
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
      client.subscribe(PREF_TEMP_SUB_TOPIC); 

      //Subscribing to fan speeds values from GUI
      client.subscribe(FAN_SPEED_SUB_TOPIC);

      //subscribe to incoming temperature units from phone app
      client.subscribe(TEMPUNIT_SUB_TOPIC);

      //Subscribe to published selected mode name from phone app
      client.subscribe(MODENAME_SUB_TOPIC);

      //Subscribe to toggle mode from phone app
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

  void publish(const char* PUBLISHING_TOPIC, const char* payload, const char* topicName){

    snprintf(msg, 50, "%.1f", payload); // Convert temperature to string
        client.publish(PUBLISHING_TOPIC, payload); // Publish temperature value to MQTT broker
        //client.publish(TEMP_PUB_TOPIC, msg); // Publish temperature value to MQTT broker
        Serial.printf("Published %s\n", topicName);
        Serial.println(payload);


  }
