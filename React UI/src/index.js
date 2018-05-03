var React = require('react');
var ReactDOM = require('react-dom');
require('./index.css');
var App = require('./App').default;
var registerServiceWorker = require('./registerServiceWorker').default;

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
