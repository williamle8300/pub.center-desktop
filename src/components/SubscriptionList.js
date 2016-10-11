var Request = require('superagent')
var React = require('react')

var backend = require('../../config').backend

var Subscription = require('./Subscription')


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
							<Subscription
								key={subscription.id}
								jwt={this.props.jwt}
								user={this.props.user}
								subscription={subscription}
								onChange={this.readSubscriptions}/>
						)
					})
				}
			</tbody>
		)
	},
	componentDidMount: function () {
		
		this.readSubscriptions()
	},
	readSubscriptions: function () {
		
		Request
		.get(backend+ '/user/' +this.props.user.id+ '/subscriptions')
		.set({Authorization: 'Bearer ' +this.props.jwt})
		.end((err, response) => {
			
			if (err) throw err
			
			this.setState({subscriptions: response.body})
		})
	},
})

