var JwtDecode = require('jwt-decode')
var React = require('react')
var Request = require('superagent')
var Validator = require('validator')

import MUIRaisedButton from 'material-ui/RaisedButton'
import MUIFlatButton from 'material-ui/FlatButton';
import MUITextField from 'material-ui/TextField'

var env = require('../../env')

var H1 = require('./H1')


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
				<H1>Login</H1>
				<MUITextField
					type="text"
		      hintText={this.state.usernameOrEmail || 'noel'}
		      floatingLabelText="Username/Email"
		      floatingLabelFixed={true}
					onChange={this.onChangeUsernameOrEmail}/>
				<br/>
				<MUITextField
					type="password"
		      hintText={this.state.password || '•'.repeat(8)}
		      floatingLabelText="Password"
		      floatingLabelFixed={true}
					onChange={this.onChangePassword}/>
				<br/>
				<br/>
				<MUIRaisedButton onTouchTap={this.onSubmit} label="Submit"/>
				    
				<MUIFlatButton onTouchTap={this.props.toggleSigninMode} label="No account? Register" hoverColor="transparent"/>
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
		.post(env.backend+ '/jwt')
		.send(credentials)
		.end((err, response) => {

			var jwt
			
			if (err) throw err
			
			//plain-text
			jwt = response.text
			
			this.props.onJwt(jwt, () => {
				
				var _user_ = JwtDecode(jwt).id
				
				Request
				.get(env.backend+ '/user/' +_user_)
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
		
		return this.setState({usernameOrEmail: e.target.value})
	},
	onChangePassword: function (e) {
		
		return this.setState({password: e.target.value})
	}
})