var Request = require('superagent')
var React = require('react')

var config = require('../../config')

var Modal = require('./Modal')
var Toggle = require('./Toggle')


module.exports = React.createClass({
	propTypes: {
		jwt: React.PropTypes.string,
		user: React.PropTypes.object,
		onUser: React.PropTypes.func.isRequired,
	},
	getInitialState: function () {
		return {
			address: '',
			modalVisible: false
		}
	},
	render: function () {
		return (
			<th>
				Email
				<button onClick={() => {this.setState({modalVisible: true})}}>
					settings
				</button>
				<Modal isVisible={this.state.modalVisible} onClose={this.closeModal}>
					<div onClick={(e) => e.stopPropagation()} style={{maxWidth: '50%'}}>
						<button onClick={this.closeModal}>X</button>
						<input
							type="email"
							value={this.state.address}
							placeholder={this.props.user.pushConfig.channelConfig.email.address || 'email@address.xyz'}
							onChange={this.onChangeEmail}/>
						<button onClick={this.update}>Submit</button>
					</div>
				</Modal>
				<Toggle
					disabled={!this.props.user.pushConfig.channelConfig.email.address ? true : false}
				  checked={this.props.user.pushConfig.channelConfig.email.isActive && this.props.user.pushConfig.channelConfig.email.address ? true : false}
				  onChange={this.toggle} />
			</th>
		)
	},
	closeModal: function () {
		
		this.setState({modalVisible: false})
	},
	onChangeEmail: function (e) {
		
		this.setState({address: e.target.value})
	},
	toggle: function () {

		Request
		.put(config.backend+ '/user/' +this.props.user.id+ '/push-config/channel-config/email/is-active')
		.set({Authorization: 'Bearer ' +this.props.jwt})
		.send({isActive: !this.props.user.pushConfig.channelConfig.email.isActive})
		.end((err, response) => {
			
			if (response.status !== 200) {
				return alert(response.body.statusCode +': '+ response.body.message)
			}
			
			this.props.onUser(response.body)
			return
		})
	},
	update: function () {
		
		var email = {
			address: this.state.address,
			isActive: this.state.address && this.props.user.pushConfig.channelConfig.email.isActive ? true : false
		}
				
		Request
		.put(config.backend+ '/user/' +this.props.user.id+ '/push-config/channel-config/email')
		.set({Authorization: 'Bearer ' +this.props.jwt})
		.send({email: email})
		.end((err, response) => {
			
			if (response.status !== 200) {
				return alert(response.body.statusCode +': '+ response.body.message)
			}
			
			this.closeModal()
			this.props.onUser(response.body)
			return
		})
	},
})