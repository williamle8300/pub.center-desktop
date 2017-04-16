var env = require('../../env')

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
    'deeplinks',
    'dribbble',
    'nyt',
    'pinterest',
    'weather',
    'associated%20press',
    'verge',
  ],
  render: function () {
    return (
      <div style={{display: 'flex', padding: '6rem 0'}}>
        <div style={{width: '100%'}}>
          <h1 style={{fontFamily: '"Monda", sans-serif'}}>Developer-friendly</h1>
          <p>All of our data is freely accessible via REST. If you don't know the resource id, use this endpoint to search our index of RSS feeds. See our <a href={env.backend+ '/documentation'} style={{color: this.props.muiTheme.palette.primary3Color}}>documentation</a> for the complete API.</p>
        </div>
        <div style={{width: '100%', alignItems: 'center', display: 'flex', justifyContent: 'center', padding: '2rem'}}>
          <div style={{padding: '1rem', width: '100%', borderRadius: 10, fontFamily: 'monospace', color: Color(this.props.muiTheme.palette.primary1Color).lighten(0.5).string(), backgroundColor: Color(this.props.muiTheme.palette.primary1Color).darken(0.25).string()}}>
            <b>$</b> curl https://pub.center/feed?search={this._feeds[this.props.selectedRssFeed]}<this.Cursor/>
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
