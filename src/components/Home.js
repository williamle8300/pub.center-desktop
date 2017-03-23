var React = require('react')

import MUIThemeable from 'material-ui/styles/muiThemeable'
import MUIRaisedButton from 'material-ui/RaisedButton'

import heroGraphic from '../images/orb.png'
var H1 = require('./H1')


module.exports = MUIThemeable()(React.createClass({
  render: function () {
    return (
			<div style={this.style1()}>
				<div style={this.style2()}>
					<H1>Archiving the world&#39;s RSS data</H1>
					Archiving the world\''s RSS data PubCenter is a non-profit specializing in archiving news data from around the world. We believe in the marketplace of ideas, and are helping to ensure that we archive •••. To support our mission, please consider using our notifications delivery service •pricing•. Access to our archives (via REST or Online) will <u>always</u> be free with no rate limiting!
					<MUIRaisedButton label="Browse feeds" onTouchTap={() => window.location = "/feed"} secondary/>
				</div>

				<div style={{padding: this.props.muiTheme.spacing.desktopGutter, height: '20%'}}>
					1636 feeds
					1,831,614 articles
					Updated 4x/day
					Archiving since July 2016
					samplenewsfeedsicons(8)
				</div>
				<div style={{padding: this.props.muiTheme.spacing.desktopGutter, height: '40%'}}>
			
					REST
					always free, programmatic
			
					PUSH NOTIFICATIONS
					subscribe and never miss new content from your favorite blog
					email/sms/api (include pricing in ;modal)
			    
					
				</div>
			</div>
    )
  },
	style1: function () {
		return {
			height: '100vh',
			// background: this.props.muiTheme.palette.primary2Color,
		}
	},
	style2: function () {
		return {
			padding: this.props.muiTheme.spacing.desktopGutter,
			height: '80%',
			background: 'url(' + heroGraphic + ')',
			backgroundPosition: 'right bottom',
			backgroundRepeat: 'no-repeat'
		}
	}
}))