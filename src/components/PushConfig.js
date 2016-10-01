var Request = require('superagent')
var React = require('react')
var Toggler = require('react-toggle-button')

var config = require('../../config')

var UserSubscriptions = require('./UserSubscriptions')


module.exports = React.createClass({
	propTypes: {
		jwt: React.PropTypes.string,
		user: React.PropTypes.object,
		onUser: React.PropTypes.func.isRequired,
	},
	render: function () {
		return (
			<table style={{width: '100%', border: '1px solid black'}}>
				<tbody>
				  <tr>
				    <th>Master
							<Toggler
							  value={this.props.user.pushConfig.isActive || false}
							  thumbStyle={{borderRadius: 2}}
							  trackStyle={{borderRadius: 2}}
							  onToggle={this.toggleMaster} />
						</th>
				    <th>Email ::switch::</th> 
				    <th>SMS ::switch::</th>
				    <th>API ::switch::</th>
				  </tr>
					<UserSubscriptions/>
				</tbody>
			</table>
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
	}
})