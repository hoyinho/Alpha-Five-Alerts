var React = require('react');
var ReactDOM = require('react-dom');
require('./index.css');
var App = require('./App');
var registerServiceWorker = require('./registerServiceWorker');

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
