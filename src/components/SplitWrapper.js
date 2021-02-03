import React from "react";
import SplitViews from "split-views";
import "split-views/build/index.css";

export default function SplitWrapper(props) {
  
  if(props.children) {
    return (
      <div
        ref={(wrapper) => {
          if(wrapper) SplitViews({ parent: wrapper, ...props.options });
        }}
        className={props.cls}
      >
        {props.children}
      </div>
    );
  }
  else {
    return <div></div>
  }

}
