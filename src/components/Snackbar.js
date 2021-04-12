import React, { useEffect, useState } from 'react';
import './Snackbar.css'

export default function Snackbar ({ text = null }) {
  const [showSnack, setShowSnack] = useState(text);

  useEffect(()=>{
    setShowSnack(text);
  },[text]);

  return (<div className={"snackbar" + (showSnack ? ' d-block':' d-none')}>
    <pre>{text}</pre>
    <button className="bg-bleu" onClick={() => { setShowSnack(!showSnack) }}>X</button>
  </div>);
}