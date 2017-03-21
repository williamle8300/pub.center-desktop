var _ = require('lodash')
var React = require('react')
var Request = require('superagent')

import MUIRaisedButton from 'material-ui/RaisedButton'
import MUITextField from 'material-ui/TextField'

var env = require('../../env')

var CurrentUsage = require('./CurrentUsage')
var PushConfig = require('./PushConfig')

var H1 = require('./H1')
var Container = require('./Container')


module.exports = React.createClass({
	propTypes: {
		jwt: React.PropTypes.string.isRequired,
		user: React.PropTypes.object.isRequired,
		onJwt: React.PropTypes.func.isRequired,
		onUser: React.PropTypes.func.isRequired,
	},
	getInitialState: function () {
		return {
			email: '',
			username: '',
			password: ''
		}
	},
  render: function () {

		if (!this.props.user) return null
		
    return (
			<Container>
			
				<H1>Account</H1>
			
				<div>
					<h2>Information</h2>
					<Container>
						<MUITextField
				      hintText={this.props.user.email || 'noel@email.com'}
				      floatingLabelText="Email"
				      floatingLabelFixed={true}
							onChange={this.onChangeEmail}/>
						<br/>
						<MUITextField
				      hintText={this.props.user.username || 'noel'}
				      floatingLabelText="Username"
				      floatingLabelFixed={true}
							onChange={this.onChangeUsername}/>
						<br/>
						<MUITextField
				      hintText={'•'.repeat(8)}
				      floatingLabelText="Password"
				      floatingLabelFixed={true}
							onChange={this.onChangePassword}/>
						<br/>
					<MUIRaisedButton onTouchTap={this.updateUser} label="Update"/>
					</Container>
				</div>

				<CurrentUsage
					jwt={this.props.jwt}
					user={this.props.user}/>
					
				<h2>Subscriptions</h2>
				<PushConfig jwt={this.props.jwt} user={this.props.user} onUser={this.props.onUser}/>
				<h2>Logout</h2>
				<button onClick={this.wipeSession}>logout</button>
			</Container>
		)
  },
	onChangeEmail: function (e) {
		
		this.setState({email: e.target.value})
	},
	onChangeUsername: function (e) {
		
		this.setState({username: e.target.value})
	},
	onChangePassword: function (e) {
		
		this.setState({password: e.target.value})
	},
	updateUser: function () {
		
		var user = _.merge(this.props.user, {
			username: this.state.username || this.props.user.username,
			email: this.state.email || this.props.user.email,
			password: this.state.password || this.props.user.password
		})
			
		Request
		.put(env.backend+ '/user/' +this.props.user.id)
		.set({Authorization: 'Bearer ' +this.props.jwt})
		.send({user: user})
		.end((err, response) => {
			
			if (err) throw err
			
			this.props.onUser(response.body)
		})
	},
	wipeSession: function () {
		
		this.props.onJwt(null, () => {
			this.props.onUser(null, () => {
				window.location = '/'
			})
		})
	},
})