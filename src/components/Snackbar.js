import React, { useEffect, useState } from 'react';

import { faExclamationTriangle, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Snackbar.css'

export default function Snackbar ({ text = null }) {
  const [showSnack, setShowSnack] = useState(text);

  useEffect(() => {
    setShowSnack(text);
  }, [text]);

  return (<div className={"snackbar" + (showSnack ? ' d-block' : ' d-none')}>
    <pre><FontAwesomeIcon icon={faExclamationTriangle} /><span className="ml-10">{text}</span></pre>
    <button className="bg-bleu" onClick={() => { setShowSnack(!showSnack) }}><FontAwesomeIcon icon={faTimes} /></button>
  </div>);
}