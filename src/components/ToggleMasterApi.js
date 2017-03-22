var Request = require('superagent')
var React = require('react')

import MUITableHeaderColumn from 'material-ui/Table/TableHeaderColumn'
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
			endpoint: '',
			apiHeadersKey: '',
			apiHeadersValue: '',
			modalVisible: false
		}
	},
	render: function () {
		return (
			<MUITableHeaderColumn>
				API $0.0001/each
				<button onClick={() => {return this.setState({modalVisible: true})}}>
					settings
				</button>
				<Modal isOpen={this.state.modalVisible} onClose={this.closeModal}>
					<div onClick={(e) => e.stopPropagation()}>
						<MUITextField
							type="text"
							value={this.state.endpoint}
							hintText={this.props.user.pushConfig.channelConfig.api.endpoint || 'http://example.com'}
							floatingLabelText="Your Endpoint"
							floatingLabelFixed={true}
							onChange={this.onChangeEndpoint}/>
						<br/>
						<MUITextField
							type="text"
							value={this.state.apiHeadersKey}
							hintText={this.props.user.pushConfig.channelConfig.api.headers.key || 'a1b2'}
							floatingLabelText="Header Value"
							floatingLabelFixed={true}
							onChange={this.onChangeApiHeadersKey}/>
						<br/>
						<MUITextField
							type="text"
							value={this.state.apiHeadersValue}
							hintText={this.props.user.pushConfig.channelConfig.api.headers.value || 'z0y9'}
							floatingLabelText="Header Key"
							floatingLabelFixed={true}
							onChange={this.onChangeApiHeadersValue}/>
						<br/>
						<MUIRaisedButton onTouchTap={this.update}>Submit</MUIRaisedButton>
					</div>
				</Modal>
				<MUIToggle
					disabled={!this.props.user.pushConfig.channelConfig.api.endpoint ? true : false}
				  toggled={this.props.user.pushConfig.channelConfig.api.isActive && this.props.user.pushConfig.channelConfig.api.endpoint ? true : false}
				  onTouchTap={this.toggle} />
			</MUITableHeaderColumn>
		)
	},
	closeModal: function () {
		
		return this.setState({modalVisible: false})
	},
	onChangeEndpoint: function (e) {
		
		return this.setState({endpoint: e.target.value})
	},
	onChangeApiHeadersKey: function (e) {

		return this.setState({apiHeadersKey: e.target.value})
	},
	onChangeApiHeadersValue: function (e) {

		return this.setState({apiHeadersValue: e.target.value})
	},
	toggle: function () {

		Request
		.put(env.backend+ '/user/' +this.props.user.id+ '/push-config/channel-config/api/is-active')
		.set({Authorization: 'Bearer ' +this.props.jwt})
		.send({isActive: !this.props.user.pushConfig.channelConfig.api.isActive})
		.end((err, response) => {
			
			if (err) throw err
		
			return this.props.onUser(response.body)
		})
	},
	update: function () {
		
		var api = {
			isActive: this.state.endpoint && this.props.user.pushConfig.channelConfig.api.isActive ? true : false,
			endpoint: this.state.endpoint,
			headers: {
				key: this.state.apiHeadersKey,
				value: this.state.apiHeadersValue
			}
		}
		
		Request
		.put(env.backend+ '/user/' +this.props.user.id+ '/push-config/channel-config/api')
		.set({Authorization: 'Bearer ' +this.props.jwt})
		.send({api: api})
		.end((err, response) => {
	
			if (err) throw err
			
			this.closeModal()
			
			return this.props.onUser(response.body)
		})
	},
})