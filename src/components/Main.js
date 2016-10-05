var React = require('react')
var Router = require('react-router-component')
var Location = Router.Location
var Locations = Router.Locations
var NotFound = Router.NotFound

var Docs = require('./Docs')
var Feed = require('./Feed')
var Home = require('./Home')
var Http404 = require('./Http404')
var User = require('./User')


module.exports = React.createClass({
	propTypes: {
		jwt: React.PropTypes.string,
		user: React.PropTypes.object,
		onJwt: React.PropTypes.func.isRequired,
		onUser: React.PropTypes.func.isRequired,
	},
	render: function () {
		return (
			<Locations>
				<Location path="/" handler={Home}/>
				<Location path={/\/feed\/?(.+)?/} urlPatternOptions={['_feed_']} jwt={this.props.jwt} user={this.props.user} handler={Feed}/>
				<Location path="/documentation" handler={Docs}/>
				<Location jwt={this.props.jwt} user={this.props.user} onJwt={this.props.onJwt} onUser={this.props.onUser} path="/user" handler={User}/>
				<NotFound handler={Http404}/>
			</Locations>
		)
	}
})