import React, { useContext, useState } from 'react';
import { GlobalContext } from '../state/GlobalProvider';

export default function Settings ({ show, setShow }) {

  const { globalState, setGlobalState } = useContext(GlobalContext);

  const [settings, setSettings] = useState({
    proxy: localStorage.getItem('proxy'),
    useProxy: localStorage.getItem('useProxy') || false
  });

  const onchange = e => {
    setSettings({ ...settings, [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value });
  }

  const onSettings = e => {
    e.preventDefault();
    let { proxy, useProxy } = settings;
    setGlobalState({ ...globalState, proxy, useProxy });
    localStorage.setItem('proxy', proxy);
    localStorage.setItem('useProxy', useProxy);
    setShow(!show);
  }

  return (<div className={"modal" + (show ? ' d-flex justify-center align-center' : '')}>
    <div className="bg-dark">

      <div className="d-flex justify-between border-bottom mb-10 border-muted">
        <h2 className="m-0 p-0">Settings</h2>
        <button className="bg-inherit no-hover p-0 m-0" type="button" onClick={() => setShow(!show)}>x</button>
      </div>

      <form className="d-flex flex-column" onSubmit={onSettings}>
        <div className="mb-10 d-flex flex-column">
          <label className="mb-10">URL Proxy</label>
          <input className="w-100 bg-black border p-15 mt-10"
            type="url"
            name="proxy"
            placeholder="Proxy url"
            onChange={onchange}
            value={settings.proxy}
            />
        </div>

        <div className="mt-10 mb-30">
          <input type="checkbox" name="useProxy"
            onChange={onchange}
            checked={settings.useProxy}
          />
          <span>use this proxy in every request</span>
        </div>

        <button type="submit" className="w-100">save and close</button>
      </form>
    </div>
  </div>);
}