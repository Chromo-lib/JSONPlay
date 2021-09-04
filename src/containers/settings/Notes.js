import React, { useContext, useState } from 'react';
import { GlobalContext } from '../../state/GlobalProvider';
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
    <h5>save some Notes</h5>
    <textarea className="h-100 bg-black border w-100 mt-10" name="notes" rows="15" cols="50"
      onChange={onchange}
      value={settings.notes || ''}></textarea>
    <button type="submit">save</button>
  </form>);
}