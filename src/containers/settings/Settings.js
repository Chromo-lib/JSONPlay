import React, { useState } from 'react';

import { faCog } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import RequestConfig from './RequestConfig';
import Notes from './Notes';
import Theme from './Theme';
import FormSave from './FormSave';

export default function Settings ({ show, setShow }) {

  const [currentTab, setCurrentTab] = useState('Request');
  const tabs = {
    Request: <RequestConfig />,
    Notes: <Notes />,
    Theme: <Theme />,
    Save: <FormSave />
  }

  return (<div className={"modal" + (show ? ' d-flex justify-center align-center' : '')}>
    <div className="bg-dark scalein">

      <header className="vertical-align border-bottom justify-between bg-black">
        <h3 className="m-0 p-0"><FontAwesomeIcon icon={faCog} />Settings</h3>
        <button className="bg-inherit no-hover p-0 m-0" type="button" onClick={() => setShow(!show)}>x</button>
      </header>

      <div className="modal-content">
        <ul className="vertical-align">
          {Object.keys(tabs).map(key => <li className={"mr-20" + (key === currentTab ? ' active' : '')}
            key={key}
            onClick={() => { setCurrentTab(key) }}>{key}</li>)}
        </ul>

        <div>{tabs[currentTab]}</div>
      </div>

    </div>
  </div>);
}