import React, { useState } from 'react';
import './DropDown.css';

export default function DropDown ({ data }) {

  const [state, setState] = useState({
    data: data[0],
    display: false
  });

  const onItem = item => {
    setState({ data: item, display: !state.display });
  }

  return (<div className="dropdown">

    <button className="bg-inherit h-100 w-100" type="button"
      onClick={() => { setState({ ...state, display: !state.display }) }}>
      <span className="mr-10">{state.data}</span>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <ul style={{ display: state.display ? 'block' : 'none' }}>
      {data.map((d, i) => <li key={i} onClick={() => { onItem(d) }}>{d}</li>)}
    </ul>
  </div>);
}