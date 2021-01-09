import React, { useState, useContext } from 'react';
import { GlobalContext } from '../state/GlobalProvider';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-json5";
import "ace-builds/src-noconflict/theme-monokai";

let code = `{
  "data": {
    "name": "zzzzz",
    "job": "zion resident"
  },
  "headers": {
    "Accept": "application/json",
    "Content-type": "application/json; charset=UTF-8"
  }
}`;

export default function Sender () {

  const [state, setState] = useState(code);
  const { globalState, setGlobalState } = useContext(GlobalContext);

  const onSubmit = e => {
    e.preventDefault();
    let method = e.target.elements[0].value;
    let url = e.target.elements[1].value;    

    try {
      let data = {};
      if (state.length > 10) {
        data = state.replace(/\r?\n|\r|\s+/g, '').trim();
        data = JSON.parse(data);
      }
      let sender = { method, url, ...data, isDataSubmitted: true };
      setGlobalState({ ...globalState, sender });
    } catch (error) {
      console.log(error);
    }
  }

  return (<div className="container">
    <header>
      <form onSubmit={onSubmit}>
        <select name="method">
          <option value="get">Get</option>
          <option value="post">post</option>
          <option value="put">put</option>
          <option value="delete">delete</option>
        </select>

        <input type="url" name="url" placeholder="https://jsonplaceholder.typicode.com/todos/1" required />
        <button type="submit">Send</button>
      </form>

    </header>

    <div className="content p-0">
      <div className="editor h-100">
        <AceEditor
          mode="json5"
          theme="monokai"
          width="100%"
          height="100%"
          value={state}
          onChange={(newValue) => { setState(newValue) }}
          name="ace-json-editor"
          editorProps={{ $blockScrolling: true }}
        />
      </div>
    </div>
  </div>);
}