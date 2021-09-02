import React, { useState } from 'react';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './DropDown.css';

export default function DropDown ({ data }) {
  const [item, setItem] = useState(data[0]);

  const onItem = method => {
    setItem(method);
  }

  return (<div className="dropdown">
    <button className="bg-inherit h-100 w-100" type="button">
      <span className="mr-10">{item}</span><FontAwesomeIcon icon={faChevronDown} />
    </button>

    <ul>{data.map((d, i) => <li key={i} onClick={() => { onItem(d) }}>{d}</li>)}</ul>
  </div>);
}