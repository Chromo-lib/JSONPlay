import React from 'react';
import copyToClipboard from '../utils/copyToClipboard';

import { faCopy } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function BtnCopy ({ data, text = "" }) {

  const onCopy = () => {
    if (window.confirm(text + '?')) {
      copyToClipboard(JSON.stringify(data))
    }
  }

  return (<button className="w-100 bg-inherit" title="Copy" onClick={onCopy}>
    <FontAwesomeIcon icon={faCopy} />
  </button>);
}