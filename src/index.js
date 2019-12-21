import React from 'react';
import { render } from "react-dom";
import './index.css'
import FlipCard from './lib';

import imgLink from './img/1.jpg';

const App = () => {

  return (
    <div className="container">
      <div className="col-3">
        <FlipCard img={imgLink}
          fontTitle="ReactJs"
          fontSubTitle="web application"
          backTitle="ReactJs app"
          backText="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
        />
      </div>


      <div className="col-3">
        <FlipCard img={imgLink}
          fontTitle="Angular"
          fontSubTitle="web application"
          backTitle="Angular app"
          backText="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
        />
      </div>

      <div className="col-3">
        <FlipCard img={imgLink}
          fontTitle="VueJs"
          fontSubTitle="web application"
          backTitle="VueJs app"
          backText="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
        />
      </div>

      <div className="col-3">
        <FlipCard img={imgLink}
          fontTitle="Svelte"
          fontSubTitle="web application"
          backTitle="Svelte app"
          backText="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
        >
          <a href="https://github.com/haikelfazzani">Link</a>
        </FlipCard>
      </div>
    </div>
  );
}

render(<App />, document.getElementById("root"));
