import Stacks from './navigations/Stacks'
import { ModeFormProvider } from './contexts/ModeFormContext'
import { TemperatureProvider } from "./contexts/TemperatureContext";

export default function App() {

    return (
        <ModeFormProvider>
            <TemperatureProvider>
                <Stacks/>
            </TemperatureProvider>
        </ModeFormProvider>
        )
};

