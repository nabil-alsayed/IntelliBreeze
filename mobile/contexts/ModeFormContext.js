import { createContext } from 'react';

export const ModeFormContext = createContext();

export const ModeFormProvider = ({ children }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [modeEditModalVisible, setModeEditModalVisible] = useState(false);
    const [fanSpeed, setFanSpeed] = useState(0);
    const [modes, setModes] = useState([]);
    const [formValid, setFormValid] = useState(false);
    const [modeConfirmationModalVisible, setModeConfirmationModalVisible] = useState(false);

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
        modes,
        setModes
    };

    return (
        <ModeFormContext.Provider value={value}>
            {children}
        </ModeFormContext.Provider>
    );
};
