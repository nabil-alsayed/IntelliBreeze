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



//Method to unsubscribe to a specific topic
/*
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
*/


/*
<<<<<<< HEAD
export const publishToTopic = (client, topic, thresholdString, topicName) => {
    topicName = new Message(thresholdString);
    topicName.destinationName = topic;
    client.send(topicName);



}
=======
*/


//Method to publish payload topic
export const publishToTopic = (client, topic, payload, topicName) => {
    topicName = new Message(payload);
    topicName.destinationName = topic;
    client.send(topicName);
}


