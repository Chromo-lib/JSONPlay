import React, { createContext, useState } from 'react';
import LocalHistory from '../utils/LocalHistory';

const localHistory = LocalHistory.getAll();

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
  useBookmarks: localStorage.getItem('useBookmarks') || false,
  useProxy: localStorage.getItem('useProxy') || false,
  proxy: localStorage.getItem('proxy'),
  notes: null
}

const GlobalContext = createContext();

function GlobalProvider ({ children }) {
  const [globalState, setGlobalState] = useState(initState);
  return (<GlobalContext.Provider value={{ globalState, setGlobalState }}>
    {children}
  </GlobalContext.Provider>);
}

export { GlobalContext, GlobalProvider };
