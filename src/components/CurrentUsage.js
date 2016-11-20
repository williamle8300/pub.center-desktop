var IsCurrentBillingMonth = require('is-same-monthyear')
var Moment = require('moment')
var MoneyMath = require('money-math')
var React = require('react')
var Request = require('superagent')
var StripeCheckout = require('react-stripe-checkout').default

var config = require('../../config')

var BillingHistory = require('./BillingHistory')
var Modal = require('./Modal')


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
	_pastDue: '0.00',
	render: function () {
	
		if (!this.state.invoices.length) return null
			
		var currentInvoice = this.state.invoices.filter((invoice) => {
			return IsCurrentBillingMonth(new Date(invoice.creationDate))
		})[0]
		var overdueInvoices = this.state.invoices.filter((invoice) => {return invoice.open && !IsCurrentBillingMonth(new Date(invoice.creationDate))})
		var dueDate = Moment(this.state.dateNow).endOf('month').format('Do')+ ' of ' +Moment(this.state.dateNow).format('MMMM')
		
		
		this._pastDue = (function() {
			if (overdueInvoices.length === 1)  return overdueInvoices[0].payable
			else if (overdueInvoices.length > 1) return overdueInvoices.reduce((invoiceA, invoiceB) => {return MoneyMath.add(invoiceA.payable, invoiceB.payable)})
			else return '0.00'
		})()
		
		
		return (
			<div>
				<h2>Usage for {Moment(this.state.dateNow).format('MMMM')}</h2>
				<h3>Current usage: ${currentInvoice.payable}</h3>
				<p>Pastdue: <u>${this._pastDue}</u></p>
				<StripeCheckout
					token={this.onStripeCollect}
					stripeKey={config.stripePublicKey}>
					<button>
						Pay now
					</button>
				</StripeCheckout>
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
		.post(config.backend+ '/payment')
		.set({Authorization: 'Bearer ' +this.props.jwt})
		.send({
			cardToken: cardToken,
			pastDue: this._pastDue
		})
		.end((err, response) => {

			if (err) throw err
			console.log('oi1', response);
			return this.getInvoices()
		})
	},
	getInvoices: function () {
		
		Request
		.get(config.backend+ '/user/' +this.props.user.id+ '/invoices')
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