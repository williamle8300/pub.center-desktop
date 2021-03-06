var Request = require('superagent')
var React = require('react')

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
			address: '',
			modalVisible: false
		}
	},
	render: function () {
		return (
			<MUITableHeaderColumn style={{textAlign: 'center'}}>
				<MUIFlatButton secondary label="Email" onTouchTap={() => {this.setState({modalVisible: true})}}/>
				<br/>
				<br/>
				<Modal isOpen={this.state.modalVisible} onClose={this.closeModal} actions={[<MUIFlatButton onTouchTap={this.closeModal} label="Cancel"/>, <MUIFlatButton primary label="Submit" onTouchTap={this.update}/>]}>
					<div onClick={(e) => e.stopPropagation()}>
						<MUITextField
							type="email"
							value={this.state.address}
				      floatingLabelText="Email"
				      hintText={this.props.user.pushConfig.channelConfig.email.address || 'email@address.xyz'}
				      floatingLabelFixed={true}
							onChange={this.onChangeEmail}/>
					</div>
				</Modal>
				<MUIToggle
					disabled={!this.props.user.pushConfig.channelConfig.email.address ? true : false}
				  toggled={this.props.user.pushConfig.channelConfig.email.isActive && this.props.user.pushConfig.channelConfig.email.address ? true : false}
				  onTouchTap={this.toggle}
					iconStyle={{margin: '0 auto'}}/>
				<br/>
			</MUITableHeaderColumn>
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
		.put(env.backend+ '/user/' +this.props.user.id+ '/push-config/channel-config/email/is-active')
		.set({Authorization: 'Bearer ' +this.props.jwt})
		.send({isActive: !this.props.user.pushConfig.channelConfig.email.isActive})
		.end((err, response) => {
			
			if (err) throw err

			return this.props.onUser(response.body)
		})
	},
	update: function () {
		
		var email = {
			address: this.state.address,
			isActive: this.state.address && this.props.user.pushConfig.channelConfig.email.isActive ? true : false
		}
				
		Request
		.put(env.backend+ '/user/' +this.props.user.id+ '/push-config/channel-config/email')
		.set({Authorization: 'Bearer ' +this.props.jwt})
		.send({email: email})
		.end((err, response) => {
			
			if (err) throw err
			
			this.closeModal()
			
			return this.props.onUser(response.body)
		})
	},
})