var Request = require('superagent')
var React = require('react')

import MUITableHeaderColumn from 'material-ui/Table/TableHeaderColumn'
import MUITableRow from 'material-ui/Table/TableRow'
import MUIToggle from 'material-ui/Toggle'

var env = require('../../env')

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
			<MUITableRow>
			  <MUITableHeaderColumn>
					<MUIToggle
						label="Master"
					  toggled={this.props.user.pushConfig.isActive || false}
					  onTouchTap={this.toggleMaster}/>
				</MUITableHeaderColumn>
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
			</MUITableRow>
		)
	},
	toggleMaster: function () {
	
		Request
		.put(env.backend+ '/user/' +this.props.user.id+ '/push-config/is-active')
		.set({Authorization: 'Bearer ' +this.props.jwt})
		.send({isActive: !this.props.user.pushConfig.isActive})
		.end((err, response) => {
			
			if (err) throw err
		
			return this.props.onUser(response.body)
		})
	}
})