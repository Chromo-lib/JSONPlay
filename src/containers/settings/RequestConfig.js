import React, { useContext, useState } from 'react';
import { GlobalContext } from '../../state/GlobalProvider';

import { faFolder } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LocalSettings from '../../utils/LocalSettings';
import Switch from '../../components/Switch';

export default function FormSettings () {

  const { globalState, setGlobalState } = useContext(GlobalContext);
  const [settings, setSettings] = useState(globalState.settings);
  const [isSaved, setIsSaved] = useState(false);

  const onchange = e => {
    setSettings({
      ...settings,
      [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value
    });
  }

  const onSettings = e => {
    e.preventDefault();
    setGlobalState({ ...globalState, settings });
    setIsSaved(true)
    LocalSettings.setAll(settings);

    setTimeout(() => {
      setIsSaved(false)
    }, 2000);
  }

  return (<form className="w-100" onSubmit={onSettings}>
    <h5><FontAwesomeIcon icon={faFolder} />  Request</h5>

    <div className="grid-2">
      <div>
        <div className="mb-20">
          <label htmlFor="proxy">proxy</label>
          <input className="w-100 bg-black border p-15 mt-10 mb-10"
            type="url"
            name="proxy"
            placeholder="Proxy url"
            onChange={onchange}
            value={settings.proxy || ''}
          />

          <input type="checkbox" name="useProxy" onChange={onchange} checked={settings.useProxy} />
          <span className="ml-10">use this proxy for every request</span>
        </div>

        <div>
          <label htmlFor="timeout">timeout</label>
          <p className="m-0 p-0 txt-muted">Set how long a request should wait for a response before timing out. To never time out, set to 0.</p>
          <input
            className="w-100 bg-black border p-15 mt-10 mb-10"
            type="number"
            name="timeout"
            onChange={onchange}
            placeholder="default: 0ms"
          />
        </div>
      </div>

      <div className="mb-20">
        <Switch
          text="Save url to Bookmarks"
          id="useBookmarks"
          name="useBookmarks"
          onChange={onchange}
          checked={settings.useBookmarks}
        />

        <p className="m-0 p-0 txt-muted">Save every request url to Bookmarks bar (JSONPlay folder).</p>
      </div>

    </div>
    <button type="submit">{isSaved ? 'saved' : 'save'}</button>
  </form>);
}