var Request = require('superagent')
var React = require('react')
import PhoneInput from 'react-phone-input'

import MUITableHeaderColumn from 'material-ui/Table/TableHeaderColumn'
import MUIFlatButton from 'material-ui/FlatButton'
import MUIRaisedButton from 'material-ui/RaisedButton'
import MUIToggle from 'material-ui/Toggle'
import MUITextField from 'material-ui/TextField'

var env = require('../../env')

var Modal = require('./Modal')


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
	
	/*
	 	<PhoneInput defaultCountry={'us'} onChange={this.onChangePhoneNumber} value={this.props.user.pushConfig.channelConfig.sms.phoneNumber}/>
	*/
	render: function () {
		return (
			<MUITableHeaderColumn style={{textAlign: 'center'}}>
				<MUIFlatButton secondary  label="SMS" onTouchTap={() => {this.setState({modalVisible: true})}}/>
				<br/>
				<br/>
				<Modal isOpen={this.state.modalVisible} onClose={this.closeModal}>
					<div onClick={(e) => e.stopPropagation()}>
						<MUITextField
							type="text"
							value={this.state.phoneNumber}
				      floatingLabelText="SMS phone number"
				      hintText={this.props.user.pushConfig.channelConfig.sms.phoneNumber || '+<country><areacode><number> (EXAMPLE "+18881230987")'}
				      floatingLabelFixed={true}
							onChange={this.onChangePhoneNumber}
							fullWidth/>
						<br/>
						<br/>
						<MUIRaisedButton onTouchTap={this.closeModal}>Cancel</MUIRaisedButton> <MUIRaisedButton label="Submit" onTouchTap={this.update}/>
					</div>
				</Modal>
				<MUIToggle
					disabled={!this.props.user.pushConfig.channelConfig.sms.phoneNumber ? true : false}
				  toggled={this.props.user.pushConfig.channelConfig.sms.isActive && this.props.user.pushConfig.channelConfig.sms.phoneNumber ? true : false}
				  onTouchTap={this.toggle}
					iconStyle={{margin: '0 auto'}}/>
				<br/>
			</MUITableHeaderColumn>
		)
	},
	closeModal: function () {
		
		this.setState({modalVisible: false})
	},
	onChangePhoneNumber: function (e) {

		// this.setState({phoneNumber: value.replace(/[^\d]/gi, '')})
		this.setState({phoneNumber: e.target.value})
	},
	toggle: function () {

		Request
		.put(env.backend+ '/user/' +this.props.user.id+ '/push-config/channel-config/sms/is-active')
		.set({Authorization: 'Bearer ' +this.props.jwt})
		.send({isActive: !this.props.user.pushConfig.channelConfig.sms.isActive})
		.end((err, response) => {
			
			if (err) throw err
		
			return this.props.onUser(response.body)
		})
	},
	update: function () {
		
		var sms = {
			isActive: this.state.phoneNumber && this.props.user.pushConfig.channelConfig.sms.isActive ? true : false,
			phoneNumber: this.state.phoneNumber,
		}
		
		Request
		.put(env.backend+ '/user/' +this.props.user.id+ '/push-config/channel-config/sms')
		.set({Authorization: 'Bearer ' +this.props.jwt})
		.send({sms: sms})
		.end((err, response) => {
			
			if (err) throw err
		
			this.closeModal()
			
			return this.props.onUser(response.body)
		})
	},
})