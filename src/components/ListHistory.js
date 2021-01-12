import React, { useContext } from 'react';
import { GlobalContext } from '../state/GlobalProvider';

export default function ListHistory () {

  const { globalState, setGlobalState } = useContext(GlobalContext);

  const onClickLink = h => {
    setGlobalState({ ...globalState, sender: { ...h.sender, isDataSubmitted: true } });
  }

  const onRemove = h => {
    let c = window.confirm('Are you sure you want to delete? \n' + h.url);

    if (c) {
      let tmp = globalState.history.slice(0);
      tmp = tmp.filter(v => v.date !== h.date)
      setGlobalState({ ...globalState, history: tmp });
    }
  }

  return (<div className="container">
    <header className="p-15 txt-uppercase">
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
      </svg>History
    </header>

    <div className="content">
      <ul className="list-history">

        {globalState.history.map((h, i) => <li className="vertical-align p-15 border-bottom" key={i}>
          <span onClick={() => { onRemove(h) }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="link" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#E91E63">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </span>

          <div>
            <div onClick={() => { onClickLink(h) }} className="link">{h.url}</div>

            <div className="txt-muted">
              <span className="txt-uppercase">{h.sender.method}</span> {h.date.slice(0, 24)}
            </div>
          </div>

        </li>)}
      </ul>
    </div>
  </div>);
}