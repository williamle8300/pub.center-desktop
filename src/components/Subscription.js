var _ = require('lodash')
var Link = require('react-router-component').Link
var Request = require('superagent')
var React = require('react')

var backend = require('../../config').backend

var Toggle = require('./Toggle')


module.exports = React.createClass({
	propTypes: {
		jwt: React.PropTypes.string,
		user: React.PropTypes.object,
		subscription: React.PropTypes.object.isRequired,
		refreshSubscriptions: React.PropTypes.func.isRequired
	},
	render: function () {
		return (
			<tr>
			  <td style={styleA()}>
					<img src={this.props.subscription.favicon} alt={this.props.subscription.favicon} width={24}/>
					<Link href={'/feed/' +this.props.subscription.feed}>{this.props.subscription.name}</Link>
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
		)
	},
	toggleActive: function (_subscription_, isActive) {
		
		Request
		.put(backend+ '/subscription/' +_subscription_+ '/is-active')
		.set({Authorization: 'Bearer ' +this.props.jwt})
		.send({isActive: !isActive})
		.end((err, response) => {
			
			if (err) {
				throw err
			}
			
			this.props.refreshSubscriptions()
		})
	},
	updateConfig: function (_subscription_, config, key) {
		
		var newConfig = _.includes(config, key) ? _.pull(config, key) : config.concat(key)
				
		Request
		.put(backend+ '/subscription/' +_subscription_+ '/config')
		.set({Authorization: 'Bearer ' +this.props.jwt})
		.send({config: newConfig})
		.end((err, response) => {
			
			if (err) {
				throw err
			}
			
			this.props.refreshSubscriptions()
		})
	},
	deleteSubscription: function (_subscription_) {
		
		Request
		.delete(backend+ '/subscription/' +_subscription_)
		.set({Authorization: 'Bearer ' +this.props.jwt})
		.end((err, response) => {
			
			if (err) {
				throw err
			}
			
			this.props.refreshSubscriptions()
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