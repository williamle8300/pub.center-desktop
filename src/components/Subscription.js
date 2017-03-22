var env = require('../../env')

import MUIThemeable from 'material-ui/styles/muiThemeable'
import MUITableRow from 'material-ui/Table/TableRow'
import MUITableRowColumn from 'material-ui/Table/TableRowColumn'
import MUIToggle from 'material-ui/Toggle'

var _ = require('lodash')
var Request = require('superagent')
var React = require('react')
var VisibilitySensor = require('react-visibility-sensor')

var RouterLink = require('./RouterLink')


module.exports = MUIThemeable()(React.createClass({
	propTypes: {
		jwt: React.PropTypes.string,
		user: React.PropTypes.object,
		subscription: React.PropTypes.object.isRequired,
		onChange: React.PropTypes.func.isRequired
	},
	getInitialState: function () {
		return {
			feed: null
		}
	},
	render: function () {
		return (
			<VisibilitySensor onChange={this.readFeed}>
				<MUITableRow>
				  <MUITableRowColumn style={this.style1()}>
						<this.FeedMeta/>
						<RouterLink href={'/feed/' +this.props.subscription.feed}>view</RouterLink>
						    
						<a onTouchTap={this.deleteSubscription.bind(this, this.props.subscription.id)} style={{color: this.props.muiTheme.palette.textColor, textDecoration: 'underline'}}>unsubscribe</a>
					</MUITableRowColumn>
					<MUITableRowColumn style={this.style1()}>
						<MUIToggle
							toggled={_.includes(this.props.subscription.config, 'email')}
							onTouchTap={this.updateConfig.bind(this, this.props.subscription.id, this.props.subscription.config, 'email')}/>
					</MUITableRowColumn>
					<MUITableRowColumn style={this.style1()}>
						<MUIToggle
							toggled={_.includes(this.props.subscription.config, 'sms')}
							onTouchTap={this.updateConfig.bind(this, this.props.subscription.id, this.props.subscription.config, 'sms')}/>
					</MUITableRowColumn>
					<MUITableRowColumn style={this.style1()}>
						<MUIToggle
							toggled={_.includes(this.props.subscription.config, 'api')}
							onTouchTap={this.updateConfig.bind(this, this.props.subscription.id, this.props.subscription.config, 'api')}/>
					</MUITableRowColumn>
				</MUITableRow>
			</VisibilitySensor>
		)
	},
	FeedMeta: function () {
		
		if (this.state.feed) {
			return (
				<MUIToggle
					label={<div><img src={this.state.feed.favicon} alt="favicon" style={{width: 24}}/><span>{this.state.feed.name}</span></div>}
					toggled={this.props.subscription.isActive}
					onTouchTap={this.toggleActive.bind(this, this.props.subscription.id, this.props.subscription.isActive)}/>
			)
		}
		
		else return null
	},
	toggleActive: function (_subscription_, isActive) {
		
		Request
		.put(env.backend+ '/subscription/' +_subscription_+ '/is-active')
		.set({Authorization: 'Bearer ' +this.props.jwt})
		.send({isActive: !isActive})
		.end((err, response) => {
			
			if (err) throw err
			
			this.props.onChange()
			return
		})
	},
	updateConfig: function (_subscription_, config, key) {
		
		var newConfig = _.includes(config, key) ? _.pull(config, key) : config.concat(key)

		Request
		.put(env.backend+ '/subscription/' +_subscription_+ '/config')
		.set({Authorization: 'Bearer ' +this.props.jwt})
		.send({config: newConfig})
		.end((err, response) => {
			
			if (err) throw err
			
			this.props.onChange()
			return
		})
	},
	readFeed: function (isOpen) {
		
		if (isOpen && !this.state.feed) {
			
			Request
			.get(env.backend+ '/feed/' +this.props.subscription.feed)
			.set({Authorization: 'Bearer ' +this.props.jwt})
			.end((err, response) => {
			
				if (err) throw err
			
				return this.setState({feed: response.body})
			})
		}
	},
	deleteSubscription: function (_subscription_) {
		
		Request
		.delete(env.backend+ '/subscription/' +_subscription_)
		.set({Authorization: 'Bearer ' +this.props.jwt})
		.end((err, response) => {
			
			if (err) throw err
			
			this.props.onChange()
			return
		})
	},
	style1: function () {
		return {
			padding: this.props.muiTheme.spacing.desktopGutter,
			// display: 'flex'
			// border: '1px solid black'
		}
	}
}))