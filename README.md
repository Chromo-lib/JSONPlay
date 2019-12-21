## 📋 React flip card   
A lightweight React component flip card.  

### [Demo](https://stackblitz.com/edit/react-flip-cards-mzrnxa?file=index.js)

![bundlephobia badge](https://badgen.net/npm/v/react-flip-cards) ![bundlephobia badge](https://badgen.net/bundlephobia/min/react-flip-cards) ![bundlephobia badge](https://badgen.net/bundlephobia/minzip/react-flip-cards)

```
npm i react-flip-cards
```

### Usage
```js
import FlipCard from "react-flip-cards";
import '../node_modules/react-flip-cards/build/index.css'; // required

<FlipCard img={imgLink} // all props
  fontTitle="ReactJs"
  fontSubTitle="web application"
  backTitle="ReactJs app"
  backText="Lorem Ipsum is simply dummy text of the printing"
  fgColor="#ff0000" // front card background color
  bgColor="#ff0000" // back card background color
/>
```

### Examples :
```js
const App = () => {

  return (
    <div className="container">
      <div className="col-3">
        <FlipCard img={imgLink} // without children
          fontTitle="ReactJs"
          fontSubTitle="web application"
          backTitle="ReactJs app"
          backText="Lorem Ipsum is simply dummy text"
        />
      </div>

      <div className="col-3">
        <FlipCard // with children
          fontTitle="Svelte"
          fontSubTitle="web application"
          backTitle="Svelte app"
          backText="Lorem Ipsum is simply dummy text"
          fgColor="red"
          bgColor="red"
        >
          <a href="https://github.com/haikelfazzani">Link</a>
        </FlipCard>
      </div>
    </div>
  );
}
```

### License
MIT