var IsCurrentBillingMonth = require('is-same-monthyear')
var Moment = require('moment')
var MoneyMath = require('money-math')
var React = require('react')

var BillingHistory = require('./BillingHistory')
var Modal = require('./Modal')


module.exports = React.createClass({
	propTypes: {
		jwt: React.PropTypes.string,
		user: React.PropTypes.object,
		invoices: React.PropTypes.array,
	},
	getInitialState: function () {
		return {
			modalVisible: false
		}
	},
	dateNow: new Date(),
	render: function () {
	
		var currentInvoice = this.props.invoices.filter((invoice) => {
			return IsCurrentBillingMonth(new Date(invoice.creationDate))
		})[0]
		var overdueInvoices = this.props.invoices.filter((invoice) => {return !invoice.hasPaid && !IsCurrentBillingMonth(new Date(invoice.creationDate))})
		var pastDue = (function() {
			if (overdueInvoices.length === 0) return "0.00"
			else if (overdueInvoices.length === 1)  return overdueInvoices[0].payable
			else if (overdueInvoices.length > 1) return overdueInvoices.reduce((invoiceA, invoiceB) => {return MoneyMath.add(invoiceA.payable, invoiceB.payable)})
		})()
	
		var dueDate = Moment(this.dateNow).endOf('month').format('Do')+ ' of ' +Moment(this.dateNow).format('MMMM')
	
		if (!currentInvoice) return null
	
		return (
			<div>
				<h2>Usage for {Moment(this.dateNow).format('MMMM')} <small>@$0.04/notification</small></h2>
				<p>Current usage: <u>${currentInvoice.payable}</u></p>
				<p>Pastdue usage: <u>${pastDue}</u></p>
				<p>Payments are due end of month <i>({dueDate})</i></p>
				<button onClick={() => {this.setState({modalVisible: true})}}>Billing history ({overdueInvoices.length})</button>
				<Modal isVisible={this.state.modalVisible} onClose={this.closeModal} style={{}}>
					<div onClick={(e) => e.stopPropagation()} style={{maxWidth: '50%'}}>
						<button onClick={this.closeModal}>X</button>
						<BillingHistory jwt={this.props.jwt} user={this.props.user} invoices={this.props.invoices}/>
					</div>
				</Modal>
			</div>
		)
	},
	closeModal: function () {

		this.setState({modalVisible: false})
	},
})