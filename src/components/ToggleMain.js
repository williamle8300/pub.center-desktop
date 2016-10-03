var Request = require('superagent')
var React = require('react')

var config = require('../../config')

var Toggle = require('./Toggle')
var ToggleMainEmail = require('./ToggleMainEmail')

module.exports = React.createClass({
	propTypes: {
		jwt: React.PropTypes.string,
		user: React.PropTypes.object,
		onUser: React.PropTypes.func.isRequired,
	},
	render: function () {
		return (
			<tr>
			  <th>
					Master
					<Toggle
					  checked={this.props.user.pushConfig.isActive || false}
					  onChange={this.toggleMaster} />
				</th>
			  <th>
					<ToggleMainEmail
						jwt={this.props.jwt}
						user={this.props.user}
						onUser={this.props.onUser}/>
				</th>
			  <th>
					SMS
					<Toggle
						disabled={this.props.user.pushConfig.channelConfig.sms.phoneNumber ? false : true}
					  checked={this.props.user.pushConfig.channelConfig.sms.isActive || false}
					  onChange={this.toggleSms} />
				</th>
			  <th>
					API
					<Toggle
						disabled={this.props.user.pushConfig.channelConfig.api.endpoint ? false : true}
					  checked={this.props.user.pushConfig.channelConfig.api.isActive || false}
					  onChange={this.toggleApi} />
				</th>
			</tr>
		)
	},
	toggleMaster: function () {
	
		Request
		.put(config.backend+ '/user/' +this.props.user.id+ '/push-config/is-active')
		.set({Authorization: 'Bearer ' +this.props.jwt})
		.send({isActive: !this.props.user.pushConfig.isActive})
		.end((err, response) => {
			
			if (response.status !== 200) {
				return alert(response.body.statusCode +': '+ response.body.message)
			}
		
			this.props.onUser(response.body)
		})
	},
	toggleSms: function () {
		
		Request
		.put(config.backend+ '/user/' +this.props.user.id+ '/push-config/channel-config/sms/is-active')
		.set({Authorization: 'Bearer ' +this.props.jwt})
		.send({isActive: !this.props.user.pushConfig.channelConfig.sms.isActive})
		.end((err, response) => {
			
			if (response.status !== 200) {
				return alert(response.body.statusCode +': '+ response.body.message)
			}
		
			this.props.onUser(response.body)
		})
	},
	toggleApi: function () {
		
		Request
		.put(config.backend+ '/user/' +this.props.user.id+ '/push-config/channel-config/api/is-active')
		.set({Authorization: 'Bearer ' +this.props.jwt})
		.send({isActive: !this.props.user.pushConfig.channelConfig.api.isActive})
		.end((err, response) => {
			
			if (response.status !== 200) {
				return alert(response.body.statusCode +': '+ response.body.message)
			}
		
			this.props.onUser(response.body)
		})
	}
})