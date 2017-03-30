var React = require('react')
var Router = require('react-router-component')
var Link = Router.Link

import MUIThemeable from 'material-ui/styles/muiThemeable';

var H1 = require('./H1')
var Container = require('./Container')
var Login = require('./Login')
var Register = require('./Register')


module.exports = MUIThemeable()(React.createClass({
	propTypes: {
		jwt: React.PropTypes.string,
		user: React.PropTypes.object,
		onJwt: React.PropTypes.func.isRequired,
		onUser: React.PropTypes.func.isRequired,
	},
	getInitialState: function () {
		return {
			modalVisible: false,
			loginOrRegisterMode: 'login'
		}
	},
	render: function () {
		return (
			<Container>
				{
					this.state.loginOrRegisterMode === 'login'
					? <Login
						onJwt={this.props.onJwt}
						onUser={this.props.onUser}
						toggleSigninMode={this.toggleSigninMode}/>
					: <Register
						onJwt={this.props.onJwt}
						onUser={this.props.onUser}
						toggleSigninMode={this.toggleSigninMode}/>
				}
			</Container>
		)
	},
	componentWillUpdate: function (newProps, newState) {
		
		if (newProps.jwt && newProps.user) {
			window.location = '/user'
		} 
	},
	toggleSigninMode: function () {
		
		if (this.state.loginOrRegisterMode === 'login') {
			return this.setState({loginOrRegisterMode: 'register'})
		}
		
		return this.setState({loginOrRegisterMode: 'login'})
	}
}))