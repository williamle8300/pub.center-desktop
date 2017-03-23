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
					<div style={{width: '50%', padding: '15vh 0 0'}}>
						<H1>Archiving the<br/>world&#39;s RSS data</H1>
						<p style={this.style3()}>We&#39;re a non-profit that archives RSS feeds.</p >
						<p style={this.style3()}>We believe the marketplace of ideas should be free and accessible. As such, we&#39;ve undertaken efforts to archive, and provide RSS content free-of-charge to the public.</p >
						<br/>
						<MUIRaisedButton label="Browse feeds" onTouchTap={() => window.location = "/feed"} secondary/>
					</div>
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
			    
					light: #f7f7f7
					dark: #e2e4e4
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
			backgroundImage: 'url(' + heroGraphic + '), linear-gradient(#f7f7f7, #e2e4e4)',
			backgroundPosition: 'right bottom',
			backgroundRepeat: 'no-repeat'
		}
	},
	style3: function () {
		return {
	    fontFamily: 'Helvetica',
	    lineHeight: '1.9rem',
	    fontSize: '1.3rem',
		}
	}
}))