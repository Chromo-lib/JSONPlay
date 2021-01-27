import React, { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../state/GlobalProvider';
import axios from 'axios';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-json5";
import "ace-builds/src-noconflict/theme-monokai";

import formatSize from '../utils/formatSize';
import LocalHistory from '../utils/LocalHistory';
import Spinner from '../components/Spinner';
import formatNumber from '../utils/formatNumber';
import BtnDownload from '../components/BtnDownload';
import BtnCopy from '../components/BtnCopy';

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

  return (<div className="container">
    <header className="justify-between">
      <div>
        {Object.keys(state).map((tabName) => {
          return <span className={"badge " + (tabName === currentTab ? 'txt-white' : '')}
            key={tabName} onClick={() => { onTab(tabName) }}>{tabName}</span>
        })}
      </div>

      <div className="vertical-align box-shad-none">
        <BtnDownload data={JSON.stringify(state.output)} />
        <BtnCopy data={state.output} />
      </div>
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

    {globalState.sender.isDataSubmitted
      && <Spinner><button onClick={onCancelReq}>cancel request</button></Spinner>}
  </div>);
}