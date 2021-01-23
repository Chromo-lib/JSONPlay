import { useContext } from "react";
import ListHistory from "./components/ListHistory";
import Output from "./components/Output";
import Sender from "./components/Sender";
import { GlobalContext } from "./state/GlobalProvider";
import Split from 'react-split'

function App () {

  const { globalState } = useContext(GlobalContext);

  return (<>
    <main>
      <Split
        sizes={[17, 43, 40]}
        gutterSize={7}
      >
        <ListHistory />
        <Sender />
        <Output />
      </Split>
    </main>


    <footer>
      {Object.keys(globalState.infos).map(info => <p className="ml-10 vertical-align" key={info}>
        {info}: {globalState.infos[info]}
      </p>)}
    </footer>
  </>);
}

export default App;
