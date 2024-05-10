/* FROM BRANCH 18
<<<<<<< HEAD
import Stack from './navigation/Stack'


export default function App({}) {
  return (
      <Stack/>
  );
}
=======
*/


//Code from MAIN
import Stacks from './navigations/Stacks'

const LM_PUB_TOPIC = "/intellibreeze/slider/lowToMediumThreshold"
const MH_PUB_TOPIC = "/intellibreeze/slider/mediumToHighThreshold"

export default function App() {

    return (
        <Stacks/>
    );
}

