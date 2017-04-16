var React = require('react')
import Color from 'color'

import MUIThemeable from 'material-ui/styles/muiThemeable'


module.exports = MUIThemeable()(React.createClass({
  _feeds: [
    'ayy0',
    'ayy1',
    'ayy2',
    'ayy3',
    'ayy4',
    'ayy5',
    'ayy6',
    'ayy7',
  ],
  render: function () {
    return (
      <div style={{display: 'flex', padding: '3rem 0'}}>
        <div style={{width: '50%'}}>
          <h1>Subscribe and receive push notifications</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
        <div style={{width: '50%'}}>{this._feeds[this.props.selectedRssFeed]}</div>
      </div>
)
  },
}))
