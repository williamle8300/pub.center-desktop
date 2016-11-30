var IsCurrentBillingMonth = require('is-same-monthyear')
var React = require('react')


module.exports = React.createClass({
	propTypes: {
		jwt: React.PropTypes.string,
		user: React.PropTypes.object,
		invoices: React.PropTypes.array,
	},
	render: function () {
		return (
			<div>
				{
					this.props.invoices
					.filter((invoice) => {
						return !IsCurrentBillingMonth(new Date(invoice.creationDate))
					})
					.map((invoice) => {
						return (
							<div key={invoice.id} style={{border: '1px solid black', backgroundColor: invoice.open ? 'red' : 'none'}}>
								<p>
									Bill posted: {new Date(invoice.creationDate).toDateString()}
									{
										invoice.open
										? ' [OVERDUE]'
										: null
									}
								</p>
								<p>Open: {invoice.open.toString()}</p>
								<p>Due: ${invoice.payable}</p>
							</div>
						)
					})
				}
			</div>
		)
	}
})