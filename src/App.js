import React, { lazy, Suspense } from 'react';
import Split from 'react-split'
import ListHistory from "./containers/ListHistory";
import Output from "./containers/Output";
import Sender from "./containers/Sender";

const Footer = lazy(() => import("./components/Footer"));

function App () {

  return (<>
    <main>
      <Split sizes={[17, 43, 40]} gutterSize={7}>
        <ListHistory />
        <Sender />
        <Output />
      </Split>
    </main>

    <Suspense fallback={<div></div>}>
      <Footer />
    </Suspense>
  </>);
}

export default App;
