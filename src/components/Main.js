var React = require('react')
var Router = require('react-router-component')
var Location = Router.Location
var Locations = Router.Locations
var NotFound = Router.NotFound
// var ReactGA = require('react-ga')
// ReactGA.initialize('UA-96463485-1')

var Docs = require('./Docs')
var Feed = require('./Feed')
var Home = require('./Home')
var Http404 = require('./Http404')
var User = require('./User')
var Signin = require('./Signin')


module.exports = React.createClass({
	propTypes: {
		width: React.PropTypes.number,
		height: React.PropTypes.number,
		jwt: React.PropTypes.string,
		user: React.PropTypes.object,
		onJwt: React.PropTypes.func.isRequired,
		onUser: React.PropTypes.func.isRequired,
	},
	render: function () {

		/*<Locations onNavigation={this.logAnalytics}>*/
		return (
			<Locations>
				<Location width={this.props.width} height={this.props.height} path="/" handler={Home}/>
				<Location jwt={this.props.jwt} user={this.props.user} onJwt={this.props.onJwt} onUser={this.props.onUser} width={this.props.width} height={this.props.height} path="/signin" handler={Signin}/>
				<Location width={this.props.width} height={this.props.height} path={/\/feed\/?(.+)?/} urlPatternOptions={['_feed_']} jwt={this.props.jwt} user={this.props.user} handler={Feed}/>
				<Location path="/documentation" handler={Docs}/>
				{
					this.props.jwt && this.props.user
					? <Location jwt={this.props.jwt} user={this.props.user} onJwt={this.props.onJwt} onUser={this.props.onUser} path="/user" handler={User}/>
					: null
				}
				<NotFound handler={Http404}/>
			</Locations>
		)
	},
	// logAnalytics: function () {
	//
	//   ReactGA.set({page: window.location.pathname})
	//   ReactGA.pageview(window.location.pathname)
	// }
})
