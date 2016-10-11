var React = require('react')
var Request = require('superagent')

var backend = require('../../config').backend

var Modal = require('./Modal')


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
			modalVisible: false
		}
	},
	render: function () {
		
		if (!this.state.feed) return null
		
		return (
			<div>
				<h2>
					<a href={this.state.feed.url}>{this.state.feed.name}</a>
				</h2>
				{this.subscribeButton()}
				<this.SubscriptionModal/>
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
	subscribeButton: function () {
		
		if (!this.props.user) {
			return <button>please login to subscribe to this feed</button>
		}
		
		if (this.state.subscription) {
			return <button onClick={this.deleteSubscription}>Unsubscribe</button>
		}
		
		else {
			return <button onClick={this.createSubscription}>Subscribe</button>
		}
	},
	SubscriptionModal: function () {
			
		if (!this.state.subscription) return null
			
		return (
			<Modal isVisible={this.state.modalVisible} onClose={this.closeModal}>
				<div onClick={(e) => e.stopPropagation()} style={{maxWidth: '50%'}}>
					<button onClick={this.closeModal}>X</button>
					<div>
						<div>{this.state.subscription.id}</div>
					</div>
				</div>
			</Modal>
		)
	},
	createSubscription: function () {

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

			if (err) throw err

			this.setState({
				subscription: response.body,
				modalVisible: true,
			})
			return
		})
	},
	readFeed: function (callback) {

		Request
		.get(backend+ '/feed/' +encodeURIComponent(this.props._feed_))
		.end((err, response) => {

			if (err) throw err

			return this.setState({feed: response.body}, callback)
		})
	},
	readSubscription: function () {

		Request
		.get(backend+ '/subscription?_feed_=' +this.state.feed.id+ '&_user_=' +this.props.user.id)
		.set({Authorization: 'Bearer ' +this.props.jwt})
		.end((err, response) => {
			
			if (err) throw err

			this.setState({subscription: response.body})
			return
		})
	},
	deleteSubscription: function () {

		Request
		.delete(backend+ '/subscription/' +this.state.subscription.id)
		.set({Authorization: 'Bearer ' +this.props.jwt})
		.end((err, response) => {

			if (err) throw err

			this.setState({subscription: this.getInitialState().subscription})
			return
		})
	},
	closeModal: function () {

		this.setState({modalVisible: false})
	}
})