var NotificationStack = require('react-notification').NotificationStack
var React = require('react')


module.exports = React.createClass({
	propTypes: {
		snacks: React.PropTypes.array.isRequired,
		onRemoveSnack: React.PropTypes.func.isRequired
	},
	render: function () {
		return (
			<NotificationStack
				notifications={this.props.snacks}
				onDismiss={(notification) => this.props.onRemoveSnack(notification.key)}/>
		)
	}
})