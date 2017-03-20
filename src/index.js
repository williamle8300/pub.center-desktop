var React = require('react')
var ReactDOM = require('react-dom')
var App = require('./App')

import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

ReactDOM.render(
  <App />,
  document.getElementById('root')
)