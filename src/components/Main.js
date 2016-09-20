var React = require('react')
var Router = require('react-router-component')
var Location = Router.Location
var Locations = Router.Locations
var NotFound = Router.NotFound

var RouteDocs = require('./RouteDocs')
var RouteFeed = require('./RouteFeed')
var RouteHome = require('./RouteHome')
var Http404 = require('./Http404')
var RouteUser = require('./RouteUser')


module.exports = React.createClass({
	
	render: function () {

		var pathMatchFeed = /\/feed\/?(.+)?/
		var paramMatchFeed = ['_feed_']
	
		return (
			<Locations>
				<Location path="/" handler={RouteHome}/>
				<Location path={pathMatchFeed} urlPatternOptions={paramMatchFeed} handler={RouteFeed}/>
				<Location path="/documentation" handler={RouteDocs}/>
				<Location path="/user" handler={RouteUser}/>
				<NotFound handler={Http404}/>
			</Locations>
		)
	}
})