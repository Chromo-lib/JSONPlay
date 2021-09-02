import React from 'react';
import download from '../utils/download';

import { faDownload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function BtnDownload ({ data, text = "" }) {

  const onDownload = () => {
    if (window.confirm(text + '?')) {
      download(data);
    }
  }

  return (<button className="w-100 bg-inherit" onClick={onDownload} title={text}>
    <FontAwesomeIcon icon={faDownload} />
  </button>);
}