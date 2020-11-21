import { createRef, Component } from 'inferno';
import jsnview from 'jsnview';
import 'jsnview/build/index.css';
import copyToClipboard from './utils/copyToClipboard';

class Snackbar extends Component {

  constructor (props) {
    super(props);
    this.state = { showSnack: false };
    this.onShow = this.onShow.bind(this);
  }

  componentWillReceiveProps (nprops) {
    if (nprops.errorMsg) { this.setState({ showSnack: true }); }
  }

  onShow () {
    this.setState({ showSnack: false });
  }

  render () {
    return <div class={"snackbar " + (this.state.showSnack ? 'show bg-rose' : '')}
      onclick={this.onShow}>
      {this.props.errorMsg}
    </div>;
  }
}

function Spinner () {
  return <div class="spinner-container">
    <div class="spinner-border" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
}

let historyURLs = [];
try {
  historyURLs = localStorage.getItem('history-urls');
  historyURLs = historyURLs ? JSON.parse(historyURLs).reverse() : [];
} catch (error) {
  historyURLs = [];
}

export default class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      jsonResponse: null,
      isFetching: false,
      errorMsg: null,
      responseHeaders: null,
      showHeaders: false,
      showJsnviewOptions: false,
      isDataCopied: false,
      historyURLs,
      jsnviewOptions: { displayItemsLen: true, displayTypes: false }

    };
    this.jsonPrevRef = createRef();
    this.onFetchJson = this.onFetchJson.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onAction = this.onAction.bind(this);
  }

  componentDidMount () {
    if (this.props.jsonURL) {
      this.setState({ ...this.state, isFetching: true });
      this.fetchURL(this.props.jsonURL);
    }
  }

  onFetchJson (e) {
    e.preventDefault();
    this.setState({ ...this.state, isFetching: true });
    this.fetchURL(e.target.elements[0].value);
  }

  fetchURL (jsURL, saveToLocal = true) {
    fetch(jsURL)
      .then(response => {
        let responseHeaders = '';
        for (var p of response.headers) {
          if (!['report-to', 'expect-ct', 'vary', 'via', 'nel'].includes(p[0])) {
            responseHeaders += p[0] + ': ' + p[1] + '\n';
          }
        }

        this.setState({ ...this.state, responseHeaders });
        return response.json();
      })
      .then(jsonResponse => {
        if (this.jsonPrevRef.current) {

          this.jsonPrevRef.current.innerHTML = '';

          let j = jsnview(jsonResponse, this.state.jsnviewOptions);

          this.jsonPrevRef.current.appendChild(j);

          if (saveToLocal) {
            historyURLs = localStorage.getItem('history-urls');
            historyURLs = historyURLs ? JSON.parse(historyURLs) : [];
            historyURLs.push({
              url: jsURL,
              date: new Date().toLocaleString()
            });
            localStorage.setItem('history-urls', JSON.stringify(historyURLs));
          }

          this.setState({ ...this.state, historyURLs, jsonResponse, isFetching: false, errorMsg: null });
        }
      })
      .catch(e => {
        this.setState({ ...this.state, isFetching: false, errorMsg: '' + e });
      });
  }

  onInputChange (e) {
    let jsnviewOptions = { ...this.state.jsnviewOptions, [e.target.name]: e.target.checked };
    this.setState({ ...this.state, jsnviewOptions });
  }

  onAction (actionType, jsURL, jsDate) {
    switch (actionType) {
      case 'copy':
        copyToClipboard(JSON.stringify(this.state.jsonResponse));
        this.setState({ ...this.state, isDataCopied: true });
        setTimeout(() => {
          this.setState({ ...this.state, isDataCopied: false });
        }, 2000);
        break;

      case 'showJsnviewOptions':
        this.setState({ ...this.state, showHeaders: false, showJsnviewOptions: !this.state.showJsnviewOptions });
        break;

      case 'showHeaders':
        this.setState({ ...this.state, showHeaders: !this.state.showHeaders, showJsnviewOptions: false });
        break;

      case 'clearHistory':
        let c = window.confirm('Clear History?');
        if (c) {
          this.setState({ ...this.state, historyURLs: [] });
          localStorage.removeItem('history-urls');
        }
        break;

      case 'onHistoryItem':
        this.setState({ ...this.state, isFetching: true });
        this.fetchURL(jsURL, false);
        this.setState({ ...this.state, historyURLs });
        break;

      case 'onRemoveHistoryItem':
        let historyURLs = this.state.historyURLs.filter(v => v.date !== jsDate).reverse();
        this.setState({ ...this.state, historyURLs });
        localStorage.setItem('history-urls', JSON.stringify(historyURLs));
        break;

      default:
        break;
    }
  }

  render () {

    const { showHeaders, historyURLs, showJsnviewOptions, responseHeaders, errorMsg, isFetching, isDataCopied } = this.state;

    return (<div class="w-100 h-100">
      <div class="w-100 jsonofy-header justify-content-between mb-10">
        <form class="form-url d-flex-row" onSubmit={this.onFetchJson}>
          <input type="url" name="url" id="url" placeholder="Enter json url.." required />
          <button type="submit">Fetch</button>
        </form>

        <div class="d-flex-row">
          <button data-action="copy" onclick={() => { this.onAction('copy') }}>{isDataCopied ? 'Copied' : 'copy json'}</button>
          <button data-action="show-headers" onclick={() => { this.onAction('showHeaders') }}>headers</button>
          <button onclick={() => { this.onAction('showJsnviewOptions') }}><svg width="20" fill="none" stroke="#fff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg></button>
        </div>
      </div>

      <div class="w-100 h-100 d-flex-row align-items ">
        <div class="w-75 h-100 p-10" ref={this.jsonPrevRef}></div>
        <div class="w-25 h-100 sidebar">

          <header class="w-100 d-flex-row justify-content-between bg-rose p-10">
            <span class="d-flex-row txt-uppercase">history</span>
            <span title="Clear History" onclick={() => { this.onAction('clearHistory') }}><svg width="18" fill="none" stroke="#fff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></span>
          </header>

          {historyURLs.length > 0 && <ul>
            {historyURLs.map((h, i) => <li key={'h' + i} class="d-flex-col">
              <h4 class="m-0" onclick={() => { this.onAction('onHistoryItem', h.url); }}>{h.url}</h4>
              <small class="w-100 d-flex-row justify-content-between txt-muted">
                <span>{h.date}</span>
                <button class="btn-small bg-red"
                  onclick={() => { this.onAction('onRemoveHistoryItem', h.url, h.date); }}>
                  <svg width="12" fill="none" stroke="#fff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
              </small>
            </li>)}
          </ul>}
        </div>
      </div>

      {responseHeaders && showHeaders && <div class="modal p-10">{responseHeaders}</div>}

      {showJsnviewOptions && <div class="modal p-10" onChange={this.onSubmitOptions}>
        <p class="m-0">JSON view options</p>
        <hr />
        <div class="w-100 d-flex-row justify-content-between">
          <label for="displayItemsLen">display Items Length</label>
          <input type="checkbox" class="ml-10" name="displayItemsLen"
            checked={this.state.jsnviewOptions.displayItemsLen}
            onChange={this.onInputChange}
          />
        </div>
        <div class="w-100 d-flex-row justify-content-between">
          <label for="displayTypes">display Types</label>
          <input type="checkbox" class="ml-10" name="displayTypes"
            checked={this.state.jsnviewOptions.displayTypes}
            onChange={this.onInputChange} />
        </div>
      </div>}

      {isFetching && <Spinner />}

      <Snackbar errorMsg={errorMsg} />
    </div>);
  }
}
