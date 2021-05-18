import React from 'react';
import download from '../utils/download';

export default function BtnDownload ({ data,text = "" }) {

  const onDownload = () => {    
    if (window.confirm(text+'?')) {
      download(data);
    } 
  }

  return (<button className="w-100 bg-inherit" onClick={onDownload} title={text}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="18" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  </button>);
}