var env = require('../../env')

var BillingHistory = require('./BillingHistory')
var Modal = require('./Modal')

var IsCurrentBillingMonth = require('is-same-monthyear')
var Moment = require('moment')
var React = require('react')
var Request = require('superagent')
var StripeCheckout = require('react-stripe-checkout').default


module.exports = React.createClass({
	propTypes: {
		jwt: React.PropTypes.string,
		user: React.PropTypes.object,
	},
	getInitialState: function () {
		return {
			modalVisible: false,
			invoices: [],
			dateNow: new Date()
		}
	},
	_pastDue: 0,
	render: function () {
	
		if (!this.state.invoices.length) return null
			
		var currentInvoice = this.state.invoices.filter((invoice) => {
			return IsCurrentBillingMonth(new Date(invoice.creationDate))
		})[0]
		var overdueInvoices = this.state.invoices.filter((invoice) => {return invoice.open && !IsCurrentBillingMonth(new Date(invoice.creationDate))})
		var dueDate = Moment(this.state.dateNow).endOf('month').format('Do')+ ' of ' +Moment(this.state.dateNow).format('MMMM')
		
		
		this._pastDue = (function() {
			if (overdueInvoices.length === 1)  return overdueInvoices[0].payable
			else if (overdueInvoices.length > 1) return overdueInvoices.reduce((invoiceA, invoiceB) => {return invoiceA.payable + invoiceB.payable})
			else return 0
		})()
		
		
		return (
			<div>
				<h2>Usage for {Moment(this.state.dateNow).format('MMMM')}</h2>
				<h3 style={{color: currentInvoice.payable > 1 ? 'black' : 'orange'}}>Current usage: ${(currentInvoice.payable).toFixed(4)}</h3>
				<p>Pastdue: <u>${this._pastDue}</u></p>
				<StripeCheckout
					token={this.onStripeCollect}
					stripeKey={env.stripePublicKey}
					panelLabel={"Pay $" +this._pastDue}><button>Pay now</button></StripeCheckout>
				<p>Payments are due end of month <i>({dueDate})</i></p>
				<button onClick={() => {this.setState({modalVisible: true})}}>Billing history ({overdueInvoices.length})</button>
				<Modal isVisible={this.state.modalVisible} onClose={this.closeModal} style={{}}>
					<div onClick={(e) => e.stopPropagation()}>
						<button onClick={this.closeModal}>X</button>
						<BillingHistory jwt={this.props.jwt} user={this.props.user} invoices={this.state.invoices}/>
					</div>
				</Modal>
			</div>
		)
	},
	componentDidMount: function () {

		this.getInvoices()
	},
	onStripeCollect: function (cardToken) {

		Request
		.post(env.backend+ '/payment')
		.set({Authorization: 'Bearer ' +this.props.jwt})
		.send({
			cardToken: cardToken,
			paymentAmount: (this._pastDue).toFixed(2)
		})
		.end((err, response) => {

			if (err) throw err
			console.log('oi1', response);
			return this.getInvoices()
		})
	},
	getInvoices: function () {
		
		Request
		.get(env.backend+ '/user/' +this.props.user.id+ '/invoices')
		.set({Authorization: 'Bearer ' +this.props.jwt})
		.end((err, response) => {
			
			if (err) throw err
			
			return this.setState({invoices: response.body})
		})
	},
	closeModal: function () {

		this.setState({modalVisible: false})
	},
})