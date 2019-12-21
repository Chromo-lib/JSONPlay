import React from 'react';
import './FlipCard.css';

export default function FlipCard ({ children, img, fontTitle, fontSubTitle, backText, backTitle }) {

  return (
    <div className="flip__container">
      <div className="front" style={{ backgroundImage: `url(${img})` }}>
        <h1>{fontTitle}</h1>
        <p className="card__subtitle">{fontSubTitle}</p>
      </div>

      <div className="back">
        <h2>{backTitle}</h2>
        <p>{backText}</p>
        {children}
      </div>
    </div>
  );
}
