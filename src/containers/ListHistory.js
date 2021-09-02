import React, { useContext, useState } from 'react';
import { GlobalContext } from '../state/GlobalProvider';
import LocalHistory from '../utils/LocalHistory';
import BtnDownload from '../components/BtnDownload';
import copyToClipboard from '../utils/copyToClipboard';

import { faCopy, faStream, faTrash, faSearch, faChevronCircleDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function ListHistory () {

  const { globalState, setGlobalState } = useContext(GlobalContext);
  const [tmpHistory, setTmpHistory] = useState(globalState.history);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const onSearch = (e) => {
    let val = e.target.value.trim();
    setSearchQuery(val);

    let tmp = globalState.history.slice(0);
    tmp = tmp.filter(v => v.url.includes(val))
    setTmpHistory(tmp.length > 0 ? tmp : globalState.history);
  }

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
    <header className="p-15 pr-0 d-flex justify-between txt-uppercase">
      <p className="m-0 p-0 d-flex align-center"><FontAwesomeIcon icon={faStream} />History ({globalState.history.length})</p>
      <div className="d-flex align-center">
        <button className="bg-inherit" onClick={() => { setShowSearch(!showSearch) }}><FontAwesomeIcon icon={faSearch} /></button>
        <BtnDownload data={JSON.stringify(globalState.history)} text="Export List Of History" />
      </div>
    </header>

    <div className="content">
      <ul className="list-history">

        {showSearch && <li className="vertical-align p-15 border-bottom p-0">
          <input className="w-100"
            type="search"
            name="url"
            value={searchQuery}
            onChange={onSearch}
            placeholder="Search.."
          />
        </li>}

        {tmpHistory.length > 0 && tmpHistory.map((h, i) => <li className="vertical-align p-15 border-bottom" key={i}>
          <div className="drop-menu">
            <button type="button"><FontAwesomeIcon icon={faChevronCircleDown} /></button>

            <ul className="drop-menu-items fs-14 ltsp2 scalein">
              <li onClick={() => { onAction('copy', h) }}>
                <FontAwesomeIcon icon={faCopy} /> copy
              </li>

              <li onClick={() => { onAction('remove', h) }}>
                <FontAwesomeIcon icon={faTrash} /> delete
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
  </div >);
}