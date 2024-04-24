import React, {useState} from 'react';
import CheckBox from '@react-native-community/checkbox';

const DefaultCheckBox = () => {
    const[isSelected, setIsSelected] = useState(false);

    return (
        <CheckBox
            disabled={false}
            value = {isSelected}
            onValueChange={(newValue) => setIsSelected(newValue)}

        ></CheckBox>
    )

}
export default DefaultCheckBox;