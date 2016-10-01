var _ = require('lodash')
var React = require('react')
var Request = require('superagent')

var config = require('../../config')

var PushConfig = require('./PushConfig')


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
				<div>
					<label>email</label>
					<input type="email" value={this.state.email} placeholder={this.props.user.email} onChange={this.onChangeEmail}/>
				</div>
				<div>
		    	<label>username</label>
					<input type="text" value={this.state.username} placeholder={this.props.user.username} onChange={this.onChangeUsername}/>
				</div>
				<div>
					<label>password</label>
					<input type="password" value={this.state.password} placeholder={'•'.repeat(8)} onChange={this.onChangePassword}/>
				</div>
				<button onClick={this.updateUser}>update</button>
				<h2>Invoices</h2>
				::invoices::
				<h2>Subscriptions</h2>
				<PushConfig jwt={this.props.jwt} user={this.props.user} onUser={this.props.onUser}/>
				<h2>Logout</h2>
				<button onClick={this.wipeSession}>logout</button>
			</div>
    )
  },
	// componentWillReceiveProps: function (newProps) {
	// 	// if (!newProps.jwt || !newProps.user) {
	// 	// 	window.location = '/'
	// 	// }
	// },
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
		.put(config.backend+ '/user/' +this.props.user.id)
		.set({Authorization: 'Bearer ' +this.props.jwt})
		.send(user)
		.end((err, response) => {
			
			if (response.status !== 200) {
				return alert(response.body.statusCode +': '+ response.body.message)
			}
			
			this.props.onUser(response.body)
		})
	},
	wipeSession: function () {
		
		this.props.onJwt(null, () => {
			this.props.onUser(null)
		})
	},
})