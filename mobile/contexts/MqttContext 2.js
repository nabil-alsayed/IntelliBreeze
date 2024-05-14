import React, { createContext, useState } from 'react';

export const MqttContext = createContext();

export const MqttProvider = ({ children }) => {
    const [client, setClient] = useState(null);
    const [temperature, setTemperature] = useState(0);

    const value = {
        client,
        setClient,
        temperature,
        setTemperature
    };

    return (
        <MqttContext.Provider value={value}>
            {children}
        </MqttContext.Provider>
    );
};
