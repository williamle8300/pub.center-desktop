var React = require('react')

var Main = require('./components/Main')
var Nav = require('./components/Nav')
var Footer = require('./components/Footer')

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