import React from "react";
import "./Switch.css";

const Switch = ({ name, checked, onChange }) => {
  return (
    <div className="toggle-switch small-switch">
      <input
        className="toggle-switch-checkbox"
        type="checkbox"
        name={name}
        id={name}
        checked={checked}
        onChange={onChange}
      />
      <label
        className="toggle-switch-label"
        tabIndex="1"
        htmlFor={name}
      >
        <span className="toggle-switch-inner" tabIndex="-1" />
        <span className="toggle-switch-switch" tabIndex="-1" />
      </label>
    </div>
  );
};


export default Switch;
