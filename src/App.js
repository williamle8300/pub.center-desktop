var JwtDecode = require('jwt-decode')
var Request = require('superagent')
var React = require('react')

var Main = require('./components/Main')
var Nav = require('./components/Nav')
var Footer = require('./components/Footer')

var config = require('../config')


module.exports = React.createClass({
	getInitialState: function () {
		return {
			jwt: localStorage.jwt ? JSON.parse(localStorage.jwt) : null,
			user: localStorage.user ? JSON.parse(localStorage.user) : null
		}
	},
  render: function () {
    return (
			<div className="App" style={styleA()}>
				<Nav
					onJwt={this.onJwt}
					jwt={this.state.jwt}
					onUser={this.onUser}
					user={this.state.user}/>
				<Main
					jwt={this.state.jwt}
					user={this.state.user}
					onJwt={this.onJwt}
					onUser={this.onUser}/>
				<Footer/>
			</div>
    )
  },
	componentDidMount: function () {
		
		/*
			if there's a jwt
			get the freshest copy of
			User,
			cache in LocalStorage,
			then propogate to Views
		*/
		
		var _user_
		
		if (this.state.jwt) {
			
			_user_ = JwtDecode(this.state.jwt).id

			Request
			.get(config.backend+ '/user/' +_user_)
			.set({Authorization: 'Bearer ' +this.state.jwt})
			.end((err, response) => {
			
				if (err) {
					throw err
				}
			
				this.onUser(response.body)
				return
			})
		}
	},
	onJwt: function (jwt, callback) {
		
		localStorage.jwt = JSON.stringify(jwt)
		
		this.setState({jwt: jwt}, callback)
	},
	onUser: function (user, callback) {
		
		localStorage.user = JSON.stringify(user)
		
		this.setState({user: user}, callback)
	}
})

function styleA() {
	return {
		margin: '0 auto',
		width: '50%',
		fontFamily: 'Helvetica'
	}
}