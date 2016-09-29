var React = require('react')


module.exports = React.createClass({
	propTypes: {
		onJwt: React.PropTypes.func.isRequired,
		onUser: React.PropTypes.func.isRequired,
	},
  render: function () {
    return (
			<div>
	    	<h1>User</h1>
				<button onClick={this.deleteSession}>Delete Session</button>
			</div>
    )
  },
	deleteSession: function () {
		
		this.props.onJwt(null, () => {
			this.props.onUser(null, () => {
				
			})
		})
	}
})