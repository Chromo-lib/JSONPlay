import React, { useContext } from 'react';
import { GlobalContext } from '../../state/GlobalProvider';
import LocalSettings from '../../utils/LocalSettings';

export default function Theme () {

  const { globalState, setGlobalState } = useContext(GlobalContext);
  const themes = ['light', 'dark', 'blue'];

  const onTheme = theme => {
    const settings = { ...globalState.settings, theme }
    const editor = { ...globalState.editor, theme: theme === 'dark' || theme === 'blue' ? 'monokai' : 'eclipse' }

    setGlobalState({ ...globalState, settings, editor });
    LocalSettings.setAll(settings)
    document.documentElement.setAttribute('data-theme', theme);
  }

  return (<div className="w-100">
    <h5>Choose either the light or dark theme for the JSONPlay app.</h5>

    <ul className="theme-choose mt-20">
      {themes.map(t => <li
        className={t + "-theme" + (globalState.settings.theme === t ? ' border-blue' : '')}
        key={t}
        onClick={() => { onTheme(t) }}></li>)}
    </ul>
  </div>);
}