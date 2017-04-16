var React = require('react')
import Color from 'color'
import Styled, {keyframes} from 'styled-components'

import MUIThemeable from 'material-ui/styles/muiThemeable'


module.exports = MUIThemeable()(React.createClass({
  propTypes: {
    selectedRssFeed: React.PropTypes.number.isRequired,
  },
  _feeds: [
    'techcrunch',
    'eff',
    'dribbble',
    'nyt',
    'pinterest',
    'weather',
    'associated%20press',
    'verge',
  ],
  render: function () {
    return (
      <div style={{display: 'flex', padding: '3rem 0'}}>
        <div style={{width: '50%'}}>
          <h1>Developer-friendly REST APIs</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
        <div style={{width: '50%'}}>
          <div style={{padding: '1rem', borderRadius: 10, color: Color(this.props.muiTheme.palette.primary1Color).lighten(0.5).string(), backgroundColor: Color(this.props.muiTheme.palette.primary1Color).darken(0.25).string()}}>
            $ https://pub.center/feed?search={this._feeds[this.props.selectedRssFeed]}<this.Cursor/>
          </div>
        </div>
      </div>
    )
  },
  Cursor: function () {

    const blink = keyframes`
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
      }
    `

    const Cursor = Styled.div`
      position: relative;
      top: 0.25rem;
      display: inline-block;
      // margin-right: 1rem;
      width: 0.65rem;
      height: 1.25rem;
      background-color: ${Color(this.props.muiTheme.palette.primary1Color).lighten(0.5).string()};
      animation: ${blink} 1s infinite;
    `

    return <Cursor/>
  }
}))
