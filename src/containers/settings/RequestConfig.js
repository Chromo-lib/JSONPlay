import React, { useContext, useState } from 'react';
import { GlobalContext } from '../../state/GlobalProvider';

import { faFolder } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LocalSettings from '../../utils/LocalSettings';

export default function FormSettings () {

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
    <h5><FontAwesomeIcon icon={faFolder} />  Request</h5>

    <div>
      <label htmlFor="timeout">timeout</label>
      <input
        className="w-100 border border-muted p-15 mt-10"
        type="number"
        name="timeout"
        onChange={onchange}
        placeholder="default: 0ms"
      />
    </div>

    <button type="submit">save</button>
  </form>);
}