import { useEffect, useRef, useState } from "react";
import { connectToMqtt } from '../utils/mqttUtils';

export const useTopicPublish = () => {
    const [client, setClient] = useState(null);
    const clientRef = useRef(null);

    useEffect(() => {
        const mqttClient = connectToMqtt();
        clientRef.current = mqttClient;

        mqttClient.onConnected = () => {
            console.log("Connected to MQTT broker successfully");
            setClient(mqttClient);
        };

        mqttClient.onConnectionLost = (error) => {
            console.error("Connection lost:", error.errorMessage);
            setClient(null);
        };

        return () => {
            mqttClient.disconnect();
            console.log("Disconnected from MQTT broker");
        };
    }, []);

    const publishMessage = (topic, payload, topicName) => {
        if (client && client.isConnected()) {
            client.publish(topic, payload);
            console.log(`Message published to ${topicName}: ${payload}`);
        } else {
            console.log("Cannot publish because the client is not connected.");
        }
    };

    return publishMessage;
};
