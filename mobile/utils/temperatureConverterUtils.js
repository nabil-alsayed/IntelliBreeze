export const convertTemperature = (temp, tempUnit) => {
    if (tempUnit === 'F') {
        return Math.floor((temp * 9 / 5) + 32) + '°F';
    } else if (tempUnit === 'K') {
        return Math.floor(temp + 273.15) + 'K';
    }
    return temp.toFixed(0) + '°C';
}; 