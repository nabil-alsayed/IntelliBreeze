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

    // Method to update the cumulative energy consumption based on the current fan speed
    updateEnergy(fanSpeed) {
        // Get the current time
        const now = moment();
        // Calculate the time difference in seconds since the last update
        const timeDelta = now.diff(this.lastUpdateTime, 'seconds');
        // Update the last update time to the current time
        this.lastUpdateTime = now;

        // If the fan is running (fanSpeed > 0)
        if (fanSpeed > 0) {
            const rate = 0.01 + (0.09 * (fanSpeed / 100)); // Calculate energy increment based on fan speed
            // Assume a baseline energy consumption rate and scale with fan speed
            // A normal roof fan consumes approximately 75 watts at full speed (100% duty cycle)
            // Adjusted rate to account for PWM and power consumption characteristics
            const rate = 0.01 + (fanSpeed / 100);

            // Calculate the energy increment based on the rate and time delta
            const energyIncrement = rate * timeDelta;

            // Add the energy increment to the cumulative energy
            this.cumulativeEnergy += energyIncrement;
        }

        // Return the updated cumulative energy
        return this.cumulativeEnergy;
    }
}