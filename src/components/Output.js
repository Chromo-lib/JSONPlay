import React, { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../state/GlobalProvider';
import axios from 'axios';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-json5";
import "ace-builds/src-noconflict/theme-monokai";

import formatSize from '../utils/formatSize';

export default function Output () {

  const { globalState, setGlobalState } = useContext(GlobalContext);
  const [state, setState] = useState({
    output: '',
    headers: '',
    infos: {
      status: 200,
      statusText: '',
      time: '0',
      size: '0 bytes'
    },
    errors: 'No errors'
  });

  const [currentTab, setCurrentTab] = useState('output');

  useEffect(() => {
    const { url, method, data, isDataSubmitted } = globalState.sender;

    if (isDataSubmitted) {
      let startTime = Date.now();
      let options = { url, method };

      if (data && Object.keys(data).length > 0) {
        options = { url, method, data: data };
      }

      axios(options)
        .then(rsp => {
          let sender = { ...globalState.sender, isDataSubmitted: false };

          let tmpH = globalState.history.slice(0);

          if (!tmpH.find(h => h.sender.method === options.method && h.url === options.url)) {
            tmpH.unshift({
              sender,
              url: options.url,
              date: new Date().toString()
            });
          }

          setGlobalState({ ...globalState, sender, history: tmpH });

          setState({
            output: rsp.data,
            headers: rsp.headers,
            infos: {
              status: rsp.status,
              statusText: rsp.statusText,
              time: Date.now() - startTime + ' ms',
              size: formatSize(JSON.stringify(rsp.data).length)
            },
            errors: 'No errors'
          });
        })
        .catch(e => {
          setState({ ...state, errors: e });
        });
    }
  }, [globalState.sender.isDataSubmitted, globalState.sender.url]);

  const onTab = tabName => {
    setCurrentTab(tabName);
  }

  return (<div className="container">
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
  </div>);
}