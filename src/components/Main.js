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
	
	render: function () {

		var pathMatchFeed = /\/feed\/?(.+)?/
		var paramMatchFeed = ['_feed_']
	
		return (
			<Locations>
				<Location path="/" handler={Home}/>
				<Location path={pathMatchFeed} urlPatternOptions={paramMatchFeed} handler={Feed}/>
				<Location path="/documentation" handler={Docs}/>
				<Location path="/user" handler={User}/>
				<NotFound handler={Http404}/>
			</Locations>
		)
	}
})