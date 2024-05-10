import React, { createContext, useState } from 'react';

export const EnergyConsumptionContext = createContext(null);

export const EnergyConsumptionProvider = ({ children }) => {
    const [consumption, setConsumption] = useState(0);

    const value = {
        consumption,
        setConsumption
    };

    return (
        <EnergyConsumptionContext.Provider value={value}>
            {children}
        </EnergyConsumptionContext.Provider>
    );
};
