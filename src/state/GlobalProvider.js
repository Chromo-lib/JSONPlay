import React, { createContext, useState } from 'react';

const initState = {
  sender: {
    method: 'get',
    url: '',
    data: {},
    headers: {
      "Accept": "application/json",
      "Content-type": "application/json; charset=UTF-8"
    },    
    isDataSubmitted: false
  },
  history:[]
}

const GlobalContext = createContext();

function GlobalProvider ({ children }) {

  const [globalState, setGlobalState] = useState(initState);

  return (<GlobalContext.Provider value={{ globalState, setGlobalState }}>
    {children}
  </GlobalContext.Provider>);
}

export { GlobalContext, GlobalProvider };
