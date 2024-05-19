import React, { createContext, useState } from 'react';

export const FanContext = createContext();

export const FanProvider = ({ children }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [modeEditModalVisible, setModeEditModalVisible] = useState(false);
    const [fanSpeed, setFanSpeed] = useState(0);
    const [fanIsOn, setFanIsOn] = useState(false);
    const [modes, setModes] = useState([]);
    const [formValid, setFormValid] = useState(false);
    const [modeConfirmationModalVisible, setModeConfirmationModalVisible] = useState(false);
    const [selectedModeId, setSelectedModeId] = useState("auto");
    const [selectedModeFanSpeed, setSelectedModeFanSpeed] = useState(0);
    const [autoDutyCycles, setAutoDutyCycles] = useState(0);
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
        setSelectedModeFanSpeed,
        autoDutyCycles,
        setAutoDutyCycles
    };

    return (
        <FanContext.Provider value={value}>
            {children}
        </FanContext.Provider>
    );
};