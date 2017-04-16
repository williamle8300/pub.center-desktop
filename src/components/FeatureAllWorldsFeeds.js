var React = require('react')
import Color from 'color'
import Styled, {keyframes} from 'styled-components'

import MUIThemeable from 'material-ui/styles/muiThemeable'

import techcrunchIcon from '../images/rss-logos/techcrunch.png'
import apIcon from '../images/rss-logos/ap.png'
import pinterestIcon from '../images/rss-logos/pinterest.png'
import effIcon from '../images/rss-logos/eff.png'
import dribbbleIcon from '../images/rss-logos/dribbble.png'
import theweatherchannelIcon from '../images/rss-logos/weatherchannel.png'
import nytIcon from '../images/rss-logos/nyt.png'
import thevergeIcon from '../images/rss-logos/the-verge.png'

module.exports = MUIThemeable()(React.createClass({
  propTypes: {
    selectedRssFeed: React.PropTypes.number.isRequired,
  },
  _bookDimension: {
    width: 51,
    height: 126,
  },
  render: function () {
    return (
      <div style={{display: 'flex', padding: '3rem 0'}}>
        {this.createBookTile(this._bookDimension.width, this._bookDimension.height)}
        <div style={{width: '100%'}}>
          <h1>All of the world's news at your fingertips</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
      </div>
    )
  },
  createBookTile: function (width, height, favicons) {

    const glow = keyframes`
      from {
        background-color: ${Color(this.props.muiTheme.palette.primary1Color).lighten(0.25).string()};
      }
      to {
        background-color: ${Color(this.props.muiTheme.palette.primary1Color).lighten(0.5).string()};
      }
    `
    const Perspective = Styled.div`
      position: relative;
      margin: 0 auto;
      padding: 2rem;
      display: flex;
      alignItems: center;
      justifyContent: center;
      width: 100%;
      height: ${height}px;
      transform: rotateX(69deg) rotateZ(-31deg);
      transform-style: preserve-3d;
    `

    const generateBook = (rssFeedIdx) => {

      const favicons = [
        techcrunchIcon,
        effIcon,
        dribbbleIcon,
        nytIcon,
        pinterestIcon,
        theweatherchannelIcon,
        apIcon,
        thevergeIcon,
      ]
      const Book = Styled.div`
        background-color: ${this.props.muiTheme.palette.primary1Color};
        position: relative;
        transform-style: preserve-3d;
        &, &:after, &:before {
          box-shadow: inset 0 0 0 2px hsla(0,0%,0%,.05);
          content: '';
          float: left;
          height: ${height}px;
          width: ${width}px;
          animation: ${this.props.selectedRssFeed === rssFeedIdx ? glow+ ' 1s infinite' : 'none'} ;
        }
        &:after, &:before {
          position: absolute;
        }
        &:before {
          background-color: ${Color(this.props.muiTheme.palette.primary1Color).darken(0.5).string()};
          transform: rotateY(90deg) translateX(${height}px) translateZ(-${height}px);
          transform-origin: 100% 0;
          height: ${height}px;
          width: ${height}px;
        }
        &:after {
          background-color: ${Color(this.props.muiTheme.palette.primary1Color).darken(0.25).string()};
          transform: rotateX(-90deg) translateY(${height}px) translateX(-1px);
          transform-origin: 100% 100%;
          background-image: url(${favicons[rssFeedIdx]});
          background-position: 50% 90%;
          background-size: 35px;
          background-repeat: no-repeat;
        }
        &:hover, &:hover:after, &:hover:before {
          background-color: ${Color(this.props.muiTheme.palette.primary1Color).lighten(0.25).string()};
          cursor: pointer;
          animation: ${glow} 1s infinite;
        }
      `

      return <Book onClick={this.props.handleRssSelect.bind(null, rssFeedIdx)} style={this.style1(this.state, this.props, rssFeedIdx)}/>
    }

    return (
      <Perspective>
        {generateBook(0)}
        {generateBook(1)}
        {generateBook(2)}
        {generateBook(3)}
        {generateBook(4)}
        {generateBook(5)}
        {generateBook(6)}
        {generateBook(7)}
      </Perspective>
    )
  },
  style1: function (state, props, rssFeedIdx) {

    const distance = this._bookDimension.height - 2 //fixes a svg rendering bug

    return {
      transform: this.props.selectedRssFeed === rssFeedIdx ? 'translateY(' +distance+ 'px)' : 'none',
    }
  }
}))
