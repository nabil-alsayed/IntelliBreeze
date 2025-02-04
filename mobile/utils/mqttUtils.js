import {Client, Message} from "paho-mqtt";

// Configurations
const MQTT_BROKER_URL = "broker.hivemq.com";
const MQTT_PORT = 8000;

// Mqtt Connection Method
export const connectToMqtt = () => {
    const clientId = `WioTerminal-${parseInt(Math.random() * 100)}`;
    const client = new Client(MQTT_BROKER_URL, MQTT_PORT, clientId);

    client.connect({
        onSuccess: () => {
            console.log("Connected to MQTT broker successfully");
        },
        onFailure: (error) => {
            console.error("Failed to connect to MQTT broker:", error.errorMessage);
        },
    });

    return client;
};

// Method to subscribe to a specific topic

export const subscribeToTopic = (client, handleMessage, topic, topicName) => {
    client.onMessageArrived = handleMessage;
    client.subscribe(topic, {
        onSuccess: () => {
            console.log("Subscribed to " + topicName + " successfully");
        },
        onFailure: (error) => {
            console.error("Failed to subscribe " + topicName + " topic:", error.errorMessage);
        },
    });
};

//Method to publish to any topic
export const publishToTopic = (client, topic, payload, topicName) => {
    payload = (String (payload));
    const topicDescription = topicName;
    topicName = new Message(payload);
    topicName.destinationName = topic;
    client.send(topicName);
    console.log("Sent " + topicDescription + "successfully!")
}


