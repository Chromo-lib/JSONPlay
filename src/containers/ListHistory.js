import React, { useContext } from 'react';
import { GlobalContext } from '../state/GlobalProvider';
import LocalHistory from '../utils/LocalHistory';
import BtnCopy from '../components/BtnCopy';
import BtnDownload from '../components/BtnDownload';
import copyToClipboard from '../utils/copyToClipboard';

export default function ListHistory () {

  const { globalState, setGlobalState } = useContext(GlobalContext);

  const onClickLink = h => {
    setGlobalState({ ...globalState, url: h.url, sender: { ...h.sender, isDataSubmitted: true } });
  }

  const onAction = (actionType, h) => {    
    switch (actionType) {
      case 'remove':
        if (window.confirm('Are you sure you want to delete? \n' + h.url)) {
          let tmp = globalState.history.slice(0);
          tmp = tmp.filter(v => v.date !== h.date)
          setGlobalState({ ...globalState, history: tmp });
          LocalHistory.remove(h);
        }
        break;

      case 'copy':
        if (window.confirm('Copy url? \n' + h.url)) {
          copyToClipboard(h.url);
        }        
        break;

      default:
        break;
    }
  }

  return (<div className="container">
    <header className="p-15 pr-0 vertical-align justify-between txt-uppercase">
      <div className="vertical-align">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z" />
          <path d="M7 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0zM7 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0z" />
        </svg>History ({globalState.history.length})
      </div>

      <div className="vertical-align box-shad-none">
        <BtnDownload data={JSON.stringify(globalState.history)} text="Export List Of History" />
        <BtnCopy data={globalState.history} text="Copy List Of History" />
      </div>
    </header>

    <div className="content">
      <ul className="list-history">

        {globalState.history.length > 0 && globalState.history.map((h, i) => <li className="vertical-align p-15 border-bottom" key={i}>
          <div className="drop-menu">
            <button type="button">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>

            <ul className="drop-menu-items fs-14 ltsp2 scalein">
              <li onClick={() => { onAction('copy', h) }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#fff">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg> copy
              </li>

              <li onClick={() => { onAction('remove', h) }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#E91E63">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg> delete
              </li>
            </ul>
          </div>

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