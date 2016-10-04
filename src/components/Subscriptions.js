var _ = require('lodash')
var Request = require('superagent')
var React = require('react')

var backend = require('../../config').backend

var Toggle = require('./Toggle')


module.exports = React.createClass({
	propTypes: {
		jwt: React.PropTypes.string,
		user: React.PropTypes.object,
	},
	getInitialState: function () {
		return {
			subscriptions: []
		}
	},
	render: function () {
		return (
			<tbody>
				{
					this.state.subscriptions.map((subscription) => {
						return (
						  <tr key={subscription.id}>
						    <td style={styleA()}>
									<img src={subscription.favicon} alt={subscription.favicon}/>
									{subscription.name}
									<Toggle
										checked={subscription.isActive}
										onChange={this.toggleActive.bind(this, subscription.id, subscription.isActive)}/>
								</td>
								<td style={styleA()}>
									<Toggle
										checked={_.includes(subscription.config, 'email')}
										onChange={this.updateConfig.bind(this, subscription.id, subscription.config, 'email')}/>
								</td>
								<td style={styleA()}>
									<Toggle
										checked={_.includes(subscription.config, 'sms')}
										onChange={this.updateConfig.bind(this, subscription.id, subscription.config, 'sms')}/>
								</td>
								<td style={styleA()}>
									<Toggle
										checked={_.includes(subscription.config, 'api')}
										onChange={this.updateConfig.bind(this, subscription.id, subscription.config, 'api')}/>
								</td>
						  </tr>
						)
					})
				}
			</tbody>
		)
	},
	componentDidMount: function () {
		
		this.updateSubscriptions()
	},
	updateSubscriptions: function () {
		
		Request
		.get(backend+ '/user/' +this.props.user.id+ '/subscriptions')
		.set({Authorization: 'Bearer ' +this.props.jwt})
		.end((err, response) => {
			
			if (err) {
				throw err
			}
			
			this.setState({subscriptions: response.body})
		})
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
			
			this.updateSubscriptions()
		})
	},
	updateConfig: function (_subscription_, config, key) {
		
		var newConfig = _.includes(config, key) ? _.pull(config, key) : config.concat(key)
		
		console.log(newConfig);
		
		Request
		.put(backend+ '/subscription/' +_subscription_+ '/config')
		.set({Authorization: 'Bearer ' +this.props.jwt})
		.send({config: newConfig})
		.end((err, response) => {
			
			if (err) {
				throw err
			}
			
			this.updateSubscriptions()
		})
	}
})

function styleA() {
	return {
		// display: 'flex'
		textAlign: 'center'
	}
}