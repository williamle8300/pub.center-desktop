var React = require('react')

var Login = require('./Login')
var Register = require('./Register')
var Modal = require('./Modal')


module.exports = React.createClass({
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
			<div className="Signin">
				<a href="#" onClick={() => {return this.setState({modalVisible: true})}}>signin</a>
				<Modal isVisible={this.state.modalVisible} onClose={this.closeModal} style={{}}>
					<div onClick={(e) => e.stopPropagation()} style={{maxWidth: '50%'}}>
						<button onClick={this.closeModal}>X</button>
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
					</div>
				</Modal>
			</div>
		)
	},
	componentWillUpdate: function (newProps, newState) {
		
		if (newProps.jwt && newProps.user) {
			this.closeModal()
		} 
	},
	closeModal: function () {
		
		return this.setState({modalVisible: false})
	},
	toggleSigninMode: function () {
		
		if (this.state.loginOrRegisterMode === 'login') {
			return this.setState({loginOrRegisterMode: 'register'})
		}
		
		return this.setState({loginOrRegisterMode: 'login'})
	}
})