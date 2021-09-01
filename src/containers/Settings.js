import React, { useContext, useState } from 'react';
import { GlobalContext } from '../state/GlobalProvider';

export default function Settings ({ show, setShow }) {

  const { globalState, setGlobalState } = useContext(GlobalContext);

  const [settings, setSettings] = useState({
    useBookmarks: JSON.parse(localStorage.getItem('useBookmarks')) || false,
    proxy: localStorage.getItem('proxy'),
    useProxy: JSON.parse(localStorage.getItem('useProxy')) || false,
    notes: localStorage.getItem('notes') || '',
  });

  const onchange = e => {
    setSettings({
      ...settings,
      [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value
    });
  }

  const onSettings = e => {
    e.preventDefault();
    let { proxy, useProxy, useBookmarks, notes } = settings;
    setGlobalState({ ...globalState, proxy, useProxy, useBookmarks });

    localStorage.setItem('proxy', proxy);
    localStorage.setItem('notes', notes);
    localStorage.setItem('useBookmarks', useBookmarks);
    localStorage.setItem('useProxy', useProxy);

    setShow(!show);
  }

  return (<div className={"modal" + (show ? ' d-flex justify-center align-center' : '')}>
    <div className="bg-dark scalein">

      <div className="vertical-align border-bottom justify-between mb-10 border-muted pb-2">
        <h2 className="m-0 p-0">Settings</h2>
        <button className="bg-inherit no-hover p-0 m-0" type="button" onClick={() => setShow(!show)}>x</button>
      </div>

      <form className="w-100" onSubmit={onSettings}>

        <div className="w-100 grid-2">
          <div className="w-100">
            <label htmlFor="proxy">URL Proxy</label>
            <input className="w-100 bg-black border p-15 mt-10 mb-10"
              type="url"
              name="proxy"
              placeholder="Proxy url"
              onChange={onchange}
              value={settings.proxy || ''}
            />

            <div>
              <input type="checkbox" name="useProxy"
                onChange={onchange}
                checked={settings.useProxy}
              />

              <span className="ml-10">use this proxy in every request</span>
            </div>

            <div>
              <input type="checkbox" name="useBookmarks"
                onChange={onchange}
                checked={settings.useBookmarks}
              />

              <span className="ml-10">Store all urls into a folder (Check Bookmarks)</span>
            </div>
          </div>

          <div className="mb-10">
            <label className="m-0 p-0" htmlFor="notes">Notes</label>
            <textarea className="w-100 mt-10" name="notes" rows="10" cols="50"
              onChange={onchange}
              value={settings.notes || ''}></textarea>
          </div>
        </div>

        <button type="submit" className="w-100">save and close</button>

      </form>

    </div>
  </div>);
}