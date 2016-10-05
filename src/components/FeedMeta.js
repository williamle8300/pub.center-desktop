var _ = require('lodash')
var React = require('react')
var Request = require('superagent')

var backend = require('../../config').backend


module.exports = React.createClass({
	propTypes: {
		jwt: React.PropTypes.string,
		user: React.PropTypes.object,
		_feed_: React.PropTypes.string.isRequired,
	},
	getInitialState: function () {
		return {
			feed: {},
			subscriptions: []
		}
	},
	render: function () {
		return (
			<div>
				<h2>
					<a href={this.state.feed.url}>{this.state.feed.name}</a>
				</h2>
				{
					this.props.jwt
					? this.subscribeButton()
					: <a href="#">Please login to subscribe</a>
				}
			</div>
		)
	},
	componentDidMount: function () {
		
		this.refreshFeed()
		this.refreshSubscriptions()
	},
	refreshFeed: function () {
		
		Request
		.get(backend+ '/feed/' +encodeURIComponent(this.props._feed_))
		.end((err, response) => {

			if (err) {
				throw err
			}
			
			this.setState({feed: response.body})
			return
		})
	},
	refreshSubscriptions: function () {
		
		Request
		.get(backend+ '/user/' +this.props.user.id+ '/subscriptions')
		.set({Authorization: 'Bearer ' +this.props.jwt})
		.end((err, response) => {
			
			if (err) {
				throw err
			}
			
			this.setState({subscriptions: response.body})
			return
		})
	},
	subscribeButton: function () {
		
		var existingSubscription = _.find(this.state.subscriptions, {feed: this.props._feed_})
		
		return existingSubscription
			? <button onClick={this.unsubscribe.bind(this, existingSubscription.id)}>Unsubscribe</button>
			: <button onClick={this.subscribe}>Subscribe</button>
	},
	subscribe: function () {
		
		Request
		.post(backend+ '/subscription')
		.set({Authorization: 'Bearer ' +this.props.jwt})
		.send({
			feed: this.props._feed_,
			user: this.props.user.id,
			config: [],
			isActive: true
		})
		.end((err, response) => {
			
			if (err) {
				throw err
			}
			
			this.refreshSubscriptions()
			return
		})
	},
	unsubscribe: function (_subscription_) {
		
		Request
		.delete(backend+ '/subscription/' +_subscription_)
		.set({Authorization: 'Bearer ' +this.props.jwt})
		.end((err, response) => {
			
			if (err) {
				throw err
			}
			
			this.refreshSubscriptions()
			return
		})
	}
})