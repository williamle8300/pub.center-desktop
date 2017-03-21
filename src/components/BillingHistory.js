import MUIList from 'material-ui/List/List'
import MUIListItem from 'material-ui/List/ListItem';

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
			<MUIList>
				{
					this.props.invoices
					.filter((invoice) => {
						return !IsCurrentBillingMonth(new Date(invoice.creationDate))
					})
					.map((invoice) => {
						return (
							<MUIListItem key={invoice.id} disabled style={{backgroundColor: invoice.open ? 'red' : 'none'}}>
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
							</MUIListItem>
						)
					})
				}
			</MUIList>
		)
	}
})