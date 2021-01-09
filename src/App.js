import ListHistory from "./components/ListHistory";
import Output from "./components/Output";
import Sender from "./components/Sender";
import { GlobalProvider } from "./state/GlobalProvider";
import SplitWrapper from './components/SplitWrapper';

function App () {
  return (
    <GlobalProvider>
      <main>
        <SplitWrapper
          options={{ sizes: [17, 43, 40], minSize: 10, direction: "vertical" }}
          cls="split-wrapper"
        >
          <ListHistory />
          <Sender />
          <Output />
        </SplitWrapper>
      </main>
    </GlobalProvider>
  );
}

export default App;
