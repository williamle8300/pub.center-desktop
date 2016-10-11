var Request = require('superagent')
var React = require('react')

var backend = require('../../config').backend

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
			phoneNumber: '',
			modalVisible: false
		}
	},
	render: function () {
		return (
			<th>
				SMS
				<button onClick={() => {this.setState({modalVisible: true})}}>
					settings
				</button>
				<Modal isVisible={this.state.modalVisible} onClose={this.closeModal}>
					<div onClick={(e) => e.stopPropagation()} style={{maxWidth: '50%'}}>
						<button onClick={this.closeModal}>X</button>
						<input
							type="text"
							value={this.state.phoneNumber}
							placeholder={this.props.user.pushConfig.channelConfig.sms.phoneNumber || '+11231234'}
							onChange={this.onChangePhoneNumber}/>
						<button onClick={this.update}>Submit</button>
					</div>
				</Modal>
				<Toggle
					disabled={!this.props.user.pushConfig.channelConfig.sms.phoneNumber ? true : false}
				  checked={this.props.user.pushConfig.channelConfig.sms.isActive && this.props.user.pushConfig.channelConfig.sms.phoneNumber ? true : false}
				  onChange={this.toggle} />
			</th>
		)
	},
	closeModal: function () {
		
		this.setState({modalVisible: false})
	},
	onChangePhoneNumber: function (e) {
		
		this.setState({phoneNumber: e.target.value})
	},
	toggle: function () {

		Request
		.put(backend+ '/user/' +this.props.user.id+ '/push-config/channel-config/sms/is-active')
		.set({Authorization: 'Bearer ' +this.props.jwt})
		.send({isActive: !this.props.user.pushConfig.channelConfig.sms.isActive})
		.end((err, response) => {
			
			if (err) throw err
		
			this.props.onUser(response.body)
			return
		})
	},
	update: function () {
		
		var sms = {
			isActive: this.state.phoneNumber && this.props.user.pushConfig.channelConfig.sms.isActive ? true : false,
			phoneNumber: this.state.phoneNumber,
		}
		
		Request
		.put(backend+ '/user/' +this.props.user.id+ '/push-config/channel-config/sms')
		.set({Authorization: 'Bearer ' +this.props.jwt})
		.send({sms: sms})
		.end((err, response) => {
			
			if (err) throw err
		
			this.closeModal()
			this.props.onUser(response.body)
			return
		})
	},
})