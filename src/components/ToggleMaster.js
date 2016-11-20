var Request = require('superagent')
var React = require('react')

var config = require('../../config')

var Toggle = require('./Toggle')
var ToggleMasterEmail = require('./ToggleMasterEmail')
var ToggleMasterSms = require('./ToggleMasterSms')
var ToggleMasterApi = require('./ToggleMasterApi')


module.exports = React.createClass({
	propTypes: {
		jwt: React.PropTypes.string,
		user: React.PropTypes.object,
		onUser: React.PropTypes.func.isRequired,
	},
	render: function () {
		return (
			<thead>
				<tr>
				  <th>
						Master
						<Toggle
						  checked={this.props.user.pushConfig.isActive || false}
						  onChange={this.toggleMaster} />
					</th>
					<ToggleMasterEmail
						jwt={this.props.jwt}
						user={this.props.user}
						onUser={this.props.onUser}/>
					<ToggleMasterSms
						jwt={this.props.jwt}
						user={this.props.user}
						onUser={this.props.onUser}/>
					<ToggleMasterApi
						jwt={this.props.jwt}
						user={this.props.user}
						onUser={this.props.onUser}/>
				</tr>
			</thead>
		)
	},
	toggleMaster: function () {
	
		Request
		.put(config.backend+ '/user/' +this.props.user.id+ '/push-config/is-active')
		.set({Authorization: 'Bearer ' +this.props.jwt})
		.send({isActive: !this.props.user.pushConfig.isActive})
		.end((err, response) => {
			
			if (err) throw err
		
			return this.props.onUser(response.body)
		})
	}
})