import React, {createContext, useState} from 'react';
import useTemperatureThreshold from "../hooks/useTemperatureThreshold";


export const TemperatureContext = createContext();

export const TemperatureProvider = ({ children }) => {
    const [lowToMediumRange, setLowToMediumRange] = useState(0);
    const [mediumToHighRange, setMediumToHighRange] = useState(0);
    const [tempUnit, setTempUnit] = useState('C');

    const value = {
        lowToMediumRange,
        setLowToMediumRange,
        mediumToHighRange,
        setMediumToHighRange,
        tempUnit,
        setTempUnit
    }

    return (
        <TemperatureContext.Provider value={value}>
            {children}
        </TemperatureContext.Provider>
    );


};

