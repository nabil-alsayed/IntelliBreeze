import React, { createContext, useState } from 'react';
import {collection} from "firebase/firestore";
import {db} from "../firebaseConfig";


export const TemperatureThresholdsContext = createContext(null);

export const TemperatureThresholdsProvider = ({ children }) => {
    const [lowToMediumRange, setLowToMediumRange] = useState(0);
    const [mediumToHighRange, setMediumToHighRange] = useState(0);
    const [tempUnit, setTempUnit] = useState('C');
    const [showWarning, setShowWarning] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [slidersDisabled, setSlidersDisabled] = useState(false);
    const collectionRef = collection(db, 'temperatureThresholds');
    const documentID = 'aIPlgZv2kTA4axiMAnw5';
    const HIGH_THRESHOLD_PUB_TOPIC = "/intellibreeze/app/highThreshold"
    const MED_THRESHOLD_PUB_TOPIC = "/intellibreeze/app/mediumThreshold"



    return (
        <TemperatureThresholdsContext.Provider value={value}>
            {children}
        </TemperatureThresholdsContext.Provider>
    );


};

