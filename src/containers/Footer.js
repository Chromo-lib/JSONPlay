import { useContext, useState } from "react";
import { GlobalContext } from "../state/GlobalProvider";
import Settings from "./settings/Settings";

import { faBomb, faFolder, faInfoCircle, faCogs } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Footer () {

  const { globalState } = useContext(GlobalContext);
  const [showSettings, setShowSettings] = useState(false);

  return (<footer>
    <div className="vertical-align">
      <a className="mr-10" href="https://github.com/haikelfazzani/json-viewer-extension">JSONPlay v1</a>
      <a className="mr-10 vertical-align" href="https://github.com/haikelfazzani/json-viewer-extension/issues">
        <FontAwesomeIcon icon={faBomb} /> issues</a>
      <a className="vertical-align" href="https://github.com/haikelfazzani/json-viewer-extension">
        <FontAwesomeIcon icon={faFolder} />repository</a>
    </div>

    <div className="vertical-align">
      {Object.keys(globalState.infos).map(info => <p className="ml-10 vertical-align" key={info}>
        <FontAwesomeIcon icon={faInfoCircle} /> {info}: {globalState.infos[info]}
      </p>)}

      <div>
        <div className="ml-10 d-flex align-center justify-center mr-10 cp" onClick={() => setShowSettings(!showSettings)}>
          <FontAwesomeIcon icon={faCogs} /><span>Settings</span>
        </div>
        <Settings show={showSettings} setShow={setShowSettings} />
      </div>
    </div>
  </footer>);
}