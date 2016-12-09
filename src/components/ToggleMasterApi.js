var Request = require('superagent')
var React = require('react')

var env = require('../../env')

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
			endpoint: '',
			apiHeadersKey: '',
			apiHeadersValue: '',
			modalVisible: false
		}
	},
	render: function () {
		return (
			<th>
				API $0.0001/each
				<button onClick={() => {return this.setState({modalVisible: true})}}>
					settings
				</button>
				<Modal isVisible={this.state.modalVisible} onClose={this.closeModal}>
					<div onClick={(e) => e.stopPropagation()}>
						<button onClick={this.closeModal}>X</button>
						<input
							type="text"
							value={this.state.endpoint}
							placeholder={this.props.user.pushConfig.channelConfig.api.endpoint || 'http://endpoint.com'}
							onChange={this.onChangeEndpoint}/>
						<input
							type="text"
							value={this.state.apiHeadersKey}
							placeholder={this.props.user.pushConfig.channelConfig.api.headers.key || 'headerkey'}
							onChange={this.onChangeApiHeadersKey}/>
						<input
							type="text"
							value={this.state.apiHeadersValue}
							placeholder={this.props.user.pushConfig.channelConfig.api.headers.value || 'headervalue'}
							onChange={this.onChangeApiHeadersValue}/>
						<button onClick={this.update}>Submit</button>
					</div>
				</Modal>
				<Toggle
					disabled={!this.props.user.pushConfig.channelConfig.api.endpoint ? true : false}
				  checked={this.props.user.pushConfig.channelConfig.api.isActive && this.props.user.pushConfig.channelConfig.api.endpoint ? true : false}
				  onChange={this.toggle} />
			</th>
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