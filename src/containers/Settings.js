import React, { useContext, useState } from 'react';
import { GlobalContext } from '../state/GlobalProvider';

import { faCogs, faFolder, faLink, faStickyNote } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LocalSettings from '../utils/LocalSettings';

export default function Settings ({ show, setShow }) {

  const { globalState, setGlobalState } = useContext(GlobalContext);

  const [settings, setSettings] = useState(globalState.settings);

  const onchange = e => {
    setSettings({
      ...settings,
      [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value
    });
  }

  const onSettings = e => {
    e.preventDefault();
    setGlobalState({ ...globalState, settings });
    LocalSettings.setAll(settings)
    setShow(!show);
  }

  return (<div className={"modal" + (show ? ' d-flex justify-center align-center' : '')}>
    <div className="bg-dark scalein">

      <div className="vertical-align border-bottom justify-between mb-10 border-muted pb-2">
        <h2 className="m-0 p-0"><FontAwesomeIcon icon={faCogs} /> Settings</h2>
        <button className="bg-inherit no-hover p-0 m-0" type="button" onClick={() => setShow(!show)}>x</button>
      </div>

      <form className="w-100" onSubmit={onSettings}>

        <div className="w-100 grid-2">
          <div className="w-100">

            <h4 className="m-0"><FontAwesomeIcon icon={faLink} />  Proxy</h4>

            <input className="w-100 bg-black border p-15 mt-10 mb-10"
              type="url"
              name="proxy"
              placeholder="Proxy url"
              onChange={onchange}
              value={settings.proxy || ''}
            />

            <div className="mb-20">
              <input type="checkbox" name="useProxy"
                onChange={onchange}
                checked={settings.useProxy}
              />

              <span className="ml-10">use this proxy in every request</span>
            </div>

            <div className="mb-10">
              <h4 className="mb-10"><FontAwesomeIcon icon={faFolder} />  Reponse timeout</h4>

              <input
                className="w-100 border border-muted p-15"
                type="number"
                name="timeout"
                onChange={onchange}
                placeholder="default: 0ms"
              />
            </div>


            <div className="mb-10">
              <h4 className="mb-10"><FontAwesomeIcon icon={faFolder} />  Bookmarks</h4>

              <input type="checkbox"
                name="useBookmarks"
                onChange={onchange}
                checked={settings.useBookmarks}
              />

              <span className="ml-10">Store all urls into a Bookmarks bar</span>
            </div>            
          </div>

          <div className="mb-10">
            <h4 className="m-0"><FontAwesomeIcon icon={faStickyNote} />  Notes</h4>
            <textarea className="w-100 mt-10" name="notes" rows="10" cols="50"
              onChange={onchange}
              value={settings.notes || ''}></textarea>
          </div>
        </div>

        <button type="submit" className="w-100">save and close</button>

      </form>

    </div>
  </div>);
}