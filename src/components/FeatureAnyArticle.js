var React = require('react')
import Color from 'color'
import Styled from 'styled-components'

import MUIThemeable from 'material-ui/styles/muiThemeable'

import techcrunchIcon from '../images/rss-logos/techcrunch.png'
import apIcon from '../images/rss-logos/ap.png'
import pinterestIcon from '../images/rss-logos/pinterest.png'
import effIcon from '../images/rss-logos/eff.png'
import dribbbleIcon from '../images/rss-logos/dribbble.png'
import theweatherchannelIcon from '../images/rss-logos/weatherchannel.png'
import nytIcon from '../images/rss-logos/nyt.png'
import thevergeIcon from '../images/rss-logos/the-verge.png'
import blokkFont from '../fonts/BLOKKNeue-Regular.otf'


module.exports = MUIThemeable()(React.createClass({
  propTypes: {
    selectedRssFeed: React.PropTypes.number.isRequired,
  },
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
  _articleSize: 126,
  render: function () {
    // {this._feeds[this.props.selectedRssFeed]}
    return (
      <div style={{display: 'flex', padding: '3rem 0'}}>
        {this.createArticleTile(this._articleSize)}
        <div style={{width: '50%'}}>
          <h1>Find any article, any time</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
      </div>
    )
  },
  createArticleTile: function (articleSize) {

    const Perspective = Styled.div`
      position: relative;
      margin: 0 auto;
      height: ${articleSize}px;
      // width: ${articleSize}px;
      transform: rotateX(75deg) rotateZ(39deg);
      transform-style: preserve-3d;
    `
    const generateArticle = (articleIdx) => {

      const favicons = [
        techcrunchIcon,
        apIcon,
        pinterestIcon,
        effIcon,
        dribbbleIcon,
        theweatherchannelIcon,
        nytIcon,
        thevergeIcon,
      ]
      const Article = Styled.div`
        transform: rotateY(90deg) rotateZ(-90deg);
        box-shadow: inset 0 0 0 2px hsla(0,0%,0%,.05);
        content: '';
        float: left;
        margin: 0 -${articleSize * 0.3333333}px;
        height: ${articleSize}px;
        width: ${articleSize}px;
        background-color: ${Color(this.props.muiTheme.palette.primary1Color).string()};
        background-image: url(${favicons[this.props.selectedRssFeed]});
        background-position: 90% 10%;
        background-size: 35px;
        background-repeat: no-repeat;
        opacity: ${articleIdx === 7 ? '1' : '0.15'};
        &:hover {
          cursor: pointer;
          opacity: 1;
        }
      `
      const PlaceholderText = Styled.p`
        padding: ${articleSize / 10}px;
        fontFamily: "blokk";
        color: ${this.props.muiTheme.palette.alternateTextColor}
        opacity: 0.5
      `

      return (
        <Article>
          <PlaceholderText>ih ihih hihihi hihi hiih ihih hihihi hihi</PlaceholderText>
        </Article>
      )
    }

    return (
      <Perspective>
        {generateArticle(0)}
        {generateArticle(1)}
        {generateArticle(2)}
        {generateArticle(3)}
        {generateArticle(4)}
        {generateArticle(5)}
        {generateArticle(6)}
        {generateArticle(7)}
      </Perspective>
    )
  },
}))
