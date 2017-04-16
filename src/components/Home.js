var React = require('react')
var Router = require('react-router-component')
import Color from 'color'
var Link = Router.Link
import Styled from 'styled-components'

import MUIThemeable from 'material-ui/styles/muiThemeable'

import heroGraphicLarge from '../images/orb.png'
import heroGraphicSmall from '../images/orb-small.png'
import FactsBar from './FactsBar'
import FeatureList from './FeatureList'


module.exports = MUIThemeable()(React.createClass({
	propTypes: {
		width: React.PropTypes.number,
		height: React.PropTypes.number
	},
	getInitialState: function () {
		return {
			modalVisible: false,
		}
	},
  render: function () {

		const CallToAction = Styled(Link)`
			display: flex;
			justify-content: center;
			align-items: center;
			margin: ${this.props.width > 1000 ? '0' : '0 auto'};
			width: 164px;
			height: 45px;
			padding: 0.15rem;
			color: ${this.props.muiTheme.palette.alternateTextColor};
			font-family: ${this.props.muiTheme.fontFamily};
			font-size: 0.9rem;
			text-align: ${this.props.width > 1000 ? 'left' : 'center'};
			text-decoration: none;
			text-transform: uppercase;
			background: ${this.props.muiTheme.palette.primary1Color};
			cursor: pointer;
			&:hover {
				background: ${Color(this.props.muiTheme.palette.primary1Color).darken(0.15).string()};
			}
		`

    return (
			<div style={this.style1()}>
				<div style={this.style2()}>
					<div style={this.style12()}>
						<div style={{fontSize: this.props.width > 1000 ? '3rem' : '2rem', fontWeight: 'bold', fontFamily: '"Monda", sans-serif', textAlign: this.props.width > 1000 ? 'left' : 'center'}}>Archiving the<br/>world&#39;s RSS data</div>
						{/* <p style={this.style3()}>We&#39;re a non-profit that archives RSS feeds.</p> */}
						<p style={this.style3()}>We believe that the marketplace of ideas should be free and accessible, so we&#39;ve undertaken efforts to archive the world&#39;s RSS feeds and provide this data free-of-charge to the public</p>
						<br/>
						<CallToAction href="/feed">Browse Feeds</CallToAction>
						<p style={{display: this.props.width > 1000 ? 'block' : 'none', width: '50%', fontFamily: 'Helvetica', fontSize: '0.8rem', color: '#c1af99'}}>We don&#39;t log or sell user activity to anyone (advertisers, businesses, governments). We&#39;re 100% supported by our notifications delivery service</p>
					</div>
				</div>

				<FactsBar/>

				<FeatureList/>
			</div>
    )
  },
	style1: function () {
		return {
			overflow: 'auto',
		}
	},
	style2: function () {
		return {
			paddingRight: window.innerWidth/7,
			paddingLeft: window.innerWidth/7,
			paddingBottom: '10%',
			height: this.props.width > 1000 ? 'inherit' : '85vh',
			backgroundImage: this.props.width > 1000 ? 'url(' + heroGraphicLarge + ')' : 'none',
			backgroundColor: this.props.muiTheme.palette.canvasColor,
			backgroundPosition: 'right bottom',
			backgroundRepeat: 'no-repeat',
			backgroundSize: this.props.width > 1000 ? 'inherit' : '100%'
		}
	},
	style3: function () {
		return {
			fontFamily: 'Helvetica',
	    lineHeight: this.props.width > 1000 ? '1.7rem' : 'inherit',
	    fontSize: this.props.width > 1000 ? '1.3rem' : '1rem',
			textAlign: this.props.width > 1000 ? 'left' : 'center'
		}
	},
	style12: function () {
		return {
			width: this.props.width > 1000 ? '50%' : '100%',
			paddingTop: this.props.width > 1000 ? '15vh' : '23vh',
			paddingRight: this.props.width > 1000 ? this.props.muiTheme.spacing.desktopGutter : 0,
			paddingLeft: this.props.width > 1000 ? this.props.muiTheme.spacing.desktopGutter : 0,
			WebkitFontSmoothing: 'antialiased',
			MozOsxFontSmoothing: 'grayscale',
			color: this.props.muiTheme.palette.primary2Color,
		}
	}
}))
