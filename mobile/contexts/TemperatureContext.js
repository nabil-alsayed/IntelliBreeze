import React, {createContext, useState} from 'react';

export const TemperatureContext = createContext(null);

export const TemperatureProvider = ({ children }) => {
    const [lowToMediumRange, setLowToMediumRange] = useState(0);
    const [mediumToHighRange, setMediumToHighRange] = useState(0);
    const [tempUnit, setTempUnit] = useState('C');
    const [isAutoMode, setIsAutoMode] = useState(false);

    const value = {
        lowToMediumRange,
        setLowToMediumRange,
        mediumToHighRange,
        setMediumToHighRange,
        tempUnit,
        setTempUnit,
        isAutoMode,
        setIsAutoMode,
    }

    return (
        <TemperatureContext.Provider value={value}>
            {children}
        </TemperatureContext.Provider>
    );


};

