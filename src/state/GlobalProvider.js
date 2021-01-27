import React, { createContext, useState } from 'react';
import LocalHistory from '../utils/LocalHistory';

const initState = {
  sender: {
    method: 'get',
    url: window.location.search.slice(5),
    data: {},
    headers: {
      "Accept": "application/json",
      "Content-type": "application/json; charset=UTF-8"
    },
    isDataSubmitted: false
  },
  infos: { status: 200, statusText: '-', time: '0', size: '0' },
  history: LocalHistory.getAll()
}

const GlobalContext = createContext();

function GlobalProvider ({ children }) {

  const [globalState, setGlobalState] = useState(initState);

  return (<GlobalContext.Provider value={{ globalState, setGlobalState }}>
    {children}
  </GlobalContext.Provider>);
}

export { GlobalContext, GlobalProvider };
