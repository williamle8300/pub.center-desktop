var React = require('react')

var ToggleMaster = require('./ToggleMaster')
var SubscriptionList = require('./SubscriptionList')


module.exports = React.createClass({
	propTypes: {
		jwt: React.PropTypes.string,
		user: React.PropTypes.object,
		onUser: React.PropTypes.func.isRequired,
	},
	render: function () {
		return (
			<table style={{width: '100%', border: '1px solid black'}}>
				<ToggleMaster jwt={this.props.jwt} user={this.props.user} onUser={this.props.onUser}/>
				<SubscriptionList jwt={this.props.jwt} user={this.props.user}/>
			</table>
		)
	},
})