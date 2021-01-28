import React, { useState } from "react";
import Split from 'react-split';

export default function SplitWrapper (props) {

  const [state, setState] = useState(() => {
    let local = localStorage.getItem('sizes');
    return local ? JSON.parse(local) : [17, 43, 40];
  });

  const onDragEnd = sizes => {
    localStorage.setItem('sizes', JSON.stringify(sizes))
    setState(sizes);
  }

  return <Split sizes={state} minSize={10} onDragEnd={onDragEnd} gutterSize={7}>{props.children}</Split>
}
