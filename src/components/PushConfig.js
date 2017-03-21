var Request = require('superagent')
var React = require('react')

import MUITable from 'material-ui/Table/Table'
import MUITableHeader from 'material-ui/Table/TableHeader'
import MUITableBody from 'material-ui/Table/TableBody'

var env = require('../../env')

var ToggleMaster = require('./ToggleMaster')
var Subscription = require('./Subscription')


module.exports = React.createClass({
	propTypes: {
		jwt: React.PropTypes.string,
		user: React.PropTypes.object,
		onUser: React.PropTypes.func.isRequired,
	},
	getInitialState: function () {
		return {
			subscriptions: []
		}
	},
	render: function () {
		return (
			<MUITable>
				<MUITableHeader displaySelectAll={false} adjustForCheckbox={false}>
					<ToggleMaster jwt={this.props.jwt} user={this.props.user} onUser={this.props.onUser}/>
				</MUITableHeader>
				<MUITableBody>
					{
						this.state.subscriptions.map((subscription) => {
							return (
								<Subscription
									key={subscription.id}
									jwt={this.props.jwt}
									user={this.props.user}
									subscription={subscription}
									onChange={this.readSubscriptions}/>
							)
						})
					}
				</MUITableBody>
			</MUITable>
		)
	},
	componentDidMount: function () {
		
		this.readSubscriptions()
	},
	readSubscriptions: function () {
		
		Request
		.get(env.backend+ '/user/' +this.props.user.id+ '/subscriptions')
		.set({Authorization: 'Bearer ' +this.props.jwt})
		.end((err, response) => {
			
			if (err) throw err
			
			return this.setState({subscriptions: response.body})
		})
	},
})