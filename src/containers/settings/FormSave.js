import React, { useContext, useState } from 'react';
import { GlobalContext } from '../../state/GlobalProvider';

import { faInfoCircle, faLink, faLock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LocalSettings from '../../utils/LocalSettings';

export default function FormSave () {

  const { globalState, setGlobalState } = useContext(GlobalContext);
  const [settings, setSettings] = useState(globalState.settings);
  const [isSaved, setIsSaved] = useState(false);

  const onchange = e => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
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

  return (<form onSubmit={onSettings}>
    <div className="grid-2">
      <div>
        <div>
          <label><FontAwesomeIcon icon={faLink} /> Airtable Api URL</label>
          <input
            className="w-100 bg-black border p-15 mt-10 mb-10"
            type="url"
            name="air_url"
            value={settings.air_url}
            onChange={onchange}
            placeholder="https://api.airtable.com/v0/xxxxxxxxx/xxx"
            required
          />
        </div>

        <div>
          <label><FontAwesomeIcon icon={faLock} /> Airtable Token</label>
          <input
            className="w-100 bg-black border p-15 mt-10 mb-10"
            type="password"
            name="air_token"
            value={settings.air_token}
            onChange={onchange}
            placeholder="keyxxxxxxxxxxx"
            required
          />
        </div>
      </div>

      <ul className="bg-black border p-15">
        <li className="txt-danger"><FontAwesomeIcon icon={faInfoCircle} />Important</li>
        <li className="txt-danger">table fields should looks like (lowercase)</li>
        <li className="txt-white cp-none">url: string</li>
        <li className="txt-white cp-none">method: string</li>
        <li className="txt-white cp-none">data: long string</li>
        <li className="txt-white cp-none">headers: long string</li>
        <li className="txt-white cp-none">date: string</li>
      </ul>
    </div>

    <button type="submit">{isSaved ? 'saved' : 'save'}</button>
  </form>);
}