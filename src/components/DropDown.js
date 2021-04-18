import React, { useState } from 'react';
import './DropDown.css';

export default function DropDown ({ data }) {
  const [item, setItem] = useState(data[0]);

  const onItem = method => {
    setItem(method);
  }

  return (<div className="dropdown">
    <button className="bg-inherit h-100 w-100" type="button">
      <span className="mr-10">{item}</span>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <ul>{data.map((d, i) => <li key={i} onClick={() => { onItem(d) }}>{d}</li>)}</ul>
  </div>);
}