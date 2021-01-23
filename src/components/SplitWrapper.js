import React, { useEffect, useState } from "react";
import SplitViews from "split-views";
import "split-views/build/index.css";

export default function SplitWrapper(props) {
  
  const [ready, setReady] = useState(false);

  useEffect(()=>{
    console.log(ready);
  
  },[ready, setReady]);
  
  if(props.children) {
    return (
      <div
        ref={(wrapper) => {
          setReady(wrapper)
          if(ready) SplitViews({ parent: wrapper, ...props.options });
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
