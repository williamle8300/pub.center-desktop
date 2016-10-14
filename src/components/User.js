var _ = require('lodash')
var React = require('react')
var Request = require('superagent')

var backend = require('../../config').backend

var CurrentUsage = require('./CurrentUsage')
var PushConfig = require('./PushConfig')


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
			password: '',
			invoices: [],
		}
	},
  render: function () {
		
		if (!this.props.user) return null
		
    return (
			<div>
				<h1>User</h1>
				<h2>Information</h2>
				<div>
					<label>email</label>
					<input
						type="email"
						placeholder={this.props.user.email || 'email'}
						value={this.state.email}
						onChange={this.onChangeEmail}/>
				</div>
				<div>
		    	<label>username</label>
					<input
						type="text"
						placeholder={this.props.user.username || 'username'}
						value={this.state.username}
						onChange={this.onChangeUsername}/>
				</div>
				<div>
					<label>password</label>
					<input
						type="password"
						placeholder={'•'.repeat(8)}
						value={this.state.password}
						onChange={this.onChangePassword}/>
				</div>
				<button onClick={this.updateUser}>update</button>
				<CurrentUsage invoices={this.state.invoices} jwt={this.props.jwt} user={this.props.user}/>
				<h2>Subscriptions</h2>
				<PushConfig jwt={this.props.jwt} user={this.props.user} onUser={this.props.onUser}/>
				<h2>Logout</h2>
				<button onClick={this.wipeSession}>logout</button>
			</div>
		)
  },
	componentDidMount: function () {

		Request
		.get(backend+ '/user/' +this.props.user.id+ '/invoices')
		.set({Authorization: 'Bearer ' +this.props.jwt})
		.end((err, response) => {
			
			if (err) throw err
			
			return this.setState({invoices: response.body})
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
	},
	updateUser: function () {
		
		var user = _.merge(this.props.user, {
			username: this.state.username || this.props.user.username,
			email: this.state.email || this.props.user.email,
			password: this.state.password || this.props.user.password
		})
			
		Request
		.put(backend+ '/user/' +this.props.user.id)
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