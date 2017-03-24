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
					<div style={{width: '50%', paddingTop: '15vh', paddingRight: this.props.muiTheme.spacing.desktopGutter, paddingLeft: this.props.muiTheme.spacing.desktopGutter, color: this.props.muiTheme.palette.textColor}}>
						<div style={{fontSize: '3rem'}}>Archiving the<br/>world&#39;s RSS data</div>
						<p style={this.style3()}>We&#39;re a non-profit that archives RSS feeds.</p>
						<p style={this.style3()}>We believe the marketplace of ideas should be free and accessible. As such, we&#39;ve undertaken efforts to archive and provide all of our RSS data free-of-charge to the public.</p>
						<br/>
						<MUIRaisedButton label="Browse feeds" onTouchTap={() => window.location = "/feed"} secondary/>
					</div>
				</div>

				<div style={{display: 'flex', padding: this.props.muiTheme.spacing.desktopGutter, height: '20%', backgroundColor: '#e2e4e4', border: '1px solid white'}}>
					<div style={this.style4()}>
						<div style={this.style5()}>1636</div>
						<div style={this.style6()}>Index Feeds</div>
					</div>
					<div style={this.style4()}>
						<div style={this.style5()}>1,831,614</div>
						 <div style={this.style6()}>Cached articles</div>
					</div>
					<div style={this.style4()}>
						<div style={this.style5()}>4x</div>
						<div style={this.style6()}>Updated Daily</div>
					</div>
					<div style={this.style4()}>
						<div style={this.style5()}>July 3, 2016</div>
						<div style={this.style6()}>Archiving Since</div>
					</div>
				</div>
				<div style={{display: 'flex', padding: this.props.muiTheme.spacing.desktopGutter, height: '40%'}}>
				
					<div style={this.style7()}>
						REST API
						free, no rate limiting.
					</div>
					<div style={this.style7()}>
						TLS/HTTPS
						All connections are encrypted and secure
					</div>
					<div style={this.style7()}>
						NEUTRAL
						We take a "hands-off" approach to free speech. Our job is to archive RSS data, not make determinations about morality
					</div>
					<div style={this.style7()}>
						PUSH NOTIFICATIONS
						To support our mission, please consider using our notifications delivery service. [[pricingmodal]]
					</div>
			
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
			minHeight: 800
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
	},
	style4: function () {
		return {
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			width: '25%',
			padding: this.props.muiTheme.spacing.desktopGutter,
			textAlign: 'center',
			color: this.props.muiTheme.palette.textColor,
			borderLeft: '1px solid white',
			borderRight: '1px solid white'
		}
	},
	style5: function () {
		return {
			fontSize: '2rem',
			fontWeight: 'bold',
		}
	},
	style6: function () {
		return {
			fontSize: '1.5rem'
		}
	},
	style7: function () {
		return {
			width: '50%'
		}
	}
}))