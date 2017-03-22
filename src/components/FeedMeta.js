//archivedon
//lastupdated

var _ = require('lodash')
var CopyToClipboard = require('react-copy-to-clipboard')
var Elapsed = require('elapsed')
var React = require('react')
var Request = require('superagent')

import MUIThemeable from 'material-ui/styles/muiThemeable'
import MUIAvatar from 'material-ui/Avatar'
import MUIList from 'material-ui/List/List'
import MUIListItem from 'material-ui/List/ListItem'
import MUIRaisedButton from 'material-ui/RaisedButton'
import MUIRssFeedIcon from 'material-ui/svg-icons/communication/rss-feed'
import MUICopy from 'material-ui/svg-icons/content/content-paste'

var RoundedAverage = require('../util/rounded-average')
var env = require('../../env')

var Modal = require('./Modal')
var Snackbar = require('./Snackbar')

var Toggle = require('./Toggle')


module.exports = MUIThemeable()(React.createClass({
	propTypes: {
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
			<div style={{display: 'flex'}}>
				<div style={{padding: this.props.muiTheme.spacing.desktopGutter, width: '70%', background: this.props.muiTheme.palette.primary3Color, color: this.props.muiTheme.palette.alternateTextColor}}>
			
					<MUIList>
						<MUIListItem
							disabled
							leftAvatar={<MUIAvatar src={this.state.feed.favicon} style={{width: 48, height: 48, imageRendering: 'pixelated'}}/>}
							primaryText={<div>
								<h2 style={{color: this.props.muiTheme.palette.alternateTextColor}}>{this.state.feed.name}</h2>
							</div>}/>
						{this.SubscribeButton()}
						
					</MUIList>
				</div>
				<div style={{padding: this.props.muiTheme.spacing.desktopGutter, width: '30%', background: this.props.muiTheme.palette.primary3Color, color: this.props.muiTheme.palette.alternateTextColor}}>
					<MUIRaisedButton onTouchTap={() => window.location = this.state.feed.url} label="RSS" icon={<MUIRssFeedIcon/>}/>
					{this.CopyButton()}
					<p>Articles/Day: {RoundedAverage(this.state.feed.articlesPerMonth, 'count', 10)}</p>
					<p>Last checked: {new Elapsed(new Date(this.state.feed.lastChecked), new Date()).optimal+ ' ago'}</p>
					<p>Archived: {new Date(this.state.feed.archiveDate).toDateString()}</p>
				</div>
			</div>
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
			<span>
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
					<MUIRaisedButton label="JSON" icon={<MUICopy/>}/>
				</CopyToClipboard>
				<Snackbar
					snacks={this.state.snacks}
					onRemoveSnack={(key) => {
						
						this.setState({snacks: this.state.snacks.filter((snacks) => {
							return snacks.key !== key
						})})
					}}/>
			</span>
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
						<div onClick={(e) => e.stopPropagation()}>
							<button onClick={this.closeModal}>X</button>
							<div>
								<img src={this.state.feed.favicon} alt="favicon" width={24}/> 
								{this.state.feed.name}
								<div>
									isActive
									<Toggle
										checked={this.state.subscription.isActive}
										onChange={this.toggleActive.bind(this, this.state.subscription.id, this.state.subscription.isActive)}/>
									email
									<Toggle
										checked={_.includes(this.state.subscription.config, 'email')}
										onChange={this.updateConfig.bind(this, this.state.subscription.id, this.state.subscription.config, 'email')}/>
									sms
									<Toggle
										checked={_.includes(this.state.subscription.config, 'sms')}
										onChange={this.updateConfig.bind(this, this.state.subscription.id, this.state.subscription.config, 'sms')}/>
									api
									<Toggle
										checked={_.includes(this.state.subscription.config, 'api')}
										onChange={this.updateConfig.bind(this, this.state.subscription.id, this.state.subscription.config, 'api')}/>
								</div>
							</div>
						</div>
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
	}
}))