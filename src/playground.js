import { render } from 'inferno';
import App from './App';
import './playground.css';

let isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
chrome = isChrome ? chrome : browser;

let jsonURL = null;

try {
  jsonURL = window.location.search.slice(5);
  if(!/^((http|https):\/\/)/.test(jsonURL)) {
    jsonURL = null;
  }
} catch (error) {
  jsonURL = null;
}

render(<App jsonURL={jsonURL} />, document.getElementById('root-jsonofy'));
