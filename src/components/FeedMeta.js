//archivedon
//lastupdated

var _ = require('lodash')
var CopyToClipboard = require('react-copy-to-clipboard')
var Elapsed = require('elapsed')
var React = require('react')
var Request = require('superagent')

var RoundedAverage = require('../util/rounded-average')
var env = require('../../env')

var Modal = require('./Modal')
var Toggle = require('./Toggle')
var Snackbar = require('./Snackbar')


module.exports = React.createClass({
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
			<div>
				<h2>
					<img src={this.state.feed.favicon} alt="favicon" width={24}/> 
					<a href={this.state.feed.url}>{this.state.feed.name}</a>
					{this.CopyToClipboard()}
				</h2>
				<p>Archived: {new Date(this.state.feed.archiveDate).toDateString()}</p>
				<p>Articles per day: {RoundedAverage(this.state.feed.articlesPerMonth, 'count', 10)}</p>
				<p>Last checked: {new Elapsed(new Date(this.state.feed.lastChecked), new Date()).optimal+ ' ago'}</p>
				{this.SubscribeButton()}
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
	CopyToClipboard: function () {
		
		var url = env.backend+ '/feed/' +this.state.feed.id+ '/articles'
		
		return (
			<div>
				<input value={url} readOnly/>
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
					<button>copy</button>
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
					<button onClick={this.deleteSubscription}>Unsubscribe</button>
					<Modal isVisible={this.state.modalVisible} onClose={this.closeModal}>
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
					<button onClick={this.createSubscription}>Subscribe</button>
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
		.get(env.backend+ '/subscription?_feed_=' +this.state.feed.id+ '&_user_=' +this.props.user.id)
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
})