import React from 'react';
import './FlipCard.css';

export default function FlipCard ({ children, img, fontTitle, fontSubTitle, backText, backTitle, bgColor, fgColor }) {

  return (
    <div className="flip__container">
      <div className="front" style={{ backgroundImage: `url(${img})`, backgroundColor: fgColor || '#313131' }}>
        <h1>{fontTitle}</h1>
        <p className="card__subtitle">{fontSubTitle}</p>
      </div>

      <div className="back" style={{ backgroundColor: bgColor }}>
        <h2>{backTitle}</h2>
        <p>{backText}</p>
        {children}
      </div>
    </div>
  );
}
