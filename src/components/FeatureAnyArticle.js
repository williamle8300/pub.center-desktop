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


module.exports = MUIThemeable()(React.createClass({
  propTypes: {
    selectedRssFeed: React.PropTypes.number.isRequired,
  },
  _articleSize: 168,
  render: function () {
    // {this._feeds[this.props.selectedRssFeed]}
    return (
      <div style={{display: 'flex', padding: '6rem 0'}}>
        {this.createArticleTile(this._articleSize)}
        <div style={{width: '100%'}}>
          <h1 style={{fontFamily: '"Monda", sans-serif'}}>Find any article, any time</h1>
          <p>Once we begin archiving a RSS feed, you can search through our archives and pick any article you want. Or you can just get a complete history of the RSS feed. Our powerful REST API facilitates app development, and big data use cases.</p>
        </div>
      </div>
    )
  },
  createArticleTile: function (articleSize) {

    const Perspective = Styled.div`
      position: relative;
      margin: 0 auto;
      padding: 2rem;
      display: flex;
      alignItems: center;
      justifyContent: center;
      width: 100%;
      height: ${articleSize}px;
      transform: rotateX(75deg) rotateZ(39deg);
      transform-style: preserve-3d;
    `
    const generateArticle = (articleIdx) => {

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
        opacity: 0.5;
        line-height: 0.75rem;
        letter-spacing: -4px;
      `

      return (
        <Article>
          <PlaceholderText>ih ihih hihi hihiiiii hiih ihih hihihi hihi ih ihih hihihi hihi hiih ihih hihihi hihi ih ihih hihihi hihihi hihi ih ihih hihihi hihihi hihi ih ihih hihihi</PlaceholderText>
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
