var React = require('react')
var Router = require('react-router-component')
import styled from 'styled-components'
var Link = Router.Link

import MUIThemeable from 'material-ui/styles/muiThemeable'
import MUIRaisedButton from 'material-ui/RaisedButton'
import MUICopyIcon from 'material-ui/svg-icons/content/content-paste'
import MUITable from 'material-ui/Table/Table'
import MUITableHeader from 'material-ui/Table/TableHeader'
import MUITableBody from 'material-ui/Table/TableBody'
import MUITableHeaderColumn from 'material-ui/Table/TableHeaderColumn'
import MUITableRow from 'material-ui/Table/TableRow'
import MUITableRowColumn from 'material-ui/Table/TableRowColumn'
import MUIServerIcon from 'material-ui/svg-icons/action/dns'
import MUIShieldIcon from 'material-ui/svg-icons/hardware/security'
import MUIDialogIcon from 'material-ui/svg-icons/communication/forum'
import MUINotificationsIcon from 'material-ui/svg-icons/social/notifications-active'

import heroGraphicLarge from '../images/orb.png'
import heroGraphicSmall from '../images/orb-small.png'
var H1 = require('./H1')
var Modal = require('./Modal')
import IconBuiding from '../images/icon-building.png'
import IconClock from '../images/icon-clock.png'
import IconDatabase from '../images/icon-database.png'
import IconDocument from '../images/icon-document.png'


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
    return (
			<div style={this.style1()}>
			
				<div style={this.style2()}>
					<div style={this.style12()}>
						<div style={{fontSize: this.props.width > 1000 ? '3rem' : '2rem', fontWeight: 'bold', textAlign: this.props.width > 1000 ? 'left' : 'center'}}>Archiving the<br/>world&#39;s RSS data</div>
						<p style={this.style3()}>We&#39;re a non-profit that archives RSS feeds.</p>
						<p style={this.style3()}>We believe the marketplace of ideas should be free and accessible, so we&#39;ve undertaken efforts to archive the world&#39;s RSS feeds and offer this data for free.</p>
						<br/>
						<Link href="/feed" style={this.style11()}>Browse Feeds</Link>
						<p style={{display: this.props.width > 1000 ? 'block' : 'none', width: '50%', fontFamily: 'Helvetica', fontSize: '0.8rem', color: '#aaa'}}>We don&#39;t log or sell user activity to anyone (advertisers, businesses, governments). We&#39;re 100% supported by our paid notifications delivery service</p>
					</div>
				</div>
			
				<div style={{display: this.props.width > 1000 ? 'flex' : 'none', height: '20%', backgroundColor: '#e2e4e4'}}>
					<div style={Object.assign(this.style4(), {background: 'url('+ IconDatabase +') no-repeat -84px 0px'})}>
						<div style={this.style5()}>1636</div>
						<div style={this.style6()}>Indexed RSS Feeds</div>
					</div>
					<div style={Object.assign(this.style4(), {background: 'url('+ IconDocument +') no-repeat -50px 10px'})}>
						<div style={this.style5()}>1,831,614</div>
						 <div style={this.style6()}>Saved articles</div>
					</div>
					<div style={Object.assign(this.style4(), {background: 'url('+ IconClock +') no-repeat -80px'})}>
						<div style={this.style5()}>4x</div>
						<div style={this.style6()}>Daily RSS polling</div>
					</div>
					<div style={Object.assign(this.style4(), {background: 'url('+ IconBuiding +') no-repeat -30px bottom'})}>
						<div style={this.style5()}>July 2016</div>
						<div style={this.style6()}>Established</div>
					</div>
				</div>

				<div style={this.style10()}>
					<div style={this.style7()}>
						<MUIServerIcon style={this.style8()}/>
						<b style={this.style9()}>Free for All</b>
						Our data will always be free. If you can&#39;t find your favorite RSS feed, just add it and we&#39;ll start archiving it. API response times are fast, and served in JSON.
					</div>
					<div style={this.style7()}>
						<MUIShieldIcon style={this.style8()}/>
						<b style={this.style9()}>SSL/TLS</b>
						All connections are encrypted over HTTPS. Your activity on PubCenter is private and secure.
					</div>
				</div>
				<div style={this.style10()}>
					<div style={this.style7()}>
						<MUIDialogIcon style={this.style8()}/>
						<b style={this.style9()}>Free Speech</b>
						We believe different opinions are a good thing, so we&#39;ll always defend the right of the press and free speech. We will host all sorts of RSS feeds here without imposing our own moral/political views.
					</div>
					<div style={this.style7()}>
						<MUINotificationsIcon style={this.style8()}/>
						<b style={this.style9()}>Push Notifications</b>
						<div>
							If you would like to financially support us, consider using our notifications delivery service. See <span onTouchTap={() => this.setState({modalVisible: true})} style={{textDecoration: 'underline', cursor: 'pointer'}}>pricing</span>
							<this.PricingModal/>
						</div>
					</div>
				</div>
			</div>
    )
  },
	PricingModal: function () {
		return (
			<Modal isOpen={this.state.modalVisible} onClose={this.closeModal} actions={[<MUIRaisedButton onTouchTap={this.closeModal} label="Close"/>]} title="Push Notifications Pricing">
				<div>
					<MUITable selectable={false}>
						<MUITableHeader displaySelectAll={false} adjustForCheckbox={false}>
							<MUITableRow>
								<MUITableHeaderColumn>
									Email
								</MUITableHeaderColumn>
								<MUITableHeaderColumn>
									SMS
								</MUITableHeaderColumn>
								<MUITableHeaderColumn>
									API
								</MUITableHeaderColumn>
							</MUITableRow>
						</MUITableHeader>
						<MUITableBody displayRowCheckbox={false}>
							<MUITableRow>
								<MUITableRowColumn>$0.001</MUITableRowColumn>
								<MUITableRowColumn>$0.05</MUITableRowColumn>
								<MUITableRowColumn>$0.0001</MUITableRowColumn>
							</MUITableRow>
						</MUITableBody>
					</MUITable>
					<small><sup>*</sup>You will be locked into your pricing when you sign-up, and always get the lower rate as prices fluctuate</small>
				</div>
			</Modal>
		)
	},
	closeModal: function () {
		
		this.setState({modalVisible: false})
	},
	style1: function () {
		return {
			// height: '100vh',
			// minHeight: 800,
			overflow: 'auto',
			// background: this.props.muiTheme.palette.primary2Color,
		}
	},
	style2: function () {
		return {
			padding: '0 ' +this.props.muiTheme.spacing.desktopGutter+ 'px 10% '	+this.props.muiTheme.spacing.desktopGutter+ 'px',
			height: this.props.width > 1000 ? 'inherit' : '85vh',
			backgroundImage: this.props.width > 1000 ? 'url(' + heroGraphicLarge + '), linear-gradient(#f9f9f9, #e2e4e4)' : 'url(' + heroGraphicSmall + '), linear-gradient(#e2e4e4, #f9f9f9)',
			backgroundPosition: 'right bottom',
			backgroundRepeat: 'no-repeat',
			backgroundSize: this.props.width > 1000 ? 'inherit' : '100%'
		}
	},
	style3: function () {
		return {
			fontFamily: 'Helvetica',
	    lineHeight: this.props.width > 1000 ? '1.9rem' : 'inherit',
	    fontSize: this.props.width > 1000 ? '1.3rem' : '1rem',
			textAlign: this.props.width > 1000 ? 'left' : 'center'
		}
	},
	style4: function () {
		return {
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			width: '25%',
			padding: this.props.muiTheme.spacing.desktopGutter * 2,
			textAlign: 'center',
			color: this.props.muiTheme.palette.textColor,
			// border: '1px solid rgb(208, 208, 208)',
			// borderLeft: '1px solid rgb(208, 208, 208)',
		}
	},
	style5: function () {
		return {
			fontSize: '1.75rem',
			fontWeight: 'bold',
		}
	},
	style6: function () {
		return {
			fontSize: '1.25rem'
		}
	},
	style7: function () {
		return {
			display: 'flex',
			flex: 1,
			flexDirection: 'column', 
			justifyContent: 'center',
			alignItems: 'center',
			padding: '4rem',
			background: '#d3d3d3',
			// background: this.props.muiTheme.palette.canvasColor,
			color: this.props.muiTheme.palette.textColor,
			textAlign: 'center',
			borderRight: '1px solid #ccc',
			borderBottom: '1px solid #ccc',
			// borderLeft: '1px solid #e2e4e4',
		}
	},
	style8: function () {
		return {
			margin: '0 0 1rem',
			width: 48,
			height: 48,
			color: this.props.muiTheme.palette.textColor,
		}
	},
	style9: function () {
		return {
			margin: '0.5rem 0',
			fontSize: '1.35rem'
		}
	},
	style10: function () {
		return {
			display: this.props.width > 1000 ? 'flex' : 'none',
			height: '40%'
		}
	},
	style11: function () {
		return {
	    display: 'flex',
	    justifyContent: 'center',
	    alignItems: 'center',
			margin: this.props.width > 1000 ? '0' : '0 auto',
			width: 164,
			height: 45,
	    padding: '0.15rem',
	    color: this.props.muiTheme.palette.alternateTextColor,
			fontFamily: this.props.muiTheme.fontFamily,
			fontSize: '0.9rem',
			textAlign: this.props.width > 1000 ? 'left' : 'center',
	    textDecoration: 'none',
			textTransform: 'uppercase',
			background: this.props.muiTheme.palette.primary1Color,
		}
	},
	style12: function () {
		return {
			width: this.props.width > 1000 ? '50%' : '100%',
			paddingTop: this.props.width > 1000 ? '15vh' : '23vh',
			paddingRight: this.props.width > 1000 ? this.props.muiTheme.spacing.desktopGutter : 0,
			paddingLeft: this.props.width > 1000 ? this.props.muiTheme.spacing.desktopGutter : 0,
			color: this.props.muiTheme.palette.textColor
		}
	}
}))