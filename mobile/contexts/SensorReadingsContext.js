import React, { createContext, useState } from 'react';

export const SensorReadingsContext = createContext();

export const SensorReadingsProvider = ({ children }) => {
    const [temperature, setTemperature] = useState(0);

    const value = {
        temperature,
        setTemperature
    };

    return (
        <SensorReadingsContext.Provider value={value}>
            {children}
        </SensorReadingsContext.Provider>
    );
};
