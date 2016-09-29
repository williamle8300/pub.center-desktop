var Request = require('superagent')
var React = require('react')

var config = require('../../config')


module.exports = React.createClass({
	propTypes: {
		onJwt: React.PropTypes.func,
		onUser: React.PropTypes.func,
		toggleSigninMode: React.PropTypes.func.isRequired
	},
	getInitialState: function () {
		return {
			email: '',
			username: '',
			password: '',
		}
	},
	render: function () {
		return (
			<div>
				<input type="email" value={this.state.email} onChange={this.onChangeEmail} placeholder="email"/>
				<input type="text" value={this.state.username} onChange={this.onChangeUsername} placeholder="username"/>
				<input type="password" value={this.state.password} onChange={this.onChangePassword} placeholder="password"/>
				<button onClick={this.onSubmit}>Submit</button>
				<button onClick={this.props.toggleSigninMode}>Have an account? Login</button>
			</div>
		)
	},
	onSubmit: function () {
		
		Request
		.post(config.backend+ '/user')
		.send({
			email: this.state.email,
			username: this.state.username,
			password: this.state.password
		})
		.end((err, response) => {
			
			if (err) {
				throw err
			}
			
			this.props.onUser(response.body, () => {
				
				Request
				.post(config.backend+ '/jwt')
				.send({
					username: response.body.username,
					password: this.state.password
				})
				.end((err, response) => {
					
					if (err) {
						throw err
					}
					
					this.props.onJwt(response.text)
				})
			})
		})
	},
	onChangeEmail: function (e) {
		
		this.setState({email: e.target.value})
	},
	onChangeUsername: function (e) {
		
		this.setState({username: e.target.value})
	},
	onChangePassword: function (e) {
		
		this.setState({password: e.target.value})
	}
})