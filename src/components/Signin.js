var React = require('react')

var Login = require('./Login')
var Register = require('./Register')
var Modal = require('./Modal')


module.exports = React.createClass({
	propTypes: {
		onJwt: React.PropTypes.func,
		jwt: React.PropTypes.string,
		onUser: React.PropTypes.func,
		user: React.PropTypes.object,
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
				<a href="#" onClick={() => this.setState({modalVisible: true})}>signin</a>
				<Modal isVisible={this.state.modalVisible} onClose={this.closeModal} style={{}}>
					<div onClick={(e) => e.stopPropagation()} style={{maxWidth: '50%'}}>
						<button onClick={this.closeModal}>X</button>
						{
							this.state.loginOrRegisterMode === 'login'
							? <Login onJwt={this.props.onJwt} onUser={this.props.onUser} toggleSigninMode={this.toggleSigninMode}/>
							: <Register onJwt={this.props.onJwt} onUser={this.props.onUser} toggleSigninMode={this.toggleSigninMode}/>
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
		
		this.setState({modalVisible: false})
	},
	toggleSigninMode: function () {
		
		if (this.state.loginOrRegisterMode === 'login') {
			this.setState({loginOrRegisterMode: 'register'})
		}
		
		else this.setState({loginOrRegisterMode: 'login'})
	}
})
/*
	open modal:
		POST jwt => save to LS
			GET user (using jwt) => save to LS
*/