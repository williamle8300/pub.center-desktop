var _ = require('lodash')
var React = require('react')
var Request = require('superagent')

var config = require('../../config')


module.exports = React.createClass({
	propTypes: {
		jwt: React.PropTypes.string,
		user: React.PropTypes.object,
		onJwt: React.PropTypes.func.isRequired,
		onUser: React.PropTypes.func.isRequired,
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
				<h1>User</h1>
				<h2>Information</h2>
				<label>email</label><input type="email" value={this.state.email} placeholder={this.props.user.email} onChange={this.onChangeEmail}/>
	    	<label>username</label><input type="text" value={this.state.username} placeholder={this.props.user.username} onChange={this.onChangeUsername}/>
				<label>password</label><input type="password" value={this.state.password} placeholder={'•'.repeat(8)} onChange={this.onChangePassword}/>
				<button onClick={this.updateUser}>update</button>
				<h2>Logout</h2>
				<button onClick={this.wipeSession}>logout</button>
			</div>
    )
  },
	componentWillReceiveProps: function (newProps) {

		if (!newProps.jwt || !newProps.user) {
			window.location = '/'
		} 
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
			
		// console.log(1, updatedUser);

		Request
		.put(config.backend+ '/user/' +this.props.user.id)
		.send(user)
		.end((err, response) => {
			
			if (response.status !== 200) {
				return alert(response.body.statusCode +': '+ response.body.message)
			}
			
			console.log(1, response.body);
		})
	},
	wipeSession: function () {
		
		this.props.onJwt(null, () => {
			this.props.onUser(null)
		})
	},
})