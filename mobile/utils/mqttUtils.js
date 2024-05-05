import { Client } from "paho-mqtt";

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

// Method to subscribe to temperature

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

export const unsubscribeFromTopic = (client, topic, topicName) => {
    client.unsubscribe(topic, {
        onSuccess: () => {
            console.log("unsubscribed to " + topicName + " topic successfully");
        },
        onFailure: (error) => {
            console.error("Failed to unsubscribe to " + topicName + " topic:", error.errorMessage);
        },
    })
}

export const publishTopic = (client, topic, topicName) => {
    client.send(topic, {
        onSuccess: () => {
            console.log("Published to " + topicName + " topic successfully");
        },
        onFailure: (error) => {
            console.error("Failed to publish to " + topicName + " topic:", error.errorMessage);
        }
    })
}
