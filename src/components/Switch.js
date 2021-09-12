import React from "react";
import "./Switch.css";

const Switch = ({ text, name, checked, onChange }) => {
  return (
    <div className="vertical-align justify-between">

      <span>{text}</span>

      <div className="switch small">
        <input
          type="checkbox"
          name={name}
          id={name}
          checked={checked}
          onChange={onChange}
        />
        <label tabIndex="1" htmlFor={name} >
          <span className="switch-inner" tabIndex="-1" />
          <span className="switch-circle" tabIndex="-1" />
        </label>
      </div>
    </div>
  );
};


export default Switch;
