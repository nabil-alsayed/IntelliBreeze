import { useEffect, useState, useRef } from "react";
import {connectToMqtt, subscribeToTopic} from '../utils/mqttUtils';

export const useTopicSubscription = (onTopicUpdate, topic, topicName) => {
    const [client, setClient] = useState(null);
    const clientRef = useRef(null); // Using useRef to keep track of the client for immediate access in effects and cleanup

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

        return () => {};
    }, [topic]);

    useEffect(() => {
        if (client) {
            const handleMessage = (message) => {
                if (message.destinationName === topic) {
                    const temperature = parseInt(message.payloadString, 10);
                    onTopicUpdate(temperature);
                }
            };

            subscribeToTopic(client, handleMessage, topic, topicName);
            return () => {};
        }
    }, [client, onTopicUpdate]);

    return client;
};
