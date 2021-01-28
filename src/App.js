import React, { lazy, Suspense } from 'react';
import SplitWrapper from './components/SplitWrapper';
import ListHistory from "./containers/ListHistory";
import Output from "./containers/Output";
import Sender from "./containers/Sender";

const Footer = lazy(() => import("./components/Footer"));

function App () {

  return (<>
    <main>
      <SplitWrapper>
        <ListHistory />
        <Sender />
        <Output />
      </SplitWrapper>
    </main>

    <Suspense fallback={<div></div>}>
      <Footer />
    </Suspense>
  </>);
}

export default App;
