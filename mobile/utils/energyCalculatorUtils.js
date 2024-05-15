import moment from "moment";

/*
The purpose of this class is to calculate the Energy Spent based on the selected fan speed
 */

export default class EnergyCalculatorUtils {
    constructor() {
        this.lastUpdateTime = moment();
        this.cumulativeEnergy = 0;
    }

    /* method to set the initial energy and is used
    to set the energy level to the last stored one in case of restart */
    setInitialEnergy(initialEnergy) {
        this.cumulativeEnergy = initialEnergy;
    }

    // Method to reset Energy to 0 When Day Changes
    resetEnergy() {
        this.cumulativeEnergy = 0;
        this.lastUpdateTime = moment(); // Reset the last update time as well
    }

    // Method to convert the subscribed Duty Cycle back to Fan Speed to pass to energy calculator
    convertCycleToFanSpeed = (dutyCycles) => {
        return ((dutyCycles - 60) / 195.0 * 99) + 1;
    }

    updateEnergy(fanSpeed) {
        const now = moment();
        const timeDelta = now.diff(this.lastUpdateTime, 'seconds'); // Calculate the time difference in seconds
        this.lastUpdateTime = now;

        if (fanSpeed > 0) {
            const rate = 0.01 + (0.09 * (fanSpeed / 100)); // Calculate energy increment based on fan speed
            const energyIncrement = rate * timeDelta;
            this.cumulativeEnergy += energyIncrement;
        }

        return this.cumulativeEnergy;
    }
}