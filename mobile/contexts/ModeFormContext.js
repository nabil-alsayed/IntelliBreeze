import React, { createContext, useState } from 'react';

export const ModeFormContext = createContext();

export const ModeFormProvider = ({ children }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [modeEditModalVisible, setModeEditModalVisible] = useState(false);
    const [fanSpeed, setFanSpeed] = useState(0);
    const [fanIsOn, setFanIsOn] = useState(false);
    const [modes, setModes] = useState([]);
    const [formValid, setFormValid] = useState(false);
    const [modeConfirmationModalVisible, setModeConfirmationModalVisible] = useState(false);
    const [selectedModeId, setSelectedModeId] = useState("auto")
    const [selectedModeFanSpeed, setSelectedModeFanSpeed] = useState(0)
    const value = {
        modalVisible,
        setModalVisible,
        modeEditModalVisible,
        setModeEditModalVisible,
        modeConfirmationModalVisible,
        setModeConfirmationModalVisible,
        formValid,
        setFormValid,
        fanSpeed,
        setFanSpeed,
        fanIsOn,
        setFanIsOn,
        modes,
        setModes,
        selectedModeId,
        setSelectedModeId,
        selectedModeFanSpeed,
        setSelectedModeFanSpeed
    };

    return (
        <ModeFormContext.Provider value={value}>
            {children}
        </ModeFormContext.Provider>
    );
};