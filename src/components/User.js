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
				<button onClick={this.wipeSession}>Delete Session</button>
			</div>
    )
  },
	wipeSession: function () {
		
		this.props.onJwt(null, () => {
			this.props.onUser(null, () => {
				window.location = '/'
			})
		})
	}
})