import Stacks from './navigations/Stacks'
import {ModeFormProvider} from './contexts/ModeFormContext'

export default function App() {

    return (
        <ModeFormProvider>
            <Stacks/>
        </ModeFormProvider>
    );

}

