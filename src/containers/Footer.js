import { useContext, useState } from "react";
import { GlobalContext } from "../state/GlobalProvider";
import Settings from "./Settings";

export default function Footer () {

  const { globalState } = useContext(GlobalContext);
  const [showSettings, setShowSettings] = useState(false);

  return (<footer>
    <div className="vertical-align">
      <a className="mr-10" href="https://github.com/haikelfazzani/json-viewer-extension">JSONPlay v1</a>
      <a className="mr-10 vertical-align" href="https://github.com/haikelfazzani/json-viewer-extension/issues">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>issues</a>
      <a className="vertical-align" href="https://github.com/haikelfazzani/json-viewer-extension">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>repository</a>
    </div>
    <div className="vertical-align">
      {Object.keys(globalState.infos).map(info => <p className="ml-10 vertical-align" key={info}>
        <svg xmlns="http://www.w3.org/2000/svg" width="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>{info}: {globalState.infos[info]}
      </p>)}

      <div>
        <button type="button" onClick={() => setShowSettings(!showSettings)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
        <Settings show={showSettings} setShow={setShowSettings} />
      </div>
    </div>
  </footer>);
}