import React, { useContext, useState } from 'react';
import { GlobalContext } from '../../state/GlobalProvider';

import { faLink } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LocalSettings from '../../utils/LocalSettings';

export default function Theme () {

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
  }

  return (<form className="w-100" onSubmit={onSettings}>
    
    <h5><FontAwesomeIcon icon={faLink} />  Proxy</h5>    

    <input className="w-100 bg-black border p-15 mt-10 mb-10"
      type="url"
      name="proxy"
      placeholder="Proxy url"
      onChange={onchange}
      value={settings.proxy || ''}
    />

    <span className="ml-10">use this proxy for every request</span>

    <button type="submit">save</button>
  </form>);
}