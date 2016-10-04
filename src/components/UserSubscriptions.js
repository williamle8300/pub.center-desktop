var _ = require('lodash')
var Request = require('superagent')
var React = require('react')

var config = require('../../config')

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
										checked={_.includes(subscription.config, 'email')}/>
								</td>
								<td style={styleA()}>
									<Toggle
										checked={_.includes(subscription.config, 'sms')}/>
								</td>
								<td style={styleA()}>
									<Toggle
										checked={_.includes(subscription.config, 'api')}/>
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
		.get(config.backend+ '/user/' +this.props.user.id+ '/subscriptions')
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
		.put(config.backend+ '/subscription/' +_subscription_+ '/is-active')
		.send({isActive: !isActive})
		.set({Authorization: 'Bearer ' +this.props.jwt})
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