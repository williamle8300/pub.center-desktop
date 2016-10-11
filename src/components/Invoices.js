var IsCurrentBillingMonth = require('is-same-monthyear')
var Request = require('superagent')
var React = require('react')

var backend = require('../../config').backend


module.exports = React.createClass({
	propTypes: {
		jwt: React.PropTypes.string,
		user: React.PropTypes.object,
	},
	getInitialState: function () {
		return {
			invoices: []
		}
	},
	render: function () {
		return (
			<div>
				{
					this.state.invoices.map((invoice) => {
						return (
							<div key={invoice.id} style={{border: '1px solid black'}}>
								<p>
									Bill posted: {new Date(invoice.creationDate).toDateString()}
									{
										IsCurrentBillingMonth(new Date(invoice.creationDate))
										? null
										: ' [OVERDUE]'
									}
								</p>
								<p>Paid: {invoice.hasPaid.toString()}</p>
								<p>Due: ${invoice.payable}</p>
							</div>
						)
					})
				}
			</div>
		)
	},
	componentDidMount: function () {
		
		Request
		.get(backend+ '/user/' +this.props.user.id+ '/invoices')
		.set({Authorization: 'Bearer ' +this.props.jwt})
		.end((err, response) => {
			
			if (err) throw err
			
			return this.setState({invoices: response.body})
		})
	}
})