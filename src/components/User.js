var _ = require('lodash')
var IsCurrentBillingMonth = require('is-same-monthyear')
var Moment = require('moment')
var MoneyMath = require('money-math')
var React = require('react')
var Request = require('superagent')

var backend = require('../../config').backend

var BillingHistory = require('./BillingHistory')
var PushConfig = require('./PushConfig')
var Modal = require('./Modal')


module.exports = React.createClass({
	propTypes: {
		jwt: React.PropTypes.string,
		user: React.PropTypes.object,
		onJwt: React.PropTypes.func.isRequired,
		onUser: React.PropTypes.func.isRequired,
	},
	getInitialState: function () {
		return {
			email: '',
			username: '',
			password: '',
			invoices: [],
			modalVisible: false
		}
	},
	dateNow: new Date(),
  render: function () {
		
		if (!this.props.user) return null
		
    return (
			<div>
				<h1>User</h1>
				<h2>Information</h2>
				<div>
					<label>email</label>
					<input
						type="email"
						placeholder={this.props.user.email || 'email'}
						value={this.state.email}
						onChange={this.onChangeEmail}/>
				</div>
				<div>
		    	<label>username</label>
					<input
						type="text"
						placeholder={this.props.user.username || 'username'}
						value={this.state.username}
						onChange={this.onChangeUsername}/>
				</div>
				<div>
					<label>password</label>
					<input
						type="password"
						placeholder={'•'.repeat(8)}
						value={this.state.password}
						onChange={this.onChangePassword}/>
				</div>
				<button onClick={this.updateUser}>update</button>
				<h2>Usage for {Moment(this.dateNow).format('MMMM')} <small>@$0.04/notification</small></h2>
				<this.CurrentUsage/>
				<h2>Subscriptions</h2>
				<PushConfig jwt={this.props.jwt} user={this.props.user} onUser={this.props.onUser}/>
				<h2>Logout</h2>
				<button onClick={this.wipeSession}>logout</button>
			</div>
		)
  },
	componentWillUpdate: function (newProps, newState) {
		if (!newProps.jwt) {
			window.location = '/'
		}
	},
	componentDidUpdate: function (prevProps, prevState) {
		
		if (!this.state.invoices.length && this.props.jwt && this.props.user) {
			
			this.readInvoices()
		}
	},
	CurrentUsage: function () {
		
		var currentInvoice = this.state.invoices.filter((invoice) => {
			return IsCurrentBillingMonth(new Date(invoice.creationDate))
		})[0]
		var overdueInvoices = this.state.invoices.filter((invoice) => {return !invoice.hasPaid && !IsCurrentBillingMonth(new Date(invoice.creationDate))})
		var pastDue = (function() {
			if (overdueInvoices.length === 0) return "0.00"
			else if (overdueInvoices.length === 1)  return overdueInvoices[0].payable
			else if (overdueInvoices.length > 1) return overdueInvoices.reduce((invoiceA, invoiceB) => {return MoneyMath.add(invoiceA.payable, invoiceB.payable)})
		})()
		
		var dueDate = Moment(this.dateNow).endOf('month').format('Do')+ ' of ' +Moment(this.dateNow).format('MMMM')
		
		if (!currentInvoice) return null
		
		return (
			<div>
				<p>Current usage: <u>${currentInvoice.payable}</u></p>
				<p>Pastdue usage: <u>${pastDue}</u></p>
				<p>Payments are due end of month <i>({dueDate})</i></p>
				<button onClick={() => {this.setState({modalVisible: true})}}>Billing history ({overdueInvoices.length})</button>
				<Modal isVisible={this.state.modalVisible} onClose={this.closeModal} style={{}}>
					<div onClick={(e) => e.stopPropagation()} style={{maxWidth: '50%'}}>
						<button onClick={this.closeModal}>X</button>
						<BillingHistory jwt={this.props.jwt} user={this.props.user}/>
					</div>
				</Modal>
			</div>
		)
	},
	closeModal: function () {

		this.setState({modalVisible: false})
	},
	readInvoices: function () {
		
		Request
		.get(backend+ '/user/' +this.props.user.id+ '/invoices')
		.set({Authorization: 'Bearer ' +this.props.jwt})
		.end((err, response) => {
			
			if (err) throw err
			
			return this.setState({invoices: response.body})
		})
	},
	onChangeEmail: function (e) {
		
		this.setState({email: e.target.value})
	},
	onChangeUsername: function (e) {
		
		this.setState({username: e.target.value})
	},
	onChangePassword: function (e) {
		
		this.setState({password: e.target.value})
	},
	updateUser: function () {
		
		var user = _.merge(this.props.user, {
			username: this.state.username || this.props.user.username,
			email: this.state.email || this.props.user.email,
			password: this.state.password || this.props.user.password
		})
			
		Request
		.put(backend+ '/user/' +this.props.user.id)
		.set({Authorization: 'Bearer ' +this.props.jwt})
		.send({user: user})
		.end((err, response) => {
			
			if (err) throw err
			
			this.props.onUser(response.body)
		})
	},
	wipeSession: function () {
		
		this.props.onJwt(null, () => {
			this.props.onUser(null)
		})
	},
})