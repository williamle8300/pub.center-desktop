var Request = require('superagent')
var React = require('react')

import MUIRaisedButton from 'material-ui/RaisedButton'
import MUIFlatButton from 'material-ui/FlatButton';
import MUITextField from 'material-ui/TextField'

var env = require('../../env')

var H1 = require('./H1')


module.exports = React.createClass({
	propTypes: {
		onJwt: React.PropTypes.func.isRequired,
		onUser: React.PropTypes.func.isRequired,
		toggleSigninMode: React.PropTypes.func.isRequired,
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
				<H1>Signup</H1>
				<MUITextField
					type="email"
		      hintText={this.state.email || 'noel@email.com'}
		      floatingLabelText="Email"
		      floatingLabelFixed={true}
					onChange={this.onChangeEmail}/>
				<br/>
				<MUITextField
					type="text"
		      hintText={this.state.username || 'noel'}
		      floatingLabelText="Username"
		      floatingLabelFixed={true}
					onChange={this.onChangeUsername}/>
				<br/>
				<MUITextField
					type="password"
		      hintText={this.state.password || '•'.repeat(8)}
		      floatingLabelText="Password"
		      floatingLabelFixed={true}
					onChange={this.onChangePassword}/>
				<br/>
				<br/>
				<MUIRaisedButton primary onTouchTap={this.onSubmit} label="Submit"/>
				    
				<MUIFlatButton onTouchTap={this.props.toggleSigninMode} label="Have an account? Login"/>
			</div>
		)
	},
	onSubmit: function () {
		
		Request
		.post(env.backend+ '/user')
		.send({
			user: {
				email: this.state.email,
				username: this.state.username,
				password: this.state.password
			}
		})
		.end((err, response) => {
			
			if (err) throw err
			
			this.props.onUser(response.body, () => {
				
				Request
				.post(env.backend+ '/jwt')
				.send({
					username: response.body.username,
					password: this.state.password
				})
				.end((err, response) => {
					
					if (err) {
						throw err
					}
					
					this.props.onJwt(response.text)
					return
				})
			})
		})
	},
	onChangeEmail: function (e) {
		
		return this.setState({email: e.target.value})
	},
	onChangeUsername: function (e) {
		
		return this.setState({username: e.target.value})
	},
	onChangePassword: function (e) {
		
		return this.setState({password: e.target.value})
	}
})