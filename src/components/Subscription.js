var env = require('../../env')

var Toggle = require('./Toggle')

var _ = require('lodash')
var Link = require('react-router-component').Link
var Request = require('superagent')
var React = require('react')
var VisibilitySensor = require('react-visibility-sensor')


module.exports = React.createClass({
	propTypes: {
		jwt: React.PropTypes.string,
		user: React.PropTypes.object,
		subscription: React.PropTypes.object.isRequired,
		onChange: React.PropTypes.func.isRequired
	},
	getInitialState: function () {
		return {
			feed: null
		}
	},
	render: function () {
		return (
			<VisibilitySensor onChange={this.readFeed}>
				<tr>
				  <td style={styleA()}>
						<this.FeedMeta/>
						<Toggle
							checked={this.props.subscription.isActive}
							onChange={this.toggleActive.bind(this, this.props.subscription.id, this.props.subscription.isActive)}/>
						<button onClick={this.deleteSubscription.bind(this, this.props.subscription.id)}>unsubscribe</button>
					</td>
					<td style={styleA()}>
						<Toggle
							checked={_.includes(this.props.subscription.config, 'email')}
							onChange={this.updateConfig.bind(this, this.props.subscription.id, this.props.subscription.config, 'email')}/>
					</td>
					<td style={styleA()}>
						<Toggle
							checked={_.includes(this.props.subscription.config, 'sms')}
							onChange={this.updateConfig.bind(this, this.props.subscription.id, this.props.subscription.config, 'sms')}/>
					</td>
					<td style={styleA()}>
						<Toggle
							checked={_.includes(this.props.subscription.config, 'api')}
							onChange={this.updateConfig.bind(this, this.props.subscription.id, this.props.subscription.config, 'api')}/>
					</td>
				</tr>
			</VisibilitySensor>
		)
	},
	FeedMeta: function () {
		
		if (this.state.feed) {
			return (
				<div>
					<img src={this.state.feed.favicon} alt="favicon" width={24}/>
					<Link href={'/feed/' +this.props.subscription.feed}>{this.state.feed.name}</Link>
				</div>
			)
		}
		
		else return null
	},
	toggleActive: function (_subscription_, isActive) {
		
		Request
		.put(env.backend+ '/subscription/' +_subscription_+ '/is-active')
		.set({Authorization: 'Bearer ' +this.props.jwt})
		.send({isActive: !isActive})
		.end((err, response) => {
			
			if (err) throw err
			
			this.props.onChange()
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
			
			this.props.onChange()
			return
		})
	},
	readFeed: function (isOpen) {
		
		if (isOpen && !this.state.feed) {
			
			Request
			.get(env.backend+ '/feed/' +this.props.subscription.feed)
			.set({Authorization: 'Bearer ' +this.props.jwt})
			.end((err, response) => {
			
				if (err) throw err
			
				return this.setState({feed: response.body})
			})
		}
	},
	deleteSubscription: function (_subscription_) {
		
		Request
		.delete(env.backend+ '/subscription/' +_subscription_)
		.set({Authorization: 'Bearer ' +this.props.jwt})
		.end((err, response) => {
			
			if (err) throw err
			
			this.props.onChange()
			return
		})
	}
})

function styleA() {
	return {
		// display: 'flex'
		textAlign: 'center',
		// border: '1px solid black'
	}
}