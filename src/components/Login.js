var JwtDecode = require('jwt-decode')
var React = require('react')
var Request = require('superagent')
var Validator = require('validator')

var backend = require('../../config').backend


module.exports = React.createClass({
	propTypes: {
		onJwt: React.PropTypes.func.isRequired,
		onUser: React.PropTypes.func.isRequired,
		toggleSigninMode: React.PropTypes.func.isRequired
	},
	getInitialState: function () {
		return {
			usernameOrEmail: '',
			password: '',
		}
	},
	render: function () {
		return (
			<div>
				<input type="text" value={this.state.usernameOrEmail} onChange={this.onChangeUsernameOrEmail} placeholder="email/username"/>
				<input type="password" value={this.state.password} onChange={this.onChangePassword} placeholder="password"/>
				<button onClick={this.onSubmit}>Submit</button>
				<button onClick={this.props.toggleSigninMode}>No account? Register</button>
			</div>
		)
	},
	onSubmit: function (e) {
		
		var credentials
			
		//using an email
		if (Validator.isEmail(this.state.usernameOrEmail)) {
			credentials = {
				email: this.state.usernameOrEmail,
				password: this.state.password
			}
		}
	
		//using an username
		else {
			credentials = {
				username: this.state.usernameOrEmail,
				password: this.state.password
			}
		}

		Request
		.post(backend+ '/jwt')
		.send(credentials)
		.end((err, response) => {

			var jwt
			
			if (err) throw err
			
			//plain-text
			jwt = response.text
			
			this.props.onJwt(jwt, () => {
				
				var _user_ = JwtDecode(jwt).id
				
				Request
				.get(backend+ '/user/' +_user_)
				.set({Authorization: 'Bearer ' +jwt})
				.end((err, response) => {
					
					if (err) {
						throw err
					}
					
					this.props.onUser(response.body)
					return
				})
			})
		})
	},
	onChangeUsernameOrEmail: function (e) {
		
		this.setState({usernameOrEmail: e.target.value})
	},
	onChangePassword: function (e) {
		
		this.setState({password: e.target.value})
	}
})