var React = require('react')

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

import heroGraphic from '../images/orb.png'
var H1 = require('./H1')
var Modal = require('./Modal')
import IconBuiding from '../images/icon-building.png'
import IconClock from '../images/icon-clock.png'
import IconDatabase from '../images/icon-database.png'
import IconDocument from '../images/icon-document.png'


module.exports = MUIThemeable()(React.createClass({
	getInitialState: function () {
		return {
			modalVisible: false,
		}
	},
  render: function () {
    return (
			<div style={this.style1()}>
			
				<div style={this.style2()}>
					<div style={{width: '50%', paddingTop: '15vh', paddingRight: this.props.muiTheme.spacing.desktopGutter, paddingLeft: this.props.muiTheme.spacing.desktopGutter, color: this.props.muiTheme.palette.textColor}}>
						<div style={{fontSize: '3rem'}}>Archiving the<br/>world&#39;s RSS data</div>
						<p style={this.style3()}>We&#39;re a non-profit that archives RSS feeds.</p>
						<p style={this.style3()}>We believe the marketplace of ideas should be free and accessible. As such, we&#39;ve undertaken efforts to archive and provide this data free-of-charge to the public.</p>
						<br/>
						<MUIRaisedButton label="Browse feeds" onTouchTap={() => window.location = "/feed"} secondary/>
					</div>
				</div>

				<div style={{ display: 'flex', height: '20%', backgroundColor: '#e2e4e4'}}>
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
						<div style={this.style6()}>Updated Daily</div>
					</div>
					<div style={Object.assign(this.style4(), {background: 'url('+ IconBuiding +') no-repeat -30px bottom'})}>
						<div style={this.style5()}>July 3, 2016</div>
						<div style={this.style6()}>Established</div>
					</div>
				</div>

				<div style={this.style10()}>
					<div style={this.style7()}>
						<MUIServerIcon style={this.style8()}/>
						<b style={this.style9()}>Free for All</b>
						Our data will always be free. Responses are lightning-fast, and served in the JSON format.
					</div>
					<div style={this.style7()}>
						<MUIShieldIcon style={this.style8()}/>
						<b style={this.style9()}>SSL/TLS</b>
						All connections are encrypted over HTTPS. Have the peace of mind that your activity on PubCenter will always be private.
					</div>
				</div>
				<div style={this.style10()}>
					<div style={this.style7()}>
						<MUIDialogIcon style={this.style8()}/>
						<b style={this.style9()}>Free Speech</b>
						We believe different opinions are a good thing, so we&#39;ll always defend the right of the press and free speech.
					</div>
					<div style={this.style7()}>
						<MUINotificationsIcon style={this.style8()}/>
						<b style={this.style9()}>Push Notifications</b>
						<div>
							If you would like to financially support us, consider using our push notifications services. See <span onTouchTap={() => this.setState({modalVisible: true})} style={{textDecoration: 'underline', cursor: 'pointer'}}>pricing</span>
							<this.PricingModal/>
						</div>
					</div>
				</div>
			</div>
    )
  },
	PricingModal: function () {
		return (
			<Modal isOpen={this.state.modalVisible} onClose={this.closeModal} actions={[<MUIRaisedButton onTouchTap={this.closeModal} label="Close"/>]} title="Pricing for Push Notifications">
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
			</Modal>
		)
	},
	closeModal: function () {
		
		this.setState({modalVisible: false})
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
			backgroundImage: 'url(' + heroGraphic + '), linear-gradient(#f3f3f3, #e2e4e4)',
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
			padding: this.props.muiTheme.spacing.desktopGutter * 2,
			textAlign: 'center',
			color: this.props.muiTheme.palette.textColor,
			borderRight: '1px solid #f3f3f3',
			borderLeft: '1px solid #f3f3f3',
			background: 'url('+ <MUIServerIcon/> +')'
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
			background: this.props.muiTheme.palette.primary3Color,
			color: '#f3f3f3',
			textAlign: 'center',
			border: '1px solid #f3f3f3'
		}
	},
	style8: function () {
		return {
			margin: '0 0 1rem',
			width: 48,
			height: 48,
			color: '#f3f3f3',
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
			display: 'flex',
			height: '40%'
		}
	},
}))