import React, { createContext, useState } from 'react';
import LocalHistory from '../utils/LocalHistory';
import LocalSettings from '../utils/LocalSettings';

const localHistory = LocalHistory.getAll();

const appTheme = LocalSettings.getOne('theme') || 'dark';
document.documentElement.setAttribute('data-theme', appTheme);

const initState = {
  sender: localHistory[0] ? localHistory[0].sender : {
    method: 'get',
    url: '',
    data: {},
    headers: { "Accept": "application/json", "Content-type": "application/json; charset=UTF-8" },
    isDataSubmitted: false
  },
  infos: { status: 200, statusText: '-', time: '0', size: '0' },
  history: LocalHistory.getAll(),
  settings: {
    air_url: LocalSettings.getOne('air_url') || '',
    air_token: LocalSettings.getOne('air_token') || '',
    timeout: +LocalSettings.getOne('timeout') || 0,
    useBookmarks: LocalSettings.getOne('useBookmarks') || false,
    useProxy: LocalSettings.getOne('useProxy') || false,
    proxy: LocalSettings.getOne('proxy') || '',
    notes: LocalSettings.getOne('notes') || 'some notes here..',
    theme: appTheme
  },
  editor: {
    theme: appTheme === 'dark' || appTheme === 'blue' ? 'monokai' : 'eclipse',
    fontSize: 16
  }
}

const GlobalContext = createContext();

function GlobalProvider ({ children }) {
  const [globalState, setGlobalState] = useState(initState);
  return (<GlobalContext.Provider value={{ globalState, setGlobalState }}>
    {children}
  </GlobalContext.Provider>);
}

export { GlobalContext, GlobalProvider };
