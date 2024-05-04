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

export const subscribeToTemperature = (client, handleMessage) => {
    client.onMessageArrived = handleMessage;
    client.subscribe("/intellibreeze/sensor/temperature", {
        onSuccess: () => {
            console.log("Subscribed to temperature topic successfully");
        },
        onFailure: (error) => {
            console.error("Failed to subscribe to temperature topic:", error.errorMessage);
        },
    });
};
