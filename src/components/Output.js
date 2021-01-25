import React, { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../state/GlobalProvider';
import axios from 'axios';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-json5";
import "ace-builds/src-noconflict/theme-monokai";

import formatSize from '../utils/formatSize';
import LocalHistory from '../utils/LocalHistory';
import Spinner from './Spinner';
import formatNumber from '../utils/formatNumber';
import copyToClipboard from '../utils/copyToClipboard';
import download from '../utils/download';

export default function Output () {

  const { globalState, setGlobalState } = useContext(GlobalContext);
  const [state, setState] = useState({ output: '', headers: '', errors: '' });
  const [currentTab, setCurrentTab] = useState('output');
  const source = axios.CancelToken.source();
  const cancelToken = source.token;

  useEffect(() => {
    const { url, method, data, isDataSubmitted } = globalState.sender;

    if (isDataSubmitted) {
      let startTime = Date.now();
      let options = { url, method, cancelToken };

      if (data && Object.keys(data).length > 0) {
        options = { url, method, data, cancelToken };
      }

      let sender = { ...globalState.sender, isDataSubmitted: false };

      axios(options)
        .then(rsp => {
          let tmpH = globalState.history.slice(0);

          if (!tmpH.find(h => h.sender.method === options.method && h.url === options.url)) {
            let req = { sender, url: options.url, date: new Date().toString() };
            tmpH.unshift(req);
            LocalHistory.add(req);
          }

          setGlobalState({
            ...globalState,
            sender,
            history: tmpH,
            infos: {
              status: rsp.status,
              statusText: rsp.statusText,
              time: formatNumber(Date.now() - startTime),
              size: formatSize(JSON.stringify(rsp.data).length)
            }
          });

          setState({ output: rsp.data, headers: rsp.headers, errors: '' });
        })
        .catch(e => {
          setState({ ...state, errors: e });
          setGlobalState({ ...globalState, sender });
        });
    }
  }, [globalState.sender.isDataSubmitted, globalState.sender.url]);

  const onTab = tabName => {
    setCurrentTab(tabName);
  }

  const onCancelReq = () => {
    source.cancel('test cancellation');
  }

  const onDownload = () => {
    download(JSON.stringify(state.output))
  }

  const onCopy = () => {
    copyToClipboard(JSON.stringify(state.output))
  }

  return (<div className="container output">
    <header>
      {Object.keys(state).map((tabName) => {
        return <span className={"badge " + (tabName === currentTab ? 'txt-white' : '')}
          key={tabName} onClick={() => { onTab(tabName) }}>{tabName}</span>
      })}
    </header>

    <div className="content p-0">
      <AceEditor
        mode="json5"
        theme="monokai"
        width="100%"
        height="100%"
        value={JSON.stringify(state[currentTab], '\n', 2)}
        name="ace-json-editor"
        editorProps={{ $blockScrolling: true }}
        highlightActiveLine={false}
      />
    </div>

    <div className="side-btns">
      <button className="w-100 bg-inherit" title="Download Output" onClick={onDownload}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="18" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
      </button>
      <button className="w-100 bg-inherit" title="Copy Output" onClick={onCopy}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="18" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      </button>
    </div>

    {globalState.sender.isDataSubmitted
      && <Spinner><button onClick={onCancelReq}>cancel request</button></Spinner>}
  </div>);
}