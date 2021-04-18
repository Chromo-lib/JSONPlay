import React from 'react';
import './Spinner.css';

export default function Spinner () {
  return <div className="spinner-container">
    <div className="spinner-border"></div>
    <p className="mb-0 text-center">Sending Request</p>
  </div>;
}