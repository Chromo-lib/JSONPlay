import { render, createRef, linkEvent, Component } from 'inferno';
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

function handleClick (props, event) {
  let { jsonResponse } = props;

  switch (event.target.dataset.action) {
    case 'copy':
      copyToClipboard(JSON.stringify(jsonResponse));
      break;

    case 'raw':
      // const pre = document.createElement('pre');
      // divRoot.innerHTML = '';
      // pre.textContent = preContent;
      // divRoot.appendChild(pre);
      break;

    default:
      break;
  }
}

export default class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      jsonResponse: null,
      isDataFetched: false,
      errorMsg: null,
      responseHeaders: null,
      showHeaders: false,
      showJsnviewOptions: false,
      jsnviewOptions: { displayItemsLen: true, displayTypes: false }

    };
    this.jsonPrevRef = createRef();
    this.onFetchJson = this.onFetchJson.bind(this);
    this.onShowHeaders = this.onShowHeaders.bind(this);
    this.onShowJsnviewOptions = this.onShowJsnviewOptions.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  componentDidMount () {
    if (this.props.jsonURL) {
      this.fetchURL(this.props.jsonURL);
    }
  }

  onFetchJson (e) {
    e.preventDefault();
    this.fetchURL(e.target.elements[0].value);
  }

  fetchURL (jsURL) {
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
          this.setState({ ...this.state, jsonResponse, isDataFetched: true, errorMsg: null });
        }
      })
      .catch(e => {
        this.setState({ ...this.state, isDataFetched: false, errorMsg: '' + e });
      });
  }

  onInputChange (e) {
    let jsnviewOptions = { ...this.state.jsnviewOptions, [e.target.name]: e.target.checked };
    this.setState({ ...this.state, jsnviewOptions });
  }

  onShowHeaders () {
    this.setState({ ...this.state, showHeaders: !this.state.showHeaders, showJsnviewOptions: false });
  }

  onShowJsnviewOptions () {
    this.setState({ ...this.state, showHeaders: false, showJsnviewOptions: !this.state.showJsnviewOptions });
  }

  render () {

    const { showHeaders, showJsnviewOptions, responseHeaders, errorMsg } = this.state;

    return (<div class="w-100 h-100">
      <div class="w-100 jsonofy-header justify-content-between mb-10">
        <form class="form-url d-flex-row" onSubmit={this.onFetchJson}>
          <input type="url" name="url" id="url" placeholder="Enter json url.." required />
          <button type="submit">Fetch</button>
        </form>

        <div class="d-flex-row">
          <button data-action="copy" onclick={linkEvent(this.state, handleClick)}>copy json</button>
          <button data-action="show-headers" onclick={this.onShowHeaders}>headers</button>
          <button onclick={this.onShowJsnviewOptions}><svg width="20" fill="none" stroke="#fff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path></svg></button>
        </div>
      </div>

      <div class="p-10" ref={this.jsonPrevRef}></div>

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

      <Snackbar errorMsg={errorMsg} />
    </div>);
  }
}
