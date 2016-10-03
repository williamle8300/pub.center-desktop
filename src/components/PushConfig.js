var React = require('react')

var ToggleMain = require('./ToggleMain')
var UserSubscriptions = require('./UserSubscriptions')


module.exports = React.createClass({
	propTypes: {
		jwt: React.PropTypes.string,
		user: React.PropTypes.object,
		onUser: React.PropTypes.func.isRequired,
	},
	render: function () {
		return (
			<table style={{width: '100%', border: '1px solid black'}}>
				<tbody>
					<ToggleMain jwt={this.props.jwt} user={this.props.user} onUser={this.props.onUser}/>
					<UserSubscriptions/>
				</tbody>
			</table>
		)
	},
})