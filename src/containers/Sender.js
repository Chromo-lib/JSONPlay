import React, { useState,useEffect, useContext } from 'react';
import { GlobalContext } from '../state/GlobalProvider';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-json5";
import "ace-builds/src-noconflict/theme-monokai";
import DropDown from '../components/DropDown';

let code = `{
  "data": {
    "userId": 111,
    "id": 12,
    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    "body":"quia et suscipit"
  },
  "headers": {
    "Accept": "application/json",
    "Content-type": "application/json; charset=UTF-8"
  }
}`;

export default function Sender () {

  const [editorVal, setEditorVal] = useState(code);
  const { globalState, setGlobalState } = useContext(GlobalContext);

  const onSubmit = e => {
    e.preventDefault();
    let method = e.target.elements[0].textContent;
    let url = e.target.elements[1].value;

    try {
      let data = {};
      if (editorVal.length > 10) {
        data = editorVal.replace(/\r?\n|\r|\s+/g, '').trim();
        data = JSON.parse(data);
      }
      let sender = { method, url, ...data, isDataSubmitted: true };
      setGlobalState({ ...globalState, sender });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setGlobalState({ ...globalState, url: window.location.search.slice(5) });
  }, []);

  return (<div className="container">
    <header>
      <form onSubmit={onSubmit}>
        <DropDown data={['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS']} />

        <input type="url" name="url"
          defaultValue={globalState.url}
          placeholder="https://jsonplaceholder.typicode.com/todos/1" required />
        <button type="submit" className="bg-inherit">Send</button>
      </form>

    </header>

    <div className="content p-0">
      <div className="editor h-100">
        <AceEditor
          mode="json5"
          theme="monokai"
          width="100%"
          height="100%"
          value={editorVal}
          onChange={(newValue) => { setEditorVal(newValue) }}
          name="ace-json-editor"
          editorProps={{ $blockScrolling: true }}
        />
      </div>
    </div>
  </div>);
}