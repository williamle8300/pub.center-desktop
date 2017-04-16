//archivedon
//lastupdated

var _ = require('lodash')
var CopyToClipboard = require('react-copy-to-clipboard')
var Elapsed = require('elapsed')
var React = require('react')
var Request = require('superagent')

import MUIThemeable from 'material-ui/styles/muiThemeable'
import MUIAvatar from 'material-ui/Avatar'
import MUIRaisedButton from 'material-ui/RaisedButton'
import MUIPaper from 'material-ui/Paper'
import MUIRssIcon from 'material-ui/svg-icons/communication/rss-feed'
import MUICopyIcon from 'material-ui/svg-icons/content/content-paste'
import MUITable from 'material-ui/Table/Table'
import MUITableHeader from 'material-ui/Table/TableHeader'
import MUITableBody from 'material-ui/Table/TableBody'
import MUITableHeaderColumn from 'material-ui/Table/TableHeaderColumn'
import MUITableRow from 'material-ui/Table/TableRow'
import MUITableRowColumn from 'material-ui/Table/TableRowColumn'
import MUIToggle from 'material-ui/Toggle'

var RoundedAverage = require('../util/rounded-average')
var env = require('../../env')

var Modal = require('./Modal')
var Snackbar = require('./Snackbar')


module.exports = MUIThemeable()(React.createClass({
	propTypes: {
		width: React.PropTypes.number,
		height: React.PropTypes.number,
		jwt: React.PropTypes.string,
		user: React.PropTypes.object,
		_feed_: React.PropTypes.string.isRequired,
	},
	getInitialState: function () {
		return {
			feed: null,
			subscription: null,
			modalVisible: false,
			snacks: []
		}
	},
	render: function () {

		if (!this.state.feed) return null

		return (
			<MUIPaper zDepth={0} style={this.style3()}>
				<div style={this.style1()}>
					<div style={{display: 'flex', alignItems: 'center'}}>

						<MUIAvatar src={this.state.feed.favicon} style={{width: 48, height: 48, imageRendering: 'pixelated'}}/>
						<span style={{marginLeft: this.props.muiTheme.spacing.desktopGutter, fontSize: this.props.width > 1000 ? '2.75rem' : '1.75rem', fontWeight: 'bold'}}>{this.state.feed.name}</span>

					</div>
					<br/>
					{this.SubscribeButton()}
				</div>
				<div style={this.style2()}>
					{this.CopyButton()}
					<MUIRaisedButton onTouchTap={() => window.location = this.state.feed.url} label="RSS" icon={<MUIRssIcon/>} buttonStyle={{borderRadius: 0}} fullWidth/>
					<p><b>Articles/Day</b>: {RoundedAverage(this.state.feed.articlesPerMonth, 'count', 10)}</p>
					<p><b>Last checked</b>: {new Elapsed(new Date(this.state.feed.lastChecked), new Date()).optimal+ ' ago'}</p>
					<p><b>Archived</b>: {new Date(this.state.feed.archiveDate).toDateString()}</p>
				</div>
			</MUIPaper>
		)
	},
	componentDidMount: function () {

		this.readFeed()
	},
	componentDidUpdate: function (prevProps, prevState) {

		if (this.props.user && !this.state.subscription) {

			this.readSubscription()
		}
	},
	CopyButton: function () {

		var url = env.backend+ '/feed/' +this.state.feed.id+ '/articles'

		return (
			<div>
				<CopyToClipboard
					text={url}
					onCopy={() => {
						this.setState({
							snacks: this.state.snacks.concat({
								message: 'Copied',
								key: Date.now(),
								dismissAfter: 2000
							})
						})
					}}>
					<MUIRaisedButton label="API" icon={<MUICopyIcon/>} buttonStyle={{borderRadius: 0}} fullWidth/>
				</CopyToClipboard>
				<Snackbar
					snacks={this.state.snacks}
					onRemoveSnack={(key) => {

						this.setState({snacks: this.state.snacks.filter((snacks) => {
							return snacks.key !== key
						})})
					}}/>
			</div>
		)
	},
	SubscribeButton: function () {

		if (!this.props.user) {
			return (
				<div>
					please login to subscribe to this feed
				</div>
			)
		}

		if (this.state.subscription) {
			return (
				<div>
					<MUIRaisedButton label="Unsubscribe" onTouchTap={this.deleteSubscription}/>
					<Modal isOpen={this.state.modalVisible} onClose={this.closeModal}>
						<MUITable selectable={false}>
							<MUITableHeader displaySelectAll={false} adjustForCheckbox={false}>
								<MUITableRow>
									<MUITableHeaderColumn>
										<img src={this.state.feed.favicon} alt="favicon" style={{width: 24}}/>{this.state.feed.name}
									</MUITableHeaderColumn>
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
									<MUITableRowColumn>
										<MUIToggle
											toggled={this.state.subscription.isActive}
											onTouchTap={this.toggleActive.bind(this, this.state.subscription.id, this.state.subscription.isActive)}/>
									</MUITableRowColumn>
									<MUITableRowColumn>
										<MUIToggle
											toggled={_.includes(this.state.subscription.config, 'email')}
											onTouchTap={this.updateConfig.bind(this, this.state.subscription.id, this.state.subscription.config, 'email')}/>
									</MUITableRowColumn>
									<MUITableRowColumn>
										<MUIToggle
											toggled={_.includes(this.state.subscription.config, 'sms')}
											onTouchTap={this.updateConfig.bind(this, this.state.subscription.id, this.state.subscription.config, 'sms')}/>
									</MUITableRowColumn>
									<MUITableRowColumn>
										<MUIToggle
											toggled={_.includes(this.state.subscription.config, 'api')}
											onTouchTap={this.updateConfig.bind(this, this.state.subscription.id, this.state.subscription.config, 'api')}/>
									</MUITableRowColumn>
								</MUITableRow>
							</MUITableBody>
						</MUITable>
					</Modal>
				</div>
			)
		}

		else {
			return (
				<div>
					<MUIRaisedButton secondary label="Subscribe" onTouchTap={this.createSubscription}/>
				</div>
			)
		}
	},
	readFeed: function (callback) {

		Request
		.get(env.backend+ '/feed/' +encodeURIComponent(this.props._feed_))
		.end((err, response) => {

			if (err) throw err

			return this.setState({feed: response.body}, callback)
		})
	},
	createSubscription: function () {

		Request
		.post(env.backend+ '/subscription')
		.set({Authorization: 'Bearer ' +this.props.jwt})
		.send({
			subscription: {
				feed: this.props._feed_,
				user: this.props.user.id,
				config: [],
				isActive: true
			}
		})
		.end((err, response) => {

			if (err) throw err

			return this.setState({
				subscription: response.body,
				modalVisible: true,
			})
		})
	},
	readSubscription: function () {

		Request
		.get(env.backend+ '/subscription?_feed_=' +this.state.feed.id)
		.set({Authorization: 'Bearer ' +this.props.jwt})
		.end((err, response) => {

			if (err) throw err

			return this.setState({subscription: response.body})
		})
	},
	deleteSubscription: function () {

		Request
		.delete(env.backend+ '/subscription/' +this.state.subscription.id)
		.set({Authorization: 'Bearer ' +this.props.jwt})
		.end((err, response) => {

			if (err) throw err

			return this.setState({subscription: this.getInitialState().subscription})
		})
	},
	toggleActive: function (_subscription_, isActive) {

		Request
		.put(env.backend+ '/subscription/' +_subscription_+ '/is-active')
		.set({Authorization: 'Bearer ' +this.props.jwt})
		.send({isActive: !isActive})
		.end((err, response) => {

			if (err) throw err

			this.readSubscription()
			return
		})
	},
	updateConfig: function (_subscription_, config, key) {

		var newConfig = _.includes(config, key) ? _.pull(config, key) : config.concat(key)

		Request
		.put(env.backend+ '/subscription/' +_subscription_+ '/config')
		.set({Authorization: 'Bearer ' +this.props.jwt})
		.send({config: newConfig})
		.end((err, response) => {

			if (err) throw err

			this.readSubscription()
		})
	},
	closeModal: function () {

		return this.setState({modalVisible: false})
	},
	style1: function () {
		return {
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			padding: this.props.muiTheme.spacing.desktopGutter,
			width: this.props.width > 1000 ? '70%' : 'inherit',
			// background: this.props.muiTheme.palette.primary3Color
		}
	},
	style2: function () {
		return {
			padding: this.props.muiTheme.spacing.desktopGutter,
			width: this.props.width > 1000 ? '30%' : 'inherit',
			fontFamily: '"Monda", sans-serif',
		}
	},
	style3: function () {
		return {
			display: 'flex',
			flexDirection: this.props.width > 1000 ? 'row' : 'column',
			padding: this.props.width > 1000 ? this.props.muiTheme.spacing.desktopGutter : '0',
			color: this.props.muiTheme.palette.primary2Color,
		}
	}
}))
